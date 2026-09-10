# Spec: MultiSelect

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/multi-select.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Permite ao usuário selecionar múltiplas opções a partir de uma lista em formato de menu suspenso (combobox).

**Usar quando:** Precisar que o usuário selecione 1 ou mais itens de uma lista pré-definida com suporte a pesquisa.
**Não usar quando:** Apenas 1 opção for permitida (use `Select` ou `Combobox`) ou houver poucas opções (use `Checkbox`).

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/multi-select.tsx`              |
| Tipo       | `registry:ui`                                 |
| Categoria  | `Form`                                        |
| Depende de | `Popover`, `Command`, `Badge`, `lucide-react` |

---

## API — Props

| Prop          | Tipo                                 | Padrão            | Obrigatória | Descrição                                      |
| ------------- | ------------------------------------ | ----------------- | ----------- | ---------------------------------------------- |
| `options`     | `{ label: string, value: string }[]` | —                 | ✓           | Lista de opções disponíveis.                   |
| `value`       | `string[]`                           | `[]`              | ✓           | Valores selecionados.                          |
| `onChange`    | `(value: string[]) => void`          | —                 | ✓           | Callback disparado ao selecionar/deselecionar. |
| `placeholder` | `string`                             | `"Selecionar..."` |             | Placeholder do input.                          |
| `disabled`    | `boolean`                            | `false`           |             | Se desabilitado.                               |
| `maxCount`    | `number`                             | `3`               |             | Máximo de badges antes de agrupar em "+N".     |
| `locale`      | `UILocale`                           | `pt-BR`           |             | Idioma.                                        |

---

## Comportamentos e estados

| Estado             | Comportamento esperado                             |
| ------------------ | -------------------------------------------------- |
| Selecionar opção   | Adiciona o item ao array `value`.                  |
| Deselecionar opção | Remove o item do array `value`.                    |
| MaxCount excedido  | Exibe os N primeiros e um badge "+X selecionados". |

---

## Acessibilidade

| Requisito | Implementação                                         |
| --------- | ----------------------------------------------------- |
| Teclado   | O `Command` base já fornece suporte total ao teclado. |
| Foco      | Foco no input de busca ao abrir.                      |

---

## Stories obrigatórias no Storybook

- [x] `Default` — MultiSelect básico.
- [x] `Disabled` — `disabled={true}`.
- [x] `MaxCount` — Testando comportamento de limite de exibição.
