# Spec: CardStats

> Família de cartões de estatística com 9 sub-variantes. Cada variante resolve um caso de uso específico de exibição de métricas.

---

## Propósito

Exibir métricas e indicadores em formato de cartão, com suporte a formatação de valores, tendências, progresso, comparação, sparklines, gauges, heatbars e listas.

**Usar quando:** Necessário exibir dados numéricos com formatação (moeda, percentual, inteiro, float), indicadores de tendência (up/down/neutral), progresso em relação a metas, comparação entre períodos, ou visualizações como gauge/heatbar.

**Não usar quando:** O conteúdo não é uma métrica ou indicador; usar `Card` simples.

**Alternativa se não se aplicar:** `Card` do shadcn com conteúdo customizado.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/card-stats.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Card`, `CardAction`, `CardContent`, `CardHeader` (shadcn/ui/card), `Progress`, `Skeleton`, `Tooltip`, `TooltipContent`, `TooltipProvider` |

---

## API — Props

### CardStat (original)

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `label` | `string` | — | ✓ | Rótulo do cartão |
| `value` | `string \| number` | — | ✓ | Valor principal |
| `format` | `CardStatFormat` | — | | Formato de exibição |
| `decimals` | `number` | — | | Casas decimais |
| `locale` | `string` | — | | Locale para formatação |
| `currency` | `string` | — | | Moeda para formato currency |
| `description` | `string` | — | | Descrição/rodapé |
| `trend` | `CardStatTrend \| boolean` | `false` | | Direção da tendência |
| `icon` | `React.ElementType` | — | | Ícone decorativo |
| `valueFormatter` | `(v: number \| string) => string` | — | | Formatador customizado |
| `className` | `string` | — | | Classes extras |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `empty` | `boolean` | `false` | | Estado vazio |

### CardStatCompact

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `trend` | `CardStatTrend \| boolean` | — | |
| `trendValue` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps` (`format`, `decimals`, `locale`, `currency`, `valueFormatter`).

### CardStatProgress

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `goal` | `number` | — | ✓ |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `showPercent` | `boolean` | `true` | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`.

### CardStatComparison

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `current` | `number` | — | ✓ |
| `previous` | `number` | — | ✓ |
| `currentLabel` | `string` | i18n `thisPeriod` | |
| `previousLabel` | `string` | i18n `lastPeriod` | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`.

### CardStatSparkline

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `data` | `number[]` | `[]` | |
| `trend` | `CardStatTrend \| boolean` | — | |
| `trendValue` | `string` | — | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`.

### CardStatHighlight

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `string \| number` | — | ✓ |
| `variant` | `CardStatHighlightVariant` | `"primary"` | |
| `description` | `string` | — | |
| `trend` | `CardStatTrend \| boolean` | — | |
| `trendValue` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps` + `VariantProps<typeof highlightVariants>`.

### CardStatList

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `items` | `CardStatListItem[]` | — | ✓ |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

`CardStatListItem`: `{ label, value, trend?, trendValue?, format?, decimals?, locale?, currency?, valueFormatter? }`

### CardStatGauge

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `min` | `number` | `0` | |
| `max` | `number` | `100` | |
| `zones` | `CardStatGaugeZone[]` | DEFAULT_GAUGE_ZONES | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`. `CardStatGaugeZone`: `{ label: string, color: string, max: number }`.

### CardStatHeatbar

| Prop | Tipo | Padrão | Obrigatória |
|------|------|--------|-------------|
| `label` | `string` | — | ✓ |
| `value` | `number` | — | ✓ |
| `min` | `number` | `0` | |
| `max` | `number` | `100` | |
| `zones` | `CardStatHeatbarZone[]` | DEFAULT_HEATBAR_ZONES | |
| `description` | `string` | — | |
| `icon` | `React.ElementType` | — | |
| `className` | `string` | — | |
| `loading` | `boolean` | `false` | |
| `empty` | `boolean` | `false` | |

Estende `FmtProps`. `CardStatHeatbarZone`: `{ label: string, color: string, max: number }`.

---

## Variantes CVA

### highlightVariants (apenas CardStatHighlight)

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `variant` | `primary`, `emerald`, `amber`, `rose`, `violet`, `sky` | `primary` |

Slots: sem sub-variantes, apenas `highlightVariants` para o wrapper do cartão. Os outros sub-componentes não usam CVA — usam classes diretas via `cn()`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted` / `bg-muted/50` / `bg-muted/30` | ícone decorativo, badge neutral, fundo de rodapé |
| `text-muted-foreground` | labels, descrições, valores secundários |
| `text-foreground` | valor principal |
| `text-success` / `bg-success/10` | trend up, badge success, pct >= 100% |
| `text-destructive` / `bg-destructive/10` | trend down, badge destructive |
| `bg-muted/60` / `text-muted-foreground/50` | empty state |
| `text-muted-foreground/25` | placeholder "—" em empty state |
| `border-border/50` | divisores entre itens de lista |
| `bg-primary` / `text-primary-foreground` | highlight variant primary |
| `bg-success` / `text-success-foreground` | highlight variant emerald |
| `bg-warning` / `text-warning-foreground` | highlight variant amber |
| `bg-destructive` / `text-white` | highlight variant rose |
| `var(--highlight-violet)` / `var(--highlight-sky)` | highlight variant violet/sky |
| `var(--color-risk-1)` a `var(--color-risk-4)` | zonas gauge/heatbar |
| `var(--highlight-sky)` | pct >= 75% |
| `text-warning` | pct >= 50% |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Label (uppercase) | `text-xs font-semibold tracking-wide` | — | — |
| Valor compact | `text-xl font-semibold tracking-tight` | — | — |
| Valor progress/gauge/heatbar | `text-2xl font-semibold tracking-tight` | — | — |
| Valor highlight | `text-3xl font-semibold tracking-tight` | — | — |
| Ícone decorativo | `size-4` / `size-5` | — | — |
| Trend badge | `text-xs font-semibold` | — | — |
| Card size | `size="sm"` (Card do shadcn) | — | — |

