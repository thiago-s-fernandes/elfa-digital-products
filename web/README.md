# Elfa Digital Products - Web

Este projeto é uma aplicação web desenvolvida com **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Zod**, **React Hook Form**, **Shadcn** e **React Query** que permite o cadastro, listagem e visualização de produtos com suporte a imagens, preços, marcas e descrições.

## Funcionalidades

- Cadastro de produtos com:
  - Nome
  - Marca (via `brandId`)
  - Preço (R$)
  - Descrição (opcional)
  - Imagem (opcional)
- Validações robustas com **Zod** e **React Hook Form**
- Preview de imagem ao cadastrar
- Listagem com tabela customizada (colunas com imagem, nome, marca e preço)
- Skeletons para carregamento suave
- Feedback visual via toasts com `sonner`

---

## Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [@tanstack/react-table](https://tanstack.com/table/latest)
- [shadcn](https://ui.shadcn.com/)

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── cadastrar/          # Página de cadastro de produtos
│   │   └── page.tsx
│   ├── produtos/
│   │   ├── _components/
│   │   │   └── product-columns.tsx
├── components/             # Componentes reutilizáveis (Input, Button, Card, etc)
├── hooks/                 # Hooks personalizados (ex: useCreateProduct)
├── lib/                   # Funções utilitárias (ex: cn)
├── types/                 # Tipagens globais (ex: models.ts com Product, Brand)
```

---

## Como rodar o projeto localmente

1. **Instale as dependências**

```bash
npm install
```

2. **Configure as variáveis de ambiente**

Crie um `.env` com as informações da API, por exemplo:

```
SITE_ENV_URL=http://localhost:8080
API_BASE_URL=http://localhost:3000
```

4. **Execute o projeto**

```bash
npm run dev
# ou
yarn dev
```

---

## Validação do formulário

Utiliza `zod` para regras de validação como:

- `name`: mínimo de 1 e máximo de 255 caracteres
- `brandId`: formato UUID
- `price`: número positivo
- `image`: aceitação de tipos específicos: jpeg, jpg, png, webp

---

## Upload de imagem

O upload utiliza `FileReader` para gerar o preview localmente como base64 antes do envio.

---

## Tabela de produtos

Componente baseado em `@tanstack/react-table` com suporte a:

- Coluna de imagem (com fallback)
- Nome com responsividade
- Nome da marca via nested object (`brand.name`)
- Preço formatado para BRL (`Intl.NumberFormat`)
- Skeletons enquanto os dados carregam
