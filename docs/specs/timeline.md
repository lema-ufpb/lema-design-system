# Spec: Timeline

> Timeline vertical com data, título, descrição e dot — blockus Timeline #01-#12.

---

## Propósito

Linha do tempo com `border-l` conector.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/timeline.tsx`        |
| Tipo       | `registry:ui` (name: `ds-timeline`) |
| Categoria  | Timeline                            |
| Depende de | `Badge`, `Skeleton`                 |

---

## API — Props

| Prop      | Tipo                                  | Padrão    | Descrição |
| --------- | ------------------------------------- | --------- | --------- |
| `items`   | `{date, title, description, icon?}[]` | ✓         |           |
| `locale`  | `UILocale`                            | `"en-US"` |           |
| `loading` | `boolean`                             | `false`   |           |

---

## Tokens

| Token                                 | Slot                  |
| ------------------------------------- | --------------------- |
| `border`                              | line `w-px bg-border` |
| `bg-primary`                          | dot `size-2.5`        |
| `text-foreground font-medium text-sm` | title                 |
| `text-muted-foreground text-xs`       | date `tabular-nums`   |

---

## Stories

- [ ] `Default` — 4 itens
- [ ] `Loading`

---

## Checklist

- [x] `gap-6` flex, `border-l`
