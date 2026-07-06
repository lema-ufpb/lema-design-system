# Spec: CardStatHeatbar

> Cartão com barra de calor segmentada por zonas de risco, com tooltip interativo e marcador de posição.

**Arquivo:** `components/ds/card-stat-heatbar.tsx`
**data-slot:** `card-stat-heatbar`

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
| `locale` | `UILocale` | — | |

Estende \`FormatOptions\`.

`CardStatHeatbarZone`: `{ label: string, color: string, max: number }`

Quando `locale` é fornecido, os labels das zonas e o badge "Pending" do empty state usam `UI_I18N[locale].cardStatGauge.*`.

---

## CVA variants locais

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatTrackHVariants` | `h-2` | `h-3` | `h-4` |
| `cardStatMarkerTopVariants` | `top-1.5` | `top-2.5` | `top-3` |

Compartilhadas: `cardStatLabelVariants`, `cardStatValueVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`, `cardStatContentGapVariants`, `cardStatBadgePaddingVariants`.

---

## Comportamento

- Barra segmentada por zonas (largura proporcional ao range de cada zona)
- Marcador triangular SVG na posição do percentual atual
- Tooltip com valor + nome da zona ativa
- Labels das zonas abaixo da barra
- Posição do marcador: sm=6px, md=10px, lg=12px (inline)

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Progress bar | `role="progressbar"` com `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e `aria-label={label}` |
| SVG decorativo | `aria-hidden` nos SVGs decorativos |
| Tooltip | Navegação por hover via `Tooltip` shadcn |
| i18n | `UI_I18N[locale].cardStatGauge.*` para labels de zona e empty state |

## Stories

- [x] Default — diferentes valores com tooltip
- [x] AllSizes
- [x] AllHeatbars
- [x] Loading
- [x] Empty
