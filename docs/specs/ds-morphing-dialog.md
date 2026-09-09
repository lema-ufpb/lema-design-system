---
id: ds-morphing-dialog
title: Morphing Dialog
description: Um card que se expande para um dialog completo usando framer-motion shared layout.
category: Layout
components: ds-morphing-dialog
---

# Morphing Dialog

Um componente interativo que utiliza o `layoutId` do Framer Motion para transicionar suavemente um elemento menor (como um card) para um modal/diálogo maior no centro da tela, criando uma sensação física de expansão de superfície.

## Features

- **Shared Element Transition**: Elementos com `layoutId` correspondente animam suas posições e tamanhos na tela perfeitamente.
- **Backdrop**: Fundo escurecido que aparece ao expandir o diálogo.
- **Acessibilidade**: Foco preso (focus trap) e fechamento via `Escape`.
- **Fácil uso**: Wrappers simples para montar o conteúdo (`Trigger`, `Content`, `Title`, `Description`, `Image`, etc).

## Estrutura e Composição

A API é inspirada em bibliotecas de UI baseadas em contexto.

- `<MorphingDialog>`: Wrapper que provê o contexto.
- `<MorphingDialogTrigger>`: Elemento que o usuário clica para abrir.
- `<MorphingDialogContainer>`: Container do diálogo aberto.
- `<MorphingDialogClose>`: Botão de fechar.
- Elementos genéricos (`Image`, `Title`, `Subtitle`, `Description`) que compartilham `layoutId` nativamente se envoltos no contexto correto.

## Dependências

- `framer-motion`
- `lucide-react`
- `components/ui/button`
