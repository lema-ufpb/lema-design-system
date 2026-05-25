# Spec: Drawer

> Painel deslizante com suporte a múltiplas direções e gestos de arrastar.

---

## Propósito

Painel que desliza de uma das quatro bordas da tela (inferior, superior, esquerda, direita), com suporte a gestos de arrastar para fechar e conteúdo scrollável.

**Usar quando:** É necessário exibir conteúdo complementar ou formulários sem perder o contexto da página, especialmente em mobile.

**Não usar quando:** A ação requer confirmação crítica (use AlertDialog). Para menus de ação, use DropdownMenu ou Sheet.

**Alternativa se não se aplicar:** `Sheet` (Radix UI) para painéis laterais sem gesto de arrastar; `Dialog` para modais centrados.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/drawer.tsx` |
| Tipo | `registry:ui` (name: `drawer`) |
| Categoria | Painel / Sobreposição |
| Depende de | `vaul` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Drawer` | `DrawerPrimitive.Root.Props` | — | — | Root do drawer |
| `DrawerTrigger` | `DrawerPrimitive.Trigger.Props` | — | — | Gatilho para abrir |
| `DrawerPortal` | `DrawerPrimitive.Portal.Props` | — | — | Portal |
| `DrawerClose` | `DrawerPrimitive.Close.Props` | — | — | Fechamento |
| `DrawerOverlay` | `DrawerPrimitive.Overlay.Props` | — | — | Overlay semitransparente |
| `DrawerContent` | `DrawerPrimitive.Content.Props` | — | — | Conteúdo do painel |
| `DrawerHeader` | `React.ComponentProps<"div">` | — | — | Cabeçalho |
| `DrawerFooter` | `React.ComponentProps<"div">` | — | — | Rodapé |
| `DrawerTitle` | `DrawerPrimitive.Title.Props` | — | — | Título |
| `DrawerDescription` | `DrawerPrimitive.Description.Props` | — | — | Descrição |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` | `DrawerContent` (fundo do painel) |
| `--popover-foreground` | Texto do `DrawerTitle` |
| `--muted-foreground` | `DrawerDescription` |
| `--muted` | Drag handle (pill) |
| `--border` | Borda do painel (`before:border-border`) |
| `bg-black/30` + backdrop-blur | `DrawerOverlay` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Aberto** | Painel desliza da direção configurada com overlay |
| **Fechado** | Arrastar para baixo (bottom), Escape, clique no overlay |
| **Bottom (padrão)** | `inset-x-0 bottom-0 mt-24 max-h-[80vh]`, com drag handle |
| **Left** | `inset-y-0 left-0 w-3/4 sm:max-w-sm` |
| **Right** | `inset-y-0 right-0 w-3/4 sm:max-w-sm` |
| **Top** | `inset-x-0 top-0 mb-24 max-h-[80vh]` |
| **Drag handle** | Pill horizontal `bg-muted` visível apenas em bottom/top |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Gestos | Arrastar para fechar gerenciado pelo `vaul` |
| Fechamento | Escape, clique overlay, DrawerClose |
| ARIA | Gerenciado pelo `vaul` (dialog role) |
| Focus trap | Gerenciado pelo `vaul` |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `FromLeft` — From Left
- [x] `FromRight` — From Right
- [x] `FromTop` — From Top
- [x] `Confirmation` — Confirmation
- [x] `ScrollableContent` — Scrollable Content
- [x] `NoHeader` — No Header
- [x] `NoCloseButton` — No Close Button
- [x] `ProgrammaticControl` — Programmatic Control

## Checklist

- [ ] Suporte a 4 direções: bottom, top, left, right
- [ ] Drag handle visível em bottom/top
- [ ] Overlay com backdrop-blur
- [ ] Header e footer como subcomponentes
- [ ] Estado controlado via `open`/`onOpenChange`
- [ ] Gesto de arrastar para fechar (bottom)
- [ ] Conteúdo scrollável
- [ ] Responsivo (w-3/4 em mobile, sm:max-w-sm em desktop para laterais)
