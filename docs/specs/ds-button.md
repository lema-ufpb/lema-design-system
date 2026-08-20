# Spec: Button (DS)

> Wrapper do shadcn Button com loading, ícones, rounded variants, two-step confirmation, debounce e tooltip.

---

## Propósito

O DS Button estende o shadcn `Button` com 7 funcionalidades adicionais em uma API simples de props. Mantém compatibilidade total com todas as variantes (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) e tamanhos (`xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`) do primitivo.

**Usar quando:** Qualquer ação do usuário que precise de loading state, confirmação em duas etapas, proteção contra duplo clique, ícones posicionados ou tooltip integrado.

**Não usar quando:** A ação é puramente navegação (usar Link do Next.js). O botão é icon-only (usar `IconButton` do DS).

---

## Localização

| Campo     | Valor                                              |
| --------- | -------------------------------------------------- |
| Arquivo   | `components/ds/button.tsx`                         |
| Categoria | Actions                                            |
| Importa   | `Button as ButtonRoot` de `@/components/ui/button` |

---

## API — Props

Todas as props do shadcn `ButtonRoot` são herdadas (`variant`, `size`, `asChild`, `disabled`, `type`, etc.).

| Prop          | Tipo                                                                        | Padrão   | Descrição                                                           |
| ------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| `loading`     | `boolean`                                                                   | `false`  | Mostra um `Loader2` animado e desabilita o botão                    |
| `loadingText` | `string`                                                                    | —        | Texto exibido ao lado do spinner (padrão: children)                 |
| `startIcon`   | `ReactNode`                                                                 | —        | Ícone antes do label                                                |
| `endIcon`     | `ReactNode`                                                                 | —        | Ícone depois do label                                               |
| `rounded`     | `"full" \| "lg" \| "md" \| "none"`                                          | `"full"` | Border radius                                                       |
| `fullWidth`   | `boolean`                                                                   | `false`  | `w-full`                                                            |
| `debounceMs`  | `number`                                                                    | —        | Intervalo mínimo entre clicks (ms)                                  |
| `confirm`     | `{ text: string; duration?: number }`                                       | —        | Two-step confirmation: 1o click mostra `text`, 2o dispara `onClick` |
| `tooltip`     | `string \| { text: string; side?: "top" \| "right" \| "bottom" \| "left" }` | —        | Tooltip no hover                                                    |

---

## CVA Variants

### `dsButtonVariants`

| Variant           | Classes                 |
| ----------------- | ----------------------- |
| `rounded: "full"` | `rounded-4xl` (default) |
| `rounded: "lg"`   | `rounded-xl`            |
| `rounded: "md"`   | `rounded-md`            |
| `rounded: "none"` | `rounded-none`          |
| `fullWidth: true` | `w-full`                |

---

## Comportamentos

| Funcionalidade | Detalhes                                                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loading**    | Renderiza `<Loader2 className="animate-spin">` + `loadingText ?? children`. `aria-busy` e `disabled` ativados.                                                  |
| **Ícones**     | `startIcon` e `endIcon` renderizados como irmãos de children com `gap-*` do ButtonRoot.                                                                         |
| **Confirm**    | Estado interno `confirming`: 1o click troca label para `confirm.text` e inicia timer (`duration` padrão 3s). 2o click dispara `onClick`. Timer expira → reseta. |
| **Debounce**   | `lastClick` ref compara `Date.now()` — descarta clicks dentro do intervalo.                                                                                     |
| **Tooltip**    | Envolve o Button em `<TooltipProvider><Tooltip><TooltipTrigger asChild>`. Aceita `string` ou `{ text, side }`.                                                  |
| **Disabled**   | Combina `disabled \|\| loading \|\| (confirm && confirming)`.                                                                                                   |

---

## Acessibilidade

| Requisito   | Implementação                                                 |
| ----------- | ------------------------------------------------------------- |
| Role button | Nativo (herdado do ButtonRoot)                                |
| Loading     | `aria-busy`                                                   |
| Confirmação | Botão não desabilitado durante confirmação (`cursor-pointer`) |
| Tooltip     | Radix Tooltip com `TooltipContent` e `aria-label`             |

---

## Stories obrigatórias

- [x] `Default` — botão primário padrão
- [x] `Variants` — 6 variantes lado a lado
- [x] `Sizes` — xs, sm, default, lg
- [x] `Loading` — loading com e sem loadingText
- [x] `WithIcons` — startIcon e endIcon
- [x] `Rounded` — full, lg, md, none
- [x] `FullWidth` — w-full em mobile layout
- [x] `ConfirmMode` — two-step com botão destrutivo
- [x] `Debounced` — 1s debounce com contador
- [x] `Tooltip` — tooltips em múltiplas direções
- [x] `KitchenSink` — todos os recursos combinados

---

## Checklist

- [x] CVA single-file: Types → Variants → Component
- [x] `"use client"` (hooks: useState, useRef, useCallback)
- [x] `cn()` para class overrides
- [x] `data-slot="ds-button"`
- [x] `data-confirming` no confirm mode
- [x] Tooltip via Radix Tooltip (mesmo pattern do IconButton)
- [x] Stale confirming tratado: renderização segura com `confirm && confirming`
