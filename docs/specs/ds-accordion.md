# Spec: ds-accordion

## Propósito

Wrapper do `ui/accordion` com CVA icon variants (chevron/plus/arrow/sign), i18n trigger labels/aria, loading skeleton, size variants, controlled multiple/collapsible.

**Usar quando:** Accordion que precisa de variantes de ícone, loading, i18n ou tamanhos  
**Não usar quando:** Accordion simples — usar `ui/accordion` diretamente  
**Alternativa se não se aplicar:** `ui/accordion`

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/accordion.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Layout` |
| Depende de | `ui/accordion`, `ui/skeleton`, `lucide-react` (ChevronDown, Plus, ArrowRight, Minus) |

## API — Props

### Accordion (root)

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `type` | `"single" \| "multiple"` | `"single"` | | Comportamento de expansão |
| `collapsible` | `boolean` | `true` | | Permitir recolher item ativo |
| `iconVariant` | `"chevron" \| "plus" \| "arrow" \| "sign"` | `"chevron"` | | Estilo do ícone de expansão |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho do accordion |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `loadingCount` | `number` | `3` | | Nº de skeletons |
| `locale` | `UILocale` | `"pt-BR"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

### AccordionItem

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | ✓ | Identificador único |
| `trigger` | `string` | — | ✓ | Texto do trigger |
| `children` | `React.ReactNode` | — | ✓ | Conteúdo do item |

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `iconVariant` | `chevron`, `plus`, `arrow`, `sign` | `chevron` |
| `size` | `sm`, `md`, `lg` | `md` |

**Slots:**
- `accordionVariants` — container border radius, padding
- `triggerVariants` — trigger padding, font
- `contentVariants` — content padding
- `iconVariants` — ícone rotate/transform

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `border-border` | container border |
| `bg-card` | container / item |
| `bg-muted/50` | item quando aberto |
| `text-muted-foreground` | trigger texto |
| `text-foreground` | trigger quando hover |

## Escala

| Slot | sm | md | lg |
|------|----|----|----|
| Trigger padding | `p-2.5` | `p-4` | `p-5` |
| Trigger font | `text-xs` | `text-sm` | `text-base` |
| Content padding | `px-2.5 pb-2.5` | `px-4 pb-4` | `px-5 pb-5` |
| Icon | `size-3.5` | `size-4` | `size-5` |

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | N skeletons com largura variada simulando triggers |
| `iconVariant="plus"` | Ícone + quando fechado, − quando aberto |
| `iconVariant="arrow"` | Ícone seta que rotaciona 90° ao abrir |
| `iconVariant="sign"` | +/− com animação de rotação |
| `collapsible=false` | Sempre um item expandido |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Navegação | AccordionPrimitive já trata keyboard |
| Rótulo | `aria-label` via i18n no trigger |
| i18n | `accordion.expand`, `accordion.collapse` |

## Stories obrigatórias

- [x] `Default` — single collapsible
- [x] `Multiple` — multiple sem collapsible
- [x] `IconVariants` — todos os 4 estilos de ícone
- [x] `AllSizes` — sm, md, lg
- [x] `Loading` — skeleton loading
- [x] `Nested` — accordion dentro de accordion
- [x] `Controlled` — valor controlado externamente
