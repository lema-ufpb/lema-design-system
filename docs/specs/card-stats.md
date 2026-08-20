# Spec: CardStats (família)

> Família de 9 cartões de estatística. Cada variante resolve um caso de uso específico de exibição de métricas.

---

## Propósito

Exibir métricas e indicadores em formato de cartão, com suporte a formatação de valores, tendências, progresso, comparação, sparklines, gauges, heatbars e listas.

**Usar quando:** Necessário exibir dados numéricos com formatação (moeda, percentual, inteiro, float), indicadores de tendência (up/down/neutral), progresso em relação a metas, comparação entre períodos, ou visualizações como gauge/heatbar.

**Não usar quando:** O conteúdo não é uma métrica ou indicador; usar `Card` simples.

---

## Localização

| Campo                | Valor                                                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo barrel       | `components/ds/card-stats.tsx`                                                                                                                      |
| data-slot            | `card-stats`                                                                                                                                        |
| Módulo compartilhado | `lib/card-stats-shared.tsx`                                                                                                                         |
| Tipo                 | `registry:component` (barrel) — cada sub-componente é instalável individualmente via `card-stat`, `card-stat-compact`, etc.                         |
| Categoria            | `Data Display`                                                                                                                                      |
| Depende de           | `Card`, `CardAction`, `CardContent`, `CardHeader` (shadcn/ui/card), `Progress`, `Skeleton`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `Badge` |

---

## Sub-componentes

| Componente           | Arquivo                    | Spec                                               |
| -------------------- | -------------------------- | -------------------------------------------------- |
| `CardStat`           | `card-stat.tsx`            | [card-stat.md](card-stat.md)                       |
| `CardStatCompact`    | `card-stat-compact.tsx`    | [card-stat-compact.md](card-stat-compact.md)       |
| `CardStatComparison` | `card-stat-comparison.tsx` | [card-stat-comparison.md](card-stat-comparison.md) |
| `CardStatProgress`   | `card-stat-progress.tsx`   | [card-stat-progress.md](card-stat-progress.md)     |
| `CardStatSparkline`  | `card-stat-sparkline.tsx`  | [card-stat-sparkline.md](card-stat-sparkline.md)   |
| `CardStatHighlight`  | `card-stat-highlight.tsx`  | [card-stat-highlight.md](card-stat-highlight.md)   |
| `CardStatList`       | `card-stat-list.tsx`       | [card-stat-list.md](card-stat-list.md)             |
| `CardStatGauge`      | `card-stat-gauge.tsx`      | [card-stat-gauge.md](card-stat-gauge.md)           |
| `CardStatHeatbar`    | `card-stat-heatbar.tsx`    | [card-stat-heatbar.md](card-stat-heatbar.md)       |

Todos os sub-componentes aceitam `size` (`"sm" | "md" | "lg"`, padrão `"md"`) e aplicam a escala CVA correspondente.

---

## Tipos compartilhados

Definidos em `lib/card-stats-shared.tsx`:

| Tipo            | Valores                                                       |
| --------------- | ------------------------------------------------------------- |
| `FormatPreset`  | `"currency" \| "percent" \| "integer" \| "float"`             |
| `CardStatTrend` | `"up" \| "down" \| "neutral"`                                 |
| `CardStatSize`  | `"sm" \| "md" \| "lg"`                                        |
| `FormatOptions` | `{ format?, decimals?, locale?, currency?, valueFormatter? }` |

---

## Variantes CVA compartilhadas

Definidas em `lib/card-stats-shared.tsx`:

| Variant                        | sm                                                  | md                                                   | lg                                                   |
| ------------------------------ | --------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `cardStatLabelVariants`        | `text-xs font-medium tracking-wide uppercase`       | `text-sm font-medium tracking-wide uppercase`        | `text-base font-medium tracking-wide uppercase`      |
| `cardStatValueVariants`        | `text-xl font-semibold tracking-tight tabular-nums` | `text-2xl font-semibold tracking-tight tabular-nums` | `text-3xl font-semibold tracking-tight tabular-nums` |
| `cardStatDescriptionVariants`  | `text-xs`                                           | `text-xs`                                            | `text-sm`                                            |
| `cardStatHeaderIconVariants`   | `size-3.5`                                          | `size-4`                                             | `size-5`                                             |
| `cardStatContentGapVariants`   | `gap-2`                                             | `gap-3`                                              | `gap-4`                                              |
| `cardStatBadgePaddingVariants` | `px-1.5 py-0.5`                                     | `px-2 py-0.5`                                        | `px-2.5 py-1`                                        |
| `cardStatBadgeTextVariants`    | `text-xs font-semibold`                             | `text-xs font-semibold`                              | `text-sm font-semibold`                              |

---

## Helpers compartilhados

| Export                               | Descrição                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `formatValue(value, format?, opts?)` | Formata valor conforme `FormatPreset` usando `Intl.NumberFormat`                     |
| `applyFormat(value, opts)`           | Aplica `valueFormatter` customizado ou `formatValue`                                 |
| `resolveTrend(trend)`                | Resolve `boolean \| CardStatTrend` para `CardStatTrend \| false`                     |
| `TREND_ICONS`                        | `{ up: TrendingUpIcon, down: TrendingDownIcon, neutral: MinusIcon }`                 |
| `TREND_COLORS`                       | `{ up: "text-success", down: "text-destructive", neutral: "text-muted-foreground" }` |
| `TrendBadge`                         | Badge com ícone de tendência + valor, dimensionado via `cardStatBadge*Variants`      |
| `CardStatEmptySlot`                  | Slot vazio padronizado com ícone, mensagem e subtítulo                               |

---

## Acessibilidade (família)

| Requisito          | Implementação                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Role semântico     | `<ul>` + `<li>` em CardStatList; demais usam elementos semânticos de Card                    |
| Valores numéricos  | `tabular-nums` em todos os valores                                                           |
| Ícones decorativos | `aria-hidden` em todos os ícones                                                             |
| SVG decorativos    | `aria-hidden` em sparkline, gauge, heatbar SVGs                                              |
| Progress           | `Progress` do shadcn (role `progressbar`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`) |
| Tooltip            | `Tooltip` do shadcn com `TooltipContent` em heatbar                                          |
| i18n               | `UI_I18N[locale].cardStats.*` para strings `thisPeriod`, `lastPeriod`, `noComparison`        |

---

## Checklist geral

- [x] `defaultVariants` declarado em todas as variantes CVA
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em valores
- [x] `truncate` em labels
- [x] `aria-hidden` em ícones decorativos
- [x] `cn()` para classes condicionais
- [x] `gap-*` (nunca `space-y-*` / `space-x-*`)
- [x] Prop `locale` integrada via `UI_I18N`
