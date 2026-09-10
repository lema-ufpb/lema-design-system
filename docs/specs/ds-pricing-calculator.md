# Spec: Pricing Calculator

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `PricingCalculator` é um componente visual interativo (geralmente lado a lado ou card destacado) que permite aos usuários calcular um orçamento baseado em variáveis como "Número de usuários", "Espaço de armazenamento" ou ciclos de faturamento (mensal/anual).
**Usar quando:** Você possui um produto SaaS com precificação baseada em volume/escala.
**Não usar quando:** Os planos são estáticos e fixos (use um simples `PricingCard`).

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/pricing-calculator.tsx` |
| Tipo       | `registry:ui`                          |
| Categoria  | `Data Display` / `SaaS`                |
| Depende de | `Slider`, `Switch` (shadcn)            |

---

## API — Props

| Prop        | Tipo     | Padrão       | Obrigatória | Descrição                              |
| ----------- | -------- | ------------ | ----------- | -------------------------------------- |
| `basePrice` | `number` | `0`          | ✓           | Preço inicial.                         |
| `unitLabel` | `string` | `"usuários"` | ✓           | Ex: "usuários", "requisições".         |
| `unitPrice` | `number` | `10`         | ✓           | Preço por unidade.                     |
| `maxUnits`  | `number` | `100`        | ✓           | Limite máximo do slider.               |
| `step`      | `number` | `1`          |             | Incremento do slider.                  |
| `discount`  | `number` | `20`         |             | Porcentagem de desconto (plano anual). |
| `currency`  | `string` | `"R$"`       |             | Moeda do componente.                   |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

Nenhuma variante de estilo pré-definida. O layout será fluido e responsivo.

---

## Tokens de design utilizados

| Token                              | Slot onde é usado             |
| ---------------------------------- | ----------------------------- |
| `bg-card` / `text-card-foreground` | Superfície base do componente |
| `text-primary`                     | Valor final do preço e slider |
| `border-border`                    | Divisores de layout           |

---

## Escala tipográfica e de tamanho

O valor de preço principal deve ser massivo (`text-5xl` ou superior) e com numerais tabulares (`tabular-nums`) para evitar trepidação enquanto o slider se move.

---

## Comportamentos e estados

| Estado        | Comportamento esperado                                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Sliding       | Valor numérico (R$) e número de unidades mudam em tempo real. O número usa animação com framer-motion se possível, ou só atualização rápida. |
| Toggle Annual | Aciona o desconto se verdadeiro, recalculando o valor exibido e sublinhando a palavra "Anual" com um badge de economia.                      |

---

## Acessibilidade

| Requisito   | Implementação                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Focus       | O slider (input range subjacente) e o Switch devem ser focáveis.                                                                  |
| Live Region | (Opcional) O valor total pode possuir `aria-live="polite"` se for muito complexo de encontrar visualmente para um leitor de tela. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Mostra o card configurado para B2B SaaS (ex: cálculo de MAU - Monthly Active Users).

---

## Checklist antes de implementar

- [x] Instalar ou garantir que `Slider` e `Switch` existem (`npx shadcn@latest add slider switch`). No nosso caso, já vamos importar de `@/components/ui/slider` e `@/components/ui/switch`.
- [x] Tratar valores que resultam em dízimas periódicas.
- [x] O botão CTA deve estar presente.
