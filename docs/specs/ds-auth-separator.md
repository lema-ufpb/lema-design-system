# Spec: AuthSeparator

---

## Propósito

Divisor estilizado com rótulo centralizado para transição harmoniosa entre autenticação social e formulário de credenciais tradicionais.

**Usar quando:** Separar blocos de opções de autenticação (ex: "ou continue com e-mail", "ou entre com SSO").
**Não usar quando:** Divisões puramente estruturais sem texto (usar `Separator` primitivo).
**Alternativa se não se aplicar:** `<Separator />` simples.

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ds/auth-separator.tsx`   |
| Tipo       | `registry:ui`                        |
| Categoria  | `Data Display`                       |
| Depende de | Nenhum primitivo externo obrigatório |

---

## API — Props

| Prop        | Tipo                                 | Padrão      | Descrição                                 |
| ----------- | ------------------------------------ | ----------- | ----------------------------------------- |
| `variant`   | `"default" \| "badge" \| "gradient"` | `"default"` | Estilo visual do divisor e rótulo         |
| `children`  | `React.ReactNode`                    | —           | Texto ou conteúdo centralizado do divisor |
| `className` | `string`                             | —           | Classes extras                            |

---

## Variantes CVA

| Dimensão  | Valores                        | Padrão    |
| --------- | ------------------------------ | --------- |
| `variant` | `default`, `badge`, `gradient` | `default` |

---

## Acessibilidade

- [x] Rótulo semântico com contraste adequado em light e dark mode.
- [x] Linhas decorativas usam `aria-hidden="true"` para evitar ruído em leitores de tela.
