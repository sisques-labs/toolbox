# toolbox

Sisques Labs toolbox — a collection of small web utilities.

## Tools

This is the current catalog of tools. It's kept in sync with `src/core/toolbox/presentation/components/sidebar/sidebar.catalog.ts` — see [`AGENTS.md`](AGENTS.md) for the rule that every added/removed tool must update this list.

**Text**
- Case converter — convert text between camelCase, snake_case, kebab-case and more
- Slug generator — turn any text into a URL-friendly slug
- Lorem ipsum — generate placeholder paragraphs
- Regex tester — test regular expressions against sample text
- Text diff — compare two texts line by line
- Numeronym generator — abbreviate long words like "internationalization" → "i18n"
- Text statistics — count characters, words, sentences and reading time
- NATO phonetic alphabet — spell out text using the NATO phonetic alphabet

**Data**
- JSON formatter — validate, format and minify JSON
- JSON diff — compare two JSON documents and list the differences
- YAML ↔ JSON — convert between YAML and JSON
- JSON ↔ CSV — convert between a JSON array of objects and CSV

**Encoding & security**
- Base64 — encode and decode Base64 strings
- URL encoder — encode and decode URL-formatted (percent-encoded) strings
- HTML entities — escape and unescape HTML special characters
- JWT decoder — inspect the header and payload of a JSON Web Token
- Hash generator — generate MD5 and SHA hashes from text

**Generators**
- UUID generator — generate random v4 UUIDs
- ULID generator — generate lexicographically sortable ULIDs
- Password generator — create strong random passwords
- OTP / TOTP — generate time-based one-time passwords from a Base32 secret
- Crontab generator — build and explain cron schedule expressions
- QR code — generate a QR code from text or a URL

**Converters**
- Timestamp converter — convert between Unix time and readable dates
- Color converter — convert colors between hex, RGB and HSL
- Base converter — convert integers between binary, octal, decimal and hex
- Chmod calculator — compute Unix file permissions as octal and symbolic modes

**Network**
- IP subnet calculator — get network, broadcast and host range from a CIDR
- HTTP status codes — look up HTTP status codes and their reason phrases
- IP address converter — convert an IPv4 address between decimal, hex and binary

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

- `src/core/toolbox/` — the site's only feature: the tool sidebar/header shell plus one `domain`/`application` pair per utility (the 24 tools listed above), with `domain/` (pure types), `application/use-cases/<name>/` (one folder per tool's logic), and `presentation/` (`components/`, `screens/`, `i18n/`) for the shell and per-tool panels.
- `src/shared/` — cross-cutting code used by every feature: `presentation/components/` (shell chrome: `app-shell`, `theme-toggle`, `language-switcher`), `presentation/providers/` (theme/locale context), `presentation/i18n/` (locale plumbing + the `shell` dictionary), `presentation/styles/` (global Tailwind stylesheet).
- `src/pages/*.astro` — thin Astro routes (fixed by Astro's routing convention), rendering `ToolboxScreen` (the unprefixed `/` and the localized `/[lang]/` route both point at the same screen; there's no per-tool route — tool selection happens client-side in the sidebar).
- Path alias `@/*` → `./src/*` (configured in `tsconfig.json`, mirrored in `vitest.config.ts`).

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

## License

[MIT](LICENSE)
