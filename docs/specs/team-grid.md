# Spec: TeamGrid

> Grid de equipe com heading e CTA — blockus Team #01-#10.

---

## Propósito

Grade `md:2 lg:3 xl:4 gap-6`.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/team-grid.tsx`           |
| Tipo       | `registry:block` (name: `ds-team-grid`) |
| Categoria  | Team                                    |
| Depende de | `TeamCard`                              |

---

## API — Props

| Prop      | Tipo           | Padrão    | Descrição |
| --------- | -------------- | --------- | --------- |
| `members` | `TeamMember[]` | ✓         |           |
| `title`   | `string`       | i18n      |           |
| `columns` | `3 \| 4`       | `3`       |           |
| `locale`  | `UILocale`     | `"en-US"` |           |

---

## Stories

- [ ] `Default` — 6 membros
- [ ] `FourCols`
- [ ] `Loading`

---

## Checklist

- [x] `gap-6` grid
