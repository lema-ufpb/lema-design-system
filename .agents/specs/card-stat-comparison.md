# Spec: CardStatComparison

> Cartão de comparação entre dois períodos (current vs previous) com cálculo automático de delta percentual e badge de tendência.

**Arquivo:** `components/custom/card-stat-comparison.tsx`
**data-slot:** `card-stat-comparison`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `current` | `number` | — | ✓ |
| `previous` | `number` | — | ✓ |
| `size` | `CardStatSize` | `"md"` | |
| `currentLabel` | `string` | i18n `thisPeriod` | |
| `previousLabel` | `string` | i18n `lastPeriod` | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende \`FormatOptions\`.

---

## CVA variants locais

Nenhuma — usa apenas as variantes compartilhadas:
- `cardStatLabelVariants`
- `cardStatValueVariants`
- `cardStatDescriptionVariants`
- `cardStatHeaderIconVariants`
- `cardStatContentGapVariants`

---

## Comportamento

- Delta: `((current - previous) / |previous|) * 100`
- Trending: `delta > 0.05 → "up"`, `delta < -0.05 → "down"`, else `"neutral"`
- i18n: `currentLabel`/`previousLabel` via `UI_I18N[locale].cardStats`

## Stories

- [x] Default — positivo, negativo, neutro
- [x] AllSizes
- [x] AllComparisons
- [x] Loading
- [x] Empty
