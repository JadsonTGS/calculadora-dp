# 📱 Calculadora DP - PWA (Progressive Web App)

## 🧮 Sobre o Projeto

A **Calculadora DP** é um Progressive Web App completo para cálculos trabalhistas e folha de pagamento, desenvolvido para profissionais de Departamento Pessoal, contadores e empresários.

### ✨ Principais Funcionalidades

- 💰 **Salário Proporcional** - Cálculo por dias trabalhados
- ⏰ **Horas Extras** - 50% e 100% separadamente  
- 🌙 **Adicional Noturno** - 20% sobre horas noturnas
- ❌ **Desconto de Faltas** - Proporcional aos dias
- 🏛️ **INSS** - Cálculo por faixas 2025 + opção manual
- 📊 **IRRF** - Com dependentes e deduções
- 🏦 **FGTS** - 8% CLT ou 11% Pró-labore
- 🏖️ **Férias** - Proporcionais + 1/3 - desconto INSS
- 🎁 **13º Salário** - Proporcional aos meses
- 📋 **Rescisão Completa** - Todos os valores

## 🚀 Características PWA

### ✅ Funciona Offline
- Cache inteligente dos recursos
- Funciona sem conexão com internet
- Sincronização automática quando online

### 📱 Instalável
- Pode ser instalado como app nativo
- Ícone na tela inicial do dispositivo
- Abre sem barra do navegador
- Experiência de app nativo

### 🔄 Sempre Atualizado
- Atualizações automáticas
- Service Worker para cache eficiente
- Notificações de novas versões

## 📋 Arquivos do Projeto

```
calculadora-dp-pwa/
├── index.html          # Arquivo principal da aplicação
├── manifest.json       # Configurações do PWA
├── sw.js              # Service Worker para funcionalidade offline
└── README.md          # Este arquivo
```

## 🛠️ Como Instalar e Usar

### Opção 1: Hospedagem Web
1. Faça upload dos arquivos para seu servidor web
2. Acesse via navegador
3. Clique no botão "Instalar App" quando aparecer
4. Ou use o menu do navegador > "Instalar aplicativo"

### Opção 2: Teste Local
1. Baixe todos os arquivos
2. Use um servidor local (ex: Live Server no VS Code)
3. Acesse via `http://localhost:porta`
4. Teste a funcionalidade de instalação

### Opção 3: GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Acesse via URL fornecida

## 📱 Como Instalar no Dispositivo

### Android (Chrome/Edge)
1. Abra o site no navegador
2. Toque no menu (⋮) > "Instalar aplicativo"
3. Ou toque no banner "Instalar App" que aparece
4. Confirme a instalação
5. O app aparecerá na tela inicial

### iOS (Safari)
1. Abra o site no Safari
2. Toque no botão de compartilhar (□↗)
3. Selecione "Adicionar à Tela de Início"
4. Confirme o nome e toque "Adicionar"
5. O app aparecerá na tela inicial

### Desktop (Chrome/Edge)
1. Abra o site no navegador
2. Clique no ícone de instalação na barra de endereços
3. Ou vá em Menu > "Instalar Calculadora DP"
4. Confirme a instalação
5. O app aparecerá como programa instalado

## 🔧 Funcionalidades Técnicas

### Service Worker
- Cache de recursos para funcionamento offline
- Estratégia "Cache First" para performance
- Sincronização em background
- Suporte a notificações push

### Manifest.json
- Configurações de instalação
- Ícones em múltiplos tamanhos
- Tema e cores personalizadas
- Atalhos para funções específicas
- Screenshots para app stores

### Responsividade
- Design adaptável para todos os dispositivos
- Suporte a safe areas (iPhone X+)
- Otimizado para touch e desktop
- Interface otimizada para modo standalone

## 📊 Cálculos Implementados

### INSS 2025 (Atualizado)
- Faixas com salário mínimo R$ 1.518,00
- Cálculo automático por faixas
- Opção de porcentagem manual
- Detalhamento por faixa salarial

### IRRF 2025
- Tabela atualizada com dependentes
- Valor por dependente: R$ 189,59
- Cálculo com parcela dedutível
- Suporte a outros descontos

### Férias com INSS
- Cálculo de férias proporcionais
- Adicional de 1/3 constitucional
- Desconto automático do INSS
- Valor líquido final

### FGTS Flexível
- CLT: 8% (padrão)
- Pró-labore: 11%
- Seleção por dropdown

## 🎨 Interface

### Design Moderno
- Gradientes e animações suaves
- Cards interativos com hover
- Tooltips explicativos
- Feedback visual em tempo real

### UX Otimizada
- Navegação intuitiva
- Formulários organizados
- Resultados detalhados
- Botões de ação claros

## 🔒 Segurança e Privacidade

- Todos os cálculos são feitos localmente
- Nenhum dado é enviado para servidores
- Funciona completamente offline
- Não coleta informações pessoais

## 🆕 Atualizações

### Versão 1.0.0
- ✅ PWA completo com instalação
- ✅ 10 calculadoras trabalhistas
- ✅ Faixas INSS/IRRF 2025
- ✅ Funcionamento offline
- ✅ Interface responsiva
- ✅ Opção INSS manual
- ✅ FGTS CLT/Pró-labore
- ✅ Férias com desconto INSS

## 🤝 Contribuições

Este projeto é open source. Contribuições são bem-vindas!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas, sugestões ou reportar bugs:
- Abra uma issue no GitHub
- Ou entre em contato via email

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para profissionais de Departamento Pessoal**

🧮 **Calculadora DP - PWA 2025** 🧮
