# Spec: HeaderCentered

> Logo centralizado, nav abaixo ou split sides.

---

## Propósito

E-commerce / editorial com brand centered blockus #05 #15 #18.

---

## Localização

| Campo      | Valor                                                                       |
| ---------- | --------------------------------------------------------------------------- |
| Arquivo    | `components/ds/header-centered.tsx`                                         |
| Tipo       | `registry:ui` (name: `ds-header-centered`)                                  |
| Categoria  | Navigation                                                                  |
| Depende de | `Header`, `HeaderBrand`, `HeaderNav`, `HeaderActions`, `HeaderMobileDrawer` |

---

## API — Props

| Prop           | Tipo                   | Padrão    | Descrição         |
| -------------- | ---------------------- | --------- | ----------------- |
| `brand`        | `HeaderBrandProps`     | ✓         |                   |
| `navItems`     | `HeaderNavItem[]`      | —         |                   |
| `leftActions`  | `HeaderActionItem[]`   | —         | Esquerda do brand |
| `rightActions` | `HeaderActionItem[]`   | —         | Direita do brand  |
| `size`         | `"sm" \| "md" \| "lg"` | `"md"`    |                   |
| `locale`       | `UILocale`             | `"en-US"` |                   |
| `loading`      | `boolean`              | `false`   |                   |

---

## Comportamentos

| Estado  | Comportamento                                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Desktop | `grid-cols-3`: leftActions `justify-start`, brand `justify-center`, rightActions `justify-end`; nav secundário `border-t` centered |
| Mobile  | brand centralizado, nav em drawer, actions em icons                                                                                |

---

## Stories

- [ ] `Default` — brand center + nav below
- [ ] `WithSplitActions`
- [ ] `Loading`

---

## Checklist

- [x] `justify-center/justify-between` gap
- [x] `truncate` brand
