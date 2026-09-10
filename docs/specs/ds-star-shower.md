# Spec: StarShower

> Componente de efeito atmosférico — céu estrelado com estrelas pulsantes, cintilação e chuvas de estrelas cadentes ocasionais.

---

## Propósito

Céu noturno vivo para fundos de hero, páginas de lançamento, estados vazios premium e seções de storytelling. Diferente de `ParticleField` (constelação geométrica) e `MeteorShower` (chuva direcional CSS), o `StarShower` simula um campo estelar orgânico: cada estrela respira (pulso), cintila aleatoriamente e, a cada poucos segundos, uma estrela cadente risca o céu com cauda degradê.

**Usar quando:** hero noturno, onboarding espacial, empty-state lúdico, seção "sobre" institucional com metáfora de universo/descoberta, fundo de dashboard premium.
**Não usar quando:** conteúdo denso que exige leitura prolongada (o movimento compete), ou quando já há `ParticleField`/`MeteorShower` na mesma viewport (budget de blur/canvas).
**Alternativa se não se aplicar:** `AuroraBackground` (névoa), `BackgroundGlow` (halo estático).

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/star-shower.tsx`               |
| Tipo       | `registry:ui`                                 |
| Categoria  | `Effects`                                     |
| Depende de | `cn` (lib/utils), canvas 2D nativo (sem deps) |

---

## API — Props

| Prop            | Tipo                                                              | Padrão      | Obrigatória | Descrição                              |
| --------------- | ----------------------------------------------------------------- | ----------- | ----------- | -------------------------------------- |
| `tone`          | `"primary" \| "violet" \| "sky" \| "warm" \| "cool" \| "neutral"` | `"primary"` |             | Matiz das estrelas via `--star-color`  |
| `density`       | `"sm" \| "md" \| "lg"`                                            | `"md"`      |             | Quantidade de estrelas (45 / 90 / 140) |
| `speed`         | `"slow" \| "normal" \| "fast"`                                    | `"normal"`  |             | Velocidade do pulso (0.6x / 1x / 1.6x) |
| `twinkle`       | `boolean`                                                         | `true`      |             | Cintilação aleatória (flicker)         |
| `shootingStars` | `boolean`                                                         | `true`      |             | Estrelas cadentes a cada 3-6s          |
| `interactive`   | `boolean`                                                         | `false`     |             | Parallax sutil no mousemove            |
| `className`     | `string`                                                          | —           |             | Classes extras de layout               |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof starShowerVariants>`.

---

## Variantes CVA

| Dimensão  | Valores                                               | Padrão    |
| --------- | ----------------------------------------------------- | --------- |
| `tone`    | `primary`, `violet`, `sky`, `warm`, `cool`, `neutral` | `primary` |
| `density` | `sm`, `md`, `lg`                                      | `md`      |
| `speed`   | `slow`, `normal`, `fast`                              | `normal`  |

**Slots:**

- `starShowerVariants` — wrapper `absolute inset-0 overflow-hidden pointer-events-none` (quando `interactive=false`) + `--star-color` + `--star-speed`
- Canvas interno sempre `block size-full`

---

## Tokens de design utilizados

| Token                                          | Slot onde é usado                   |
| ---------------------------------------------- | ----------------------------------- |
| `[--star-color:var(--primary)]`                | `tone=primary`                      |
| `[--star-color:var(--highlight-violet)]`       | `tone=violet`                       |
| `[--star-color:var(--highlight-sky)]`          | `tone=sky`                          |
| `[--star-color:var(--warning)]`                | `tone=warm`                         |
| `[--star-color:var(--highlight-sky)]` + filtro | `tone=cool`                         |
| `[--star-color:var(--foreground)]`             | `tone=neutral`                      |
| `bg-zinc-950`                                  | Story container (não no componente) |
| `--star-speed`                                 | multiplicador de `sin()` no RAF     |

> Proibido: `bg-yellow-400`, `text-blue-500` raw — sempre via `--star-color`.

---

## Escala tipográfica e de tamanho

Não se aplica (efeito decorativo). Estrelas: `r 0.8–2.2px` + `cross` 18% das estrelas com `r 1.6–2.8px` e brilho `shadowBlur 8–12`.

| Slot              | sm          | md          | lg          |
| ----------------- | ----------- | ----------- | ----------- |
| Estrelas          | 45          | 90          | 140         |
| Shooting interval | 5–7s        | 3–6s        | 2–4s        |
| Canvas            | `size-full` | `size-full` | `size-full` |

---

## Comportamentos e estados

| Estado                                  | Comportamento esperado                                           |
| --------------------------------------- | ---------------------------------------------------------------- |
| `prefers-reduced-motion: reduce`        | Frame estático: draw único sem RAF, sem shooting, `opacity` fixa |
| `visibilitychange hidden`               | Pausa RAF                                                        |
| `IntersectionObserver` fora da viewport | Pausa RAF                                                        |
| `resize`                                | DPR clamp 2x, re-seed de estrelas proporcional à área            |
| `interactive=true`                      | Mousemove → parallax `±6px` com easing 0.04, depth por raio      |
| `twinkle=false`                         | Apenas pulso senoidal, sem flicker                               |
| `shootingStars=false`                   | Nenhuma cadente                                                  |

---

## Acessibilidade

| Requisito      | Implementação                                                                        |
| -------------- | ------------------------------------------------------------------------------------ |
| Role semântico | `aria-hidden="true"` + `data-slot="star-shower"`                                     |
| Rótulo         | Nenhum — decorativo                                                                  |
| Teclado        | Nenhum foco; `pointer-events-none` exceto quando `interactive` (ainda `aria-hidden`) |
| Motion         | Respeita `prefers-reduced-motion`, pausa fora de tela e aba inativa                  |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — hero dark `bg-zinc-950` com `StarShower` + título central
- [ ] `AllTones` — grid 6 tons em `bg-background`/`bg-zinc-950` alternado
- [ ] `AllDensities` — `sm/md/lg` lado a lado
- [ ] `AllSpeeds` — `slow/normal/fast`
- [ ] `WithoutTwinkle` — `twinkle=false`
- [ ] `WithoutShooting` — `shootingStars=false`
- [ ] `Interactive` — `interactive=true` com card tilt
- [ ] `LightBackground` — `bg-background` com `tone=primary` para contraste claro

---

## Checklist antes de implementar

- [ ] Escala `sm/md/lg` respeitada
- [ ] Todos os tokens são semânticos
- [ ] Todo `cva()` tem `defaultVariants`
- [ ] Todos os `*Variants` exportados
- [ ] `motion-reduce` com frame estático
- [ ] `cn()` para classes condicionais
- [ ] Spacing apenas steps Tailwind
- [ ] `aria-hidden="true"` decorativo
