# Spec: Scratch to Reveal

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `ScratchToReveal` fornece uma experiência gamificada, onde o usuário usa o mouse ou o dedo (touch) para "raspar" uma camada de bloqueio e revelar o que está por baixo.
**Usar quando:** Campanhas promocionais, cupons de desconto, revelações de novidades e gamificação dentro do SaaS.
**Não usar quando:** A informação contida for crítica e deva estar acessível instantaneamente para todos os usuários, sem fricção.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/scratch-to-reveal.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Delight` / `SaaS`                    |
| Depende de | Nenhum (usa `canvas` nativo do HTML5) |

---

## API — Props

| Prop              | Tipo              | Padrão      | Obrigatória | Descrição                                                 |
| ----------------- | ----------------- | ----------- | ----------- | --------------------------------------------------------- |
| `children`        | `React.ReactNode` | —           | ✓           | Conteúdo secreto a ser revelado.                          |
| `width`           | `number`          | `300`       |             | Largura em px do componente.                              |
| `height`          | `number`          | `150`       |             | Altura em px do componente.                               |
| `brushSize`       | `number`          | `20`        |             | Tamanho do "pincel" ao raspar.                            |
| `revealThreshold` | `number`          | `50`        |             | Porcentagem raspada (0-100) para disparar o auto-revelar. |
| `onReveal`        | `() => void`      | —           |             | Callback chamado quando o limite for atingido.            |
| `coverColor`      | `string`          | `"#e5e7eb"` |             | Cor de fundo da camada protetora (hex/rgba).              |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

O componente foca na interação e aceita tamanhos através das props `width` e `height`, além de estilização flexível por `className`.

---

## Tokens de design utilizados

| Token | Slot onde é usado                                                  |
| ----- | ------------------------------------------------------------------ |
| N/A   | Aceita injeção via `className` para o container do texto revelado. |

---

## Escala tipográfica e de tamanho

Ajustável via container.

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicialização       | O canvas é desenhado sobre o conteúdo. O conteúdo subjacente fica "escondido" visualmente atrás dele (z-index).                                                 |
| Scratching          | Mouse move / Touch move usam `globalCompositeOperation = "destination-out"` no canvas para apagar os pixels sob o ponteiro.                                     |
| Threshold Alcançado | Quando o usuário apaga mais de X% dos pixels (checando via `getImageData`), a classe `opacity-0` é adicionada ao canvas com transição suave, revelando o resto. |
| Reduced Motion      | O canvas deve ser ignorado e revelar o texto imediatamente para quem prefere movimento reduzido? Sim.                                                           |

---

## Acessibilidade

| Requisito         | Implementação                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Leitura de Tela   | O texto/conteúdo escondido **não** deve estar oculto na árvore de acessibilidade. Leitores de tela podem ler o conteúdo secreto normalmente (já que ele está no DOM abaixo do canvas). |
| Interação Teclado | Como fallback, vamos adicionar um botão `sr-only` ("Revelar conteúdo") para usuários de teclado poderem acionar o `onReveal` sem mouse.                                                |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Revelando um cupom "BEMVINDO20".

---

## Checklist antes de implementar

- [x] Prevenir default drag do browser durante o touch no canvas.
- [x] Otimizar a verificação do limite (não verificar a cada pixel, talvez a cada _mouse up_ ou throttled).
- [x] Usar useRef para não causar re-renders durante a movimentação do mouse.
