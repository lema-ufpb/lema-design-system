# Spec: CardStat

> Cartão de estatística principal com label, valor formatado, ícone, tendência e descrição.

**Arquivo:** `components/custom/card-stat.tsx`

**data-slot:** `card-stat` no `<Card>` root

---

## Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `label` | `string` | — | ✓ | Rótulo do cartão |
| `value` | `string \| number` | — | ✓ | Valor principal |
| `size` | `CardStatSize` | `"md"` | | Tamanho do cartão |
| `variant` | `"default" \| "muted" \| "flat"` | `"default"` | | Estilo visual do cartão |
| `description` | `string` | — | | Descrição/rodapé |
| `trend` | `CardStatTrend \| boolean` | `false` | | Direção da tendência |
| `icon` | `React.ElementType` | — | | Ícone decorativo no header |
| `valueClassName` | `string` | — | | Classes adicionais no valor |
| `className` | `string` | — | | Classes extras |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `empty` | `boolean` | `false` | | Estado vazio |

Estende \`FormatOptions\` (\`format\`, \`decimals\`, \`locale\`, \`currency\`, \`valueFormatter\`).

---

## CVA variants locais

Nenhuma — usa apenas as variantes compartilhadas de `card-stats-shared.tsx`:
- `cardStatLabelVariants`
- `cardStatValueVariants`
- `cardStatDescriptionVariants`
- `cardStatHeaderIconVariants`
- `cardStatContentGapVariants`

---

## Estados

| Estado | Comportamento |
|--------|---------------|
| `loading` | Skeletons para label, headerIcon, value, description |
| `empty` | Label atenuado, "—" no valor, "Nothing to measure yet" |
| Normal | Label + valor formatado + ícone. Trend icon renderizado apenas dentro do bloco `description` — se `description` for omitido, trend não aparece mesmo com `trend` definido |

## Stories

- [x] Default — CardStat padrão com valor formatado
- [x] AllTrends — currency, percent, integer, float
- [x] AllSizes — sm, md, lg
- [x] ValueClassName — valor estilizado com classe semântica (text-success)
- [x] MutedVariant — variante muted (bg-muted shadow-none ring-0)
- [x] FlatVariant — variante flat (bg-background shadow-none ring-0)
- [x] Loading
- [x] Empty
- [x] Locales — pt-BR, de-DE, en-US
