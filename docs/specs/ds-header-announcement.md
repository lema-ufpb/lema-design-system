# Spec: HeaderAnnouncement

> Faixa de anúncio dismissível acima do header (v1.2 shipped, promo, etc).

---

## Propósito

Banner full-width com texto, link opcional, tag e botão dismiss. Blockus #15.

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/header-announcement.tsx`        |
| Tipo       | `registry:ui` (name: `ds-header-announcement`) |
| Categoria  | Navigation / Feedback                          |
| Depende de | `AnnouncementBadge`, `Button`, `XIcon`         |

---

## API — Props

| Prop          | Tipo                               | Padrão      | Descrição    |
| ------------- | ---------------------------------- | ----------- | ------------ |
| `children`    | `ReactNode`                        | ✓           | Conteúdo     |
| `href`        | `string`                           | —           | Link CTA     |
| `tag`         | `string`                           | —           | Badge tag    |
| `dismissible` | `boolean`                          | `true`      | Mostra X     |
| `onDismiss`   | `()=>void`                         | —           | Handler      |
| `locale`      | `UILocale`                         | `"en-US"`   | i18n dismiss |
| `variant`     | `"default" \| "outline" \| "glow"` | `"default"` | Visual       |
| `className`   | `string`                           | —           | Layout       |

---

## Variantes CVA

| Dimensão  | Valores                                                        | Padrão    |
| --------- | -------------------------------------------------------------- | --------- |
| `variant` | `default` muted/60, `outline` bg-background, `glow` primary/10 | `default` |

Container `flex h-9 items-center justify-center gap-2 border-b px-4 text-xs`.

---

## Tokens

| Token                                 | Slot    |
| ------------------------------------- | ------- |
| `bg-muted/60` / `border-border/60`    | default |
| `bg-primary/10` / `border-primary/30` | glow    |
| `text-primary`                        | tag     |
| `text-muted-foreground`               | text    |

---

## Comportamentos

| Estado             | Comportamento                                                             |
| ------------------ | ------------------------------------------------------------------------- |
| `dismissible` true | X button `size-6` absolute right + `onDismiss` + dismiss interno (hidden) |
| `href`             | envolve conteúdo `<a>`                                                    |
| dismissed          | unmount com state local                                                   |

---

## Acessibilidade

| Requisito | Implementação                                            |
| --------- | -------------------------------------------------------- |
| Region    | `role="region" aria-label={UI_I18N.header.announcement}` |
| Dismiss   | `aria-label={UI_I18N.header.dismissAnnouncement}`        |
| Link      | focus ring                                               |

---

## Stories

- [ ] `Default` — tag + text + arrow
- [ ] `Dismissible` — click X hides
- [ ] `WithLink` — href CTA
- [ ] `GlowVariant`

---

## Checklist

- [x] `truncate` text
- [x] `size-*` X button
- [x] Skeleton não necessário (anúncio é estático)
