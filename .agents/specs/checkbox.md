# Spec: Checkbox

> Um controle de entrada booleano de dois estados para seleção de opções.

---

## Propósito

O Checkbox é um campo de formulário de dois estados (marcado/desmarcado) construído sobre `CheckboxPrimitive.Root` da Radix UI. Suporta três estados visuais: `checked` (verdadeiro), `unchecked` (falso) e `indeterminate` (parcial), controlados pela prop `checked` que aceita `boolean | "indeterminate"`. O indicador interno usa o ícone `CheckIcon` do lucide-react. A aparência segue o sistema de tokens: fundo padrão usa `bg-input/90`, fundo marcado usa `bg-primary` com `text-primary-foreground` para o check. Inclui detecção de `aria-invalid` para estados de erro com borda em `--destructive`. O tamanho fixo é `size-4` (16px) com `rounded-[5px]`. Integra-se com o componente `Field` via `group-has-disabled/field` para desabilitação contextual.

**Usar quando:** Seleção múltipla em formulários (termos, preferências, categorias), listas de tarefas, tabelas com seleção de linhas, filtros de busca.

**Não usar quando:** Apenas uma opção pode ser selecionada (usar `RadioGroup`). Para toggle binário de configurações (usar `Switch`). Para seleção de itens em listas com ações associadas, considerar `Item` com checkbox custom.

**Alternativa se não se aplicar:** `RadioGroup` para seleção única, `Switch` para toggle de configuração, `Toggle` para botões de estado binário.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/checkbox.tsx` |
| Tipo | `registry:ui` (name: `checkbox`) |
| Categoria | Form / Input |
| Depende de | Nenhuma |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `checked` | `boolean \| "indeterminate"` | — | Não | Estado controlado |
| `onCheckedChange` | `(checked: CheckedState) => void` | — | Não | Callback de mudança |
| `disabled` | `boolean` | — | Não | Estado desabilitado |
| `id` | `string` | — | Não | ID para vincular ao label |
| `className` | `string` | — | Não | Classes adicionais |

> Demais props herdadas de `CheckboxPrimitive.Root`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--input` | Fundo desmarcado (`bg-input/90`) |
| `--primary` | Fundo quando marcado (`data-checked:bg-primary`) |
| `--primary-foreground` | Cor do ícone check |
| `--ring` / `--ring/30` | Focus ring (`focus-visible:ring-3`) |
| `--destructive` | Borda e ring quando `aria-invalid` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Unchecked | Fundo `bg-input/90`, sem borda visível (`border-transparent`) |
| Checked | Fundo `bg-primary`, borda `border-primary`, ícone `text-primary-foreground` |
| Indeterminate | Fundo `bg-primary`, exibe `CheckIcon` (comportamento Radix) |
| Disabled | `opacity-50`, `cursor-not-allowed` |
| Disabled via Field | `group-has-disabled/field:opacity-50` |
| Focus visible | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30` |
| Aria-invalid | Borda `border-destructive`, ring `ring-destructive/20` |
| Erro + checked | Borda `border-primary` (sobrescreve destructive) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role checkbox | Nativo da Radix UI |
| Estado ARIA | `aria-checked` gerenciado pela Radix |
| Label vinculado | `id` + `<Label htmlFor>` para clique no label |
| Navegação por teclado | Espaço para alternar (Radix), Tab para foco |
| Focus visible | `focus-visible:border-ring focus-visible:ring-3` |
| Indeterminado | `aria-checked="mixed"` (Radix) |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Checkbox controlado com label "Accept terms"
- [x] `Checked` — Checkbox pré-marcado
- [x] `Indeterminate` — Estado indeterminado (seleção parcial)
- [x] `Disabled` — Checkboxes desabilitados (marcado e desmarcado)
- [x] `WithLabel` — Checkbox não-controlado com label

---

## Checklist antes de implementar

- [x] Escala — `size-4` (16px) com `rounded-[5px]`
- [x] Tokens semânticos — `input`, `primary`, `primary-foreground`, `ring`, `destructive`
- [x] Ícone — `CheckIcon` com `size-3.5` via `[&>svg]:size-3.5`
- [x] Focus ring — `after:-inset-x-3 after:-inset-y-2` para área de clique expandida
- [x] Indeterminate — `checked="indeterminate"` com suporte Radix
- [x] Field integration — `group-has-disabled/field:opacity-50` para desabilitação contextual
