# FeeAgro Frontend

Interface web do sistema **FeeAgro**, desenvolvida para simular uma plataforma de fintech/agro com dashboard, visualização de transações e fluxo de nova operação.

---

## Sobre o projeto

O FeeAgro Frontend é uma aplicação web construída com foco em experiência visual moderna, responsividade e organização de componentes. A interface foi projetada para apresentar informações financeiras de forma clara, com identidade visual voltada ao contexto agro/fintech.

Atualmente, a aplicação contempla:

- Dashboard com visão geral
- Tela de transações com filtros e busca
- Tela de nova operação com fluxo de transferência
- Sidebar responsiva
- Header com ações do usuário
- Integração preparada para consumo de API no backend

---

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Lucide React

---

## Estrutura do projeto

---

## Requisitos
Antes de executar o projeto, tenha instalado:

- Node.js 18 ou superior
- npm, yarn, pnpm ou bun

---
  
## Como instalar
Clone o repositório e acesse a pasta do projeto:
``` 
git clone https://github.com/werbertviana/feeagro-frontend
```
``` 
cd feeagro-frontend
```
Instale as dependências:
``` 
npm install
```
---

## Como executar em ambiente de desenvolvimento
``` 
npm run dev
```
Depois, acesse no navegador:
``` 
http://localhost:3000
```
---

## Funcionalidades implementadas
**Dashboard**
- Exibição de cards com resumo financeiro
- Visual visual moderno voltado ao tema agro/fintech
- Estrutura preparada para integração com dados dinâmicos

---
  
**Transações**
- Listagem de transações
- Busca textual
- Filtro por tipo de movimentação
- Botão de carregar mais
- Interface responsiva
- Busca tolerante a diferenças de maiúsculas/minúsculas, acentos e pontuação

---
  
**Nova Operação**
- Fluxo direcionado para transferência
- Interface em etapas
- Layout consistente com o restante da aplicação

---
  
**Layout**
- Sidebar responsiva
- Header superior
- Área principal com conteúdo dinâmico
- Adaptação para diferentes larguras de tela

---

## Integração com backend
O frontend foi estruturado para consumir dados de um backend via API. Serviços podem ser organizados em arquivos como:
``` 
src/services/transactions.ts
```
Exemplo de responsabilidade:
- buscar transações
- enviar operações
- consultar dados do dashboard

---
  
## Padrões adotados
- Componentização com React
- Tipagem com TypeScript
- Estilização com Tailwind CSS
- Ícones com Lucide React
- Separação entre layout, UI e serviços
- Uso de React Query para gerenciamento de estado assíncrono
  
---
  
## Responsividade
A interface foi ajustada para manter boa usabilidade em diferentes tamanhos de tela. O sidebar, por exemplo, possui comportamento responsivo, permanecendo visível em larguras intermediárias e se adaptando entre modo compacto e expandido.

---

## Melhorias futuras
- Integração completa com backend
- Filtros de período reais
- Paginação via API
- Autenticação de usuário
- Dashboard com gráficos dinâmicos
- Validações mais robustas nos formulários
- Feedback visual de sucesso/erro em operações
- Testes unitários e de interface
  
---
  
# 👨‍💻 Autor
Werbert Viana

Desenvolvedor focado em aplicações mobile utilizando React Native, com interesse em tecnologia aplicada à educação e experiências digitais interativas.

GitHub:
https://github.com/werbertviana

---
# Licença
Este projeto foi desenvolvido para fins de estudo, portfólio e desafio prático.

