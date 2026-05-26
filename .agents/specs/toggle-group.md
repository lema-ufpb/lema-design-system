# Spec: Toggle Group

> Conjunto de botões de alternância relacionados que permite seleção única ou múltipla.

---

## Propósito

**Usar quando:** O usuário precisa selecionar uma ou mais opções em um grupo de ações mutuamente relacionadas, como formatação de texto (negrito, itálico, sublinhado) ou alinhamento.

**Não usar quando:** A seleção é binária única (usar Toggle). As opções são itens de navegação (usar Tabs). A seleção leva a ação imediata (usar Menu ou Dropdown).

**Alternativa:** Toggle para opção única, Radio Group para seleção única obrigatória, Checkbox para seleção múltipla independente.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/toggle-group.tsx` |
| Tipo | `registry:ui` (name: `toggle-group`) |
| Categoria | Ação / Alternância em grupo |
| Depende de | `toggle`, `radix-ui`, `class-variance-authority` |

---

## API — Props

### ToggleGroup

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `type` | `"single" \| "multiple"` | — | Sim | Comportamento de seleção |
| `variant` | `"default" \| "outline"` | — | Não | Estilo herdado pelos itens |
| `size` | `"sm" \| "default" \| "lg"` | — | Não | Tamanho herdado pelos itens |
| `spacing` | `number` | `2` | Não | Gap entre itens (0 = conectados) |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Não | Direção do layout |
| `value` | `string \| string[]` | — | Não | Valor(es) controlado(s) |
| `defaultValue` | `string \| string[]` | — | Não | Valor(es) inicial(is) |
| `onValueChange` | `(value) => void` | — | Não | Callback de mudança |

### ToggleGroupItem

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | Sim | Valor do item |
| `variant` | `"default" \| "outline"` | `"default"` | Não | Sobrescreve variante do grupo |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Não | Sobrescreve tamanho do grupo |
| `disabled` | `boolean` | — | Não | Desabilita o item |
| `aria-label` | `string` | — | Recomendado | Rótulo de acessibilidade |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--muted` | Fundo do item selecionado (`data-[state=on]`) e hover |
| `--border` / `--input` | Borda da variante `outline` |
| `--ring / 30%` | Anel de foco |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Horizontal** | Layout `flex-row` com gap configurável |
| **Vertical** | Layout `flex-col` com `items-stretch` |
| **Com spacing > 0** | Gap entre itens com `rounded-3xl` individual |
| **Sem spacing (0)** | Itens conectados, bordas unificadas (primeiro `rounded-l-3xl`, último `rounded-r-3xl`) |
| **Selecionado** | `data-[state=on]:bg-muted` |
| **Focus** | `z-10 focus-visible:z-10` para sobreposição correta |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role | Radix fornece `role="group"`, `aria-label` no grupo |
| Teclado | Navegação por setas (horizontal ou vertical) |
| Estado | `data-[state=on]` / `data-[state=off]` para cada item |
| Rótulo | `aria-label` em cada item (especialmente ícones) |

---

## Stories obrigatórias

- [x] `Default` — múltiplo, formatação (bold/italic/underline)
- [x] `Variants` — default e outline
- [x] `Sizes` — sm e lg com alinhamento
- [x] `Segmented` — spacing=0, outline, single
- [x] `Vertical` — orientação vertical
- [x] `Single` — single selection, valor padrão "center"

---

## Checklist

- [x] Componente implementado em `toggle-group.tsx`
- [x] Stories implementadas (Default, Variants, Sizes, Segmented, Vertical, Single)
- [x] Reutiliza `toggleVariants` do componente Toggle
- [x] Contexto para propagar variant, size, spacing e orientation
- [x] Suporte a `spacing=0` para aparência de segmented control
- [x] Orientação horizontal e vertical
- [x] `data-slot` em ToggleGroup e ToggleGroupItem
- [x] Tokens semânticos
