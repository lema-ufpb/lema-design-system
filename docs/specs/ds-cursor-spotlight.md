# Spec: ds-cursor-spotlight

> Cursor Spotlight (glow radial que segue o ponteiro).

---

## Propósito

Contraparte **interativa** do `ds-background-glow`: em vez de um glow estático, projeta um destaque radial que acompanha a posição do cursor sobre o container. Inspirado nos blocos "Spotlight cursor hero", "Beam-of-light hero" e "Spotlight serif hero" do blockus.

**Usar quando:** Quiser um micro-interação de destaque ao passar o mouse sobre um hero/card (efeito comum em heroes estilo Vercel/Linear).
**Não usar quando:** Precisar de um glow decorativo estático — use `BackgroundGlow` (variantes `spotlight`/`beam`/`aurora`).

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/cursor-spotlight.tsx`        |
| Tipo       | `registry:ui` (name: `ds-cursor-spotlight`) |
| Categoria  | `Data Display`                              |
| Depende de | — (nenhum primitivo shadcn)                 |

---

## API — Props

| Prop       | Tipo                             | Padrão      | Descrição                             |
| ---------- | -------------------------------- | ----------- | ------------------------------------- |
| `tone`     | `"primary" \| "violet" \| "sky"` | `"primary"` | Cor do glow                           |
| `size`     | `number`                         | `500`       | Diâmetro do glow em pixels            |
| `children` | `React.ReactNode`                | —           | Conteúdo normal, renderizado por cima |

---

## Variantes CVA

| Dimensão | Valores                    | Padrão    |
| -------- | -------------------------- | --------- |
| `tone`   | `primary`, `violet`, `sky` | `primary` |

**Slots:** `cursorSpotlightVariants`.

---

## Tokens de design utilizados

| Token                     | Slot                         |
| ------------------------- | ---------------------------- |
| `var(--primary)`          | tone `primary` (via CSS var) |
| `var(--highlight-violet)` | tone `violet`                |
| `var(--highlight-sky)`    | tone `sky`                   |

---

## Comportamentos e estados

| Estado                           | Comportamento esperado                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `pointermove` sobre o container  | Atualiza `--x`/`--y` no layer de glow diretamente via DOM (sem re-render React)        |
| `pointerleave`                   | Glow desaparece (`opacity: 0`)                                                         |
| `prefers-reduced-motion: reduce` | Não reage ao ponteiro; mostra um glow estático e discreto (`motion-reduce:opacity-20`) |

---

## Acessibilidade

| Requisito          | Implementação                                                   |
| ------------------ | --------------------------------------------------------------- |
| Glow decorativo    | `aria-hidden="true"` no layer de glow                           |
| Conteúdo normal    | `children` renderizados normalmente, sem alteração de semântica |
| Movimento reduzido | Respeitado via `prefers-reduced-motion` (ver acima)             |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllTones`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas (via CSS custom properties)
- [x] `defaultVariants` no `cva()`
- [x] `*Variants` exportado
- [x] `prefers-reduced-motion` respeitado
- [x] Sem `aria-live`/anúncios (efeito puramente visual)