> CardStats não possui variante `size` própria — todos os sub-componentes usam `Card size="sm"` internamente.

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões correspondentes ao conteúdo real de cada sub-variante |
| `empty={true}` | Mensagem "—" para valores, ícones atenuados, textos como "No data", "No goal set yet", "No history yet", "Nothing to measure yet", "List is empty", "No reading" |
| Valor mínimo/máximo (gauge/heatbar) | Clamping via `Math.min(100, Math.max(0, ...))` |
| Progress pct | `Math.min(100, Math.round((value / goal) * 100))` |
| Overflow de texto | `truncate` em labels e valores |
| Divisores em lista | `border-t border-border/50` entre itens, `last:border-b-0` |
| Gauge/Heatbar zones | Encontra zona ativa via `zones.find(z => pct <= z.max)` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<ul>` + `<li>` em CardStatList; demais usam elementos semânticos de Card |
| Valores numéricos | `tabular-nums` em todos os valores |
| Ícones decorativos | `aria-hidden` em todos os ícones |
| SVG decorativos | `aria-hidden` em sparkline, gauge, heatbar SVGs |
| Progress | `Progress` do shadcn (role `progressbar`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`) |
| Tooltip | `Tooltip` do shadcn com `TooltipContent` em heatbar |
| i18n | `UI_I18N[locale].cardStats.*` para strings `thisPeriod`, `lastPeriod`, `noComparison` |

---

## Stories obrigatórias no Storybook

- [x] `CardStatDefault` — CardStat padrão com valor formatado
- [x] `CardStatAllFormats (AllTrends)` — currency, percent, integer, float
- [x] `CardStatAllSizes` — sm, md, lg sizes
- [x] `CardStatAllTrends` — up, down, neutral trends
- [x] `CardStatLoading` — loading em todos os sub-componentes
- [x] `CardStatEmpty` — empty em todos os sub-componentes
- [x] `CardStatLocales` — locale-aware formatting (pt-BR, de-DE, en-US)
- [x] `CardStatCompactDefault`
- [x] `CardStatCompactAllSizes`
- [x] `CardStatCompactAllVariants`
- [x] `CardStatCompactLoading`
- [x] `CardStatCompactEmpty`
- [x] `CardStatProgressDefault` — com e sem goal
- [x] `CardStatProgressAllSizes`
- [x] `CardStatProgressAllGoals`
- [x] `CardStatProgressLoading`
- [x] `CardStatProgressEmpty`
- [x] `CardStatComparisonDefault` — positivo, negativo, neutro
- [x] `CardStatComparisonAllSizes`
- [x] `CardStatComparisonAllComparisons`
- [x] `CardStatComparisonLoading`
- [x] `CardStatComparisonEmpty`
- [x] `CardStatSparklineDefault` — com data, sem data, trend
- [x] `CardStatSparklineAllSizes`
- [x] `CardStatSparklineAllMetrics`
- [x] `CardStatSparklineLoading`
- [x] `CardStatSparklineEmpty`
- [x] `CardStatHighlightDefault`
- [x] `CardStatHighlightAllVariants` — todas as 6 variantes
- [x] `CardStatHighlightAllSizes`
- [x] `CardStatHighlightBannerKPI`
- [x] `CardStatHighlightLoading`
- [x] `CardStatHighlightEmpty`
- [x] `CardStatListDefault` — múltiplos itens
- [x] `CardStatListAllSizes`
- [x] `CardStatListTopChannels`
- [x] `CardStatListLoading`
- [x] `CardStatListEmpty`
- [x] `CardStatGaugeDefault` — diferentes valores nas zonas
- [x] `CardStatGaugeAllSizes`
- [x] `CardStatGaugeAllGauges`
- [x] `CardStatGaugeLoading`
- [x] `CardStatGaugeEmpty`
- [x] `CardStatHeatbarDefault` — diferentes valores com tooltip
- [x] `CardStatHeatbarAllSizes`
- [x] `CardStatHeatbarAllHeatbars`
- [x] `CardStatHeatbarLoading`
- [x] `CardStatHeatbarEmpty`
- [x] `CardStatsDashboard` — dashboard com múltiplos cards

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base` (aplicado nos slots internos)
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] `defaultVariants` declarado em `highlightVariants`
- [x] Todos os `*Variants` são exportados (`highlightVariants`)
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em valores percentuais
- [x] `truncate` em labels
- [x] `aria-label` não necessário (visual label sempre presente)
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas `gap-*` (nunca `space-y-*` / `space-x-*`)
- [x] Prop `locale` integrada via `UI_I18N` para `thisPeriod`, `lastPeriod`, `noComparison`
