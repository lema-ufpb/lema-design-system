# Spec: ds-gallery-filterable

> Gallery Filterable (bloco composto — não é um átomo novo).

---

## Propósito

Galeria de imagens com filtro de categorias acima, remontando o bloco "Filterable gallery" (e a variante com tags do "Pinterest-style masonry with tag chips") do blockus a partir de `ds-image-gallery` e `ds-pill-group`.

**Usar quando:** A galeria tiver categorias (produto/equipe/eventos, etc.) que o usuário queira filtrar.
**Não usar quando:** Não houver categorização — use `ds-image-gallery` diretamente.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/gallery-filterable.tsx`           |
| Tipo       | `registry:block` (name: `ds-gallery-filterable`) |
| Categoria  | `Layout`                                         |
| Depende de | `ds-image-gallery`, `ds-pill-group`              |

---

## API — Props

| Prop                        | Tipo                      | Padrão  | Obrigatória | Descrição                     |
| --------------------------- | ------------------------- | ------- | ----------- | ----------------------------- |
| `categories`                | `{ value, label }[]`      | —       | ✓           | Categorias do filtro          |
| `items`                     | `GalleryFilterableItem[]` | —       | ✓           | Itens da galeria + `category` |
| `allLabel`                  | `string`                  | `"All"` |             | Rótulo do chip "Todos"        |
| `layout`/`columns`/`aspect` | —                         | —       |             | Repassados ao `ImageGallery`  |

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                              |
| ------------------------ | --------------------------------------------------- |
| Chip "Todos" selecionado | Mostra todos os itens (padrão)                      |
| Chip de categoria        | Filtra `items` por `category === valor selecionado` |

---

## Acessibilidade

Herdada integralmente de `PillGroup` (filtro) e `ImageGallery`.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista os átomos consumidos
