# Spec: VirtualList

## Propósito

Lista virtualizada de altíssimo desempenho para renderizar coleções com milhares ou dezenas de milhares de itens no DOM, mantendo a rolagem fluida e 60 FPS com baixo consumo de memória.

**Usar quando:** coleções com mais de 100 itens (logs, auditoria, listas de usuários, feeds).  
**Não usar quando:** coleções pequenas (< 50 itens) onde uma lista nativa é mais simples.  
**Alternativa se não se aplicar:** `components/ui/scroll-area`.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/virtual-list.tsx`      |
| Tipo       | `registry:ui`                         |
| Categoria  | `Data Display/VirtualList`            |
| Depende de | `@tanstack/react-virtual`, `skeleton` |

---

## API — Props

| Prop           | Tipo                               | Padrão     | Obrigatória | Descrição                            |
| -------------- | ---------------------------------- | ---------- | ----------- | ------------------------------------ |
| `items`        | `T[]`                              | —          | ✓           | Array com todos os itens da lista    |
| `renderItem`   | `(item: T, index: number) => Node` | —          | ✓           | Função de renderização de cada linha |
| `estimateSize` | `number`                           | dependente |             | Altura estimada de cada linha em px  |
| `height`       | `number`                           | `400`      |             | Altura visível do container em px    |
| `overscan`     | `number`                           | `5`        |             | Linhas pré-renderizadas fora da tela |
| `size`         | `"sm" \| "md" \| "lg"`             | `"md"`     |             | Densidade visual das linhas          |
| `loading`      | `boolean`                          | `false`    |             | Estado de carregamento               |
| `loadingCount` | `number`                           | `12`       |             | Quantidade de skeletons exibidos     |
| `emptyContent` | `ReactNode`                        | —          |             | Conteúdo para lista vazia            |

---

## Stories obrigatórias

- [x] `Default` — 10.000 itens virtuais com badges de status
- [x] `AllSizes` — sm, md, lg
- [x] `Loading` — skeletons animados
- [x] `EmptyState` — estado de nenhum item encontrado
