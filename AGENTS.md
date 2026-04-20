# AGENTS.md

## Scope

These instructions apply to the entire repository. Use `AGENTS.local.md` for
machine-specific notes; that file is intentionally ignored by git.

## Project Overview

- This is a second-brain project with active implementation currently under
  `server`.
- `server` is an ESM TypeScript Express API.
- Persistence uses Prisma 7 with PostgreSQL through `@prisma/adapter-pg`.
- The generated Prisma client is written to `server/src/generated/prisma`.
- The current data model covers users, saved items, tags, saved-item/tag joins,
  and embeddings.
- `client` and `extension` currently exist as placeholder directories.

## Useful Commands

Run these from `server` unless noted otherwise.

- `npm install`: install server dependencies.
- `npm run dev`: start the API with `tsx watch src/index.ts`.
- `npx prisma generate`: regenerate the Prisma client after schema changes.
- `npx prisma migrate dev`: create and apply local database migrations.
- `npx tsc --noEmit`: typecheck the server.

## Environment

- Copy `server/.env.example` to `server/.env` for local development.
- `DATABASE_URL` is required before Prisma-backed routes can run.
- `JWT_SECRET` is listed for auth-related work.
- `PORT` defaults to `3000` when not set.
- Do not commit real `.env` files or generated Prisma output.

## Coding Notes

- Keep TypeScript strict-compatible.
- Use ESM-style local imports with explicit `.js` extensions, matching the
  existing server code.
- Reuse `server/src/lib/prisma.ts` for database access.
- Update `server/prisma/schema.prisma` and migrations together for database
  model changes.
- Do not edit or place source files under generated output directories.
