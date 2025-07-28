const CACHE_NAME = 'calculadora-dp-v1.2';

// 🔧 AQUI: Defina o caminho correto do seu repositório GitHub Pages
const BASE_URL = '/calculadora-dp/';  // ← MUDE AQUI se seu repo tiver outro nome

// 🔧 AQUI: URLs que serão armazenadas no cache
const urlsToCache = [
  BASE_URL,                           // ← Página inicial: /calculadora-dp/
  BASE_URL + 'index.html',           // ← Arquivo principal
  BASE_URL + 'manifest.json',        // ← Manifest do PWA
  // Recursos externos (não precisam do BASE_URL)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Evento de instalação do Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Service Worker: Erro ao adicionar ao cache:', error);
      })
  );
  // Força a ativação imediata
  self.skipWaiting();
});

// Evento de ativação do Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Remove caches antigos
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Assume controle imediato de todas as páginas
  self.clients.claim();
});

// Evento de interceptação de requisições
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(cachedResponse) {
        // Se encontrou no cache, retorna
        if (cachedResponse) {
          console.log('Service Worker: Servindo do cache:', event.request.url);
          return cachedResponse;
        }

        // Se não encontrou no cache, busca na rede
        console.log('Service Worker: Buscando na rede:', event.request.url);
        return fetch(event.request.clone())
          .then(function(networkResponse) {
            // Verifica se a resposta é válida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clona a resposta para armazenar no cache
            var responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(function(error) {
            console.error('Service Worker: Erro na rede:', error);

            // 🔧 AQUI: Fallback para navegação - retorna a página principal
            if (event.request.mode === 'navigate') {
              console.log('Service Worker: Retornando fallback para navegação');
              return caches.match(BASE_URL + 'index.html')
                .then(function(fallbackResponse) {
                  if (fallbackResponse) {
                    return fallbackResponse;
                  }
                  // Se não encontrar nem o fallback, retorna página básica
                  return new Response(
                    '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>Aplicativo offline</h1><p>Verifique sua conexão.</p></body></html>',
                    { headers: { 'Content-Type': 'text/html' } }
                  );
                });
            }

            // Para outros tipos de requisição, retorna erro
            throw error;
          });
      })
  );
});

// Evento para atualização do Service Worker
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Pulando espera...');
    self.skipWaiting();
  }
});