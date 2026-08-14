# Spec: Select

> Controle de seleção estilizado com dropdown virtualizado, suporte a teclado, grupos e scroll.

---

## Propósito

**Usar quando:** Oferecer uma lista de opções selecionáveis com dropdown estilizado, grupos, labels e navegação por teclado completa.

**Não usar quando:** O select precisa do comportamento nativo do navegador — usar `NativeSelect`. Menos de 3 opções — considerar `RadioGroup`.

**Alternativa:** `NativeSelect` para comportamento nativo; `RadioGroup` para poucas opções.

---

## Localização

| Campo      | Valor                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ui/select.tsx`                                                                          |
| Tipo       | `registry:ui` (name: `select`)                                                                      |
| Categoria  | Formulário                                                                                          |
| Depende de | `radix-ui` (Select), `lucide-react` (ChevronDownIcon, ChevronUpIcon, CheckIcon), `@/lib/utils` (cn) |

---

## API — Props

### SelectTrigger

| Prop        | Tipo                | Padrão      | Obrigatória | Descrição          |
| ----------- | ------------------- | ----------- | ----------- | ------------------ |
| `size`      | `"sm" \| "default"` | `"default"` | Não         | Altura do trigger  |
| `className` | `string`            | —           | Não         | Classes adicionais |

### SelectContent

| Prop       | Tipo                           | Padrão           | Obrigatória | Descrição                    |
| ---------- | ------------------------------ | ---------------- | ----------- | ---------------------------- |
| `position` | `"item-aligned" \| "popper"`   | `"item-aligned"` | Não         | Estratégia de posicionamento |
| `align`    | `"start" \| "center" \| "end"` | `"center"`       | Não         | Alinhamento                  |

### SelectItem

| Prop       | Tipo      | Padrão | Obrigatória | Descrição           |
| ---------- | --------- | ------ | ----------- | ------------------- |
| `value`    | `string`  | —      | Sim         | Valor do item       |
| `disabled` | `boolean` | —      | Não         | Estado desabilitado |

---

## Tokens de design

| Token                                | Slot                      |
| ------------------------------------ | ------------------------- |
| `--input` / `--input/50`             | Fundo do trigger          |
| `--muted-foreground`                 | Placeholder               |
| `--popover` / `--popover-foreground` | Fundo e texto do dropdown |
| `--accent` / `--accent-foreground`   | Hover/focus nos items     |
| `--border`                           | Separador                 |
| `--ring` / `--ring/30`               | Anel de foco              |
| `--destructive` / `--destructive/20` | Estado de erro            |

---

## Comportamentos e estados

| Estado           | Comportamento                                     |
| ---------------- | ------------------------------------------------- |
| Trigger focus    | Borda `--ring`, anel `--ring/30`                  |
| Placeholder      | Texto `--muted-foreground` via `data-placeholder` |
| Dropdown aberto  | Animação `fade-in` + `zoom-in-95`                 |
| Item focado      | Fundo `--accent`, texto `--accent-foreground`     |
| Item selecionado | Ícone `CheckIcon` via `ItemIndicator`             |
| Disabled         | `opacity-50`, `cursor-not-allowed`                |
| Invalid          | Borda `--destructive`, anel `--destructive/20`    |
| Popper position  | Animações de translate adicionais                 |

---

## Acessibilidade

| Requisito             | Implementação                                     |
| --------------------- | ------------------------------------------------- |
| Navegação por teclado | Setas, Enter, Escape (Radix)                      |
| Listbox role          | Gerenciado pelo Radix                             |
| Indicador de seleção  | `CheckIcon` via `ItemIndicator`                   |
| Scroll                | `SelectScrollUpButton` e `SelectScrollDownButton` |

---

## Stories obrigatórias

- [x] `Default` — Quatro opções, placeholder
- [x] `Sizes` — Trigger sm vs default
- [x] `WithGroups` — Grupos com label e separador
- [x] `PopperPosition` — Position `popper`

---

## Checklist

- [x] Componente funcional com 11 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `size` no trigger
- [x] Suporte a `position` no content
- [x] Grupos, labels e separadores
- [x] Botões de scroll para listas longas
- [x] Atributo `data-slot` em todos os sub-componentes
