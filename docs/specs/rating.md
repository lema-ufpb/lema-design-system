# Spec: Rating

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/rating.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Permite que o usuário insira ou visualize uma avaliação quantitativa baseada em ícones (geralmente estrelas).
Útil para formulários de feedback, resenhas, pontuações de desempenho, etc.

**Usar quando:** Precisar coletar ou exibir uma nota em uma escala discreta e visual (ex: 1 a 5 estrelas).
**Não usar quando:** A pontuação for contínua ou com alta granularidade (use um `Slider` ou `Input` numérico) ou quando representar apenas uma barra de progresso.
**Alternativa se não se aplicar:** `ScoreRow` ou `Slider`.

---

## Localização

| Campo      | Valor                      |
| ---------- | -------------------------- |
| Arquivo    | `components/ds/rating.tsx` |
| Tipo       | `registry:ui`              |
| Categoria  | `Data Display` / `Form`    |
| Depende de | (Lucide React Icons)       |

---

## API — Props

| Prop       | Tipo                      | Padrão     | Obrigatória | Descrição                                       |
| ---------- | ------------------------- | ---------- | ----------- | ----------------------------------------------- |
| `value`    | `number`                  | `0`        | ✓           | Valor atual da avaliação.                       |
| `max`      | `number`                  | `5`        |             | Valor máximo da escala.                         |
| `size`     | `"sm" \| "md" \| "lg"`    | `"md"`     |             | Tamanho das estrelas.                           |
| `readonly` | `boolean`                 | `false`    |             | Se `true`, torna a avaliação apenas de leitura. |
| `disabled` | `boolean`                 | `false`    |             | Desabilita a interação.                         |
| `icon`     | `ElementType`             | `StarIcon` |             | Ícone customizado (opcional).                   |
| `onChange` | `(value: number) => void` | —          |             | Callback acionado na mudança de valor.          |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots do componente**:

- `ratingVariants` — wrapper externo (flex, gap).
- `starVariants` — cada ícone.

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                              |
| ----------------------- | ---------------------------------------------- |
| `text-warning`          | Cor de preenchimento para as estrelas ativas   |
| `text-muted`            | Cor de preenchimento para as estrelas inativas |
| `text-muted-foreground` | Bordas/outline                                 |
| `opacity-50`            | Estado `disabled`                              |

---

## Escala tipográfica e de tamanho

| Slot         | sm       | md        | lg       |
| ------------ | -------- | --------- | -------- |
| Ícone (Star) | `size-4` | `size-5`  | `size-6` |
| Gap          | `gap-1`  | `gap-1.5` | `gap-2`  |

---

## Comportamentos e estados

| Estado            | Comportamento esperado                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| `readonly={true}` | Renderiza as estrelas sem interatividade (sem focus/hover).                 |
| `disabled={true}` | Renderiza com `opacity-50` e sem pointer-events.                            |
| Hover na estrela  | A estrela sob o mouse e as anteriores recebem destaque temporário de hover. |

---

## Acessibilidade

| Requisito      | Implementação                                                                             |
| -------------- | ----------------------------------------------------------------------------------------- |
| Role semântico | `<div role="radiogroup">` e cada estrela como `<button role="radio">` (quando interativo) |
| Teclado        | Setas para navegar, Espaço/Enter para selecionar.                                         |
| Foco           | `focus-visible:ring` nos botões.                                                          |
| Leitor de Tela | `aria-label` geral e `aria-checked` para as opções.                                       |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado interativo 3/5.
- [x] `Readonly` — estado apenas de leitura.
- [x] `AllSizes` — sm, md, lg.
- [x] `Disabled` — `disabled={true}`.
