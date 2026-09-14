# Spec: HeaderWithTopbar

> HeaderSimple + Topbar + Announcement stacked.

---

## Propósito

Blockus #11 #12 #16 — barra de contacto/social + anúncio promo.

---

## Localização

| Campo      | Valor                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| Arquivo    | `components/ds/header-with-topbar.tsx`                                 |
| Tipo       | `registry:ui` (name: `ds-header-with-topbar`)                          |
| Categoria  | Navigation                                                             |
| Depende de | `Header`, `HeaderTopbar`, `HeaderAnnouncement`, `HeaderSimple` interno |

---

## API — Props

| Prop           | Tipo                                     | Padrão    | Descrição |
| -------------- | ---------------------------------------- | --------- | --------- |
| `brand`        | `HeaderBrandProps`                       | ✓         |           |
| `navItems`     | `HeaderNavItem[]`                        | —         |           |
| `actions`      | `HeaderActionItem[]`                     | —         |           |
| `topbar`       | `{email, phone, socials, announcement?}` | —         |           |
| `announcement` | `{children, href, tag, onDismiss}`       | —         | Banner    |
| `size`         | `"sm" \| "md" \| "lg"`                   | `"md"`    |           |
| `locale`       | `UILocale`                               | `"en-US"` |           |

---

## Comportamentos

| Estado                     | Comportamento                                    |
| -------------------------- | ------------------------------------------------ |
| `topbar` ausente           | render apenas HeaderSimple                       |
| `announcement.dismissible` | state local dismiss                              |
| Sticky                     | apenas Header principal é sticky, topbar scrolla |

---

## Stories

- [ ] `Default` — topbar + simple
- [ ] `WithAnnouncementDismissible`
- [ ] `WithoutTopbarFallback`

---

## Checklist

- [x] `flex flex-col` sem space-y
- [x] `border-b` apenas onde necessário
