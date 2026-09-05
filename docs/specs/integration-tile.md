# Spec: IntegrationTile

> Tile de integração com logo, nome, descrição curta e status dot — átomo base blockus integrations #01-#08.

---

## Propósito

Tile reuso em grid, marquee e wall.

**Usar quando:** Listar integrações/app connections.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/integration-tile.tsx` |
| Tipo | `registry:ui` (name: `ds-integration-tile`) |
| Categoria | Integrations |
| Depende de | `Card`, `Badge`, `Skeleton` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `name` | `string` | ✓ | Nome app |
| `description` | `string` | — | `line-clamp-2 text-xs text-muted-foreground` |
| `icon` | `ReactNode` | — | Logo |
| `iconSrc` | `string` | — | URL logo |
| `status` | `"connected" \| "available" \| "coming"` | `"available"` | Dot + Badge |
| `href` | `string` | — | Link |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tile + icon |
| `locale` | `UILocale` | `"en-US"` | i18n status |
| `loading` | `boolean` | `false` | Skeleton |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|---|---|---|
| `size` | `sm` `p-3 gap-2 icon size-8`, `md` `p-4 gap-3 icon size-10`, `lg` `p-5 gap-3 icon size-12` | `md` |
| `status` | `connected` `bg-success dot`, `available` `bg-muted`, `coming` `opacity-60` | `available` |

Slots: `integrationTileVariants` `rounded-2xl border bg-card hover:shadow-md`, `integrationTileIconVariants`.

---

## Tokens

| Token | Slot |
|---|---|
| `bg-card border-border` | tile |
| `text-foreground font-medium text-sm` | name |
| `text-muted-foreground text-xs` | description |
| `bg-success` | connected dot |

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `loading` | `Skeleton size-10 + h-3 w-20 + h-3 w-full` |
| `href` | `<a>` focus ring |

---

## Stories

- [ ] `Default` — icon + name + desc + status
- [ ] `AllSizes` — sm/md/lg
- [ ] `Statuses` — connected/available/coming
- [ ] `Loading`

---

## Checklist

- [x] `size-*` icon, `truncate` name, `tabular-nums` não necessário
