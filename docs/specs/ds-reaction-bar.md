---
id: ds-reaction-bar
title: Reaction Bar
description: Uma barra de reações interativa para engajamento rápido em conteúdo.
category: Actions
components: ds-reaction-bar
---

# Reaction Bar

Um componente em formato de pílula (pill) que mostra a principal ação (ex: curtir) e, ao passar o mouse ou focar, revela um menu flutuante com reações adicionais. Perfeito para blogs, feeds sociais ou sistemas de comentários corporativos.

## Features

- **Expandable Hover**: A barra se expande ou mostra um tooltip com mais reações ao sofrer interações (hover/focus).
- **Smooth Animations**: Framer-motion gerencia as transições das reações entrando em cena.
- **Acessível**: Focusable via teclado, com papéis apropriados (`group`, `aria-label`, `aria-pressed`).
- **Estado Controlado**: Pode receber e mostrar a reação atual do usuário (se houver).

## Variantes (CVA)

| Prop     | Default   | Valores              | Descrição                               |
| -------- | --------- | -------------------- | --------------------------------------- |
| `size`   | `md`      | `sm`, `md`, `lg`     | O tamanho do botão principal e do menu. |
| `intent` | `default` | `default`, `primary` | A intenção visual do botão inativo.     |

## Estrutura e Composição

- `<ReactionBar>`

## Dependências

- `framer-motion`
- `lucide-react`
- `components/ui/button`
- `cn` e `cva`
