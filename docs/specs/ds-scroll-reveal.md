# Spec: ds-scroll-reveal

## Propósito

Fade/slide de children na primeira vez que entram no viewport via `IntersectionObserver`, visível imediatamente sob `prefers-reduced-motion`.

**Usar quando:** Revelar seções, cards ou listas ao rolar, com direção configurável e delay opcional.
**Não usar quando:** Animação contínua ou controlada por scroll progress — usar `ScrollReveal` apenas para entrada.
**Alternativa:** `Fade`, `useInView` manual, ou CSS `view-timeline` quando disponível.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/scroll-reveal.tsx`        |
| Tipo       | `registry:ui` (name: `ds-scroll-reveal`) |
| Categoria  | `Data Display` / `Animation`             |
| Depende de | `cva`, `cn`, `IntersectionObserver`      |

---

## API — Props

| Prop        | Tipo                                            | Padrão | Obrigatória | Descrição                                                          |
| ----------- | ----------------------------------------------- | ------ | ----------- | ------------------------------------------------------------------ |
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"` |             | Direção do slide inicial                                           |
| `delay`     | `number`                                        | `0`    |             | Delay antes da transição começar, em ms                            |
| `once`      | `boolean`                                       | `true` |             | Se `true`, revela apenas uma vez; se `false`, re-triga ao reentrar |
| `className` | `string`                                        | —      |             | Classes extras                                                     |
| `style`     | `React.CSSProperties`                           | —      |             | Estilo inline (`transitionDelay` sobrescrito quando `delay`)       |
| `children`  | `React.ReactNode`                               | —      |             | Conteúdo a revelar                                                 |

Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof scrollRevealVariants>`.

---

## Variantes CVA

| Dimensão    | Valores                               | Padrão |
| ----------- | ------------------------------------- | ------ |
| `direction` | `up`, `down`, `left`, `right`, `none` | `up`   |

**Slots:**

- `scrollRevealVariants` — `opacity-0 transition-[opacity,translate] duration-700 ease-out data-[revealed=true]:opacity-100 motion-reduce:translate-none motion-reduce:opacity-100! motion-reduce:transition-none` + `translate-y-6`/`-translate-y-6`/`translate-x-6`/`-translate-x-6` por direção.

---

## Tokens de design utilizados

| Token                             | Slot onde é usado         |
| --------------------------------- | ------------------------- |
| `opacity-0` / `opacity-100`       | estado inicial / revelado |
| `translate-y-6` / `translate-x-6` | direção do slide          |
| `duration-700` `ease-out`         | transição                 |
| `motion-reduce:*`                 | acessibilidade            |

---

## Escala tipográfica e de tamanho

Herda de children. Sem escala própria.

| Slot      | sm       | md       | lg       |
| --------- | -------- | -------- | -------- |
| Container | `w-full` | `w-full` | `w-full` |

---

## Comportamentos e estados

| Estado                             | Comportamento esperado                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `IntersectionObserver`             | `threshold: 0.2`, `entry.isIntersecting` → `setRevealed(true)`, `once ? disconnect() : keep` |
| `!once` e `isIntersecting = false` | `setRevealed(false)` para re-trigar                                                          |
| `prefers-reduced-motion`           | `setRevealed(true)` imediato, sem observer                                                   |
| `delay`                            | `style.transitionDelay = "${delay}ms"`                                                       |
| `data-revealed`                    | `true` → `opacity-100` e `translate-0` via `data-[revealed=true]:*`                          |

---

## Acessibilidade

| Requisito              | Implementação                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Movimento reduzido     | `prefers-reduced-motion: reduce` → visível imediatamente, `motion-reduce:transition-none` |
| Sem `aria` extra       | Conteúdo permanece no DOM, sem `aria-hidden`                                              |
| `IntersectionObserver` | Threshold `0.2`, desconecta quando `once`                                                 |

---

## Stories obrigatórias

- [x] `Default` — `ScrollReveal` com placeholder `h-64` + card `p-6`, fade/slide `up`
- [x] `AllDirections` — `up`, `down`, `left`, `right` em grid `2x2`

---

## Checklist antes de implementar

- [x] `defaultVariants` declarado (`direction: "up"`)
- [x] `scrollRevealVariants` exportado
- [x] `once` e `delay` implementados
- [x] `prefers-reduced-motion` respeitado
- [x] `IntersectionObserver` com cleanup (`observer.disconnect()`)
- [x] `cn()` para classes
- [x] `data-slot="scroll-reveal"` + `data-revealed`
