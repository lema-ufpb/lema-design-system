# Spec: Timeline

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/timeline.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Exibe uma lista de eventos, passos ou hitórico em ordem cronológica (ou sequencial) conectados por uma linha vertical.

**Usar quando:** Mostrar um histórico de alterações, passos de um processo, rastreamento de entregas ou logs de sistema de forma amigável.
**Não usar quando:** For um processo de passos que o usuário está ativamente preenchendo (use `Stepper` ou `Tabs`).

---

## Localização

| Campo      | Valor                        |
| ---------- | ---------------------------- |
| Arquivo    | `components/ds/timeline.tsx` |
| Tipo       | `registry:ui`                |
| Categoria  | `Data Display`               |
| Depende de | —                            |

---

## API — Props

O componente é construído com subcomponentes aninhados para máxima flexibilidade:

- `Timeline` — container principal.
- `TimelineItem` — cada passo da linha do tempo.
- `TimelineSeparator` — a linha vertical e o ponto/ícone.
- `TimelineDot` — o ponto (pode conter um ícone).
- `TimelineConnector` — a linha conectora.
- `TimelineContent` — o conteúdo (título, descrição, data).

| Prop de `TimelineItem` | Tipo                                                              | Padrão    | Descrição        |
| ---------------------- | ----------------------------------------------------------------- | --------- | ---------------- |
| `status`               | `default` \| `primary` \| `success` \| `warning` \| `destructive` | `default` | Cor de destaque. |

---

## Variantes CVA

| Slot           | Variantes                                                  |
| -------------- | ---------------------------------------------------------- |
| `TimelineDot`  | `status` (default, primary, success, warning, destructive) |
| `TimelineItem` | (Nenhuma)                                                  |

---

## Tokens de design utilizados

| Token                      | Slot onde é usado        |
| -------------------------- | ------------------------ |
| `border-border`            | Linha conectora          |
| `bg-muted`                 | Fundo do dot default     |
| `bg-primary`, `bg-success` | Cores do dot             |
| `text-muted-foreground`    | Texto secundário e datas |

---

## Comportamentos e estados

Não possui estados interativos nativos (é apenas para display), porém o usuário pode inserir links e botões no `TimelineContent`.

---

## Stories obrigatórias no Storybook

- [x] `Default` — Timeline simples com 3 itens (último sem linha).
- [x] `WithIcons` — Timeline onde o `TimelineDot` possui ícones da Lucide.
- [x] `StatusColors` — Itens com cores diferentes (success, destructive).
