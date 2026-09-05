# Spec: ds-breadcrumbs

> Navegação estrutural (Breadcrumbs).

---

## Propósito

Facilita a navegação exibindo o caminho hierárquico até a página atual. É um wrapper de alto nível em cima do `components/ui/breadcrumb.tsx` nativo do shadcn, usando uma abordagem baseada em dados (array de itens) para facilitar a implementação.

**Usar quando:** O usuário está em páginas profundas (3 ou mais níveis) e precisa entender o contexto e voltar rapidamente.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/breadcrumbs.tsx`        |
| Tipo       | `registry:ui` (name: `ds-breadcrumbs`) |
| Categoria  | `Navigation`                           |
| Depende de | `breadcrumb`, `lucide-react`           |

---

## Estrutura de Dados

```typescript
export interface BreadcrumbItem {
  id: string
  label: React.ReactNode
  href?: string // Se não houver href, é considerado a página atual (texto normal)
  onClick?: () => void
}
```

## API — Props

| Prop                  | Tipo               | Padrão                 | Obrigatória | Descrição                             |
| --------------------- | ------------------ | ---------------------- | ----------- | ------------------------------------- |
| `items`               | `BreadcrumbItem[]` | —                      | Sim         | Lista de migalhas                     |
| `separator`           | `React.ReactNode`  | `<ChevronRightIcon />` |             | Separador customizado                 |
| `itemsBeforeEllipsis` | `number`           | `1`                    |             | Quantidade de itens antes do ellipsis |
| `itemsAfterEllipsis`  | `number`           | `2`                    |             | Quantidade de itens após o ellipsis   |

---

## Variantes CVA

Nenhuma variante adicional, herda os estilos do primitivo `breadcrumb`.

---

## Acessibilidade

- Usa `aria-label="breadcrumb"` na raiz `<nav>`.
- Item final usa `<BreadcrumbPage>` e `aria-current="page"`.
- Separadores usam `aria-hidden="true"`.

---

## Stories obrigatórias no Storybook

- [x] `Default` (com links normais)
- [x] `WithEllipsis` (demonstrando colapso de muitos itens)
- [x] `CustomSeparator` (com slash `/`)

---

## Checklist antes de implementar

- [x] O componente deve lidar automaticamente com o colapso de itens se a lista for maior que `itemsBeforeEllipsis + itemsAfterEllipsis + 1`.
- [x] O último item sempre deve renderizar `BreadcrumbPage`.
