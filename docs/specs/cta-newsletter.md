# Spec: CtaNewsletter

> CTA com captura email inline — blockus #17-#24.

---

## Propósito

CTA + `Input` + `Button` com validação e estados `idle/success/error`.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/cta-newsletter.tsx` |
| Tipo | `registry:block` (name: `ds-cta-newsletter`) |
| Categoria | CTA |
| Depende de | `Cta`, `Input`, `Button`, `UI_I18N` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `onSubscribe` | `(email)=>Promise<boolean> \| void` | — | Handler |
| `placeholder` | `string` | `UI_I18N.cta.emailPlaceholder` |  |
| `disclaimer` | `string` | `UI_I18N.cta.noSpam` | `text-xs text-muted-foreground` |

Herda `CtaProps` sem `primaryAction` (substituído por form).

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `idle` | Input + Button `Subscribe` |
| `success` | `text-success` mensagem |
| `error` | `data-invalid` + `aria-invalid` |

---

## Acessibilidade

| Requisito | Implementação |
|---|---|
| Form | `FieldGroup + Field` `aria-label` |
| Input | `type email` `required` |

---

## Stories

- [ ] `Default`
- [ ] `Success`
- [ ] `Locales`

---

## Checklist

- [x] `gap-3` form, `rounded-full` input/button
