# Spec: BlogFeatured

> Hero featured grande + 2 cards laterais — blockus #15-#22.

---

## Propósito

Destaque editorial.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/blog-featured.tsx`           |
| Tipo       | `registry:block` (name: `ds-blog-featured`) |
| Categoria  | Blog                                        |
| Depende de | `BlogCard` large + `BlogCard` compact       |

---

## API — Props

| Prop       | Tipo             | Padrão    | Descrição |
| ---------- | ---------------- | --------- | --------- |
| `featured` | `BlogPost`       | ✓         | Hero `lg` |
| `posts`    | `BlogPost[]` (2) | —         | Laterais  |
| `locale`   | `UILocale`       | `"en-US"` |           |
| `loading`  | `boolean`        | `false`   |           |

---

## Comportamentos

| Estado | Comportamento                                                       |
| ------ | ------------------------------------------------------------------- |
| Layout | `grid lg:grid-cols-3 gap-6` featured `col-span-2` image `h-[360px]` |

---

## Stories

- [ ] `Default` — hero + 2 side
- [ ] `OnlyFeatured`
- [ ] `Loading`

---

## Checklist

- [x] `gap-6` grid, `rounded-2xl` destaque
