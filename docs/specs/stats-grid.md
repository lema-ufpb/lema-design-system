# Spec: StatsGrid

> Grid de métricas 2-4 cols — blockus stats #01-#12.

---

## Propósito

Grade `grid md:2 lg:4 gap-4` de `Stats`.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/stats-grid.tsx`           |
| Tipo       | `registry:block` (name: `ds-stats-grid`) |
| Categoria  | Stats                                    |
| Depende de | `Stats`                                  |

---

## API — Props

| Prop      | Tipo          | Padrão    | Descrição |
| --------- | ------------- | --------- | --------- |
| `items`   | `Stat[]`      | ✓         |           |
| `columns` | `2 \| 3 \| 4` | `4`       |           |
| `locale`  | `UILocale`    | `"en-US"` |           |

---

## Stories

- [ ] `Default` — 4 itens
- [ ] `ThreeCols`
- [ ] `Loading`

---

## Checklist

- [x] `gap-4` grid
