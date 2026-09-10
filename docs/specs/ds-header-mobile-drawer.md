# Spec: HeaderMobileDrawer

> Sheet lateral para navegação mobile com accordion.

---

## Propósito

Substitui nav horizontal em `< lg`. Sheet com trigger hamburger, accordion para children, actions no footer.

---

## Localização

| Campo      | Valor                                                                         |
| ---------- | ----------------------------------------------------------------------------- |
| Arquivo    | `components/ds/header-mobile-drawer.tsx`                                      |
| Tipo       | `registry:ui` (name: `ds-header-mobile-drawer`)                               |
| Categoria  | Navigation                                                                    |
| Depende de | `Sheet`, `Accordion`, `Collapsible`, `Button`, `HeaderBrand`, `HeaderActions` |

---

## API — Props

| Prop           | Tipo                      | Padrão    | Descrição          |
| -------------- | ------------------------- | --------- | ------------------ |
| `items`        | `HeaderNavItem[]`         | ✓         | Navegação          |
| `actions`      | `HeaderActionItem[]`      | —         | CTAs footer        |
| `brand`        | `{title, subtitle, logo}` | —         | Brand header sheet |
| `open`         | `boolean`                 | —         | Controlled         |
| `onOpenChange` | `(open)=>void`            | —         | Handler            |
| `locale`       | `UILocale`                | `"en-US"` | i18n               |
| `side`         | `"left" \| "right"`       | `"right"` | Sheet side         |
| `className`    | `string`                  | —         | Layout             |

---

## Variantes

Sem CVA extra — trigger `Button size icon variant ghost size-8/9` + `size-*` MenuIcon `size-5`.

---

## Tokens

| Token                   | Slot                             |
| ----------------------- | -------------------------------- |
| `bg-popover`            | sheet bg                         |
| `text-foreground`       | item label `text-sm font-medium` |
| `text-muted-foreground` | description `text-xs`            |
| `border`                | separators                       |

---

## Comportamentos

| Estado     | Comportamento                                     |
| ---------- | ------------------------------------------------- |
| Closed     | Trigger `Menu` icon `aria-expanded=false`         |
| Open       | `SheetContent side` + overlay 30%                 |
| `children` | Accordion single collapsible com Chevron rotation |
| `active`   | `bg-muted` + `aria-current=page`                  |

---

## Acessibilidade

| Requisito | Implementação                                                                |
| --------- | ---------------------------------------------------------------------------- |
| Trigger   | `aria-label={UI_I18N.header.openMenu/closeMenu} aria-expanded aria-controls` |
| Sheet     | `SheetTitle sr-only` obrigatório + `SheetDescription`                        |
| Keyboard  | Escape fecha, focus trap Radix, roving focus accordion                       |
| i18n      | open/close strings                                                           |

---

## Stories

- [ ] `Default` — hamburger abre drawer
- [ ] `WithBrandAndActions`
- [ ] `AccordionChildren`
- [ ] `Controlled`

---

## Checklist

- [x] `SheetTitle sr-only`
- [x] `size-*` icon
- [x] `gap-4` layout
- [x] `truncate` labels
