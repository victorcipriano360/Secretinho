# Secretinho

Esqueleto inicial de uma rede social de mensagens anonimas.

## O que ja existe

- App Router com Next.js, React e Tailwind.
- Telas principais: inicio, socializar, mensagens, perfil, ajustes, login, cadastro e perfil publico em `/@usuario`.
- Dados mockados para navegar pelo produto antes do banco.
- Rotas de API com contratos iniciais para auth, busca, follow, perfil e mensagens.
- Schema Prisma preparado para PostgreSQL.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Deploy na Vercel

Configure o projeto como Next.js:

- Framework Preset: `Next.js`
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: deixe vazio

Nao use `public` como Output Directory. Este projeto nao precisa de `vercel.json` para deploy basico na Vercel.

Variaveis de ambiente na Vercel:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/secretinho?schema=public"
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST:5432/secretinho?schema=public"
NEXTAUTH_SECRET="um_valor_grande_aleatorio"
NEXTAUTH_URL="https://secretinho-scrt.vercel.app"
```

Depois de configurar as variaveis, faca um Redeploy.

## Banco de dados

O schema Prisma e a migration inicial ja estao em `prisma/`.

Para criar o banco local/desenvolvimento:

```bash
npm install
copy .env.example .env
npm run db:migrate -- --name init
npm run prisma:generate
```

Antes de rodar a migration, coloque a `DATABASE_URL` real no arquivo `.env`.

Para aplicar as migrations em um banco de producao:

```bash
npm run db:deploy
npm run prisma:generate
```

## Proximos passos

1. Criar/conectar o banco PostgreSQL.
2. Configurar `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `NEXTAUTH_SECRET` e `NEXTAUTH_URL`.
3. Aplicar a migration inicial.
4. Trocar `src/lib/mock-data.ts` por consultas reais com Prisma.
5. Fazer cadastro, login, follow e mensagens persistirem no banco.
