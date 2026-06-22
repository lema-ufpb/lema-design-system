# Spec: ds-avatar

## Propósito

Wrapper do `ui/avatar` com status indicator dot (online/busy/away/offline), initials color generator, group stack overlap, skeleton loading, tooltip, size variants (sm/md/lg/xl/2xl), i18n aria-labels.

**Usar quando:** Exibir avatares de usuário com status, grupo, ou fallback com iniciais coloridas  
**Não usar quando:** Avatar simples — usar `ui/avatar` diretamente  
**Alternativa se não se aplicar:** `ui/avatar`

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/avatar.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Data Display` |
| Depende de | `ui/avatar`, `ui/skeleton`, `ui/tooltip`, `lucide-react` |

## API — Props

### Avatar

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `src` | `string` | — | | URL da imagem |
| `alt` | `string` | — | ✓ | Texto alternativo |
| `fallback` | `string` | — | | Iniciais (2 chars recomendado) |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | | Tamanho do avatar |
| `status` | `"online" \| "busy" \| "away" \| "offline"` | — | | Status indicator dot |
| `tooltip` | `string` | — | | Texto do tooltip no hover |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `locale` | `UILocale` | `"pt-BR"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

### AvatarGroup

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `max` | `number` | — | | Máx de avatares visíveis |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | | Tamanho uniforme |
| `children` | `React.ReactNode` | — | ✓ | Avatar components |
| `className` | `string` | — | | Classes extras |

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg`, `xl`, `2xl` | `md` |
| `status` | `online`, `busy`, `away`, `offline` | — |

**Slots:**
- `avatarVariants` — container size
- `statusVariants` — status dot cor e tamanho
- `fallbackVariants` — fallback color

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-success` (or `bg-success`) | status online |
| `text-warning` (or `bg-warning`) | status away |
| `text-destructive` (or `bg-destructive`) | status busy |
| `text-muted-foreground` | status offline |
| `bg-muted` | fallback background |
| `text-muted-foreground` | fallback text |
| `bg-primary` | avatar group count |
| `text-primary-foreground` | avatar group count text |
| `ring-background` | ring dos avatares no grupo |

## Escala

| Slot | sm | md | lg | xl | 2xl |
|------|----|----|----|----|-----|
| Size | `size-6` | `size-8` | `size-10` | `size-12` | `size-16` |
| Font (initials) | `text-[10px]` | `text-xs` | `text-sm` | `text-base` | `text-lg` |
| Status dot | `size-1.5` | `size-2` | `size-2.5` | `size-3` | `size-3.5` |
| Icon | `size-3` | `size-3.5` | `size-4` | `size-5` | `size-6` |

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | Skeleton circular no size correspondente |
| `src` disponível | Exibe imagem |
| `src` falha / sem `src` | Exibe `fallback` com iniciais + cor gerada do nome |
| `status` definido | Dot no canto inferior direito |
| `tooltip` definido | Tooltip no hover |
| `AvatarGroup` com `max` | Exibe `max` avatares + "+N" count |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | `alt` ou `aria-label` com fallback + status |
| Status | `aria-label` via i18n: `avatar.online`, `avatar.busy`, etc. |
| Tooltip | Tooltip via `ui/tooltip` |
| i18n | `avatar.online`, `avatar.busy`, `avatar.away`, `avatar.offline` |

## Stories obrigatórias

- [x] `Default` — com imagem
- [x] `WithInitials` — fallback com iniciais
- [x] `AllSizes` — sm, md, lg, xl, 2xl
- [x] `StatusIndicators` — online, busy, away, offline
- [x] `AvatarGroup` — grupo de avatares
- [x] `AvatarGroupMax` — grupo com max + overflow
- [x] `WithTooltip` — tooltip no hover
- [x] `Loading` — skeleton
