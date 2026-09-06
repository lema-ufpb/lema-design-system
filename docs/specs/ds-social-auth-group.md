# Spec: SocialAuthGroup

---

## Propósito

Conjunto de botões de autenticação federada / social e institucional, suportando provedores globais (Google, GitHub, Microsoft, Apple) e ecossistema público/acadêmico brasileiro (Gov.br e CAFe / UFPB).

**Usar quando:** Permitir login ou cadastro com um clique através de provedores externos confiáveis.
**Não usar quando:** O sistema exigir exclusivamente credenciais locais sem suporte a OAuth/OpenID Connect.
**Alternativa se não se aplicar:** Botões avulsos de `Button`.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/social-auth-group.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Actions`                             |
| Depende de | `Button`, `UI_I18N`                   |

---

## API — Props

| Prop              | Tipo                                                                         | Padrão                 | Descrição                                        |
| ----------------- | ---------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------ |
| `providers`       | `Array<"google" \| "github" \| "microsoft" \| "apple" \| "govbr" \| "cafe">` | `["google", "github"]` | Lista ordenada de provedores a exibir            |
| `layout`          | `"stacked" \| "inline" \| "grid"`                                            | `"stacked"`            | Disposição visual dos botões                     |
| `size`            | `"sm" \| "md" \| "lg"`                                                       | `"md"`                 | Escala de tamanho dos botões                     |
| `loadingProvider` | `string \| null`                                                             | `null`                 | Provedor atualmente em processo de autenticação  |
| `disabled`        | `boolean`                                                                    | `false`                | Desabilita todos os botões                       |
| `onSelect`        | `(provider: string) => void`                                                 | —                      | Callback acionado ao clicar em um provedor       |
| `locale`          | `UILocale`                                                                   | `"pt-BR"`              | Idioma para os rótulos de acessibilidade e texto |
| `className`       | `string`                                                                     | —                      | Classes extras do contêiner                      |

---

## Variantes CVA

| Dimensão | Valores                     | Padrão    |
| -------- | --------------------------- | --------- |
| `layout` | `stacked`, `inline`, `grid` | `stacked` |

- `socialAuthGroupVariants` — contêiner flex/grid com espaçamento consistente (`gap-2` ou `gap-3`).

---

## Acessibilidade

- [x] Cada botão possui texto legível ou `aria-label` descritivo (ex: "Continuar com Gov.br").
- [x] O provedor em carregamento exibe spinner e desabilita os demais botões com `aria-busy="true"`.
- [x] Foco via teclado (`Tab` / `Enter` / `Space`) com anéis de foco visíveis (`focus-visible:ring-ring`).
