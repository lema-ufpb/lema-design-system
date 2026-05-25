# Spec: Slider

> Controle de intervalo deslizante para seleção de valor único ou faixa de valores.

---

## Propósito

**Usar quando:** O usuário precisa selecionar um valor numérico ou uma faixa de valores dentro de um mínimo e máximo definidos, como volume, preço, data ou qualquer escala contínua.

**Não usar quando:** O valor é exato e deve ser digitado (usar Input ou Select). Há apenas opções discretas e fixas (usar Radio Group ou Select).

**Alternativa:** Input numérico com validação, Select de faixas predefinidas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/slider.tsx` |
| Tipo | `registry:ui` (name: `slider`) |
| Categoria | Formulário / Entrada |
| Depende de | `radix-ui` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `defaultValue` | `number[]` | — | Não | Array com valor(es) inicial(is) do(s) polegar(es) |
| `value` | `number[]` | — | Não | Valor(es) controlado(s) |
| `min` | `number` | `0` | Não | Valor mínimo do intervalo |
| `max` | `number` | `100` | Não | Valor máximo do intervalo |
| `step` | `number` | — | Não | Incremento entre valores |
| `disabled` | `boolean` | — | Não | Desabilita a interação |
| `orientation` | `"horizontal" \| "vertical"` | — | Não | Orientação do slider |
| `className` | `string` | — | Não | Classes adicionais |

Demais props são herdadas de `SliderPrimitive.Root`.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--input / 90%` | Track de fundo |
| `--primary` | Range preenchido |
| `--white` | Thumb (polegar) |
| `--ring / 30%` | Anel de foco/hover do thumb |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Normal** | Track horizontal com range na cor primária e thumbs arredondados |
| **Hover (thumb)** | `ring-4 ring-ring/30` |
| **Focus (thumb)** | `ring-4 ring-ring/30` + `outline-hidden` |
| **Disabled** | `opacity-50` + `pointer-events-none` |
| **Range (multi-thumb)** | Dois thumbs com range preenchido entre eles |
| **Vertical** | Track vertical com `data-vertical:h-full data-vertical:w-2`, thumbs e layout vertical |
| **Com steps** | Thumb snap aos valores do `step` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Navegação por teclado | Radix Slider — setas direcionais, Home/End, PageUp/PageDown |
| ARIA roles | `role="slider"` nativo do Radix, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` |
| Foco visível | `focus-visible:ring-4 focus-visible:ring-ring/30` |

---

## Stories obrigatórias

- [x] `Default` — thumb único em 50
- [x] `Range` — dois thumbs (25, 75)
- [x] `WithSteps` — step de 2, thumb único
- [x] `Disabled` — desabilitado em 40

---

## Checklist

- [x] Componente implementado em `slider.tsx`
- [x] Stories implementadas (Default, Range, WithSteps, Disabled)
- [x] Usa `data-slot` em Root, Track, Range e Thumb
- [x] Tokens semânticos (`--input`, `--primary`, `--ring`, `--white`)
- [x] Suporte a orientação vertical via `data-vertical`
