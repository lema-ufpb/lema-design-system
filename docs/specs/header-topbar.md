# Spec: HeaderTopbar

> Barra utilitária acima do header principal (contato + social + locale).

---

## Propósito

Replica blockus #11 topbar com email, telefone, socials e seletor de idioma. Borda sutil, altura fixa, escondida em mobile via class.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/header-topbar.tsx`        |
| Tipo       | `registry:ui` (name: `ds-header-topbar`) |
| Categoria  | Navigation                               |
| Depende de | `SocialLinks`, `Separator`, `cn`         |

---

## API — Props

| Prop           | Tipo                  | Padrão    | Descrição              |
| -------------- | --------------------- | --------- | ---------------------- |
| `email`        | `string`              | —         | `mailto:`              |
| `phone`        | `string`              | —         | `tel:`                 |
| `socials`      | `SocialLinkItem[]`    | —         | SocialLinks            |
| `locale`       | `UILocale`            | `"en-US"` | i18n                   |
| `announcement` | `string \| ReactNode` | —         | Texto central opcional |
| `className`    | `string`              | —         | Layout                 |

---

## Variantes

Sem CVA — `flex h-8 items-center justify-between gap-4 border-b bg-muted/30 px-4 text-xs`.

---

## Tokens

| Token                   | Slot                                |
| ----------------------- | ----------------------------------- |
| `bg-muted/30`           | fundo                               |
| `border`                | borda                               |
| `text-muted-foreground` | email/phone `hover:text-foreground` |
| `text-foreground`       | locale trigger                      |

---

## Escala

| Slot        | Valor                         |
| ----------- | ----------------------------- |
| Altura      | `h-8`                         |
| Text        | `text-xs font-medium`         |
| Icon social | `size-3.5` via SocialLinks sm |

---

## Comportamentos

| Estado         | Comportamento                     |
| -------------- | --------------------------------- |
| Sem props      | render null                       |
| `announcement` | centro `truncate hidden md:block` |

---

## Acessibilidade

| Requisito      | Implementação                      |
| -------------- | ---------------------------------- |
| Nav utilitário | `aria-label="Utility navigation"`  |
| Links          | `href="mailto:" tel:` + focus ring |
| Socials        | `SocialLinks` já com `aria-label`  |

---

## Stories

- [ ] `Default` — email + phone + socials
- [ ] `WithAnnouncement`
- [ ] `Empty`

---

## Checklist

- [x] `truncate` email/phone
- [x] `gap-4` flex
- [x] Tokens semânticos
