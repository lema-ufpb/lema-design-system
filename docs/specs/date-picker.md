# Spec: DatePicker

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/date-picker.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Oferece um seletor de data amigável combinando um botão (que exibe a data formatada) e um `Popover` contendo um `Calendar`.

**Usar quando:** Precisar que o usuário selecione uma data específica em um formulário ou filtro.
**Não usar quando:** Precisar selecionar um intervalo (use `DateRangePicker`) ou hora do dia.

---

## Localização

| Campo      | Valor                                                       |
| ---------- | ----------------------------------------------------------- |
| Arquivo    | `components/ds/date-picker.tsx`                             |
| Tipo       | `registry:ui`                                               |
| Categoria  | `Form`                                                      |
| Depende de | `Popover`, `Calendar`, `Button`, `lucide-react`, `date-fns` |

---

## API — Props

| Prop          | Tipo                    | Padrão                 | Obrigatória | Descrição                                    |
| ------------- | ----------------------- | ---------------------- | ----------- | -------------------------------------------- |
| `date`        | `Date`                  | —                      |             | Data selecionada atual.                      |
| `onSelect`    | `(date?: Date) => void` | —                      |             | Callback disparado ao selecionar data.       |
| `placeholder` | `string`                | `"Selecione uma data"` |             | Texto quando não há data selecionada.        |
| `disabled`    | `boolean`               | `false`                |             | Se o input deve estar desabilitado.          |
| `locale`      | `UILocale`              | `pt-BR`                |             | Idioma para formatação da data via date-fns. |
| `className`   | `string`                | —                      |             | Classes adicionais para o botão trigger.     |

---

## Variantes CVA

Este componente herda o tamanho e variantes do `Button` para o trigger.
A propriedade `size` ("sm", "md", "lg") pode ser repassada.

---

## Acessibilidade

| Requisito | Implementação                                                                    |
| --------- | -------------------------------------------------------------------------------- |
| Teclado   | Navegação pelo calendário suportada pelo componente base `Calendar` (DayPicker). |

---

## Stories obrigatórias no Storybook

- [x] `Default` — DatePicker básico.
- [x] `Disabled` — `disabled={true}`.
- [x] `WithPreset` — com uma data pré-selecionada.
