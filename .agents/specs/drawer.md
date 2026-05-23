# Spec: Drawer

---

## Propósito

Drawer slide-in com suporte a 4 direções (bottom, left, right, top), header opcional (título + descrição + close button), body scrollável e footer. Envolve o `Drawer` do shadcn (vaul) com API simplificada.

**Usar quando:** Painel lateral ou bottom sheet com conteúdo que precisa de header, scroll e ações no footer.

**Não usar quando:** Modal/dialog centralizado (usar `Dialog` shadcn). Drawer sem header personalizado (usar `Drawer` shadcn direto).

**Alternativa se não se aplicar:** `Dialog`, `Sheet` shadcn, `Drawer` raw (vaul).

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/drawer.tsx` |
| Tipo | `registry:component` (name: `drawer-ui`) |
| Categoria | `Feedback` / `Layout` |
| Depende de | `Drawer`, `DrawerClose`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerOverlay`, `DrawerPortal`, `DrawerTitle`, `DrawerTrigger` (shadcn/vaul), `X` (lucide-react) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `direction` | `"bottom" \| "left" \| "right" \| "top"` | `"bottom"` | | De onde o drawer desliza |
| `title` | `ReactNode` | — | | Título no header (DrawerTitle) |
| `description` | `ReactNode` | — | | Descrição no header (DrawerDescription) |
| `trigger` | `ReactNode` | — | | Elemento que abre o drawer |
| `footer` | `ReactNode` | — | | Conteúdo do footer |
| `children` | `ReactNode` | — | | Conteúdo do body |
| `showCloseButton` | `boolean` | `true` | | Exibe botão X no header |
| `open` | `boolean` | — | | Controle externalizado de abertura |
| `onOpenChange` | `(open: boolean) => void` | — | | Callback de toggle |

---

## Variantes CVA

Nenhuma. O componente não usa `cva()` — a direção é controlada por `data-vaul-drawer-direction` do vaul com CSS condicional.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-popover` | fundo do drawer |
| `text-popover-foreground` | texto do drawer |
| `border-border` | borda do drawer, footer top |
| `bg-muted` | drag handle |
| `bg-secondary/80` | close button fundo |
| `text-muted-foreground` | close button ícone |
| `hover:text-foreground` | close button hover |
| `bg-secondary` | close button hover fundo |
| `ring-ring` | close button focus |
| `ring-offset-background` | close button focus offset |

---

## Escala tipográfica e de tamanho

| Slot | Valor |
|------|-------|
| Close button | `size-7` (container), `size-3.5` (ícone X) |
| Drag handle | `h-1.5 w-14 rounded-full` |
| Horizontal drawer width | `w-3/4 sm:max-w-sm` |
| Vertical drawer max-height | `max-h-[80vh]` |
| Body padding | `px-4` + `py-4` / `pb-4` / `pt-4` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `direction="bottom"` | Inset-x-0, bottom-0, rounded-t-2xl, drag handle no topo |
| `direction="top"` | Inset-x-0, top-0, rounded-b-2xl, drag handle no fim |
| `direction="left"` | Inset-y-0, left-0, w-3/4 sm:max-w-sm, rounded-r-2xl |
| `direction="right"` | Inset-y-0, right-0, w-3/4 sm:max-w-sm, rounded-l-2xl |
| Sem `trigger` | Drawer sem gatilho visível (aberto programaticamente via `open`) |
| `open` controlado | Componente controlado via `open` + `onOpenChange` |
| Sem título/descrição | Header não renderizado |
| `showCloseButton={false}` | Botão X oculto |
| Sem footer | DrawerFooter não renderizado |
| Direção horizontal (left/right) | Footer `flex-col gap-2` (empilhado) |
| Direção vertical (bottom/top) | Footer `flex-row justify-end gap-2` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | DrawerPrimitive.Content com `data-slot="drawer-ui"` |
| Título | `DrawerTitle` do vaul |
| Descrição | `DrawerDescription` do vaul |
| Overlay | `DrawerOverlay` (fecha ao clicar fora) |
| Close button | `DrawerClose` com `sr-only` "Fechar" (hardcoded, sem i18n) |
| Drag handle | `aria-hidden` em ambos os handles |
| Focus | `focus-visible:ring-2` no close button |
| Teclado | Vaul gerencia Escape para fechar |

> **Nota:** Close button "Fechar" está hardcoded em português. Idealmente deveria usar i18n.

---

## Stories obrigatórias no Storybook

- [ ] `Default` — bottom, com trigger, título, descrição, footer
- [ ] `DirectionTop` — top
- [ ] `DirectionLeft` — left
- [ ] `DirectionRight` — right
- [ ] `Controlled` — open/onOpenChange controlado externamente
- [ ] `NoCloseButton` — `showCloseButton={false}`
- [ ] `NoHeader` — sem title nem description
- [ ] `NoFooter` — sem footer
- [ ] `CustomTrigger` — trigger customizado
- [ ] `LongContent` — conteúdo extenso com scroll

---

## Checklist antes de implementar

- [ ] Escala tipográfica — N/A (delega ao shadcn Drawer)
- [x] Tokens semânticos usados
- [ ] `cva()` — N/A (sem variantes próprias)
- [ ] Loading — N/A (sem estado loading)
- [ ] `tabular-nums` — N/A
- [ ] `truncate` — N/A
- [ ] `aria-label` — N/A (shadcn/vaul gerencia)
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [ ] Prop `locale` — N/A (close button hardcoded em português — considerar i18n)
