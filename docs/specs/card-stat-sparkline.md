# Spec: CardStatSparkline

> Cartão de estatística com sparkline SVG (curva Catmull-Rom suavizada) para visualização de tendência temporal.

**Arquivo:** `components/ds/card-stat-sparkline.tsx`
**data-slot:** `card-stat-sparkline`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `data` | `number[]` | `[]` | |
| `size` | `CardStatSize` | `"md"` | |
| `trend` | `CardStatTrend \| boolean` | — | |
| `trendValue` | `string` | — | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |
| `locale` | `UILocale` | — | |

Estende \`FormatOptions\`.

---

## CVA variants locais

Nenhuma — usa apenas as variantes compartilhadas: `cardStatLabelVariants`, `cardStatValueVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`.

---

## Sparkline SVG

- Curva Catmull-Rom suavizada com tensão 0.4
- Dimensões: sm=90×32, md=120×44, lg=150×56
- Gradiente de área preenchida sob a curva
- Cor do traço baseada na tendência
- Último ponto destacado com círculo

## Estados

| Estado | Comportamento |
|--------|---------------|
| `loading` | Skeletons para label, value, sparkline area |
| `empty` | FlatSparklineSvg (linha tracejada), "No history yet" (ou `UI_I18N[locale].cardStatSparkline.noHistory` se locale fornecido) |
| Normal | Sparkline + valor formatado + TrendBadge ou descrição |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| SVG decorativo | `aria-hidden` em todos os elementos SVG |
| i18n | `UI_I18N[locale].cardStatSparkline.*` para empty state |

## Stories

- [x] Default — com data, sem data, trend
- [x] AllSizes
- [x] AllMetrics
- [x] Loading
- [x] Empty
