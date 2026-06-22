# Spec: ds-switch

## Propósito

Wrapper do `ui/switch` com label posicionável (left/right), loading spinner, error state, semantic color variants (success/destructive/warning), size variants (sm/md/lg), icon inside thumb.

**Usar quando:** Formulários com switch que precisam de label, loading, ou cor semântica  
**Não usar quando:** Switch simples sem label — usar `ui/switch` diretamente  
**Alternativa se não se aplicar:** `ui/switch`

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/switch.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Form` |
| Depende de | `ui/switch`, `ui/label`, `ui/skeleton`, `lucide-react` |

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `label` | `string` | — | | Texto do label |
| `labelPosition` | `"left" \| "right"` | `"right"` | | Posição do label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho do switch |
| `color` | `"default" \| "success" \| "destructive" \| "warning"` | `"default"` | | Cor semântica quando checked |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `error` | `string` | — | | Mensagem de erro exibida abaixo |
| `locale` | `UILocale` | `"pt-BR"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

Estende `React.ComponentProps<typeof SwitchRoot>` omitindo `size`.

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `color` | `default`, `success`, `destructive`, `warning` | `default` |
| `size` | `sm`, `md`, `lg` | `md` |

**Slots:**
- `switchVariants` — cor do Switch quando checked (via className)

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-primary` | color default checked |
| `bg-success` | color success checked |
| `bg-destructive` | color destructive checked |
| `bg-warning` | color warning checked |
| `bg-background` | thumb |
| `text-destructive` | error message |

## Escala

| Slot | sm | md | lg |
|------|----|----|----|
| Switch height | `h-4 w-7` | `h-5 w-11` | `h-6 w-13` |
| Switch thumb | `h-3 w-3` | `h-4 w-5` | `h-5 w-6` |
| Label text | `text-xs` | `text-sm` | `text-base` |
| Error text | `text-[10px]` | `text-xs` | `text-xs` |

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | Skeleton no lugar do switch + label skeleton |
| `error` | Mensagem em `text-destructive` abaixo do switch |
| `disabled` | Repassa disabled ao Switch primitivo |
| `labelPosition="left"` | Label antes do switch |

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | Label visível vinculado via `htmlFor` + `id` |
| i18n | `switch.on`, `switch.off`, `switch.loading` para aria-label |

## Stories obrigatórias

- [x] `Default` — sem label
- [x] `WithLabel` — label à direita
- [x] `LabelLeft` — label à esquerda
- [x] `AllSizes` — sm, md, lg
- [x] `AllColors` — default, success, destructive, warning
- [x] `Loading` — com skeleton
- [x] `WithError` — mensagem de erro
- [x] `Disabled` — estado desabilitado
