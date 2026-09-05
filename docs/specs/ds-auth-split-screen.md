# Spec: AuthSplitScreen

---

## Propósito

Shell de layout de tela dividida (split-screen) completo para páginas de login e autenticação, unindo a coluna central do formulário com um painel da marca contendo citação/depoimento, métricas de confiança institucional e ambientação luminosa suave.

**Usar quando:** Construir páginas completas de `/login`, `/register` ou `/recover-password` com alto apelo visual e consistência de marca.
**Não usar quando:** O login precisar ocorrer dentro de uma janela modal compacta ou gaveta (drawer).
**Alternativa se não se aplicar:** `Card` centralizado em tela inteira.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/auth-split-screen.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Layout`                              |
| Depende de | `BackgroundGlow`, `Avatar`, `UI_I18N` |

---

## API — Props

| Prop               | Tipo                                                                  | Padrão    | Descrição                                          |
| ------------------ | --------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| `children`         | `React.ReactNode`                                                     | —         | Formulário principal (LoginForm, SignUpForm, etc.) |
| `logo`             | `React.ReactNode`                                                     | —         | Logotipo institucional ou da aplicação             |
| `appName`          | `string`                                                              | `"LEMA"`  | Nome do sistema exibido no cabeçalho               |
| `testimonial`      | `{ quote: string; author: string; role: string; avatarSrc?: string }` | —         | Depoimento destacado no painel da marca            |
| `stats`            | `Array<{ label: string; value: string }>`                             | —         | Métricas de impacto ou confiança exibidas          |
| `brandHeadline`    | `string`                                                              | —         | Título de impacto no painel da marca               |
| `brandDescription` | `string`                                                              | —         | Descrição do ecossistema no painel da marca        |
| `locale`           | `UILocale`                                                            | `"pt-BR"` | Idioma para textos de suporte                      |
| `className`        | `string`                                                              | —         | Classes extras do container                        |

---

## Acessibilidade

- [x] O painel da marca possui `aria-hidden="true"` quando estritamente decorativo em leitores de tela para evitar ruído.
- [x] O formulário principal reside na primeira seção de foco para navegação por teclado instantânea.
- [x] Contraste de cores em light e dark mode testado com axe-core.
