# Spec: Input OTP

> Input de senha descartável (OTP) para códigos de verificação.

---

## Propósito

Campo de entrada segmentado para códigos de verificação, PINs e autenticação multifator, com slots individuais e separadores visuais.

**Usar quando:** O usuário precisa digitar um código de verificação numérico ou alfanumérico de poucos caracteres.

**Não usar quando:** O código é longo ou pode ser copiado/colado como texto completo (use Input). Para senhas comuns, use Input com type="password".

**Alternativa se não se aplicar:** `Input` com `type="text"` e `maxLength` para códigos simples; `InputGroup` para input com máscara.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/input-otp.tsx` |
| Tipo | `registry:ui` (name: `input-otp`) |
| Categoria | Formulário / Entrada |
| Depende de | `input-otp`, `lucide-react` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `InputOTP.containerClassName` | `string` | — | — | Classe para o container interno |
| `InputOTP` | `OTPInput.Props` + extras | — | — | Root do OTP |
| `InputOTPGroup` | `React.ComponentProps<"div">` | — | — | Grupo de slots |
| `InputOTPSlot.index` | `number` | — | Sim | Índice do slot (0-based) |
| `InputOTPSlot` | `React.ComponentProps<"div">` + extras | — | — | Slot individual |
| `InputOTPSeparator` | `React.ComponentProps<"div">` | — | — | Separador visual entre grupos |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--input/50` | Fundo do slot |
| `--input` | Borda do slot |
| `--ring` | Borda de foco no slot ativo |
| `--ring/30` | Ring de foco |
| `--destructive` | Borda de erro |
| `--destructive/20` | Ring de erro |
| `--foreground` | Caret piscante (`animate-caret-blink`) |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Slot com borda `border-input`, fundo `bg-input/50` |
| **Active (foco)** | Slot com `data-active`, `border-ring`, `ring-3 ring-ring/30` |
| **Preenchido** | Exibe o caractere digitado (`char`) |
| **Caret** | Caret animado (`animate-caret-blink`) quando slot vazio e ativo |
| **Focused (fake caret)** | Barra vertical piscante via `hasFakeCaret` |
| **Invalid** | `aria-invalid` no grupo: `border-destructive`, `ring-destructive/20` |
| **Disabled** | Container com `opacity-50`, input desabilitado |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | `input-otp` gerencia entrada de dígitos |
| ARIA | Input oculto gerenciado pela lib `input-otp` |
| Separador | `role="separator"` no `InputOTPSeparator` |

---

## Stories obrigatórias

- [x] `Default`
- [x] `FourDigits`

---

## Checklist

- [ ] Slots individuais com índice posicional
- [ ] Grupos de slots com bordas arredondadas nas extremidades
- [ ] Separador visual com ícone Minus
- [ ] Caret animado no slot ativo vazio
- [ ] Estados: default, active, filled, invalid, disabled
- [ ] Suporte a `maxLength` e `containerClassName`
