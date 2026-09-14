# Spec: BannerMarquee

> Faixa com rolagem infinita horizontal para highlights / logos / promos (blockus #13).

---

## Propósito

Marquee animado CSS-only para banner #13 “Deploy fast · Zero config · Edge CDN”.

**Usar quando:** Repetição contínua de mensagem curta.
**Não usar quando:** Texto longo estático (usar `Banner`).

---

## Localização

| Campo      | Valor                                     |
| ---------- | ----------------------------------------- |
| Arquivo    | `components/ds/banner-marquee.tsx`        |
| Tipo       | `registry:ui` (name: `ds-banner-marquee`) |
| Categoria  | Navigation                                |
| Depende de | `cn`, sem primitivos                      |

---

## API — Props

| Prop           | Tipo                           | Padrão      | Descrição                     |
| -------------- | ------------------------------ | ----------- | ----------------------------- |
| `items`        | `string[]`                     | ✓           | Itens repetidos               |
| `separator`    | `ReactNode`                    | `"·"`       | Separador entre itens         |
| `speed`        | `"slow" \| "normal" \| "fast"` | `"normal"`  | Duração animation 30s/20s/10s |
| `direction`    | `"left" \| "right"`            | `"left"`    | Direção scroll                |
| `pauseOnHover` | `boolean`                      | `true`      | Pausa hover                   |
| `intent`       | `Banner intent`                | `"default"` | Cor fundo                     |
| `size`         | `"sm" \| "md" \| "lg"`         | `"md"`      | Altura                        |
| `locale`       | `UILocale`                     | `"en-US"`   | label marquee                 |

---

## Variantes CVA

| Dimensão | Valores                                                            | Padrão    |
| -------- | ------------------------------------------------------------------ | --------- |
| `intent` | `default` `bg-muted`, `promo` `bg-primary text-primary-foreground` | `default` |
| `size`   | `sm h-8`, `md h-9`, `lg h-10`                                      | `md`      |
| `speed`  | `slow 30s`, `normal 20s`, `fast 10s` — via `style --duration`      | `normal`  |

---

## Tokens

| Token                                | Slot     |
| ------------------------------------ | -------- |
| `bg-muted` `text-muted-foreground`   | default  |
| `bg-primary text-primary-foreground` | promo    |
| `bg-foreground text-background`      | contrast |

---

## Comportamentos

| Estado                   | Comportamento                         |
| ------------------------ | ------------------------------------- |
| `pauseOnHover`           | `hover:[animation-play-state:paused]` |
| `prefers-reduced-motion` | `@media` desativa animation           |

---

## Acessibilidade

| Requisito | Implementação                                            |
| --------- | -------------------------------------------------------- |
| Role      | `role="region" aria-label={UI_I18N.banner.marqueeLabel}` |
| Animation | `prefers-reduced-motion` respeitado                      |

---

## Stories

- [ ] `Default` — 4 itens loop
- [ ] `Promo` — intent promo
- [ ] `Speeds` — slow/normal/fast
- [ ] `PauseOnHover`

---

## Checklist

- [x] `gap-6` flex, `animate marquee-x` via `@theme`
- [x] Tokens semânticos
