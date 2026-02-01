Editor Usage

Commands:

- Start editor app: `pnpm --filter ./apps/editor dev` (runs on port 3002)
- Run unit tests: `pnpm test:unit` (requires `pnpm install` to add dev deps)
- Run e2e tests: `pnpm test:e2e` (ensure editor is running on :3002 first)

Persistence:
- Save/Load uses `POST /api/preview` and `GET /api/preview` which stores `data/editor-preview.json` in the repo root.

Notes:
- Components live in `packages/ui` and are used by the editor preview.
- Tests and playwright config are scaffolded; install dev dependencies before running them.
