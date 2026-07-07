# Spec: CardStatGauge

> Cartão com gauge semicircular SVG dividido em zonas de risco/desempenho.

**Arquivo:** `components/ds/card-stat-gauge.tsx`
**data-slot:** `card-stat-gauge`

---

## Props

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `size` | `CardStatSize` | `"md"` | |
| `min` | `number` | `0` | |
| `max` | `number` | `100` | |
| `zones` | `CardStatGaugeZone[]` | DEFAULT_GAUGE_ZONES | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |
| `locale` | `UILocale` | — | |

Estende \`FormatOptions\`.

`CardStatGaugeZone`: `{ label: string, color: string, max: number }`

Zonas padrão: Poor (risk-1, 25%), Fair (risk-2, 50%), Good (risk-3, 75%), Excellent (risk-4, 100%). Quando `locale` é fornecido, os labels das zonas usam `UI_I18N[locale].cardStatGauge.*`.

---

## CVA variants locais

| Variant | sm | md | lg |
|---------|----|----|----|
| `cardStatGaugeMaxWVariants` | `max-w-32` | `max-w-40` | `max-w-48` |
| `cardStatGaugeValueVariants` | `text-2xl font-semibold tracking-tight tabular-nums` | `text-3xl font-semibold tracking-tight tabular-nums` | `text-4xl font-semibold tracking-tight tabular-nums` |

Compartilhadas: `cardStatLabelVariants`, `cardStatDescriptionVariants`, `cardStatHeaderIconVariants`, `cardStatBadgePaddingVariants`.

---

## Comportamento

- Gauge SVG com viewBox 0 0 100 58
- Arco semicircular calculado via trigonometria
- Percentual: `((value - min) / (max - min)) * 100` (clamp 0–100)
- Zona ativa destacada com preenchimento sólido
- Badge com nome da zona ativa
- Estado `empty`: badge "No reading" (ou `UI_I18N[locale].cardStatGauge.noReading` se locale fornecido)

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| SVG decorativo | `aria-hidden` no elemento SVG |
| Badge de zona | `aria-hidden` no badge (informação redundante com visual) |
| i18n | `UI_I18N[locale].cardStatGauge.*` para labels de zona e empty state |

## Stories

- [x] Default — diferentes valores nas zonas
- [x] AllSizes
- [x] AllGauges
- [x] Loading
- [x] Empty
