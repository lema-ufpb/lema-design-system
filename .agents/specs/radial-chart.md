# Spec: RadialChart

---

## Propósito

_Gráfico de barras radiais (gauge) baseado em recharts RadialBarChart. Barras concêntricas em volta de um eixo angular. Suporta track de fundo, label central, domínio angular customizável (startAngle/endAngle) e maxValue para escala fixa._

**Usar quando:** Mostrar progresso ou métricas em formato circular — KPIs, percentuais, metas, dashboards executivos. Ideal para single-value com label.  
**Não usar quando:** Comparações precisas entre muitos itens (usar BarChart), proporções de um todo (usar PieChart).  
**Alternativa se não se aplicar:** PieChart donut para proporções, BarChart para rankings.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/radial-chart.tsx` |
| data-slot | `radial-chart` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (Legend, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip), `lucide-react` (Gauge), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `RadialChartItem[]` | — | ✓ | Array de itens com name, value, color |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `height` | `number` | `320` | | Altura do canvas |
| `showTrack` | `boolean` | `true` | | Arco de fundo (track) |
| `showLegend` | `boolean` | `false` | | Exibe legenda |
| `legendPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | | Posição da legenda |
| `showTooltip` | `boolean` | `true` | | Exibe tooltip |
| `innerLabel` | `string` | — | | Label central |
| `maxValue` | `number` | — | | Valor máximo para escala fixa (ideal para percentuais) |
| `startAngle` | `number` | `90` | | Ângulo inicial (graus) |
| `endAngle` | `number` | `-270` | | Ângulo final (graus) |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores |
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
| `text-foreground` | título, tooltip name, tooltip value, center label value |
| `text-muted-foreground` | subtítulo, tooltip, center label text, footer, empty state |
| `bg-muted` | empty state icon circle, radial track (showTrack) |
| `bg-card` | tooltip background |
| `border-border` | footer divider, empty state border, tooltip border |
| `var(--chart-1..5)` | fill das barras radiais |
| `var(--muted)` | track background fill |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Center label value | — | `text-2xl leading-none font-semibold` | — |
| Center label text (com value) | — | `text-xs` | — |
| Center label text (sem value) | — | `text-sm font-medium` | — |
| Tooltip name | — | `text-xs font-semibold` | — |
| Tooltip value | — | `text-xs font-semibold tabular-nums` | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<RadialChartSkeleton>` com arcos SVG concêntricos animados. Suporta `hasInnerLabel`. |
| `data.length === 0` | Empty state com ícone `Gauge`, mensagens i18n `emptyState.*`. |
| `showTrack=true` | Arco de fundo com `fill: "var(--muted)"` via prop `background` do RadialBar. |
| `maxValue` definido | `PolarAngleAxis` com domain `[0, maxValue]` para escala fixa (ex: 0-100). |
| Center label | Exibido apenas se `innerLabel` for fornecido. Single-item: mostra valor formatado + label. |
| `startAngle` / `endAngle` | Controlam o arco total. Default: 90 a -270 (3/4 de círculo começando no topo). |
| Hidden items | Toggle via legenda com `opacity-40`. |

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
- [x] `WithLegend` — With Legend
- [x] `GaugeSingle` — Gauge Single
- [x] `FullCircleWithLabel` — Full Circle With Label
- [x] `MultiDepartment` — Multi Department
- [x] `CustomColors` — Custom Colors
- [x] `NoTrack` — No Track
- [x] `WithFooter` — With Footer
- [x] `GaugeGrid` — Gauge Grid
- [x] `LegendPositions` — Legend Positions
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `StudentKPIs` — Student KP Is

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
