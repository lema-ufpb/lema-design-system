# Spec: ScatterChart

---

## Propósito

_Gráfico de dispersão (scatter plot) baseado em recharts ScatterChart. Suporta múltiplas séries, formas de ponto customizáveis (círculo, cruz, diamante, quadrado, estrela, triângulo, wye), bubble chart via ZAxis, linha de tendência (regressão linear), brush contínuo customizado para zoom no eixo X._

**Usar quando:** Visualizar correlação entre duas variáveis numéricas, detectar outliers, clusters, ou tendências. Bubble chart quando uma terceira dimensão (tamanho) está disponível.
**Não usar quando:** Dados categóricos (usar BarChart), séries temporais com muitos pontos (usar LineChart).
**Alternativa se não se aplicar:** LineChart para séries temporais, HeatmapChart para densidade.

---

## Localização

| Campo      | Valor                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arquivo    | `components/ds/scatter-chart.tsx`                                                                                                                                                                            |
| data-slot  | `scatter-chart`                                                                                                                                                                                              |
| Tipo       | `registry:component`                                                                                                                                                                                         |
| Categoria  | `Data Display`                                                                                                                                                                                               |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis), `lucide-react` (Crosshair), `class-variance-authority`, `format-utils` |

---

## API — Props

| Prop             | Tipo                                     | Padrão      | Obrigatória | Descrição                                                                                        |
| ---------------- | ---------------------------------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `series`         | `ScatterSeries[]`                        | —           | ✓           | Array de séries com name, data (pontos x/y/z), color, shape                                      |
| `title`          | `string`                                 | —           |             | Título                                                                                           |
| `subtitle`       | `string`                                 | —           |             | Subtítulo                                                                                        |
| `footer`         | `React.ReactNode`                        | —           |             | Rodapé                                                                                           |
| `height`         | `number`                                 | `320`       |             | Altura do canvas                                                                                 |
| `showGrid`       | `boolean`                                | `true`      |             | Grid horizontal e vertical                                                                       |
| `showLegend`     | `boolean`                                | `false`     |             | Exibe legenda                                                                                    |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`  |             | Posição da legenda                                                                               |
| `showTooltip`    | `boolean`                                | `true`      |             | Exibe tooltip com valores X, Y, Z                                                                |
| `showTrendLine`  | `boolean`                                | `false`     |             | Linha de regressão linear                                                                        |
| `xLabel`         | `string`                                 | —           |             | Rótulo do eixo X                                                                                 |
| `yLabel`         | `string`                                 | —           |             | Rótulo do eixo Y                                                                                 |
| `xFormatter`     | `(value: number) => string`              | —           |             | Formata valores do eixo X                                                                        |
| `yFormatter`     | `(value: number) => string`              | —           |             | Formata valores do eixo Y                                                                        |
| `valueFormatter` | `(value: number) => string`              | —           |             | Formata valores unificados (aplica a todos os eixos e tooltips; fallback se `format` não suprir) |
| `format`         | `FormatPreset`                           | —           |             | Preset de formatação                                                                             |
| `decimals`       | `number`                                 | —           |             | Casas decimais                                                                                   |
| `currency`       | `string`                                 | `"USD"`     |             | Código da moeda                                                                                  |
| `abbreviate`     | `boolean`                                | `false`     |             | Abreviação locale-aware                                                                          |
| `bubbleRange`    | `[number, number]`                       | `[40, 400]` |             | Range de tamanho dos bubbles (ZAxis)                                                             |
| `showBrush`      | `boolean`                                | `false`     |             | Brush contínuo customizado para zoom X                                                           |
| `loading`        | `boolean`                                | `false`     |             | Estado de carregamento                                                                           |
| `locale`         | `UILocale`                               | `"en-US"`   |             | Locale                                                                                           |
| `className`      | `string`                                 | —           |             | Classes extras                                                                                   |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
| -------- | ------- | ------ |
| —        | —       | —      |

**Slots do componente:**

- `chartWrapperVariants` — wrapper externo (`flex w-full flex-col`)
- `chartHeaderVariants` — container título/subtítulo (`flex flex-col px-1 pb-4`)
- `chartTitleVariants` — título (`text-sm leading-tight font-semibold text-foreground`)
- `chartSubtitleVariants` — subtítulo (`mt-0.5 text-xs text-muted-foreground`)
- `chartFooterVariants` — rodapé (`mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground`)

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `text-foreground`       | título, tooltip series name, tooltip values                                                      |
| `text-muted-foreground` | subtítulo, tooltip axis labels, axis ticks, axis labels, footer, empty state, brush labels       |
| `bg-muted`              | empty state icon circle                                                                          |
| `bg-card`               | tooltip background, brush handle                                                                 |
| `bg-foreground/25`      | brush selection highlight                                                                        |
| `border-border`         | footer divider, empty state border, tooltip border, grid, axis, brush track, brush handle border |
| `bg-accent`             | brush handle hover                                                                               |
| `var(--chart-1..5)`     | fill dos pontos (cíclico)                                                                        |
| `var(--muted)`          | skeleton                                                                                         |

---

## Escala tipográfica e de tamanho

| Slot                 | sm  | md                                             | lg  |
| -------------------- | --- | ---------------------------------------------- | --- |
| Título               | —   | `text-sm leading-tight font-semibold`          | —   |
| Subtítulo            | —   | `text-xs`                                      | —   |
| Tooltip series name  | —   | `text-xs font-semibold`                        | —   |
| Tooltip axis values  | —   | `text-xs / text-xs font-semibold tabular-nums` | —   |
| Eixo ticks           | —   | `fontSize: 12` (SVG)                           | —   |
| Eixo labels          | —   | `fontSize: 11` (SVG)                           | —   |
| Brush min/max labels | —   | `text-[10px]`                                  | —   |

---

## Comportamentos e estados

| Estado                | Comportamento esperado                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loading={true}`      | `<ScatterChartSkeleton>` com pontos dispersos em grid SVG.                                                                                             |
| `series.length === 0` | Empty state com ícone `Crosshair`, mensagens i18n `emptyState.*`.                                                                                      |
| Bubble chart          | ZAxis ativado quando qualquer ponto tem `z` definido. `bubbleRange` controla min/max radius.                                                           |
| Trend line            | Regressão linear calculada em `linearRegression()`. Renderizada como Scatter com `line` props.                                                         |
| Brush contínuo        | Implementação customizada (não usa recharts Brush, que é categórico). Handles arrastáveis para low/high, barra central para pan. Teclado: Enter/Space. |
| Pontos enrichidos     | Cada ponto recebe `_series` e `_color` para tooltip.                                                                                                   |
| Hidden series         | Toggle via legenda exclui a série do Scatter.                                                                                                          |

---

## Acessibilidade

| Requisito                    | Implementação                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Itens de legenda interativos | `role="button"`, `tabIndex={0}`, `aria-pressed`                                                       |
| Teclado na legenda           | Enter e Espaço                                                                                        |
| Brush handles                | `role="slider"`, `aria-label` i18n, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `tabIndex={0}` |
| Valores numéricos            | `tabular-nums`                                                                                        |
| i18n                         | `UI_I18N[locale].scatterChart.rangeStart`, `.rangeEnd`, `emptyState.*`                                |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `WithTrendLine` — With Trend Line
- [x] `MultiSeries` — Multi Series
- [x] `AttendanceVsApproval` — Attendance Vs Approval
- [x] `BubbleChart` — Bubble Chart
- [x] `CustomShapes` — Custom Shapes
- [x] `LegendPositions` — Legend Positions
- [x] `WithFooter` — With Footer
- [x] `WithBrush` — With Brush
- [x] `WithBrushMultiSeries` — With Brush Multi Series
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `OutlierDetection` — Outlier Detection

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
