# Spec: PasswordStrengthMeter

---

## Propósito

Medidor interativo de complexidade e segurança de senha com indicador visual de 4 níveis semânticos e checklist de requisitos em tempo real.

**Usar quando:** Formulários de cadastro, alteração de senha ou redefinição de credenciais para orientar o usuário a criar senhas fortes.
**Não usar quando:** Apenas autenticar (tela de login), onde a complexidade não é avaliada.
**Alternativa se não se aplicar:** Apenas texto estático com as regras de senha.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/password-strength-meter.tsx` |
| Tipo       | `registry:ui`                               |
| Categoria  | `Feedback`                                  |
| Depende de | `Progress`, `UI_I18N`                       |

---

## API — Props

| Prop            | Tipo             | Padrão    | Descrição                                  |
| --------------- | ---------------- | --------- | ------------------------------------------ |
| `password`      | `string`         | `""`      | Valor da senha digitada pelo usuário       |
| `showChecklist` | `boolean`        | `true`    | Exibe a lista de verificação de requisitos |
| `minLength`     | `number`         | `8`       | Comprimento mínimo exigido                 |
| `rules`         | `PasswordRule[]` | —         | Regras customizadas opcionais              |
| `locale`        | `UILocale`       | `"pt-BR"` | Idioma dos rótulos e mensagens             |
| `className`     | `string`         | —         | Classes extras do contêiner                |

---

## Variantes CVA

- `passwordStrengthVariants` — layout do medidor de barras (4 segmentos com transição suave e cores semânticas `destructive`, `warning`, `success`).

---

## Acessibilidade

- [x] Região de status dinâmico com `role="status"`, `aria-live="polite"` e `aria-atomic="true"`.
- [x] Ícones de check/x usam `aria-hidden="true"` com texto acessível associado.
- [x] Não depende apenas de cor para transmitir significado: utiliza texto explicativo ("Fraca", "Média", "Forte", "Excelente").
