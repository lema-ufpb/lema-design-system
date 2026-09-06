# Spec: ds-hero-video

> Hero Video (bloco composto — não é um átomo novo).

---

## Propósito

Hero centralizado com uma thumbnail de vídeo que abre em diálogo, remontando o bloco "Video thumbnail hero" do blockus a partir de `HeroSection` e `VideoDialog`.

**Usar quando:** Quiser abrir a página com um vídeo de demonstração do produto.
**Não usar quando:** Precisar do vídeo embutido inline (sem diálogo) — componha `VideoDialog` ou um player diretamente.

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/hero-video.tsx`                |
| Tipo       | `registry:block` (name: `ds-hero-video`)      |
| Categoria  | `Layout`                                      |
| Depende de | `ds-hero-section`, `ds-video-dialog`, `badge` |

---

## API — Props

| Prop           | Tipo              | Obrigatória | Descrição                                |
| -------------- | ----------------- | ----------- | ---------------------------------------- |
| `kicker`       | `string`          |             | Badge acima do título                    |
| `title`        | `React.ReactNode` | ✓           | Título                                   |
| `description`  | `string`          |             | Parágrafo de apoio                       |
| `actions`      | `React.ReactNode` |             | Botões                                   |
| `videoSrc`     | `string`          | ✓           | URL do embed (repassado a `VideoDialog`) |
| `thumbnailSrc` | `string`          | ✓           | Imagem de capa                           |
| `videoTitle`   | `string`          |             | Título acessível do vídeo                |
| `locale`       | `UILocale`        |             | Locale das strings do `VideoDialog`      |

---

## Comportamentos e estados

Herdados de `VideoDialog` (variante `glow` fixa) — ver `docs/specs/ds-video-dialog.md`.

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `WithoutActions`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
