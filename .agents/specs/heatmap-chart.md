# Spec: HeatmapChart

---

## Propósito

_Heatmap de matriz (grid) para visualização de densidade/correlação entre duas variáveis categóricas. Renderizado via HTML/CSS puro (sem recharts), com paletas de cores pré-definidas (blue, green, orange, purple, red) ou custom (colorFrom/colorTo), tooltip por célula, escala de cores legendada._

**Usar quando:** Visualizar intensidade/valor em uma matriz bidimensional — correlações, frequências por dia/hora, calor de atividade.  
**Não usar quando:** Dados unidimensionais (usar BarChart), mais de ~50 células (escala fica prejudicada).  
**Alternativa se não se aplicar:** BarChart agrupado para comparações, ScatterChart para correlação contínua.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/heatmap-chart.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `lucide-react` (Grid3X3), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `HeatmapCell[]` | — | ✓ | Array de células com x (col), y (row), value |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `palette` | `"blue" \| "green" \| "orange" \| "purple" \| "red" \| "custom"` | `"blue"` | | Paleta de cores |
| `colorFrom` | `string` | — | | Cor low-end (palette=custom) |
| `colorTo` | `string` | — | | Cor high-end (palette=custom) |
| `showValues` | `boolean` | `false` | | Exibe valor numérico dentro da célula |
| `showScale` | `boolean` | `true` | | Barra de escala gradiente |
| `cellSize` | `number` | — | | Largura fixa da célula em px |
| `cellHeight` | `number` | — | | Altura fixa da célula (default: cellSize ou 32) |
| `gap` | `number` | `3` | | Gap entre células |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores |
| `min` | `number` | — | | Mínimo da escala (override) |
| `max` | `number` | — | | Máximo da escala (override) |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `locale` | `UILocale` | `"en-US"` | | Locale |
| `className` | `string` | — | | Classes extras |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| — | — | — |

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
| `text-foreground` | título, label hover, cell text (low values) |
| `text-muted-foreground` | subtítulo, axis labels (normal), scale labels, footer, empty state |
| `bg-muted` | empty state icon circle, empty cells |
| `bg-card` | tooltip background |
| `border-border` | footer divider, empty state border, tooltip border |
| `var(--card)` | low-end da paleta (from) |
| `var(--chart-1..5)` | high-end da paleta (to) |
| `var(--foreground)` | scale legend text |
| `var(--foreground)/40` | hover ring |
| `var(--foreground)/20` | default ring hover |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Axis X/Y labels | — | `text-xs` (normal) / `font-semibold text-foreground` (hover) | — |
| Cell value | — | `text-[10px] leading-none font-semibold tabular-nums` | — |
| Scale labels | — | `text-xs tabular-nums` | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<HeatmapChartSkeleton>` com grid de Skeletons simulando linhas/colunas. |
| `data.length === 0` | Empty state com ícone `Grid3X3`, mensagens i18n `emptyState.*`. |
| Hover na célula | Zoom (`scale-110`), shadow, ring. Células não-hovered ficam `opacity-40`. Eixos X/Y destacam label correspondente (bold). Tooltip aparece acima. |
| Célula vazia | Renderizada como `bg-muted/30` sem tooltip. |
| Palette custom | `colorFrom` / `colorTo` em vez de presets. |
| `min`/`max` override | Domínio fixo da escala de cores. |
| Color mixing | `color-mix(in oklch, ...)` para interpolação entre from e to. |
| Text contrast | Automático: `foreground` em células claras, `card` em células escuras (threshold > 0.55). |
| Scroll horizontal | `overflow-x-auto` quando muitas colunas. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com attributes spread |
| Tooltip | `pointer-events-none`, posicionado acima da célula |
| Valores numéricos | `tabular-nums` |
| i18n | `UI_I18N[locale].emptyState.*` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `WithValues` — With Values
- [x] `AbsenceRate` — Absence Rate
- [x] `CorrelationMatrix` — Correlation Matrix
- [x] `EngagementByDayAndHour` — Engagement By Day And Hour
- [x] `CustomPalette` — Custom Palette
- [x] `Palettes` — Palettes
- [x] `SmallCells` — Small Cells
- [x] `FlatCells` — Flat Cells
- [x] `LocalePTBR` — Locale PTBR
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
