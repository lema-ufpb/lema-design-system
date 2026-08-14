# Spec: Spinner

> Indicador de carregamento animado para estados de processamento assíncrono.

---

## Propósito

**Usar quando:** Uma operação assíncrona está em andamento (carregamento de dados, envio de formulário, processamento) e é necessário um feedback visual leve e inline.

**Não usar quando:** O carregamento ocupa a página inteira (usar Skeleton ou overlay de loading). A operação leva mais que alguns segundos (combinar com barra de progresso).

**Alternativa:** `Skeleton` para esqueletos de layout, `Progress` para barra de progresso determinística.

---

## Localização

| Campo      | Valor                           |
| ---------- | ------------------------------- |
| Arquivo    | `components/ui/spinner.tsx`     |
| data-slot  | `spinner`                       |
| Tipo       | `registry:ui` (name: `spinner`) |
| Categoria  | Feedback / Indicador            |
| Depende de | `lucide-react`                  |

---

## API — Props

| Prop        | Tipo                          | Padrão | Obrigatória | Descrição                                           |
| ----------- | ----------------------------- | ------ | ----------- | --------------------------------------------------- |
| `className` | `string`                      | —      | Não         | Classes adicionais (útil para `size-*` customizado) |
| `...props`  | `React.ComponentProps<"svg">` | —      | Não         | Props nativas SVG                                   |

---

## Tokens de design

| Token           | Slot                                             |
| --------------- | ------------------------------------------------ |
| `currentColor`  | Cor do ícone (herdada do texto do container pai) |
| `size-4` (16px) | Tamanho padrão                                   |

---

## Comportamentos e estados

| Estado           | Comportamento                                                |
| ---------------- | ------------------------------------------------------------ |
| **Default**      | `Loader2Icon` com `animate-spin`, `size-4`, cor do texto pai |
| **Custom size**  | Ajustável via `className` (ex: `size-3`, `size-6`, `size-8`) |
| **Em contexto**  | Acompanhado de texto de loading com `text-muted-foreground`  |
| **Apenas ícone** | Pode ser usado sem texto adjacente                           |

---

## Acessibilidade

| Requisito          | Implementação                                                 |
| ------------------ | ------------------------------------------------------------- |
| Role               | `role="status"`                                               |
| Rótulo             | `aria-label="Loading"`                                        |
| Movimento reduzido | `animate-spin` respeita `prefers-reduced-motion` via Tailwind |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `Sizes` — Sizes
- [x] `InButton` — In Button
- [x] `CustomColor` — Custom Color

## Checklist

- [x] Componente implementado em `spinner.tsx`
- [x] Stories implementadas (Default, LocalePTBR, Sizes, InButton, CustomColor)
- [x] Usa `Loader2Icon` do lucide-react
- [x] `role="status"` + `aria-label="Loading"`
- [x] Herda cor via `currentColor`
