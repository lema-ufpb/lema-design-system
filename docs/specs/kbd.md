# Spec: Kbd

> Indicador estilizado de atalho de teclado.

---

## Propósito

Elemento inline que exibe atalhos de teclado (ex.: ⌘K, ⌘S) em menus, tooltips, command palettes e input groups, com adaptação de cor conforme o contexto.

**Usar quando:** É necessário exibir combinações de teclas para atalhos de teclado na interface.

**Não usar quando:** O atalho faz parte de um texto descritivo longo (use `<kbd>` nativo estilizado manualmente).

**Alternativa se não se aplicar:** `CommandShortcut` para atalhos em Command; `DropdownMenuShortcut` para atalhos em DropdownMenu; `ContextMenuShortcut` para atalhos em ContextMenu.

---

## Localização

| Campo      | Valor                       |
| ---------- | --------------------------- |
| Arquivo    | `components/ui/kbd.tsx`     |
| Tipo       | `registry:ui` (name: `kbd`) |
| Categoria  | Data display                |
| Depende de | Nenhum                      |

---

## API — Props

| Prop       | Tipo                          | Padrão | Obrigatória | Descrição                   |
| ---------- | ----------------------------- | ------ | ----------- | --------------------------- |
| `Kbd`      | `React.ComponentProps<"kbd">` | —      | —           | Elemento `<kbd>` estilizado |
| `KbdGroup` | `React.ComponentProps<"div">` | —      | —           | Grupo de teclas             |

---

## Tokens de design utilizados

| Token                           | Slot                              |
| ------------------------------- | --------------------------------- |
| `--muted`                       | Fundo do KBD                      |
| `--muted-foreground`            | Texto do KBD                      |
| `--input`                       | Fundo quando dentro de InputGroup |
| `--background` / `--foreground` | Adaptação para Tooltip            |

---

## Comportamentos e estados

| Estado            | Comportamento                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **Default**       | `bg-muted`, `text-muted-foreground`, `rounded-lg`                                                |
| **Em InputGroup** | `in-data-[slot=input-group]:bg-input` (fundo mais escuro)                                        |
| **Em Tooltip**    | `in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background` |
| **Grupo**         | `KbdGroup` com `inline-flex gap-1` para agrupar teclas                                           |

---

## Acessibilidade

| Requisito       | Implementação                                               |
| --------------- | ----------------------------------------------------------- |
| Rolagem nativa  | Elemento semântico `<kbd>`                                  |
| Leitura de tela | Leitores de tela reconhecem `<kbd>` como entrada de teclado |

---

## Stories obrigatórias

- [x] `Default`
- [x] `Group`
- [x] `SingleKeys`

---

## Checklist

- [x] Elemento semântico `<kbd>`
- [x] Adaptação contextual para InputGroup e Tooltip
- [x] KbdGroup para agrupar múltiplas teclas
- [x] Tamanho fixo (`h-5.5 w-fit min-w-5.5`)
- [x] Fonte monospace (padrão do `<kbd>`)
