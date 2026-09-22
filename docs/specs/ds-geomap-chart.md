# Spec: GeoMapChart

---

## Propósito

_Mapa coroplético interativo baseado em react-simple-maps (D3). Suporta GeoJSON como objeto ou URL, projeções D3 configuráveis, zoom/pan (com botões de zoom opcionais), expansão em tela cheia opcional, marcadores, color range para choropleth, seleção de features com stroke destacado, tooltip por feature/marker, e legenda de gradiente com overlay interativo (hover para inspecionar valor)._

**Usar quando:** Visualizar dados geoespaciais — mapas de calor por região, indicadores por estado/país, localização de pontos de interesse.
**Não usar quando:** Dados não-geográficos (usar HeatmapChart ou BarChart), mapa sem polígonos (usar ScatterChart para coordenadas).
**Alternativa se não se aplicar:** BarChart para ranking por região, HeatmapChart para matriz.

---

## Localização

| Campo      | Valor                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/geomap-chart.tsx`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| data-slot  | `geomap-chart`                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Tipo       | `registry:component`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Categoria  | `Data Display`                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Depende de | `Skeleton` (shadcn/ui), `react-simple-maps` (ComposableMap, Geographies, Geography, Marker, ZoomableGroup), `@/components/ui/tooltip` (shadcn Tooltip, TooltipTrigger, TooltipContent, TooltipProvider), `@/components/ui/button` (botões de zoom/expandir), `@/components/ui/dialog` (modo expandido), `lucide-react` (Plus, Minus, RotateCcw, Maximize2, Minimize2), `@/lib/ui-i18n` (rótulos dos botões), `geojson` (types), `class-variance-authority` |

---

## API — Props

| Prop                 | Tipo                                                                       | Padrão           | Obrigatória | Descrição                                                                    |
| -------------------- | -------------------------------------------------------------------------- | ---------------- | ----------- | ---------------------------------------------------------------------------- |
| `geoData`            | `FeatureCollection \| string`                                              | —                | ✓           | GeoJSON ou URL                                                               |
| `featureIdProperty`  | `string`                                                                   | —                |             | Propriedade do feature usada como ID                                         |
| `data`               | `GeoMapFeature[]`                                                          | `[]`             |             | Valores coropléticos                                                         |
| `markers`            | `GeoMapMarker[]`                                                           | `[]`             |             | Marcadores no mapa                                                           |
| `title`              | `string`                                                                   | —                |             | Título                                                                       |
| `subtitle`           | `string`                                                                   | —                |             | Subtítulo                                                                    |
| `footer`             | `React.ReactNode`                                                          | —                |             | Rodapé                                                                       |
| `height`             | `number \| string`                                                         | `400`            |             | Altura do canvas (number = px; string = CSS)                                 |
| `projection`         | `GeoProjection`                                                            | `"geoMercator"`  |             | Projeção D3                                                                  |
| `projectionConfig`   | `{ scale?, center?, rotate? }`                                             | —                |             | Config da projeção                                                           |
| `enableZoom`         | `boolean`                                                                  | `false`          |             | Zoom e pan via scroll/drag                                                   |
| `zoomRange`          | `[number, number]`                                                         | `[1, 8]`         |             | Range do zoom                                                                |
| `showZoomControls`   | `boolean`                                                                  | `false`          |             | Botões + / − / reset na borda direita; implica zoom e pan                    |
| `expandable`         | `boolean`                                                                  | `false`          |             | Botão expandir (canto superior direito) que abre o mapa em Dialog tela cheia |
| `onExpandedChange`   | `(expanded: boolean) => void`                                              | —                |             | Chamado ao abrir/fechar o Dialog (`expandable`)                              |
| `colorRange`         | `[string, string]`                                                         | —                |             | Cores para choropleth                                                        |
| `defaultFill`        | `string`                                                                   | —                |             | Fill padrão das features                                                     |
| `selectedFeatureIds` | `(string \| number)[]`                                                     | `[]`             |             | IDs selecionados                                                             |
| `selectedStroke`     | `string`                                                                   | —                |             | Stroke das features selecionadas                                             |
| `showTooltip`        | `boolean`                                                                  | `true`           |             | Tooltip ao hover                                                             |
| `showLegend`         | `boolean`                                                                  | —                |             | Exibe legenda (default: true se colorRange)                                  |
| `legendPosition`     | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "bottom"` | `"bottom-right"` |             | Posição da legenda                                                           |
| `legendLabel`        | `string`                                                                   | —                |             | Rótulo da escala                                                             |
| `legendOrientation`  | `"horizontal" \| "vertical"`                                               | `"horizontal"`   |             | Orientação da legenda                                                        |
| `onFeatureClick`     | `(feature, originalId) => void`                                            | —                |             | Callback clique em feature                                                   |
| `onMarkerClick`      | `(marker) => void`                                                         | —                |             | Callback clique em marcador                                                  |
| `valueFormatter`     | `(value: number) => string`                                                | —                |             | Formata valores (fallback se `format` não suprir)                            |
| `format`             | `FormatPreset`                                                             | —                |             | Preset de formatação                                                         |
| `decimals`           | `number`                                                                   | —                |             | Casas decimais                                                               |
| `currency`           | `string`                                                                   | `"USD"`          |             | Código da moeda                                                              |
| `abbreviate`         | `boolean`                                                                  | `false`          |             | Abreviação locale-aware                                                      |
| `locale`             | `UILocale`                                                                 | `"en-US"`        |             | Locale para formatação numérica                                              |
| `loading`            | `boolean`                                                                  | `false`          |             | Estado de carregamento                                                       |
| `className`          | `string`                                                                   | —                |             | Classes extras                                                               |

