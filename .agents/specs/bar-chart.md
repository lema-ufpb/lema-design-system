# Spec: BarChart

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `.agents/specs/bar-chart.md` ao finalizar.

---

## Propósito

_Componente de gráfico de barras (colunas) baseado em recharts. Suporta orientação vertical e horizontal, barras empilhadas, brush para zoom/scroll, legendas interativas (toggle de séries), e tooltip customizado com formato semântico._

**Usar quando:** Necessário comparar valores categóricos (ex: vendas por mês, quantidade por categoria) com suporte a múltiplas séries, empilhamento e zoom via brush.  
**Não usar quando:** Dados contínuos (usar LineChart), proporções (usar PieChart), ou distribuições estatísticas (usar BoxPlotChart).  
**Alternativa se não se aplicar:** LineChart para séries temporais, PieChart para proporções.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/bar-chart.tsx` |
| data-slot | `bar-chart` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Bar, BarChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis), `lucide-react` (BarChart2), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `Record<string, string \| number>[]` | — | ✓ | Array de objetos com valores do gráfico |
| `dataKeys` | `BarChartKey[] \| string[]` | — | ✓ | Chaves para renderizar como barras (aceita string simples ou objeto com key/label/color) |
| `categoryKey` | `string` | — | ✓ | Chave do objeto mapeada ao eixo categórico |
| `title` | `string` | — | | Título do gráfico |
| `subtitle` | `string` | — | | Subtítulo do gráfico |
| `footer` | `React.ReactNode` | — | | Rodapé do gráfico |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | | Orientação das barras |
| `height` | `number` | `280` | | Altura do canvas em px |
| `showGrid` | `boolean` | `true` | | Exibe linhas de grade |
| `showLegend` | `boolean` | `false` | | Exibe legenda |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | | Posição da legenda |
| `showTooltip` | `boolean` | `true` | | Exibe tooltip ao hover |
| `stacked` | `boolean` | `false` | | Empilha todas as barras |
| `barSize` | `number` | — | | Largura fixa da barra em px |
| `rounded` | `boolean` | `true` | | Arredonda a borda superior das barras |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores dos ticks e tooltip |
| `showBrush` | `boolean` | `false` | | Exibe brush para scroll/zoom (vertical apenas) |
| `loading` | `boolean` | `false` | | Estado de carregamento com skeleton |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `xAxisLabel` | `string` | — | | Rótulo do eixo X |
| `yAxisLabel` | `string` | — | | Rótulo do eixo Y |
| `className` | `string` | — | | Classes extras de layout |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| — | — | — |

*Sem variantes CVA com size/intent — usa props para orientação e altura.*

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
| `text-muted-foreground` | subtítulo, tooltip nome da série, value axis ticks, category axis ticks, axis labels, footer, empty state |
| `bg-muted` | empty state icon circle, tooltip cursor |
| `bg-card` | tooltip background, brush handle fill |
| `border-border` | footer divider, empty state border, tooltip border, grid lines, axis lines, brush stroke |
| `var(--chart-1..5)` | fill das barras (cíclico) |
| `var(--muted-foreground)` | brush handle lines |
| `var(--card)` | brush handle fill |
| `var(--muted)` | tooltip cursor |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Label text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Value text | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip label | — | `text-xs font-semibold` | — |
| Tooltip value | — | `text-xs font-semibold tabular-nums` | — |
| Eixo labels | — | `fontSize: 11` (SVG) | — |
| Eixo ticks | — | `fontSize: 12` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<BarChartSkeleton>` com grid, eixos e barras simuladas via Skeleton. Dimensões baseadas na altura. Suporta orientação vertical/horizontal. |
| `data.length === 0` | Empty state com ícone `BarChart2` em círculo `bg-muted`, mensagens `UI_I18N[locale].emptyState.noData` e `.dataWillAppear`, borda `border-dashed`. |
| `hiddenSeries` | Toggle via legenda: séries ocultas com `opacity-40`; conjunto gerenciado por estado local `Set<string>`. |
| Overflow texto | `truncate` aplicado nos labels dos eixos via SVG `text` (recharts). |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com attributes spread |
| Itens de legenda interativos | `role="button"`, `tabIndex={0}`, `aria-pressed` indicando estado oculto |
| Teclado na legenda | Enter e Espaço para toggle de série |
| Valores numéricos | `tabular-nums` nos valores formatados |
| i18n | `UI_I18N[locale].emptyState.*` para strings de empty state |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Estado padrão com gráfico vertical de receita mensal (jan–jun 2025)
- [x] `Horizontal` — Barras horizontais para categorias com nomes longos (faltas por curso)
- [x] `MultiSeries` — Duas séries lado a lado (matriculados vs ativos por departamento)
- [x] `MultiSeriesHorizontal` — Duas séries em orientação horizontal
- [x] `Stacked` — Barras empilhadas (orçamento planejado × real × projetado por trimestre)
- [x] `StackedHorizontal` — Barras empilhadas em orientação horizontal
- [x] `WithFooter` — Gráfico com rodapé customizado (indicador de tendência + timestamp)
- [x] `CustomColors` — Cores customizadas via `var(--primary)` e `var(--chart-3)`
- [x] `NoDecoration` — Gráfico minimalista sem grid, tooltips nem cantos arredondados
- [x] `WithAxisLabels` — Rótulos nos eixos X e Y com margens ajustadas automaticamente
- [x] `WithBrush` — Slider brush para seleção interativa de intervalo em 24 meses
- [x] `WithBrushStacked` — Brush combinado com barras empilhadas
- [x] `LocalePTBR` — Localização pt-BR com formatação de moeda BRL
- [x] `Loading` — Estado de carregamento com skeleton animado (wave cascade)
- [x] `EmptyState` — Estado vazio com placeholder de borda tracejada
- [x] `LegendPositions` — Grid 2×2 comparando as 4 posições de legenda (top, right, bottom, left)

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
