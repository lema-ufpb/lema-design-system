---
id: ds-radial-menu
title: Radial Menu
description: Um menu circular (pie menu) que distribui suas ações ao redor de um botão central.
category: Actions
components: ds-radial-menu
---

# Radial Menu

Um menu circular que aparece ao redor de um botão flutuante ou do cursor, distribuindo os ícones de ação em 360, 180 ou 90 graus. Ideal para acelerar ações frequentes de usuários power-users ou interfaces focadas no mouse.

## Features

- **Distribuição Matemática**: Posiciona os itens perfeitamente baseando-se no raio e no ângulo total configurados.
- **Animações com Stagger**: O Framer Motion revela os itens um a um de forma fluida.
- **Acessibilidade**: Apesar de visualmente radial, navega sequencialmente pelo teclado (Focus trap).

## Variantes (CVA)

| Prop   | Default | Valores          | Descrição                     |
| ------ | ------- | ---------------- | ----------------------------- |
| `size` | `md`    | `sm`, `md`, `lg` | O tamanho dos botões do menu. |

## Estrutura e Composição

- `<RadialMenu>`: Context provider e wrapper principal.
- `<RadialMenuTrigger>`: O botão central.
- `<RadialMenuContent>`: Container dos itens.
- `<RadialMenuItem>`: Cada item individual do menu.

## Dependências

- `framer-motion`
- `lucide-react`
- `components/ui/button`
- `cn` e `cva`
