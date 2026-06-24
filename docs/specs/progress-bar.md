# Spec: ProgressBar

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Barra de progresso horizontal com label de porcentagem, suporte a nome, tooltip, modo razão (valor/total) e múltiplos layouts de label (inline, above, below). Ideal para dashboards e formulários multi-etapa.

**Usar quando:** exibir progresso linear de uma tarefa ou proporção  
**Não usar quando:** necessário progresso circular (usar `ProgressCircular`)  
**Alternativa se não se aplicar:** shadcn `Progress` primitivo (sem labels)

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/progress-bar.tsx` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Skeleton`, `Tooltip` (shadcn), `radix-ui/progress` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `number` | — | ✓ | Valor atual (0–1 ou 0–100, auto-detectado) |
| `name` | `string` | — | | Rótulo nominal da barra |
| `namePosition` | `"left" \| "right"` | `"left"` | | Posição do nome |
| `upper` | `boolean` | `false` | | Uppercase no nome |
| `showLabel` | `boolean` | `true` | | Exibe label percentual |
| `labelPosition` | `"left" \| "right"` | `"left"` | | Posição do label |
| `labelLayout` | `"inline" \| "above" \| "below"` | `"above"` | | Layout do container |
| `labelWidth` | `number` | — | | Largura fixa do nome |
| `intent` | `"primary" \| "secondary" \| "success" \| "destructive"` | `"primary"` | | Cor de preenchimento |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | | Tamanho da barra |
| `total` | `number` | — | | Valor total (modo razão) |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `precision` | `number` | `0` | | Casas decimais do percentual |
| `tooltip` | `ReactNode` | — | | Conteúdo do tooltip |
| `locale` | `string` | `"en-US"` | | Locale para formatação |
| `className` | `string` | — | | Classes extras |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` (no name/label/fill) |
| `intent` | `primary`, `secondary`, `success`, `destructive` | `primary` |
| `labelLayout` | `inline`, `above`, `below` | `inline` |
| `upper` | `true`, `false` | `false` |
| `position` | `left`, `right` | `left` (no name slot) |

**Slots do componente:**

- `progressBarContainerVariants` — wrapper externo (labelLayout)
- `progressBarNameVariants` — texto descritivo (upper, position, size)
- `progressBarLabelVariants` — valor percentual (size)
- `progressBarFillVariants` — barra de preenchimento (intent)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted` | Track da barra (fundo) |
| `bg-primary` | Fill variante primary |
| `bg-secondary` | Fill variante secondary |
| `bg-success` | Fill variante success |
| `bg-destructive` | Fill variante destructive |
| `text-foreground` | Nome na posição right |
| `text-muted-foreground` | Nome na posição left |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Name text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Label text | `text-xs font-semibold w-8 tabular-nums` | `text-sm font-semibold w-10 tabular-nums` | `text-base font-semibold w-12 tabular-nums` |
| Track height | `h-2 min-w-20` | `h-3 min-w-24` | `h-4 min-w-32` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões equivalentes a name + label + track |
| Valor > 1 | Normalizado para `value / 100` |
| `total` definido | Exibe `valor / total` em vez de percentual |
| `tooltip` | Track envolvido em `<Tooltip>` com `delayDuration={100}` |
| Overflow texto | `truncate` no nome |
| Label numérico | `tabular-nums` na label |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<ProgressPrimitive.Root>` com `role="progressbar"` implícito |
| Valores numéricos | `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}` |
| Rótulo | `aria-label` no Root (fallback: `name ?? "Progress"`) |
| i18n | Locale usado apenas para formatação numérica (`Intl.NumberFormat`) |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `AllIntents` — All Intents
- [x] `AllSizes` — All Sizes
- [x] `WithPrecision` — With Precision
- [x] `DifferentLocales` — Different Locales
- [x] `Loading` — Loading
- [x] `LoadingStates` — Loading States
- [x] `WithTooltip` — With Tooltip
- [x] `NoLabel` — No Label
- [x] `LabelRight` — Label Right
- [x] `NameRight` — Name Right
- [x] `Uppercase` — Uppercase
- [x] `LabelLayoutInline` — Label Layout Inline
- [x] `LabelLayoutAbove` — Label Layout Above
- [x] `LabelLayoutBelow` — Label Layout Below
- [x] `LabelLayoutComparison` — Label Layout Comparison
- [x] `RatioLabel` — Ratio Label
- [x] `FixedLabelWidth` — Fixed Label Width

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
- [x] Prop `locale` integrada via `UI_I18N` — usa `Intl.NumberFormat` com locale prop
