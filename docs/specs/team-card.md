# Spec: TeamCard

> Card de membro com avatar, nome, cargo, bio curta e socials — átomo base Team blockus.

---

## Propósito

Reuso em grid 3-4 cols.

**Usar quando:** Listar equipe.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/team-card.tsx` |
| Tipo | `registry:ui` (name: `ds-team-card`) |
| Categoria | Team |
| Depende de | `Avatar`, `Badge`, `Skeleton`, `SocialLinks` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `name` | `string` | ✓ |  |
| `role` | `string` | — | `text-xs text-muted-foreground` |
| `bio` | `string` | — | `line-clamp-2 text-sm` |
| `avatarUrl` | `string` | — |  |
| `socials` | `SocialLinkItem[]` | — |  |
| `size` | `"sm" \| "md"` | `"md"` | Avatar `size-16/20` |
| `locale` | `UILocale` | `"en-US"` |  |
| `loading` | `boolean` | `false` |  |

---

## Tokens

| Token | Slot |
|---|---|
| `bg-card border` | card `rounded-2xl p-5 gap-3` |
| `text-foreground font-medium text-sm` | name |
| `text-muted-foreground text-xs` | role |

---

## Stories

- [ ] `Default` — avatar + role + bio
- [ ] `AllSizes`
- [ ] `Loading`

---

## Checklist

- [x] `AvatarFallback` obrigatório, `size-*` avatar
