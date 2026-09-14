# Spec: HeaderCommand

> Header SaaS com command palette (⌘K), search, user menu, notificações.

---

## Propósito

Dashboard / app com busca global blockus #07 #21.

---

## Localização

| Campo      | Valor                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/header-command.tsx`                                                                                        |
| Tipo       | `registry:ui` (name: `ds-header-command`)                                                                                 |
| Categoria  | Navigation                                                                                                                |
| Depende de | `Header`, `HeaderBrand`, `HeaderNav`, `CommandPalette`/`Command`, `HeaderUserMenu`, `Button`, `Kbd`, `NotificationCenter` |

---

## API — Props

| Prop                | Tipo                                            | Padrão    | Descrição       |
| ------------------- | ----------------------------------------------- | --------- | --------------- |
| `brand`             | `HeaderBrandProps`                              | ✓         |                 |
| `navItems`          | `HeaderNavItem[]`                               | —         |                 |
| `onSearch`          | `(q:string)=>void`                              | —         |                 |
| `searchPlaceholder` | `string`                                        | —         |                 |
| `user`              | `User`                                          | —         | HeaderUserMenu  |
| `notifications`     | `number`                                        | —         |                 |
| `commandGroups`     | `{heading, items:{label, icon, onSelect}[] }[]` | —         | Command palette |
| `actions`           | `HeaderActionItem[]`                            | —         | Extra CTAs      |
| `locale`            | `UILocale`                                      | `"en-US"` |                 |

---

## Comportamentos

| Estado                | Comportamento                 |
| --------------------- | ----------------------------- |
| `⌘K` / `Ctrl+K`       | abre `Dialog + Command`       |
| Click lupa            | abre command                  |
| `commandGroups` vazio | empty state `No results` i18n |

---

## Acessibilidade

| Requisito      | Implementação                                                   |
| -------------- | --------------------------------------------------------------- |
| Search trigger | `aria-label={UI_I18N.header.search}` + `kbd` hint `aria-hidden` |
| Command        | `DialogTitle sr-only` + `Command` `aria-label`                  |
| User menu      | `AvatarFallback` + badge `aria-label`                           |

---

## Stories

- [ ] `Default` — nav + search + user + cmdK
- [ ] `WithoutUser`
- [ ] `CommandOpen` — play abre dialog
- [ ] `Loading`

---

## Checklist

- [x] `Kbd` para ⌘K
- [x] `DialogTitle sr-only` no command
- [x] Tokens semânticos
