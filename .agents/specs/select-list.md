# Spec: SelectList

> Lista pesquisável com virtual scrolling, debounce, seleção com badge, e suporte a intenções visuais (primary, secondary, destructive).

---

## Propósito

Lista vertical de itens selecionáveis com campo de busca, virtual scrolling para grandes coleções, e badges de seleção com intenções de cor.

**Usar quando:** Necessário selecionar um item de uma lista longa com busca; visual rico com ícone, nome, grupo, e valor.

**Não usar quando:** Menos de 10 itens estáticos; preferir `Combobox` ou `RadioGroup`.

**Alternativa se não se aplicar:** `Combobox` para seleção em dropdown; `Counter` para valores numéricos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/select-list.tsx` |
| data-slot | `select-list` |
| Tipo | `registry:component` |
| Categoria | `Form` |
| Depende de | `Input`, `Button`, `Badge`, `Skeleton` (shadcn/ui) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `SelectListItem[]` | — | ✓ | Lista de itens |
| `onSelect` | `(item: SelectListItem) => void` | — | ✓ | Callback de seleção |
| `selectedId` | `string \| number` | — | | ID do item selecionado |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho dos itens |
| `height` | `number` | `300` | | Altura da lista virtual |
| `debounce` | `number` | `300` | | Debounce da busca (ms) |
| `placeholder` | `string` | `"Search..."` | | Placeholder do input |
| `intent` | `"default" \| "primary" \| "secondary" \| "destructive"` | `"primary"` | | Intenção visual de seleção |
| `disabled` | `boolean` | `false` | | Desabilitado |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `search` | `string` | — | | Valor controlado da busca |
| `onSearch` | `(value: string) => void` | — | | Callback de busca (modo controlado) |
| `emptyMessage` | `string` | `"No results found"` | | Mensagem de lista vazia |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |

Estende `VariantProps<typeof selectListContainerVariants>` + `Omit<HTMLAttributes<HTMLDivElement>, "onSelect">`.

**SelectListItem:** `{ id: string | number, name: string, icon?: ReactNode, iconColor?: string, group?: string, value?: string | number, slug?: string }`

---

## Variantes CVA

### selectListContainerVariants

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `disabled` | `true`, `false` | `false` |
| `loading` | `true`, `false` | — (sem padrão) |

### selectListItemVariants

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `isSelected` | `true`, `false` | `false` |
| `size` | `sm`, `md`, `lg` | `md` |
| `intent` | `default`, `primary`, `secondary`, `destructive` | `default` |

Compound variants:
- `isSelected=true + intent=primary` → `bg-primary/10`
- `isSelected=false + intent=primary` → `hover:bg-primary/5`
- `isSelected=true + intent=secondary` → `bg-secondary/10`
- `isSelected=false + intent=secondary` → `hover:bg-secondary/5`

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-background` | fundo do item não selecionado |
| `bg-muted/50` | item selecionado (intent default) |
| `bg-muted/30` | hover do item |
| `bg-primary/10` | item selecionado (intent primary) |
| `bg-primary/5` | hover item (intent primary) |
| `bg-secondary/10` | item selecionado (intent secondary) |
| `bg-secondary/5` | hover item (intent secondary) |
| `text-foreground` | nome do item |
| `text-muted-foreground` | grupo, valor, ícone de busca |
| `border-border` | divisores entre itens |
| `text-muted-foreground/20` | ícone Frown empty state |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Item padding | `gap-2 px-3 py-3` | `gap-2 px-4 py-4` | `gap-3 px-5 py-5` |
| Item height estimado | `60px` | `72px` | `84px` |
| Nome | `font-semibold` | — | — |
| Grupo/valor | `text-xs text-muted-foreground` | — | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | 4 skeleton rows com avatar circular, nome, badge |
| `loading + filteredData.length > 0` | Lista normal renderizada (loading apenas sem dados) |
| Dados vazios (sem busca) | Empty state com ícone `Frown` e `emptyMessage` |
| Busca sem resultados | Empty state com `emptyMessage` |
| `disabled={true}` | Container `pointer-events-none opacity-50` |
| Item selecionado | Badge com `Check` icon + texto i18n `selected`; classes bg de intent |
| Item não selecionado | Botão `Select` com variant baseada em intent |
| Virtual scrolling | `@tanstack/react-virtual` com overscan 5 |
| Debounce | Input busca com debounce de `debounce` ms para `onSearch` |
| Client-side filter | Filtro interno `item.name.includes(query)` quando `onSearch` não fornecido |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Busy state | `aria-busy={loading}` no container |
| Botões de seleção | `aria-label` com i18n `select ${item.name}` |
| Input busca | `<Input>` nativo com placeholder |
| Clear search | `aria-label` i18n `clearSearch` |
| i18n | `UI_I18N[locale].selectList.*`: `selected`, `select`, `clearSearch` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `Controlled` — Controlled
- [x] `Intents` — Intents
- [x] `Loading` — Loading
- [x] `Empty` — Empty
- [x] `Virtualized` — Virtualized
- [x] `InModal` — In Modal

## Checklist antes de implementar

- [x] Escala tipográfica segue padrão (nome `text-sm`, grupo `text-xs`)
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em todos `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` não aplicável
- [x] `truncate` no nome do item
- [x] `aria-label` nos botões de seleção e clear
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas `gap-*`
- [x] Prop `locale` integrada via `UI_I18N`
