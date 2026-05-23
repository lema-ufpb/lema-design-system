# Spec: GeoMapChart

---

## Propósito

_Mapa coroplético interativo baseado em react-simple-maps (D3). Suporta GeoJSON como objeto ou URL, projeções D3 configuráveis, zoom/pan, marcadores, color range para choropleth, seleção de features com stroke destacado, tooltip por feature/marker, e legenda de gradiente com overlay interativo (hover para inspecionar valor)._

**Usar quando:** Visualizar dados geoespaciais — mapas de calor por região, indicadores por estado/país, localização de pontos de interesse.  
**Não usar quando:** Dados não-geográficos (usar HeatmapChart ou BarChart), mapa sem polígonos (usar ScatterChart para coordenadas).  
**Alternativa se não se aplicar:** BarChart para ranking por região, HeatmapChart para matriz.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/geomap-chart.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn/ui), `react-simple-maps` (ComposableMap, Geographies, Geography, Marker, ZoomableGroup), `@/components/ui/tooltip` (shadcn Tooltip, TooltipTrigger, TooltipContent, TooltipProvider), `geojson` (types), `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `geoData` | `FeatureCollection \| string` | — | ✓ | GeoJSON ou URL |
| `featureIdProperty` | `string` | — | | Propriedade do feature usada como ID |
| `data` | `GeoMapFeature[]` | `[]` | | Valores coropléticos |
| `markers` | `GeoMapMarker[]` | `[]` | | Marcadores no mapa |
| `title` | `string` | — | | Título |
| `subtitle` | `string` | — | | Subtítulo |
| `footer` | `React.ReactNode` | — | | Rodapé |
| `height` | `number` | `400` | | Altura do canvas |
| `projection` | `GeoProjection` | `"geoMercator"` | | Projeção D3 |
| `projectionConfig` | `{ scale?, center?, rotate? }` | — | | Config da projeção |
| `enableZoom` | `boolean` | `false` | | Zoom e pan via scroll/drag |
| `zoomRange` | `[number, number]` | `[1, 8]` | | Range do zoom |
| `colorRange` | `[string, string]` | — | | Cores para choropleth |
| `defaultFill` | `string` | — | | Fill padrão das features |
| `selectedFeatureIds` | `(string \| number)[]` | `[]` | | IDs selecionados |
| `selectedStroke` | `string` | — | | Stroke das features selecionadas |
| `showTooltip` | `boolean` | `true` | | Tooltip ao hover |
| `showLegend` | `boolean` | — | | Exibe legenda (default: true se colorRange) |
| `legendPosition` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "bottom"` | `"bottom-right"` | | Posição da legenda |
| `legendLabel` | `string` | — | | Rótulo da escala |
| `legendOrientation` | `"horizontal" \| "vertical"` | `"horizontal"` | | Orientação da legenda |
| `onFeatureClick` | `(feature, originalId) => void` | — | | Callback clique em feature |
| `onMarkerClick` | `(marker) => void` | — | | Callback clique em marcador |
| `valueFormatter` | `(value: number) => string` | — | | Formata valores |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `className` | `string` | — | | Classes extras |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| — | — | — |

**Slots do componente:**

- `chartWrapperVariants` — wrapper externo (`flex w-full flex-col`)
- `chartHeaderVariants` — container título/subtítulo (`flex flex-col px-1 pb-4`)
- `chartTitleVariants` — título (`text-sm leading-tight font-semibold text-foreground`)
- `chartSubtitleVariants` — subtítulo (`mt-0.5 text-xs text-muted-foreground`)
- `chartFooterVariants` — rodapé (`mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground`)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-foreground` | título, tooltip name, legend label, marker text |
| `text-muted-foreground` | subtítulo, tooltip value, legend values, footer, empty state |
| `bg-muted` | skeleton content, defaultFill |
| `bg-card` | tooltip background, legend card background |
| `bg-card/90` | legend overlay background |
| `border-border` | footer divider, legend border, tooltip border |
| `var(--muted)` | default fill fallback |
| `var(--background)` | feature stroke |
| `var(--primary)` | selected feature stroke, hover feature stroke |
| `var(--chart-1)` | default marker fill |
| `var(--muted-foreground)` | skeleton blobs |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | — | `text-sm leading-tight font-semibold` | — |
| Subtítulo | — | `text-xs` | — |
| Tooltip name | — | `text-xs font-semibold` | — |
| Tooltip value | — | `text-xs` | — |
| Legend label | — | `text-xs font-medium` | — |
| Legend values | — | `text-xs` | — |
| Marker label | — | `fontSize: 10` (SVG) | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<GeoMapChartSkeleton>` com continent blobs via SVG ellipses. |
| `geoData` como string | react-simple-maps fetches internamente. |
| Choropleth | `colorRange` interpolado via `interpolateColor()` (hex → rgb). |
| `selectedFeatureIds` | Features destacadas com `selectedStroke` (default: `var(--primary)`) e strokeWidth 1.5. |
| Hover na feature | Tooltip posicionado (se showTooltip), stroke muda para primary, opacity 0.85. |
| Marker label | Texto acima do círculo via SVG `<text>`. |
| Zoom | `ZoomableGroup` com min/max zoom configurável. |
| Legenda overlay | Posicionada absolute dentro do container do mapa. Vertical: estica altura (`inset-y-2`). Horizontal: anchored to corner. |
| Legenda gradient | Hover interativo com shadcn Tooltip mostrando o valor na posição do mouse. |
| Feature ID resolution | `resolveFeatureId()`: top-level id → featureIdProperty → properties.id → properties.ID. |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com attributes spread |
| Tooltip | Posicionado por coordenada do mouse |
| Legend gradient | `TooltipTrigger` asChild no gradiente, `TooltipContent` com valor |
| i18n | Não usa UI_I18N (sem strings fixas) |

---

## Stories obrigatórias no Storybook

- [ ] `WorldMap` — mapa mundial com dados coropléticos
- [ ] `BrazilStates` — estados brasileiros com featureIdProperty="sigla"
- [ ] `WithMarkers` — marcadores em capitais
- [ ] `WithZoom` — zoom habilitado
- [ ] `CustomProjection` — geoEqualEarth
- [ ] `SelectedFeatures` — features destacadas
- [ ] `VerticalLegend` — legenda overlay vertical
- [ ] `BottomLegend` — legenda abaixo do mapa
- [ ] `Loading` — `loading={true}`
- [ ] `Empty` — sem dados

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N` se houver strings fixas
