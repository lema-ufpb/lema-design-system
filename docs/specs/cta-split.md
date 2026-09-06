# Spec: CtaSplit

> CTA split imagem + conteúdo — blockus #09-#16.

---

## Propósito

CTA com mídia lateral `grid md:2 gap-8` imagem `rounded-2xl object-cover h-64 md:h-auto`.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/cta-split.tsx`           |
| Tipo       | `registry:block` (name: `ds-cta-split`) |
| Categoria  | CTA                                     |
| Depende de | `Cta`                                   |

---

## API — Props

| Prop       | Tipo      | Padrão  | Descrição       |
| ---------- | --------- | ------- | --------------- |
| `imageSrc` | `string`  | —       | Cover           |
| `imageAlt` | `string`  | `title` | Alt             |
| `reverse`  | `boolean` | `false` | Inverte colunas |

Herda demais de `Cta` com `align left`.

---

## Stories

- [ ] `Default` — image left
- [ ] `Reverse` — image right
- [ ] `WithoutImage`

---

## Checklist

- [x] `gap-8` grid, `rounded-2xl`
