# Spec: Banner

> Faixa full-width dismissível para anúncios, promo, app ou consentimento. Átomo base de todos os banners blockus.

---

## Propósito

Banner provê barra semântica `region` com intent, variante, posição e dismiss. Reuso em top, floating, bottom-fixed e marquee. Blockus banners #01-#20 compartilham mesma base mas variam layout/posição.

**Usar quando:** Comunicar promoção, anúncio, cookie, download de app ou newsletter em faixa destacada.
**Não usar quando:** Feedback inline (`Callout`, `Alert`) ou hero announcement (`AnnouncementBadge`).
**Alternativa:** `Callout` (alert inline), `HeaderAnnouncement` (header strip estreito).

---

## Localização

| Campo      | Valor                                           |
| ---------- | ----------------------------------------------- |
| Arquivo    | `components/ds/banner.tsx`                      |
| Tipo       | `registry:ui` (name: `ds-banner`)               |
| Categoria  | Navigation / Feedback                           |
| Depende de | `Button`, `Skeleton`, `UI_I18N`, `lucide-react` |

---

## API — Props

| Prop              | Tipo                                                                        | Padrão      | Obrigatória | Descrição                                               |
| ----------------- | --------------------------------------------------------------------------- | ----------- | ----------- | ------------------------------------------------------- |
| `intent`          | `"default" \| "info" \| "success" \| "warning" \| "destructive" \| "promo"` | `"default"` |             | Cor semântica                                           |
| `variant`         | `"default" \| "outline" \| "ghost" \| "filled"`                             | `"default"` |             | Tratamento fundo/borda                                  |
| `size`            | `"sm" \| "md" \| "lg"`                                                      | `"md"`      |             | Altura e tipografia                                     |
| `position`        | `"inline" \| "top" \| "bottom" \| "floating"`                               | `"inline"`  |             | Layout: inline, sticky top, fixed bottom, floating card |
| `dismissible`     | `boolean`                                                                   | `true`      |             | Mostra botão X                                          |
| `onDismiss`       | `() => void`                                                                | —           |             | Handler dismiss                                         |
| `icon`            | `ReactNode`                                                                 | —           |             | Ícone leading (override auto por intent)                |
| `title`           | `string`                                                                    | —           |             | Título curto                                            |
| `description`     | `string \| ReactNode`                                                       | —           |             | Texto principal `truncate`                              |
| `action`          | `{ label, href?, onClick?, variant? }`                                      | —           |             | CTA primário                                            |
| `secondaryAction` | `{ label, href?, onClick? }`                                                | —           |             | CTA secundário ghost                                    |
| `locale`          | `UILocale`                                                                  | `"en-US"`   |             | i18n dismiss                                            |
| `loading`         | `boolean`                                                                   | `false`     |             | Skeleton                                                |
| `className`       | `string`                                                                    | —           |             | Layout extra                                            |

Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps`.

---

## Variantes CVA

| Dimensão   | Valores                                                                                                                                                                                                                                 | Padrão    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `intent`   | `default` muted, `info` `bg-highlight-sky/10 border-highlight-sky`, `success` `bg-success/10 border-success/30`, `warning` `bg-warning/10`, `destructive` `bg-destructive/10`, `promo` `bg-gradient-to-r from-primary/15 via-primary/5` | `default` |
| `variant`  | `default` border+borda, `outline` bg-background, `ghost` border-transparent, `filled` bg-intent solid                                                                                                                                   | `default` |
| `size`     | `sm` `min-h-10 text-xs gap-2 px-3`, `md` `min-h-12 text-sm gap-3 px-4`, `lg` `min-h-14 text-sm gap-4 px-6`                                                                                                                              | `md`      |
| `position` | `inline` relative, `top` `sticky top-0 z-30`, `bottom` `fixed bottom-0 z-40`, `floating` `fixed bottom-4 left-1/2 -translate-x-1/2 max-w-3xl rounded-2xl shadow-lg`                                                                     | `inline`  |

Slots: `bannerVariants` (container flex items-center justify-between), `bannerIconVariants`, `bannerTitleVariants`, `bannerActionVariants`.

---

## Tokens de design utilizados

| Token                                                      | Slot                         |
| ---------------------------------------------------------- | ---------------------------- |
| `bg-muted/60` `border-border/60`                           | intent default               |
| `bg-success/10 border-success/30 text-success`             | success                      |
| `bg-warning/10 border-warning/30 text-warning`             | warning                      |
| `bg-destructive/10 border-destructive/30 text-destructive` | destructive                  |
| `bg-highlight-sky/10 text-highlight-sky`                   | info                         |
| `bg-primary text-primary-foreground`                       | promo CTA                    |
| `text-foreground` `text-muted-foreground`                  | title/description `truncate` |
| `ring`                                                     | focus dismiss                |

---

## Escala tipográfica e de tamanho

| Slot        | sm                      | md                      | lg                      |
| ----------- | ----------------------- | ----------------------- | ----------------------- |
| Altura min  | `min-h-10`              | `min-h-12`              | `min-h-14`              |
| Title       | `text-xs font-semibold` | `text-sm font-semibold` | `text-sm font-semibold` |
| Description | `text-xs font-normal`   | `text-sm font-normal`   | `text-sm font-normal`   |
| Icon        | `size-3.5`              | `size-4`                | `size-5`                |
| CTA Button  | `size sm h-7`           | `size sm h-8`           | `size default h-9`      |
| Gap         | `gap-2`                 | `gap-3`                 | `gap-4`                 |

---

## Comportamentos e estados

| Estado                     | Comportamento                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| `loading`                  | 3 `Skeleton` `h-3 w-20` `h-8 w-24` dims matching `size`                                                 |
| `dismissible` true         | `Button ghost size icon size-7 rounded-full` `absolute right-1` + local `dismissed` state + `onDismiss` |
| `action.href`              | `Button asChild <a>`                                                                                    |
| `position bottom/floating` | `fixed` com `inset-x-0` ou centrado                                                                     |
| `icon` null                | auto ícone por `intent`: Info/Success/Warning etc, `aria-hidden`                                        |

---

## Acessibilidade

| Requisito       | Implementação                                            |
| --------------- | -------------------------------------------------------- |
| Role            | `role="region" aria-label={UI_I18N.banner.announcement}` |
| Dismiss         | `aria-label={UI_I18N.banner.dismiss} Button size icon`   |
| Icon decorativo | `aria-hidden="true"`                                     |
| Focus           | `focus-visible:ring-2 ring-ring` em CTAs + dismiss       |
| i18n            | `dismiss`, `announcement`, `promotion` via `UI_I18N`     |

---

## Stories obrigatórias

- [ ] `Default` — default intent inline
- [ ] `AllIntents` — default/info/success/warning/destructive/promo
- [ ] `AllSizes` — sm/md/lg
- [ ] `AllPositions` — inline/top/bottom/floating
- [ ] `Dismissible` — X oculta
- [ ] `WithActions` — primary + secondary
- [ ] `Loading` — skeleton matching
- [ ] `Locales` — pt-BR/en-US

---

## Checklist antes de implementar

- [x] Escala `sm text-xs / md text-sm / lg text-sm` (banner mantém compacto, não sobe para lg base)
- [x] Tokens semânticos apenas
- [x] `defaultVariants` em todo `cva`
- [x] `truncate` title/description
- [x] `size-*` ícones
