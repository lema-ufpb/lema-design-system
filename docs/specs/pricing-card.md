# Spec: PricingCard

> Card de plano com preço, período, badge popular, features e CTA — átomo base pricing blockus #01-#26.

---

## Propósito

Card reuso em grid 3 e tabela comparativa.

**Usar quando:** Exibir plano (Free/Pro/Enterprise).

---

## Localização

| Campo      | Valor                                                |
| ---------- | ---------------------------------------------------- |
| Arquivo    | `components/ds/pricing-card.tsx`                     |
| Tipo       | `registry:ui` (name: `ds-pricing-card`)              |
| Categoria  | Pricing                                              |
| Depende de | `Card`, `Badge`, `Button`, `UI_I18N`, `format-utils` |

---

## API — Props

| Prop            | Tipo                              | Padrão    | Descrição                                    |
| --------------- | --------------------------------- | --------- | -------------------------------------------- |
| `name`          | `string`                          | ✓         | Nome plano                                   |
| `description`   | `string`                          | —         | `text-sm text-muted-foreground`              |
| `price`         | `number`                          | ✓         | Valor                                        |
| `originalPrice` | `number`                          | —         | Riscado                                      |
| `period`        | `"month" \| "year" \| "lifetime"` | `"month"` | Sufixo                                       |
| `currency`      | `string`                          | `"R$"`    | Símbolo                                      |
| `badge`         | `string`                          | —         | `Most popular`                               |
| `featured`      | `boolean`                         | `false`   | `ring-1 ring-primary shadow-lg scale-[1.02]` |
| `features`      | `{label,included,tooltip?}[]`     | —         | Lista `Check/X`                              |
| `action`        | `{label, href, onClick}`          | —         | CTA                                          |
| `locale`        | `UILocale`                        | `"en-US"` | Formatação `Intl.NumberFormat`               |
| `size`          | `"sm" \| "md"`                    | `"md"`    |                                              |
| `loading`       | `boolean`                         | `false`   | Skeleton                                     |

---

## Variantes CVA

| Dimensão   | Valores                                                               | Padrão  |
| ---------- | --------------------------------------------------------------------- | ------- |
| `featured` | `true` `bg-card border-primary/20 shadow-xl`, `false` `border-border` | `false` |
| `size`     | `sm` `p-4`, `md` `p-6`                                                | `md`    |

Slots: `pricingCardVariants` `rounded-3xl border p-6 flex flex-col gap-6`, `pricingPriceVariants` `text-3xl font-bold tabular-nums`.

---

## Tokens

| Token                                             | Slot                |
| ------------------------------------------------- | ------------------- |
| `bg-card border-border`                           | default             |
| `border-primary/20`                               | featured            |
| `text-foreground font-bold text-3xl tabular-nums` | price               |
| `text-muted-foreground text-sm`                   | description, period |
| `bg-primary text-primary-foreground`              | badge popular       |
| `text-success` / `text-muted-foreground`          | Check / X           |

---

## Comportamentos

| Estado          | Comportamento                                      |
| --------------- | -------------------------------------------------- |
| `loading`       | `Skeleton h-6 w-20 + h-8 w-24 + 4x h-3`            |
| `originalPrice` | `line-through text-muted-foreground text-sm`       |
| `featured`      | `Badge Most popular` `Button default` vs `outline` |

---

## Acessibilidade

| Requisito | Implementação                   |
| --------- | ------------------------------- |
| Preço     | `aria-label` `price period`     |
| Lista     | `ul li` `CheckIcon aria-hidden` |

---

## Stories

- [ ] `Default` — price + features + CTA
- [ ] `Featured` — badge + scale
- [ ] `WithOriginalPrice` — riscado
- [ ] `Loading`

---

## Checklist

- [x] `tabular-nums` price, `truncate` name
