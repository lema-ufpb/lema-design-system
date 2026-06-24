# Spec: RadioGroup

> Conjunto de botões de opção mutualmente exclusivos para seleção única.

---

## Propósito

**Usar quando:** O usuário deve selecionar exatamente uma opção entre um conjunto pequeno (até ~7 opções).

**Não usar quando:** O usuário pode selecionar múltiplas opções — usar `Checkbox`. Mais de ~7 opções — usar `Select` ou `NativeSelect`.

**Alternativa:** `Select` para listas maiores; `ToggleGroup` para seleção visual.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/radio-group.tsx` |
| Tipo | `registry:ui` (name: `radio-group`) |
| Categoria | Formulário |
| Depende de | `radix-ui` (RadioGroup), `@/lib/utils` (cn) |

---

## API — Props

### RadioGroup

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `defaultValue` | `string` | — | Não | Valor selecionado inicial |
| `value` | `string` | — | Não | Valor controlado |
| `onValueChange` | `(value: string) => void` | — | Não | Callback de mudança |
| `className` | `string` | — | Não | Classes adicionais |

### RadioGroupItem

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | Sim | Valor do item |
| `id` | `string` | — | Não | ID para vinculo com Label |
| `disabled` | `boolean` | — | Não | Estado desabilitado |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--input` / `--input/90` | Fundo do círculo não checado |
| `--primary` / `--primary-foreground` | Círculo checado e indicador |
| `--ring` / `--ring/30` | Anel de foco |
| `--destructive` / `--destructive/20` | Borda/ring de erro |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Não checado | Borda transparente, fundo `--input/90` |
| Checado | Fundo `--primary`, indicador `--primary-foreground` |
| Focus | Borda `--ring`, anel `--ring/30` |
| Disabled | `opacity-50`, `cursor-not-allowed` |
| Invalid | Borda `--destructive`, anel `--destructive/20` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Vinculação com Label | `id` no item + `htmlFor` no Label |
| Role radiogroup | Gerenciado pelo Radix |
| Navegação por teclado | Setas direcionais (Radix) |
| Estados | `data-checked`, `aria-invalid`, `disabled` |

---

## Stories obrigatórias

- [x] `Default` — Três opções com seleção padrão
- [x] `Disabled` — Item desabilitado comparado a habilitado

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a estado controlado e não-controlado
- [x] Atributo `data-slot` no group e item
- [x] Indicador checado estilizado
