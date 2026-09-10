# Spec: particle-field

> Evolução do padrão "particles" (canvas + partículas conectadas), hardened para produção: pausa fora da viewport, DPR limitado, cor via token, fallback estático em `prefers-reduced-motion`.

---

## Propósito

Fundo de constelação (partículas conectadas por linhas) para hero sections, renderizado em canvas 2D com salvaguardas de performance.

**Usar quando:** precisar de um efeito de fundo animado e "tech" para hero/CTA sections, sem risco de travar a página em dispositivos fracos.
**Não usar quando:** `prefers-reduced-motion: reduce` exigir zero movimento contínuo — o componente já faz fallback para um frame estático.
**Alternativa:** `ds-meteor-shower` (100% CSS, custo ainda menor) ou `ds-aurora-background` (sem canvas, puramente gradiente).

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/particle-field.tsx` |
| Tipo       | `registry:ui`                      |
| Categoria  | `Effects`                          |
| Depende de | —                                  |

---

## API — Props

| Prop        | Tipo                                          | Padrão      | Obrigatória | Descrição                                        |
| ----------- | --------------------------------------------- | ----------- | ----------- | ------------------------------------------------ |
| `tone`      | `"primary" \| "violet" \| "sky" \| "neutral"` | `"primary"` |             | Cor das partículas e linhas (mapeada a tokens)   |
| `density`   | `"sm" \| "md" \| "lg"`                        | `"md"`      |             | Teto de partículas e distância máxima de conexão |
| `className` | `string`                                      | —           |             | Classes extras de layout                         |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof particleFieldVariants>`. Não recebe `children` — é posicionado como camada de fundo (`absolute inset-0`) atrás do conteúdo real.

---

## Variantes CVA

| Dimensão  | Valores                               | Padrão    |
| --------- | ------------------------------------- | --------- |
| `tone`    | `primary`, `violet`, `sky`, `neutral` | `primary` |
| `density` | `sm`, `md`, `lg`                      | `md`      |

Slots: `particleFieldVariants` (único — wrapper que define `pointer-events-none absolute inset-0 overflow-hidden` e a custom property `--pf-color`; `density` não gera classes, controla apenas os parâmetros do canvas via JS, seguindo o mesmo padrão de `magnetic-element`'s `strength`).

---

## Tokens de design utilizados

| Token                | Slot                            |
| -------------------- | ------------------------------- |
| `--primary`          | `tone="primary"` → `--pf-color` |
| `--highlight-violet` | `tone="violet"` → `--pf-color`  |
| `--highlight-sky`    | `tone="sky"` → `--pf-color`     |
| `--foreground`       | `tone="neutral"` → `--pf-color` |

> A cor final é lida via `getComputedStyle` (`--pf-color` resolvido) e usada como `fillStyle`/`strokeStyle` do canvas. Sem hex hardcoded.

---

## Escala tipográfica e de tamanho

N/A — componente decorativo sem texto/labels próprios.

---

## Comportamentos e estados

| Estado                         | Comportamento esperado                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `prefers-reduced-motion`       | Desenha um frame estático (sem `requestAnimationFrame`)                                |
| Fora da viewport               | `IntersectionObserver` pausa o loop de animação                                        |
| Aba oculta (`document.hidden`) | `visibilitychange` pausa o loop de animação                                            |
| Resize do container            | `ResizeObserver` redimensiona o canvas (não `window.resize`) e re-semeia as partículas |
| Retina / 4K                    | `devicePixelRatio` limitado a 2x — sem borrão nem sobrecarga em telas muito densas     |
| Unmount                        | Cancela RAF e desconecta todos os observers                                            |

---

## Acessibilidade

| Requisito | Implementação                                                                 |
| --------- | ----------------------------------------------------------------------------- |
| Role      | Puramente decorativo — `aria-hidden="true"`                                   |
| Motion    | `@media (prefers-reduced-motion: reduce)` via `matchMedia`, fallback estático |
| i18n      | N/A — sem strings                                                             |

---

## Stories obrigatórias

- [x] `Default` — em contexto de hero, com heading/botões acima (`relative z-10`)
- [x] `AllTones`
- [x] `AllDensities`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas (`--primary`, `--highlight-violet`, `--highlight-sky`, `--foreground`)
- [x] `cva()` com `defaultVariants`
- [x] `particleFieldVariants` exportado
- [x] `cn()` para classes condicionais
- [x] Spacing Tailwind steps (não há spacing custom neste componente)
- [x] `aria-hidden="true"` presente
- [x] Cleanup completo no `useEffect` (RAF + observers + listener)
