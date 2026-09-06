# Spec: ds-logo-cloud-grouped

> Logo Cloud Grouped (bloco composto — não é um átomo novo).

---

## Propósito

Mural de logos com filtro de indústria/categoria acima, remontando o bloco "Industry-grouped logos" do blockus a partir de `ds-press-wall` e `ds-pill-group` (mesmo padrão de `ds-gallery-filterable`, aplicado a logos).

**Usar quando:** O mural de logos tiver categorização por indústria/segmento que valha a pena filtrar.
**Não usar quando:** Não houver categorização — use `ds-press-wall` diretamente.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/logo-cloud-grouped.tsx`           |
| Tipo       | `registry:block` (name: `ds-logo-cloud-grouped`) |
| Categoria  | `Layout`                                         |
| Depende de | `ds-press-wall`, `ds-pill-group`                 |

---

## API — Props

| Prop       | Tipo                     | Padrão  | Obrigatória | Descrição                          |
| ---------- | ------------------------ | ------- | ----------- | ---------------------------------- |
| `groups`   | `{ value, label }[]`     | —       | ✓           | Categorias do filtro               |
| `items`    | `LogoCloudGroupedItem[]` | —       | ✓           | `{ label, group, content, href? }` |
| `allLabel` | `string`                 | `"All"` |             | Rótulo do chip "Todos"             |
| `kicker`   | `string`                 | —       |             | Repassado ao `PressWall`           |
| `locale`   | `UILocale`               | —       |             | Repassado ao `PillGroup`           |

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                           |
| ------------------------ | ------------------------------------------------ |
| Chip "Todos" selecionado | Mostra todos os itens (padrão)                   |
| Chip de categoria        | Filtra `items` por `group === valor selecionado` |

---

## Acessibilidade

Herdada integralmente de `PillGroup` (filtro) e `PressWall`.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista os átomos consumidos
