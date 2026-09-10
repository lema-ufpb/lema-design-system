# Spec: PricingComparison

> Tabela comparativa feature × plano — blockus #06.

---

## Propósito

Matriz `S/P/T` com `Check/X` e `━`.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/pricing-comparison.tsx`           |
| Tipo       | `registry:block` (name: `ds-pricing-comparison`) |
| Categoria  | Pricing                                          |
| Depende de | `Table`, `UI_I18N`                               |

---

## API — Props

| Prop       | Tipo                                             | Padrão | Descrição |
| ---------- | ------------------------------------------------ | ------ | --------- |
| `plans`    | `{name, price}[]`                                | ✓      | Cabeçalho |
| `features` | `{category, items:{label, values: boolean[]}}[]` | ✓      | Linhas    |

---

## Stories

- [ ] `Default` — 3 planos
- [ ] `Mobile` — stacked

---

## Checklist

- [x] `h-10` row, `tabular-nums` price
