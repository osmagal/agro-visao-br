# AgroVisão Brasil

Projeto frontend construído com React + Vite e uma arquitetura planejada para Firebase Hosting + Cloud Functions + Firestore.

## Visão geral

- Frontend: React + Vite + MUI
- Rotas: `react-router-dom`
- Gráficos: ECharts via `echarts-for-react`
- Backend planejado: Firebase Functions em `functions/`
- Cache: Firestore para resultados do IBGE

## Como começar

1. Instale dependências:

```bash
npm install
```

2. Rode o frontend localmente:

```bash
npm run dev
```

3. Construa o projeto para produção:

```bash
npm run build
```

## Firebase

A estrutura inclui uma base para Firebase Hosting e Cloud Functions.

- `firebase.json` define o deploy para `dist` e para as funções em `functions/`
- `functions/src/index.ts` cria uma função HTTPS para consultar o IBGE via SIDRA e gravar cache no Firestore

> Ajuste `projectId` e `VITE_FIREBASE_FUNCTIONS_URL` conforme o seu ambiente Firebase.
