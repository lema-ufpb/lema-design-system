# LEMA-DS — Design System UFPB

Design system baseado em shadcn/ui · Tailwind CSS v4 · CVA · TypeScript · Storybook.
Registry público em `registry.json` (schema shadcn). Componentes consumíveis via `npx shadcn@latest add`.

## Estrutura

```
components/ui/       → primitivos shadcn (não modificar sem --diff review)
components/ds/   → compostos do design system (lógica de negócio, CVA, i18n)
lib/ui-i18n.ts       → dicionário i18n compartilhado (en-US, pt-BR, es-ES, fr-FR)
lib/utils.ts         → cn() e utilidades
app/globals.css      → tokens CSS (colors, radius, sidebar, charts, success/warning/risk-*)
registry.json        → manifesto de exportação do design system
.storybook/          → configuração do Storybook (vitest browser mode)
.agents/skills/      → skills de review: shadcn/ e design-system/
.agents/templates/   → templates spec-first para novos componentes
```

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4 (`@theme inline`, sem `tailwind.config.js`)
- shadcn/ui (`radix` base, estilo `luma`, package manager: `npm`)
- CVA (`class-variance-authority`) para variantes
- Storybook 10 com Vitest browser mode (`make test` = 840 testes em 118 arquivos)
- i18n: `UI_I18N[locale]` de `@/lib/ui-i18n`

## Regras críticas — sempre aplicar

### Tipografia (scale para sm/md/lg)
```
label/nome:  sm → text-xs font-medium    md → text-sm font-medium    lg → text-base font-medium
valor/num:   sm → text-xs font-semibold  md → text-sm font-semibold  lg → text-base font-semibold
```
**Não usar** `text-sm/text-base/text-lg` em slots de componentes — essa escala está um passo acima do correto.

### Tokens de cor (nunca usar raw Tailwind para semântica)
- Status positivo → `text-success` / `bg-success` / `text-success-foreground`
- Atenção → `text-warning` / `bg-warning` / `text-warning-foreground`
- Erro → `text-destructive`
- Risco → `bg-risk-1` (maior) … `bg-risk-4` (menor)
- Fundo neutro / track → `bg-muted`
- Labels → `text-muted-foreground` · Valores → `text-foreground`

### Padrão CVA single-file (components/ds/)
```tsx
// Ordem obrigatória no arquivo:
// 1. "use client" (se hooks/eventos)
// 2. imports
// 3. // ── Types ──  (export type, export interface)
// 4. // ── Variants ──  (export const *Variants = cva(...), sempre com defaultVariants)
// 5. helpers internos (skeletonDims, formatValue, etc.)
// 6. // ── Component ──  (export function / React.forwardRef)
```

### Loading states
Sempre `<Skeleton>` do shadcn com dimensões que correspondem ao conteúdo real. Nunca `animate-pulse` em divs custom.

### Spacing e layout
- `gap-*` sempre, nunca `space-y-*` ou `space-x-*`
- `size-*` quando width = height (ícones, avatars)
- Valores arbitrários proibidos: sem `gap-[7px]`, `px-[13px]`, etc.
- `truncate` (não `overflow-hidden text-ellipsis whitespace-nowrap`)
- `cn()` para classes condicionais (não template literals)
- Sem `dark:` manual — usar tokens semânticos

### Testes
`make test` deve passar após cada mudança. 840 testes em 118 arquivos via Vitest browser mode.

### Documentação Storybook
- Título das stories segue o padrão `Categoria/Componente` (ex: `Actions/Button`, `Data Display/BarChart`, `Form/Counter`)
- Stories obrigatórias por componente: Default, AllVariants, AllSizes, Loading, Disabled/Error, Locales (se i18n)
- Testes de interação via `play` function com `@storybook/test`
- Cada componente .tsx tem seu .stories.tsx co-localizado no mesmo diretório
- MDX de introdução em `app/Introduction.mdx` com `import { VERSION } from "../lib/version"`
- Links nas docs seguem `/docs/<kind-slug>--docs` (ex: `/docs/form-counter--docs`)

## Workflow spec-first para novos componentes

1. Preencher `.agents/templates/component-spec.md` antes de escrever código
2. Revisar spec (tokens, variantes, a11y, stories) — pode ser revisado pela skill `design-system`
3. Implementar seguindo o checklist do template
4. `make lint` deve continuar passando inclusive sem warnings
5. `make test` deve continuar passando
6. Checar stories no Storybook antes de considerar concluído

## Skills disponíveis

- `.agents/skills/shadcn/SKILL.md` — regras shadcn (componentes, composição, CLI)
- `.agents/skills/design-system/SKILL.md` — regras de design system (escala, tokens, CVA, checklist)
- `.agents/templates/component-spec.md` — template spec-first para novos componentes
