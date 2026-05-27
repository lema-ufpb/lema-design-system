# Spec: CardStatList

> Cartão com lista de métricas (label + valor + tendência opcional) em formato de linhas.

**Arquivo:** `components/custom/card-stat-list.tsx`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `items` | `CardStatListItem[]` | — | ✓ |
| `size` | `CardStatSize` | `"md"` | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

`CardStatListItem`: `{ label, value, trend?, trendValue?, format?, decimals?, locale?, currency?, valueFormatter? }`

---

## CVA variants locais

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatListRowPyVariants` | `py-2` | `py-2.5` | `py-3` |
| `cardStatListTextVariants` | `text-xs` | `text-sm` | `text-base` |
| `cardStatListValueVariants` | `text-xs font-semibold tabular-nums` | `text-sm font-semibold tabular-nums` | `text-base font-semibold tabular-nums` |

Compartilhadas: `cardStatLabelVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`.

---

## Comportamento

- Divisores: `border-t border-border/50` entre itens
- Hover: `hover:bg-muted/40` nos itens
- Tendência: ícone + trendValue inline com cor por direção

## Stories

- [x] Default — múltiplos itens
- [x] AllSizes
- [x] TopChannels
- [x] Loading
- [x] Empty
