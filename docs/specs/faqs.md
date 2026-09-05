# Spec: Faqs

> Seção FAQ core com heading, accordion, busca opcional e CTA suporte — átomo base blockus #01-#22.

---

## Propósito

Faqs unifica heading + `Accordion` + busca + `Empty`.

**Usar quando:** Listar perguntas frequentes em landing, docs, help.

---

## Localização

| Campo | Valor |
|---|---|
| Arquivo | `components/ds/faqs.tsx` |
| Tipo | `registry:ui` (name: `ds-faqs`) |
| Categoria | Marketing / FAQ |
| Depende de | `Accordion`, `Input`, `Empty`, `UI_I18N` |

---

## API — Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `title` | `string` | `UI_I18N.faqs.title` | `text-2xl font-bold text-balance` |
| `description` | `string` | — | `text-sm text-muted-foreground text-pretty` |
| `items` | `{value, trigger, content, disabled?}[]` | ✓ | Faqs |
| `searchable` | `boolean` | `false` | Mostra `Input searchPlaceholder` |
| `search` | `string` | — | Controlled |
| `onSearchChange` | `(s)=>void` | — |  |
| `iconVariant` | `"chevron" \| "plus" \| "arrow" \| "sign"` | `"chevron"` | Repassa Accordion |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |
| `locale` | `UILocale` | `"en-US"` | i18n |
| `loading` | `boolean` | `false` | Skeleton |
| `emptyLabel` | `string` | i18n | Custom Empty |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|---|---|---|
| `size` | `sm` title `text-lg`, `md` `text-2xl`, `lg` `text-3xl` | `md` |

---

## Tokens

| Token | Slot |
|---|---|
| `text-foreground` | title `font-bold tracking-tight` |
| `text-muted-foreground` | description |
| `border` | accordion framed |

---

## Comportamentos

| Estado | Comportamento |
|---|---|
| `searchable` | `Input` filtra `items` client-side se `onSearchChange` ausente |
| `items filtered empty` | `Empty noResults` |
| `loading` | `Accordion loading` `loadingCount=3` |

---

## Acessibilidade

| Requisito | Implementação |
|---|---|
| Heading | `h2` `aria-labelledby` |
| Accordion | `Accordion` já com `aria-expanded` |

---

## Stories

- [ ] `Default` — title + accordion 4 itens
- [ ] `Searchable` — filtra 6 itens
- [ ] `AllSizes`
- [ ] `Loading` / `Empty`

---

## Checklist

- [x] `gap-6` flex, `rounded-lg` accordion
