# Spec: Stats

> Faixa de métricas com número grande, label, trend e período — átomo base stats blockus.

---

## Propósito

Stats reuso em grid 2-4 com `tabular-nums`.

**Usar quando:** Exibir KPIs, métricas, números blockus stats #01-#18.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/stats.tsx` |
| Tipo | `registry:ui` (name: `ds-stats`) |
| Categoria | Stats |
| Depende de | `Card`, `Badge`, `UI_I18N` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `label` | `string` | ✓ | `text-xs font-medium text-muted-foreground` |
| `value` | `string \| number` | ✓ | `text-2xl font-bold tabular-nums` |
| `trend` | `{value, direction:"up"\|"down"}` | — | `Badge text-success/destructive` |
| `period` | `string` | — | `text-xs text-muted-foreground` |
| `icon` | `ReactNode` | — | `size-4 text-muted-foreground` |
| `locale` | `UILocale` | `"en-US"` |  |
| `loading` | `boolean` | `false` | Skeleton |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|---|---|---|
| `size` | `sm` `p-4`, `md` `p-6` | `md` |

---

## Tokens

| Token | Slot |
|---|---|
| `bg-card border` | card `rounded-2xl` |
| `text-foreground font-bold text-2xl tabular-nums` | value |
| `text-success bg-success/10` | trend up |
| `text-destructive` | trend down |

---

## Stories

- [ ] `Default` — label + value + trend
- [ ] `WithoutTrend`
- [ ] `Loading`

---

## Checklist

- [x] `tabular-nums` value, `size-*` icon
