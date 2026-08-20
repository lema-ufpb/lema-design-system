# Spec: CardStatCompact

> Cartão de estatística compacto com layout horizontal (ícone-label-valor-badge em linha).

**Arquivo:** `components/ds/card-stat-compact.tsx`
**data-slot:** `card-stat-compact`

---

## Props

| Prop         | Tipo                             | Padrão      | Obrigatória |
| ------------ | -------------------------------- | ----------- | ----------- |
| `label`      | `string`                         | —           | ✓           |
| `value`      | `string \| number`               | —           | ✓           |
| `size`       | `CardStatSize`                   | `"md"`      |             |
| `variant`    | `"default" \| "muted" \| "flat"` | `"default"` |             |
| `trend`      | `CardStatTrend \| boolean`       | —           |             |
| `trendValue` | `string`                         | —           |             |
| `icon`       | `React.ElementType`              | —           |             |
| `className`  | `string`                         | —           |             |
| `loading`    | `boolean`                        | `false`     |             |
| `empty`      | `boolean`                        | `false`     |             |

Estende \`FormatOptions\`.

---

## CVA variants locais

| Variant                        | sm                                                  | md                                                  | lg                                                   |
| ------------------------------ | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| `cardStatCompactValueVariants` | `text-lg font-semibold tracking-tight tabular-nums` | `text-xl font-semibold tracking-tight tabular-nums` | `text-2xl font-semibold tracking-tight tabular-nums` |
| `cardStatIconBoxVariants`      | `size-9 rounded-xl`                                 | `size-10 rounded-2xl`                               | `size-12 rounded-2xl`                                |
| `cardStatIconInnerVariants`    | `size-4`                                            | `size-5`                                            | `size-6`                                             |

Compartilhadas: `cardStatDescriptionVariants`.

---

## Estados

| Estado    | Comportamento                                                                             |
| --------- | ----------------------------------------------------------------------------------------- |
| `loading` | Skeleton para iconBox, label, value, trendBadge                                           |
| `empty`   | IconBox muted com ActivityIcon, label atenuado, "—", "No data"                            |
| Normal    | Ícone com cor de tendência (success/destructive/muted), label, valor compacto, TrendBadge |

## Stories

- [x] Default
- [x] AllSizes
- [x] AllVariants
- [x] MutedVariant — variante muted (bg-muted shadow-none ring-0)
- [x] FlatVariant — variante flat (bg-background shadow-none ring-0)
- [x] Loading
- [x] Empty
