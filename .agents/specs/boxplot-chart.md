# Spec: BoxPlotChart

---

## Propósito

_Gráfico de box plot (caixa e bigodes) para visualização de distribuições estatísticas. Renderizado via SVG customizado (sem recharts). Suporta orientação vertical e horizontal, notches, marcador de média, outliers, tooltip flutuante com estatísticas completas (min, Q1, mediana, média, Q3, max)._

**Usar quando:** Necessário mostrar distribuição estatística (mediana, quartis, outliers) de uma ou mais categorias — análise exploratória de dados, comparação de grupos.  
**Não usar quando:** Dados agregados simples (usar BarChart), proporções (usar PieChart).  
**Alternativa se não se aplicar:** BarChart para valores únicos, ViolinPlot (não implementado).

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/boxplot-chart.tsx` |
| data-slot | `boxplot-chart` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `lucide-react` (BarChart2), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `BoxPlotItem[]` | — | ✓ | Array de itens com min, q1, median, mean, q3, max, outliers |
| `title` | `string` | — | | Título do gráfico |
| `subtitle` | `string` | — | | Subtítulo do gráfico |
| `footer` | `React.ReactNode` | — | | Rodapé do gráfico |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | | Orientação dos boxes |
| `height` | `number` | `320` | | Altura do canvas em px |
| `showGrid` | `boolean` | `true` | | Exibe grid da escala de valores |
| `showMean` | `boolean` | `true` | | Exibe losango na média |
| `showOutliers` | `boolean` | `true` | | Exibe pontos de outliers |
| `notched` | `boolean` | `false` | | Entalhe no box na mediana |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores dos ticks e tooltip |
| `loading` | `boolean` | `false` | | Estado de carregamento com skeleton |
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
| `text-foreground` | título, tooltip label, tooltip valores |
| `text-muted-foreground` | subtítulo, ticks do eixo, footer, empty state |
| `bg-muted` | empty state icon circle |
| `bg-card` | tooltip background |
| `border-border` | footer divider, empty state border, tooltip border, grid lines |
| `var(--chart-1..5)` | fill dos boxes (cíclico) |
| `var(--card)` | stroke do losango da média |
| `var(--muted)` | grid lines, skeleton preenchimento |
| `var(--foreground)` | label da categoria hover |
| `var(--muted-foreground)` | label da categoria normal |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Label text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Value text | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip estatísticas | — | `text-xs` labels / `text-xs font-semibold tabular-nums` values | — |
| Eixo ticks | — | `fontSize: 11` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<BoxPlotChartSkeleton>` com boxes, grid, eixos simulados via Skeleton e SVG. |
| `data.length === 0` | Empty state com ícone `BarChart2`, mensagens i18n `emptyState.*`, borda `border-dashed`. |
| Hover no box | Tooltip flutuante com estatísticas completas (Max, Q3, Median, Mean, Q1, Min). Box fica `opacity: 1` com fill mais intenso. |
| Outliers | Círculos vazados com stroke da cor do box. |
| Notched | Path SVG customizado com entalhe na mediana. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com attributes spread |
| Tooltip | `pointer-events-none` pois segue o mouse |
| Valores numéricos | `tabular-nums` nos tooltips |
| i18n | `UI_I18N[locale].emptyState.*` para empty state |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Estado padrão com box plots verticais de notas por turma, média e outliers
- [x] `Horizontal` — Box plots horizontais para categorias com nomes longos (disciplinas)
- [x] `Notched` — Box plots com entalhe (notch) representando IC de 95% em torno da mediana
- [x] `SemesterComparison` — Comparação de horas de estudo entre 3 semestres
- [x] `ApiResponseTime` — Latência de API por endpoint com outliers e footer de alerta SLA
- [x] `NoMeanNoOutliers` — Visualização minimalista sem média nem outliers, apenas 5 números
- [x] `NotchedHorizontal` — Notched combinado com orientação horizontal
- [x] `LocalePTBR` — Localização pt-BR com formatação numérica
- [x] `Loading` — Estado de carregamento com skeleton animado
- [x] `EmptyState` — Estado vazio com placeholder de borda tracejada
- [x] `WithFooter` — Box plot com rodapé customizado

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
