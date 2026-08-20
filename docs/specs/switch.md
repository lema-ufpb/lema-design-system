# Spec: Switch

> Controle de alternância binária para ativar/desativar configurações ou preferências.

---

## Propósito

**Usar quando:** O usuário precisa ativar ou desativar uma configuração, recurso ou preferência de forma instantânea (sem confirmação).

**Não usar quando:** A opção exige confirmação ou tem consequências destrutivas imediatas (usar Dialog de confirmação). Há mais de duas opções (usar Radio Group ou Select).

**Alternativa:** Checkbox para múltiplas opções independentes, Toggle para botões de formatação.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ui/switch.tsx`     |
| Tipo       | `registry:ui` (name: `switch`) |
| Categoria  | Formulário / Seleção binária   |
| Depende de | `radix-ui`                     |

---

## API — Props

| Prop              | Tipo                         | Padrão      | Obrigatória | Descrição              |
| ----------------- | ---------------------------- | ----------- | ----------- | ---------------------- |
| `size`            | `"sm" \| "default"`          | `"default"` | Não         | Tamanho do switch      |
| `defaultChecked`  | `boolean`                    | `false`     | Não         | Estado inicial marcado |
| `checked`         | `boolean`                    | —           | Não         | Estado controlado      |
| `onCheckedChange` | `(checked: boolean) => void` | —           | Não         | Callback de mudança    |
| `disabled`        | `boolean`                    | `false`     | Não         | Desabilita interação   |
| `className`       | `string`                     | —           | Não         | Classes adicionais     |

Demais props são herdadas de `SwitchPrimitive.Root`.

---

## Tokens de design

| Token                  | Slot                                |
| ---------------------- | ----------------------------------- |
| `--primary`            | Fundo quando checked                |
| `--input / 90%`        | Fundo quando unchecked              |
| `--background`         | Thumb (claro, unchecked light mode) |
| `--primary-foreground` | Thumb (checked dark mode)           |
| `--foreground`         | Thumb (unchecked dark mode)         |
| `--ring / 30%`         | Anel de foco                        |
| `--destructive / 20%`  | Anel de estado inválido             |

---

## Comportamentos e estados

| Estado                     | Comportamento                                      |
| -------------------------- | -------------------------------------------------- |
| **Unchecked**              | Fundo `bg-input/90`, thumb à esquerda              |
| **Checked**                | Fundo `bg-primary`, thumb à direita                |
| **Unchecked dark**         | Thumb `bg-foreground`                              |
| **Checked dark**           | Thumb `bg-primary-foreground`                      |
| **Disabled unchecked**     | `opacity-50`, `cursor-not-allowed`                 |
| **Disabled checked**       | `opacity-50`, mantém checked                       |
| **Focus**                  | `focus-visible:ring-3 focus-visible:ring-ring/30`  |
| **Invalid (aria-invalid)** | Borda `border-destructive` + ring `destructive/20` |

---

## Acessibilidade

| Requisito    | Implementação                                    |
| ------------ | ------------------------------------------------ |
| Role         | `role="switch"` no Radix                         |
| Rótulo       | Associado a `<label>` ou `aria-label`            |
| Foco visível | `focus-visible:border-ring focus-visible:ring-3` |
| Estado       | `data-checked` / `data-unchecked` para estados   |
| Teclado      | Space/Enter para alternar (nativo Radix)         |

---

## Stories obrigatórias

- [x] `Default` — unchecked, size default
- [x] `Sizes` — `sm` e `default` lado a lado, ambos checked
- [x] `Controlled` — estado controlado com React state
- [x] `States` — unchecked, checked, disabled unchecked, disabled checked

---

## Checklist

- [x] Componente implementado em `switch.tsx`
- [x] Stories implementadas (Default, Sizes, Controlled, States)
- [x] Usa `data-slot` e `data-size`
- [x] Suporte a tamanhos `sm` e `default`
- [x] Tokens semânticos (`--primary`, `--input`, `--background`, `--ring`, `--destructive`)
- [x] Estado `aria-invalid` com feedback visual destrutivo
