# Spec: BlogAuthor

> Avatar + nome + role do autor.

---

## Propósito

Reuso em card e featured hero.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/blog-author.tsx` |
| Tipo | `registry:ui` (name: `ds-blog-author`) |
| Categoria | Blog |
| Depende de | `Avatar`, `Skeleton` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `name` | `string` | ✓ |  |
| `avatarUrl` | `string` | — |  |
| `role` | `string` | — | Subtitle |
| `href` | `string` | — | Link perfil |
| `size` | `"sm" \| "md"` | `"md"` | Avatar `size-6/8` |
| `loading` | `boolean` | `false` |  |

---

## Tokens

| Token | Slot |
|---|---|
| `text-foreground text-xs font-medium` | name |
| `text-muted-foreground text-xs` | role |
| `bg-muted` | skeleton |

---

## Stories

- [ ] `Default`
- [ ] `WithRole`
- [ ] `Loading`

---

## Checklist

- [x] `AvatarFallback` obrigatório
