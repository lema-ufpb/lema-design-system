# Spec: ds-gallery-split

> Gallery Split (bloco composto — não é um átomo novo).

---

## Propósito

Seção split — texto de um lado, colagem de imagens do outro — remontando o bloco "Split copy-left image-collage-right section" do blockus a partir de `ds-hero-section` e `ds-image-gallery`.

**Usar quando:** Seção "sobre o trabalho"/portfólio com texto + colagem de imagens.
**Não usar quando:** Precisar da galeria em largura total — use `ds-image-gallery` diretamente.

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/gallery-split.tsx`              |
| Tipo       | `registry:block` (name: `ds-gallery-split`)    |
| Categoria  | `Layout`                                       |
| Depende de | `ds-hero-section`, `ds-image-gallery`, `badge` |

---

## API — Props

| Prop          | Tipo                 | Obrigatória | Descrição                             |
| ------------- | -------------------- | ----------- | ------------------------------------- |
| `kicker`      | `string`             |             | Badge acima do título                 |
| `title`       | `React.ReactNode`    | ✓           | Título (renderizado como `h2`)        |
| `description` | `string`             |             | Parágrafo de apoio                    |
| `actions`     | `React.ReactNode`    |             | Botões                                |
| `items`       | `ImageGalleryItem[]` | ✓           | Itens da colagem (via `ImageGallery`) |
| `columns`     | `2 \| 3 \| 4`        | `2`         | Colunas da colagem                    |

---

## Comportamentos e estados

`HeroTitle` usa `as="h2"` por padrão (mesma razão do `ds-contact-split`: evitar quebrar a ordem de headings quando composta abaixo de um hero com `h1`).

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
- [x] Heading level correto (`h2`)
