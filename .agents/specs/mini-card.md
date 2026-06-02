# Spec: MiniCard

> Compact stat label+value unit for horizontal summary strips. Compose with MiniCardGroup (pill, outlined, elevated, ghost) and MiniCardStrip (auto-dividers). Size propagates via React context.

**Arquivo:** `components/custom/mini-card.tsx`
**data-slot:** `mini-card`, `mini-card-group`, `mini-card-strip`

---

## Sub-componentes

| Componente | data-slot | Descrição |
|---|---|---|
| `MiniCard` | `mini-card` | Unidade label+value com suporte a ícone, sub-valor, delta e intent |
| `MiniCardGroup` | `mini-card-group` | Container compartilhado com variantes visuais (ghost/pill/outlined/elevated), accent border e contexto de size/locale |
| `MiniCardSeparator` | (div `role=separator`) | Separador vertical vertical — `height: short` (inset) ou `tall` (full stretch) |
| `MiniCardStrip` | `mini-card-strip` | Strip horizontal full-width com auto-dividers (tall), scroll e wrap |

---

## Props

### MiniCardProps

| Prop | Tipo | Padrão | Obrigatória |
|---|---|---|---|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `sub` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `iconIntent` | `MiniCardIntent` | `"default"` | |
| `intent` | `MiniCardIntent` | `"default"` | |
| `delta` | `string \| MiniCardDelta` | — | |
| `size` | `MiniCardSize` | inherits from context | |
| `format` | `CardStatFormat` | — | |
| `locale` | `string` | inherits from context | |
| `currency` | `string` | — | |
| `decimals` | `number` | — | |
| `valueFormatter` | `(value: string \| number) => string` | — | |
| `loading` | `boolean` | `false` | |
| `className` | `string` | — | |

### MiniCardGroupProps

| Prop | Tipo | Padrão | Obrigatória |
|---|---|---|---|
| `variant` | `MiniCardGroupVariant` | `"ghost"` | |
| `size` | `MiniCardSize` | `"md"` | |
| `locale` | `string` | `"en-US"` | |
| `divide` | `boolean` | `false` | |
| `wrap` | `boolean` | `false` | |
| `accent` | `MiniCardIntent` | — | |
| `className` | `string` | — | |
| `children` | `React.ReactNode` | — | ✓ |

### MiniCardSeparatorProps

| Prop | Tipo | Padrão |
|---|---|---|
| `height` | `"short" \| "tall"` | `"tall"` |
| `className` | `string` | — |

### MiniCardStripProps

| Prop | Tipo | Padrão |
|---|---|---|
| `divide` | `boolean` | `true` |
| `scroll` | `boolean` | `false` |
| `wrap` | `boolean` | `false` |
| `className` | `string` | — |
| `children` | `React.ReactNode` | ✓ |

---

## Types

| Type | Valores |
|---|---|
| `MiniCardSize` | `"sm" \| "md" \| "lg"` |
| `MiniCardIntent` | `"default" \| "success" \| "warning" \| "destructive"` |
| `MiniCardGroupVariant` | `"ghost" \| "pill" \| "outlined" \| "elevated"` |
| `MiniCardDelta` | `"up" \| "down" \| "neutral"` |

---

## CVA variants locais

### `miniCardLabelVariants`

| size | Classes |
|---|---|
| sm | `text-xs font-medium tracking-wider text-muted-foreground uppercase truncate` |
| md | `text-xs font-medium tracking-wider text-muted-foreground uppercase truncate` |
| lg | `text-sm font-medium tracking-wider text-muted-foreground uppercase truncate` |

### `miniCardValueVariants`

| size | intent | Classes |
|---|---|---|
| sm | default | `text-xs font-semibold tabular-nums text-foreground` |
| sm | success | `text-xs font-semibold tabular-nums text-success` |
| sm | warning | `text-xs font-semibold tabular-nums text-warning` |
| sm | destructive | `text-xs font-semibold tabular-nums text-destructive` |
| md | default | `text-sm font-semibold tabular-nums text-foreground` |
| md | success | `text-sm font-semibold tabular-nums text-success` |
| md | warning | `text-sm font-semibold tabular-nums text-warning` |
| md | destructive | `text-sm font-semibold tabular-nums text-destructive` |
| lg | default | `text-base font-semibold tabular-nums text-foreground` |
| lg | success | `text-base font-semibold tabular-nums text-success` |
| lg | warning | `text-base font-semibold tabular-nums text-warning` |
| lg | destructive | `text-base font-semibold tabular-nums text-destructive` |

### `miniCardSubVariants`

| size | Classes |
|---|---|
| sm | `text-xs font-medium text-muted-foreground tabular-nums` |
| md | `text-xs font-medium text-muted-foreground tabular-nums` |
| lg | `text-sm font-medium text-muted-foreground tabular-nums` |

### `miniCardIconVariants`

