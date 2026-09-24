# ✨ LEMA Design System

<p align="left">
  <a href="https://github.com/lema-ufpb/lema-design-system/releases"><img src="https://img.shields.io/github/v/release/lema-ufpb/lema-design-system?style=flat-square&label=version" alt="Version"></a>
  <a href="https://ds.lema.ufpb.br"><img src="https://img.shields.io/badge/registry-ds.lema.ufpb.br-0ea5e9?style=flat-square" alt="Registry"></a>
  <a href="https://storybook.js.org"><img src="https://img.shields.io/badge/Storybook-10-FF4785?style=flat-square" alt="Storybook"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/tests-1000%2B-brightgreen?style=flat-square" alt="Tests">
  <img src="https://img.shields.io/badge/TypeScript-100%25-3178c6?style=flat-square" alt="TypeScript">
</p>

Official design system of the **Laboratory of Economics and Applied Modeling (LEMA)** at the Federal University of Paraíba (UFPB). A production-ready React component library built on **shadcn/ui**, **Radix UI** and **Tailwind CSS v4** — accessible (WCAG 2.1 AA), themeable, fully typed, and documented in Storybook.

- **Storybook and registry:** https://ds.lema.ufpb.br
- **Repository:** https://github.com/lema-ufpb/lema-design-system
- **Local Storybook:** `make dev` (port 6006) or a static build with `make build-storybook`

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installing Components via Registry](#installing-components-via-registry)
- [Usage](#usage)
- [Framework Compatibility](#framework-compatibility)
- [Internationalization](#internationalization)
- [Theming and Customization](#theming-and-customization)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Development](#development)
- [Quality and Testing](#quality-and-testing)
- [Contributing](#contributing)
- [Versioning and Releases](#versioning-and-releases)
- [License](#license)
- [Contact](#contact)

---

## 🔭 Overview

LEMA-DS provides a curated set of **378 registry items**: **311 `ds-*` compositions** built on top of **61 shadcn/ui primitives**, plus 5 shared libraries and the `tokens` theme item. They cover dashboards, forms, data display, marketing sections, charts, and application shells. Every component is:

- **Accessible** — WAI-ARIA, keyboard navigation, `prefers-reduced-motion`, and axe checks in Vitest.
- **Themeable** — semantic CSS variables with automatic light/dark/system support via `next-themes`.
- **Typed** — end-to-end TypeScript with `class-variance-authority` (CVA) variants and `VariantProps`.
- **Documented** — spec-first (`docs/specs/`, 370 specs) and co-located Storybook stories (`.stories.tsx`).

Consumer projects install components selectively via the **shadcn CLI** — no monolithic package required.

---

## ✨ Features

- **Shadcn-compatible registry** — install any `ds-*` component with `npx shadcn@latest add @lema-ds/<name>`.
- **Design tokens first** — semantic colors (`--background`, `--primary`, `--success`, `--risk-1`..`4`, `--chart-1`..`5`), typography scale, and radius tokens; no raw Tailwind values for semantic use.
- **Internationalization** — 4 locales out of the box (`en-US`, `pt-BR`, `es-ES`, `fr-FR`) via `lib/ui-i18n.ts` and `UILocaleProvider`.
- **Framework-agnostic** — no `next/*` imports; validated in Next.js, Vite, React Router, TanStack Start, and Astro consumer apps.
- **Responsive and mobile-first** — container queries and adaptive layouts (e.g., `SidebarProvider`, `FooterMenu`).
- **Spec-first workflow** — every `components/ds/` change requires a spec, story, and registry entry.
- **Registry validation** — `registry:sync` and `registry:check` guarantee that every item declares all its dependencies with the `@lema-ds/` namespace.
- **1000+ automated tests** — Vitest browser mode (Playwright) covering interaction and accessibility.

---

## 🧱 Tech Stack

| Technology                   | Version             | Purpose                           |
| ---------------------------- | ------------------- | --------------------------------- |
| React                        | 19                  | UI library                        |
| Next.js                      | 16                  | Framework                         |
| TypeScript                   | 6                   | Type safety                       |
| Tailwind CSS                 | 4 (`@theme inline`) | Styling and tokens                |
| Radix UI (`radix-ui`)        | 1.6                 | Accessible primitives             |
| shadcn/ui                    | —                   | Base component layer              |
| class-variance-authority     | 0.7                 | CVA variants                      |
| Storybook                    | 10                  | Documentation and playground      |
| Vitest + Playwright          | 5 / 1.63            | Unit, interaction, and a11y tests |
| Recharts / react-simple-maps | 3.10 / 5.0          | Charts and geomaps                |

See `package.json` for the full dependency list.

---

## ✅ Prerequisites

| Requirement | Version  | Notes                                                  |
| ----------- | -------- | ------------------------------------------------------ |
| Node.js     | >= 22.12 | CI uses Node 24; install via `nvm` or `fnm`            |
| npm         | >= 10    | Project uses `package-lock.json`                       |
| Make        | any      | Wraps common workflows (`make dev`, `make lint`, etc.) |
| Git         | any      | Conventional Commits required                          |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/lema-ufpb/lema-design-system.git
cd lema-design-system

# 2. Install
npm install

# 3. Run Storybook
make dev
# → http://localhost:6006
```

Other entry points:

```bash
make lint             # Prettier check + ESLint + tsc
make test             # Vitest browser mode
make build-storybook  # Static Storybook + component docs (storybook-static/)
```

---

## 📦 Installing Components via Registry

LEMA-DS is distributed as a **shadcn registry** at `https://ds.lema.ufpb.br`. Consumer projects do not install the whole library — they add only the components they need.

### 1. Register the registry (once per project)

If the project was bootstrapped with `npx shadcn@latest init`, add the LEMA-DS registry:

```bash
npx shadcn@latest registry add @lema-ds https://ds.lema.ufpb.br/r/{name}.json
```

This adds to `components.json`:

```json
{
  "registries": {
    "@lema-ds": "https://ds.lema.ufpb.br/r/{name}.json"
  }
}
```

Verify:

```bash
npx shadcn@latest registry list
cat components.json
```

### 2. Add components

```bash
# Namespaced (recommended, unambiguous)
npx shadcn@latest add @lema-ds/ds-button
npx shadcn@latest add @lema-ds/ds-card-stat
npx shadcn@latest add @lema-ds/ds-data-table

# Shorthand when the name is unique across registries
npx shadcn@latest add ds-button
npx shadcn@latest add ds-hero-layers

# Multiple at once
npx shadcn@latest add @lema-ds/ds-card-stat @lema-ds/ds-bar-chart @lema-ds/ds-data-table

# Direct URL (without local registry entry)
npx shadcn@latest add https://ds.lema.ufpb.br/r/ds-button.json
```

**What gets installed:**

- The source file lands as `ds-<name>.tsx` in the consumer's `aliases.ui` folder (usually `components/ui/`), prefixed to avoid colliding with the `<name>.tsx` primitive.
- All dependencies declared in the registry item are resolved automatically: shared libs (`lib/ui-i18n.ts`, `lib/format-utils.ts`), shadcn primitives, sibling `ds-*` components (via `@lema-ds/<name>`), and npm packages.
- Every `registryDependencies` entry is namespaced (`@lema-ds/<name>`) so the CLI never resolves against `ui.shadcn.com`. `npm run registry:check` enforces completeness — installing a single item in a fresh project works.

---

## 💡 Usage

```tsx
import { Download } from "lucide-react"

import { Button } from "@/components/ui/ds-button"
import { Dashbox } from "@/components/ui/ds-dashbox"
import { DataTable } from "@/components/ui/ds-data-table"

export function Dashboard() {
  return (
    <Dashbox title="Performance" status="live" onRefresh={fetchData}>
      <DataTable columns={columns} data={rows} showSearch pagination />
      <Button variant="outline" startIcon={<Download className="size-4" />}>
        Export
      </Button>
    </Dashbox>
  )
}
```

Explore all variants, props, and live playgrounds in **Storybook** — each component co-locates its `.stories.tsx` with Default, AllVariants, AllSizes, Loading, and a11y checks.

---

## 🔌 Framework Compatibility

The components are **React 19 + Tailwind v4** and **framework-agnostic**: `components/ds/` and `lib/` never import `next/*` (enforced by the ESLint `no-restricted-imports` rule). Links go through `DSLinkProvider`, client-only rendering through `ClientOnly`, and the custom colors come from the `@lema-ds/tokens` item.

Each framework below is validated by `npm run test:consumers`: it generates an app with `shadcn init --template <t> --base radix`, installs 8 registry items (header, footer, map, globe, card-stat, theme toggle, link-provider, tokens), then runs the typecheck and the build.

| Framework             | Supported | Validation                           | Client-side links                                                       |
| --------------------- | --------- | ------------------------------------ | ----------------------------------------------------------------------- |
| Next.js               | Yes       | `test:consumers` (typecheck + build) | `<DSLinkProvider link={Link}>` with `next/link`                         |
| Vite                  | Yes       | `test:consumers` (typecheck + build) | No provider; links render as `<a>`                                      |
| React Router          | Yes       | `test:consumers` (typecheck + build) | `<DSLinkProvider link={({ href, ...p }) => <Link to={href} {...p} />}>` |
| TanStack Start        | Yes       | `test:consumers` (typecheck + build) | Same pattern, with `Link` from `@tanstack/react-router`                 |
| Astro (React islands) | Yes       | `test:consumers` (typecheck + build) | Plain links (`<a>`); use `client:load` on interactive islands           |
| Vue, Svelte, Angular  | No        | —                                    | The components are React                                                |

`test:consumers` validates installation, types, and build; SSR rendering was checked with `renderToString` in Vite. It does not replace a browser test in each framework.

```tsx
// Next.js
import Link from "next/link"
;<DSLinkProvider link={Link}>{children}</DSLinkProvider>
```

**Consumer prerequisites:** React 19, Tailwind v4, the project's own import alias (`@/` or `~/`; the CLI rewrites it), and `shadcn init` run with `--base radix` (the components use Radix `asChild`; Base UI presets swap it for `render` and break the types).

**Where files land:** `registry:build` publishes items without an explicit `target`, so the CLI uses the aliases from `components.json` (`aliases.ui` and `aliases.lib`). This also works in layouts without `src/`, such as React Router's `app/`.

---

## 🌐 Internationalization

Components with visible text support `locale` via the centralized dictionary `lib/ui-i18n.ts`.

| Code    | Language            | Default |
| ------- | ------------------- | ------- |
| `en-US` | English             | Yes     |
| `pt-BR` | Portuguese (Brazil) | —       |
| `es-ES` | Spanish             | —       |
| `fr-FR` | French              | —       |

The dictionary is published as `registry:lib` and installed automatically as a dependency of locale-aware components. Manual install when needed:

```bash
npx shadcn@latest add @lema-ds/ui-i18n
```

**Per-component locale:**

```tsx
import { Dashbox } from "@/components/ui/ds-dashbox"

;<Dashbox title="Status" locale="pt-BR" status="live" />
// Badge → "Online" / "Ao vivo" depending on the locale
```

**App-wide locale (recommended):**

```tsx
import { UILocaleProvider } from "@/components/ui/ds-locale-provider"

;<UILocaleProvider locale="pt-BR">{children}</UILocaleProvider>
```

Resolution order: **`locale` prop → nearest `UILocaleProvider` → `"en-US"`**. Components without `"use client"` (`ds-pagination`, `ds-footer-*`, `ds-about-*`, etc.) cannot read context in Server Components and rely on the prop only. See `docs/specs/ds-locale-provider.md`.

---

## 🎨 Theming and Customization

Tokens are defined in `app/globals.css` via Tailwind v4 `@theme inline` (no `tailwind.config.js`). Consumer projects get the custom tokens (`success`, `warning`, `risk-*`, `highlight-*`) from the `@lema-ds/tokens` registry item.

### Semantic color tokens

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.97 0 0);
  --border: oklch(0.922 0 0);
  --success: oklch(0.72 0.16 155);
  --warning: oklch(0.78 0.14 75);
  --risk-1: oklch(0.62 0.19 28); /* highest */
  --risk-4: oklch(0.92 0.15 105); /* lowest */
  --highlight-violet: oklch(0.68 0.18 295);
  --chart-1: oklch(0.65 0.2 260);
  /* ... */
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

Rules:

- Use semantic tokens (`text-success`, `bg-muted`, `bg-risk-1`..`4`, `bg-highlight-violet`, `text-muted-foreground`) — never raw Tailwind colors for semantic meaning.
- No manual `dark:` overrides — tokens handle dark mode.
- Theme switching via `ToggleTheme` / `ThemeProvider` (`next-themes`) — see `providers/theme.tsx`.

### Typography scale

| Slot  | sm                      | md                      | lg                        |
| ----- | ----------------------- | ----------------------- | ------------------------- |
| Label | `text-xs font-medium`   | `text-sm font-medium`   | `text-base font-medium`   |
| Value | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |

Do not use `text-sm`/`text-base`/`text-lg` directly in component slots — the scale above is canonical.

### Border radius and sizing

- Radius: `rounded-sm` (0.6×), `rounded-md` (0.8×), `rounded-lg` (1×), `rounded-xl` (1.4×), `rounded-2xl` (1.8×), `rounded-3xl` (2.2×), `rounded-4xl` (2.6×), `rounded-full` (circular/pills only).
- Interactive heights: `xs:h-6` · `sm:h-8` · `md:h-9` · `lg:h-10` · `xl:h-12`.
- Icon sizing: `size-3.5` (sm inline) · `size-4` (base) · `size-5` (card header) · `size-6` (page heading).

### Additional tokens

See `app/globals.css` for sidebar, chart, and highlight tokens. Full reference in `docs/specs/DESIGN.md`.

---

## 📁 Project Structure

```
lema-design-system/
├── app/
│   ├── globals.css             # CSS tokens (@theme inline, Tailwind v4)
│   ├── Introduction.mdx        # Storybook landing page
│   └── layout.tsx              # Root layout + ThemeProvider
├── components/
│   ├── ui/                     # 61 shadcn primitives — never edit manually
│   └── ds/                     # 311 compositions (CVA single-file, i18n, Skeleton)
├── lib/
│   ├── utils.ts                # cn()
│   ├── ui-i18n.ts              # i18n dictionary (4 locales, 300+ keys)
│   ├── format-utils.ts         # Intl.NumberFormat + abbreviations
│   ├── card-stats-shared.tsx   # CardStat family shared CVA
│   ├── chart-axis-width.ts     # Chart axis sizing helper
│   ├── client-only.tsx         # ClientOnly (client-only rendering without next/dynamic)
│   └── version.ts              # __APP_VERSION__
├── providers/theme.tsx         # next-themes ThemeProvider
├── .storybook/                 # Storybook 10 + Vitest browser config
├── .github/workflows/          # CI, release-please, CD, post-release sync
├── registry.json               # 378 items (311 ds-* → ui/ds-*.tsx)
├── public/r/                   # Built registry artifacts (shadcn build)
├── docs/
│   ├── specs/                  # 370 component specs (spec-first source of truth)
│   └── templates/component-spec.md
├── scripts/
│   ├── sync-registry-deps.mjs            # registry:sync
│   ├── validate-registry.mjs             # registry:check
│   ├── registry-deps.mjs                 # Shared import → dependency resolution
│   ├── fix-registry-relative-imports.mjs # Post-processing of public/r/*.json
│   ├── build-component-docs.mjs          # components.json + llms.txt for the docs site
│   └── test-consumers.mjs                # test:consumers (per-framework install check)
├── Dockerfile · nginx.conf     # Static Storybook + registry image
└── Makefile                    # make dev / lint / test / registry
```

---

## 🏗️ Architecture

Three layers, from foundation to page blocks:

1. **Foundation** — semantic tokens, i18n dictionary, and shared utilities. The single source of truth for colors, typography, spacing, and language.
2. **Primitives (`components/ui/`)** — 61 unmodified shadcn/ui components (Radix-based). Updated only via `npx shadcn@latest add <component> --yes`.
3. **Compositions (`components/ds/`)** — 311 business-aware components. Each follows the **CVA single-file pattern** (`types → variants → helpers → component`), ships with Skeleton loading, supports `locale`, and declares its dependencies via `@lema-ds/` in `registry.json`.

```
tokens / i18n / utils
        ↓
shadcn primitives (ui/*)  ←  npx shadcn add
        ↓
LEMA-DS compositions (ds/*)  ←  CVA + i18n + a11y
        ↓
public/r/*.json  ←  shadcn build + registry validation
```

---

## 📚 Documentation

| Resource         | Location                                    | Description                                               |
| ---------------- | ------------------------------------------- | --------------------------------------------------------- |
| Storybook        | https://ds.lema.ufpb.br · `make dev` (6006) | Interactive playground, controls, and a11y panel          |
| Specs            | `docs/specs/`                               | 370 markdown specs — API, variants, tokens, a11y, stories |
| Spec template    | `docs/templates/component-spec.md`          | Template for new components (spec-first)                  |
| Product vision   | `docs/specs/PRODUCT.md`                     | Registry, users, and principles                           |
| Design reference | `docs/specs/DESIGN.md`                      | Colors, typography, and component guidelines              |

### Component categories (high-level)

Browse by category in Storybook — full lists are one click away in the sidebar:

About · Actions · Auth · Bento · Blog · CTA · Charts · Chat · Commerce · Contact · Dashboard · Data Display · Delight · Effects · FAQ · Feedback · Footer · Form · Gallery · Header · Hero · Integrations · Layout · LogoCloud · Marketing · Media · Navigation · Onboarding · Pricing · SaaS · Stats · Team · Testimonials · Utilities

The shadcn primitives are listed separately under **Shadcn UI**. Each category groups related `ds-*` components (e.g., **Data Display** → tables, charts, stat cards; **Form** → inputs, selects, date pickers; **Layout** → dashbox, drawer).

---

## 🛠️ Development

### 📜 Scripts

| Command                  | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `make dev`               | Start Storybook (port 6006)                                        |
| `make lint`              | Prettier check + ESLint + `tsc --noEmit`                           |
| `make format`            | Prettier write                                                     |
| `make build-storybook`   | Static Storybook + component docs (same build as the Docker image) |
| `make build-docs`        | Component docs only (`storybook-static/docs/components.json`)      |
| `make test`              | Vitest browser mode (1000+ tests)                                  |
| `make coverage`          | Vitest coverage (v8)                                               |
| `make registry`          | Build `public/r/*.json` from `registry.json`                       |
| `npm run registry:sync`  | Derive missing `registryDependencies`/`dependencies` from imports  |
| `npm run registry:check` | Validate registry vs. files, namespaces, and cycles                |
| `npm run test:consumers` | Install items into a fresh app per framework (requires network)    |
| `make docker-build`      | Build the `design-system:local` image                              |
| `make docker-run`        | Run the image on port 8080                                         |
| `make shadcn-update`     | Update all shadcn primitives (`--all --overwrite`)                 |
| `make clean`             | Remove `.next`, `storybook-static`, `.vite`                        |

### 🔄 Registry workflow

Every change to `components/ds/` must keep the registry consistent:

```bash
# 1. Edit component(s) in components/ds/
# 2. Sync dependencies from source imports (additive, never removes)
npm run registry:sync

# 3. Build public artifacts
make registry

# 4. Validate (fails on missing dep, wrong namespace, or cycle)
npm run registry:check

# 5. Lint + test before push
make lint && make test
```

Conventions:

- `registry.json` entries for `components/ds/` use `name: "ds-*"` and `target: "components/ui/ds-*.tsx"`. Primitives in `components/ui/` keep their original name/target.
- `registryDependencies` are always namespaced: `@lema-ds/<name>` (e.g., `@lema-ds/button`, `@lema-ds/ui-i18n`).
- Local imports (`@/lib/*`, `@/components/ui/*`, `@/components/ds/*`, `./sibling`) become `registryDependencies`; npm packages become `dependencies` (types like `@types/geojson` → `devDependencies`).
- `Slot` comes from `radix-ui` (`import { Slot } from "radix-ui"` / `Slot.Root`), not `@radix-ui/react-slot`.
- Each `components/ds/*.tsx` has a co-located `.stories.tsx` and a spec in `docs/specs/ds-*.md`.

---

## 🧪 Quality and Testing

- **Lint:** `make lint` — Prettier, ESLint, and TypeScript. Zero warnings required.
- **Tests:** `make test` — Vitest browser mode with Playwright, 1000+ tests across 160+ files. Interaction tests via Storybook `play` functions and `@storybook/test`.
- **Accessibility:** Storybook `addon-a11y` + axe checks in tests; `prefers-reduced-motion` respected; WAI-ARIA patterns for interactive components.
- **Registry:** `npm run registry:check` ensures each item declares everything it imports and that no dependency cycle exists.
- **CI:** every PR against `develop` must pass the **Lint** and **Build** (`make build-storybook`) checks.

```bash
make lint
make test
make coverage   # view coverage report
```

---

## 🤝 Contributing

### 🌿 Branching

- `main` — production, protected, releases via `release-please`.
- `develop` — integration branch, protected. All feature branches target `develop`.
- `feature/*` / `fix/*` — created from `develop`.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
# ... commits ...
git push origin feature/my-feature
# Open PR against develop
```

### 📝 Conventional Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) — `release-please` uses them to bump versions and generate `CHANGELOG.md`.

| Prefix                                   | Bump  | Changelog section |
| ---------------------------------------- | ----- | ----------------- |
| `feat:`                                  | minor | Features          |
| `fix:`                                   | patch | Bug Fixes         |
| `perf:`                                  | patch | Performance       |
| `refactor:`                              | patch | Refactor          |
| `docs:`                                  | patch | Documentation     |
| `revert:`                                | patch | Reverts           |
| `feat!:` / `BREAKING CHANGE:`            | major | Breaking Changes  |
| `chore:` `style:` `test:` `build:` `ci:` | —     | Hidden            |

Examples:

```bash
git commit -m "feat(dashbox): add fullscreen toggle"
git commit -m "fix(progress-bar): correct warning intent color"
git commit -m "docs(readme): update registry install steps"
git commit -m "refactor(card-stats)!: rename CardStat to CardStatBase"
```

### 🔀 Pull Requests

1. Push your branch and open a PR against `develop` — CI runs automatically. For PRs from forks, a maintainer may need to approve the CI run first.
2. Get an approving review from a code owner (required by branch protection) and address feedback; keep commits conventional.
3. After merge to `develop`, changes are aggregated for the next `develop → main` release PR.
4. Merge to `main` triggers `release-please`, which opens `chore(main): release X.Y.Z`.

---

## 🏷️ Versioning and Releases

- **Versioning:** Semantic Versioning via `release-please` (current version in `.release-please-manifest.json`).
- **Changelog:** Auto-generated `CHANGELOG.md` from conventional commits.
- **Release flow:**
  1. PR `develop → main` → merge.
  2. `release-please` opens `chore(main): release X.Y.Z` → merge → tag `vX.Y.Z` and GitHub release.
  3. **CD** builds the Docker image (Storybook + registry served by nginx), pushes it to `ghcr.io/lema-ufpb/lema-design-system`, and updates the deploy manifest that Argo CD syncs to https://ds.lema.ufpb.br.
  4. **Post-release sync** opens `chore(release): sync develop after vX.Y.Z` to bring the manifest, version, and changelog back to `develop`.
- **Registry build:** `make registry` produces `public/r/*.json`, served at `https://ds.lema.ufpb.br/r/`.

---

## 📄 License

MIT — © 2026 LEMA/UFPB. See [LICENSE](./LICENSE).

---

## 📬 Contact

**Laboratory of Economics and Applied Modeling (LEMA)**  
Federal University of Paraíba (UFPB)  
https://lema.ufpb.br · https://github.com/lema-ufpb/lema-design-system

For issues and feature requests, please use [GitHub Issues](https://github.com/lema-ufpb/lema-design-system/issues).
