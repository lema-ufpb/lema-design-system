# Spec: ds-gallery-video

> Gallery Video (bloco composto — não é um átomo novo).

---

## Propósito

Grid de vídeos com overlay de play que abrem em diálogo ao clicar, remontando o bloco "Video gallery with play overlays" do blockus a partir de `ds-video-dialog` (usado diretamente como cada tile — já traz sua própria UI de thumbnail+play+diálogo).

**Usar quando:** Tiver múltiplos vídeos curtos para exibir em grid.
**Não usar quando:** For um único vídeo — use `ds-video-dialog` sozinho, ou `ds-hero-video` para um hero.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/gallery-video.tsx`           |
| Tipo       | `registry:block` (name: `ds-gallery-video`) |
| Categoria  | `Layout`                                    |
| Depende de | `ds-video-dialog`                           |

---

## API — Props

| Prop      | Tipo                 | Padrão | Descrição                                           |
| --------- | -------------------- | ------ | --------------------------------------------------- |
| `items`   | `GalleryVideoItem[]` | —      | `{ videoSrc, thumbnailSrc, thumbnailAlt?, title? }` |
| `columns` | `2 \| 3 \| 4`        | `3`    | Colunas do grid                                     |
| `locale`  | `UILocale`           | —      | Repassado a cada `VideoDialog`                      |

---

## Acessibilidade

Herdada integralmente de `VideoDialog` (cada tile já é um diálogo acessível independente).

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `TwoColumns`

---

## Checklist antes de implementar

- [x] Reutiliza apenas o átomo já existente (`ds-video-dialog`)
- [x] `registryDependencies` lista o átomo consumido
