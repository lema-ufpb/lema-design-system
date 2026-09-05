# Spec: ds-tree-view

> Componente de visualização em árvore (Tree View).

---

## Propósito

Exibe uma estrutura de dados hierárquica (ex: sistema de arquivos, estrutura organizacional). Permite expandir/recolher nós (pastas) e selecionar itens folha (arquivos).

**Usar quando:** Você precisa mostrar dados aninhados onde a hierarquia é importante.
**Não usar quando:** A lista é linear (use `CommandList` ou listas nativas) ou para navegação principal do site (use `ds-sidebar` ou menus).

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ds/tree-view.tsx`        |
| Tipo       | `registry:ui` (name: `ds-tree-view`) |
| Categoria  | `Data Display`                       |
| Depende de | `collapsible`, `lucide-react`        |

---

## Estrutura de Dados

```typescript
export interface TreeDataItem {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeDataItem[]
}
```

## API — Props

| Prop                 | Tipo                           | Padrão  | Obrigatória | Descrição                          |
| -------------------- | ------------------------------ | ------- | ----------- | ---------------------------------- |
| `data`               | `TreeDataItem[]`               | —       | Sim         | Estrutura da árvore                |
| `onSelect`           | `(item: TreeDataItem) => void` | —       |             | Chamado ao clicar em um nó         |
| `selectedId`         | `string`                       | —       |             | ID do item selecionado             |
| `defaultExpandedIds` | `string[]`                     | `[]`    |             | IDs de nós inicialmente expandidos |
| `expandAll`          | `boolean`                      | `false` |             | Expandir todos inicialmente        |

---

## Variantes CVA

- `treeItemVariants` — trata o padding do botão e background para itens selecionados. (ex: `bg-muted` quando `data-selected=true`).

---

## Acessibilidade

| Requisito       | Implementação                                              |
| --------------- | ---------------------------------------------------------- |
| Role semântico  | `ul` e `li` nativos com botões iterativos                  |
| Estado (Aberto) | O `Collapsible` cuida de `aria-expanded` e controles       |
| Teclado         | O `CollapsibleTrigger` fornece navegação de teclado nativa |

---

## Comportamentos e estados

- O ícone (ex: `ChevronRight`) gira quando o `Collapsible` é aberto.
- Itens folha (`children === undefined` ou vazio) não têm o `Chevron`, mostrando um recuo equivalente ou ícone de arquivo.

---

## Stories obrigatórias no Storybook

- [x] `Default` (com dados aninhados de arquivos)
- [x] `Selected` (item folha selecionado)
- [x] `ExpandAll`

---

## Checklist antes de implementar

- [x] Componente recursivo (`TreeItem` renderizando `TreeItem`).
- [x] Usar `Collapsible` do shadcn.
- [x] Identação visual via `pl-*` com base no nível (`depth`), mas de forma semântica (CSS padding em `ul` ou `li`).
