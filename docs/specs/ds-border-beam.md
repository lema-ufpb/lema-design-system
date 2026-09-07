# Spec: ds-border-beam

## Propósito

Brilho pontual que percorre a borda de um container `relative isolate` com `overflow-hidden` via `offset-path: rect(...)`, mantendo proporção correta em qualquer aspect-ratio. Decorativo, `-z-10`, oculto em `prefers-reduced-motion`.

**Usar quando:** Destacar cards/containers premium com animação sutil de borda, sem distorcer com `conic-gradient`.
**Não usar quando:** Borda estática ou highlight sólido — usar `border` + `bg-*` semântico.
**Alternativa:** `Glow`, `AuroraBackground`, borda `border-border` padrão.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/border-beam.tsx`        |
| Tipo       | `registry:ui` (name: `ds-border-beam`) |
| Categoria  | `Feedback` / `Decoration`              |
| Depende de | `cva`, `cn`                            |

---

## API — Props

| Prop        | Tipo                             | Padrão      | Obrigatória | Descrição                         |
| ----------- | -------------------------------- | ----------- | ----------- | --------------------------------- |
| `tone`      | `"primary" \| "violet" \| "sky"` | `"primary"` |             | Cor do brilho via `--beam-color`  |
| `speed`     | `"slow" \| "normal" \| "fast"`   | `"normal"`  |             | Duração da animação               |
| `size`      | `number`                         | `80`        |             | Diâmetro do brilho em px          |
| `className` | `string`                         | —           |             | Classes extras                    |
| `style`     | `React.CSSProperties`            | —           |             | Estilo inline (width sobrescrito) |

Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof borderBeamVariants>`.

---

## Variantes CVA

| Dimensão | Valores                    | Padrão    |
| -------- | -------------------------- | --------- |
| `tone`   | `primary`, `violet`, `sky` | `primary` |
| `speed`  | `slow`, `normal`, `fast`   | `normal`  |

**Slots:**

- `borderBeamVariants` — `pointer-events-none absolute top-0 left-0 -z-10 aspect-square rounded-full [offset-path:rect(0_auto_auto_0_round_var(--radius))] animate-[border-beam-move_var(--beam-duration)_linear_infinite] motion-reduce:hidden`

Mapeamento tom → `--beam-color`:

| `tone`    | Token                     |
| --------- | ------------------------- |
| `primary` | `var(--primary)`          |
| `violet`  | `var(--highlight-violet)` |
| `sky`     | `var(--highlight-sky)`    |

Mapeamento velocidade → `--beam-duration`:

| `speed`  | Duração |
| -------- | ------- |
| `slow`   | `9s`    |
| `normal` | `6s`    |
| `fast`   | `3s`    |

---

## Tokens de design utilizados

| Token                         | Slot onde é usado                 |
| ----------------------------- | --------------------------------- |
| `--primary`                   | `tone="primary"` → `--beam-color` |
| `--highlight-violet`          | `tone="violet"`                   |
| `--highlight-sky`             | `tone="sky"`                      |
| `--radius`                    | `offset-path` round               |
| `radial-gradient(circle ...)` | background do brilho              |

---

## Escala tipográfica e de tamanho

Não se aplica (elemento decorativo). `size` controla `width` em px (padrão `80`), `height` segue `aspect-square`.

| Prop   | sm   | md   | lg                              |
| ------ | ---- | ---- | ------------------------------- |
| `size` | `60` | `80` | `120` (sugestão, não prescrito) |

---

## Comportamentos e estados

| Estado                           | Comportamento esperado                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Container sem `relative isolate` | Brilho pode escapar do stacking context — documentar `relative isolate` obrigatório |
| `prefers-reduced-motion`         | `motion-reduce:hidden` — elemento oculto                                            |
| `size` custom                    | `style.width = size`, `background: radial-gradient(...)` com `--beam-color`         |

---

## Acessibilidade

| Requisito          | Implementação                            |
| ------------------ | ---------------------------------------- |
| Decorativo         | `aria-hidden="true"`                     |
| Movimento reduzido | `motion-reduce:hidden`                   |
| Contraste          | Não afeta contraste de texto ( `-z-10` ) |

---

## Stories obrigatórias

- [ ] `Default` — `tone="primary" speed="normal" size=80` dentro de `Card relative isolate overflow-hidden`
- [ ] `AllTones` — `primary`, `violet`, `sky`
- [ ] `AllSpeeds` — `slow`, `normal`, `fast`
- [ ] `AllSizes` — `60`, `80`, `120`

---

## Checklist antes de implementar

- [x] `defaultVariants` declarado (`tone: "primary", speed: "normal"`)
- [x] `borderBeamVariants` exportado
- [x] Tokens via `var(--primary)` / `var(--highlight-*)`, sem hex hardcoded
- [x] `motion-reduce:hidden`
- [x] `cn()` para classes
- [x] `aria-hidden="true"` (decorativo)
