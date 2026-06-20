# Spec: CardStats Shared

> Módulo compartilhado da família CardStats. Contém tipos, helpers, variantes CVA compartilhadas e componentes auxiliares.

**Arquivo:** `lib/card-stats-shared.tsx`
**data-slot:** `card-stats-shared`

---

## Tipos

| Tipo | Valores |
|------|---------|
| `FormatPreset` | `"currency" \| "percent" \| "integer" \| "float"` |
| `CardStatTrend` | `"up" \| "down" \| "neutral"` |
| `CardStatSize` | `"sm" \| "md" \| "lg"` |
| `FormatOptions` | `{ format?, decimals?, locale?, currency?, valueFormatter? }` |

---

## CVA variants compartilhadas

Todas com `defaultVariants: { size: "md" }`.

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatLabelVariants` | `text-xs font-medium tracking-wide uppercase` | `text-sm font-medium tracking-wide uppercase` | `text-base font-medium tracking-wide uppercase` |
| `cardStatValueVariants` | `text-xl font-semibold tracking-tight tabular-nums` | `text-2xl font-semibold tracking-tight tabular-nums` | `text-3xl font-semibold tracking-tight tabular-nums` |
| `cardStatDescriptionVariants` | `text-xs` | `text-xs` | `text-sm` |
| `cardStatHeaderIconVariants` | `size-3.5` | `size-4` | `size-5` |
| `cardStatContentGapVariants` | `gap-2` | `gap-3` | `gap-4` |
| `cardStatBadgePaddingVariants` | `px-1.5 py-0.5` | `px-2 py-0.5` | `px-2.5 py-1` |
| `cardStatBadgeTextVariants` | `text-xs font-semibold` | `text-xs font-semibold` | `text-sm font-semibold` |

---

## Helpers (re-exports de `@/lib/format-utils`)

### formatValue(value, format?, opts?)

Re-exportado de `@/lib/format-utils`. Formata valor numérico conforme `FormatPreset` usando `Intl.NumberFormat`.

| Formato | Comportamento |
|---------|---------------|
| `currency` | `style: currency` com `opts.currency` (padrão USD) |
| `percent` | Valor como ratio (0–1) + formato percentual |
| `integer` | Sem casas decimais |
| `float` | Com `opts.decimals` (padrão 2) |

### formatChartValue(value, opts?)

Re-exportado de `@/lib/format-utils`. Aplica `opts.format`/`opts.decimals`/`opts.currency`/`opts.abbreviate` com fallback para `opts.valueFormatter` se presente. Usado pelos componentes de gráfico para formatação de eixos e tooltips.

### applyFormat(value, opts)

Re-exportado de `@/lib/format-utils`. Se `opts.valueFormatter` existe, usa-o. Senão, delega para `formatValue`.

### resolveTrend(trend)

- `true` → `"up"`
- `false` / `undefined` → `false`
- `CardStatTrend` → mesmo valor

### TREND_ICONS / TREND_COLORS

```ts
TREND_ICONS = { up: TrendingUpIcon, down: TrendingDownIcon, neutral: MinusIcon }
TREND_COLORS = { up: "text-success", down: "text-destructive", neutral: "text-muted-foreground" }
```

---

## Componentes

### TrendBadge

```tsx
<TrendBadge trend={CardStatTrend} value={string} size?: CardStatSize />
```

Badge com ícone de tendência + valor. Usa `cardStatBadgePaddingVariants` + `cardStatBadgeTextVariants` para dimensionamento.

Cores:
- `up`: `bg-success/10 text-success`
- `down`: `bg-destructive/10 text-destructive`
- `neutral`: `bg-muted text-muted-foreground`

### CardStatEmptySlot

```tsx
<CardStatEmptySlot icon={ElementType} message={string} sub?: string inverted?: boolean />
```

Slot vazio padronizado, usado nos estados `empty` dos sub-componentes.

---

## Histórico

- SIZE object removido (06/2026) — substituído por CVA variants individuais.
