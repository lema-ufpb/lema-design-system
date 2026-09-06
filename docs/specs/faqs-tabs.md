# Spec: FaqsTabs

> FAQs agrupadas por abas (General/Billing/Support) — blockus #03 #07.

---

## Propósito

Faqs com `Tabs` categorias.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/faqs-tabs.tsx`           |
| Tipo       | `registry:block` (name: `ds-faqs-tabs`) |
| Categoria  | FAQ                                     |
| Depende de | `Faqs`, `Tabs`                          |

---

## API — Props

| Prop     | Tipo                 | Padrão | Descrição |
| -------- | -------------------- | ------ | --------- |
| `groups` | `{id,label,items}[]` | ✓      | Abas      |

Herda `Faqs` sem `items`.

---

## Stories

- [ ] `Default` — 3 abas
- [ ] `Searchable`

---

## Checklist

- [x] `TabsTrigger inside TabsList`
