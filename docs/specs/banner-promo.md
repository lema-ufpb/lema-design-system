# Spec: BannerPromo

> Card promo centrado com gradiente/imagem, título, descrição e 1-2 CTAs — blockus #05-#08.

---

## Propósito

Promo card inline `rounded-2xl border` com fundo `bg-gradient` ou `image`.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ds/banner-promo.tsx`           |
| Tipo       | `registry:block` (name: `ds-banner-promo`) |
| Categoria  | Navigation                                 |
| Depende de | `Banner`, `Button`, `Card`                 |

---

## API — Props

| Prop              | Tipo                     | Padrão    | Descrição     |
| ----------------- | ------------------------ | --------- | ------------- |
| `title`           | `string`                 | ✓         |               |
| `description`     | `string`                 | —         |               |
| `imageSrc`        | `string`                 | —         | Cover direita |
| `intent`          | `Banner intent`          | `"promo"` |               |
| `primaryAction`   | `{label, href, onClick}` | —         |               |
| `secondaryAction` | `{label, href, onClick}` | —         |               |
| `dismissible`     | `boolean`                | `false`   |               |
| `size`            | `"sm" \| "md" \| "lg"`   | `"md"`    |               |

---

## Comportamentos

| Estado     | Comportamento                                 |
| ---------- | --------------------------------------------- |
| `imageSrc` | `grid-cols-2` image `object-cover rounded-xl` |
| Sem imagem | `flex flex-col items-center text-center`      |

---

## Stories

- [ ] `Default` — gradient promo
- [ ] `WithImage` — split
- [ ] `AllIntents`

---

## Checklist

- [x] `rounded-2xl` token, `gap-4` layout
