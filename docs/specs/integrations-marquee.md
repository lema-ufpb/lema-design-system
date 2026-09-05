# Spec: IntegrationsMarquee

> Parede de logos em marquee infinita — blockus #13-#24.

---

## Propósito

Wall animada para exibir 20+ integrações sem scroll.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/integrations-marquee.tsx` |
| Tipo | `registry:block` (name: `ds-integrations-marquee`) |
| Categoria | Integrations |
| Depende de | `IntegrationTile` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `Integration[][]` | ✓ | 2-3 linhas |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | `30s/20s/10s` |
| `pauseOnHover` | `boolean` | `true` |  |
| `locale` | `UILocale` | `"en-US"` |  |

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `pauseOnHover` | `hover:[animation-play-state:paused]` |

---

## Stories

- [ ] `Default` — 2 rows
- [ ] `Speeds`

---

## Checklist

- [x] `animate marquee-x` reutiliza `@theme`
