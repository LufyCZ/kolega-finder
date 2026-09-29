# Kolega Finder

Find classmates in a lecture and choose seats together. Built with Next.js 16 (App Router and Partial Prerendering), Neon Postgres, and Better Auth with Discord login.

## Setup

Requires Bun, Node.js 20.9+, a Neon Postgres database, and a Discord OAuth application.

1. Run `bun install` and copy `.env.example` to `.env`.
2. Set `POSTGRES_DATABASE_URL`, `DISCORD_CLIENT_ID`, and `DISCORD_CLIENT_SECRET`. Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32`. Set `BETTER_AUTH_URL=http://localhost:3000` locally and `BETTER_AUTH_URL=https://kolega-finder.lufy.cz` in production.
3. In the Discord Developer Portal, add both OAuth2 redirects: `http://localhost:3000/api/auth/callback/discord` and `https://kolega-finder.lufy.cz/api/auth/callback/discord`.
4. Run `bun run db:auth` and then `bun run db:schema` against the fresh database.
5. Run `bun run dev` and open `http://localhost:3000`.

Keep `.env` private. Set the same environment variables in production; use a distinct production auth secret. Better Auth manages its tables, while `db/schema.sql` defines lectures and seats. Seat uniqueness is enforced by Postgres.

## Checks

`bun run typecheck`, `bun run lint`, `bun run test`, and `bun run build`.
