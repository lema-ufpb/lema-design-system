# Spec: meteor-shower

> Alternativa 100% CSS ao `particle-field` — zero canvas, zero JS de animação, zero `use client`. Custo de CPU essencialmente nulo (só compositing de GPU via `transform`/`opacity`).

---

## Propósito

Fundo de "chuva de meteoros" para hero sections — traços diagonais animados via CSS puro.

**Usar quando:** performance é crítica (tráfego alto, dispositivos fracos) e um efeito mais sutil/rápido que partículas é suficiente.
**Não usar quando:** precisar de interatividade com o ponteiro — usar `ds-grid-pulse`.
**Alternativa:** `ds-particle-field` (canvas, mais denso) ou `ds-aurora-background` (sem elementos discretos, só gradiente).

---

## Localização

| Campo      | Valor                             |
| ---------- | --------------------------------- |
| Arquivo    | `components/ds/meteor-shower.tsx` |
| Tipo       | `registry:ui`                     |
| Categoria  | `Effects`                         |
| Depende de | —                                 |

---

## API — Props

| Prop        | Tipo                                          | Padrão      | Obrigatória | Descrição                                    |
| ----------- | --------------------------------------------- | ----------- | ----------- | -------------------------------------------- |
| `tone`      | `"primary" \| "violet" \| "sky" \| "neutral"` | `"primary"` |             | Cor dos meteoros e do rastro                 |
| `density`   | `"sm" \| "md" \| "lg"`                        | `"md"`      |             | Quantidade de meteoros simultâneos (8/14/20) |
| `className` | `string`                                      | —           |             | Classes extras de layout                     |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof meteorShowerVariants>`. Não recebe `children` — é posicionado como camada de fundo (`absolute inset-0`) atrás do conteúdo real. Não é `"use client"`: as posições dos meteoros são geradas de forma determinística (mulberry32) em módulo, garantindo markup idêntico entre servidor e cliente.

---

## Variantes CVA

| Dimensão  | Valores                               | Padrão    |
| --------- | ------------------------------------- | --------- |
| `tone`    | `primary`, `violet`, `sky`, `neutral` | `primary` |
| `density` | `sm`, `md`, `lg`                      | `md`      |

Slots: `meteorShowerVariants` (único — wrapper `pointer-events-none absolute inset-0 overflow-hidden` + custom property `--meteor-color`; `density` não gera classes, apenas fatia o array de meteoros pré-computado).

---

## Tokens de design utilizados

| Token                | Slot                                |
| -------------------- | ----------------------------------- |
| `--primary`          | `tone="primary"` → `--meteor-color` |
| `--highlight-violet` | `tone="violet"` → `--meteor-color`  |
| `--highlight-sky`    | `tone="sky"` → `--meteor-color`     |
| `--foreground`       | `tone="neutral"` → `--meteor-color` |

> Cabeça do meteoro (`bg-[var(--meteor-color)]`) e rastro (`before:from-[var(--meteor-color)] before:to-transparent`) usam apenas a custom property — sem hex hardcoded.

---

## Escala tipográfica e de tamanho

N/A — componente decorativo sem texto/labels próprios.

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                                                    |
| ------------------------ | ------------------------------------------------------------------------- |
| `prefers-reduced-motion` | `motion-reduce:hidden` remove os meteoros do layout inteiramente          |
| Render server/cliente    | Posições/delays determinísticos (mulberry32) — sem mismatch de hidratação |
| Resize                   | Puramente CSS (`%`) — não precisa recalcular em JS                        |
| Custo de CPU em idle     | Zero — não há `requestAnimationFrame`, apenas `animation` CSS declarativa |

---

## Acessibilidade

| Requisito | Implementação                               |
| --------- | ------------------------------------------- |
| Role      | Puramente decorativo — `aria-hidden="true"` |
| Motion    | `motion-reduce:hidden` (Tailwind, sem JS)   |
| i18n      | N/A — sem strings                           |

---

## Stories obrigatórias

- [x] `Default` — em contexto de hero, com heading/botões acima (`relative z-10`)
- [x] `AllTones`
- [x] `AllDensities`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas (`--primary`, `--highlight-violet`, `--highlight-sky`, `--foreground`)
- [x] `cva()` com `defaultVariants`
- [x] `meteorShowerVariants` exportado
- [x] `cn()` para classes condicionais
- [x] Spacing Tailwind steps (`size-1`, `w-12`, `h-px`)
- [x] `aria-hidden="true"` presente
- [x] `motion-reduce:` em vez de media query manual
