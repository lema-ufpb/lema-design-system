---
name: ds-phone-input
description: Um campo de input especializado em números de telefone com seleção de país e formatação.
type: registry:ui
dependencies:
  - lucide-react
registryDependencies:
  - input
  - popover
  - command
  - ui-i18n
---

# `ds-phone-input`

## 1. Descrição e Propósito

O componente `ds-phone-input` é projetado para lidar com inserção de números de telefone, incluindo o código de área internacional (país). Ele apresenta um botão à esquerda do input principal que, ao ser clicado, exibe uma lista de países suportados com suas respectivas bandeiras e códigos DDI, usando o padrão Popover + Command para busca e seleção.

## 2. Anatomia

- **Container**: Flexbox com border radius e outline handling unificado, para parecer um único input.
- **Country Selector**: Botão sem borda visual que ativa o popover de seleção de países. Mostra a bandeira, o código selecionado e um ícone de chevron.
- **Popover/Command**: Combobox que exibe a lista de países, permitindo busca pelo nome ou código.
- **Phone Input**: Input de texto limpo para o número em si.

## 3. Variantes e Modificadores

_Usando `class-variance-authority` (CVA)._

### 3.1. Tamanhos (`size`)

Segue a escala padrão de altura interativa (h-8 a h-10):

- `sm`: Altura `h-8`, fonte `text-xs`.
- `md` (default): Altura `h-9`, fonte `text-sm`.
- `lg`: Altura `h-10`, fonte `text-base`.

### 3.2. Estados e Modificadores

- `disabled`: Define opacidade reduzida e desabilita cliques no combobox e no input.
- `invalid`: Borda vermelha `border-destructive` para indicar erro.
- `loading`: Exibe um `Skeleton` com as mesmas dimensões para estado de carregamento.

## 4. Tokens e Cores

- Fundo: `bg-background`
- Borda: `border-input` (padrão), `border-destructive` (erro).
- Focus: `focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`.
- Ícones: `text-muted-foreground` e `opacity-50` para inativos.

## 5. Acessibilidade (a11y)

- O Popover/Combobox utiliza as propriedades ARIA adequadas (`aria-expanded`, `aria-controls`, `role="combobox"`).
- O Input recebe propriedades como `aria-label` e `aria-invalid` de acordo com os estados.
- Gerenciamento de foco ao navegar pelos itens da lista (através do componente Command).

## 6. Dicionário (i18n)

O componente deve prever chaves no `lib/ui-i18n.ts`:

- `phoneInput.searchCountry`: "Buscar país..."
- `phoneInput.noCountryFound`: "País não encontrado."

## 7. Referência de API (Props)

| Prop              | Type                        | Default     | Description                                               |
| ----------------- | --------------------------- | ----------- | --------------------------------------------------------- |
| `value`           | `string`                    | `undefined` | O número de telefone (com DDI opcionalmente formatado).   |
| `onChange`        | `(value: string) => void`   | `undefined` | Callback acionado ao alterar o valor.                     |
| `country`         | `string`                    | `"BR"`      | O código ISO do país padrão selecionado (ex: "US", "BR"). |
| `onCountryChange` | `(country: string) => void` | `undefined` | Callback acionado ao trocar de país.                      |
| `size`            | `"sm" \| "md" \| "lg"`      | `"md"`      | O tamanho do componente.                                  |
| `disabled`        | `boolean`                   | `false`     | Se o input e seletor estão desabilitados.                 |
| `invalid`         | `boolean`                   | `false`     | Se há erro de validação.                                  |
| `loading`         | `boolean`                   | `false`     | Exibe skeleton de loading.                                |
| `locale`          | `UILocale`                  | `"pt-BR"`   | Locale para busca das strings traduzidas.                 |

## 8. Estrutura CVA Proposta

```tsx
const phoneInputContainerVariants = cva(
  "flex w-full items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-base",
      },
      disabled: { true: "cursor-not-allowed opacity-50" },
      invalid: { true: "border-destructive focus-within:ring-destructive" },
    },
    defaultVariants: { size: "md" },
  }
)
```
