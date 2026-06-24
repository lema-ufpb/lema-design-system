# Spec: Progress

> Barra de progresso para indicar conclusão de tarefas ou carregamento.

---

## Propósito

**Usar quando:** Mostrar o progresso de uma operação com valor determinado (0-100%) ou indeterminado.

**Não usar quando:** Precisa de múltiplas etapas discretas — usar `Stepper` ou `Steps`.

**Alternativa:** `Skeleton` para loading de layout; `Spinner` para operações curtas sem progresso definido.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/progress.tsx` |
| Tipo | `registry:ui` (name: `progress`) |
| Categoria | Feedback |
| Depende de | `radix-ui` (Progress), `@/lib/utils` (cn) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `number` | — | Não | Valor 0-100. Omite para estado indeterminado |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--primary` | Cor de preenchimento do indicador |
| `--muted` | Cor do track de fundo |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Determinado (value) | Indicador posicionado via `translateX(-${100 - value}%)` |
| Indeterminado | `value` como `undefined` — sem preenchimento (track vazio) |
| Transição | `transition-all` no indicador |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role | `progressbar` (Radix) |
| Valor | `aria-valuenow` gerenciado pelo Radix |
| Valor mínimo/máximo | `aria-valuemin="0"`, `aria-valuemax="100"` (Radix) |

---

## Stories obrigatórias

- [x] `Default` — 50% determinado
- [x] `States` — 20%, 50%, 80%, 100%
- [x] `Indeterminate` — Sem value definido

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a estado determinado e indeterminado
- [x] Atributo `data-slot` no root e indicator
