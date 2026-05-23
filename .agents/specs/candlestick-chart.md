# Spec: CandlestickChart

---

## Propósito

_Gráfico de candles (velas) para visualização financeira de preços OHLC (Open, High, Low, Close). Usa recharts ComposedChart para combinar candles (Bar custom), volume (Bar), médias móveis (Line) e linhas de referência. Suporta brush, tooltip com change badge, e legenda interativa com bull/bear indicators._

**Usar quando:** Necessário visualizar séries temporais de preços financeiros com suporte a análise técnica (médias móveis, suporte/resistência, volume).  
**Não usar quando:** Dados não-financeiros ou sem componente temporal (usar BarChart ou LineChart).  
**Alternativa se não se aplicar:** LineChart para séries temporais simples, BarChart para comparações categóricas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/candlestick-chart.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Bar, Brush, CartesianGrid, ComposedChart, Legend, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis), `lucide-react` (CandlestickChart), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `CandleDataPoint[]` | — | ✓ | Array de candles com date, open, high, low, close, volume |
| `title` | `string` | — | | Título do gráfico |
| `subtitle` | `string` | — | | Subtítulo do gráfico |
| `footer` | `React.ReactNode` | — | | Rodapé do gráfico |
| `height` | `number` | `360` | | Altura do canvas em px |
| `positiveColor` | `string` | `"#22c55e"` | | Cor do candle bullish |
| `negativeColor` | `string` | `"#ef4444"` | | Cor do candle bearish |
| `movingAverages` | `MovingAverageConfig[]` | — | | Configurações de médias móveis |
| `referenceLines` | `CandlestickReferenceLine[]` | — | | Linhas de referência horizontais |
| `showVolume` | `boolean` | `false` | | Exibe barras de volume |
| `showGrid` | `boolean` | `true` | | Exibe grid horizontal |
| `showLegend` | `boolean` | `false` | | Exibe legenda |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | | Posição da legenda |
| `showTooltip` | `boolean` | `true` | | Exibe tooltip ao hover |
| `showBrush` | `boolean` | `false` | | Exibe brush para zoom |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores de preço |
| `dateFormatter` | `(date: string) => string` | — | | Formata datas no eixo X |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras de layout |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| — | — | — |

*Sem variantes CVA dimensionais.*

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
| `text-foreground` | título, tooltip header, OHLC close value |
| `text-muted-foreground` | subtítulo, footer, tooltip OHLC labels, tooltip volume, legend text |
| `bg-muted` | empty state icon circle, tooltip cursor |
| `bg-card` | tooltip background, brush fill |
| `border-border` | footer divider, empty state border, tooltip border, grid, brush stroke, axis |
| `var(--chart-1..5)` | moving average line colors |
| `var(--card)` | brush fill, candle border (bullish hollow) |
| `var(--muted)` | cursor, grid lines |
| `var(--muted-foreground)` | brush handle lines, reference line default stroke |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip header | — | `text-xs font-semibold` | — |
| Tooltip change badge | — | `text-[10px] font-semibold tabular-nums` | — |
| Tooltip OHLC label | — | `text-xs` | — |
| Tooltip OHLC value | — | `text-xs tabular-nums` | — |
| Tooltip close | — | `font-semibold` (extra) | — |
| Tooltip MA value | — | `text-xs font-semibold tabular-nums` | — |
| Eixo ticks | — | `fontSize: 12` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<CandlestickChartSkeleton>` com candles, grid, eixos simulados via SVG + Skeleton. |
| `data.length === 0` | Empty state com ícone `CandlestickIcon`, mensagens i18n `emptyState.*`. |
| Tooltip | Mostra data formatada, badge de variação (valor + %), OHLC, volume (se disponível), valores das médias móveis. |
| Médias móveis | Calculadas via `computeMA()` (SMA). Linhas podem ser dashed. Toggláveis via legenda. |
| Linhas de referência | Stroke com label em badge retangular. Dashed por padrão. |
| Brush | Handle customizado com `var(--card)` fill e `var(--muted-foreground)` linhas. |
| Legenda | Estática: bull/bear indicators com retângulos (hollow/ filled). Dinâmica: séries MA toggláveis. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Itens de legenda interativos | `role="button"`, `tabIndex={0}`, `aria-pressed` |
| Teclado na legenda | Enter e Espaço para toggle |
| Valores numéricos | `tabular-nums` |
| i18n | `UI_I18N[locale].candlestick.*` (open, high, low, close, volume, bullish, bearish) + `emptyState.*` |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — 30 dias de dados OHLC com variação
- [ ] `WithVolume` — volume bars visíveis
- [ ] `WithMovingAverages` — 2 médias móveis (9 e 21 períodos)
- [ ] `WithReferenceLines` — suporte e resistência
- [ ] `WithBrush` — brush habilitado
- [ ] `Loading` — `loading={true}`
- [ ] `Empty` — array vazio
- [ ] `AllBearish` — tendência de baixa

---

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
