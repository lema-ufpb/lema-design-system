# Spec: PieChart

---

## Propósito

_Gráfico de pizza/donut baseado em recharts PieChart. Suporta variantes pie e donut, legenda interativa com toggle de fatias, active shape expandido, labels percentuais externos, e label central no donut com valor total ou da fatia hovered._

**Usar quando:** Mostrar proporções e composição de um todo — distribuição percentual, fatias de mercado, alocação orçamentária.  
**Não usar quando:** Mais de 8 categorias (dificulta leitura), comparações precisas (usar BarChart), séries temporais (usar LineChart).  
**Alternativa se não se aplicar:** BarChart horizontal para comparações, RadarChart para múltiplas dimensões.

---

## Localização

| Campo      | Valor                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arquivo    | `components/ds/pie-chart.tsx`                                                                                                                                                  |
| data-slot  | `pie-chart`                                                                                                                                                                    |
| Tipo       | `registry:component`                                                                                                                                                           |
| Categoria  | `Data Display`                                                                                                                                                                 |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Label, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip), `lucide-react` (PieChart), `class-variance-authority`, `format-utils` |

---

## API — Props

| Prop             | Tipo                                     | Padrão     | Obrigatória | Descrição                                         |
| ---------------- | ---------------------------------------- | ---------- | ----------- | ------------------------------------------------- |
| `data`           | `PieChartItem[]`                         | —          | ✓           | Array de itens com label, value, color            |
| `variant`        | `"pie" \| "donut"`                       | `"pie"`    |             | Tipo do gráfico                                   |
| `title`          | `string`                                 | —          |             | Título                                            |
| `subtitle`       | `string`                                 | —          |             | Subtítulo                                         |
| `footer`         | `React.ReactNode`                        | —          |             | Rodapé                                            |
| `height`         | `number`                                 | `280`      |             | Altura do canvas em px                            |
| `showLegend`     | `boolean`                                | `true`     |             | Exibe legenda                                     |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` |             | Posição da legenda                                |
| `showTooltip`    | `boolean`                                | `true`     |             | Exibe tooltip                                     |
| `showLabels`     | `boolean`                                | `false`    |             | Labels percentuais externos                       |
| `innerLabel`     | `string`                                 | —          |             | Label central no donut (padrão: "Total" i18n)     |
| `paddingAngle`   | `number`                                 | `0`        |             | Gap entre fatias em graus                         |
| `valueFormatter` | `(value: number) => string`              | —          |             | Formata valores (fallback se `format` não suprir) |
| `format`         | `FormatPreset`                           | —          |             | Preset de formatação                              |
| `decimals`       | `number`                                 | —          |             | Casas decimais                                    |
| `currency`       | `string`                                 | `"USD"`    |             | Código da moeda                                   |
| `abbreviate`     | `boolean`                                | `false`    |             | Abreviação locale-aware                           |
| `locale`         | `UILocale`                               | `"en-US"`  |             | Locale                                            |
| `loading`        | `boolean`                                | `false`    |             | Estado de carregamento                            |
| `className`      | `string`                                 | —          |             | Classes extras                                    |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
| -------- | ------- | ------ |
| —        | —       | —      |

_Sem variantes CVA dimensionais._

**Slots do componente:**

- `chartWrapperVariants` — wrapper externo (`flex w-full flex-col`)
- `chartHeaderVariants` — container título/subtítulo (`flex flex-col px-1 pb-4`)
- `chartTitleVariants` — título (`text-sm leading-tight font-semibold text-foreground`)
- `chartSubtitleVariants` — subtítulo (`mt-0.5 text-xs text-muted-foreground`)
- `chartFooterVariants` — rodapé (`mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground`)

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `text-foreground`       | título, tooltip name, tooltip percentage, center label value, legenda value                                   |
| `text-muted-foreground` | subtítulo, tooltip formatted value, center label text, center label total, legenda label, footer, empty state |
| `bg-muted`              | empty state icon circle                                                                                       |
| `bg-card`               | tooltip background                                                                                            |
| `border-border`         | footer divider, empty state border, tooltip border                                                            |
| `var(--chart-1..5)`     | fill das fatias (cíclico)                                                                                     |
| `var(--card)`           | stroke das fatias, donut center fill                                                                          |

---

## Escala tipográfica e de tamanho

| Slot                         | sm  | md                                           | lg  |
| ---------------------------- | --- | -------------------------------------------- | --- |
| Título                       | —   | `text-sm leading-tight font-semibold`        | —   |
| Subtítulo                    | —   | `text-xs`                                    | —   |
| Center label value (donut)   | —   | `fontSize: 22` `fontWeight: 700` (SVG)       | —   |
| Center label text (donut)    | —   | `fontSize: 11` (SVG)                         | —   |
| Center label percent (donut) | —   | `fontSize: 11` (SVG)                         | —   |
| Tooltip name                 | —   | `text-xs font-semibold`                      | —   |
| Tooltip value                | —   | `text-xs text-muted-foreground tabular-nums` | —   |
| Tooltip percent              | —   | `text-xs font-semibold tabular-nums`         | —   |
| Legenda label                | —   | `text-xs`                                    | —   |
| Legenda value                | —   | `text-xs tabular-nums`                       | —   |
| Legenda percent              | —   | `text-xs font-semibold tabular-nums`         | —   |
| External label               | —   | percentual formatado (condicional > 4%)      | —   |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loading={true}`    | `<PieChartSkeleton>` com setores SVG animados. Suporta `isDonut`.                                                                                  |
| `data.length === 0` | Empty state com ícone `PieChartIcon`, mensagens i18n `emptyState.*`.                                                                               |
| Hover na fatia      | Active shape expandido (+8px outerRadius). Donut: inner ring highlight. Center label mostra nome/valor da fatia.                                   |
| Donut center label  | Padrão: "Total" (i18n `pieChart.total`). Hover: nome + valor + percentual da fatia.                                                                |
| Toggle de fatias    | Clique na legenda oculta fatia. Fatias ocultas são removidas do pie (remanejamento visual). Total do legend permanece baseado nos dados originais. |
| External labels     | Percentual formatado, exibido apenas se > 4%.                                                                                                      |

---

## Acessibilidade

| Requisito                    | Implementação                                    |
| ---------------------------- | ------------------------------------------------ |
| Itens de legenda interativos | `role="button"`, `tabIndex={0}`, `aria-pressed`  |
| Teclado na legenda           | Enter e Espaço                                   |
| Valores numéricos            | `tabular-nums`                                   |
| Outer labels                 | Filtrados para > 4% para evitar clutter          |
| i18n                         | `UI_I18N[locale].pieChart.total`, `emptyState.*` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Donut` — Donut
- [x] `DonutBudget` — Donut Budget
- [x] `WithSliceLabels` — With Slice Labels
- [x] `DonutWithLabels` — Donut With Labels
- [x] `PaddedSlices` — Padded Slices
- [x] `CustomColors` — Custom Colors
- [x] `NoLegend` — No Legend
- [x] `WithLocale` — With Locale
- [x] `LegendPositions` — Legend Positions
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `WithFooter` — With Footer

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N` se houver strings fixas
