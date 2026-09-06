# Docs — LEMA-DS

Fonte de verdade spec-first. Todo `components/ds/*.tsx` tem `docs/specs/*.md`.

## Estrutura

```
docs/
├── accessibility.md        # WCAG 2.1 AA, princípios, testes
├── specs/                  # 316 specs (62 ui + 261 ds, 325 registry items)
│   ├── PRODUCT.md          # Visão estratégica (registry, usuários, princípios)
│   ├── DESIGN.md           # Cores, tipografia, componentes
│   ├── ds-*.md             # 261 specs ds-* (ex: ds-card-stat, ds-hero-layers)
│   └── *.md                # 62 specs ui primitivos
└── templates/
    └── component-spec.md   # Template spec-first (Propósito, API, CVA, Tokens, A11y, Stories)
```

## Specs — contagem

- **Registry:** `325` itens (`261` `ds-*` → `components/ui/ds-*.tsx` + `62` `components/ui` + `3` libs `ui-i18n/format-utils/card-stats-shared`)
- **Components/ds:** `250+` `.tsx` (522 arquivos com `.stories.tsx`)
- **Specs:** `316` `.md` (100% coverage: `241/241` ds iniciais + `16` Aceternity/Launch UI inspirados: `tilt-card`, `spotlight-card`, `tracing-beam`, `typewriter`, `aurora-background`, `floating-dock` + `hero-layers`, `hero-glow`, `feature-sticky`, `marquee-duo`, `navbar-floating` + `screenshot`, `mockup`, `glow`, `glass`, `fade`)
- **i18n:** `lib/ui-i18n.ts` 4 locales (`en-US`, `pt-BR`, `es-ES`, `fr-FR`), 300+ chaves

## Workflow spec-first

1. Copiar `docs/templates/component-spec.md` → `docs/specs/<nome>.md`
2. Preencher: Propósito, Localização, API Props, Variantes CVA (com `defaultVariants`), Tokens semânticos, Escala `sm=text-xs/md=text-sm/lg=text-base`, Comportamentos (`Skeleton`), Acessibilidade (`aria-*`, `prefers-reduced-motion`), Stories obrigatórias
3. Revisar via skill `design-system`
4. Implementar `components/ds/<nome>.tsx` (ordem: `"use client"` → imports → `// Types` → `// Variants` `cva()` → helpers → `// Component`)
5. `make lint` (0 erros) + `make registry` (rebuild `public/r`) + `make test` (>1000 testes)

## Categorias (exemplos)

- **Actions:** `button`, `icon-button`, `toggle-theme`
- **Layout:** `dashbox`, `dashrow`, `modal`, `dashboard` (`app-sidebar`+`section-cards`), `hero-layers`, `hero-glow`
- **Data Display:** `card-stat-*` (9), `data-table`, `avatar`, `badge`, `timeline`
- **Charts (13):** `bar-chart`, `line-chart`, `pie-chart`, `gantt`, `contribution-graph`
- **Marketing (80+):** `hero-section`, `bento-grid`, `pricing-grid`, `testimonials`, `footer-*`, `header-*`, `feature-sticky`, `marquee-duo`, `navbar-floating`
- **Effects (Aceternity):** `tilt-card`, `spotlight-card`, `tracing-beam`, `typewriter`, `aurora-background`, `floating-dock`
- **Utilities (Launch UI):** `screenshot` (theme-aware), `mockup`, `glow`, `glass` (1..5), `fade` (x/y/top…), `border-beam`

> Specs são fonte de verdade para `make test` e `Storybook`. Sem spec, componente não entra em `registry.json`.
