# Spec: FaqsSupport

> FAQs com card suporte lateral — blockus #14 #19.

---

## Propósito

Layout `grid lg:2` faq + `Card` help.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/faqs-support.tsx` |
| Tipo | `registry:block` (name: `ds-faqs-support`) |
| Categoria | FAQ |
| Depende de | `Faqs`, `Card`, `Button` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `supportTitle` | `string` | `stillHaveQuestions` |  |
| `supportDescription` | `string` | — |  |
| `supportAction` | `{label, href, onClick}` | — | CTA |

Herda `Faqs`.

---

## Stories

- [ ] `Default` — faq + support card
- [ ] `WithoutSupport`

---

## Checklist

- [x] `gap-6` grid, `rounded-2xl` card
