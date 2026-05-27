# Spec: CardStatHeatbar

> Cartão com barra de calor segmentada por zonas de risco, com tooltip interativo e marcador de posição.

**Arquivo:** `components/custom/card-stat-heatbar.tsx`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `size` | `CardStatSize` | `"md"` | |
| `min` | `number` | `0` | |
| `max` | `number` | `100` | |
| `zones` | `CardStatHeatbarZone[]` | DEFAULT_HEATBAR_ZONES | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`.

`CardStatHeatbarZone`: `{ label: string, color: string, max: number }`

---

## CVA variants locais

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatTrackHVariants` | `h-2` | `h-3` | `h-4` |

Compartilhadas: `cardStatLabelVariants`, `cardStatValueVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`, `cardStatContentGapVariants`, `cardStatBadgePaddingVariants`.

---

## Comportamento

- Barra segmentada por zonas (largura proporcional ao range de cada zona)
- Marcador triangular SVG na posição do percentual atual
- Tooltip com valor + nome da zona ativa
- Labels das zonas abaixo da barra
- Posição do marcador: sm=6px, md=10px, lg=12px (inline)

## Stories

- [x] Default — diferentes valores com tooltip
- [x] AllSizes
- [x] AllHeatbars
- [x] Loading
- [x] Empty
