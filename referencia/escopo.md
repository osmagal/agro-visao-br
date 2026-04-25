Escopo Atualizado: Projeto AgroVisão Brasil (Arquitetura Firebase)
agro-visao-br.web.app
1. Nova Arquitetura de Nuvem (Serverless)
Em vez de gerenciar servidores tradicionais, o projeto utilizará uma abordagem baseada em eventos e funções:

Firebase Hosting: Hospedagem global para os arquivos estáticos (HTML, JS, CSS) do frontend (React/Next.js). Oferece CDN nativa e certificado SSL automático.

Cloud Functions for Firebase (O BFF): Atuará como a ponte entre o frontend e o IBGE. As funções tratarão as requisições, formatarão os dados do SIDRA e aplicarão a lógica de negócio.

https://apisidra.ibge.gov.br/

https://servicodados.ibge.gov.br/api/docs/agregados?versao=3

https://sidra.ibge.gov.br/acervo#/T/Q

Cloud Firestore: Banco de dados NoSQL para armazenar metadados de culturas, códigos de regiões e, principalmente, cache de resultados de consultas pesadas para economizar chamadas à API do IBGE.

Firebase App Check: Proteção para garantir que apenas o seu frontend consiga chamar as suas funções, evitando custos por uso indevido da API.

2. Fluxo de Dados Otimizado
O Usuário acessa a URL no Firebase Hosting.

O Frontend solicita dados de produção via Cloud Functions.

A Function verifica no Firestore se aquele dado (ex: Produção de Soja em 2022) já foi consultado recentemente.

Se sim: Retorna o cache (muito mais rápido).

Se não: Consulta a API do IBGE, salva no Firestore e retorna ao usuário.

3. Stack Tecnológica Atualizada
Frontend: React.js com Vite (otimizado para o Hosting).

Gráficos: Recharts ou TanStack Table para os dados.

Backend: Node.js (TypeScript) rodando em Cloud Functions (v2).

Ferramentas de Deploy: Firebase CLI e GitHub Actions (para CI/CD automático).

Visualização da Arquitetura AgroVisão
Para ajudar a entender como esses componentes do Firebase se conectam ao IBGE, preparei este diagrama interativo. Você pode simular o fluxo de uma requisição e ver como o cache no Firestore otimiza o processo.

Utilize a estrutura do modelo disponível no diretório deste projeto como base para este projeto adequando as informações e escopo.

## Arquitetura AgroVisão Brasil (Firebase + IBGE)

```mermaid
flowchart TD
    A[Usuário acessa agro-visao-br.web.app] -->|Solicita dados de produção| B[Firebase Hosting (Frontend React)]
    B -->|Chama| C[Cloud Functions (BFF)]
    C --> D{Cache Firestore?}
    D -- Sim --> E[Retorna dados do Firestore]
    D -- Não --> F[Consulta API IBGE SIDRA]
    F --> G[Formata dados]
    G --> H[Salva no Firestore]
    H --> I[Retorna dados ao Frontend]
    E --> I
    C --> J[App Check]
    J -.->|Protege Functions| C
    style J stroke-dasharray: 5 5
    style D fill:#f9f,stroke:#333,stroke-width:2
    style F fill:#bbf,stroke:#333,stroke-width:2
    style H fill:#bbf,stroke:#333,stroke-width:2
    style E fill:#bfb,stroke:#333,stroke-width:2
    style I fill:#bfb,stroke:#333,stroke-width:2
    style G fill:#bbf,stroke:#333,stroke-width:2
    style C fill:#ffd,stroke:#333,stroke-width:2
    style B fill:#ffd,stroke:#333,stroke-width:2
    style A fill:#ffd,stroke:#333,stroke-width:2
```

> O fluxo acima mostra como o frontend, backend serverless e o cache do Firestore se conectam ao IBGE, otimizando performance e custos.