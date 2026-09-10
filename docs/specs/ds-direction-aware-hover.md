# Spec: Direction Aware Hover

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `DirectionAwareHover` é um card interativo onde um overlay (normalmente com texto, botões ou gradiente) desliza para dentro do card exatamente a partir da borda por onde o cursor do mouse entrou, e sai pela borda por onde o cursor saiu.
**Usar quando:** Em galerias de imagens, showcases de portfólio, ou cartões de equipe (onde a foto revela o nome e cargo no hover).
**Não usar quando:** Para conteúdo que deve estar visível imediatamente (acessibilidade crítica sem hover) ou layouts muito apertados onde o overlay tamparia outras ações importantes permanentemente.
**Alternativa se não se aplicar:** Um simples `hover:opacity-100` em um overlay absoluto.

---

## Localização

| Campo      | Valor                                     |
| ---------- | ----------------------------------------- |
| Arquivo    | `components/ds/direction-aware-hover.tsx` |
| Tipo       | `registry:ui`                             |
| Categoria  | `Data Display` / `Delight`                |
| Depende de | (nenhum primitivo shadcn específico)      |

---

## API — Props

| Prop             | Tipo        | Padrão | Obrigatória | Descrição                    |
| ---------------- | ----------- | ------ | ----------- | ---------------------------- |
| `children`       | `ReactNode` | —      | ✓           | Conteúdo do overlay animado  |
| `imageSrc`       | `string`    | —      | ✓           | URL da imagem de fundo       |
| `imageAlt`       | `string`    | `""`   |             | Texto alternativo da imagem  |
| `className`      | `string`    | —      |             | Classes extras do container  |
| `imageClassName` | `string`    | —      |             | Classes extras para a imagem |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

Nenhuma variação estrutural pesada; a principal diferença é o uso customizado do layout através de className.

| Dimensão | Valores | Padrão |
| -------- | ------- | ------ |
| N/A      |         |        |

**Slots do componente**:

- `containerVariants` — wrapper relativo com overflow-hidden.
- `overlayVariants` — o conteúdo que será animado.

---

## Tokens de design utilizados

| Token              | Slot onde é usado           |
| ------------------ | --------------------------- |
| `bg-background/80` | Fundo do overlay (com blur) |
| `text-foreground`  | Texto dentro do overlay     |

---

## Escala tipográfica e de tamanho

N/A (o conteúdo `children` define sua própria tipografia).

---

## Comportamentos e estados

| Estado         | Comportamento esperado                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mouse Enter    | Calcula de qual borda (cima, direita, baixo, esquerda) o cursor entrou, e anima o overlay entrando dessa direção. A imagem sofre um pequeno scale-up (zoom). |
| Mouse Leave    | Calcula a borda de saída e anima o overlay deslizando para fora nessa direção. A imagem volta ao scale normal.                                               |
| Mobile / Touch | Em touch, o overlay deve aparecer ao primeiro tap, ou pode estar parcialmente visível, visto que não há evento de hover clássico.                            |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico | O container pode atuar como um grupo se tiver informações interativas, mas em geral o texto do overlay deve estar disponível para leitores de tela mesmo fora do hover (ex: `opacity-0` não tira do fluxo do leitor, ou renderiza sem `aria-hidden`). |
| Teclado        | O elemento deve reagir a `:focus-within` para revelar o overlay quando navegado via `Tab`.                                                                                                                                                            |

---

## Stories obrigatórias no Storybook

- [x] `Default` — um card de portfólio (foto + título no overlay).
- [x] `FocusWithin` — story simulando estado de foco para acessibilidade.

---

## Checklist antes de implementar

- [x] Escala tipográfica (N/A)
- [x] Tokens semânticos
- [x] `cn()` para todas as classes condicionais
- [x] Suporte a teclado via foco
