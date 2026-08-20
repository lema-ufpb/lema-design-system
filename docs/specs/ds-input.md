# Spec: ds-input

## Propósito

Wrapper do `ui/input` com icon prefix/suffix, clearable button, char counter com limit, i18n purposes, size variants (sm/md/lg), loading state (spinner interno), error description with tokens.

**Usar quando:** Inputs em formulários que precisam de ícone, contador, loading ou validação inline
**Não usar quando:** Input simples sem adornos — usar `ui/input` diretamente
**Alternativa se não se aplicar:** `ui/input`

## Localização

| Campo      | Valor                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/input.tsx`                                                                             |
| Tipo       | `registry:ui`                                                                                         |
| Categoria  | `Form`                                                                                                |
| Depende de | `ui/input`, `ui/skeleton`, `ui/label`, `ui/spinner`, `lucide-react` (X, Eye, EyeOff, Search, Loader2) |

## API — Props

| Prop            | Tipo                   | Padrão    | Obrigatória | Descrição                         |
| --------------- | ---------------------- | --------- | ----------- | --------------------------------- |
| `size`          | `"sm" \| "md" \| "lg"` | `"md"`    |             | Tamanho do input                  |
| `icon`          | `React.ReactNode`      | —         |             | Ícone à esquerda                  |
| `iconPlacement` | `"left" \| "right"`    | `"left"`  |             | Posição do ícone                  |
| `clearable`     | `boolean`              | `false`   |             | Exibe botão X para limpar         |
| `maxLength`     | `number`               | —         |             | Máx caracteres + exibe contador   |
| `showCount`     | `boolean`              | `false`   |             | Exibe contador (só com maxLength) |
| `loading`       | `boolean`              | `false`   |             | Exibe spinner no lugar do ícone   |
| `error`         | `string`               | —         |             | Mensagem de erro                  |
| `label`         | `string`               | —         |             | Label acima do input              |
| `locale`        | `UILocale`             | `"pt-BR"` |             | Locale para i18n                  |
| `className`     | `string`               | —         |             | Classes extras                    |

Estende `React.ComponentProps<"input">` omitindo `size`.

## Variantes CVA

| Dimensão   | Valores          | Padrão  |
| ---------- | ---------------- | ------- |
| `size`     | `sm`, `md`, `lg` | `md`    |
| `hasError` | `true`, `false`  | `false` |
| `hasIcon`  | `true`, `false`  | `false` |

**Slots:**

- `inputWrapperVariants` — container flex do input + adornos
- `inputVariants` — override de altura/padding do input root

## Tokens de design utilizados

| Token                   | Slot onde é usado        |
| ----------------------- | ------------------------ |
| `text-destructive`      | error message            |
| `border-destructive`    | input border quando erro |
| `text-muted-foreground` | ícone / contador         |
| `text-foreground`       | valor                    |
| `bg-input/50`           | fundo do input           |
| `bg-card`               | wrapper                  |

## Escala

| Slot                           | sm            | md        | lg          |
| ------------------------------ | ------------- | --------- | ----------- |
| Input height                   | `h-8`         | `h-9`     | `h-10`      |
| Input padding left (com ícone) | `pl-8`        | `pl-9`    | `pl-10`     |
| Icon size                      | `size-3.5`    | `size-4`  | `size-5`    |
| Font size                      | `text-xs`     | `text-sm` | `text-base` |
| Error text                     | `text-[10px]` | `text-xs` | `text-xs`   |

## Comportamentos e estados

| Estado                  | Comportamento esperado                                 |
| ----------------------- | ------------------------------------------------------ |
| `loading={true}`        | Spinner no lugar do ícone, input `disabled`            |
| `error`                 | Borda `destructive`, mensagem abaixo                   |
| `clearable`             | Botão X à direita, visível só quando `value` não vazio |
| `showCount`             | `contador / maxLength` à direita abaixo                |
| `iconPlacement="right"` | Ícone à direita, padding ajustado                      |

## Acessibilidade

| Requisito | Implementação                                              |
| --------- | ---------------------------------------------------------- |
| Rótulo    | Label visível com `htmlFor`                                |
| Erro      | `aria-invalid` + `aria-describedby` vinculando ao error id |
| i18n      | `input.clear` para aria-label do X                         |
| Contador  | `aria-describedby` no contador                             |

## Stories obrigatórias

- [x] `Default` — input simples
- [x] `WithIcon` — ícone à esquerda (search)
- [x] `IconRight` — ícone à direita
- [x] `AllSizes` — sm, md, lg
- [x] `WithError` — mensagem de erro
- [x] `WithCharCount` — maxLength + contador
- [x] `Clearable` — com botão X
- [x] `Loading` — spinner no lugar do ícone
- [x] `WithLabel` — label + input
