## Elfa Digital Products - API

API RESTful para gerenciamento de produtos e marcas, construída com Fastify, Prisma ORM e validações com Zod.

---

### Tecnologias Utilizadas

- **[Fastify](https://fastify.dev/)** – Web framework rápido e eficiente
- **[Prisma ORM](https://www.prisma.io/)** – ORM moderno e type-safe
- **[Zod](https://zod.dev/)** – Schemas de validação e tipagem
- **[Zod-OpenAPI](https://github.com/asteasolutions/zod-to-openapi)** – Geração automática de documentação
- **[TypeScript](https://www.typescriptlang.org/)** – Para tipagem forte e maior produtividade

---

### Estrutura de Diretórios

```
src/
├── controllers/        # Controladores (interface de entrada)
├── infra/              # Infraestrutura (Fastify, plugins)
├── repositories/       # Interfaces + Implementações com Prisma
├── routes/             # Definição das rotas e validações
├── schemas/            # Schemas Zod de entrada e resposta
├── services/           # Regras de negócio
├── shared/             # Schemas reutilizáveis (modelos, erros)
├── utils/              # Handlers HTTP (response & error)
└── index.ts            # Entrypoint da aplicação
```

---

### Executando o Projeto

> **Pré-requisitos:**
>
> - Docker e Docker Compose
> - Node.js (v22+ recomendado)
> - NPM, Yarn ou PNPM

#### Docker Compose (Banco de Dados)

```yaml
services:
  elfa_db:
    image: postgres:17.4
    container_name: elfa_db
    restart: always
    ports:
      - "5435:5432"
    env_file:
      - .env
    volumes:
      - data:/var/lib/postgresql/data
    networks:
      - elfa_network

volumes:
  data:

networks:
  elfa_network:
    driver: bridge
```

##### Passo 1: Crie o arquivo `.env` e configure dessa forma

```env
CORS_ORIGIN="http://localhost:8080"
API_PORT="3000"
API_HOST="0.0.0.0"
POSTGRES_PASSWORD="postgres"
POSTGRES_USER="postgres"
POSTGRES_DB="elfa_db"
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/elfa_db?schema=public"
```

##### Passo 2: Suba o banco de dados

```bash
docker compose up -d
```

##### Passo 3: Instale as dependências e rode o comando para iniciar o db

```bash
npm install
npm run db:init
```

##### Passo 4: Inicie o servidor

```bash
npm run start
```

ou em modo de desenvolvimento

```bash
npm run dev
```

###### A API estará disponível em `http://localhost:3000`.

---

### Documentação da API

A documentação interativa da API está disponível na rota:

```
GET /docs
```

Essa rota exibe uma interface gerada automaticamente a partir dos schemas Zod com o plugin `fastify-zod-openapi` e `@scalar/fastify-api-reference`.

---

### Endpoints

#### GET `/brands`

Busca todas as marcas.

**Query Params:**

```ts
{
  name?: string;
  page?: string; // default: "1"
  per_page?: string; // default: "10"
  orderBy?: "name" | "createdAt" | "updatedAt" // default "createdAt"
  orderDirection?: "asc" | "desc" // default "desc"
}
```

**Possíveis Erros:**

| Código | Mensagem                 |
| ------ | ------------------------ |
| 400    | `bad request error.`     |
| 403    | `forbidden error.`       |
| 500    | `internal server error.` |

---

#### GET `/products`

Busca todos os produtos com filtros opcionais.

**Query Params:**

```ts
{
  search?: string;
  name?: string;
  page?: string; // default: "1"
  per_page?: string; // default: "10"
  orderBy?: "name" | "createdAt" | "updatedAt" // default "createdAt"
  orderDirection?: "asc" | "desc" // default "desc"
}
```

**Possíveis Erros:**

| Código | Mensagem                 |
| ------ | ------------------------ |
| 400    | `bad request error.`     |
| 403    | `forbidden error.`       |
| 500    | `internal server error.` |

---

#### POST `/products`

Cria um novo produto.

**Body:**

```json
{
  "name": "Chinelo Calm",
  "price": 79.99,
  "description": "Produto confortável",
  "image": "base64string",
  "brandId": "dc2eaa1e-cc48-4c59-ba3f-48dbc08ef36e"
}
```

**Resposta:**

```json
{
  "data": {
    "message": "product created with successfully."
  },
  "statusCode": 201
}
```

**Possíveis Erros:**

| Código | Mensagem                                           |
| ------ | -------------------------------------------------- |
| 400    | `bad request error.`                               |
| 403    | `forbidden error.`                                 |
| 404    | `brand not found.`                                 |
| 409    | `product with this name and brand already exists.` |
| 500    | `internal server error.`                           |
