# Spec: HeaderSimple

> Bloco minimal SaaS — Brand + Nav (desktop) + Search + Actions + MobileDrawer.

---

## Propósito

Cobre blockus #01 #02 #14 #17. Layout mais comum.

**Usar quando:** Marketing site, produto SaaS simples.
**Não usar quando:** Precisa mega-menu ou topbar.

---

## Localização

| Campo      | Valor                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/header-simple.tsx`                                                                              |
| Tipo       | `registry:ui` (name: `ds-header-simple`)                                                                       |
| Categoria  | Navigation                                                                                                     |
| Depende de | `Header`, `HeaderContainer`, `HeaderBrand`, `HeaderNav`, `HeaderActions`, `HeaderMobileDrawer`, `HeaderSearch` |

---

## API — Props

| Prop         | Tipo                   | Padrão      | Descrição                  |
| ------------ | ---------------------- | ----------- | -------------------------- |
| `brand`      | `HeaderBrandProps`     | ✓           | Logo/título                |
| `navItems`   | `HeaderNavItem[]`      | —           | Navegação                  |
| `actions`    | `HeaderActionItem[]`   | —           | CTAs                       |
| `showSearch` | `boolean`              | `false`     | Exibe HeaderSearch toggle  |
| `onSearch`   | `(v:string)=>void`     | —           | Search handler             |
| `size`       | `"sm" \| "md" \| "lg"` | `"md"`      | Repassado a Header         |
| `variant`    | `Header variant`       | `"default"` |                            |
| `sticky`     | `boolean`              | `true`      |                            |
| `locale`     | `UILocale`             | `"en-US"`   |                            |
| `loading`    | `boolean`              | `false`     | Skeleton brand/nav/actions |

---

## Variantes

Herda `Header` variants. Não cria CVA próprio.

---

## Comportamentos

| Estado       | Comportamento                                              |
| ------------ | ---------------------------------------------------------- |
| `loading`    | Brand skeleton + nav skeleton + actions skeleton           |
| `showSearch` | `HeaderSearch` collapsed `w-10` ao lado actions            |
| Mobile `<lg` | Nav escondido `hidden lg:flex`, drawer visível `lg:hidden` |

---

## Acessibilidade

Herda banner + nav + skip link.

---

## Stories

- [ ] `Default`
- [ ] `WithSearch`
- [ ] `AllSizes`
- [ ] `Loading`
- [ ] `LongNavTruncate`

---

## Checklist

- [x] Reuso átomos, sem duplicação
- [x] `gap-*` flex justify-between
- [x] `hidden lg:flex` responsive
