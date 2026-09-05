# Spec: BannerTop

> Bloco topo sticky para anúncio/promo com CTA e dismiss — blockus #01-#04.

---

## Propósito

Composição de `Banner` `position="top"` + `AnnouncementBadge` style.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/banner-top.tsx`           |
| Tipo       | `registry:block` (name: `ds-banner-top`) |
| Categoria  | Navigation                               |
| Depende de | `Banner`, `Button`, `Badge`              |

---

## API — Props

| Prop          | Tipo                     | Padrão      | Descrição |
| ------------- | ------------------------ | ----------- | --------- |
| `title`       | `string`                 | —           | Destaque  |
| `description` | `string`                 | —           | Texto     |
| `badge`       | `string`                 | —           | Tag `New` |
| `action`      | `{label, href, onClick}` | —           | CTA       |
| `intent`      | `Banner intent`          | `"default"` |           |
| `dismissible` | `boolean`                | `true`      |           |
| `locale`      | `UILocale`               | `"en-US"`   |           |

---

## Comportamentos

| Estado        | Comportamento                               |
| ------------- | ------------------------------------------- |
| `sticky`      | `sticky top-0 z-30` via Banner position top |
| `dismissible` | local state hide                            |

---

## Stories

- [ ] `Default` — badge + title + CTA
- [ ] `Promo` — intent promo
- [ ] `Dismissible`

---

## Checklist

- [x] Reuso `Banner` sem duplicação
