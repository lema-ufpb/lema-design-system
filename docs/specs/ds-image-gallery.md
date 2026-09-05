# Spec: ds-image-gallery

> Image Gallery (galeria flexível grid/masonry/row).

---

## Propósito

Galeria de imagens configurável em três layouts (grid uniforme, masonry via CSS columns, linha com scroll-snap), com legenda/overlay opcional em scrim de gradiente por item. Base para a maioria dos blocos "Gallery" do blockus.

**Usar quando:** Precisar exibir uma coleção de imagens (portfólio, produto, equipe em fotos).
**Não usar quando:** Precisar de logos de marcas — use `ds-press-wall`. Para rolagem automática contínua, use `ds-marquee`.

---

## Localização

| Campo      | Valor                                       |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/image-gallery.tsx`              |
| Tipo       | `registry:ui` (name: `ds-image-gallery`)       |
| Categoria  | `Data Display`                                 |
| Depende de | `skeleton`                                     |

---

## API — Props

| Prop            | Tipo                                          | Padrão   | Obrigatória | Descrição                                        |
| ---------------- | ------------------------------------------------ | -------- | ----------- | ------------------------------------------------------ |
| `items`         | `ImageGalleryItem[]`                             | —        | ✓           | `{ src, alt, caption?, overlay?, href?, onClick? }`    |
| `layout`        | `"grid" \| "masonry" \| "row"`                   | `"grid"` |             | Estratégia de layout                                    |
| `columns`       | `2 \| 3 \| 4`                                     | `3`      |             | Colunas (aplica-se a `grid`/`masonry`)                   |
| `aspect`        | `"square" \| "video" \| "portrait" \| "auto"`    | `"square"`|            | Proporção de cada item (`auto` recomendado p/ masonry)  |
| `loading`       | `boolean`                                        | `false`  |             | Estado de carregamento                                  |
| `skeletonCount` | `number`                                          | `items.length \|\| 6` |  | Nº de placeholders no loading                     |

---

## Variantes CVA

**Slots:** `imageGalleryRootVariants` (layout × columns), `imageGalleryItemVariants` (layout × aspect × interactive).

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                                                   |
| --------------------------- | ------------------------------------------------------------------------- |
| `item.onClick`/`item.href`  | Item vira `<button>`/`<a>` focável (ex: para abrir `ds-lightbox`)         |
| `item.caption`/`item.overlay` | Scrim de gradiente na base do item com o conteúdo sobreposto            |
| `layout="masonry"`          | `columns-*` do CSS + `break-inside-avoid` por item                        |
| `layout="row"`               | `overflow-x-auto` + `snap-x snap-mandatory`, cada item com largura fixa   |
| `loading={true}`            | `<Skeleton>` no formato de cada item real                                 |

---

## Acessibilidade

| Requisito       | Implementação                                              |
| ----------------- | -------------------------------------------------------------- |
| Item interativo    | `aria-label={item.alt}` no `<button>`/`<a>`                    |
| Foco visível       | `focus-visible:ring-2 focus-visible:ring-ring`                  |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `Masonry`
- [x] `Row`
- [x] `WithCaptions`
- [x] `FourColumns`
- [x] `Loading`
- [x] `WithLightbox`

---

## Checklist antes de implementar

- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
- [x] `aria-label` em itens interativos
