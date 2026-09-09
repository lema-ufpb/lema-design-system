# Spec: SkeletonLayout (ds-skeleton-layout)

> Spec do componente `SkeletonLayout` para o LEMA Design System.

---

## Propósito

O `SkeletonLayout` fornece estruturas completas pré-compostas de esqueletos de carregamento (Skeleton Screens) para as telas e padrões mais comuns do sistema (Dashboard, Tabela, Perfil, Formulário, Lista), garantindo conformidade rigorosa com a regra de nunca usar `animate-pulse` em divs customizados.

**Usar quando:**

- Carregamento inicial de páginas inteiras ou painéis de dashboard (SSR / Suspense).
- Estados de carregamento de tabelas de dados (`DataTable`) enquanto os dados da API são requisitados.
- Transições de tela em rotas dinâmicas do Next.js App Router (`loading.tsx`).

**Não usar quando:**

- Componentes atômicos individuais (use o `<Skeleton>` primitivo diretamente ou o prop `loading={true}` do componente).

**Alternativa se não se aplicar:** `Skeleton`.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/skeleton-layout.tsx` |
| Tipo       | `registry:ui`                       |
| Categoria  | `Feedback`                          |
| Depende de | `skeleton`, `card`, `ui-i18n`       |

---

## API — Props

| Prop        | Tipo                                                      | Padrão        | Obrigatória | Descrição                                         |
| ----------- | --------------------------------------------------------- | ------------- | ----------- | ------------------------------------------------- |
| `pattern`   | `"dashboard" \| "table" \| "profile" \| "form" \| "list"` | `"dashboard"` |             | Padrão arquitetural da tela a simular             |
| `rows`      | `number`                                                  | `4`           |             | Quantidade de linhas para os padrões tabela/lista |
| `columns`   | `number`                                                  | `4`           |             | Quantidade de colunas para padrão tabela          |
| `locale`    | `UILocale`                                                | `"pt-BR"`     |             | Idioma para rótulos acessíveis                    |
| `className` | `string`                                                  | —             |             | Classes customizadas para o wrapper               |

---

## Tokens de design utilizados

| Token                       | Slot onde é usado                                   |
| --------------------------- | --------------------------------------------------- |
| `bg-muted`                  | Barras e blocos de Skeleton                         |
| `bg-card` / `border-border` | Moldura dos cartões nos padrões de dashboard e form |

---

## Comportamentos e estados

- **Padrão `dashboard`:** Simula cabeçalho, grade de 3 cartões estatísticos superiores e dois cartões de gráficos/tabelas abaixo.
- **Padrão `table`:** Simula barra de busca no topo, cabeçalho de colunas e linhas tabulares alternadas.
- **Padrão `profile`:** Simula avatar circular, nome, biografia e grade de campos de detalhes.
- **Padrão `form`:** Simula campos de input com labels superiores e botões de ação no rodapé.
- **Padrão `list`:** Simula lista de itens com avatar à esquerda e linhas de texto duplo.
