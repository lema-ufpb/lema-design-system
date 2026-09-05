# Spec: ds-otp-input

> Componente de design system encapsulando o `input-otp` do shadcn.

---

## Propósito

Fornece um campo de entrada de OTP (One-Time Password) estilizado, consistente com o LEMA Design System, com suporte a tamanhos, estados de carregamento e invalidação.

**Usar quando:** O usuário precisa digitar códigos curtos, como SMS OTP, códigos 2FA ou PIN.
**Não usar quando:** O usuário precisa digitar senhas longas (use `ds-input` com type="password").
**Alternativa se não se aplicar:** `ds-input` com `maxLength`.

---

## Localização

| Campo      | Valor                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Arquivo    | `components/ds/otp-input.tsx`                                         |
| Tipo       | `registry:ui` (name: `ds-otp-input`)                                  |
| Categoria  | `Form`                                                                |
| Depende de | `input-otp` (components/ui/input-otp.tsx), `skeleton`, `lucide-react` |

---

## API — Props

| Prop        | Tipo                      | Padrão  | Obrigatória | Descrição              |
| ----------- | ------------------------- | ------- | ----------- | ---------------------- |
| `value`     | `string`                  | —       |             | Valor do OTP           |
| `onChange`  | `(value: string) => void` | —       |             | Handler para mudança   |
| `maxLength` | `number`                  | `6`     |             | Quantidade de dígitos  |
| `size`      | `"sm" \| "md" \| "lg"`    | `"md"`  |             | Tamanho do componente  |
| `loading`   | `boolean`                 | `false` |             | Estado de carregamento |
| `invalid`   | `boolean`                 | `false` |             | Estado de erro         |
| `disabled`  | `boolean`                 | `false` |             | Estado desabilitado    |

---

## Variantes CVA

| Dimensão  | Valores          | Padrão  |
| --------- | ---------------- | ------- |
| `size`    | `sm`, `md`, `lg` | `md`    |
| `invalid` | `true`, `false`  | `false` |

**Slots do componente**:

- `otpInputSlotVariants` — controla o tamanho do slot interno e fontes.
- `otpInputSeparatorVariants` — controla o espaçamento e tamanho do separador.

---

## Tokens de design utilizados

| Token                 | Slot onde é usado            |
| --------------------- | ---------------------------- |
| `bg-muted`            | fundo (default do input-otp) |
| `text-foreground`     | valor principal              |
| `border-destructive`  | borda em erro (invalid)      |
| `ring-destructive/20` | ring de foco em erro         |

---

## Escala tipográfica e de tamanho

| Slot                  | sm        | md          | lg          |
| --------------------- | --------- | ----------- | ----------- |
| Slot text             | `text-xs` | `text-sm`   | `text-base` |
| Tamanho do slot (h/w) | `h-8 w-8` | `h-10 w-10` | `h-12 w-12` |

---

## Comportamentos e estados

| Estado           | Comportamento esperado                                 |
| ---------------- | ------------------------------------------------------ |
| `loading={true}` | `<Skeleton>` com altura e largura de acordo com `size` |
| `disabled`       | `opacity-50 pointer-events-none`                       |
| `invalid`        | Adiciona classes de erro visual (`border-destructive`) |

---

## Acessibilidade

| Requisito      | Implementação                                  |
| -------------- | ---------------------------------------------- |
| Rótulo         | Deve aceitar `aria-label` ou `aria-labelledby` |
| Role semântico | Gerenciado pela primitiva `input-otp`          |
| Erro           | `aria-invalid` quando aplicável                |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `Sizes` (sm, md, lg)
- [x] `Invalid`
- [x] `Disabled`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
