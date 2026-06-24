# Spec: Field

> Layout flexível de campo de formulário com label, descrição e validação.

---

## Propósito

Wrapper de campo de formulário que compõe label, input, descrição e mensagens de erro em diferentes orientações (vertical, horizontal, responsivo).

**Usar quando:** É necessário estruturar campos de formulário com label, validação e texto de ajuda de forma consistente.

**Não usar quando:** Apenas um input simples é necessário (use Input diretamente). Para grupos de checkbox/radio, use FieldGroup.

**Alternativa se não se aplicar:** `Input` direto para campos sem label; `FieldSet`/`FieldLegend` para agrupamento semântico de campos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/field.tsx` |
| Tipo | `registry:ui` (name: `field`) |
| Categoria | Formulário / Layout |
| Depende de | `class-variance-authority`, `label`, `separator` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Field.orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | — | Orientação do layout |
| `Field` | `React.ComponentProps<"div">` + variantes | — | — | Container do campo |
| `FieldSet` | `React.ComponentProps<"fieldset">` | — | — | Agrupamento semântico de campos |
| `FieldLegend.variant` | `"legend" \| "label"` | `"legend"` | — | Estilo do legend |
| `FieldLegend` | `React.ComponentProps<"legend">` + extras | — | — | Título do fieldset |
| `FieldGroup` | `React.ComponentProps<"div">` | — | — | Grupo de campos |
| `FieldContent` | `React.ComponentProps<"div">` | — | — | Container do input |
| `FieldLabel` | `Label.Props` | — | — | Label do campo |
| `FieldTitle` | `React.ComponentProps<"div">` | — | — | Título inline |
| `FieldDescription` | `React.ComponentProps<"p">` | — | — | Texto de ajuda |
| `FieldError.children` | `React.ReactNode` | — | — | Mensagem de erro customizada |
| `FieldError.errors` | `Array<{ message?: string } \| undefined>` | — | — | Lista de erros para deduplicação |
| `FieldError` | `React.ComponentProps<"div">` + extras | — | — | Mensagem de validação |
| `FieldSeparator.children` | `React.ReactNode` | — | — | Texto opcional no separador |
| `FieldSeparator` | `React.ComponentProps<"div">` + extras | — | — | Divisor horizontal entre campos |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--destructive` | `FieldError` |
| `--muted-foreground` | `FieldDescription` |
| `--border` | `FieldSeparator` |
| `--background` | Fundo do texto do separador |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Vertical (padrão)** | Label acima do input, `flex-col` |
| **Horizontal** | Label ao lado do input, `flex-row items-center` |
| **Responsive** | Vertical em mobile, horizontal em `@md` container query |
| **Invalid** | `data-invalid` aplica `text-destructive` |
| **Disabled** | `data-disabled` no Field aplica `opacity-50` nos labels |
| **Com erro** | `FieldError` exibe mensagens deduplicadas, role="alert" |
| **Separator** | `FieldSeparator` com linha horizontal e texto opcional centralizado |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | Estrutura semântica com `fieldset`/`legend` |
| Erro | `role="alert"` em `FieldError` |
| Associação label-input | `FieldLabel` usa `Label` do Radix UI |

---

## Stories obrigatórias

- [x] `Default`
- [x] `Horizontal`
- [x] `WithError`
- [x] `FieldSetExample`

---

## Checklist

- [x] Três orientações: vertical, horizontal, responsive
- [x] FieldError com deduplicação de erros
- [x] FieldSet + FieldLegend para agrupamento semântico
- [x] FieldSeparator com texto opcional
- [x] Suporte a `data-invalid` para estado de erro
- [x] Container queries para orientação responsiva
