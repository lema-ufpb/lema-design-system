# Spec: ds-empty

## Propósito

Wrapper do `ui/empty` com ilustrações SVG internas por contexto (no-data, error, search, no-results), i18n title+description, action button slot, compact mode, skeleton loading.

**Usar quando:** Exibir estados vazios com contexto visual e call-to-action  
**Não usar quando:** Precisa de empty state custom com ilustração externa — usar `ui/empty` diretamente  
**Alternativa se não se aplicar:** `ui/empty`

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/empty.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Feedback` |
| Depende de | `ui/empty`, `ui/button`, `ui/skeleton`, `lucide-react` |

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | `"no-data" \| "error" \| "search" \| "no-results"` | `"no-data"` | | Contexto vazio |
| `title` | `string` | — | | Título (sobrescreve i18n se fornecido) |
| `description` | `string` | — | | Descrição (sobrescreve i18n se fornecido) |
| `action` | `{ label: string; onClick: () => void }` | — | | Botão CTA |
| `compact` | `boolean` | `false` | | Modo compacto (menos padding) |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `locale` | `UILocale` | `"pt-BR"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

Estende `React.ComponentProps<"div">` + `VariantProps<typeof emptyVariants>`.

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `compact` | `true`, `false` | `false` |

**Slots:**
- `emptyVariants` — container principal
- `iconVariants` — container do ícone/ilustração

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-muted-foreground` | descrição |
| `text-foreground` | título |
| `bg-muted` | ícone container circular |
| `border-dashed` | borda do container |

## Escala tipográfica e de tamanho

| Slot | Normal | Compact |
|------|--------|---------|
| Padding | `p-12` | `p-6` |
| Title | `text-lg font-medium` | `text-base font-medium` |
| Description | `text-sm/relaxed` | `text-xs` |
| Icon | `size-16` | `size-10` |

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | Skeleton com dimensões do container + icon placeholder |
| `compact` | Padding reduzido, fontes menores |
| `action` | Botão abaixo da descrição, variant `outline` ou `default` |
| `variant="search"` | Ícone de lupa, i18n search title |
| `variant="error"` | Ícone de alerta, i18n error title |
| `variant="no-data"` | Ícone de database/inbox, i18n padrão |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role | `region` com `aria-label="Empty state"` |
| Rótulo | `aria-label` via i18n no container |
| i18n | `empty.noData`, `empty.noDataDescription`, `empty.noResults`, `empty.error`, `empty.action` |

## Stories obrigatórias

- [x] `NoData` — estado padrão no-data
- [x] `Search` — variante search com lupa
- [x] `Error` — variante error com alerta
- [x] `NoResults` — variante no-results
- [x] `WithAction` — com botão CTA
- [x] `Compact` — modo compacto
- [x] `Loading` — estado loading
- [x] `CustomTitle` — title/description custom
