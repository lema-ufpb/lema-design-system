# Spec: TransferList (ds-transfer-list)

> Spec do componente `TransferList` para o LEMA Design System.

---

## Propósito

O `TransferList` resolve a seleção e atribuição de itens entre dois conjuntos (Disponíveis vs. Selecionados) de forma visual e intuitiva, com suporte a busca rápida, ações em lote ("Mover Todos") e contadores de itens.

**Usar quando:**

- Seleção de variáveis e regressores em modelos econométricos ou simulações.
- Atribuição de permissões, papéis de acesso ou membros de equipe a projetos.
- Configuração de colunas visíveis em tabelas analíticas complexas.

**Não usar quando:**

- Seleção simples de poucas opções (use `Checkbox` ou `MultiSelect`).
- Seleção em árvore hierárquica profunda (use `TreeSelect`).

**Alternativa se não se aplicar:** `MultiSelect`, `Combobox`.

---

## Localização

| Campo      | Valor                                                   |
| ---------- | ------------------------------------------------------- |
| Arquivo    | `components/ds/transfer-list.tsx`                       |
| Tipo       | `registry:ui`                                           |
| Categoria  | `Form`                                                  |
| Depende de | `checkbox`, `button`, `input`, `scroll-area`, `ui-i18n` |

---

## API — Props

| Prop         | Tipo                            | Padrão    | Obrigatória | Descrição                                       |
| ------------ | ------------------------------- | --------- | ----------- | ----------------------------------------------- |
| `items`      | `TransferListItem[]`            | —         | ✓           | Lista total de itens disponíveis                |
| `value`      | `string[]`                      | `[]`      | ✓           | IDs dos itens atualmente selecionados à direita |
| `onChange`   | `(newValues: string[]) => void` | —         | ✓           | Callback disparado ao transferir itens          |
| `titles`     | `[string, string]`              | —         |             | Títulos customizados dos dois painéis           |
| `searchable` | `boolean`                       | `true`    |             | Habilita caixa de busca em cada painel          |
| `disabled`   | `boolean`                       | `false`   |             | Desabilita a transferência de itens             |
| `locale`     | `UILocale`                      | `"pt-BR"` |             | Idioma para rótulos e buscas                    |
| `className`  | `string`                        | —         |             | Classes de estilização externa                  |

### Tipo `TransferListItem`

```tsx
export interface TransferListItem {
  id: string
  label: string
  description?: string
  disabled?: boolean
}
```

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                      |
| ----------------------- | -------------------------------------- |
| `bg-card`               | Superfície de cada painel lateral      |
| `border-border`         | Contorno dos painéis e separadores     |
| `text-foreground`       | Labels dos itens                       |
| `text-muted-foreground` | Descrições e contadores de itens       |
| `bg-accent`             | Hover e destaque de itens selecionados |

---

## Escala tipográfica e de tamanho

| Slot    | Dimensão                                         |
| ------- | ------------------------------------------------ |
| Títulos | `text-xs font-semibold uppercase tracking-wider` |
| Itens   | `text-xs font-medium`                            |
| Painéis | Altura padrão `h-72`                             |
| Ícones  | `size-4`                                         |

---

## Comportamentos e estados

- **Transferência:** Itens selecionados via checkbox são transferidos para o painel oposto ao clicar nos botões direcionais centrais.
- **Filtro de busca:** Filtra localmente os itens de cada painel sem afetar o estado de seleção global.
- **Mover todos:** Transfere todos os itens não desabilitados de uma única vez.
