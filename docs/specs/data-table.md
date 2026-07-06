# Spec: DataTable

Tabela de dados rica com sorting, filtragem global, paginação, seleção de linhas, colunas sticky, redimensionamento de colunas e virtualização para grandes volumes.

**Usar quando:** exibir dados tabulares com suporte a sorting, filtro, paginação, seleção ou virtualização  
**Não usar quando:** dados estáticos sem interação (preferir Table primitives exportadas)  
**Alternativa se não se aplicar:** `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` exportados como primitives

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/data-table.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Button`, `Skeleton`, `Pagination` (custom), `SearchBar` (custom), `@tanstack/react-table`, `@tanstack/react-virtual`, `lucide-react`, `format-utils` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `columns` | `ColumnDef<TData>[]` | — | ✓ | Definição de colunas TanStack |
| `data` | `TData[]` | — | ✓ | Dados a exibir |
| `title` | `string` | — | | Título opcional acima da tabela |
| `subtitle` | `string` | — | | Subtítulo opcional |
| `footer` | `ReactNode` | — | | Rodapé opcional |
| `rowHeight` | `number` | — | | Altura customizada de linha (px) |
| `height` | `number` | `400` | | Altura do viewport scrollável (px) |
| `width` | `string \| number` | — | | Largura da tabela |
| `size` | `"compact" \| "default"` | `"default"` | | Densidade de padding |
| `textSize` | `"xs" \| "sm" \| "md" \| "lg"` | — | | Tamanho de fonte (deriva de `size` se omitido) |
| `rounded` | `boolean` | `true` | | Remove cantos arredondados quando `false` |
| `paginationRounded` | `"full" \| "light" \| "none"` | `"full"` | | Arredondamento dos botões de paginação |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `showSearch` | `boolean` | `false` | | Exibe campo de busca global (SearchBar) |
| `voiceSearch` | `boolean` | `false` | | Botão de voz na SearchBar |
| `onVoiceStart` | `() => void` | — | | Callback início gravação |
| `onVoiceEnd` | `() => void` | — | | Callback fim gravação |
| `onVoiceError` | `(error: string) => void` | — | | Callback erro de voz |
| `pagination` | `boolean` | `false` | | Habilita paginação |
| `defaultPageSize` | `number` | `10` | | Tamanho inicial da página |
| `defaultGlobalFilter` | `string` | `""` | | Filtro global inicial |
| `pageSizeOptions` | `number[]` | — | | Opções de items por página |
| `selectRows` | `boolean` | `false` | | Habilita checkbox de seleção |
| `stickyColumns` | `number` | `0` | | Nº de colunas fixas à esquerda |
| `toolbar` | `ReactNode` | — | | Toolbar customizada |
| `showDownload` | `boolean` | `false` | | Botão de exportar |
| `onDownload` | `() => void` | — | | Handler de exportação |
| `onRowClick` | `(row: TData) => void` | — | | Handler de clique na linha |
| `onSelectedRowsChange` | `(rows: TData[]) => void` | — | | Callback de seleção de linhas |
| `hasMore` | `boolean` | `false` | | Infinite scroll ativo |
| `onLoadMore` | `() => void` | — | | Handler de infinite scroll |
| `locale` | `UILocale` | — | | Localização para labels i18n |
| `labels` | `DataTableLabels` | — | | Labels i18n customizáveis (sobrepõe locale) |
| `ariaLabel` | `string` | — | | Rótulo ARIA da região |
| `className` | `string` | — | | Classes extras |

Tipos auxiliares exportados: `DataTableColumn<T>`, `DataTableLabels`, `DataTableProps<TData>`, `col()` helper para criar `ColumnDef`.

---

## Variantes CVA

Este componente não usa `cva()`. Usa um `SIZE_PRESETS` objeto para mapear tamanhos:

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `compact`, `default` | `default` |
| `textSize` | `xs`, `sm`, `md`, `lg` | derivado de `size` |

**Slots:** N/A (sem CVA)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted` | TableHeader, header sticky, skeleton header, empty state circle, hover sticky body cells |
| `bg-muted/30` | Células de coluna ordenada (não sticky) |
| `bg-card` | Wrapper da tabela, pagination bar, body sticky cells (base) |
| `bg-background` | Input de busca, select de page size |
| `bg-primary` | Skeleton shimmer, refetch bar |
| `bg-primary/5` | Linha selecionada, sticky cell selected |
| `bg-primary/10` | Sticky selection column selected |
| `bg-primary/15` | Cabeçalho ordenado |
| `bg-primary/20` | Pagination link ativo hover |
| `border-border` | Linhas divisórias, wrapper, input |
| `border-border/40` | Linhas de dados |
| `text-foreground` | Células, título, header sticky, labels primários |
| `text-muted-foreground` | Subtítulo, cabeçalhos não-sticky, placeholder, metadados |
| `text-primary` | Cabeçalho ordenado, pagination ativo |
| `accent-primary` | Checkbox de seleção |
| `ring-ring` | Focus states |
| `shadow-sm` | Wrapper da tabela |

