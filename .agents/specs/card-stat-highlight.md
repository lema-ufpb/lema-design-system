# Spec: CardStatHighlight

> Cartão de destaque (hero KPI) com fundo colorido sólido, círculos decorativos e 7 variantes de cor.

**Arquivo:** `components/custom/card-stat-highlight.tsx`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `variant` | `CardStatHighlightVariant` | `"primary"` | |
| `size` | `CardStatSize` | `"md"` | |
| `description` | `string` | — | |
| `trend` | `CardStatTrend \| boolean` | — | |
| `trendValue` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps` + `VariantProps<typeof cardStatHighlightVariants>`.

---

## CVA variants

### cardStatHighlightVariants (wrapper do cartão)

| Variant | Classes |
|---------|---------|
| `primary` | `bg-primary text-primary-foreground` |
| `emerald` | `bg-success text-success-foreground` |
| `amber` | `bg-warning text-warning-foreground` |
| `rose` | `bg-destructive text-white` |
| `violet` | `bg-highlight-violet text-highlight-violet-foreground` |
| `sky` | `bg-highlight-sky text-highlight-sky-foreground` |
| `white` | `bg-white text-foreground` |

### Locais (dimensionamento)

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatHighlightBoxVariants` | `size-8 rounded-lg` | `size-9 rounded-xl` | `size-11 rounded-xl` |
| `cardStatHighlightIconVariants` | `size-4` | `size-5` | `size-6` |
| `cardStatHighlightValueVariants` | `text-2xl font-semibold tracking-tight tabular-nums` | `text-3xl font-semibold tracking-tight tabular-nums` | `text-4xl font-semibold tracking-tight tabular-nums` |
| `cardStatHighlightDescVariants` | `text-xs` | `text-sm` | `text-base` |
| `cardStatHighlightTrendIconVariants` | `size-3.5` | `size-5` | `size-6` |

Compartilhada: `cardStatLabelVariants`.

---

## Variante white

- Fundo `bg-white text-foreground`
- Círculos decorativos usam `bg-muted/10` e `bg-muted/5` (em vez de `bg-white/*`)
- IconBox usa `bg-muted/10` (em vez de `bg-white/20`)
- Skeletons mantêm `bg-muted` nativo (sem overlay)
- `CardStatEmptySlot` com `inverted={false}` (texto escuro)

## Stories

- [x] Default
- [x] AllVariants — todas as 7 variantes
- [x] AllSizes
- [x] BannerKPI
- [x] Loading
- [x] Empty
