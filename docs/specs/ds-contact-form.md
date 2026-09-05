# Spec: ds-contact-form

> Contact Form (formulário de contato nome/e-mail/assunto/mensagem).

---

## Propósito

Formulário de contato genérico com estados idle/submitting/success/error (mesmo padrão do `ds-waitlist-form`), construído com `FieldGroup`+`Field` conforme as regras shadcn do projeto. Base para todos os blocos "Contact" do blockus.

**Usar quando:** Precisar de um formulário de contato/suporte com nome, e-mail e mensagem.
**Não usar quando:** For só captura de e-mail — use `ds-waitlist-form`.

---

## Localização

| Campo      | Valor                                                         |
| ---------- | -------------------------------------------------------------- |
| Arquivo    | `components/ds/contact-form.tsx`                               |
| Tipo       | `registry:ui` (name: `ds-contact-form`)                        |
| Categoria  | `Form`                                                          |
| Depende de | `field`, `input`, `textarea`, `button`, `ds-pill-group`        |

---

## API — Props

| Prop           | Tipo                                                    | Padrão    | Descrição                                                 |
| --------------- | ---------------------------------------------------------- | --------- | -------------------------------------------------------------- |
| `topics`       | `{ value, label }[]`                                       | `[]`      | Chips de tópico/departamento (via `PillGroup`)                 |
| `showSubject`  | `boolean`                                                   | `!topics.length` | Mostra o campo assunto                                   |
| `onSubmit`     | `(values: ContactFormValues) => Promise<boolean\|void>\|void` | —       | Handler de envio; retornar `false` marca erro                  |
| `size`         | `"sm" \| "md" \| "lg"`                                      | `"md"`    | Largura máxima e espaçamento do formulário                     |
| `locale`       | `UILocale`                                                  | `"en-US"` | Locale das strings                                              |
| `disabled`     | `boolean`                                                   | `false`   | Desabilita todos os campos                                      |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ----------------- | ------ |
| `size`   | `sm`, `md`, `lg`  | `md`   |

**Slots:** `contactFormVariants`.

---

## Comportamentos e estados

| Estado                | Comportamento esperado                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `status="submitting"`   | Campos e botão desabilitados, spinner + texto "sending" no botão          |
| `status="success"`      | Formulário inteiro é substituído por uma mensagem `role="status"`         |
| `status="error"`         | `FieldDescription role="alert"` com a mensagem de erro                    |
| `topics` vazio           | Campo assunto aparece por padrão                                          |
| `topics` presente        | Campo assunto some por padrão (chips de tópico assumem esse papel)        |

---

## Acessibilidade

| Requisito     | Implementação                                              |
| --------------- | ------------------------------------------------------------- |
| Labels          | `FieldLabel htmlFor` em todo campo (via `React.useId()`)      |
| Erro            | `role="alert"` na mensagem de erro                             |
| Sucesso         | `role="status" aria-live="polite"` na mensagem de sucesso      |
| i18n            | `UI_I18N[locale].contactForm.*`                                |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `WithTopics`
- [x] `WithoutSubject`
- [x] `SubmitError`
- [x] `Locales`

---

## Checklist antes de implementar

- [x] `FieldGroup`+`Field` (não `div`+`Label` manual)
- [x] `defaultVariants` no `cva()`
- [x] `*Variants` exportado
- [x] Prop `locale` integrada via `UI_I18N`
