# Ribeiro — Personal Website

Website pessoal desenvolvido para apresentar meus projetos, experiências e um pouco sobre minha trajetória como desenvolvedor.

O objetivo do projeto é criar uma experiência simples, moderna e personalizada, com foco em uma interface minimalista, responsiva e com boas interações visuais.

A aplicação foi construída utilizando tecnologias modernas do ecossistema Svelte, priorizando organização de código, desempenho e facilidade de manutenção.

## Tecnologias utilizadas

- [SvelteKit](https://kit.svelte.dev/) — Framework utilizado para estruturar a aplicação e suas páginas.
- [Svelte 5](https://svelte.dev/) — Biblioteca responsável pela construção dos componentes da interface.
- [TypeScript](https://www.typescriptlang.org/) — Adiciona tipagem ao projeto, tornando o código mais seguro e previsível.
- [Tailwind CSS](https://tailwindcss.com/) — Sistema de estilização utilizado para criar layouts responsivos.
- [shadcn-svelte](https://www.shadcn-svelte.com/) — Biblioteca de componentes reutilizáveis para Svelte.
- [Motion Core](https://motion-core.dev/) — Ferramentas e componentes para criação de animações e interações.
- [GSAP](https://gsap.com/) — Biblioteca utilizada para animações avançadas.
- [Vite](https://vite.dev/) — Ferramenta responsável pelo ambiente de desenvolvimento e build.
- [Vitest](https://vitest.dev/) — Utilizado para testes automatizados.
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) — Ferramentas para manter o código organizado e padronizado.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/rbrosa.git
```

Acesse a pasta do projeto:

```bash
cd rbrosa
```

Instale as dependências:

```bash
bun install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PUBLIC_DISCORD_ID=discord_id
```

Substitua `discord_id` pelo ID da sua conta do Discord.

Essa variável é utilizada para carregar informações públicas do perfil através da integração com o Discord.

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
bun run dev
```

Para iniciar e abrir automaticamente no navegador:

```bash
bun run dev -- --open
```

## Build de produção

Para gerar a versão otimizada para produção:

```bash
bun run build
```

Para visualizar o resultado do build localmente:

```bash
bun run preview
```

## Qualidade de código

Verificar problemas de formatação e padrões:

```bash
bun run lint
```

Formatar os arquivos automaticamente:

```bash
bun run format
```

## Estrutura do projeto

```
src/
├── lib/
│   ├── assets/          # Imagens, arquivos estáticos e recursos visuais
│   ├── components/      # Componentes reutilizáveis da interface
│   │   ├── layout/      # Componentes de estrutura da página
│   │   └── ui/          # Componentes básicos de interface
│   ├── hooks/           # Lógicas reutilizáveis relacionadas ao Svelte
│   ├── services/        # Integrações e serviços externos
│   ├── stores/          # Estados compartilhados da aplicação
│   └── utils.ts         # Funções auxiliares
│
├── routes/              # Páginas e rotas da aplicação
└── app.html             # Documento HTML principal
```

## Deploy

O projeto utiliza o adapter do Vercel e está preparado para publicação na plataforma.

Para gerar a versão final:

```bash
bun run build
```

Após o processo, a aplicação estará pronta para ser publicada.

## Licença

Este projeto foi desenvolvido para fins de portfólio pessoal.
