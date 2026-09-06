# Spec: MagicLinkForm

---

## Propósito

Formulário de autenticação sem senha (passwordless) com envio de link mágico por e-mail, transição suave para tela de sucesso com atalhos de cliente de e-mail e temporizador de reenvio.

**Usar quando:** Permitir login direto seguro sem necessidade de lembrar senhas.
**Não usar quando:** O usuário precisar definir ou autenticar com senha tradicional.
**Alternativa se não se aplicar:** `Input` e `Button` avulsos.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/magic-link-form.tsx` |
| Tipo       | `registry:ui`                       |
| Categoria  | `Form`                              |
| Depende de | `Input`, `Button`, `UI_I18N`        |

---

## API — Props

| Prop             | Tipo                                                  | Padrão    | Descrição                                       |
| ---------------- | ----------------------------------------------------- | --------- | ----------------------------------------------- |
| `onSendLink`     | `(email: string) => Promise<boolean \| void> \| void` | —         | Callback de envio do link mágico                |
| `onBack`         | `() => void`                                          | —         | Callback para voltar ao método com senha        |
| `resendCooldown` | `number`                                              | `45`      | Segundos de contagem regressiva para novo envio |
| `locale`         | `UILocale`                                            | `"pt-BR"` | Idioma para as mensagens e instruções           |
| `className`      | `string`                                              | —         | Classes extras do contêiner                     |

---

## Acessibilidade

- [x] Input com validação HTML5 e `aria-label`.
- [x] Anúncio do estado de envio ("Link enviado para [email]") via `role="status"` e `aria-live="polite"`.
- [x] Temporizador atualizado de forma não intrusiva.
