# Spec: EmptyAction (ds-empty-action)

> Spec do componente `EmptyAction` para o LEMA Design System.

---

## Propósito

O `EmptyAction` fornece um estado vazio semântico e acionável (Actionable Empty State) para primeiras experiências do usuário (zero-data / onboarding), resultados nulos de busca ou filtros sem retorno. Em vez de apenas informar a ausência de dados, ele conduz o usuário ao próximo passo com uma ação principal, atalhos de ajuda e sugestões recomendadas.

**Usar quando:**

- Primeira vez que o usuário acessa um módulo vazio (ex: nenhum modelo cadastrado, nenhuma simulação executada).
- Busca ou filtros avançados que não retornam resultados em tabelas.
- Diretórios de arquivos ou repositórios de dados vazios.

**Não usar quando:**

- Mensagens de erro de rede ou falha de requisição (use `Alert` ou `Empty` com ícone de erro).

**Alternativa se não se aplicar:** `Empty`.

---

## Localização

| Campo      | Valor                            |
| ---------- | -------------------------------- |
| Arquivo    | `components/ds/empty-action.tsx` |
| Tipo       | `registry:ui`                    |
| Categoria  | `Feedback`                       |
| Depende de | `button`, `ui-i18n`              |

---

## API — Props

| Prop              | Tipo                                                              | Padrão    | Obrigatória | Descrição                                       |
| ----------------- | ----------------------------------------------------------------- | --------- | ----------- | ----------------------------------------------- |
| `icon`            | `React.ReactNode`                                                 | —         |             | Ícone representativo no topo                    |
| `title`           | `React.ReactNode`                                                 | —         | ✓           | Título do estado vazio                          |
| `description`     | `React.ReactNode`                                                 | —         | ✓           | Descrição explicando o motivo e como prosseguir |
| `primaryAction`   | `{ label: string; onClick?: () => void; icon?: React.ReactNode }` | —         |             | Botão de ação primário                          |
| `secondaryAction` | `{ label: string; onClick?: () => void }`                         | —         |             | Ação secundária ou link de documentação         |
| `suggestions`     | `string[]`                                                        | —         |             | Lista de sugestões ou passos recomendados       |
| `size`            | `"sm" \| "md" \| "lg"`                                            | `"md"`    |             | Escala de dimensionamento                       |
| `locale`          | `UILocale`                                                        | `"pt-BR"` |             | Idioma para rótulos padrão                      |
| `className`       | `string`                                                          | —         |             | Classes customizadas para o wrapper             |

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                                |
| ----------------------- | ------------------------------------------------ |
| `bg-muted/40`           | Círculo de destaque do ícone e moldura tracejada |
| `text-foreground`       | Título principal do estado vazio                 |
| `text-muted-foreground` | Descrição e textos de apoio                      |
| `border-dashed`         | Borda tracejada suave ao redor do container      |

---

## Escala tipográfica e de tamanho

| Slot       | sm                      | md                        | lg                      |
| ---------- | ----------------------- | ------------------------- | ----------------------- |
| Título     | `text-sm font-semibold` | `text-base font-semibold` | `text-lg font-semibold` |
| Descrição  | `text-xs`               | `text-sm`                 | `text-sm max-w-md`      |
| Ícone slot | `size-10`               | `size-14`                 | `size-16`               |
