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

## Commit Conventions

Follow the Conventional Commits spec: `<type>(<scope>): <short description>`

Common types:
- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance, config, tooling
- `docs` — documentation only
- `refactor` — code change that isn't a fix or feature
- `test` — adding or updating tests
- `style` — formatting, no logic change

Examples:
- `feat(auth): add JWT middleware for protected routes`
- `fix(prisma): resolve connection timeout on cold start`
- `chore(deps): upgrade express to 5.2.1`
- `docs(readme): add setup instructions and environment variables`
- `refactor(items): extract save logic into dedicated service`
- `test(auth): add unit tests for password hashing`

Rules:
- Keep subject line under 72 characters
- Use imperative mood — "add", not "added" or "adds"
- Lowercase after the colon
- No period at the end

- This follows the Conventional Commits spec, which is the most common standard in professional projects.   

## Pseudocode Guidelines

1. Comment **why**, not just **what**.
2. Use pseudocode only for **non-obvious logic**, not every simple line.
3. Prefer **short comments above a block** instead of line-by-line narration.
4. Keep comments **brief, specific, and direct**.
5. Use pseudocode to explain **flow, intent, business rules, or edge cases**.
6. Avoid comments that simply **repeat the code**.
7. Prefer **clear function and variable names** before adding extra comments.
8. Use pseudocode to explain **important assumptions** and **security-sensitive behavior**.
9. Remove or tighten **temporary learning comments** before finishing the file.
10. Keep comment style **consistent** across the project.
11. Update comments whenever the code changes so they do not go stale.
12. When a section needs too much explanation, consider **extracting a helper function** instead of adding more comments.

## Coding Notes

- Keep TypeScript strict-compatible.
- Use ESM-style local imports with explicit `.js` extensions, matching the
  existing server code.
- Reuse `server/src/lib/prisma.ts` for database access.
- Update `server/prisma/schema.prisma` and migrations together for database
  model changes.
- Do not edit or place source files under generated output directories.
