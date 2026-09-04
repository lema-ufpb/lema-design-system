# LEMA-DS — Design System UFPB

> **Instrução para agentes de IA:** Antes de qualquer tarefa neste repositório, carregue obrigatoriamente as skills `design-system` e `shadcn` usando `ToolSkill`. Elas contêm as regras de tokens, CVA, Storybook e shadcn que este projeto segue.

Design system baseado em shadcn/ui · Tailwind CSS v4 · CVA · TypeScript · Storybook.
Registry público em `registry.json` (schema shadcn). Componentes consumíveis via `npx shadcn@latest add`.

## Estrutura

```
components/ui/       → primitivos shadcn — **NÃO ALTERAR O CÓDIGO FONTE**
                       Atualizar exclusivamente com `npx shadcn@latest add <component> --yes`
components/ds/   → compostos do design system (lógica de negócio, CVA, i18n)
lib/ui-i18n.ts       → dicionário i18n compartilhado (en-US, pt-BR, es-ES, fr-FR)
lib/utils.ts         → cn() e utilidades
app/globals.css      → tokens CSS (colors, radius, sidebar, charts, success/warning/risk-*)
registry.json        → manifesto de exportação do design system
.storybook/          → configuração do Storybook (vitest browser mode)
docs/specs/          → specs de todos os componentes (ui + custom)
docs/specs/PRODUCT.md  → visão estratégica do produto (register, usuários, princípios)
docs/specs/DESIGN.md   → documentação visual do design system (cores, tipografia, componentes)
docs/templates/      → templates spec-first para novos componentes
```

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4 (`@theme inline`, sem `tailwind.config.js`)
- shadcn/ui (`radix` base, estilo `luma`, package manager: `npm`)
- CVA (`class-variance-authority`) para variantes
- Storybook 10 com Vitest browser mode (`make test` = 840 testes em 118 arquivos)
- i18n: `UI_I18N[locale]` de `@/lib/ui-i18n`

## Regras críticas — sempre aplicar

### Componentes shadcn (components/ui/) — NÃO ALTERAR

Todo componente em `components/ui/` é gerenciado **exclusivamente** pelo CLI externo:

```bash
npx shadcn@latest add <component> --yes
```

Seu código-fonte **NÃO DEVE SER ALTERADO**. Se por qualquer motivo for alterado, reinstale o primitivo com `npx shadcn@latest add <component> --yes` para restaurar a versão oficial. Isso inclui correções de tipos, ajustes de estilo, renomeação de props ou qualquer outra modificação manual.

### Convenção de exportação no registry.json (prefixo ds-)

Todo item do `registry.json` cujo arquivo-fonte está em `components/ds/` **DEVE**:

- ter `name` prefixado com `ds-` (ex: `ds-card-stat`, `ds-search-bar`, `ds-button`)
- ter `files[].target` apontando para `components/ui/ds-<nome>.tsx` — assim, ao instalar via `npx shadcn@latest add`, o arquivo cai na pasta `ui/` do consumidor (a única que ele tem por padrão), prefixado para não colidir com o primitivo que porventura estende (ex: `ui/button.tsx` + `ui/ds-button.tsx`)
- manter `files[].path` inalterado, apontando para o arquivo real neste repo (`components/ds/<nome>.tsx`) — só `name` e `target` mudam, nunca o path de origem

Itens cujo arquivo-fonte está em `components/ui/` (primitivos shadcn) **NÃO** levam prefixo: `name` e `target` seguem `components/ui/<nome>.tsx`.

Ao renomear ou criar um item `ds-*`, atualize também qualquer `registryDependencies` em outros itens que referenciem o nome antigo/sem prefixo. Depois de editar `registry.json`:

```bash
make registry                          # reconstrói public/r/*.json
node scripts/validate-registry.mjs     # valida path/registro (não valida name/target)
```

`make registry` não remove `public/r/<nome-antigo>.json` órfãos ao renomear um item — apague-os manualmente.

### Stories obrigatórios

Cada componente em `components/ui/` e `components/ds/` **DEVE** ter seu arquivo de stories correspondente (`.stories.tsx` co-localizado no mesmo diretório). A falta de stories quebra a documentação do Storybook e o `make lint`.

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
- Trend/delta: `text-success` (up) · `text-destructive` (down)
- Highlight fill: `bg-highlight-violet` / `bg-highlight-sky` / `bg-highlight-white`
- Charts: `--chart-1` a `--chart-5`, nunca hex hardcoded

### Escala de tamanhos (sm/md/lg)

Para componentes com variante de tamanho, sempre usar esta tabela:

| Slot       | sm         | md       | lg       |
| ---------- | ---------- | -------- | -------- |
| Icon       | `size-3.5` | `size-4` | `size-5` |
| Track/bar  | `h-2`      | `h-3`    | `h-4`    |
| Row height | `h-7`      | `h-8`    | `h-9`    |

### Icon sizing

Nunca dimensionar ícones independentemente do container. Usar `size-*` (e nunca `w-* h-*`) quando isolados:

- Inline sm: `size-3.5` · Inline base: `size-4` · Card header: `size-5` · Page heading: `size-6`

### Border radius (sempre usar tokens do design system)

`rounded-sm` (0.6× radius), `rounded-md` (0.8×), `rounded-lg` (radius), `rounded-xl` (1.4×), `rounded-2xl` (1.8×), `rounded-3xl` (2.2×), `rounded-4xl` (2.6×), `rounded-full` (apenas circulares/pills)

### Interactive element heights

`xs: h-6` · `sm: h-8` · `md: h-9` · `lg: h-10` · `xl: h-12`

### Data Display

- Tabelas: row height `h-10` (standard) / `h-8` (compact); células numéricas com `tabular-nums`
- Progresso: track `bg-muted`, fill `bg-primary` (ou `bg-success`/`bg-destructive`)
- Charts: usar `--chart-1..5`, sempre com `Chart` wrapper do shadcn

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

1. Preencher `docs/templates/component-spec.md` antes de escrever código
2. Revisar spec (tokens, variantes, a11y, stories) — pode ser revisado pela skill `design-system`
3. Implementar seguindo o checklist do template
4. `make lint` deve continuar passando inclusive sem warnings
5. `make test` deve continuar passando
6. Checar stories no Storybook antes de considerar concluído

## Templates

- `docs/templates/component-spec.md` — template spec-first para novos componentes
