# Spec: Combobox

> Combobox com suporte a seleção única e múltipla, busca com filtro, virtual scrolling, grupos de opções e renderização customizada de opções.

---

## Propósito

Dropdown pesquisável com autocomplete, baseado em Popover do Radix. Suporta coleções grandes via virtual scrolling com `@tanstack/react-virtual`.

**Usar quando:** Necessário selecionar um ou múltiplos valores de uma lista com busca; lista longa (>50 itens).

**Não usar quando:** Menos de 5 opções estáticas; preferir `Select` nativo ou RadioGroup.

**Alternativa se não se aplicar:** `select-list` para listas pesquisáveis com visual rico; `Counter` para valores numéricos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/combobox.tsx` |
| Tipo | `registry:component` |
| Categoria | `Form` |
| Depende de | `Popover`, `PopoverContent`, `PopoverTrigger` (shadcn), `Badge`, `Button`, `Skeleton` |

---

## API — Props

### ComboboxBaseProps (compartilhado)

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `options` | `ComboboxOption[]` | — | ✓ | Lista de opções |
| `placeholder` | `string` | i18n `placeholder` | | Placeholder do trigger |
| `searchPlaceholder` | `string` | i18n `searchPlaceholder` | | Placeholder da busca |
| `emptyText` | `string` | i18n `noResults` | | Texto quando busca sem resultados |
| `noOptionsText` | `string` | i18n `noOptions` | | Texto quando lista original vazia |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `disabled` | `boolean` | `false` | | Desabilitado |
| `clearable` | `boolean` | `true` | | Mostrar botão limpar |
| `searchable` | `boolean` | `true` | | Habilitar busca |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho do trigger |
| `rounded` | `"full" \| "md" \| "none"` | `"md"` | | Arredondamento |
| `maxWidth` | `CSSProperties["maxWidth"]` | — | | Largura máxima |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `renderOption` | `(option, selected) => ReactNode` | — | | Renderizador customizado |

### ComboboxSingleProps (multiple = false | undefined)

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `multiple` | `false` | `false` | |
| `value` | `ComboboxValue \| null` | — | |
| `defaultValue` | `ComboboxValue \| null` | — | |
| `onChange` | `(value: ComboboxValue \| null) => void` | — | |

### ComboboxMultipleProps (multiple = true)

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `multiple` | `true` | | ✓ |
| `value` | `ComboboxValue[]` | — | |
| `defaultValue` | `ComboboxValue[]` | — | |
| `onChange` | `(values: ComboboxValue[]) => void` | — | |
| `maxDisplayed` | `number` | `3` | |

**Tipos auxiliares:**
- `ComboboxValue = string | number`
- `ComboboxOption = { value, label, disabled?, group? }`

---

## Variantes CVA

### comboboxTriggerVariants

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `rounded` | `full`, `md`, `none` | `md` |

Slots: apenas `comboboxTriggerVariants` para o botão trigger.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-background` | trigger, input search |
| `text-muted-foreground` | placeholder, search input placeholder, contador |
| `text-foreground` | label selecionada |
| `bg-accent` / `text-accent-foreground` | item ativo/hover |
| `border-input` | trigger |
| `ring-ring` | foco no trigger |
| `opacity-40` / `opacity-50` | disabled state, ícone chevron, clear button |
| `max-w-[120px]` | badge limit |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Trigger | `h-8 px-2.5 text-xs` | `h-9` (text-sm) | `h-10 px-4` |
| Item height | `32px` | `36px` | `40px` |
| Header height | `28px` | — | — |
| Input search | `h-10 text-sm` | — | — |
| Badge | `text-xs` | — | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões do trigger (h-8/h-9/h-10, rounded-lg/full/none) |
| `disabled={true}` | Botão desabilitado, sem interação |
| `searchable={true}` | Campo de busca focado ao abrir dropdown |
| Busca sem resultados | Mensagem `emptyText` ("No results found") |
| Lista vazia original | Mensagem `noOptionsText` ("No options") |
| Múltiplo | Badges com labels visíveis + contagem "+N" excedentes |
| Overflow de texto | `truncate` em labels de opções e trigger |
| Virtual scrolling | `@tanstack/react-virtual` com overscan 6 |
| Query reset | Limpa ao fechar dropdown |
| Active index reset | Volta ao primeiro item ao fechar |
| Agrupamento | Agrupa por `option.group`, exibe headers |
| Clear button | Ícone X na lateral direita do trigger quando `clearable` e `hasValue` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | Trigger `role="combobox"` + `aria-haspopup="listbox"` + `aria-expanded` |
| Lista | `role="listbox"` com `aria-multiselectable` |
| Itens | `role="option"` + `aria-selected` + `aria-disabled` |
| Input search | `input` nativo com `autoComplete="off"` |
| Teclado | `ArrowDown`/`ArrowUp` navega, `Enter` seleciona, `Escape` fecha, `Tab` fecha |
| Limpar seleção | `aria-label` no botão clear (i18n `clearSelection`) |
| Limpar busca | `aria-label` no botão clear search (i18n `clearSearch`) |
| i18n | `UI_I18N[locale].combobox.*`: `placeholder`, `searchPlaceholder`, `noResults`, `noOptions`, `selected`, `clearAll`, `clearSearch`, `clearSelection` |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — single select com opções
- [ ] `Multiple` — multi-select com badges
- [ ] `AllSizes` — sm, md, lg
- [ ] `AllRounded` — full, md, none
- [ ] `WithGroups` — opções agrupadas
- [ ] `Searchable` — com busca e filtro
- [ ] `Loading` — loading state
- [ ] `Disabled` — disabled state
- [ ] `Clearable` — com e sem valor
- [ ] `Controlled` — externamente controlado
- [ ] `CustomRenderOption` — renderOption customizado

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em `comboboxTriggerVariants`
- [x] `comboboxTriggerVariants` exportado
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` não aplicável (sem valores numéricos)
- [x] `truncate` em labels
- [x] `aria-label` no botão clear (i18n)
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas `gap-*`
- [x] Prop `locale` integrada via `UI_I18N`
