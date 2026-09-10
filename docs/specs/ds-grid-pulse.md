# Spec: grid-pulse

> Alternativa interativa ao `particle-field`/`meteor-shower` — grid de pontos que só anima (RAF) enquanto o ponteiro está sobre o container; ocioso o resto do tempo.

---

## Propósito

Grid de pontos que pulsa de tamanho e opacidade perto do cursor, para hero/CTA sections com sensação "premium"/produto SaaS.

**Usar quando:** o hero tem interação de mouse relevante (desktop-first) e se quer um feedback visual sutil ao passar o cursor.
**Não usar quando:** o público é majoritariamente mobile/touch (sem `pointermove` contínuo, o efeito nunca dispara) — preferir `ds-particle-field` ou `ds-meteor-shower`.
**Alternativa:** `ds-cursor-spotlight` (glow radial simples, sem canvas) para um efeito de cursor mais leve.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/grid-pulse.tsx` |
| Tipo       | `registry:ui`                  |
| Categoria  | `Effects`                      |
| Depende de | —                              |

---

## API — Props

| Prop        | Tipo                                          | Padrão      | Obrigatória | Descrição                                          |
| ----------- | --------------------------------------------- | ----------- | ----------- | -------------------------------------------------- |
| `tone`      | `"primary" \| "violet" \| "sky" \| "neutral"` | `"primary"` |             | Cor dos pontos                                     |
| `radius`    | `"sm" \| "md" \| "lg"`                        | `"md"`      |             | Espaçamento do grid e raio de influência do cursor |
| `className` | `string`                                      | —           |             | Classes extras de layout                           |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof gridPulseVariants>`. Não recebe `children` — é posicionado como camada de fundo (`absolute inset-0`) atrás do conteúdo real; o conteúdo deve ficar em `relative z-10` para continuar clicável acima do canvas.

---

## Variantes CVA

| Dimensão | Valores                               | Padrão    |
| -------- | ------------------------------------- | --------- |
| `tone`   | `primary`, `violet`, `sky`, `neutral` | `primary` |
| `radius` | `sm`, `md`, `lg`                      | `md`      |

Slots: `gridPulseVariants` (único — wrapper `absolute inset-0 overflow-hidden` + custom property `--gp-color`; `radius` não gera classes, controla espaçamento do grid e raio de influência via JS).

---

## Tokens de design utilizados

| Token                | Slot                            |
| -------------------- | ------------------------------- |
| `--primary`          | `tone="primary"` → `--gp-color` |
| `--highlight-violet` | `tone="violet"` → `--gp-color`  |
| `--highlight-sky`    | `tone="sky"` → `--gp-color`     |
| `--foreground`       | `tone="neutral"` → `--gp-color` |

> Cor lida via `getComputedStyle` (`--gp-color` resolvido) e usada como `fillStyle` do canvas.

---

## Escala tipográfica e de tamanho

N/A — componente decorativo sem texto/labels próprios.

---

## Comportamentos e estados

| Estado                              | Comportamento esperado                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Ponteiro ocioso (sem `pointermove`) | Nenhum `requestAnimationFrame` rodando — apenas o grid estático desenhado uma vez                |
| `pointermove` sobre o container     | Inicia RAF; pontos próximos ao cursor aumentam de escala/opacidade proporcionalmente à distância |
| `pointerleave`                      | Cancela RAF e redesenha o grid estático imediatamente                                            |
| `prefers-reduced-motion`            | Não registra listeners de ponteiro — desenha apenas o grid estático                              |
| Fora da viewport                    | `IntersectionObserver` interrompe a reação ao ponteiro                                           |
| Resize do container                 | `ResizeObserver` recalcula o grid (não `window.resize`)                                          |
| Retina / 4K                         | `devicePixelRatio` limitado a 2x                                                                 |
| Unmount                             | Cancela RAF, remove listeners de ponteiro e desconecta observers                                 |

---

## Acessibilidade

| Requisito | Implementação                                                                     |
| --------- | --------------------------------------------------------------------------------- |
| Role      | Puramente decorativo — `aria-hidden="true"`                                       |
| Motion    | `matchMedia("(prefers-reduced-motion: reduce)")` desativa toda reação ao ponteiro |
| i18n      | N/A — sem strings                                                                 |

---

## Stories obrigatórias

- [x] `Default` — em contexto de hero, com heading/botões acima (`relative z-10`)
- [x] `AllTones`
- [x] `AllRadii`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas (`--primary`, `--highlight-violet`, `--highlight-sky`, `--foreground`)
- [x] `cva()` com `defaultVariants`
- [x] `gridPulseVariants` exportado
- [x] `cn()` para classes condicionais
- [x] Spacing Tailwind steps (não há spacing custom neste componente)
- [x] `aria-hidden="true"` presente
- [x] Cleanup completo no `useEffect` (RAF + listeners + observers)
