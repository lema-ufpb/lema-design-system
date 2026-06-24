# Spec: Dashbox

---

## Propósito

Container de dashboard com header (título, descrição, status badge), toolbar (refresh, minimize, maximize), body scrollável e suporte a loading. Substitui cards isolados em layouts de grid de dashboard.

**Usar quando:** Agrupar métricas, gráficos ou conteúdo em blocos individuais dentro de uma dashboard, com suporte a minimizar/maximizar e refresh.

**Não usar quando:** Conteúdo simples sem toolbar ou controles — preferir `Card` do shadcn. Conteúdo que não precisa de loading.

**Alternativa se não se aplicar:** `Card` + `Skeleton` manual.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/dashbox.tsx` |
| data-slot | `dashbox` |
| Tipo | `registry:component` (name: `dashbox`) |
| Categoria | `Layout` |
| Depende de | `Tooltip` (shadcn), `Skeleton` (shadcn), `lucide-react` (Minus, Plus, Maximize2, RefreshCw, Shrink) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `title` | `string` | — | | Título exibido no header |
| `description` | `string` | — | | Descrição abaixo do título |
| `children` | `ReactNode` | — | | Conteúdo do body |
| `toolbar` | `ReactNode` | — | | Conteúdo custom extra na toolbar |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Escala de tipografia interna |
| `bodyPadding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | | Padding interno do body |
| `loading` | `boolean` | `false` | | Exibe Skeleton no body |
| `status` | `"live" \| "warning" \| "error" \| "idle"` | — | | Exibe badge de status no header |
| `locale` | `UILocale` | `"en-US"` | | Localização (en-US, pt-BR, es-ES, fr-FR) |
| `statusLabels` | `Partial<Record<DashboxStatus, string>>` | — | | Sobrescrita de labels de status |
| `onRefresh` | `() => void` | — | | Callback de refresh (exibe botão) |
| `showMaximize` | `boolean` | `true` | | Exibe botão maximize/fullscreen |
| `showMinimize` | `boolean` | `true` | | Exibe botão minimize/collapse |
| `showToolbar` | `boolean` | `true` | | Exibe a toolbar inteira |
| `className` | `string` | — | | Classes extras |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof dashboxVariants>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` (container/title/description) | `sm`, `md`, `lg` | `md` |
| `padding` (body) | `none`, `sm`, `md`, `lg` | `md` |
| `status` (badge) | `live`, `warning`, `error`, `idle` | `idle` |

**Slots do componente:**

- `dashboxVariants` — container externo (border, bg, shadow)
- `dashboxTitleVariants` — texto do título
- `dashboxDescriptionVariants` — texto da descrição
- `dashboxBodyVariants` — body scrollável (padding)
- `dashboxStatusBadgeVariants` — badge de status
- `dashboxToolbarVariants` — toolbar layout
- `dashboxToolbarButtonVariants` — botão individual da toolbar
- `dashboxHeaderVariants` — header layout

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-card` | container, header |
| `text-card-foreground` | container |
| `border-border` | container, header bottom |
| `text-foreground` | título |
| `text-muted-foreground` | descrição, toolbar buttons idle |
| `bg-accent` / `text-accent-foreground` | toolbar button hover |
| `ring-ring` | toolbar button focus |
| `bg-muted` | status badge `idle` |
| `text-muted-foreground` | status badge `idle` text |
| `text-success` / `bg-success/10` / `border-success/20` | status badge `live` |
| `text-warning` / `bg-warning/10` / `border-warning/20` | status badge `warning` |
| `text-destructive` / `bg-destructive/10` / `border-destructive/20` | status badge `error` |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Descrição | `text-xs` | `text-sm` | `text-base` |
| Container base | `text-xs` | `text-sm` | `text-base` |
| Ícone toolbar | `size-3.5` (fixo, sem variante) | — | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com 4 linhas (3 linhas de texto de 75%/100%/66% largura + 1 bloco h-24 full) |
| `minimized` | Body oculto, header permanece, ícone muda para `Plus` |
| `maximized` | Container fica `fixed inset-0 z-9999 rounded-none`, toolbar mostra `Shrink` |
| `refreshing` | Botão refresh mostra `animate-spin` |
| `status` não informado ou `idle` | Badge não é renderizado |
| Sem `onRefresh` | Botão refresh não aparece |
| `showToolbar={false}` | Toolbar inteira omitida |
| Overflow de texto | `title` no título com `title` attr nativo |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div>` com forwardRef |
| Toolbar buttons | `aria-label` com label i18n + `Tooltip` com `TooltipContent` |
| i18n | `UI_I18N[locale].dashbox.toolbar.*` para refresh, collapse, expand, fullscreen, restore |
| i18n status | `UI_I18N[locale].dashbox.status.*` para live/warning/error/idle |
| Focus | `focus-visible:ring-2` nos toolbar buttons |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `NoHeader` — No Header
- [x] `WithStatus` — With Status
- [x] `AllStatuses` — All Statuses
- [x] `WithToolbar` — With Toolbar
- [x] `WithRefresh` — With Refresh
- [x] `LocalizedToolbar` — Localized Toolbar
- [x] `Loading` — Loading
- [x] `NoPadding` — No Padding
- [x] `WithProgressBars` — With Progress Bars
- [x] `Sizes` — Sizes

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` — N/A (sem valores numéricos diretos)
- [x] `truncate` — N/A (título usa `title` attr)
- [x] `aria-label` ou label visível em toolbar buttons
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
