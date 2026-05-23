# Spec: DataTable

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `.agents/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Tabela de dados rica com sorting, filtragem global, paginação, seleção de linhas, colunas sticky, redimensionamento de colunas e virtualização para grandes volumes. Usar quando o consumidor precisa de uma tabela interativa mutável. Não usar quando uma simples `<table>` HTML ou lista resolve.

**Usar quando:** exibir dados tabulares com suporte a sorting, filtro, paginação, seleção ou virtualização  
**Não usar quando:** dados estáticos sem interação (preferir Table primitives exportadas)  
**Alternativa se não se aplicar:** `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` exportados como primitives

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/data-table.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Button`, `Skeleton`, `Pagination` (custom), `@tanstack/react-table`, `@tanstack/react-virtual`, `lucide-react` |

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
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `showSearch` | `boolean` | `false` | | Exibe campo de busca global |
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
| `hasMore` | `boolean` | `false` | | Infinite scroll ativo |
| `onLoadMore` | `() => void` | — | | Handler de infinite scroll |
| `labels` | `DataTableLabels` | — | | Labels i18n customizáveis |
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
| `bg-muted` | TableHeader, skeleton header, empty state circle |
| `bg-muted/30` | Células de coluna ordenada (não sticky) |
| `bg-muted/40` | Hover em linhas, linhas selecionadas |
| `bg-card` | Wrapper da tabela, pagination bar, linha sticky |
| `bg-background` | Input de busca, select de page size |
| `bg-primary` | Skeleton shimmer, refetch bar |
| `bg-primary/5` | Linha selecionada |
| `bg-primary/10` | Hover em cabeçalho sortable |
| `bg-primary/15` | Cabeçalho ordenado |
| `bg-primary/20` | Pagination link ativo hover |
| `border-border` | Linhas divisórias, wrapper, input |
| `border-border/40` | Linhas de dados |
| `text-foreground` | Células, título, labels primários |
| `text-muted-foreground` | Subtítulo, cabeçalhos, placeholder, metadados |
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
| `data.length === 0` e `loading={false}` | `DataTableEmpty` com ícone Table2 e mensagem "No data found" |
| Paginação | `PaginationBar` com page range, ellipsis, previous/next, page size selector |
| Seleção | Checkbox `accent-primary` no header (select all) e cada linha |
| Colunas sticky | `sticky z-20` para cabeçalho, `sticky z-10 bg-card` para células |
| Infinite scroll | Scroll detection (últimos 5 itens) dispara `onLoadMore` |
| Resize de coluna | Colunas com `width` definido recebem resizer handle |
| Sorting | Sort indicators: `ArrowUp`/`ArrowDown`/`ChevronsUpDown` na ordem atual |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div role="region">` no viewport scrollável |
| Rótulo | `aria-label` no viewport (fallback: "Table with N rows") |
| Busy | `aria-busy={loading}` no viewport |
| Tabela semântica | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` |
| Cabeçalho sticky | `TableHeader sticky` com `sticky top-0 z-10` |
| Checkbox | `aria-label` em cada checkbox com `accent-primary` |
| Paginação | `aria-disabled` em previous/next desabilitados |
| Teclado | Navegação tab nativa |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — dados mockados com sorting e paginação
- [ ] `Compact` — `size="compact"` com densidade reduzida
- [ ] `Loading` — `loading={true}` com skeleton completo
- [ ] `Empty` — array vazio com DataTableEmpty
- [ ] `WithPagination` — `pagination={true}` com 50+ linhas
- [ ] `WithSelection` — `selectRows={true}` com checkboxes
- [ ] `WithSearch` — `showSearch={true}` com busca global
- [ ] `WithStickyColumns` — `stickyColumns={1}` fixando primeira coluna
- [ ] `VirtualizedLargeSet` — 10000 linhas com virtualização
- [ ] `WithToolbar` — toolbar custom + download button
- [ ] `InfiniteScroll` — `hasMore` com load more
- [ ] `RefetchWhileData` — `loading={true}` com dados existentes

---

## Checklist antes de implementar

- [ ] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [ ] Todo `cva()` tem `defaultVariants` declarado — N/A (usa SIZE_PRESETS)
- [ ] Todos os `*Variants` são exportados — N/A
- [x] Loading usa `<Skeleton>` com dimensões corretas (DataTableSkeleton)
- [ ] `tabular-nums` em todos os valores numéricos — N/A (formatado via Intl)
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [ ] Prop `locale` integrada via `UI_I18N` se houver strings fixas — usa `labels` props customizáveis
