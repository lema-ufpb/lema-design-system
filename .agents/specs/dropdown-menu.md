# Spec: Dropdown Menu

> Menu popover acionado por botão com lista de ações.

---

## Propósito

Menu flutuante que exibe uma lista de ações ou opções quando acionado por clique em um elemento gatilho.

**Usar quando:** É necessário agrupar múltiplas ações relacionadas em um espaço compacto, acionado por botão.

**Não usar quando:** As ações devem estar sempre visíveis (use Button ou ItemActions). Para clique direito, use ContextMenu.

**Alternativa se não se aplicar:** `ContextMenu` para clique direito; `Item` com `ItemActions` para ações visíveis em lista.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/dropdown-menu.tsx` |
| Tipo | `registry:ui` (name: `dropdown-menu`) |
| Categoria | Menu / Navegação |
| Depende de | `radix-ui`, `lucide-react` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `DropdownMenu` | `DropdownMenuPrimitive.Root.Props` | — | — | Root do dropdown |
| `DropdownMenuPortal` | `DropdownMenuPrimitive.Portal.Props` | — | — | Portal |
| `DropdownMenuTrigger` | `DropdownMenuPrimitive.Trigger.Props` | — | — | Gatilho |
| `DropdownMenuContent.align` | `"start" \| "center" \| "end"` | `"start"` | — | Alinhamento |
| `DropdownMenuContent.sideOffset` | `number` | `4` | — | Distância do gatilho |
| `DropdownMenuContent` | `DropdownMenuPrimitive.Content.Props` | — | — | Conteúdo do menu |
| `DropdownMenuGroup` | `DropdownMenuPrimitive.Group.Props` | — | — | Grupo de itens |
| `DropdownMenuItem.variant` | `"default" \| "destructive"` | `"default"` | — | Variante visual |
| `DropdownMenuItem.inset` | `boolean` | — | — | Padding extra à esquerda |
| `DropdownMenuItem` | `DropdownMenuPrimitive.Item.Props` + extras | — | — | Item do menu |
| `DropdownMenuCheckboxItem.inset` | `boolean` | — | — | Padding extra |
| `DropdownMenuCheckboxItem` | `DropdownMenuPrimitive.CheckboxItem.Props` + extras | — | — | Item com checkbox |
| `DropdownMenuRadioGroup` | `DropdownMenuPrimitive.RadioGroup.Props` | — | — | Grupo de rádio |
| `DropdownMenuRadioItem.inset` | `boolean` | — | — | Padding extra |
| `DropdownMenuRadioItem` | `DropdownMenuPrimitive.RadioItem.Props` + extras | — | — | Item de rádio |
| `DropdownMenuLabel.inset` | `boolean` | — | — | Padding extra |
| `DropdownMenuLabel` | `DropdownMenuPrimitive.Label.Props` + extras | — | — | Rótulo |
| `DropdownMenuSeparator` | `DropdownMenuPrimitive.Separator.Props` | — | — | Divisor |
| `DropdownMenuShortcut` | `React.ComponentProps<"span">` | — | — | Atalho |
| `DropdownMenuSub` | `DropdownMenuPrimitive.Sub.Props` | — | — | Submenu |
| `DropdownMenuSubTrigger.inset` | `boolean` | — | — | Padding extra |
| `DropdownMenuSubTrigger` | `DropdownMenuPrimitive.SubTrigger.Props` + extras | — | — | Gatilho de submenu |
| `DropdownMenuSubContent` | `DropdownMenuPrimitive.SubContent.Props` | — | — | Conteúdo do submenu |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` / `--popover-foreground` | `DropdownMenuContent` |
| `--accent` / `--accent-foreground` | Item focus/hover |
| `--border/50` | `DropdownMenuSeparator` |
| `--muted-foreground` | `DropdownMenuShortcut`, `DropdownMenuLabel` |
| `--destructive` / `--destructive/10` | Item `variant="destructive"` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Aberto** | Menu via portal com animação `animate-in fade-in zoom-in` |
| **Fechado** | `animate-out fade-out zoom-out` |
| **Focus/hover** | Item com `bg-accent text-accent-foreground` |
| **Disabled** | `data-disabled`: `pointer-events-none opacity-50` |
| **Destructive** | Texto `--destructive`, focus bg `--destructive/10` |
| **Inset** | Padding extra via `data-inset:pl-9.5` |
| **Submenu** | SubTrigger com `ChevronRightIcon`, submenu aninhado |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | Radix UI gerencia navegação por setas |
| Navegação por teclado | Setas, Enter, Escape |
| ARIA | Gerenciado pelo Radix UI (menu, menuitem) |
| Portal | Conteúdo via `DropdownMenuPrimitive.Portal` |

---

## Stories obrigatórias

- [x] `Default`
- [x] `WithSubmenus`

---

## Checklist

- [x] Trigger personalizável via `asChild`
- [x] Itens com variante `default` e `destructive`
- [x] Suporte a `inset` para alinhamento visual
- [x] Checkbox items com `CheckIcon`
- [x] Radio items com grupo
- [x] Submenus aninhados
- [x] Labels e separadores
- [x] Shortcuts nos itens
- [x] Animações de entrada/saída
