# Spec: ds-animated-number

## Propósito

Contador animado que interpola de `from` até `value` com easing cúbico, respeitando `prefers-reduced-motion` e expondo valor final acessível via `sr-only`.

**Usar quando:** Exibir métricas/KPIs com animação de contagem ao montar ou ao atualizar valor, com formatação i18n e prefixo/sufixo.
**Não usar quando:** Valor estático sem animação — usar `CardStat` ou texto simples com `formatValue`.
**Alternativa se não se aplicar:** `CardStat`, `Stats` com valor estático.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ds/animated-number.tsx`        |
| Tipo       | `registry:ui` (name: `ds-animated-number`) |
| Categoria  | `Data Display`                             |
| Depende de | `cva`, `cn`, `UILocale` (`ui-i18n`)        |

---

## API — Props

| Prop        | Tipo                   | Padrão    | Obrigatória | Descrição                           |
| ----------- | ---------------------- | --------- | ----------- | ----------------------------------- |
| `value`     | `number`               | —         | ✓           | Valor alvo da animação              |
| `duration`  | `number`               | `800`     |             | Duração da animação em ms           |
| `decimals`  | `number`               | `0`       |             | Casas decimais para formatação      |
| `locale`    | `UILocale`             | `"en-US"` |             | Locale para `Intl.NumberFormat`     |
| `prefix`    | `string`               | `""`      |             | Prefixo antes do número (ex: `$`)   |
| `suffix`    | `string`               | `""`      |             | Sufixo após o número (ex: `K`, `%`) |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`    |             | Tamanho tipográfico                 |
| `className` | `string`               | —         |             | Classes extras de layout            |

Estende `Omit<HTMLAttributes<HTMLSpanElement>, "children">` + `VariantProps<typeof animatedNumberVariants>`.

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots:**

- `animatedNumberVariants` — `inline-block font-semibold text-foreground tabular-nums` + `text-xs` / `text-sm` / `text-base` por size.

---

## Tokens de design utilizados

| Token                           | Slot onde é usado      |
| ------------------------------- | ---------------------- |
| `text-foreground`               | valor animado          |
| `tabular-nums`                  | alinhamento de dígitos |
| `font-semibold`                 | peso do valor          |
| `text-xs / text-sm / text-base` | escala por `size`      |

---

## Escala tipográfica e de tamanho

| Slot           | sm                      | md                      | lg                        |
| -------------- | ----------------------- | ----------------------- | ------------------------- |
| Valor          | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Altura         | `inline`                | `inline`                | `inline`                  |
| `tabular-nums` | sempre                  | sempre                  | sempre                    |

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `value` muda             | Anima de `fromRef.current` até novo `value` via `requestAnimationFrame` + easing cúbico |
| `prefers-reduced-motion` | `effectiveDuration = 0`, salto imediato ao valor final                                  |
| `decimals`               | `Intl.NumberFormat` com `minimumFractionDigits = maximumFractionDigits = decimals`      |
| `prefix`/`suffix`        | Renderizados antes/depois do número em ambos `aria-hidden` e `sr-only`                  |
| `delta === 0`            | Sem animação, mantém `display`                                                          |

---

## Acessibilidade

| Requisito          | Implementação                                                            |
| ------------------ | ------------------------------------------------------------------------ |
| Conteúdo animado   | `aria-hidden="true"` no span animado, `sr-only` com valor final estático |
| Números            | `tabular-nums` para estabilidade visual                                  |
| Movimento reduzido | Respeita `prefers-reduced-motion`                                        |
| i18n               | `locale` via `Intl.NumberFormat`                                         |

---

## Stories obrigatórias

- [x] `Default` — `value={128400}` com verificação de formatação
- [x] `AllSizes` — `sm`, `md`, `lg` lado a lado
- [x] `WithPrefixSuffix` — `prefix="$"`, `suffix="K"`, `decimals={1}`
- [x] `Locales` — `en-US`, `pt-BR`, `es-ES`, `fr-FR` com `decimals={1}`

---

## Checklist antes de implementar

- [x] Escala `sm=text-xs / md=text-sm / lg=text-base`
- [x] Tokens semânticos apenas (`text-foreground`, `tabular-nums`)
- [x] `defaultVariants` declarado (`size: "md"`)
- [x] `animatedNumberVariants` exportado
- [x] `prefers-reduced-motion` respeitado
- [x] `tabular-nums` em valor
- [x] `cn()` para classes
- [x] `locale` via `UILocale` + `Intl.NumberFormat`
