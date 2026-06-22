# Spec: ds-select

## Propósito

Wrapper do `ui/select` com search filter, async loading, grouped options, "create new" option, i18n placeholder/no-results, skeleton loading, size variants (sm/md/lg).

**Usar quando:** Selects que precisam de busca, loading assíncrono, criação de nova opção, ou agrupamento  
**Não usar quando:** Select simples com poucas opções — usar `ui/select` diretamente  
**Alternativa se não se aplicar:** `ui/select`

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/select.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Form` |
| Depende de | `ui/select`, `ui/command`, `ui/popover`, `ui/skeleton`, `ui/spinner`, `lib/format-utils`, `lucide-react` (ChevronDown, Check, Search, Plus, Loader2) |

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `options` | `SelectOption[]` | `[]` | ✓ | Opções disponíveis |
| `value` | `string \| string[]` | — | | Valor selecionado |
| `onChange` | `(value: string \| string[]) => void` | — | | Callback de seleção |
| `multiple` | `boolean` | `false` | | Seleção múltipla |
| `searchable` | `boolean` | `false` | | Input de busca no dropdown |
| `async` | `boolean` | `false` | | Carregamento assíncrono |
| `loadOptions` | `(search: string) => Promise<SelectOption[]>` | — | | Função async p/ carregar opções |
| `creatable` | `boolean` | `false` | | Permite criar nova opção |
| `onCreate` | `(label: string) => Promise<string>` | — | | Callback de criação |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho |
| `placeholder` | `string` | — | | Placeholder |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `error` | `string` | — | | Mensagem de erro |
| `label` | `string` | — | | Label acima do select |
| `locale` | `UILocale` | `"pt-BR"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

**Types:**

```ts
export interface SelectOption {
  value: string
  label: string
  group?: string
  disabled?: boolean
  icon?: React.ReactNode
}
```

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `hasError` | `true`, `false` | `false` |

**Slots:**
- `triggerVariants` — trigger height/padding
- `optionVariants` — option padding/font

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-muted-foreground` | placeholder / no-results |
| `text-foreground` | selected value |
| `bg-input/50` | trigger fundo |
| `bg-popover` | dropdown fundo |
| `text-popover-foreground` | dropdown texto |
| `bg-accent` / `text-accent-foreground` | option hover |
| `text-destructive` | error message |

## Escala

| Slot | sm | md | lg |
|------|----|----|----|
| Trigger height | `h-8` | `h-9` | `h-10` |
| Trigger font | `text-xs` | `text-sm` | `text-base` |
| Option padding | `py-1.5 px-2.5` | `py-2 px-3` | `py-2.5 px-3.5` |
| Icon | `size-3.5` | `size-4` | `size-5` |

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | Skeleton do trigger |
| `async=true` | `loadOptions` chamado com debounce (300ms) |
| `creatable` | Opção "+ Criar 'texto'" no final da lista |
| `multiple` | Array de valores, tags no trigger |
| `searchable` | Input de busca filtra opções |
| `error` | Borda destructive + mensagem |
| Empty results | i18n no-results |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | Label visível vinculado ao trigger |
| Combo | role="combobox" via SelectPrimitive |
| i18n | `select.search`, `select.noResults`, `select.create`, `select.placeholder` |

## Stories obrigatórias

- [x] `Default` — opções estáticas
- [x] `Searchable` — com input de busca
- [x] `Multiple` — seleção múltipla
- [x] `Async` — loadOptions + loading
- [x] `Creatable` — criar nova opção
- [x] `Grouped` — opções agrupadas
- [x] `AllSizes` — sm, md, lg
- [x] `WithError` — mensagem de erro
- [x] `Loading` — skeleton no trigger
- [x] `Disabled` — desabilitado
