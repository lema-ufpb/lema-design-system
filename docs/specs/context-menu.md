# Spec: Context Menu

> Menu de contexto acionado por clique com botão direito.

---

## Propósito

Menu flutuante exibido ao clicar com o botão direito em um elemento, oferecendo ações contextuais como editar, deletar, copiar, etc.

**Usar quando:** O usuário precisa de acesso rápido a ações específicas do elemento alvo via clique direito.

**Não usar quando:** A ação principal deve ser acionada por clique normal (use DropdownMenu). Para lists de ações visíveis, use Item + ItemActions.

**Alternativa se não se aplicar:** `DropdownMenu` para menus acionados por clique; `Item` com `ItemActions` para ações visíveis em lista.

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ui/context-menu.tsx`     |
| Tipo       | `registry:ui` (name: `context-menu`) |
| Categoria  | Menu / Navegação                     |
| Depende de | `radix-ui`, `lucide-react`           |

---

## API — Props

| Prop                            | Tipo                                               | Padrão      | Obrigatória | Descrição                       |
| ------------------------------- | -------------------------------------------------- | ----------- | ----------- | ------------------------------- |
| `ContextMenu`                   | `ContextMenuPrimitive.Root.Props`                  | —           | —           | Root do context menu            |
| `ContextMenuTrigger`            | `ContextMenuPrimitive.Trigger.Props`               | —           | —           | Elemento alvo do clique direito |
| `ContextMenuContent.side`       | `"top" \| "right" \| "bottom" \| "left"`           | —           | —           | Lado de abertura                |
| `ContextMenuContent`            | `ContextMenuPrimitive.Content.Props`               | —           | —           | Conteúdo do menu                |
| `ContextMenuItem.variant`       | `"default" \| "destructive"`                       | `"default"` | —           | Variante visual                 |
| `ContextMenuItem.inset`         | `boolean`                                          | —           | —           | Aplica padding extra à esquerda |
| `ContextMenuItem`               | `ContextMenuPrimitive.Item.Props` + extras         | —           | —           | Item do menu                    |
| `ContextMenuCheckboxItem.inset` | `boolean`                                          | —           | —           | Padding extra à esquerda        |
| `ContextMenuCheckboxItem`       | `ContextMenuPrimitive.CheckboxItem.Props` + extras | —           | —           | Item com checkbox               |
| `ContextMenuRadioItem.inset`    | `boolean`                                          | —           | —           | Padding extra à esquerda        |
| `ContextMenuRadioItem`          | `ContextMenuPrimitive.RadioItem.Props` + extras    | —           | —           | Item de rádio                   |
| `ContextMenuSubTrigger.inset`   | `boolean`                                          | —           | —           | Padding extra à esquerda        |
| `ContextMenuSubTrigger`         | `ContextMenuPrimitive.SubTrigger.Props` + extras   | —           | —           | Gatilho de submenu              |
| `ContextMenuSubContent`         | `ContextMenuPrimitive.SubContent.Props`            | —           | —           | Conteúdo do submenu             |
| `ContextMenuLabel.inset`        | `boolean`                                          | —           | —           | Padding extra à esquerda        |
| `ContextMenuLabel`              | `ContextMenuPrimitive.Label.Props` + extras        | —           | —           | Rótulo do grupo                 |
| `ContextMenuSeparator`          | `ContextMenuPrimitive.Separator.Props`             | —           | —           | Divisor visual                  |
| `ContextMenuShortcut`           | `React.ComponentProps<"span">`                     | —           | —           | Atalho de teclado               |
| `ContextMenuGroup`              | `ContextMenuPrimitive.Group.Props`                 | —           | —           | Grupo de itens                  |
| `ContextMenuPortal`             | `ContextMenuPrimitive.Portal.Props`                | —           | —           | Portal                          |
| `ContextMenuSub`                | `ContextMenuPrimitive.Sub.Props`                   | —           | —           | Submenu                         |
| `ContextMenuRadioGroup`         | `ContextMenuPrimitive.RadioGroup.Props`            | —           | —           | Grupo de rádio                  |

---

## Tokens de design utilizados

| Token                                   | Slot                                          |
| --------------------------------------- | --------------------------------------------- |
| `--popover` / `--popover-foreground`    | `ContextMenuContent`, `ContextMenuSubContent` |
| `--accent` / `--accent-foreground`      | Item focus/hover                              |
| `--destructive`                         | Item `variant="destructive"`                  |
| `--destructive/10` / `--destructive/20` | Destructive item focus bg                     |
| `--border/50`                           | `ContextMenuSeparator`                        |
| `--muted-foreground`                    | `ContextMenuLabel`, `ContextMenuShortcut`     |
| `--ring` / `--ring/5`                   | Borda sutil do popup                          |

---

## Comportamentos e estados

| Estado          | Comportamento                                                     |
| --------------- | ----------------------------------------------------------------- |
| **Aberto**      | Menu exibido via portal com animação `animate-in fade-in zoom-in` |
| **Fechado**     | Animação `animate-out fade-out zoom-out`                          |
| **Focus/hover** | Item com `bg-accent text-accent-foreground`                       |
| **Disabled**    | Item com `data-disabled`: `pointer-events-none opacity-50`        |
| **Destructive** | Texto em `--destructive`, focus com bg `--destructive/10`         |
| **Inset**       | Padding extra à esquerda via `data-inset:pl-9.5`                  |
| **Submenu**     | `ContextMenuSubTrigger` com `ChevronRightIcon`, submenu aninhado  |

---

## Acessibilidade

| Requisito             | Implementação                                          |
| --------------------- | ------------------------------------------------------ |
| Rolagem nativa        | Radix UI gerencia foco e navegação por setas           |
| Navegação por teclado | Setas, Enter, Escape gerenciados pelo Radix UI         |
| ARIA                  | Gerenciado pelo Radix UI (menu, menuitem, submenu)     |
| Portal                | Conteúdo renderizado via `ContextMenuPrimitive.Portal` |

---

## Stories obrigatórias

- [x] `Default`
- [x] `CheckboxItems`
- [x] `RadioItems`

---

## Checklist

- [x] Trigger com clique direito
- [x] Itens com variante `default` e `destructive`
- [x] Suporte a inset para alinhamento visual
- [x] Checkbox items com indicador de seleção
- [x] Radio items com grupo
- [x] Submenus aninhados
- [x] Labels e separadores entre grupos
- [x] Shortcuts exibidos nos itens
- [x] Animações de entrada/saída
