const CACHE_NAME = 'calculadora-dp-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Adicione outros recursos que queira cachear
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Todos os arquivos foram cacheados');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.log('Service Worker: Erro ao cachear arquivos', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Ativado');
      return self.clients.claim();
    })
  );
});

// Interceptar requisições (estratégia Cache First)
self.addEventListener('fetch', (event) => {
  // Só interceptar requisições GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se encontrou no cache, retorna
        if (response) {
          console.log('Service Worker: Servindo do cache', event.request.url);
          return response;
        }

        // Se não encontrou no cache, busca na rede
        console.log('Service Worker: Buscando na rede', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Verifica se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para cachear
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Se falhou na rede, retorna página offline personalizada
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Sincronização em background', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aqui você pode implementar sincronização de dados
      console.log('Service Worker: Executando sincronização')
    );
  }
});

// Notificações Push (opcional)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push recebido', event);

  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="%230077b6" rx="10"/><text x="48" y="65" font-size="50" text-anchor="middle" fill="white">🧮</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="%230077b6" rx="10"/><text x="48" y="65" font-size="50" text-anchor="middle" fill="white">🧮</text></svg>',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Abrir App',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Calculadora DP', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Clique na notificação', event);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Apenas fecha a notificação
    return;
  } else {
    // Clique na notificação principal
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Compartilhamento (Web Share Target API)
self.addEventListener('message', (event) => {
  console.log('Service Worker: Mensagem recebida', event.data);

  if (event.data && event.data.type === 'SHARE_TARGET') {
    // Processar dados compartilhados
    console.log('Service Worker: Dados compartilhados', event.data.data);
  }
});

// Atualização do Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Logs para debug
console.log('Service Worker: Carregado e pronto!');