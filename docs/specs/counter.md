# Spec: Counter

> Controle de incremento/decremento numérico com input editável, suporte a controlled/uncontrolled, clamps min/max, e keyboard navigation.

---

## Propósito

Campo numérico com botões de incremento/decremento e input direto. Ideal para quantidades, steps ou valores numéricos com limites.

**Usar quando:** Necessário selecionar um valor numérico com clamps (min/max), com interação tanto por botões quanto por digitação.

**Não usar quando:** Apenas leitura/exibição (usar `Badge` ou texto); valores sem limites definidos.

**Alternativa se não se aplicar:** `Input type="number"` nativo; `Slider` para valores contínuos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/counter.tsx` |
| data-slot | `counter` |
| Tipo | `registry:component` |
| Categoria | `Form` |
| Depende de | `Skeleton` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `number` | — | | Valor controlado (controlled) |
| `defaultValue` | `number` | `0` | | Valor inicial (uncontrolled) |
| `min` | `number` | `-Infinity` | | Valor mínimo |
| `max` | `number` | `Infinity` | | Valor máximo |
| `step` | `number` | `1` | | Passo de incremento |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho |
| `variant` | `"default" \| "ghost" \| "outline"` | `"default"` | | Variante visual |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `disabled` | `boolean` | `false` | | Desabilitado |
| `label` | `string` | — | | Aria label do grupo (fallback i18n) |
| `maxWidth` | `CSSProperties["maxWidth"]` | — | | Largura máxima |
| `id` | `string` | — | | ID do input (gerado via `useId()` se omitido) |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `onChange` | `(value: number) => void` | — | | Callback de mudança |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` | — | | Callback de blur |
| `onKeyDown` | `(e: KeyboardEvent<HTMLInputElement>) => void` | — | | Callback de tecla no input |
| `inputProps` | `Omit<ComponentProps<"input">, "type" \| "value" \| "onChange" \| …>` | — | | Props extras para o input nativo |

Estende `Omit<HTMLAttributes<HTMLDivElement>, "onChange">` + `VariantProps<typeof counterVariants>`.

---

## Variantes CVA

### counterVariants (container)

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `default`, `ghost`, `outline` | `default` |
| `disabled` | `true`, `false` | `false` |

### counterButtonVariants

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |

### counterInputVariants

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-background` | container |
| `border-input` | container (default) |
| `ring-ring` | foco no container (`focus-within:ring-2`) |
| `bg-muted/50` | container (ghost) |
| `border-primary/20` | container (outline) |
| `bg-accent` | botões hover |
| `text-foreground` | valor do input |
| `opacity-50` | disabled |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Container | `h-8 gap-1 px-1` | `h-10 gap-2 px-1` | `h-12 gap-3 px-2` |
| Input | `text-xs min-w-8` | `text-sm min-w-12` | `text-base min-w-14` |
| Botões | `size-6` | `size-8` | `size-9` |
| Ícone | `size-4` | `size-4` | `size-4` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões do container (h-8/h-10/h-12, rounded-lg) |
| `disabled={true}` | Container `pointer-events-none opacity-50 grayscale`; botões com `disabled` + `opacity-30` |
| Valor = min | Botão decrement desabilitado |
| Valor = max | Botão increment desabilitado |
| Input inválido | `parseFloat` retorna `NaN`; blur reseta para `defaultValue` ou `clamp` |
| Input vazio | Valor não é atualizado (isNaN); blur corrige |
| Teclado | `ArrowUp` incrementa, `ArrowDown` decrementa |
| Clamp | `Math.min(Math.max(val, min), max)` em toda atualização |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `role="group"` no container |
| Rótulo | `aria-label` com label prop ou fallback i18n `groupLabel` |
| Input | `type="number"` com `aria-label` + `id` |
| Decrement | `aria-label` i18n `decrease` + `disabled` quando em min |
| Increment | `aria-label` i18n `increase` + `disabled` quando em max |
| Teclado | `ArrowUp` / `ArrowDown` no input |
| i18n | `UI_I18N[locale].counter.*`: `groupLabel`, `decrease`, `increase` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `MaxWidth` — Max Width
- [x] `LocalePTBR` — Locale PTBR
- [x] `FluidWidth` — Fluid Width
- [x] `Controlled` — Controlled
- [x] `Variants` — Variants
- [x] `Sizes` — Sizes
- [x] `Disabled` — Disabled
- [x] `Loading` — Loading
- [x] `SimulatedLoading` — Simulated Loading

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em todos os `cva()`
- [x] Todos os `*Variants` exportados (`counterVariants`, `counterButtonVariants`, `counterInputVariants`)
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` no input
- [x] `truncate` não aplicável (valor numérico)
- [x] `aria-label` no container, input, e botões
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas `gap-*`
- [x] Prop `locale` integrada via `UI_I18N`
