# Spec: Modal

> Modal de alto nível com sistema de intenções (intent), 6 tamanhos, scrollable body com header/footer sticky, async confirm tracking e i18n.

---

## Propósito

Wrapper sobre o `Dialog` (shadcn/ui) que adiciona `intent` com ícone + cor semântica, `size` responsivo, `scrollable` para body com sticky header/footer, `loading` esqueletos, suporte a `onConfirm` assíncrono com loading automático, e i18n nos labels dos botões.

**Usar quando:** É necessário um modal com confirmação/cancelamento padronizados, com variantes visuais de intenção (destructive, success, warning, info) e opção de body scrollável.

**Não usar quando:** O conteúdo é simples e não precisa de header/footer padronizado (usar `Dialog` diretamente). A ação requer painel lateral (usar `Drawer`).

**Alternativa:** `Dialog` (shadcn/ui) para controle granular; `AlertDialog` para confirmações críticas simples.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/modal.tsx` |
| data-slot | `modal` | |
| Tipo | `registry:ui` (name: `ds-modal`) |
| Categoria | Overlay / Modal |
| Depende de | `dialog` (shadcn/ui), `button`, `skeleton`, `ui-i18n`, `lucide-react` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `open` | `boolean` | — | Não | Estado controlado de abertura |
| `onOpenChange` | `(open: boolean) => void` | — | Não | Callback de mudança de estado |
| `trigger` | `ReactNode` | — | Não | Elemento que abre o modal |
| `title` | `ReactNode` | — | Não | Título no header |
| `description` | `ReactNode` | — | Não | Descrição no header |
| `children` | `ReactNode` | — | Não | Conteúdo do body |
| `footer` | `ReactNode` | — | Não | Substitui o footer auto-gerado |
| `icon` | `ReactNode` | — | Não | Sobrescreve o ícone padrão do intent |
| `onConfirm` | `() => void \| Promise<void>` | — | Não | Ação de confirmação (suporta async) |
| `onCancel` | `() => void` | — | Não | Ação de cancelamento |
| `confirmLabel` | `string` | i18n | Não | Label do botão confirmar |
| `cancelLabel` | `string` | i18n | Não | Label do botão cancelar |
| `confirmLoading` | `boolean` | — | Não | Override manual de loading no confirm |
| `closeOnConfirm` | `boolean` | `false` | Não | Fecha o modal ao confirmar |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"md"` | Não | Largura máxima do modal |
| `intent` | `"default" \| "destructive" \| "success" \| "warning" \| "info"` | `"default"` | Não | Intenção visual com ícone + cor |
| `scrollable` | `boolean` | `false` | Não | Body scrollável com header/footer sticky |
| `loading` | `boolean` | `false` | Não | Exibe Skeleton no body |
| `showCloseButton` | `boolean` | `true` | Não | Exibe botão X no DialogContent |
| `locale` | `UILocale` | `"en-US"` | Não | Localização dos labels |
| `className` | `string` | — | Não | Classes adicionais no body |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` (content width) | `sm`, `md`, `lg`, `xl`, `2xl`, `full` | `md` |
| `intent` (icon wrapper) | `default`, `destructive`, `success`, `warning`, `info` | `default` |
| `scrollable` (header/body/footer) | `true`, `false` | `false` |

**Slots exportados:**
- `modalContentVariants` — container DialogContent (`max-width` por size)
- `modalIconWrapperVariants` — wrapper circular do ícone de intent
- `modalHeaderVariants` — DialogHeader com borda inferior quando scrollable
- `modalBodyVariants` — body scrollável com padding quando scrollable
- `modalFooterVariants` — DialogFooter com borda superior quando scrollable

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--popover` | Fundo do DialogContent |
| `--popover-foreground` | Texto do título e body |
| `--muted-foreground` | Descrição |
| `--destructive` / `--destructive/10` | Ícone e wrapper do intent destructive |
| `--success` / `--success/10` | Ícone e wrapper do intent success |
| `--warning` / `--warning/10` | Ícone e wrapper do intent warning |
| `--highlight-sky` / `--highlight-sky/10` | Ícone e wrapper do intent info |
| `--border` | Divisórias em scrollable mode |
| `bg-success` / `text-success-foreground` | Botão confirm no intent success |
| `bg-warning` / `text-warning-foreground` | Botão confirm no intent warning |

