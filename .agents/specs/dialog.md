# Spec: Dialog

> Modal de sobreposição para informações críticas ou interações obrigatórias.

---

## Propósito

Janela modal que interrompe o fluxo atual para exibir conteúdo importante ou solicitar ação do usuário, com overlay semitransparente e foco preso dentro do modal.

**Usar quando:** É necessário confirmar uma ação, exibir detalhes, ou coletar informações sem perder o contexto da página.

**Não usar quando:** O conteúdo é simples e não requer atenção imediata (use Popover ou Tooltip). Para confirmações rápidas, use AlertDialog.

**Alternativa se não se aplicar:** `AlertDialog` para ações destrutivas; `Sheet` para painéis laterais; `Popover` para conteúdo não-crítico.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/dialog.tsx` |
| Tipo | `registry:ui` (name: `dialog`) |
| Categoria | Modal / Sobreposição |
| Depende de | `radix-ui`, `button`, `ui-i18n` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Dialog` | `DialogPrimitive.Root.Props` | — | — | Root do dialog |
| `DialogTrigger` | `DialogPrimitive.Trigger.Props` | — | — | Gatilho para abrir |
| `DialogPortal` | `DialogPrimitive.Portal.Props` | — | — | Portal de renderização |
| `DialogClose` | `DialogPrimitive.Close.Props` | — | — | Fechamento |
| `DialogOverlay` | `DialogPrimitive.Overlay.Props` | — | — | Overlay semitransparente |
| `DialogContent.showCloseButton` | `boolean` | `true` | — | Exibe botão de fechar |
| `DialogContent` | `DialogPrimitive.Content.Props` + extras | — | — | Conteúdo do modal |
| `DialogHeader` | `React.ComponentProps<"div">` | — | — | Cabeçalho |
| `DialogFooter.showCloseButton` | `boolean` | `false` | — | Botão "Close" no footer |
| `DialogFooter` | `React.ComponentProps<"div">` + extras | — | — | Rodapé |
| `DialogTitle` | `DialogPrimitive.Title.Props` | — | — | Título |
| `DialogDescription` | `DialogPrimitive.Description.Props` | — | — | Descrição |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `bg-black/30` + backdrop-blur | `DialogOverlay` |
| `--popover` | `DialogContent` (fundo) |
| `--popover-foreground` | `DialogContent` (texto) |
| `--secondary` | Botão de fechar (bg) |
| `--muted-foreground` | `DialogDescription` |
| `ring-foreground/5` | Borda sutil do `DialogContent` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Aberto** | Overlay com fade-in, conteúdo com `animate-in fade-in zoom-in`, centralizado |
| **Fechado** | Overlay e conteúdo com `animate-out fade-out zoom-out` |
| **Close button visível** | `showCloseButton={true}` (padrão) exibe `Button` ghost com `XIcon` no canto superior direito |
| **Close button oculto** | `showCloseButton={false}` remove o botão |
| **Footer close** | `DialogFooter showCloseButton` exibe botão "Close" outline no rodapé |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | Radix UI gerencia foco preso (focus trap) |
| Fechamento | Escape, clique no overlay, botão X |
| ARIA | `DialogPrimitive.Root` gerencia `role="dialog"`, `aria-modal`, `aria-labelledby` |
| Título e descrição | `DialogTitle` e `DialogDescription` conectados via Radix |

---

## Stories obrigatórias

- [x] `Default`
- [x] `WithoutCloseButton`
- [x] `Large`
- [x] `Confirmation`

---

## Checklist

- [x] Overlay com backdrop-blur
- [x] Botão de fechar configurável (`showCloseButton`)
- [x] Header com title e description
- [x] Footer com close button opcional
- [x] Animações de entrada/saída
- [x] Focus trap gerenciado pelo Radix
- [x] Fechamento via Escape e clique no overlay
- [x] Responsivo com `max-w-[calc(100%-2rem)]` e `sm:max-w-md`
