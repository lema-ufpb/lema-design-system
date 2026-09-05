# Spec: Testimonials

> Grid de depoimentos 2-3 cols — blockus Testimonials #01-#10.

---

## Propósito

Listagem `md:2 lg:3 gap-6`.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/testimonials.tsx` |
| Tipo | `registry:block` (name: `ds-testimonials`) |
| Categoria | Testimonials |
| Depende de | `TestimonialCard` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `items` | `Testimonial[]` | ✓ |  |
| `title` | `string` | i18n |  |
| `columns` | `2 \| 3` | `3` |  |
| `locale` | `UILocale` | `"en-US"` |  |

---

## Stories

- [ ] `Default` — 3 cards
- [ ] `TwoCols`
- [ ] `Loading`

---

## Checklist

- [x] `gap-6`
