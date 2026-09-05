# Spec: HeaderBrand

> Identidade visual do header — logo + título + subtítulo.

---

## Propósito

Brand encapsula logo e wordmark com link acessível, tamanhos responsivos e skeleton. Reuso em todos os blocos.

**Usar quando:** Logo/título clicável no header.
**Não usar quando:** Footer wordmark (`FooterWordmark`).

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/header-brand.tsx`        |
| Tipo       | `registry:ui` (name: `ds-header-brand`) |
| Categoria  | Navigation                              |
| Depende de | `Skeleton`, `next/link`                 |

---

## API — Props

| Prop        | Tipo                   | Padrão  | Obrigatória | Descrição             |
| ----------- | ---------------------- | ------- | ----------- | --------------------- |
| `href`      | `string`               | `"/"`   |             | Link destino          |
| `title`     | `string`               | —       | ✓           | Wordmark principal    |
| `subtitle`  | `string`               | —       |             | Linha secundária      |
| `logo`      | `ReactNode`            | —       |             | Node custom (ícone)   |
| `logoSrc`   | `string`               | —       |             | URL imagem (fallback) |
| `logoAlt`   | `string`               | `title` |             | Alt imagem            |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`  |             | Tamanho               |
| `loading`   | `boolean`              | `false` |             | Skeleton              |
| `className` | `string`               | —       |             | Layout                |

Estende `AnchorHTMLAttributes` + `VariantProps`.

---

## Variantes CVA

| Dimensão | Valores                                    | Padrão |
| -------- | ------------------------------------------ | ------ |
| `size`   | `sm` text-sm, `md` text-base, `lg` text-lg | `md`   |

Slots:

- `headerBrandVariants` — anchor wrapper gap-2
- `headerBrandLogoVariants` — logo medallion `size-7/8/9` + `rounded-md bg-primary text-primary-foreground`

---

## Tokens

| Token                                    | Slot                           |
| ---------------------------------------- | ------------------------------ |
| `bg-primary` / `text-primary-foreground` | logo medallion                 |
| `text-foreground`                        | title `font-semibold truncate` |
| `text-muted-foreground`                  | subtitle `text-xs font-normal` |
| `ring`                                   | focus-visible                  |

---

## Escala

| Slot     | sm                        | md                      | lg                        |
| -------- | ------------------------- | ----------------------- | ------------------------- |
| Logo     | `size-7 [&_svg]:size-3.5` | `size-8 [&_svg]:size-4` | `size-9 [&_svg]:size-5`   |
| Title    | `text-sm font-semibold`   | `text-sm font-semibold` | `text-base font-semibold` |
| Subtitle | `text-xs font-normal`     | `text-xs font-normal`   | `text-xs font-normal`     |

---

## Comportamentos

| Estado              | Comportamento                                              |
| ------------------- | ---------------------------------------------------------- |
| `loading`           | `Skeleton` logo size-* + title/subtitle dims matching real |
| `logo` vs `logoSrc` | `logo` ReactNode tem prioridade                            |
| `href` externo      | render `<a>`; interno `<Link>`                             |
| Overflow            | `truncate` title/subtitle                                  |

---

## Acessibilidade

| Requisito | Implementação                       |
| --------- | ----------------------------------- |
| Link      | `aria-label={title}`                |
| Logo      | `aria-hidden` wrapper, `alt` em img |
| Focus     | `focus-visible:ring-2 ring-ring`    |

---

## Stories

- [ ] `Default` — logo + title + subtitle
- [ ] `AllSizes` — sm/md/lg
- [ ] `WithLogoNode` vs `WithLogoSrc`
- [ ] `Loading` — skeleton matching dims
- [ ] `LongTitle` — truncate

---

## Checklist

- [x] Type scale sm text-sm correto (não text-xs+3)
- [x] `size-*` logo
- [x] `truncate` title
- [x] Skeleton dims `size-7/8/9`
