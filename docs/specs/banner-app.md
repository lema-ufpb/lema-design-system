# Spec: BannerApp

> Download de app com ícone, rating, store badges — blockus #14-#17.

---

## Propósito

Inline ou floating promo de app.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/banner-app.tsx`           |
| Tipo       | `registry:block` (name: `ds-banner-app`) |
| Categoria  | Navigation                               |
| Depende de | `Banner`, `Button`, `AppStoreBadges`     |

---

## API — Props

| Prop            | Tipo         | Padrão    | Descrição |
| --------------- | ------------ | --------- | --------- |
| `appName`       | `string`     | ✓         |           |
| `description`   | `string`     | —         |           |
| `iconSrc`       | `string`     | —         |           |
| `rating`        | `number`     | —         | 0-5       |
| `appStoreUrl`   | `string`     | —         |           |
| `googlePlayUrl` | `string`     | —         |           |
| `onDismiss`     | `() => void` | —         |           |
| `locale`        | `UILocale`   | `"en-US"` |           |

---

## Comportamentos

| Estado    | Comportamento                     |
| --------- | --------------------------------- |
| `iconSrc` | `size-10 rounded-xl object-cover` |
| `rating`  | `★` `text-warning` `tabular-nums` |

---

## Stories

- [ ] `Default` — icon + rating + badges
- [ ] `WithoutRating`
- [ ] `Floating`

---

## Checklist

- [x] `size-*` icon, `tabular-nums` rating
