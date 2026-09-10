# Spec: TestimonialCard

> Card depoimento com quote, avatar, nome, cargo e rating — átomo base Testimonials blockus.

---

## Propósito

Reuso em grid e carousel.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/testimonial-card.tsx`        |
| Tipo       | `registry:ui` (name: `ds-testimonial-card`) |
| Categoria  | Testimonials                                |
| Depende de | `Card`, `Avatar`, `Skeleton`                |

---

## API — Props

| Prop      | Tipo                       | Padrão    | Descrição                   |
| --------- | -------------------------- | --------- | --------------------------- |
| `quote`   | `string`                   | ✓         | `text-sm leading-relaxed`   |
| `author`  | `{name, avatarUrl, role?}` | ✓         |                             |
| `rating`  | `number`                   | —         | 0-5 `StarIcon fill-warning` |
| `locale`  | `UILocale`                 | `"en-US"` |                             |
| `loading` | `boolean`                  | `false`   |                             |

---

## Tokens

| Token                           | Slot                         |
| ------------------------------- | ---------------------------- |
| `bg-card border`                | card `rounded-2xl p-6 gap-4` |
| `text-foreground`               | quote `text-sm`              |
| `text-muted-foreground text-xs` | role                         |

---

## Stories

- [ ] `Default`
- [ ] `WithRating`
- [ ] `Loading`

---

## Checklist

- [x] `AvatarFallback`
