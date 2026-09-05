# Spec: RegisterSplit

> Split screen imagem + formulário — blockus #09-#22.

---

## Propósito

`grid lg:2 gap-0 rounded-3xl border overflow-hidden` esq. brand + testemunho, dir. `Register`.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/register-split.tsx` |
| Tipo | `registry:block` (name: `ds-register-split`) |
| Categoria | Register |
| Depende de | `Register`, `BackgroundGlow`, `Avatar` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `imageSrc` | `string` | — | Cover esq. |
| `testimonial` | `{quote, author, role, avatarUrl}` | — | Card testemunho |

Herda `Register`.

---

## Stories

- [ ] `Default` — split
- [ ] `WithoutTestimonial`

---

## Checklist

- [x] `rounded-3xl` `gap-0` grid
