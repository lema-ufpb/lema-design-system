---
id: ds-feedback-widget
title: Feedback Widget
description: Um widget flutuante e interativo para coletar feedback de usuários, com suporte a notas e texto, animado com framer-motion.
category: Feedback
components: ds-feedback-widget
---

# Feedback Widget

Um widget flutuante projetado para ficar no canto da tela, permitindo que os usuários enviem feedback com rapidez. Ele começa como um pequeno botão circular e se expande suavemente para um mini-formulário ao ser clicado.

## Features

- **Expandable Form**: Animação de `layout` com framer-motion de um círculo para um painel arredondado.
- **States**: Controle de estado (idle, open, submitting, success).
- **Acessibilidade**: Foco entra no input, suporte a escape key.
- **Feedback Rating**: Botões de rating (ex: emojis ou rostos) antes de enviar o texto.

## Variantes (CVA)

| Prop       | Default   | Valores              | Descrição                  |
| ---------- | --------- | -------------------- | -------------------------- |
| `position` | `br`      | `bl`, `br`           | Posição do widget na tela. |
| `intent`   | `primary` | `default`, `primary` | Cor de destaque do FAB.    |

## Estrutura e Composição

- `<FeedbackWidget>` — Componente auto-contido. O usuário precisa apenas adicioná-lo na raiz do layout da aplicação.

## Dependências

- `framer-motion`
- `components/ui/button`
- `components/ui/textarea`
- `lucide-react`
