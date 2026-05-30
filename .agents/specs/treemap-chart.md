# Spec: TreeMapChart

---

## Propósito

_Gráfico de árvore (treemap) hierárquico baseado em recharts Treemap. Suporta dados aninhados com drill-down (navegação por breadcrumb), labels com nome + valor + badge "click to explore" em nós com filhos, e tooltip por célula._

**Usar quando:** Visualizar dados hierárquicos em espaço limitado — distribuição de recursos por categoria/subcategoria, uso de disco, orçamento por departamento/projeto.  
**Não usar quando:** Dados não-hierárquicos (usar PieChart ou BarChart), hierarquias profundas (>3 níveis).  
**Alternativa se não se aplicar:** PieChart para um nível, BarChart empilhado para hierarquia simples.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/treemap-chart.tsx` |
| data-slot | `treemap-chart` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `recharts` (ResponsiveContainer, Treemap, Tooltip), `lucide-react` (ChevronRight, Home, Layers), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `TreeMapItem[]` | — | ✓ | Array hierárquico com name, value, color, children |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `height` | `number` | `360` | | Altura do canvas |
| `aspectRatio` | `number` | `4/3` | | Aspect ratio do treemap |
| `showLabels` | `boolean` | `true` | | Labels dentro das células (condicional por tamanho) |
| `showTooltip` | `boolean` | `true` | | Tooltip ao hover |
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
| `text-foreground` | título, tooltip name, tooltip value, breadcrumb current |
| `text-muted-foreground` | subtítulo, breadcrumb items, footer, empty state |
| `text-muted-foreground/50` | breadcrumb chevron |
| `bg-muted` | empty state icon circle |
| `bg-card` | tooltip background |
| `bg-accent` | breadcrumb item hover |
| `bg-white/20` | "click to explore" badge |
| `border-border` | footer divider, empty state border, tooltip border |
| `var(--card)` | cell stroke |
| `var(--chart-1..5)` | fill das células (cíclico, propagado para filhos) |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Breadcrumb | — | `text-xs` | — |
| Cell name | — | `fontSize: clamp(10px, width/11, 13px)` (dinâmico) | — |
| Cell value | — | `fontSize: clamp(9px, width/14, 11px)` (dinâmico) | — |
| "click to explore" | — | `fontSize: 8px` | — |
| Tooltip name | — | `text-xs font-semibold` | — |
| Tooltip value | — | `text-xs font-semibold tabular-nums` | — |
| Home icon | — | `size-3` | — |
| Chevron icon | — | `size-3` | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<TreeMapChartSkeleton>` com tiles retangulares absolutos. |
| `data.length === 0` | Empty state com ícone `Layers`, mensagens i18n `emptyState.*`. |
| Drill-down | Clique em célula com `_hasChildren` navega para nível filho. Breadcrumb atualiza. Botão "Root" + caminho. |
| Breadcrumb | Último item = current (bold). Anteriores = clicáveis. Reset quando `data` muda. |
| Labels condicionais | Exibidos apenas se `showLabels && width > 64 && height > 44`. |
| Células com filhos | Badge "click to explore" se `height > 60`. `hover:brightness-110`. Cursor pointer. |
| Texto branco com shadow | `[text-shadow:0_1px_3px_rgba(0,0,0,0.45)]` para legibilidade sobre cores. |
| `aspectRatio` | Controla o squarification do treemap. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com attributes spread, `<nav>` no breadcrumb |
| Breadcrumb | `aria-label` via `UI_I18N[locale].treemap.breadcrumb` |
| Botões de navegação | `focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none` |
| Teclado | Enter/Space em itens de breadcrumb |
| Valores numéricos | `tabular-nums` |
| i18n | `UI_I18N[locale].treemap.breadcrumb`, `emptyState.*` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Hierarchical` — Hierarchical
- [x] `CustomColors` — Custom Colors
- [x] `NoLabels` — No Labels
- [x] `DenseData` — Dense Data
- [x] `WideAspectRatio` — Wide Aspect Ratio
- [x] `WithFooter` — With Footer
- [x] `FlatComparison` — Flat Comparison
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `EmptyState` — Empty State
- [x] `DrillDown` — Drill Down

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
