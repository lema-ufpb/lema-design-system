# Spec: ds-form-builder

## Propósito

Gerador de formulários validados a partir de `zod schema` (validação) + `fields` (meta de renderização: label, tipo de widget, opções). Usa `react-hook-form` + `zodResolver` + primitivos `Field/FieldGroup` para `aria-invalid`/`FieldError` automáticos.

**Usar quando:** Formulários dinâmicos com até ~10 campos, tipos `text/email/password/number/textarea/select/checkbox/switch`, validação zod.
**Não usar quando:** Formulários muito customizados com layout complexo ou lógica condicional pesada — compor `Field`/`Input` diretamente.
**Alternativa:** Composição manual com `ui/field`, `ui/input`, `ui/select`, etc.

---

## Localização

| Campo      | Valor                                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/form-builder.tsx`                                                                                                                               |
| Tipo       | `registry:ui` (name: `ds-form-builder`)                                                                                                                        |
| Categoria  | `Form`                                                                                                                                                         |
| Depende de | `react-hook-form`, `zod`, `@hookform/resolvers/zod`, `ui/button`, `ui/input`, `ui/textarea`, `ui/switch`, `ui/checkbox`, `ui/select`, `ui/field`, `ui/spinner` |

---

## API — Props

| Prop            | Tipo                                             | Padrão     | Obrigatória | Descrição                                                             |
| --------------- | ------------------------------------------------ | ---------- | ----------- | --------------------------------------------------------------------- |
| `schema`        | `z.ZodType<FieldValues, FieldValues>`            | —          | ✓           | Schema zod para validação (não introspectado para renderização)       |
| `fields`        | `FormFieldConfig[]`                              | —          | ✓           | Lista de campos com `name`, `label`, `type`, `placeholder`, `options` |
| `defaultValues` | `FieldValues`                                    | —          |             | Valores iniciais do form                                              |
| `onSubmit`      | `(values: FieldValues) => void \| Promise<void>` | —          | ✓           | Handler de submit                                                     |
| `submitLabel`   | `string`                                         | `"Submit"` |             | Label do botão de submit                                              |
| `loading`       | `boolean`                                        | `false`    |             | Força estado busy (além de `isSubmitting`)                            |
| `className`     | `string`                                         | —          |             | Classes extras no `<form>`                                            |

### `FormFieldConfig`

| Campo         | Tipo                | Padrão   | Obrigatória | Descrição                                                                  |
| ------------- | ------------------- | -------- | ----------- | -------------------------------------------------------------------------- |
| `name`        | `string`            | —        | ✓           | Nome do campo (key no `FieldValues`)                                       |
| `label`       | `string`            | —        | ✓           | Label visível                                                              |
| `type`        | `FormFieldType`     | `"text"` |             | `text`/`email`/`password`/`number`/`textarea`/`select`/`checkbox`/`switch` |
| `placeholder` | `string`            | —        |             | Placeholder do input                                                       |
| `description` | `string`            | —        |             | Descrição abaixo do campo                                                  |
| `options`     | `FormFieldOption[]` | —        |             | Obrigatório quando `type="select"`                                         |

### `FormFieldOption`

| Campo   | Tipo     | Descrição      |
| ------- | -------- | -------------- |
| `label` | `string` | Label da opção |
| `value` | `string` | Valor da opção |

### `FormFieldType`

`"text" \| "email" \| "password" \| "number" \| "textarea" \| "select" \| "checkbox" \| "switch"`

---

## Variantes CVA

Não há variantes CVA (`formBuilderVariants = undefined`). Variação vem de `fields[].type` e `loading`.

---

## Tokens de design utilizados

| Token                                                | Slot onde é usado                        |
| ---------------------------------------------------- | ---------------------------------------- |
| `w-full`                                             | form container                           |
| `Field`/`FieldGroup`                                 | layout e espaçamento                     |
| `Button`                                             | submit CTA                               |
| `Spinner`                                            | `data-icon="inline-start"` quando `busy` |
| `text-destructive` (via `FieldError`/`data-invalid`) | erro de validação                        |

---

## Escala tipográfica e de tamanho

Herda de primitivos `Field`, `Input`, `Select`, `Textarea`, `Switch`, `Checkbox`. Sem escala própria.

| Slot                | sm  | md  | lg  |
| ------------------- | --- | --- | --- |
| Herda de `ui/field` | —   | —   | —   |

---

## Comportamentos e estados

| Estado                             | Comportamento esperado                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| `onSubmit`                         | `handleSubmit(onSubmit)` via `react-hook-form` + `zodResolver(schema)`        |
| `errors[field]`                    | `FieldError` com `error.message`, `data-invalid` e `aria-invalid` no controle |
| `field.type="select"`              | `Controller` + `Select` com `SelectTrigger`/`SelectContent`/`SelectItem`      |
| `field.type="checkbox"/"switch"`   | `Controller` horizontal com `Checkbox`/`Switch` + `FieldContent`              |
| `field.type="textarea"`            | `Textarea`, demais `Input` com `valueAsNumber` quando `type="number"`         |
| `busy = loading \|\| isSubmitting` | `Button disabled`, `Spinner` inline-start                                     |
| `description`                      | Renderizado apenas quando `!errorMessage`                                     |

---

## Acessibilidade

| Requisito | Implementação                                              |
| --------- | ---------------------------------------------------------- |
| Label     | `FieldLabel htmlFor={field.name}`                          |
| Erro      | `FieldError` + `data-invalid` + `aria-invalid` no controle |
| Submit    | `Button type="submit"`                                     |
| Descrição | `FieldDescription` quando sem erro                         |

---

## Stories obrigatórias

- [x] `Default` — `signupSchema` + `signupFields`, verifica `Name`/`Email`/`Submit`
- [x] `ValidationErrors` — `userEvent.click(Submit)` mostra `Name must be at least 2 characters.`
- [x] `Loading` — `loading={true}` com `Spinner`

---

## Checklist antes de implementar

- [x] `zodResolver(schema)` para validação
- [x] `Controller` para `select`/`checkbox`/`switch`, `register` para demais
- [x] `data-invalid`/`aria-invalid` em controles com erro
- [x] `FieldError`/`FieldDescription` condicionais
- [x] `Spinner` quando `busy`
- [x] `cn()` para `className`
