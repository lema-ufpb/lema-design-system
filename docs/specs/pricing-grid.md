# Spec: PricingGrid

> Grid 3 cards + toggle mensal/anual — blockus #02 #04 #12.

---

## Propósito

Grade com `ToggleGroup` billing.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/pricing-grid.tsx` |
| Tipo | `registry:block` (name: `ds-pricing-grid`) |
| Categoria | Pricing |
| Depende de | `PricingCard`, `ToggleGroup`, `UI_I18N` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `plans` | `PricingPlan[]` | ✓ | 3 planos |
| `billing` | `"monthly" \| "yearly"` | `"monthly"` | Controlled |
| `onBillingChange` | `(v)=>void` | — |  |
| `locale` | `UILocale` | `"en-US"` |  |
| `loading` | `boolean` | `false` |  |

---

## Stories

- [ ] `Default` — monthly
- [ ] `Yearly` — save badge
- [ ] `Loading`

---

## Checklist

- [x] `ToggleGroup` 2-3 opções, `gap-6` grid