---

## Escala tipográfica e de tamanho

Usa `SIZE_PRESETS`:

| Slot | xs | sm | md | lg |
|------|----|----|----|----|
| Padding célula | `px-2 py-1` | `px-3 py-2` | `px-4 py-2.5` | `px-4 py-3` |
| Font célula | `text-xs` | `text-xs` | `text-sm` | `text-sm` |
| Row height | 32px | 36px | 40px | 48px |
| Head font | `text-xs font-semibold` | `text-xs font-semibold` | `text-xs font-semibold` | `text-xs font-semibold` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` com `data.length === 0` | `<DataTableSkeleton>` com Skeleton simulando header, toolbar, rows, pagination, footer |
| `loading={true}` com `data.length > 0` | Refetch progress bar (shimmer) no topo + `opacity-50 pointer-events-none` nas linhas |
| Busca global | Usa `<SearchBar>` integrado com suporte a voz (`voiceSearch`) e locale; filtro global via TanStack Table |
| `data.length === 0` e `loading={false}` | `DataTableEmpty` com ícone Table2, container `rounded-2xl border-dashed border-border` com `bg-muted/50`, mensagem "No data found" |
| Paginação | `PaginationBar` com page range, ellipsis, previous/next, page size selector |
| Paginação — arredondamento | `paginationRounded` prop (`"full"` → pill, `"light"` → `rounded-lg`, `"none"` → square) aplicada via CVA a `PaginationLink`, `PaginationPrevious`, `PaginationNext` |
| Seleção | Checkbox `accent-primary` no header (select all) e cada linha |
| Colunas sticky | Header: `z-20 bg-muted text-foreground` / Selection: `z-30 bg-muted` / Body sticky: `z-10 bg-card` com `group-hover:bg-muted` sólido (sem `/40`) para evitar overlap no scroll horizontal |
| Infinite scroll | Scroll detection (últimos 5 itens) dispara `onLoadMore` |
| Resize de coluna | Colunas com `width` definido recebem resizer handle |
| Sorting | Sort indicators: `ArrowUp`/`ArrowDown`/`ChevronsUpDown` na ordem atual |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div role="region">` no viewport scrollável; `<div data-slot="data-table">` no root |
| Rótulo | `aria-label` no viewport (fallback: "Table with N rows") |
| Busy | `aria-busy={loading}` no viewport |
| Tabela semântica | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` |
| Cabeçalho sticky | `TableHeader sticky` com `sticky top-0 z-10` |
| Checkbox | `aria-label` em cada checkbox com `accent-primary` |
| Paginação | `aria-disabled` em previous/next desabilitados |
| Teclado | Navegação tab nativa |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `TitleAndSubtitle` — Title And Subtitle
- [x] `WithSearch` — With Search
- [x] `Sortable` — Sortable
- [x] `WithPagination` — With Pagination
- [x] `SearchAndPagination` — Search And Pagination
- [x] `WithCustomCells` — With Custom Cells
- [x] `RowSelection` — Row Selection
- [x] `ClickableRows` — Clickable Rows
- [x] `CompactSize` — Compact Size
- [x] `WithDownload` — With Download
- [x] `WithFooter` — With Footer
- [x] `KitchenSink` — Kitchen Sink
- [x] `TenThousandRows` — Ten Thousand Rows
- [x] `HundredThousandRows` — Hundred Thousand Rows
- [x] `VirtualizedWithPagination` — Virtualized With Pagination
- [x] `LoadingSkeleton` — Loading Skeleton
- [x] `LoadingRefetch` — Loading Refetch
- [x] `EmptyState` — Empty State
- [x] `EmptyAfterSearch` — Empty After Search
- [x] `ColHelper` — Col Helper
- [x] `ResizableColumns` — Resizable Columns
- [x] `NumberFormats` — Number Formats
- [x] `Primitives` — Primitives
- [x] `StickyColumns` — Sticky Columns (First Two)
- [x] `StickyColumnsWithSelection` — Sticky Columns + Row Selection
- [x] `SquareBorders` — Square Borders (no rounded corners)
- [x] `FluidLastColumn` — Última coluna fluida ocupando espaço restante
- [x] `VoiceSearch` — Busca com suporte a voz
- [x] `PaginationPtBR` — Paginação localizada pt-BR
- [x] `BulkAction` — Ação em lote com seleção de linhas
- [x] `EmptyStatePtBR` — Estado vazio localizado pt-BR
- [x] `PaginationRoundedFull` — Paginação com botões totalmente arredondados
- [x] `PaginationRoundedLight` — Paginação com botões levemente arredondados
- [x] `PaginationRoundedNone` — Paginação com botões quadrados

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado — N/A (usa SIZE_PRESETS)
- [x] Todos os `*Variants` são exportados — N/A
- [x] Loading usa `<Skeleton>` com dimensões corretas (DataTableSkeleton)
- [x] `tabular-nums` em todos os valores numéricos — N/A (formatado via `format-utils`)
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N` se houver strings fixas — usa `labels` props customizáveis
