# Spec: RiskLevelBar

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Barra de risco segmentada com marcador de valor atual, tooltip flutuante e segmentos configuráveis por cor. Usado para visualizar nível de risco (ex: 0–25% baixo, 25–50% médio, etc.) com labels laterais.

**Usar quando:** exibir classificação de risco em escala contínua com segmentos coloridos  
**Não usar quando:** progresso linear simples (usar `ProgressBar`)  
**Alternativa se não se aplicar:** `ProgressBar` com variante de intent

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/risk-level-bar.tsx` |
| data-slot | `risk-level-bar` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton` (shadcn), `format-utils` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `labelLeft` | `string` | — | ✓ | Texto do label esquerdo |
| `labelRight` | `string` | — | ✓ | Texto do label direito |
| `value` | `number` | `0` | | Valor atual (0–1) |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `segments` | `RiskSegment[]` | `DEFAULT_SEGMENTS` | | Configuração dos segmentos |
| `locale` | `UILocale` | `"en-US"` | | Locale para formatação |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | | Tamanho da barra |
| `className` | `string` | — | | Classes extras |

Tipos auxiliares:

```ts
interface RiskSegment {
  color: string      // cor do segmento (ex: "var(--color-risk-1)")
  range: [number, number]  // intervalo [0,0.25)
  textClass?: string // classe para o texto do badge
}
```

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `sm` |
| `side` | `left`, `right` | `left` |
| `isVisible` | `true`, `false` | `false` |

**Slots do componente:**

- `riskLevelContainerVariants` — wrapper externo
- `riskLevelWrapperVariants` — linha de labels (responsive flex)
- `riskLevelLabelVariants` — label esquerdo/direito (side, size)
- `riskLevelValueVariants` — badge do valor percentual (size)
- `riskLevelSubtitleVariants` — label direito secundário (size)
- `riskLevelBarContainerVariants` — track da barra (size)
- `riskLevelSegmentVariants` — segmento colorido
- `riskLevelMarkerVariants` — marcador triangular
- `riskLevelTooltipVariants` — tooltip flutuante (isVisible)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted` | Track da barra |
| `text-foreground` | Labels, badge text segmento 3 |
| `text-muted-foreground` | Subtitle (labelRight) |
| `bg-foreground` | Tooltip background |
| `text-background` | Tooltip text, badge text segmentos 1/2 |
| `var(--color-risk-1)` | Segmento 1 (maior risco) |
| `var(--color-risk-2)` | Segmento 2 |
| `var(--color-risk-3)` | Segmento 3 |
| `var(--color-risk-4)` | Segmento 4 (menor risco) |
| `shadow-sm` | Badge do valor |
| `shadow-lg` | Tooltip |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Label text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Value text | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Subtitle text | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Value badge | `min-w-[48px] px-2 py-0.5` | `min-w-[60px] px-2.5 py-1` | `min-w-[72px] px-3 py-1.5` |
| Track height | `h-2` | `h-3` | `h-4` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões: labelLeft, labelRight, value, track |
| Valor > 1 | Normalizado para `Math.min(1, value)` |
| Valor < 0 | Normalizado para `Math.max(0, value)` |
| Tooltip no marcador | Visível via hover/focus, esconde via mouseleave/blur |
| Segmento atual | Determinado por `segments.find()` com `range[0] <= value <= range[1]` |
| Responsivo | Labels lado a lado em md+; empilhados em mobile |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | Marcador com `role="button"` e `tabIndex={0}` |
| Rótulo | `aria-label` no marcador: `"Value: {percentageLabel}"` via `UI_I18N[locale].riskLevelBar.value` |
| Teclado | Focus/blur gerenciados para tooltip |
| i18n | `UI_I18N[locale].riskLevelBar.value` para aria-label |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `LowRisk` — Low Risk
- [x] `HighRisk` — High Risk
- [x] `Loading` — Loading
- [x] `AllSizes` — All Sizes
- [x] `LocalePTBR` — Locale PTBR
- [x] `CustomSegments` — Custom Segments

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos — N/A (percentual formatado via `formatValue` de `@/lib/format-utils`)
- [x] `truncate` em todos os labels de texto variável — N/A (labels são props fixas)
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
