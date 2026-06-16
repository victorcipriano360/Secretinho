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

## Proximos passos

1. Criar o banco PostgreSQL.
2. Copiar `.env.example` para `.env` e preencher `DATABASE_URL`.
3. Rodar `npx prisma migrate dev`.
4. Trocar `src/lib/mock-data.ts` por consultas reais com Prisma.
5. Implementar Auth.js/NextAuth ou auth propria com `bcryptjs`.