> Estende `React.HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
| -------- | ------- | ------ |
| —        | —       | —      |

**Slots do componente:**

- `chartWrapperVariants` — wrapper externo (`flex w-full flex-col`)
- `chartHeaderVariants` — container título/subtítulo (`flex flex-col px-1 pb-4`)
- `chartTitleVariants` — título (`text-sm leading-tight font-semibold text-foreground`)
- `chartSubtitleVariants` — subtítulo (`mt-0.5 text-xs text-muted-foreground`)
- `chartFooterVariants` — rodapé (`mt-4 flex items-center gap-2 border-t border-border px-1 pt-3 text-xs text-muted-foreground`)

---

## Tokens de design utilizados

| Token                     | Slot onde é usado                                            |
| ------------------------- | ------------------------------------------------------------ |
| `text-foreground`         | título, tooltip name, legend label, marker text              |
| `text-muted-foreground`   | subtítulo, tooltip value, legend values, footer, empty state |
| `bg-muted`                | skeleton content, defaultFill                                |
| `bg-card`                 | tooltip background, legend card background                   |
| `bg-card/90`              | legend overlay background                                    |
| `border-border`           | footer divider, legend border, tooltip border                |
| `var(--muted)`            | default fill fallback                                        |
| `var(--background)`       | feature stroke                                               |
| `var(--primary)`          | selected feature stroke, hover feature stroke                |
| `var(--chart-1)`          | default marker fill                                          |
| `bg-card/90`              | botões de zoom e expandir (via `Button variant="outline"`)   |
| `var(--muted-foreground)` | skeleton blobs                                               |

---

## Escala tipográfica e de tamanho

| Slot          | sm  | md                                    | lg  |
| ------------- | --- | ------------------------------------- | --- |
| Título        | —   | `text-sm leading-tight font-semibold` | —   |
| Subtítulo     | —   | `text-xs`                             | —   |
| Tooltip name  | —   | `text-xs font-semibold`               | —   |
| Tooltip value | —   | `text-xs`                             | —   |
| Legend label  | —   | `text-xs font-medium`                 | —   |
| Legend values | —   | `text-xs`                             | —   |
| Marker label  | —   | `fontSize: 10` (SVG)                  | —   |

---

## Comportamentos e estados

| Estado                | Comportamento esperado                                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `loading={true}`      | `<GeoMapChartSkeleton>` com continent blobs via SVG ellipses.                                                                                                                                                                                                                              |
| `geoData` como string | react-simple-maps fetches internamente.                                                                                                                                                                                                                                                    |
| Choropleth            | `colorRange` interpolado via `interpolateColor()` (hex → rgb).                                                                                                                                                                                                                             |
| `selectedFeatureIds`  | Features destacadas com `selectedStroke` (default: `var(--primary)`) e strokeWidth 1.5.                                                                                                                                                                                                    |
| Hover na feature      | Tooltip posicionado (se showTooltip), stroke muda para primary, opacity 0.85 (classes `hover:` — `react-simple-maps` v5 não tem `style` por estado). O foco por teclado (`focus-visible:`) usa stroke primary.                                                                             |
| Marker label          | Texto acima do círculo via SVG `<text>`.                                                                                                                                                                                                                                                   |
| Zoom                  | `ZoomableGroup` com min/max zoom configurável.                                                                                                                                                                                                                                             |
| `showZoomControls`    | Zoom controlado (`zoom` + `center` em estado, atualizado por `onMoveEnd`). `+`/`−` multiplicam/dividem por 1,5 dentro de `zoomRange` e desabilitam nos limites; reset volta a `zoom=1` e ao centro da projeção. Borda dos polígonos com `vectorEffect="non-scaling-stroke"`.               |
| Posição dos controles | Botões de zoom na borda direita, centralizados na vertical. Com legenda vertical à direita, vão para a borda esquerda.                                                                                                                                                                     |
| `expandable`          | Botão no canto superior direito abre um `Dialog` (100dvh × 100vw) com uma segunda instância do mapa (mesmos dados, legenda, tooltip e controles; sem título/subtítulo/rodapé). O botão vira "recolher"; Esc também fecha. Clique em feature dispara `onFeatureClick` e não fecha o Dialog. |
| Legenda + expandir    | Legenda em `top-right` se desloca (`right-12`, ou `top-12` na vertical) para liberar o botão de expandir.                                                                                                                                                                                  |
| Legenda overlay       | Posicionada absolute dentro do container do mapa. Vertical: estica altura (`inset-y-2`). Horizontal: anchored to corner.                                                                                                                                                                   |
| Legenda gradient      | Hover interativo com shadcn Tooltip mostrando o valor na posição do mouse.                                                                                                                                                                                                                 |
| Feature ID resolution | `resolveFeatureId()`: top-level id → featureIdProperty → properties.id → properties.ID.                                                                                                                                                                                                    |

---

## Acessibilidade

| Requisito       | Implementação                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico  | `<div>` com attributes spread                                                                                                                        |
| Tooltip         | Posicionado por coordenada do mouse                                                                                                                  |
| Legend gradient | `TooltipTrigger` asChild no gradiente, `TooltipContent` com valor                                                                                    |
| Botões          | `aria-label` + `title` em cada botão; grupo de zoom com `role="group"` e `aria-label`; botão expandir com `aria-haspopup="dialog"` e `aria-expanded` |
| Dialog          | `DialogTitle` e `DialogDescription` `sr-only` (título do mapa ou "Mapa expandido"); foco preso e Esc pelo Radix                                      |
| i18n            | `locale` usado para formatação numérica via `formatChartValue` e para os rótulos dos botões via `UI_I18N.geomapChart` (en-US, pt-BR, es-ES, fr-FR)   |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Choropleth` — Choropleth
- [x] `WithLegend` — With Legend
- [x] `BrazilStates` — Brazil States
- [x] `WithMarkers` — With Markers
- [x] `WithHighlight` — With Highlight
- [x] `UsaStates` — Usa States
- [x] `Loading` — Loading
- [x] `ZoomPan` — Zoom Pan
- [x] `ZoomControls` — Zoom Controls
- [x] `Expandable` — Expandable

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
