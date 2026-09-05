# Spec: BlogMeta

> Linha de metadados: data, reading time, categoria.

---

## Propósito

Agrupa `publishedAt` + `readingTime` + `category` com separadores `·`.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/blog-meta.tsx` |
| Tipo | `registry:ui` (name: `ds-blog-meta`) |
| Categoria | Blog |
| Depende de | `Badge`, `UI_I18N`, `format-utils` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `publishedAt` | `string \| Date` | — | Data |
| `readingTime` | `number` | — | Min |
| `category` | `string` | — | Badge |
| `size` | `"sm" \| "md"` | `"md"` |  |
| `locale` | `UILocale` | `"en-US"` | Formatação data `Intl.DateTimeFormat` |
| `loading` | `boolean` | `false` |  |

---

## Tokens

| Token | Slot |
|---|---|
| `text-muted-foreground text-xs` | meta |
| `bg-muted` | skeleton |

---

## Stories

- [ ] `Default` — date + 5 min + category
- [ ] `WithoutCategory`
- [ ] `Loading`

---

## Checklist

- [x] `tabular-nums` readingTime, `truncate`
