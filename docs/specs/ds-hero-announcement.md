# Spec: ds-hero-announcement

> Hero Announcement (bloco composto — não é um átomo novo).

---

## Propósito

Hero centralizado com badge de anúncio acima do título e um mural de logos em marquee abaixo, remontando o bloco "Marquee badge hero" do blockus a partir de `HeroSection`, `AnnouncementBadge` e `Marquee`.

**Usar quando:** Quiser anunciar uma novidade (badge) e reforçar prova social com logos de clientes/parceiros logo abaixo do CTA.
**Não usar quando:** Os logos não precisarem rolar — use `ds-press-wall` (mural estático) no lugar do `Marquee`.

---

## Localização

| Campo      | Valor                                                    |
| ---------- | -------------------------------------------------------- |
| Arquivo    | `components/ds/hero-announcement.tsx`                    |
| Tipo       | `registry:block` (name: `ds-hero-announcement`)          |
| Categoria  | `Layout`                                                 |
| Depende de | `ds-hero-section`, `ds-announcement-badge`, `ds-marquee` |

---

## API — Props

| Prop           | Tipo                     | Obrigatória | Descrição                                  |
| -------------- | ------------------------ | ----------- | ------------------------------------------ |
| `announcement` | `{ label, href?, tag? }` |             | Badge de anúncio (via `AnnouncementBadge`) |
| `title`        | `React.ReactNode`        | ✓           | Título                                     |
| `description`  | `string`                 |             | Parágrafo de apoio                         |
| `actions`      | `React.ReactNode`        |             | Botões                                     |
| `logos`        | `React.ReactNode[]`      |             | Itens renderizados dentro do `Marquee`     |
| `logosLabel`   | `string`                 |             | Rótulo acima do marquee (ex: "Trusted by") |

---

## Comportamentos e estados

| Estado             | Comportamento esperado             |
| ------------------ | ---------------------------------- |
| Sem `announcement` | Badge não é renderizado            |
| `logos` vazio      | Bloco de marquee não é renderizado |

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `WithoutLogos`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
