# Spec: Cta

> Container CTA core com badge, título, descrição, ações e variantes de tom/alinhamento — átomo base blockus CTA.

---

## Propósito

CTA core reuso em centered, split e newsletter. Cobre 24 variações blockus via `tone` + `align` + `layout`.

**Usar quando:** Chamar para ação em landing, pricing ou final de seção.
**Não usar quando:** Banner top (usar `Banner`) ou footer CTA com navegação (usar `FooterCta`).

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/cta.tsx`        |
| Tipo       | `registry:ui` (name: `ds-cta`) |
| Categoria  | Marketing / CTA                |
| Depende de | `Badge`, `Button`, `UI_I18N`   |

---

## API — Props

| Prop              | Tipo                                          | Padrão      | Descrição                                                  |
| ----------------- | --------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `badge`           | `string`                                      | —           | Pill topo `New`                                            |
| `title`           | `string`                                      | ✓           | `text-2xl font-bold tracking-tight` `text-balance`         |
| `description`     | `string`                                      | —           | `text-sm md:text-base text-muted-foreground` `text-pretty` |
| `primaryAction`   | `{label, href, onClick, icon?}`               | —           | `Button default` `gap-2`                                   |
| `secondaryAction` | `{label, href, onClick}`                      | —           | `Button outline/ghost`                                     |
| `align`           | `"left" \| "center"`                          | `"center"`  | Alinhamento texto/ações                                    |
| `tone`            | `"default" \| "primary" \| "muted" \| "glow"` | `"default"` | Fundo/borda                                                |
| `size`            | `"sm" \| "md" \| "lg"`                        | `"md"`      | Padding `p-8 md:p-12`                                      |
| `locale`          | `UILocale`                                    | `"en-US"`   |                                                            |
| `loading`         | `boolean`                                     | `false`     | Skeleton                                                   |

---

## Variantes CVA

| Dimensão | Valores                                                                                                                                                         | Padrão    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `tone`   | `default` `bg-card border-border`, `primary` `bg-primary text-primary-foreground`, `muted` `bg-muted/40`, `glow` `border-primary/20 shadow-xl shadow-primary/5` | `default` |
| `align`  | `left` `text-left items-start`, `center` `text-center items-center`                                                                                             | `center`  |
| `size`   | `sm` `p-6`, `md` `p-8 md:p-12`, `lg` `p-12 md:p-16`                                                                                                             | `md`      |

Slots: `ctaVariants` container `rounded-3xl border`, `ctaTitleVariants` `text-2xl md:text-3xl lg:text-4xl`, `ctaDescriptionVariants`.

---

## Tokens

| Token                                | Slot                                                 |
| ------------------------------------ | ---------------------------------------------------- |
| `bg-card border-border`              | default                                              |
| `bg-primary text-primary-foreground` | primary                                              |
| `text-muted-foreground`              | description `primary` → `text-primary-foreground/80` |
| `bg-primary/10 blur-3xl`             | glow ambient                                         |
| `ring`                               | focus                                                |

---

## Escala

| Slot   | sm             | md                     | lg                     |
| ------ | -------------- | ---------------------- | ---------------------- |
| Title  | `text-xl`      | `text-2xl md:text-3xl` | `text-3xl lg:text-4xl` |
| Desc   | `text-sm`      | `text-sm md:text-base` | `text-base`            |
| Button | `size default` | `size lg gap-2`        | `size lg`              |

---

## Comportamentos

| Estado          | Comportamento                                                                |
| --------------- | ---------------------------------------------------------------------------- |
| `loading`       | `Skeleton h-6 w-20 badge + h-8 w-3/4 title + h-4 w-full desc + 2x h-10 w-32` |
| `badge`         | `Badge variant outline`                                                      |
| `primaryAction` | `ArrowRight size-4`                                                          |

---

## Acessibilidade

| Requisito | Implementação                   |
| --------- | ------------------------------- |
| Heading   | `h2 text-balance`               |
| Actions   | `Button asChild <a>` focus ring |

---

## Stories

- [ ] `Default` — badge + title + desc + 2 CTAs
- [ ] `AllTones` — default/primary/muted/glow
- [ ] `AlignLeft` vs `Center`
- [ ] `Loading`

---

## Checklist

- [x] `gap-8` flex, `rounded-3xl`, `text-balance/pretty`
