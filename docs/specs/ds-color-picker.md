# Spec: ds-color-picker

> Componente de seleção de cores (Color Picker).

---

## Propósito

Permite ao usuário selecionar uma cor usando o seletor nativo do sistema operacional (`input type="color"`) ou digitar um valor hexadecimal. É uma abstração que combina um input de texto com o gatilho visual da cor.

**Usar quando:** O usuário precisa escolher uma cor para um tema, tag ou configuração customizada.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/color-picker.tsx`        |
| Tipo       | `registry:ui` (name: `ds-color-picker`) |
| Categoria  | `Form`                                  |
| Depende de | `input`, `lucide-react`                 |

---

## API — Props

| Prop       | Tipo                      | Padrão      | Obrigatória | Descrição                |
| ---------- | ------------------------- | ----------- | ----------- | ------------------------ |
| `value`    | `string`                  | `"#000000"` |             | Valor hexadecimal da cor |
| `onChange` | `(value: string) => void` | —           |             | Callback ao mudar a cor  |
| `disabled` | `boolean`                 | `false`     |             | Estado desabilitado      |
| `invalid`  | `boolean`                 | `false`     |             | Estado inválido          |
| `size`     | `"sm" \| "md" \| "lg"`    | `"md"`      |             | Tamanho do input         |

---

## Variantes CVA

Reaproveita o formato de container do `ds-time-picker` ou `ds-input`, onde o input de texto possui um bloco de cor que funciona como o botão para abrir o seletor nativo.

---

## Acessibilidade

- O input de texto aceita valores hexadecimais, o que é ótimo para power users.
- O bloco de cor utiliza `type="color"` que possui acessibilidade nativa garantida pelos navegadores.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `Sizes`
- [x] `Disabled`
- [x] `Invalid`

---

## Checklist antes de implementar

- [x] O `<input type="color">` nativo deve ficar visualmente contido em um círculo/quadrado dentro do container principal.
- [x] O input de texto deve estar sincronizado bidirecionalmente.
