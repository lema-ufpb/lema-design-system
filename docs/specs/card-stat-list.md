# Spec: CardStatList

> Cartão com lista de métricas (label + valor + tendência opcional) em formato de linhas.

**Arquivo:** `components/ds/card-stat-list.tsx`
**data-slot:** `card-stat-list`

---

## Props

| Prop        | Tipo                 | Padrão  | Obrigatória |
| ----------- | -------------------- | ------- | ----------- |
| `label`     | `string`             | —       | ✓           |
| `items`     | `CardStatListItem[]` | —       | ✓           |
| `size`      | `CardStatSize`       | `"md"`  |             |
| `icon`      | `React.ElementType`  | —       |             |
| `className` | `string`             | —       |             |
| `loading`   | `boolean`            | `false` |             |
| `empty`     | `boolean`            | `false` |             |
| `locale`    | `UILocale`           | —       |             |

`CardStatListItem`: `{ label, value, trend?, trendValue?, format?, decimals?, locale?, currency?, valueFormatter? }`

Quando `locale` é fornecido, as mensagens de empty state usam `UI_I18N[locale].cardStatList.*`.

---

## CVA variants locais

| Variant                         | sm                                   | md                                   | lg                                     |
| ------------------------------- | ------------------------------------ | ------------------------------------ | -------------------------------------- |
| `cardStatListRowPyVariants`     | `py-2`                               | `py-2.5`                             | `py-3`                                 |
| `cardStatListTextVariants`      | `text-xs font-medium`                | `text-sm font-medium`                | `text-base font-medium`                |
| `cardStatListValueVariants`     | `text-xs font-semibold tabular-nums` | `text-sm font-semibold tabular-nums` | `text-base font-semibold tabular-nums` |
| `cardStatListBadgeIconVariants` | `size-2.5`                           | `size-3`                             | `size-3.5`                             |

Compartilhadas: `cardStatLabelVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`.

---

## Comportamento

- Divisores: `border-t border-border/50` entre itens
- Hover: `hover:bg-muted/40` nos itens
- Tendência: ícone + trendValue inline com cor por direção

## Acessibilidade

| Requisito       | Implementação                                     |
| --------------- | ------------------------------------------------- |
| Lista semântica | `<ul>` / `<li>` com itens de lista                |
| Trend icons     | `aria-hidden` nos ícones de tendência             |
| i18n            | `UI_I18N[locale].cardStatList.*` para empty state |

## Stories

- [x] Default — múltiplos itens
- [x] AllSizes
- [x] TopChannels
- [x] Loading
- [x] Empty
