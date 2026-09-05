# Spec: BlogGrid

> Grid responsivo 3 cols com filtros categoria + busca — blockus #01-#07.

---

## Propósito

Listagem paginada de `BlogCard`.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/blog-grid.tsx` |
| Tipo | `registry:block` (name: `ds-blog-grid`) |
| Categoria | Blog |
| Depende de | `BlogCard`, `PillGroup`/`Badge`, `Input`, `Empty` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `posts` | `BlogPost[]` | ✓ |  |
| `categories` | `string[]` | — | Filtro pills |
| `activeCategory` | `string` | — |  |
| `onCategoryChange` | `(c)=>void` | — |  |
| `search` | `string` | — |  |
| `onSearchChange` | `(s)=>void` | — |  |
| `locale` | `UILocale` | `"en-US"` |  |
| `loading` | `boolean` | `false` |  |

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `posts empty` | `Empty` `noPosts` i18n |
| `loading` | 6 `BlogCard loading` skeleton |
| `activeCategory` | `PillGroup` active |

---

## Stories

- [ ] `Default` — 6 posts + filter
- [ ] `Filtered`
- [ ] `Empty`
- [ ] `Loading`

---

## Checklist

- [x] `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` `gap-*` tokens
