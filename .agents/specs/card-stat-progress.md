# Spec: CardStatProgress

> Cartão de progresso com barra, valor atual vs goal, percentual e código de cores por faixa.

**Arquivo:** `components/custom/card-stat-progress.tsx`
**data-slot:** `card-stat-progress` (ainda não aplicado nos elementos `Card` do componente)

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `goal` | `number` | — | ✓ |
| `size` | `CardStatSize` | `"md"` | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `showPercent` | `boolean` | `true` | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`.

---

## CVA variants locais

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatTrackHVariants` | `h-2` | `h-3` | `h-4` |

Compartilhadas: `cardStatLabelVariants`, `cardStatValueVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`, `cardStatContentGapVariants`.

---

## Código de cores

| Faixa | Cor do texto | Cor da barra |
|-------|-------------|--------------|
| `>= 100%` | `text-success` | `bg-success` |
| `>= 75%` | `text-highlight-sky` | `bg-highlight-sky` |
| `>= 50%` | `text-warning` | `bg-warning` |
| `< 50%` | `text-muted-foreground` | (default) |

## Stories

- [x] Default — com e sem goal
- [x] AllSizes
- [x] AllGoals
- [x] Loading
- [x] Empty
