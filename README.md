# toolbox

Sisques Labs toolbox — a collection of small web utilities.

## Tech stack

- [Astro](https://astro.build) (SSG) as the base framework
- React for interactive islands
- Tailwind CSS for styling
- TypeScript throughout, strict mode
- No backend, no database
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) for unit tests

## Setup

```bash
pnpm install
pnpm dev       # start the dev server
pnpm lint      # eslint --fix
pnpm test      # vitest run
pnpm build     # astro check && astro build
```

Node version is pinned in `.nvmrc` (24). Package manager is pnpm, pinned via the `packageManager` field in `package.json`.

## Architecture

DDD + Screaming Architecture, mirroring [`sisques-labs/gardenia-web`](https://github.com/sisques-labs/gardenia-web) adapted to a backend-less static site. See [`AGENTS.md`](AGENTS.md) for the full set of conventions (layering rules, naming, testing, i18n). In short:

- `src/core/<feature>/` — one folder per tool/feature, each with the layers it actually needs: `domain/` (pure types), `application/` (use-cases, only once there's real logic to orchestrate), `infrastructure/` (repositories, only once a tool talks to an API), `presentation/` (`components/`, `hooks/`, `screens/`, `i18n/`). `home` currently only has a `presentation/` layer — it's UI composition, not a domain.
- `src/shared/` — cross-cutting code used by every feature: `presentation/components/` (shell chrome: `app-shell`, `theme-toggle`, `language-switcher`), `presentation/providers/` (theme/locale context), `presentation/i18n/` (locale plumbing + the `shell` dictionary), `presentation/styles/` (global Tailwind stylesheet).
- `src/pages/*.astro` — thin Astro routes (fixed by Astro's routing convention); each just renders one screen from `src/core/<feature>/presentation/screens/`.
- Path alias `@/*` → `./src/*` (configured in `tsconfig.json`, mirrored in `vitest.config.ts`).

Each new tool gets its own route (`src/pages/<tool>.astro`) rendering `src/core/<tool>/presentation/screens/<tool>/<tool>.screen.tsx`, following the same pattern as `home`.

## Git hooks (Husky)

- `pre-commit` runs `lint-staged` (Prettier + ESLint `--fix` on staged `.ts`/`.tsx`/`.astro` files).
- `pre-push` runs `pnpm build && pnpm test:changed`.

Hooks are installed automatically via the `prepare` script on `pnpm install`. Set `HUSKY=0` to skip hook installation (e.g. in CI).

## CI

- `.github/workflows/ci.yml` — lint, test, and build on every pull request via the shared [`sisques-labs/workflows`](https://github.com/sisques-labs/workflows) `node-ci.yml` reusable workflow.
- `.github/workflows/codeql.yml` — CodeQL analysis on push to `develop`/`staging`/`main`, on pull requests, and weekly.
- `.github/workflows/docker.yml` — Docker smoke build (multi-arch, no push) plus a blocking Trivy scan on every pull request.
- `.github/workflows/pr-labeler.yml` — labels pull requests by changed files, per `.github/labeler.yml`.

## Docker

The app is a static build served by nginx. Build and run locally:

```bash
docker build -t toolbox .
docker run -p 8080:8080 toolbox
```

## Releases

`.github/workflows/release-train.yml` runs on every push to `develop`, `staging`, and `main`. It detects integrated conventional-commit changes, bumps the version, builds and publishes the Docker image (`sisqueslabs/toolbox` on Docker Hub, `ghcr.io/sisques-labs/toolbox` on GHCR), and generates `CHANGELOG.md`/GitHub Releases via [`cliff.toml`](cliff.toml). `develop` and `staging` publish alpha/beta pre-releases; `main` publishes stable releases and syncs back into `develop`.
