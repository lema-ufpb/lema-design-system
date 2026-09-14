# Spec: LocationPicker

## Propósito

Campo de seleção e autocompletar de endereços, locais ou coordenadas geográficas com suporte a busca assíncrona desacoplada de fornecedores (Google Maps, Mapbox, OpenStreetMap, ViaCEP).

**Usar quando:** formulários de cadastro de endereços, checkout de entrega ou filtros geográficos.  
**Não usar quando:** apenas selecionar cidade ou país de uma lista estática (use `ds-select` ou `ds-country-select`).  
**Alternativa se não se aplicar:** `ds-select`.

---

## Localização

| Campo      | Valor                                               |
| ---------- | --------------------------------------------------- |
| Arquivo    | `components/ds/location-picker.tsx`                 |
| Tipo       | `registry:ui`                                       |
| Categoria  | `Form/LocationPicker`                               |
| Depende de | `popover`, `command`, `badge`, `button`, `skeleton` |

---

## API — Props

| Prop                | Tipo                                               | Padrão      | Obrigatória | Descrição                               |
| ------------------- | -------------------------------------------------- | ----------- | ----------- | --------------------------------------- |
| `value`             | `LocationSuggestion \| null`                       | —           |             | Local selecionado                       |
| `onChange`          | `(value: LocationSuggestion \| null) => void`      | —           |             | Callback acionado na seleção            |
| `onSearch`          | `(query: string) => Promise<LocationSuggestion[]>` | —           |             | Função assíncrona de busca de sugestões |
| `placeholder`       | `string`                                           | `"Select…"` |             | Placeholder do botão                    |
| `searchPlaceholder` | `string`                                           | `"Search…"` |             | Placeholder do input de busca           |
| `clearable`         | `boolean`                                          | `true`      |             | Permite desmarcar o local selecionado   |
| `disabled`          | `boolean`                                          | `false`     |             | Estado desabilitado                     |
| `loading`           | `boolean`                                          | `false`     |             | Estado de carregamento                  |

---

## Stories obrigatórias

- [x] `Default` — busca com mock de sugestões de cidades
- [x] `SelectedValue` — endereço já pré-selecionado
- [x] `Loading` — skeleton do campo
- [x] `Disabled` — estado desabilitado