| size | intent | Classes |
|---|---|---|
| sm | default | `size-3 shrink-0 text-muted-foreground` |
| sm | success | `size-3 shrink-0 text-success` |
| sm | warning | `size-3 shrink-0 text-warning` |
| sm | destructive | `size-3 shrink-0 text-destructive` |
| md | default | `size-3.5 shrink-0 text-muted-foreground` |
| md | success | `size-3.5 shrink-0 text-success` |
| md | warning | `size-3.5 shrink-0 text-warning` |
| md | destructive | `size-3.5 shrink-0 text-destructive` |
| lg | default | `size-4 shrink-0 text-muted-foreground` |
| lg | success | `size-4 shrink-0 text-success` |
| lg | warning | `size-4 shrink-0 text-warning` |
| lg | destructive | `size-4 shrink-0 text-destructive` |

### `miniCardGroupVariants`

| variant | size | Classes |
|---|---|---|
| ghost | sm | `flex shrink-0 items-center gap-2` |
| ghost | md | `flex shrink-0 items-center gap-3` |
| ghost | lg | `flex shrink-0 items-center gap-4` |
| pill | sm | `flex shrink-0 items-center gap-2 rounded-lg bg-muted/40 px-3 py-1.5` |
| pill | md | `flex shrink-0 items-center gap-3 rounded-lg bg-muted/40 px-3 py-1.5` |
| pill | lg | `flex shrink-0 items-center gap-4 rounded-lg bg-muted/40 px-3 py-1.5` |
| outlined | sm | `flex shrink-0 items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-3 py-1.5` |
| outlined | md | `flex shrink-0 items-center gap-3 rounded-lg border border-border/60 bg-card/80 px-3 py-1.5` |
| outlined | lg | `flex shrink-0 items-center gap-4 rounded-lg border border-border/60 bg-card/80 px-3 py-1.5` |
| elevated | sm | `flex shrink-0 items-center gap-2 rounded-lg border bg-card px-3 py-1.5 shadow-xs` |
| elevated | md | `flex shrink-0 items-center gap-3 rounded-lg border bg-card px-3 py-1.5 shadow-xs` |
| elevated | lg | `flex shrink-0 items-center gap-4 rounded-lg border bg-card px-3 py-1.5 shadow-xs` |

### Delta colors (const, not CVA)

| delta | Color |
|---|---|
| up | `text-success` |
| down | `text-destructive` |
| neutral | `text-muted-foreground` |

### Accent border (const, not CVA)

| intent | Classes |
|---|---|
| default | `""` |
| success | `border-l-2 border-l-success/60` |
| warning | `border-l-2 border-l-warning/60` |
| destructive | `border-l-2 border-l-destructive/60` |

---

## Comportamento do delta

- `delta` aceita `"up"` | `"down"` | `"neutral"` (keyword, icon-only) ou string com sinal (`"+18%"`, `"-12%"`)
- Direção inferida do sinal: `+` → up, `-` → down, demais → neutral
- String literal (ex: `"+18%"`) renderiza como deltaLabel ao lado do ícone

---

## Layout slots

| Slot | Elemento | Descrição |
|---|---|---|
| Container | `<div data-slot="mini-card">` | Flex row com `gap-1.5`, `items-center`, `min-w-0` |
| Icon | `<Icon>` | CVA `miniCardIconVariants`, `aria-hidden` |
| Label | `<span>` | CVA `miniCardLabelVariants`, uppercase via Tailwind `uppercase` |
| Value | `<span>` | CVA `miniCardValueVariants`, formatado via `applyFmt` |
| Sub | `<span>` | CVA `miniCardSubVariants` |
| Delta | `<span>` | `text-xs font-medium tabular-nums` + delta color |

---

## Estados

| Estado | Comportamento |
|---|---|
| `loading` | Skeletons para label (h-2.5/h-3 × w-14/w-16) e value (h-3.5/h-4 × w-8/w-10) conforme size |
| Normal | Ícone opcional, label em muted-foreground uppercase, valor formatado, sub opcional, delta opcional |
| Dividers (group) | `divide && !wrap` insere `MiniCardSeparator height="short"` entre children |
| Dividers (strip) | `divide && !wrap` insere `MiniCardSeparator height="tall"` entre children |
| Accent (group) | Left border `border-l-2` colorida conforme intent |

---

## Stories

- [x] Default — minimal label+value
- [x] WithIcon — leading icon + iconIntent
- [x] WithSub — secondary value at baseline
- [x] WithDelta — signed string vs keyword direction
- [x] FormatValues — integer, currency, percent, float + locale inheritance
- [x] Intents — default / success / warning / destructive on value
- [x] IconIntents — iconIntent independent from intent
- [x] AllSizes — sm / md / lg presets
- [x] GroupVariants — ghost / pill / outlined / elevated
- [x] GroupAccents — success / warning / destructive left border
- [x] SizeFromGroup — size propagation via context
- [x] StripLayout — MiniCardStrip with auto-dividers
- [x] RiskMatrixSummaryBar — real-world toolbar pattern
- [x] FinancialStrip — elevated variant + accent + delta
- [x] Loading — skeleton in single / group / strip
- [x] ResponsiveWrap — wrap on strip and group
- [x] Standalone — manual MiniCardSeparator composition
