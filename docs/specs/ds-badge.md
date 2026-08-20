# Spec: ds-badge

## Propósito

Wrapper do `ui/badge` com variantes CVA estendidas: dot indicator, removable (close icon), icon suport, counter/overflow (99+), semantic color variants (success/warning/destructive/info).

**Usar quando:** Exibir status, contagens, labels com cor semântica, badges removíveis
**Não usar quando:** Precisa de apenas um badge estático simples — usar `ui/badge` diretamente
**Alternativa se não se aplicar:** `ui/badge`

## Localização

| Campo      | Valor                                                        |
| ---------- | ------------------------------------------------------------ |
| Arquivo    | `components/ds/badge.tsx`                                    |
| Tipo       | `registry:ui`                                                |
| Categoria  | `Data Display`                                               |
| Depende de | `ui/badge`, `ui/button` (close icon), `lucide-react` (XIcon) |

## API — Props

| Prop          | Tipo                                                                                         | Padrão      | Obrigatória | Descrição                                              |
| ------------- | -------------------------------------------------------------------------------------------- | ----------- | ----------- | ------------------------------------------------------ |
| `variant`     | `"default" \| "secondary" \| "destructive" \| "outline" \| "success" \| "warning" \| "info"` | `"default"` |             | Variante de cor semântica                              |
| `size`        | `"sm" \| "md" \| "lg"`                                                                       | `"md"`      |             | Tamanho do badge                                       |
| `dot`         | `boolean`                                                                                    | `false`     |             | Exibe um dot colorido antes do texto                   |
| `removable`   | `boolean`                                                                                    | `false`     |             | Exibe botão X para remover                             |
| `icon`        | `React.ReactNode`                                                                            | —           |             | Ícone à esquerda do texto                              |
| `maxCount`    | `number`                                                                                     | —           |             | Se definido, exibe como contador (ex: `5`, `99+`)      |
| `count`       | `number`                                                                                     | —           |             | Valor do contador (exibido quando `maxCount` definido) |
| `onRemove`    | `() => void`                                                                                 | —           |             | Callback ao clicar no X                                |
| `loading`     | `boolean`                                                                                    | `false`     |             | Estado de carregamento                                 |
| `background`  | `string`                                                                                     | —           |             | Sobrescreve bg via `--badge-background`                |
| `color`       | `string`                                                                                     | —           |             | Sobrescreve cor via `--badge-color`                    |
| `borderColor` | `string`                                                                                     | —           |             | Sobrescreve borda via `--badge-border-color`           |
| `locale`      | `UILocale`                                                                                   | `"pt-BR"`   |             | Locale para i18n                                       |
| `className`   | `string`                                                                                     | —           |             | Classes extras                                         |

Estende `React.ComponentProps<"span">` + `VariantProps<typeof badgeVariants>`.

## Variantes CVA

| Dimensão  | Valores                                                                | Padrão    |
| --------- | ---------------------------------------------------------------------- | --------- |
| `variant` | `default`, `secondary`, `destructive`, `outline`, `success`, `warning` | `default` |
| `size`    | `sm`, `md`, `lg`                                                       | `md`      |

**Slots:**

- `badgeVariants` — wrapper externo (sobrescreve o `ui/badge` CVA)

## Tokens de design utilizados

| Token                                        | Slot onde é usado                |
| -------------------------------------------- | -------------------------------- |
| `bg-primary` / `text-primary-foreground`     | variant default                  |
| `bg-secondary` / `text-secondary-foreground` | variant secondary                |
| `bg-destructive/10` / `text-destructive`     | variant destructive              |
| `bg-success` / `text-success-foreground`     | variant success                  |
| `bg-warning` / `text-warning-foreground`     | variant warning                  |
| `text-muted-foreground`                      | dot quando não tem cor semântica |

## Escala tipográfica e de tamanho

| Slot       | sm            | md                    | lg                    |
| ---------- | ------------- | --------------------- | --------------------- |
| Text       | `text-[10px]` | `text-xs font-medium` | `text-sm font-medium` |
| Height     | `h-4`         | `h-5`                 | `h-6`                 |
| Padding    | `px-1.5`      | `px-2`                | `px-2.5`              |
| Icon/Close | `size-2.5`    | `size-3`              | `size-3.5`            |
| Dot        | `size-1.5`    | `size-2`              | `size-2.5`            |

## Comportamentos e estados

| Estado           | Comportamento esperado                                       |
| ---------------- | ------------------------------------------------------------ |
| `loading={true}` | `<Skeleton className="h-5 w-16 rounded-3xl" />`              |
| `removable`      | Exibe botão X com `onRemove` callback, `aria-label` via i18n |
| `dot`            | Pequeno círculo colorido antes do texto, cor = current text  |
| `maxCount`       | Exibe número, se > 999 exibe `99+`                           |
| Overflow         | `truncate` + `max-w-[200px]`                                 |

## Acessibilidade

| Requisito | Implementação                                        |
| --------- | ---------------------------------------------------- |
| Role      | `status` quando for badge de status                  |
| Rótulo    | `aria-label` no close button via i18n `badge.remove` |
| Teclado   | Close button nativamente focusável                   |
| i18n      | `badge.remove` para o label do X                     |

## Stories obrigatórias

- [x] `Default` — variant default com texto
- [x] `AllVariants` — todas as 7 variantes de cor
- [x] `AllSizes` — sm, md, lg
- [x] `WithDot` — dot indicator em cada variant
- [x] `Removable` — badge com X, onRemove action
- [x] `WithIcon` — ícone + texto
- [x] `Counter` — maxCount exibindo contagem
- [x] `Loading` — estado loading
