# Spec: Integrations

> Grid de integrações com heading, busca e filtro categoria — blockus #01-#12.

---

## Propósito

Listagem paginada de `IntegrationTile`.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ds/integrations.tsx`           |
| Tipo       | `registry:block` (name: `ds-integrations`) |
| Categoria  | Integrations                               |
| Depende de | `IntegrationTile`, `Input`, `Empty`        |

---

## API — Props

| Prop           | Tipo            | Padrão    | Descrição |
| -------------- | --------------- | --------- | --------- |
| `title`        | `string`        | i18n      |           |
| `description`  | `string`        | i18n      |           |
| `integrations` | `Integration[]` | ✓         |           |
| `searchable`   | `boolean`       | `false`   |           |
| `locale`       | `UILocale`      | `"en-US"` |           |
| `loading`      | `boolean`       | `false`   |           |

`Integration = {name, description, icon, iconSrc, status, href}`

---

## Comportamentos

| Estado       | Comportamento               |
| ------------ | --------------------------- |
| `searchable` | `Input` filtra client-side  |
| `empty`      | `Empty noResults` i18n      |
| `loading`    | 6 `IntegrationTile loading` |

Grid `md:2 lg:3 xl:4 gap-4`.

---

## Stories

- [ ] `Default` — 8 tiles
- [ ] `Searchable`
- [ ] `Loading` / `Empty`

---

## Checklist

- [x] `gap-4` grid
