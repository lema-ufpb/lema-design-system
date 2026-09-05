# Spec: ds-time-picker

> Componente de entrada de horário.

---

## Propósito

Permite a entrada de um horário específico (horas e minutos).

**Usar quando:** O usuário precisa selecionar ou digitar uma hora do dia (ex: agendamento, alarmes, registro de ponto).
**Não usar quando:** For necessária apenas uma data (use `ds-date-picker`) ou um período muito específico de duração (use `ds-input` com type number).

---

## Localização

| Campo      | Valor                                                    |
| ---------- | -------------------------------------------------------- |
| Arquivo    | `components/ds/time-picker.tsx`                          |
| Tipo       | `registry:ui` (name: `ds-time-picker`)                   |
| Categoria  | `Form`                                                   |
| Depende de | `ds-input` (ou `input` primitivo shadcn), `lucide-react` |

---

## API — Props

| Prop       | Tipo                   | Padrão  | Obrigatória | Descrição                       |
| ---------- | ---------------------- | ------- | ----------- | ------------------------------- |
| `value`    | `string`               | —       |             | Valor atual (HH:mm)             |
| `onChange` | `(v: string) => void`  | —       |             | Retorna string no formato HH:mm |
| `size`     | `"sm" \| "md" \| "lg"` | `"md"`  |             | Tamanho do campo                |
| `disabled` | `boolean`              | `false` |             | Estado desabilitado             |
| `invalid`  | `boolean`              | `false` |             | Estado de erro                  |
| `loading`  | `boolean`              | `false` |             | Mostra `<Skeleton>`             |

---

## Variantes CVA

| Dimensão  | Valores          | Padrão  |
| --------- | ---------------- | ------- |
| `size`    | `sm`, `md`, `lg` | `md`    |
| `invalid` | `true`, `false`  | `false` |

**Slots do componente**:

- `timePickerContainerVariants` — controla o layout externo caso o ícone fique fora ou dentro.
- Utiliza os estilos padrão do `input` para `time`.

---

## Tokens de design utilizados

| Token                   | Slot onde é usado      |
| ----------------------- | ---------------------- |
| `text-muted-foreground` | Ícone do relógio       |
| `border-input`          | Borda padrão           |
| `border-destructive`    | Borda quando `invalid` |

---

## Escala tipográfica e de tamanho

| Slot             | sm         | md        | lg          |
| ---------------- | ---------- | --------- | ----------- |
| Texto interno    | `text-xs`  | `text-sm` | `text-base` |
| Altura do input  | `h-8`      | `h-10`    | `h-12`      |
| Ícone (`size-*`) | `size-3.5` | `size-4`  | `size-5`    |

---

## Comportamentos e estados

| Estado           | Comportamento esperado                                  |
| ---------------- | ------------------------------------------------------- |
| `loading={true}` | `<Skeleton>` com altura do input e largura do container |
| `disabled`       | `opacity-50 pointer-events-none` na raiz do input       |
| `invalid`        | Borda vermelha `border-destructive`                     |

---

## Acessibilidade

| Requisito      | Implementação                                                  |
| -------------- | -------------------------------------------------------------- |
| Role semântico | Usa `<input type="time" />` para teclado/acessibilidade nativa |
| Erro           | `aria-invalid={invalid}` no `<input>`                          |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `Sizes`
- [x] `Invalid`
- [x] `Disabled`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `cn()` para todas as classes condicionais
