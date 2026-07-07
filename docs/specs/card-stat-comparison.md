# Spec: CardStatComparison

> Cartão de comparação entre dois períodos (current vs previous) com cálculo automático de delta percentual e badge de tendência.

**Arquivo:** `components/ds/card-stat-comparison.tsx`
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
| `locale` | `UILocale` | `"en-US"` | | Locale para strings i18n |

Estende \`FormatOptions\` (inclui locale para formatação numérica).

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

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | Label visível para o nome do cartão |
| Valores numéricos | `tabular-nums` nos valores current/previous |
| i18n | `UI_I18N[locale].cardStats.*`: `thisPeriod`, `lastPeriod`, `noComparison` |

## Stories

- [x] Default — positivo, negativo, neutro
- [x] AllSizes
- [x] AllComparisons
- [x] Loading
- [x] Empty
