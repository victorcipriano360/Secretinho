# Secretinho

Previa visual de uma rede social de mensagens anonimas.

## O que existe agora

- App Next.js com React e Tailwind.
- Telas de inicio, socializar, mensagens, perfil, ajustes, login, cadastro e perfil publico em `/@usuario`.
- Dados de exemplo para navegar sem banco de dados.
- Botao para entrar sem login.
- Sem Prisma, sem banco, sem auth real e sem variaveis obrigatorias.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Deploy na Vercel

Configure como projeto Next.js:

- Framework Preset: `Next.js`
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: deixe vazio

Nao precisa configurar banco nem variaveis de ambiente por enquanto.

## Depois

Quando a interface estiver funcionando bem no ar, o banco e o login real podem voltar em uma etapa separada.
