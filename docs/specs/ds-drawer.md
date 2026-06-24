# Spec: Drawer UI

> Wrapper de alto nível sobre o Drawer (vaul) com header, body scrollável, footer, close button e suporte a 4 direções.

---

## Propósito

Painel slide-over que abre de qualquer borda da tela, combinando header opcional (título + descrição), body scrollável, footer para ações e close button.

**Usar quando:** É necessário exibir conteúdo complementar ou formulários em painel deslizante com header/footer prontos.

**Não usar quando:** A ação requer confirmação crítica (use AlertDialog). Precisa de controle total sobre o conteúdo do drawer (use o Drawer primitivo).

**Alternativa:** `Drawer` (shadcn/ui/vaul) para controle granular das partes.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/drawer.tsx` |
| Tipo | `registry:ui` (name: `ds-drawer`) |
| Categoria | Painel / Sobreposição |
| Depende de | `ui/drawer` (DrawerRoot, DrawerContent, DrawerTrigger, DrawerClose, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter), `lucide-react` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `direction` | `"bottom" \| "left" \| "right" \| "top"` | `"bottom"` | Não | Direção de abertura |
| `title` | `ReactNode` | — | Não | Título no header |
| `description` | `ReactNode` | — | Não | Descrição no header |
| `trigger` | `ReactNode` | — | Não | Elemento que abre o drawer |
| `footer` | `ReactNode` | — | Não | Conteúdo do rodapé |
| `children` | `ReactNode` | — | Não | Conteúdo do body |
| `showCloseButton` | `boolean` | `true` | Não | Exibe botão de fechar no header |
| `open` | `boolean` | — | Não | Controla abertura (controlado) |
| `onOpenChange` | `(open: boolean) => void` | — | Não | Callback de abertura/fechamento |
| `className` | `string` | — | Não | Classes adicionais no body |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--popover` / `--popover-foreground` | Content (fundo e texto) |
| `--muted-foreground` | `DrawerDescription` |
| `--secondary` / `--muted-foreground` | Close button bg/text |
| `--muted` | Drag handle (pill) |
| `--border` | Borda do painel, footer divider |
| `bg-black/30` + `backdrop-blur` | Overlay |

> **Content delegado ao `ui/DrawerContent`:** o conteúdo do drawer usa `DrawerContent` de `ui/drawer.tsx` em vez de `DrawerPrimitive.Content` do vaul. O pseudo-elemento `::before` do `DrawerContent` é suprimido via `before:content-none` para evitar borda/sombra duplicada com os tokens do ds. Os `mt-24`/`mb-24` do `DrawerContent` são zerados via `data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=top]:mb-0`.

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Bottom (padrão)** | `inset-x-0 bottom-0 mt-24 max-h-[80vh]`, drag handle no topo |
| **Top** | `inset-x-0 top-0 mb-24 max-h-[80vh]`, drag handle na base |
| **Left** | `inset-y-0 left-0 w-3/4 sm:max-w-sm`, sem drag handle |
| **Right** | `inset-y-0 right-0 w-3/4 sm:max-w-sm`, sem drag handle |
| **Com header** | Título + descrição + close button (se `showCloseButton`) |
| **Sem header** | Body ocupa toda altura, sem padding extra |
| **Com footer** | Barra de ações com `border-t` |
| **Controlado** | `open`/`onOpenChange` para controle externo |
| **Drag** | Gesto de arrastar para fechar (bottom/top) |
| **Fechamento** | Escape, overlay click, close button, drag |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Gestos | Arrastar para fechar via `vaul` |
| Fechamento | Escape, overlay, close button |
| ARIA | Gerenciado pelo `vaul` (dialog role) |
| Focus trap | Gerenciado pelo `vaul` |
| Close button | `sr-only` "Fechar" |

---

## Stories obrigatórias

- [x] `Default` — Bottom — Edit Profile
- [x] `FromLeft` — Left — Navigation
- [x] `FromRight` — Right — Notifications
- [x] `FromTop` — Top — Quick Actions
- [x] `Confirmation` — Bottom — Confirmation
- [x] `ScrollableContent` — Right — Scrollable Content
- [x] `NoHeader` — Bottom — No Header
- [x] `NoCloseButton` — Left — No Close Button
- [x] `ProgrammaticControl` — Bottom — Controlled

## Checklist

- [x] 4 direções: bottom, top, left, right
- [x] Drag handle apenas em bottom/top
- [x] Header com title + description + close button opcional
- [x] Footer com divisória visual
- [x] Body scrollável
- [x] Controlado via open/onOpenChange
- [x] Responsivo (w-3/4 mobile, sm:max-w-sm desktop laterais)
- [x] Overlay com backdrop-blur
