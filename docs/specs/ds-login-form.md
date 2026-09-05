# Spec: LoginForm

---

## Propósito

Bloco completo e pronto para produção de formulário de login, orquestrando login social, divisor estilizado, campos de credenciais, link de recuperação de senha, opção de login biométrico com Passkey e estados de loading/erro.

**Usar quando:** Páginas de login `/login`, diálogos modais de autenticação ou portais institucionais.
**Não usar quando:** Fluxos de cadastro de nova conta (usar `SignUpForm`).
**Alternativa se não se aplicar:** Montagem manual com `FieldGroup`, `InputEmail`, `InputPassword` e `Button`.

---

## Localização

| Campo      | Valor                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/login-form.tsx`                                                                                      |
| Tipo       | `registry:ui`                                                                                                       |
| Categoria  | `Form`                                                                                                              |
| Depende de | `SocialAuthGroup`, `AuthSeparator`, `PasskeyPrompt`, `InputEmail`, `InputPassword`, `Checkbox`, `Button`, `UI_I18N` |

---

## API — Props

| Prop               | Tipo                                                                                                  | Padrão                          | Descrição                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- |
| `onSubmit`         | `(data: { email: string; password?: string; remember: boolean }) => Promise<boolean \| void> \| void` | —                               | Callback de submissão                             |
| `onSocialLogin`    | `(provider: string) => Promise<void> \| void`                                                         | —                               | Callback para login via provedor externo          |
| `onForgotPassword` | `() => void`                                                                                          | —                               | Callback para navegar para recuperação de senha   |
| `onSignUp`         | `() => void`                                                                                          | —                               | Callback para navegar para cadastro               |
| `onPasskeyLogin`   | `() => Promise<boolean \| void> \| void`                                                              | —                               | Callback opcional para acionar WebAuthn/Passkey   |
| `socialProviders`  | `Array<"google" \| "github" \| "microsoft" \| "apple" \| "govbr" \| "cafe">`                          | `["google", "github", "govbr"]` | Provedores sociais habilitados                    |
| `showPasskey`      | `boolean`                                                                                             | `true`                          | Exibe atalho de biometria / Passkey               |
| `loading`          | `boolean`                                                                                             | `false`                         | Bloqueia o formulário e exibe spinner             |
| `errorMessage`     | `string`                                                                                              | —                               | Mensagem de erro de autenticação vinda do backend |
| `locale`           | `UILocale`                                                                                            | `"pt-BR"`                       | Idioma da interface                               |
| `className`        | `string`                                                                                              | —                               | Classes extras                                    |

---

## Acessibilidade

- [x] Formulário semântico com validação nativa e atributos `aria-invalid`.
- [x] Mensagens de erro com `role="alert"` e `aria-live="assertive"`.
- [x] Contraste nos links de recuperação e termos compatível com WCAG AA.
