# Spec: Text Scramble

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `TextScramble` (ou Text Decode) cria uma animação onde as letras do texto original mudam freneticamente para caracteres aleatórios (estilo hacker/cyberpunk) antes de revelar a string final da esquerda para a direita.
**Usar quando:** Quiser dar um toque high-tech a headings de landing pages, ou revelar senhas/códigos promocionais.
**Não usar quando:** Em textos longos (como parágrafos) ou onde a legibilidade imediata seja indispensável.
**Alternativa se não se aplicar:** `Typewriter` ou apenas texto estático.

---

## Localização

| Campo      | Valor                             |
| ---------- | --------------------------------- |
| Arquivo    | `components/ds/text-scramble.tsx` |
| Tipo       | `registry:ui`                     |
| Categoria  | `Data Display` / `Delight`        |
| Depende de | Nenhum                            |

---

## API — Props

| Prop         | Tipo      | Padrão                    | Obrigatória | Descrição                               |
| ------------ | --------- | ------------------------- | ----------- | --------------------------------------- |
| `children`   | `string`  | —                         | ✓           | O texto final a ser revelado            |
| `characters` | `string`  | (alfanumérico e símbolos) |             | Caracteres usados no scramble           |
| `speed`      | `number`  | `50`                      |             | Milissegundos entre as trocas de frames |
| `trigger`    | `boolean` | `true`                    |             | Gatilho para (re)iniciar a animação     |
| `className`  | `string`  | —                         |             | Classes para o wrapper                  |
| `asChild`    | `boolean` | `false`                   |             | Se o wrapper é mesclado                 |

> Estender `HTMLAttributes<HTMLSpanElement>`.

---

## Variantes CVA

Este componente não possui variações baseadas em tamanho (tamanho é herdado do CSS ao redor).

| Dimensão | Valores | Padrão |
| -------- | ------- | ------ |
| N/A      |         |        |

---

## Tokens de design utilizados

| Token | Slot onde é usado          |
| ----- | -------------------------- |
| N/A   | Herda as cores do contexto |

---

## Escala tipográfica e de tamanho

N/A (herda tipografia do contêiner). A fonte `font-mono` é recomendada para o efeito ficar mais realista, mas não obrigatória internamente.

---

## Comportamentos e estados

| Estado               | Comportamento esperado                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Inicialização        | Revela o texto assim que `trigger` for verdadeiro, mantendo a largura final para evitar layout shifts. |
| Redução de Movimento | Se `prefers-reduced-motion` ativo, apenas exibe o texto imediatamente sem a animação de scramble.      |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico | Exibe um `<span>` normal, mas para leitores de tela a string real deve estar acessível imediatamente. Para evitar que leitores de tela leiam caracteres zoados (ex: "@#%X"), usamos `aria-hidden` na versão visível/animada e o texto original em `.sr-only`. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — rodando num h1 simples.
- [x] `Trigger` — disparado apenas com clique ou hover.

---

## Checklist antes de implementar

- [x] `aria-hidden` na animação
- [x] `sr-only` para a versão acessível
- [x] `prefers-reduced-motion` respeitado
- [x] `tabular-nums` recomendado para monospace onde aplicável
