# Spec: TwoFactorAuth

---

## Propósito

Desafio completo de autenticação em duas etapas (2FA / MFA) com suporte a código de verificação OTP de 6 dígitos, expiração, reenvio e alternância entre métodos de verificação.

**Usar quando:** Exigir confirmação adicional de identidade após inserção de credenciais ou operações sensíveis.
**Não usar quando:** Apenas autenticação por senha comum sem segundo fator ativado.
**Alternativa se não se aplicar:** `InputOTP` isolado.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/two-factor-auth.tsx`         |
| Tipo       | `registry:ui`                               |
| Categoria  | `Form`                                      |
| Depende de | `InputOTP`, `Button`, `Checkbox`, `UI_I18N` |

---

## API — Props

| Prop                  | Tipo                                                                       | Padrão    | Descrição                                                   |
| --------------------- | -------------------------------------------------------------------------- | --------- | ----------------------------------------------------------- |
| `onVerify`            | `(code: string, trustDevice: boolean) => Promise<boolean \| void> \| void` | —         | Callback de verificação do código                           |
| `onResend`            | `() => Promise<void> \| void`                                              | —         | Callback para solicitar reenvio do código                   |
| `resendCooldown`      | `number`                                                                   | `60`      | Segundos de contagem regressiva para novo envio             |
| `destination`         | `string`                                                                   | —         | Destino ofuscado (ex: "al***@ufpb.br" ou "(83) 9****-1234") |
| `method`              | `"authenticator" \| "email" \| "sms"`                                      | `"email"` | Método de envio ou geração do código                        |
| `allowAlternative`    | `boolean`                                                                  | `true`    | Exibe opção para usar outro método de validação             |
| `onAlternativeMethod` | `() => void`                                                               | —         | Callback acionado ao clicar em método alternativo           |
| `locale`              | `UILocale`                                                                 | `"pt-BR"` | Idioma para as mensagens e instruções                       |
| `className`           | `string`                                                                   | —         | Classes extras                                              |

---

## Acessibilidade

- [x] Foco automático no primeiro campo do código OTP.
- [x] Leitura de status de reenvio via `role="status"` e `aria-live="polite"`.
- [x] Teclado funcional em todos os botões e inputs.
