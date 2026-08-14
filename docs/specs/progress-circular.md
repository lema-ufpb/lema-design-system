# Spec: ProgressCircular

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Indicador de progresso circular com SVG animado, centro numérico e título opcional. Suporta animação nativa via `requestAnimationFrame` para transição suave do stroke-dashoffset.

**Usar quando:** exibir progresso em formato circular (scorecards, métricas únicas)
**Não usar quando:** progresso linear é suficiente (usar `ProgressBar`)
**Alternativa se não se aplicar:** `ProgressBar` para barras horizontais

---

## Localização

| Campo      | Valor                                                                   |
| ---------- | ----------------------------------------------------------------------- |
| Arquivo    | `components/ds/progress-circular.tsx`                                   |
| data-slot  | `progress-circular`                                                     |
| Tipo       | `registry:component`                                                    |
| Categoria  | `Data Display`                                                          |
| Depende de | Nenhum primitivo shadcn (SVG puro + CVA). Formatação via `format-utils` |

---

## API — Props

| Prop        | Tipo                                                     | Padrão      | Obrigatória | Descrição                                  |
| ----------- | -------------------------------------------------------- | ----------- | ----------- | ------------------------------------------ |
| `value`     | `number`                                                 | —           | ✓           | Valor atual (0–1 ou 0–100, auto-detectado) |
| `title`     | `string`                                                 | —           |             | Título descritivo abaixo do círculo        |
| `intent`    | `"primary" \| "secondary" \| "success" \| "destructive"` | `"primary"` |             | Cor do traço                               |
| `size`      | `"sm" \| "md" \| "lg" \| "xl"`                           | `"md"`      |             | Tamanho do círculo                         |
| `loading`   | `boolean`                                                | `false`     |             | Estado de carregamento                     |
| `precision` | `number`                                                 | `0`         |             | Casas decimais do percentual               |
| `locale`    | `UILocale`                                               | `"en-US"`   |             | Locale para formatação                     |
| `className` | `string`                                                 | —           |             | Classes extras                             |

---

## Variantes CVA

| Dimensão  | Valores                                          | Padrão    |
| --------- | ------------------------------------------------ | --------- |
| `size`    | `sm`, `md`, `lg`, `xl`                           | `md`      |
| `intent`  | `primary`, `secondary`, `success`, `destructive` | `primary` |
| `loading` | `true`, `false`                                  | `false`   |

**Slots do componente:**

- `progressCircularContainerVariants` — wrapper externo (flex column)
- `progressCircularWrapperVariants` — container do SVG (size)
- `progressCircularSvgVariants` — SVG (-rotate-90)
- `progressCircularIndicatorVariants` — círculo animado (transition)
- `progressCircularCenterTextVariants` — centro com valor (size)
- `progressCircularValueVariants` — texto do valor (loading, size)
- `progressCircularTitleVariants` — texto do título (loading, size)
- `progressCircularStrokeVariants` — cor do traço (intent)

---

## Tokens de design utilizados

| Token                           | Slot onde é usado          |
| ------------------------------- | -------------------------- |
| `text-muted/30`                 | Track (círculo de fundo)   |
| `text-foreground`               | Valor central              |
| `text-muted-foreground`         | Título                     |
| `stroke-primary`                | Traço variante primary     |
| `stroke-secondary`              | Traço variante secondary   |
| `stroke-[var(--color-success)]` | Traço variante success     |
| `stroke-destructive`            | Traço variante destructive |

> Nota: `success` usa `var(--color-success)` diretamente pois `stroke-success` pode não estar definido no Tailwind.

---

## Escala tipográfica e de tamanho

| Slot       | sm                      | md                      | lg                        | xl                       |
| ---------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ |
| Wrapper    | `h-[80px] w-[80px]`     | `h-[120px] w-[120px]`   | `h-[160px] w-[160px]`     | `h-[200px] w-[200px]`    |
| Center box | `h-[40px] w-[40px]`     | `h-[60px] w-[60px]`     | `h-[80px] w-[80px]`       | `h-[100px] w-[100px]`    |
| Value text | `text-xs font-semibold` | `text-sm font-semibold` | `text-lg font-semibold`   | `text-2xl font-semibold` |
| Title text | `text-xs max-w-[80px]`  | `text-sm max-w-[120px]` | `text-base max-w-[160px]` | `text-lg max-w-[200px]`  |

> Nota: a escala lg/xl foge do padrão `text-base`/`text-lg` propositalmente para melhor proporção visual no formato circular.

---

## Comportamentos e estados

| Estado           | Comportamento esperado                                                           |
| ---------------- | -------------------------------------------------------------------------------- |
| `loading={true}` | Valor invisível, título invisível (preserva tamanho), `animate-pulse opacity-50` |
| Valor > 1        | Normalizado para `value / 100`                                                   |
| Animação         | `requestAnimationFrame` com 500ms de duração, 500ms de delay inicial             |
| SVG viewBox      | `0 0 120 120`, raio 50, stroke 10, circunferência `2πr`                          |
| `strokeLinecap`  | `round` nas pontas do traço                                                      |

---

## Acessibilidade

| Requisito         | Implementação                                                                 |
| ----------------- | ----------------------------------------------------------------------------- |
| Role semântico    | `<div role="progressbar">` no wrapper do SVG                                  |
| Valores numéricos | `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`                   |
| Rótulo            | `aria-label` usa `title` ou fallback `UI_I18N[locale].progressCircular.label` |
| i18n              | `UI_I18N[locale].progressCircular.label` como fallback do aria-label          |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `AllSizes` — All Sizes
- [x] `WithPrecision` — With Precision
- [x] `AllIntents` — All Intents
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base` (parcialmente, lg/xl fogem do padrão propositalmente)
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas — usa `animate-pulse` com texto invisível (exceção documentada)
- [x] `tabular-nums` em todos os valores numéricos
- [x] `truncate` em todos os labels de texto variável — N/A (title usa `break-words`)
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
