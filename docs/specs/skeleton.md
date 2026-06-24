# Spec: Skeleton

> Placeholder de carregamento com animação pulse para indicar conteúdo em carregamento.

---

## Propósito

**Usar quando:** Exibir um estado de carregamento esqueleto que imita a forma do conteúdo real durante o fetching de dados.

**Não usar quando:** A operação é instantânea (<300ms) — evitar flash de loading. Precisa de indicador de progresso — usar `Progress` ou `Spinner`.

**Alternativa:** `Progress` para operações longas com progresso definido; `Spinner` para ações curtas sem layout definido.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/skeleton.tsx` |
| Tipo | `registry:ui` (name: `skeleton`) |
| Categoria | Feedback |
| Depende de | `@/lib/utils` (cn) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais (usar para definir width/height/shape) |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--muted` | Cor de fundo do placeholder |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Carregando | Animação `animate-pulse` + `bg-muted` |
| Shape retangular | Padrão `rounded-2xl` |
| Shape circular | Sobrescrever com `rounded-full` |
| Tamanho | Definido via `className` (h-4, w-20, etc) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA | Sem role específica (elemento decorativo) |
| Animação respeitada | `animate-pulse` com `prefers-reduced-motion` (Tailwind) |

---

## Stories obrigatórias

- [x] `Default` — Retângulo pequeno `h-4 w-20`
- [x] `Variants` — Três larguras diferentes
- [x] `Card` — Esqueleto de cartão com 3 linhas
- [x] `Avatar` — Círculo + duas linhas de texto
- [x] `Image` — Placeholder de imagem `aspect-video`

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Tamanho flexível via `className`
- [x] Animação `animate-pulse`
- [x] Atributo `data-slot`
