# Spec: HeaderMega

> Mega dropdown com grid de links + feature card.

---

## Propósito

E-commerce / docs com sub-navegação rica blockus #04 #06 #10 #20-24.

---

## Localização

| Campo      | Valor                                                                          |
| ---------- | ------------------------------------------------------------------------------ |
| Arquivo    | `components/ds/header-mega.tsx`                                                |
| Tipo       | `registry:ui` (name: `ds-header-mega`)                                         |
| Categoria  | Navigation                                                                     |
| Depende de | `Header`, `HeaderBrand`, `HeaderNav`, `HeaderActions`, `NavigationMenuContent` |

---

## API — Props

| Prop        | Tipo                                                             | Padrão    | Descrição          |
| ----------- | ---------------------------------------------------------------- | --------- | ------------------ |
| `brand`     | `HeaderBrandProps`                                               | ✓         |                    |
| `megaItems` | `HeaderNavItem[]` (com `children` ricos + `description`, `icon`) | ✓         | Itens com filhos   |
| `actions`   | `HeaderActionItem[]`                                             | —         |                    |
| `feature`   | `{title, description, imageSrc, href, ctaLabel}`                 | —         | Card promo no mega |
| `size`      | `"sm" \| "md" \| "lg"`                                           | `"md"`    |                    |
| `locale`    | `UILocale`                                                       | `"en-US"` |                    |

---

## Comportamentos

| Estado             | Comportamento                                                           |
| ------------------ | ----------------------------------------------------------------------- |
| `feature` presente | grid `2 cols` links + `1 col` card `bg-muted rounded-xl p-4` com imagem |
| `description`      | `line-clamp-2 text-xs text-muted-foreground`                            |
| No children        | fallback link simples                                                   |

---

## Acessibilidade

| Requisito      | Implementação                            |
| -------------- | ---------------------------------------- |
| Mega content   | `role="group"` + `NavigationMenuContent` |
| Imagem feature | `alt` descritivo                         |

---

## Stories

- [ ] `Default` — mega com feature
- [ ] `WithoutFeature` — só grid
- [ ] `Loading`

---

## Checklist

- [x] `truncate` label
- [x] `line-clamp-2` description
- [x] Tokens `bg-muted` `text-muted-foreground`
