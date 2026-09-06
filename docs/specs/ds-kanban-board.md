# Spec: ds-kanban-board

> Quadro Kanban (Kanban Board).

---

## Propósito

Exibe itens agrupados em colunas (ex: To Do, In Progress, Done). É um componente de apresentação visual projetado para ser facilmente integrado com bibliotecas de drag-and-drop (como `@dnd-kit/core` ou `react-beautiful-dnd`) pelo consumidor, fornecendo a estrutura e o estilo corretos.

**Usar quando:** Você precisa de uma visualização de processos em estágios ou status de tarefas.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/kanban-board.tsx`        |
| Tipo       | `registry:ui` (name: `ds-kanban-board`) |
| Categoria  | `Data Display`                          |
| Depende de | `card`, `scroll-area`, `badge`          |

---

## Estrutura

- `KanbanBoard`: Container principal (scroll horizontal).
- `KanbanColumn`: Coluna individual com título e contador.
- `KanbanCard`: Cartão individual dentro da coluna.

---

## API — Props

### KanbanBoard

| Prop       | Tipo              | Padrão | Descrição                   |
| ---------- | ----------------- | ------ | --------------------------- |
| `children` | `React.ReactNode` | —      | Deve conter `KanbanColumn`s |

### KanbanColumn

| Prop       | Tipo              | Padrão | Descrição                      |
| ---------- | ----------------- | ------ | ------------------------------ |
| `title`    | `string`          | —      | Título da coluna               |
| `count`    | `number`          | —      | Quantidade de itens (opcional) |
| `children` | `React.ReactNode` | —      | Cartões                        |

### KanbanCard

| Prop          | Tipo              | Padrão | Descrição                |
| ------------- | ----------------- | ------ | ------------------------ |
| `title`       | `string`          | —      | Título do cartão         |
| `description` | `string`          | —      | Descrição breve          |
| `tags`        | `string[]`        | —      | Tags ou labels           |
| `children`    | `React.ReactNode` | —      | Conteúdo extra do cartão |

---

## Variantes CVA

Nenhuma.

---

## Acessibilidade

- Uso de roles de lista (`role="list"` e `role="listitem"`) para ajudar leitores de tela a navegar pelas colunas e cartões.
- Cada coluna tem `aria-label` combinando o título e o total de cartões.

---

## Stories obrigatórias no Storybook

- [x] `Default` (Colunas e Cartões)

---

## Checklist antes de implementar

- [x] O `KanbanBoard` deve ter `overflow-x-auto` para lidar com muitas colunas.
- [x] O `KanbanColumn` tem altura flexível mas com rolagem vertical independente ou cresce com a página. O ideal é usar `h-full` e `overflow-y-auto` interno se necessário, mas para simplificar deixaremos crescer e usaremos um container visual.
