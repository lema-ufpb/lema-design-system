# Spec: BannerCookie

> Barra consentimento cookies fixed bottom — blockus #09-#12.

---

## Propósito

Fixed bottom card com título, descrição, `Learn more` link e 2-3 ações.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/banner-cookie.tsx`           |
| Tipo       | `registry:block` (name: `ds-banner-cookie`) |
| Categoria  | Navigation                                  |
| Depende de | `Banner` `Button` `UI_I18N.banner.*`        |

---

## API — Props

| Prop            | Tipo                     | Padrão             | Descrição                           |
| --------------- | ------------------------ | ------------------ | ----------------------------------- |
| `title`         | `string`                 | `"We use cookies"` |                                     |
| `description`   | `string`                 | —                  | i18n default                        |
| `onAcceptAll`   | `() => void`             | —                  |                                     |
| `onDecline`     | `() => void`             | —                  |                                     |
| `onManage`      | `() => void`             | —                  |                                     |
| `learnMoreHref` | `string`                 | —                  |                                     |
| `locale`        | `UILocale`               | `"en-US"`          |                                     |
| `position`      | `"bottom" \| "floating"` | `"floating"`       | bottom fixed full ou card flutuante |
| `size`          | `"sm" \| "md" \| "lg"`   | `"md"`             |                                     |

---

## Comportamentos

| Estado  | Comportamento                                                                   |
| ------- | ------------------------------------------------------------------------------- |
| Fixed   | `fixed bottom-0 inset-x-0 z-40` ou `floating` `max-w-4xl rounded-2xl shadow-lg` |
| Dismiss | local dismissed state                                                           |

---

## Acessibilidade

| Requisito | Implementação                                            |
| --------- | -------------------------------------------------------- |
| Role      | `role="dialog" aria-modal="true" aria-label cookieTitle` |

---

## Stories

- [ ] `Default` — accept/decline/manage
- [ ] `Floating` vs `Bottom`
- [ ] `Locales`

---

## Checklist

- [x] `truncate` description, `gap-3` actions
