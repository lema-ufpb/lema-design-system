# Spec: Combobox

> Autocomplete combobox com suporte a seleção única, múltipla com chips, grupos e navegação por teclado.

---

## Propósito

Componente de entrada que combina campo de texto com lista suspensa para seleção de valores, permitindo filtragem conforme o usuário digita.

**Usar quando:** O usuário precisa selecionar um ou mais valores de uma lista longa, ou quando deseja filtrar opções digitando.

**Não usar quando:** A lista tem menos de 5 opções estáticas (prefira Select ou RadioGroup). Para seleção única sem filtro, use Select.

**Alternativa se não se aplicar:** `Select` (Radix UI) para seleção única sem busca; `Checkbox` para múltipla escolha visível.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/combobox.tsx` |
| data-slot | `combobox` |
| Tipo | `registry:ui` (name: `combobox`) |
| Categoria | Formulário / Entrada de dados |
| Depende de | `@base-ui/react`, `lucide-react`, `button`, `input-group` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Combobox` | — | — | — | Root do combobox (`ComboboxPrimitive.Root`) |
| `ComboboxValue` | `ComboboxPrimitive.Value.Props` | — | — | Exibe o valor selecionado |
| `ComboboxTrigger` | `ComboboxPrimitive.Trigger.Props` + `className` | — | — | Botão para abrir/fechar o popup |
| `ComboboxInput.disabled` | `boolean` | `false` | — | Desabilita o input |
| `ComboboxInput.showTrigger` | `boolean` | `true` | — | Exibe botão trigger |
| `ComboboxInput.showClear` | `boolean` | `false` | — | Exibe botão de limpar |
| `ComboboxInput` | `ComboboxPrimitive.Input.Props` + extras | — | — | Input de busca |
| `ComboboxContent.side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | — | Lado do popup |
| `ComboboxContent.sideOffset` | `number` | `6` | — | Distância do gatilho |
| `ComboboxContent.align` | `"start" \| "center" \| "end"` | `"start"` | — | Alinhamento do popup |
| `ComboboxContent.alignOffset` | `number` | `0` | — | Deslocamento de alinhamento |
| `ComboboxContent.anchor` | `HTMLElement \| null` | — | — | Elemento âncora |
| `ComboboxList` | `ComboboxPrimitive.List.Props` | — | — | Lista de itens scrollável |
| `ComboboxItem` | `ComboboxPrimitive.Item.Props` | — | — | Item selecionável |
| `ComboboxGroup` | `ComboboxPrimitive.Group.Props` | — | — | Agrupamento de itens |
| `ComboboxLabel` | `ComboboxPrimitive.GroupLabel.Props` | — | — | Rótulo do grupo |
| `ComboboxEmpty` | `ComboboxPrimitive.Empty.Props` | — | — | Estado vazio |
| `ComboboxSeparator` | `ComboboxPrimitive.Separator.Props` | — | — | Divisor visual |
| `ComboboxChips` | `ComboboxPrimitive.Chips.Props` | — | — | Container de chips multi-select |
| `ComboboxChip.showRemove` | `boolean` | `true` | — | Exibe botão de remover |
| `ComboboxChip` | `ComboboxPrimitive.Chip.Props` + extras | — | — | Chip individual |
| `ComboboxChipsInput` | `ComboboxPrimitive.Input.Props` | — | — | Input dentro de chips |
| `ComboboxCollection` | `ComboboxPrimitive.Collection.Props` | — | — | Coleção virtualizada |
| `useComboboxAnchor` | — | — | — | Hook que retorna `RefObject` para âncora |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` / `--popover-foreground` | `ComboboxContent` (fundo e texto) |
| `--accent` / `--accent-foreground` | `ComboboxItem` (hover/selected) |
| `--border` | `ComboboxSeparator`, `ComboboxChips` |
| `--muted-foreground` | `ComboboxLabel`, `ComboboxEmpty`, ChevronIcon |
| `--input` | `ComboboxChips` (bg) |
| `--ring` | `ComboboxChips` (focus) |
| `--destructive` | `ComboboxChips` (invalid) |
| `bg-input/50` | Slot OTP preenchido |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Aberto** | Popup posicionado via `ComboboxPrimitive.Positioner` com animação `animate-in fade-in zoom-in` |
| **Fechado** | Animação `animate-out fade-out zoom-out` |
| **Selecionado** | Item recebe `CheckIcon` via `ItemIndicator` |
| **Disabled** | Input e trigger com `opacity-50 pointer-events-none` |
| **Empty** | `ComboboxEmpty` exibido quando nenhum item corresponde |
| **Multi-select** | `ComboboxChips` exibe chips removíveis, `ComboboxChipsInput` para digitação |
| **Invalid** | `ComboboxChips` com `border-destructive` e `ring-destructive/20` |
| **Highlighted** | Item com `data-highlighted` aplica `bg-accent text-accent-foreground` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | `list` com papel `combobox` do `@base-ui/react` |
| Navegação por teclado | Setas, Enter, Escape gerenciados pelo primitivo |
| ARIA | Gerenciado pelo `@base-ui/react` (combobox, listbox, option) |
| Foco | Gerenciado pelo primitivo com `data-highlighted` |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `WithClear` — Botão de limpar visível
- [x] `Disabled` — Estado desabilitado
- [x] `WithGroups` — Agrupamento de opções
- [x] `MultiSelect` — Seleção múltipla com chips
- [x] `WithCustomFilter` — Filtro customizado
- [x] `ControlledValue` — Valor controlado
- [x] `WithBadgeValue` — Valor exibido como badge

## Checklist

- [x] Componente exporta todas as partes: Root, Input, Content, List, Item, Group, Label, Empty, Separator, Chips, Chip, ChipsInput, Trigger, Value, Collection
- [x] Suporta seleção única e múltipla
- [x] Popup posicionado dinamicamente com âncora
- [x] Botão de limpar (showClear) e trigger (showTrigger) configuráveis
- [x] Estados: default, disabled, empty, invalid
- [x] Animações de entrada/saída no popup
- [x] Chips com botão de remover opcional
