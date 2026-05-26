# Spec: Combobox UI

> Combobox completo com busca, virtual scrolling, seleção única/múltipla com chips, grupos e renderização customizada.

---

## Propósito

Componente de entrada que combina trigger de seleção com popover contendo lista filtrada e virtualizada. Construído sobre `Popover` + `@tanstack/react-virtual` para performance O(1) em listas de 10k+ itens.

**Usar quando:** O usuário precisa selecionar um ou mais valores de uma lista longa (centenas/milhares) com busca instantânea.

**Não usar quando:** A lista tem menos de 5 opções estáticas (prefira Select ou RadioGroup). Para seleção única sem busca, use `Select`.

**Alternativa:** `Combobox` (shadcn/ui) para seleção baseada em `@base-ui/react`.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/combobox.tsx` |
| Tipo | `registry:ui` (name: `combobox-ui`) |
| Categoria | Formulário / Seleção |
| Depende de | `@tanstack/react-virtual`, `lucide-react`, `badge`, `button`, `popover`, `skeleton`, `ui-i18n` |

---

## API — Props

### Combobox

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `options` | `ComboboxOption[]` | — | Sim | Array de opções |
| `value` | `ComboboxValue \| ComboboxValue[]` | — | Não | Valor controlado (single ou multi) |
| `defaultValue` | `ComboboxValue \| ComboboxValue[]` | — | Não | Valor inicial (não-controlado) |
| `onChange` | `(value) => void` | — | Não | Callback de mudança |
| `multiple` | `boolean` | `false` | Não | Habilita seleção múltipla com chips |
| `placeholder` | `string` | i18n | Não | Placeholder do trigger |
| `searchPlaceholder` | `string` | i18n | Não | Placeholder da busca |
| `emptyText` | `string` | i18n | Não | Texto quando busca não encontra resultados |
| `noOptionsText` | `string` | i18n | Não | Texto quando `options` está vazio |
| `loading` | `boolean` | `false` | Não | Exibe Skeleton no lugar do trigger |
| `disabled` | `boolean` | `false` | Não | Desabilita o trigger |
| `clearable` | `boolean` | `true` | Não | Exibe botão de limpar no trigger |
| `searchable` | `boolean` | `true` | Não | Exibe barra de busca no popover |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Não | Altura e tamanho do texto |
| `rounded` | `"full" \| "md" \| "none"` | `"md"` | Não | Arredondamento do trigger e dropdown |
| `maxWidth` | `string \| number` | — | Não | Largura máxima do trigger |
| `maxDisplayed` | `number` | `3` | Não | Chips visíveis no multi-select |
| `locale` | `UILocale` | `"en-US"` | Não | Localização dos textos |
| `renderOption` | `(option, selected) => ReactNode` | — | Não | Slot de renderização customizada |

### Types

```ts
type ComboboxValue = string | number

interface ComboboxOption {
  value: ComboboxValue
  label: string
  disabled?: boolean
  group?: string
}
```

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` / `--popover-foreground` | PopoverContent (fundo e texto do dropdown) |
| `--accent` / `--accent-foreground` | Item hover/selected |
| `--muted-foreground` | Placeholder, grupo header, contador |
| `--muted` / `--input` | Badge chips |
| `--ring` | Foco do botão de limpar |
| `--border` | Bordas internas do popover |
| `size-*` | Skeleton loading (altura do trigger) |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Trigger fecha com valor selecionado ou placeholder |
| **Aberto** | Popover com barra de busca (se `searchable`) ou lista focada |
| **Selecionado (single)** | Label do valor exibido no trigger |
| **Selecionado (multi)** | Chips `Badge` no trigger com contagem de ocultos (`+N`) |
| **Filtragem** | Busca case-insensitive em tempo real |
| **Virtualizado** | Apenas linhas visíveis renderizadas, 10k+ itens |
| **Grupos** | Opções com `group` geram headers automáticos |
| **Loading** | Trigger substituído por `Skeleton` com dimensões correspondentes |
| **Disabled** | Trigger com `pointer-events-none` |
| **Disabled option** | Opção com `opacity-40 pointer-events-none` |
| **Vazio** | `noOptionsText` (sem dados) ou `emptyText` (busca sem resultado) |
| **Limpar** | Botão `X` no trigger (`clearable`) + toolbar "Clear all" no dropdown (multi) |
| **Teclado** | ↑↓ navega, Enter seleciona, Escape fecha, Tab fecha |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Trigger | `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` |
| Listbox | `role="listbox"`, `aria-multiselectable` (multi), `aria-selected`/`aria-disabled` por item |
| Foco | Auto-focus na busca ao abrir; lista focada se sem busca |
| Teclado | ↑↓ Enter Escape Tab gerenciados manualmente |
| Clear button | `aria-label` i18n |
| Loading | Skeleton sem role específico (transição visual) |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `SingleControlled` — Single Controlled
- [x] `MultiSelect` — Multi Select
- [x] `WithGroups` — With Groups
- [x] `MultiWithGroups` — Multi With Groups
- [x] `VirtualizedLargeList` — Virtualized Large List
- [x] `CustomRenderOption` — Custom Render Option
- [x] `LocalePTBR` — Locale PTBR
- [x] `Sizes` — Sizes
- [x] `Disabled` — Disabled
- [x] `DisabledOptions` — Disabled Options
- [x] `NoSearchBar` — No Search Bar
- [x] `RoundedVariants` — Rounded Variants
- [x] `FluidWidth` — Fluid Width
- [x] `Loading` — Loading
- [x] `SimulatedLoading` — Simulated Loading
- [x] `EmptyOptions` — Empty Options

## Checklist

- [x] Virtual scrolling com @tanstack/react-virtual
- [x] Suporte single e multi-select
- [x] Busca client-side com filtro case-insensitive
- [x] Botão clear no trigger + toolbar clear no multi
- [x] Skeleton loading state
- [x] Grupos automáticos via `option.group`
- [x] renderOption para conteúdo customizado
- [x] Controlado e não-controlado
- [x] Três tamanhos (sm/md/lg) e três arredondamentos (full/md/none)
- [x] i18n: placeholder, searchPlaceholder, emptyText, noOptionsText
