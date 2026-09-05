# Spec: BlogList

> Lista horizontal imagem à esquerda — blockus #08-#12.

---

## Propósito

Variante list para updates cronológicos.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/blog-list.tsx` |
| Tipo | `registry:block` (name: `ds-blog-list`) |
| Categoria | Blog |
| Depende de | `BlogCard` horizontal, `Separator` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `posts` | `BlogPost[]` | ✓ |  |
| `locale` | `UILocale` | `"en-US"` |  |
| `loading` | `boolean` | `false` |  |

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `posts` | Flex `flex-col gap-6` cada item `flex gap-4 border-b pb-6` imagem `w-40 h-28 rounded-xl` |

---

## Stories

- [ ] `Default`
- [ ] `Loading`

---

## Checklist

- [x] `gap-4` flex, `rounded-xl` image
