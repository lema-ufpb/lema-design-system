# Spec: LineChart

---

## Propósito

_Gráfico de linhas e áreas baseado em recharts AreaChart. Suporta três variantes (line, area, area-stacked), curvas (linear, smooth, step), dots configuráveis, brush, grid, legenda interativa, linhas de referência, e labels nos eixos._

**Usar quando:** Visualizar séries temporais, tendências, evolução de métricas ao longo do tempo. Variante `area` para ênfase em volume, `area-stacked` para composição de múltiplas séries.  
**Não usar quando:** Comparações categóricas sem ordem natural (usar BarChart), proporções (usar PieChart), dados financeiros OHLC (usar CandlestickChart).  
**Alternativa se não se aplicar:** BarChart para categorias, RadarChart para comparações multidimensionais.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/line-chart.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Area, AreaChart, Brush, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis), `lucide-react` (TrendingUp), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `Record<string, string \| number>[]` | — | ✓ | Array de objetos do gráfico |
| `dataKeys` | `LineChartKey[] \| string[]` | — | ✓ | Chaves para plotar (aceita string simples ou objeto com key/label/color/dashed) |
| `categoryKey` | `string` | — | ✓ | Chave do eixo categórico (X) |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `variant` | `"line" \| "area" \| "area-stacked"` | `"line"` | | Tipo do gráfico |
| `curve` | `"linear" \| "smooth" \| "step"` | `"smooth"` | | Interpolação da linha |
| `dots` | `"none" \| "hover" \| "always"` | `"hover"` | | Visibilidade dos dots |
| `height` | `number` | `280` | | Altura do canvas em px |
| `showGrid` | `boolean` | `true` | | Exibe grid horizontal |
| `showLegend` | `boolean` | `false` | | Exibe legenda |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | | Posição da legenda |
| `showTooltip` | `boolean` | `true` | | Exibe tooltip |
| `connectNulls` | `boolean` | `false` | | Conecta valores nulos |
| `referenceLines` | `LineChartReferenceLine[]` | — | | Linhas de referência horizontais |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores |
| `showBrush` | `boolean` | `false` | | Exibe brush para zoom |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `locale` | `UILocale` | `"en-US"` | | Locale |
| `xAxisLabel` | `string` | — | | Rótulo do eixo X |
| `yAxisLabel` | `string` | — | | Rótulo do eixo Y |
| `className` | `string` | — | | Classes extras |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| — | — | — |

*Sem variantes CVA dimensionais — usa props para variante visual.*

**Slots do componente:**

- `chartWrapperVariants` — wrapper externo (`flex w-full flex-col`)
- `chartHeaderVariants` — container título/subtítulo (`flex flex-col px-1 pb-4`)
- `chartTitleVariants` — título (`text-sm leading-tight font-semibold text-foreground`)
- `chartSubtitleVariants` — subtítulo (`mt-0.5 text-xs text-muted-foreground`)
- `chartFooterVariants` — rodapé (`mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground`)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-foreground` | título, tooltip label, tooltip value |
| `text-muted-foreground` | subtítulo, tooltip series name, axis ticks, axis labels, footer, empty state |
| `bg-muted` | empty state icon circle |
| `bg-card` | tooltip background, brush fill |
| `border-border` | footer divider, empty state border, tooltip border, grid, axis, brush stroke |
| `var(--chart-1..5)` | stroke das séries, gradient fills |
| `var(--card)` | dot stroke, brush fill |
| `var(--muted)` | skeleton fill |
| `var(--muted-foreground)` | brush handle lines, reference line default |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip label | — | `text-xs font-semibold` | — |
| Tooltip series + value | — | `text-xs` / `text-xs font-semibold tabular-nums` | — |
| Legenda | — | `text-xs` | — |
| Eixo ticks | — | `fontSize: 12` (SVG) | — |
| Eixo labels | — | `fontSize: 11` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<LineChartSkeleton>` com linha poligonal, dots, grid, eixos simulados via SVG + Skeleton. |
| `data.length === 0` | Empty state com ícone `TrendingUp`, mensagens i18n `emptyState.*`. |
| `variant="area"` | Gradient fill semi-transparente por série (gradiente definido via SVG `<linearGradient>`). |
| `variant="area-stacked"` | Áreas empilhadas via `stackId="stack"`. |
| `dots="hover"` | Dots visíveis apenas no hover via `activeDot` (recharts). |
| `dots="always"` | Dots sempre visíveis via prop `dot`. |
| `dots="none"` | Sem dots em nenhum estado. |
| `curve="step"` | `type="step"` no recharts. |
| Hidden series | Toggle via legenda com `opacity-40` quando oculto. |
| Referências | Badge retangular com label na extremidade direita. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Itens de legenda interativos | `role="button"`, `tabIndex={0}`, `aria-pressed` |
| Teclado na legenda | Enter e Espaço |
| Valores numéricos | `tabular-nums` |
| i18n | `UI_I18N[locale].emptyState.*` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Area` — Area
- [x] `WithAxisLabels` — With Axis Labels
- [x] `AreaStacked` — Area Stacked
- [x] `MultiSeries` — Multi Series
- [x] `WithReferenceLines` — With Reference Lines
- [x] `DashedForecast` — Dashed Forecast
- [x] `StepCurve` — Step Curve
- [x] `DotsAlways` — Dots Always
- [x] `WithFooter` — With Footer
- [x] `LegendPositions` — Legend Positions
- [x] `WithBrush` — With Brush
- [x] `WithBrushArea` — With Brush Area
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `NegativeTrend` — Negative Trend

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
