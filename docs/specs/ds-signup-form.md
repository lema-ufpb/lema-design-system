# Spec: SignUpForm

---

## Propósito

Bloco completo de cadastro e onboarding de novos usuários, integrando cadastro social, campos de nome e e-mail, senha com `PasswordStrengthMeter` em tempo real e aceite de termos de serviço.

**Usar quando:** Páginas de criação de conta `/register`, modais de onboarding ou cadastros em plataformas SaaS e acadêmicas.
**Não usar quando:** Fluxos de autenticação de usuários já existentes (usar `LoginForm`).
**Alternativa se não se aplicar:** Formulário básico customizado.

---

## Localização

| Campo      | Valor                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Arquivo    | `components/ds/signup-form.tsx`                                                                                                      |
| Tipo       | `registry:ui`                                                                                                                        |
| Categoria  | `Form`                                                                                                                               |
| Depende de | `SocialAuthGroup`, `AuthSeparator`, `PasswordStrengthMeter`, `Input`, `InputEmail`, `InputPassword`, `Checkbox`, `Button`, `UI_I18N` |

---

## API — Props

| Prop              | Tipo                                                                                                            | Padrão                          | Descrição                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------- |
| `onSubmit`        | `(data: { name: string; email: string; password: string; terms: boolean }) => Promise<boolean \| void> \| void` | —                               | Callback de cadastro                    |
| `onSocialSignUp`  | `(provider: string) => Promise<void> \| void`                                                                   | —                               | Callback para cadastro social           |
| `onLogin`         | `() => void`                                                                                                    | —                               | Callback para navegar de volta ao login |
| `socialProviders` | `Array<"google" \| "github" \| "microsoft" \| "apple" \| "govbr" \| "cafe">`                                    | `["google", "github", "govbr"]` | Provedores sociais habilitados          |
| `termsUrl`        | `string`                                                                                                        | `"#"`                           | Link para Termos de Uso                 |
| `privacyUrl`      | `string`                                                                                                        | `"#"`                           | Link para Política de Privacidade       |
| `loading`         | `boolean`                                                                                                       | `false`                         | Estado de carregamento da submissão     |
| `errorMessage`    | `string`                                                                                                        | —                               | Mensagem de erro retornada pela API     |
| `locale`          | `UILocale`                                                                                                      | `"pt-BR"`                       | Idioma da interface                     |
| `className`       | `string`                                                                                                        | —                               | Classes extras                          |

---

## Acessibilidade

- [x] Rótulos associados a todos os inputs (`htmlFor` / `id`).
- [x] Checkbox de termos obrigatório com validação visual e foco por teclado.
- [x] Medidor de senha anuncia acessibilidade via `aria-live`.