---

## Escala tipográfica

A modal não aplica escala própria de tipografia — delega para os componentes internos (`DialogTitle`, `DialogDescription`). Os tamanhos afectam apenas a `max-width` do container.

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|------------------------|
| **Default** | Modal com title, description, trigger, confirm/cancel no footer |
| **Sem trigger** | Controlado via `open`/`onOpenChange` |
| **Intent destructive** | Ícone `AlertCircleIcon` vermelho, botão confirm `variant="destructive"` |
| **Intent success** | Ícone `CheckCircle2Icon` verde, botão confirm `bg-success text-success-foreground` |
| **Intent warning** | Ícone `TriangleAlertIcon` âmbar, botão confirm `bg-warning text-warning-foreground` |
| **Intent info** | Ícone `InfoIcon` sky-blue, sem cor special no confirm |
| **Icon custom** | `icon` prop sobrescreve o ícone, mantém a cor do intent |
| **Scrollable** | Header e footer sticky com `shrink-0` e bordas; body `overflow-y-auto flex-1` |
| **Loading** | `<Skeleton>` com linhas proporcionais ao size (2-5 linhas) |
| **Async confirm** | `onConfirm` retorna Promise → botão mostra spinner + desabilita |
| **Close on confirm** | `closeOnConfirm` + `onConfirm` → DialogClose wrapping |
| **Sem footer** | Nenhum botão renderizado se `footer` não informado e sem `onConfirm`/`onCancel` |
| **showCloseButton=false** | Botão X no canto superior direito oculto |
| **Sem header** | Título, descrição e intent-icon não renderizados |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role dialog | Nativo do `Dialog` (shadcn/radix) |
| Focus trap | Gerenciado pelo `Dialog` |
| Escape fecha | Gerenciado pelo `Dialog` |
| ARIA labels | `DialogTitle`, `DialogDescription` |
| Loading | `aria-busy` no skeleton container |
| i18n | `UI_I18N[locale].modal.confirm` e `.cancel` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Edit Profile com trigger e confirm/cancel
- [x] `IntentDestructive` — Delete Account com async confirm
- [x] `IntentSuccess` — Changes Saved
- [x] `IntentWarning` — Unsaved Changes
- [x] `IntentInfo` — New Feature Available
- [x] `Sizes` — Todos os 6 tamanhos lado a lado
- [x] `Scrollable` — Terms of Service com scrollable body
- [x] `LoadingSkeleton` — Loading state com toggle
- [x] `CustomIcon` — Ícone customizado no intent destructive
- [x] `AsyncConfirm` — Auto loading tracking com Promise
- [x] `CustomFooter` — Footer slot customizado
- [x] `NoCloseButton` — Forced action sem close button
- [x] `Controlled` — Controle via open/onOpenChange externo
- [x] `Locales` — en-US, pt-BR, es-ES, fr-FR

---

## Checklist antes de implementar

- [x] CVA — 5 variantes exportadas (content, iconWrapper, header, body, footer)
- [x] `defaultVariants` declarado em cada `cva()`
- [x] Tokens semânticos (sem raw Tailwind para cor semântica)
- [x] Suporte a `intent` com ícone + cor + botão de confirmação
- [x] 6 tamanhos de `max-width` (sm/md/lg/xl/2xl/full)
- [x] `scrollable` com sticky header/footer + body scrollável
- [x] `loading` com `<Skeleton>` de dimensões corretas por size
- [x] Async `onConfirm` com loading state automático
- [x] `closeOnConfirm` funcional
- [x] Suporte controlado e não-controlado
- [x] i18n nos labels dos botões
- [x] `cn()` para classes condicionais
- [x] `gap-*` sempre, nunca `space-y-*`
- [x] `truncate` para texto longo
