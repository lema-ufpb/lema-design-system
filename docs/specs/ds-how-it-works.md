# Spec: HowItWorks

> Seção explicativa em passos numerados com variante horizontal/vertical — átomo base blockus #01-#18.

---

## Propósito

HowItWorks exibe processo em 3-4 passos com número `01`, ícone opcional, título e descrição, conector `→` ou linha.

**Usar quando:** Explicar fluxo de onboarding, checkout, integração.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/how-it-works.tsx`        |
| Tipo       | `registry:ui` (name: `ds-how-it-works`) |
| Categoria  | Marketing / Steps                       |
| Depende de | `Badge`, `UI_I18N`, `lucide-react`      |

---

## API — Props

| Prop          | Tipo                            | Padrão                     | Descrição                                   |
| ------------- | ------------------------------- | -------------------------- | ------------------------------------------- |
| `title`       | `string`                        | `UI_I18N.howItWorks.title` | Heading `text-2xl font-bold text-balance`   |
| `description` | `string`                        | —                          | `text-sm text-muted-foreground text-pretty` |
| `steps`       | `{title, description, icon?}[]` | ✓                          | 2-4 passos                                  |
| `variant`     | `"number" \| "icon" \| "card"`  | `"number"`                 | Estilo número                               |
| `orientation` | `"horizontal" \| "vertical"`    | `"horizontal"`             | Direção                                     |
| `size`        | `"sm" \| "md" \| "lg"`          | `"md"`                     | Numero `size-8/10/12`                       |
| `locale`      | `UILocale`                      | `"en-US"`                  | label Step                                  |
| `loading`     | `boolean`                       | `false`                    | Skeleton                                    |

---

## Variantes CVA

| Dimensão      | Valores                                                                                                                                                           | Padrão       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `variant`     | `number` `text-4xl font-bold text-muted/20 tabular-nums`, `icon` `size-10 rounded-xl bg-primary text-primary-foreground`, `card` `rounded-2xl border bg-card p-6` | `number`     |
| `orientation` | `horizontal` `grid md:3 lg:4 gap-6`, `vertical` `flex-col gap-4`                                                                                                  | `horizontal` |
| `size`        | `sm` num `text-2xl` `size-8`, `md` `text-4xl size-10`, `lg` `text-5xl size-12`                                                                                    | `md`         |

---

## Tokens

| Token                                | Slot                              |
| ------------------------------------ | --------------------------------- |
| `text-muted-foreground/20`           | number `01`                       |
| `bg-primary text-primary-foreground` | icon variant                      |
| `bg-muted`                           | skeleton                          |
| `text-foreground font-semibold`      | step title `text-sm md:text-base` |
| `text-muted-foreground text-sm`      | description                       |

---

## Comportamentos

| Estado                   | Comportamento                                    |
| ------------------------ | ------------------------------------------------ |
| `orientation horizontal` | `grid` + conector `→` ou `border-t` entre passos |
| `loading`                | 3 `Skeleton h-32 rounded-2xl`                    |

---

## Acessibilidade

| Requisito | Implementação                |
| --------- | ---------------------------- |
| List      | `ol` + `li`                  |
| Number    | `aria-hidden` `tabular-nums` |
| Heading   | `h2`                         |

---

## Stories

- [ ] `Default` — 3 passos number horizontal
- [ ] `WithIcons` — icon variant
- [ ] `Vertical` — timeline
- [ ] `AllSizes`
- [ ] `Loading`

---

## Checklist

- [x] `gap-6` grid, `rounded-2xl`, `tabular-nums`
