# Spec: NavDots

---

## Propósito

Navegação por dots (pontos) que rastreia a seção visível via `IntersectionObserver`. Cada dot é um botão com tooltip que scrolla suavemente para a seção alvo. Orientação vertical (side rail) ou horizontal (bottom bar).

**Usar quando:** Landing pages ou documentação com seções em scroll, onde o usuário precisa navegar entre seções.

**Não usar quando:** Menos de 2 seções. Navegação principal do site. Precisa de labels visíveis (preferir tabs ou nav links).

**Alternativa se não se aplicar:** Tabs, anchor links manuais, scrollspy customizado.

---

## Localização

| Campo      | Valor                                                                     |
| ---------- | ------------------------------------------------------------------------- |
| Arquivo    | `components/ds/nav-dots.tsx`                                              |
| data-slot  | `nav-dots`                                                                |
| Tipo       | `registry:component` (name: `nav-dots`)                                   |
| Categoria  | `Navigation`                                                              |
| Depende de | `Tooltip` (shadcn), `TooltipProvider`, `TooltipContent`, `TooltipTrigger` |

---

## API — Props

| Prop              | Tipo                            | Padrão       | Obrigatória | Descrição                                             |
| ----------------- | ------------------------------- | ------------ | ----------- | ----------------------------------------------------- |
| `sections`        | `NavDotsSection[]`              | —            | ✓           | Array de seções `{ id: string; label: string }`       |
| `active`          | `number`                        | `0`          |             | Índice inicialmente ativo                             |
| `scrollOnClick`   | `boolean`                       | `true`       |             | Scroll suave ao clicar no dot                         |
| `scrollContainer` | `RefObject \| "window" \| null` | `null`       |             | Container scrollável a observar; `null` = auto-detect |
| `scrollMargin`    | `string`                        | `"0px"`      |             | `rootMargin` do IntersectionObserver                  |
| `onActiveChange`  | `(index: number) => void`       | —            |             | Callback quando seção ativa muda                      |
| `orientation`     | `"vertical" \| "horizontal"`    | `"vertical"` |             | Direção dos dots                                      |
| `position`        | `"left" \| "right"`             | `"right"`    |             | Lado da tela (vertical) ou alinhamento (horizontal)   |
| `locale`          | `UILocale`                      | `"en-US"`    |             | Localização dos aria-label                            |
| `className`       | `string`                        | —            |             | Classes extras                                        |

> Estende `NavDotsContainerVariantProps` + `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

| Dimensão                  | Valores                  | Padrão     |
| ------------------------- | ------------------------ | ---------- |
| `position` (container)    | `left`, `right`          | `right`    |
| `orientation` (container) | `vertical`, `horizontal` | `vertical` |
| `visible` (container)     | `true`, `false`          | `true`     |
| `active` (dot)            | `true`, `false`          | `false`    |
| `interactive` (dot)       | `true`, `false`          | `true`     |

**Slots:**

- `navDotsContainerVariants` — container fixo com gap e posicionamento
- `navDotsDotVariants` — dot individual (active/inactive + interactive)

**Compound variants** (container):

- `orientation=vertical + position=left` → `top-1/2 left-4 -translate-y-1/2`
- `orientation=vertical + position=right` → `top-1/2 right-4 -translate-y-1/2`
- `orientation=horizontal` (both positions) → `top-4 left-1/2 -translate-x-1/2`

---

## Tokens de design utilizados

| Token           | Slot onde é usado |
| --------------- | ----------------- |
| `bg-foreground` | dot ativo         |
| `bg-border`     | dot inativo       |
| `bg-foreground` | dot inativo hover |
| `ring-ring`     | dot focus-visible |

---

## Escala tipográfica e de tamanho

| Slot             | Valor                         |
| ---------------- | ----------------------------- |
| Dot size         | `size-2` (fixo, sem variante) |
| Dot active scale | `scale-125`                   |

Sem escala tipográfica — labels ficam nos tooltips (gerenciado pelo shadcn Tooltip).

---

## Comportamentos e estados

| Estado                        | Comportamento esperado                                                      |
| ----------------------------- | --------------------------------------------------------------------------- |
| `active` = dot                | `bg-foreground scale-125` (preenchido e ampliado)                           |
| `inactive` = dot              | `bg-border`, hover → `bg-foreground scale-125`                              |
| `visible={false}`             | `pointer-events-none opacity-0` (transição fade)                            |
| Scroll tracking               | `IntersectionObserver` com thresholds [0,0.1…1] e `rootMargin` configurável |
| Seção não encontrada no DOM   | Ignorada silenciosamente                                                    |
| `scrollOnClick={false}`       | Click não dispara scroll, dot apenas atualiza estado                        |
| `scrollContainer` auto-detect | Sobe o DOM até encontrar `overflow: auto/scroll`                            |

---

## Acessibilidade

| Requisito      | Implementação                                                          |
| -------------- | ---------------------------------------------------------------------- |
| Role semântico | `role="navigation"` no container                                       |
| Rótulo         | `aria-label` com `UI_I18N[locale].navDots.sectionNav`                  |
| Botões         | `aria-label` com `UI_I18N[locale].navDots.goTo + ": " + section.label` |
| Estado ativo   | `aria-current="true"` no dot ativo                                     |
| Tooltip        | `TooltipContent` com `side` dinâmico baseado em orientation/position   |
| Teclado        | Navegação por Tab entre dots (botões nativos `<button>`)               |
| i18n           | `UI_I18N[locale].navDots.sectionNav`, `UI_I18N[locale].navDots.goTo`   |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Horizontal` — Horizontal
- [x] `LeftPosition` — Left Position
- [x] `WithActive` — With Active
- [x] `WithCallback` — With Callback
- [x] `DisabledScroll` — Disabled Scroll
- [x] `LocalePTBR` — Locale PTBR
- [x] `AllStates` — All States

## Checklist antes de implementar

- [x] Escala tipográfica — N/A (tooltip gerencia texto)
- [x] Tokens semânticos usados
- [x] `cva()` com `defaultVariants`
- [x] `*Variants` exportados
- [x] Loading — N/A (sem estado loading)
- [x] `tabular-nums` — N/A
- [x] `truncate` — N/A
- [x] `aria-label` no container e cada dot
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` integrada via `UI_I18N`
