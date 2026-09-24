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
docs/specs/          → specs de todos os componentes (ui + custom) — 316 specs (325 itens no registry)
docs/specs/PRODUCT.md  → visão estratégica do produto (registry, usuários, princípios)
docs/specs/DESIGN.md   → documentação visual do design system (cores, tipografia, componentes)
docs/templates/      → templates spec-first para novos componentes
```

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS v4 (`@theme inline`, sem `tailwind.config.js`)
- shadcn/ui (`radix` base, estilo `luma`, package manager: `npm`)
- CVA (`class-variance-authority`) para variantes
- Storybook 10 com Vitest browser mode (`make test` > 1000 testes em 160+ arquivos — 325 itens no registry, 250+ `components/ds`)
- i18n: `UI_I18N[locale]` de `@/lib/ui-i18n` (4 locales, 300+ chaves). O locale efetivo vem de `useUILocale(localeProp)` (`components/ds/locale-provider.tsx`): prop → `UILocaleProvider` → `"en-US"`. Em componentes client **não** declare `locale = "en-US"` na desestruturação; use `locale: localeProp` + `const locale = useUILocale(localeProp)` no topo. Se a ausência de `locale` tem significado próprio (formatação/textos fixos), use `useOptionalUILocale`. Componentes sem `"use client"` mantêm só a prop. Spec: `docs/specs/ds-locale-provider.md`

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
- (no JSON **publicado** em `public/r/`, `scripts/fix-registry-relative-imports.mjs` remove o `target` e renomeia o arquivo para `ds-<nome>.tsx`: o CLI então usa `aliases.ui`/`aliases.lib` do consumidor, o que funciona em layouts sem `src/`, como o `app/` do React Router)
- manter `files[].path` inalterado, apontando para o arquivo real neste repo (`components/ds/<nome>.tsx`) — só `name` e `target` mudam, nunca o path de origem

Itens cujo arquivo-fonte está em `components/ui/` (primitivos shadcn) **NÃO** levam prefixo: `name` e `target` seguem `components/ui/<nome>.tsx`.

Ao renomear ou criar um item `ds-*`, atualize também qualquer `registryDependencies` em outros itens que referenciem o nome antigo/sem prefixo. Depois de editar `registry.json`:

```bash
make registry                          # reconstrói public/r/*.json
node scripts/validate-registry.mjs     # valida path/registro e dependências vs. imports (não valida name/target)
```

`make registry` não remove `public/r/<nome-antigo>.json` órfãos ao renomear um item — apague-os manualmente.

### Dependências dos itens do registry (obrigatório)

O CLI do shadcn só instala o que o item declara — um item que importa algo não declarado quebra em projetos consumidores (`Cannot find module`) mesmo passando aqui.

- **Todo `registryDependencies` é namespaced:** use `@lema-ds/<nome>` (ex.: `@lema-ds/button`, `@lema-ds/ui-i18n`). Nomes sem namespace são resolvidos pelo CLI contra `ui.shadcn.com` e falham para itens que só existem aqui (`ui-i18n`, `card-stat-shared`, `ds-*`…).
- **Declare tudo que o código importa:** imports locais (`@/lib/*`, `@/components/ui|ds/*`, `./irmão`) viram `registryDependencies`; pacotes npm viram `dependencies` (tipos de pacotes como `geojson` → `devDependencies: ["@types/geojson"]`). `react`, `react-dom`, `next` e `@/lib/utils` são fornecidos pelo consumidor. `cn` é um pacote npm real (usado pelos primitivos) — não remover.
- **`Slot` vem de `radix-ui`** (`import { Slot } from "radix-ui"` e `Slot.Root`) — nunca de `@radix-ui/react-slot`, que não é dependência deste repo.
- **Imports `@/components/ui/<x>` sempre apontam para o primitivo.** O `scripts/fix-registry-relative-imports.mjs` só renomeia imports de `components/ds/` (`@/components/ds/<x>` e `./irmão` dentro de arquivos `components/ds/`) para `ds-<x>` no JSON publicado.
- Fluxo: editar o componente → `npm run registry:sync` (preenche o que falta em `registry.json`, nunca remove) → `make registry` → `npm run registry:check`. O check falha por dependência faltante, sem namespace, import sem item correspondente ou ciclo.

### Framework-agnóstico (components/ds/ e lib/)

Os itens são instalados em consumers **Next.js, Vite, React Router, TanStack Start e Astro (todos cobertos por `npm run test:consumers`)** (React 19 + Tailwind v4, `shadcn init --base radix`). Vue, Svelte e Angular não são suportados: os componentes são React.

- **Nunca** importe `next` ou `next/*` (regra ESLint `no-restricted-imports`).
- Links: use `DSLink` (`@/components/ds/link-provider`); o app injeta o `Link` do seu router com `DSLinkProvider`. Sem provider, renderiza `<a>`.
- Sem SSR: `ClientOnly` (`@/lib/client-only`) no lugar de `next/dynamic` com `ssr:false`; code-splitting com `React.lazy` + `Suspense`.
- Evite `window`/`document`/`localStorage` durante a renderização: só em efeitos, handlers ou atrás de `typeof window` / `useSyncExternalStore`.
- Cores customizadas (`success`, `warning`, `risk-*`, `highlight-*`) vêm do item `@lema-ds/tokens`, declarado em `registryDependencies` de quem as usa.
- Ao alterar itens de header/footer/mapa/globo ou a publicação do registry, rode `make registry && npm run test:consumers` (instala num app de cada framework, com typecheck e build; precisa de rede).

### Stories obrigatórios

Cada componente em `components/ui/` e `components/ds/` **DEVE** ter seu arquivo de stories correspondente (`.stories.tsx` co-localizado no mesmo diretório). A falta de stories quebra a documentação do Storybook e o `make lint`.

### Checklist obrigatório ao criar/atualizar componente em components/ds/

Sempre que um componente em `components/ds/` for **criado ou atualizado**, a mesma alteração **DEVE** sincronizar todos os artefatos abaixo — nenhum é opcional, e "atualizado" inclui mudança de props, variantes, comportamento ou categoria/`title` no Storybook:

1. **Spec** — criar ou atualizar `docs/specs/ds-<nome>.md` (template em `docs/templates/component-spec.md`). Componente novo sem spec, ou spec que não reflete as props/variantes atuais, é considerado incompleto.
2. **`registry.json`** — adicionar ou atualizar a entrada do componente, seguindo a convenção de prefixo `ds-` descrita acima. Depois de editar, rodar:
   ```bash
   npm run registry:sync                  # completa registryDependencies/dependencies a partir dos imports
   make registry
   npm run registry:check                 # = node scripts/validate-registry.mjs
   ```
3. **`app/Introduction.mdx`** — atualizar as contagens afetadas (total do registry, `ds-*`, specs) e a grade "Explore por categoria": ajustar a contagem de itens da categoria existente, ou adicionar um novo card se o componente abrir uma categoria (`title` no meta do `.stories.tsx`) que ainda não existe ali. Todo link de card usa o formato `/?path=/docs/<categoria-slug>-<componente-slug>--docs` — verificar contra o `index.json` real do Storybook antes de commitar, nunca adivinhar o slug.

Isso é além do `.stories.tsx` já exigido pela regra "Stories obrigatórios" acima.

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
- ID de doc de cada história é `<kind-slug>-<component-slug>--docs` (ex: `form-counter--docs`) — mas um link **markdown** (`[Texto](/docs/form-counter--docs)`) é a forma segura de referenciar, pois o MDX reescreve automaticamente para o roteamento real do Storybook; um `<a href="/docs/...">` escrito como JSX cru **não** passa por essa reescrita e quebra — use `/?path=/docs/<id>` nesse caso, e sempre confira o `id` contra o `index.json` real do Storybook em vez de adivinhar

## Workflow spec-first para novos componentes

1. Preencher `docs/templates/component-spec.md` antes de escrever código
2. Revisar spec (tokens, variantes, a11y, stories) — pode ser revisado pela skill `design-system`
3. Implementar seguindo o checklist do template
4. `make lint` deve continuar passando inclusive sem warnings
5. `make test` deve continuar passando
6. Checar stories no Storybook antes de considerar concluído
7. Seguir o "Checklist obrigatório ao criar/atualizar componente em components/ds/" acima (`registry.json` + `app/Introduction.mdx`) antes de considerar a tarefa concluída

## Templates

- `docs/templates/component-spec.md` — template spec-first para novos componentes
