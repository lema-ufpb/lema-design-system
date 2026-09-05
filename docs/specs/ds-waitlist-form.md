# Spec: WaitlistForm

---

## Propósito

Formulário compacto e inline de pré-lançamento ou lista de espera (waitlist / newsletter) para heróis de landing pages, com input de e-mail integrado a botão de ação, feedback visual de envio e contador social.

**Usar quando:** Captura de leads ou e-mails em seções de destaque/hero antes ou durante lançamentos.
**Não usar quando:** Formulários complexos com múltiplos campos (usar `Form` padrão com `ds-field-wrapper`).
**Alternativa se não se aplicar:** `Input` e `Button` agrupados manualmente.

---

## Localização

| Campo      | Valor                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Arquivo    | `components/ds/waitlist-form.tsx`                                     |
| Tipo       | `registry:ui`                                                         |
| Categoria  | `Form`                                                                |
| Depende de | `Input` (`components/ui/input.tsx`), `Button`, `ds-button`, `UI_I18N` |

---

## API — Props

| Prop          | Tipo                                                  | Padrão      | Obrigatória | Descrição                                          |
| ------------- | ----------------------------------------------------- | ----------- | ----------- | -------------------------------------------------- |
| `onSubmit`    | `(email: string) => Promise<boolean \| void> \| void` | —           |             | Handler assíncrono ou síncrono de envio            |
| `variant`     | `"default" \| "pill" \| "floating" \| "minimal"`      | `"default"` |             | Estilo visual do formulário                        |
| `size`        | `"sm" \| "md" \| "lg"`                                | `"md"`      |             | Escala de tamanho dos campos e botões              |
| `socialProof` | `string \| React.ReactNode`                           | —           |             | Mensagem de prova social (ex: "Junte-se a 2.000+") |
| `locale`      | `Locale`                                              | `"pt-BR"`   |             | Idioma para placeholders e estados                 |
| `disabled`    | `boolean`                                             | `false`     |             | Desabilita a interação                             |
| `autoFocus`   | `boolean`                                             | `false`     |             | Autofoco opcional no input                         |
| `className`   | `string`                                              | —           |             | Classes extras do container                        |

---

## Variantes CVA

| Dimensão  | Valores                                  | Padrão    |
| --------- | ---------------------------------------- | --------- |
| `variant` | `default`, `pill`, `floating`, `minimal` | `default` |
| `size`    | `sm`, `md`, `lg`                         | `md`      |

---

## Acessibilidade

- [x] Input possui `aria-label` e atributo `type="email"`.
- [x] Mensagens de status de sucesso ou erro anunciadas via `role="status"` / `aria-live="polite"`.
- [x] Ícone de loading desabilita reenvios enquanto a requisição é processada.
