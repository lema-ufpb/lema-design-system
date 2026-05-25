# Spec: Command

> Paleta de comandos rápida e buscável com navegação por teclado.

---

## Propósito

Interface de paleta de comandos que permite busca e seleção de ações, atalhos ou navegação via teclado, podendo ser renderizada inline ou em modal.

**Usar quando:** O usuário precisa pesquisar e executar comandos, navegar entre seções ou acionar ações rapidamente pelo teclado.

**Não usar quando:** A interação esperada é um menu下拉 comum com clique (use DropdownMenu). Para autocomplete de formulário, use Combobox.

**Alternativa se não se aplicar:** `DropdownMenu` para menus aninhados; `Combobox` para seleção com busca em formulários.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/command.tsx` |
| Tipo | `registry:ui` (name: `command`) |
| Categoria | Navegação / Paleta de comandos |
| Depende de | `cmdk`, `dialog`, `input-group`, `ui-i18n` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Command` | `CommandPrimitive.Props` | — | — | Root do comando |
| `CommandDialog.title` | `string` | `"Command Palette"` | — | Título do dialog (sr-only) |
| `CommandDialog.description` | `string` | `"Search for a command to run..."` | — | Descrição do dialog (sr-only) |
| `CommandDialog.showCloseButton` | `boolean` | `false` | — | Exibe botão de fechar no dialog |
| `CommandDialog` | `Dialog.Props` + extras | — | — | Dialog wrapper para paleta |
| `CommandInput` | `CommandPrimitive.Input.Props` | — | — | Campo de busca |
| `CommandList` | `CommandPrimitive.List.Props` | — | — | Lista de resultados |
| `CommandEmpty` | `CommandPrimitive.Empty.Props` | — | — | Estado vazio |
| `CommandGroup` | `CommandPrimitive.Group.Props` | — | — | Grupo de itens |
| `CommandItem` | `CommandPrimitive.Item.Props` | — | — | Item selecionável |
| `CommandSeparator` | `CommandPrimitive.Separator.Props` | — | — | Divisor entre grupos |
| `CommandShortcut` | `React.ComponentProps<"span">` | — | — | Atalho de teclado |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` / `--popover-foreground` | `Command` (fundo e texto da paleta) |
| `--muted` / `--foreground` | `CommandItem` (selected/hover) |
| `--muted-foreground` | `CommandShortcut`, `CommandGroup` heading, `CommandEmpty` |
| `--input/50` | Wrapper do `CommandInput` |
| `--border/50` | `CommandSeparator` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Aberto** | `CommandDialog` exibe modal com overlay |
| **Fechado** | Dialog fechado via Escape ou clique no overlay |
| **Selecionado** | Item com `data-selected` aplica `bg-muted text-foreground` |
| **Disabled** | Item com `data-disabled`: `pointer-events-none opacity-50` |
| **Empty** | `CommandEmpty` exibe mensagem quando nenhum resultado |
| **Shortcut** | `CommandShortcut` exibido à direita do item |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | `cmdk` gerencia navegação por setas |
| Navegação por teclado | Setas, Enter, Escape gerenciados pelo `cmdk` |
| ARIA | Gerenciado pelo `cmdk` (combobox, listbox, option) |
| Dialog modal | `CommandDialog` usa `Dialog` do Radix UI com `DialogTitle`/`DialogDescription` sr-only |

---

## Stories obrigatórias

- [x] `Default`
- [x] `WithIcons`
- [x] `Empty`
- [x] `WithoutDialog`

---

## Checklist

- [ ] Renderização inline (`Command`) e modal (`CommandDialog`)
- [ ] Busca com filtro automático via `cmdk`
- [ ] Grupos com headings e separadores
- [ ] Shortcuts exibidos nos itens
- [ ] Estado empty quando sem resultados
- [ ] CheckIcon em itens com `data-checked`
