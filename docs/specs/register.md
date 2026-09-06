# Spec: Register

> Formulário de cadastro com nome, email, senha, termos e social — átomo base register blockus #01-#12.

---

## Propósito

Card `rounded-2xl border bg-card p-6 gap-6` com `FieldGroup` + `Input` + `Password` + `Checkbox` + `Button`.

**Usar quando:** Cadastro de novo usuário.

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/register.tsx`                           |
| Tipo       | `registry:ui` (name: `ds-register`)                    |
| Categoria  | Auth                                                   |
| Depende de | `Input`, `Button`, `Checkbox`, `Label`, `UI_I18N.auth` |

---

## API — Props

| Prop         | Tipo                                 | Padrão                | Descrição       |
| ------------ | ------------------------------------ | --------------------- | --------------- |
| `onSubmit`   | `(data:{name,email,password})=>void` | —                     |                 |
| `showSocial` | `boolean`                            | `true`                | SocialAuthGroup |
| `socials`    | `SocialPlatform[]`                   | `["google","github"]` |                 |
| `locale`     | `UILocale`                           | `"en-US"`             | i18n            |
| `loading`    | `boolean`                            | `false`               | Skeleton        |

---

## Tokens

| Token                                   | Slot               |
| --------------------------------------- | ------------------ |
| `bg-card border`                        | card `rounded-2xl` |
| `text-foreground font-semibold text-lg` | title              |
| `text-muted-foreground text-sm`         | description        |

---

## Comportamentos

| Estado    | Comportamento          |
| --------- | ---------------------- |
| `loading` | `Skeleton h-10` inputs |
| `terms`   | `Checkbox required`    |

---

## Stories

- [ ] `Default`
- [ ] `WithoutSocial`
- [ ] `Loading`

---

## Checklist

- [x] `FieldGroup + Field` layout, `gap-4`
