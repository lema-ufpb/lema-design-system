# Spec: RadarChart

---

## Propósito

_Gráfico radar (teia) baseado em recharts RadarChart para visualização multivariada. Suporta múltiplas séries, fill semi-transparente, grid polygon/circle, dots, radius axis, legenda interativa com toggle._

**Usar quando:** Comparar múltiplas variáveis em uma ou mais entidades — perfil de competências, análise SWOT, métricas multidimensionais.  
**Não usar quando:** Mais de 6-8 variáveis (dificulta leitura), séries temporais (usar LineChart), comparações precisas (usar BarChart).  
**Alternativa se não se aplicar:** BarChart radial (RadialChart) para progresso, BarChart para comparações.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/radar-chart.tsx` |
| data-slot | `radar-chart` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip), `lucide-react` (Target), `class-variance-authority`, `format-utils` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `Record<string, string \| number>[]` | — | ✓ | Array de objetos com valores por categoria |
| `dataKeys` | `RadarChartKey[] \| string[]` | — | ✓ | Chaves para plotar (aceita string ou objeto com key/label/color/filled) |
| `categoryKey` | `string` | — | ✓ | Chave mapeada aos spokes do radar |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `filled` | `boolean` | `true` | | Fill semi-transparente das áreas |
| `fillOpacity` | `number` | `0.18` | | Opacidade do fill |
| `dots` | `boolean` | `false` | | Dots nos vértices |
| `gridShape` | `"polygon" \| "circle"` | `"polygon"` | | Formato da grade |
| `showRadiusAxis` | `boolean` | `false` | | Eixo radial de valores |
| `height` | `number` | `300` | | Altura do canvas |
| `showLegend` | `boolean` | `false` | | Exibe legenda |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | | Posição da legenda |
| `showTooltip` | `boolean` | `true` | | Exibe tooltip |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores (fallback se `format` não suprir) |
| `format` | `FormatPreset` | — | | Preset de formatação |
| `decimals` | `number` | — | | Casas decimais |
| `currency` | `string` | `"USD"` | | Código da moeda |
| `abbreviate` | `boolean` | `false` | | Abreviação locale-aware |
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
| `text-foreground` | título, tooltip label |
| `text-muted-foreground` | subtítulo, tooltip series name, axis ticks, footer, empty state |
| `bg-muted` | empty state icon circle |
| `bg-card` | tooltip background |
| `border-border` | footer divider, empty state border, tooltip border, grid, axis |
| `var(--chart-1..5)` | stroke e fill das séries |
| `var(--card)` | dot stroke |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip label | — | `text-xs font-semibold` | — |
| Tooltip value | — | `text-xs font-semibold tabular-nums` | — |
| Axis spokes | — | `fontSize: 12` (SVG) | — |
| Radius axis | — | `fontSize: 10` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<RadarChartSkeleton>` com polígonos concêntricos, spokes, dados animados via SVG. |
| `data.length === 0` | Empty state com ícone `Target`, mensagens i18n `emptyState.*`. |
| `filled=false` | Apenas stroke sem fill |
| `filled=true` (default) | Fill com `fillOpacity` configurável |
| Per-series `filled` | Prop `filled` no `RadarChartKey` sobrescreve o padrão global |
| `gridShape="circle"` | Grade circular em vez de poligonal |
| `showRadiusAxis=true` | Eixo radial com ticks de valor |
| Hidden series | Toggle via legenda com `opacity-40` |

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
- [x] `Unfilled` — Unfilled
- [x] `MultiSeries` — Multi Series
- [x] `CurrentVsTarget` — Current Vs Target
- [x] `CircleGrid` — Circle Grid
- [x] `WithRadiusAxis` — With Radius Axis
- [x] `WithDots` — With Dots
- [x] `WithFooter` — With Footer
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `LegendPositions` — Legend Positions

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
