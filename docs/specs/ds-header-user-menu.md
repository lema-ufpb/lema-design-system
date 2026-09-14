# Spec: HeaderUserMenu

> Avatar + DropdownMenu + Badge de notificação para header.

---

## Propósito

Menu do usuário logado com avatar, nome, email, notificações e ações. Integra `NavUser` pattern mas com trigger compacto de header.

---

## Localização

| Campo      | Valor                                                   |
| ---------- | ------------------------------------------------------- |
| Arquivo    | `components/ds/header-user-menu.tsx`                    |
| Tipo       | `registry:ui` (name: `ds-header-user-menu`)             |
| Categoria  | Navigation                                              |
| Depende de | `Avatar`, `DropdownMenu`, `Badge`, `Button`, `Skeleton` |

---

## API — Props

| Prop            | Tipo                     | Padrão    | Descrição     |
| --------------- | ------------------------ | --------- | ------------- |
| `user`          | `{name,email,avatarUrl}` | ✓         | Dados usuário |
| `groups`        | `UserMenuItem[][]`       | —         | Grupos ações  |
| `notifications` | `number`                 | —         | Badge count   |
| `loading`       | `boolean`                | `false`   | Skeleton      |
| `size`          | `"sm" \| "md" \| "lg"`   | `"md"`    | Avatar size   |
| `locale`        | `UILocale`               | `"en-US"` | i18n          |
| `className`     | `string`                 | —         | Layout        |

---

## Variantes CVA

| Dimensão | Valores                               | Padrão |
| -------- | ------------------------------------- | ------ |
| `size`   | `sm` size-7, `md` size-8, `lg` size-9 | `md`   |

---

## Tokens

| Token              | Slot                     |
| ------------------ | ------------------------ |
| `bg-primary`       | notification badge dot   |
| `text-destructive` | variant destructive item |
| `bg-muted`         | avatar fallback          |

---

## Comportamentos

| Estado             | Comportamento                              |
| ------------------ | ------------------------------------------ |
| `loading`          | Skeleton `size-8 rounded-full + h-3 w-20`  |
| `notifications` >0 | Badge dot absolute + `aria-label`          |
| `user` null        | return null                                |
| `groups`           | `DropdownMenuGroup + Separator + Shortcut` |

---

## Acessibilidade

| Requisito | Implementação                                   |
| --------- | ----------------------------------------------- |
| Avatar    | `AvatarFallback` obrigatório                    |
| Trigger   | `Button variant ghost` + `aria-label` user name |
| Menu      | `DropdownMenu` radix focus                      |
| Badge     | `aria-label={`${count} notifications`}`         |

---

## Stories

- [ ] `Default` — avatar + dropdown
- [ ] `WithNotifications` — badge 3
- [ ] `Loading`
- [ ] `WithoutAvatar` — fallback initials

---

## Checklist

- [x] `AvatarFallback` sempre
- [x] `size-*` avatar
- [x] `truncate` name/email
- [x] Skeleton dims matching
