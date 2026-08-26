# AGENTS.md — Toolbox

## Stack

- Astro 7 (static output, no server), React 19 for interactive islands, TypeScript strict, pnpm@11
- Styling: Tailwind CSS v4
- No backend, no database — static site only
- Testing: Vitest 4 + React Testing Library, jsdom
- No routing library — Astro's file-based `src/pages/*.astro` is the only router

## Architecture — DDD + Screaming Architecture

Mirrors [`sisques-labs/gardenia-web`](https://github.com/sisques-labs/gardenia-web), adapted to a backend-less static site: no GraphQL/Zustand/TanStack Query layer exists here (yet). Locale combines a `[lang]` URL segment (`/en/`, `/es/`) with a client-side toggle (React Context + `localStorage`) — see the i18n section below.

Features live under `src/core/{feature}/`, each with only the layers it actually needs:

- **domain/** — pure TypeScript, zero framework imports. Types/interfaces for the feature's data.
- **application/** — `use-cases/{name}/{name}.use-case.ts`, one folder per use case, plus `ports/` (interfaces infrastructure must implement). Only add this layer once a feature has real orchestration logic — don't create an empty use-case for a feature that's pure UI composition.
- **infrastructure/** — repositories/API clients implementing the ports. Only needed once a feature talks to an external API.
- **presentation/** — `screens/`, `components/`, `hooks/`, `i18n/`, `schemas/` (if a form needs validation), `providers/` (if the feature owns cross-component client state).

`src/core/toolbox/` is the site's only feature: the tool sidebar/header shell plus one `domain`/`application` pair per utility, grouped into categories (text, data, encoding & security, generators, converters, network, crypto, web, development, math, measurement, images) and their `presentation` panels. The full, current list of tools lives in the README's "Tools" section (see the README-sync rule below), not here — don't duplicate it in this file.

**README sync (mandatory):** any change that adds or removes a tool (a new `application/use-cases/{name}/`, a new `ToolId`/catalog entry, or the removal of one) must update the README's "Tools" section in the same change. That section is the canonical, always-current catalog of what the toolbox can do — keep it grouped by category and in sync with `src/core/toolbox/presentation/components/sidebar/sidebar.catalog.ts`. A PR that adds/removes a tool without touching the README is incomplete.

Cross-layer rules:
- domain never imports application/infrastructure/presentation
- application may import domain + infrastructure (through its own ports)
- infrastructure may import domain + shared http/client code
- presentation may import application use-cases, domain types, and `shared/`

`src/shared/` holds cross-cutting code used by every feature:
- `presentation/components/` — shell chrome (`app-shell`, `theme-toggle`, `language-switcher`), not feature-specific
- `presentation/providers/` — `theme.provider.tsx`, `locale.provider.tsx`, aggregated in `providers.tsx`
- `presentation/i18n/` — `locale.ts` (supported locales, default, guard), `widen-literals.ts`, `shell/` dictionary (site chrome copy)
- `presentation/styles/` — the global Tailwind stylesheet, imported once from `src/pages/index.astro`

`src/pages/*.astro` are thin route adapters (fixed location, Astro's own convention) — each just renders one screen from `src/core/{feature}/presentation/screens/{name}/{name}.screen.tsx` inside a single `client:load` island. Don't compose multiple independent React islands into one page via Astro slots — Astro can't pass live React children across the framework boundary that way; a screen owns its whole subtree (providers included) internally.

Path alias `@/*` → `./src/*` (`tsconfig.json`, mirrored in `vitest.config.ts` as a Vite `resolve.alias` — Vitest doesn't read tsconfig paths on its own). Use `@/...` for any cross-folder import; relative imports (`./`, `../`) are fine only between files in the same immediate folder (e.g. `es.ts` importing `./en`).

## Components

- Split a component into subcomponents / extract a hook when it **mixes responsibilities** (data + business logic + presentation) — qualitative, not a line-count threshold.
- Named exports only (`export function Name`) — no default exports, except i18n dictionaries (`export default dict`).
- Props typed inline or as `{ ... }` object type for simple components; extract a named `interface` once there are 3+ props or the shape is reused.

## State management

No server data yet — when the first tool needs one, decide the HTTP client and any caching layer then, and document the choice here rather than guessing ahead of time.

| Data origin | Tool |
|---|---|
| Cross-cutting client state (theme, locale) | React Context in `shared/presentation/providers/` |
| Feature-local client state | `useState`/`useReducer` in the component/hook |
| Feature-shared client state (used by more than one component in that feature) | React Context in that feature's own `presentation/providers/` |

## Naming conventions

- Use cases: `{name}.use-case.ts`, class `{Name}UseCase`, in `application/use-cases/{name}/`
- Repository ports: `{name}.repository.port.ts` in `application/ports/`
- Screens: `{name}.screen.tsx`, component `{Name}Screen`, folder `screens/{name}/` — no business logic inline, compose from hooks/components
- Components: `{name}.tsx`, folder `components/{name}/`, exported `{Name}` (PascalCase) — component name matches the kebab-case folder
- Hooks: `hooks/{hook-name}/{hookName}.hook.ts` (once a feature needs one), exported `use{Name}`
- Providers: `{name}.provider.tsx` directly under `presentation/providers/` (no per-file subfolder), aggregated in that layer's `providers.tsx` if there's more than one
- i18n dictionaries: `en.ts` / `es.ts` per module, default export + `export type {Name}Dict`

No barrel `index.ts` files unless a module explicitly needs a public API surface.

## Testing — Strict TDD (mandatory)

- `pnpm test` — unit tests (Vitest + React Testing Library), global `jsdom` environment, `globals: true` (no need to import `describe`/`it`/`expect`/`vi`)
- `pnpm lint` and `pnpm build` (`astro check && astro build`, i.e. the type check) before considering any work done
- Tests co-located as `{name}.spec.ts`/`.spec.tsx` next to the source file. Write the test RED first, then implement to GREEN — don't write implementation and backfill tests after.
- Every i18n module needs an `i18n-parity.spec.ts` asserting `en`/`es` expose the exact same set of keys.
- `vitest.setup.ts` polyfills `localStorage` (Node's own experimental global shadows jsdom's on newer Node versions) and pins `navigator.language` to `es-ES` so locale-detection tests are deterministic — it also resets `localStorage` and `<html>`'s class/`lang` before each test, since the jsdom `document`/mocked storage persist across tests within one file.

## i18n

- Custom TypeScript dictionaries (no external library, no JSON), `as const`
- Per module: `src/core/{module}/presentation/i18n/en.ts` + `es.ts` (shell-level copy lives in `src/shared/presentation/i18n/shell/`)
- `es.ts` uses `satisfies WidenStringLiterals<{Module}Dict>` so it's checked against the English shape without freezing its own literal types
- No central dictionary aggregator (gardenia's `get-dictionary.ts`) yet — each screen imports the one or two dicts it needs directly. Add an aggregator once enough modules make manual wiring unwieldy.
- Spanish variant: **castellano de España** — tuteo, vocabulario peninsular. No voseo ni regionalismos latinoamericanos (applies to product copy, not to conversational tone with the user).
- Locale is a client-side toggle persisted to `localStorage` (`toolbox:locale`), and also reachable via a `[lang]` URL segment (`/en/`, `/es/`, mirroring gardenia-web) generated by `src/pages/[lang]/index.astro` — that route seeds `ToolboxScreen`'s `initialLocale` prop so the page renders in the URL's locale on first paint. The unprefixed `/` still serves `DEFAULT_LOCALE` with the in-app toggle, so the same content is reachable both ways.

## Git

- Base branch for release trains: `main`, with `develop`/`staging` synced by the release-train workflow. Feature branches → PR → `develop`.
- Conventional Commits, free scope. **No AI attribution in commit messages.**
- PRs capped at ~400 lines — split into chained PRs if larger.

## Docker

- 3-stage build: `deps` → `builder` (pnpm, `astro build`) → `runner` (`nginx-unprivileged`, static `dist/`)
- Port 8080
