# Spec: ds-slider

## Propósito

Wrapper do `ui/slider` com marks/labels, tooltip on value hover, range (dual handle), step indicators, i18n ARIA labels, vertical orientation suportada, `format-utils` para display de valor.

**Usar quando:** Sliders em filtros, configurações, ranges de valor com feedback visual
**Não usar quando:** Slider simples sem adornos — usar `ui/slider` diretamente
**Alternativa se não se aplicar:** `ui/slider`

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/slider.tsx`                    |
| Tipo       | `registry:ui`                                 |
| Categoria  | `Form`                                        |
| Depende de | `ui/slider`, `ui/tooltip`, `lib/format-utils` |

## API — Props

| Prop           | Tipo                                 | Padrão         | Obrigatória | Descrição                           |
| -------------- | ------------------------------------ | -------------- | ----------- | ----------------------------------- |
| `value`        | `number[]`                           | —              |             | Valor controlado (array para range) |
| `defaultValue` | `number[]`                           | —              |             | Valor inicial                       |
| `min`          | `number`                             | `0`            |             | Valor mínimo                        |
| `max`          | `number`                             | `100`          |             | Valor máximo                        |
| `step`         | `number`                             | `1`            |             | Incremento                          |
| `showTooltip`  | `boolean`                            | `false`        |             | Exibe tooltip com valor no hover    |
| `showMarks`    | `boolean`                            | `false`        |             | Exibe marcas no track               |
| `marks`        | `{ value: number; label: string }[]` | —              |             | Marcas custom                       |
| `formatValue`  | `(value: number) => string`          | —              |             | Formatador do valor                 |
| `locale`       | `UILocale`                           | `"pt-BR"`      |             | Locale para i18n                    |
| `loading`      | `boolean`                            | `false`        |             | Estado de carregamento              |
| `label`        | `string`                             | —              |             | Label descritivo                    |
| `orientation`  | `"horizontal" \| "vertical"`         | `"horizontal"` |             | Orientação                          |
| `className`    | `string`                             | —              |             | Classes extras                      |

Estende `React.ComponentProps<typeof SliderRoot>` omitindo children.

## Variantes CVA

| Dimensão      | Valores                  | Padrão       |
| ------------- | ------------------------ | ------------ |
| `orientation` | `horizontal`, `vertical` | `horizontal` |

**Slots:**

- `sliderVariants` — track height/width
- `markVariants` — mark label styling

## Tokens de design utilizados

| Token                   | Slot onde é usado |
| ----------------------- | ----------------- |
| `bg-primary`            | range fill        |
| `bg-input/90`           | track             |
| `bg-card`               | thumb             |
| `text-muted-foreground` | marks labels      |
| `border-border`         | thumb ring        |

## Escala

| Slot                      | Valor                 |
| ------------------------- | --------------------- |
| Track height (horizontal) | `h-2`                 |
| Track width (vertical)    | `w-2`                 |
| Thumb size                | `size-4`              |
| Mark font                 | `text-xs`             |
| Label font                | `text-sm font-medium` |

## Comportamentos e estados

| Estado                     | Comportamento esperado                        |
| -------------------------- | --------------------------------------------- |
| `loading={true}`           | Skeleton linear                               |
| `showTooltip`              | Tooltip com valor formatado no hover do thumb |
| `showMarks`                | Marcas no track com labels                    |
| `marks` custom             | Marcas nos valores específicos                |
| Range (value.length === 2) | Dual handle                                   |
| `formatValue`              | Usa format-utils ou custom                    |
| `orientation="vertical"`   | Slider vertical                               |

## Acessibilidade

| Requisito | Implementação                                              |
| --------- | ---------------------------------------------------------- |
| Rótulo    | `aria-label` no SliderPrimitive.Root                       |
| Valores   | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (nativo) |
| i18n      | `slider.min`, `slider.max`, `slider.value`                 |

## Stories obrigatórias

- [x] `Default` — valor único
- [x] `Range` — dual handle
- [x] `WithMarks` — showMarks = true
- [x] `CustomMarks` — marks array custom
- [x] `WithTooltip` — showTooltip = true
- [x] `Vertical` — orientação vertical
- [x] `Loading` — skeleton
- [x] `Disabled` — desabilitado
