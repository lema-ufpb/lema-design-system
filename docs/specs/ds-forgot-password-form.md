# Spec: ForgotPasswordForm

---

## Propósito

Bloco completo de recuperação de conta e redefinição de senha com instruções claras, input de e-mail e transição para estado de confirmação com temporizador de reenvio.

**Usar quando:** Usuário esquecer sua senha em fluxos de login ou redefinição forçada de credenciais.
**Não usar quando:** Fluxos normais de login com senha disponível.
**Alternativa se não se aplicar:** `InputEmail` com botão simples.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/forgot-password-form.tsx` |
| Tipo       | `registry:ui`                            |
| Categoria  | `Form`                                   |
| Depende de | `InputEmail`, `Button`, `UI_I18N`        |

---

## API — Props

| Prop             | Tipo                                                  | Padrão    | Descrição                                   |
| ---------------- | ----------------------------------------------------- | --------- | ------------------------------------------- |
| `onSubmit`       | `(email: string) => Promise<boolean \| void> \| void` | —         | Callback de envio do link de recuperação    |
| `onBackToLogin`  | `() => void`                                          | —         | Callback para retornar à tela de login      |
| `resendCooldown` | `number`                                              | `60`      | Segundos de espera para permitir novo envio |
| `loading`        | `boolean`                                             | `false`   | Estado de processamento                     |
| `locale`         | `UILocale`                                            | `"pt-BR"` | Idioma da interface                         |
| `className`      | `string`                                              | —         | Classes extras                              |

---

## Acessibilidade

- [x] Tela de confirmação anuncia o e-mail de destino via `role="status"` e `aria-live="polite"`.
- [x] Tecla `Enter` submete o formulário com foco mantido adequadamente.
