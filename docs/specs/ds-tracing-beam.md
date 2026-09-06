# Spec: tracing-beam

> Inspirado em https://ui.aceternity.com — evita colisão com DS existente. Criativo, acessível e aderente ao design-system.

---

## Propósito

Feixe vertical que progride com scroll, thumb e gradiente — Aceternity Tracing Beam. Para artigos/blog longo.

**Usar quando:** precisar de efeito Aceternity sem quebrar tokens ou a11y.
**Não usar quando:** `prefers-reduced-motion: reduce` — o componente já faz fallback estático.
**Alternativa:** `—` primitivos.

---

## Localização

| Campo      | Valor                            |
| ---------- | -------------------------------- |
| Arquivo    | `components/ds/tracing-beam.tsx` |
| Tipo       | `registry:ui`                    |
| Categoria  | `Layout`                         |
| Depende de | —                                |

---

## API — Props

| Prop                            | Tipo            | Padrão    | Obrigatória | Descrição                  |
| ------------------------------- | --------------- | --------- | ----------- | -------------------------- |
| `variant`                       | `string`        | `default` |             | Variante CVA               |
| `size` / `intensity` / `radius` | `string/number` | —         |             | Controle visual            |
| `loading`                       | `boolean`       | `false`   |             | Skeleton fiel              |
| `locale`                        | `UILocale`      | `pt-BR`   |             | i18n quando houver strings |
| `className`                     | `string`        | —         |             | Layout extra               |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps`.

---

## Variantes CVA

| Dimensão          | Valores                      | Padrão    |
| ----------------- | ---------------------------- | --------- |
| `variant`         | `default`, `muted`, `ghost`  | `default` |
| `size` / `radius` | `sm`, `md`, `lg`, `xl`       | `md`/`xl` |
| `intensity`       | `subtle`, `medium`, `strong` | `medium`  |

Slots: `containerVariants`, `spotlightVariants`, `beamVariants` conforme componente.

---

## Tokens de design utilizados

| Token                                       | Slot             |
| ------------------------------------------- | ---------------- |
| `bg-card` / `bg-muted`                      | superfície       |
| `text-foreground` / `text-muted-foreground` | texto            |
| `bg-primary` / `text-success`               | beam / spotlight |
| `border` / `ring`                           | contorno         |
| `bg-background`                             | máscara radial   |

> Sem `bg-emerald-500` ou hex raw.

---

## Escala tipográfica e de tamanho

| Slot   | sm                      | md                      | lg                        |
| ------ | ----------------------- | ----------------------- | ------------------------- |
| Label  | `text-xs font-medium`   | `text-sm font-medium`   | `text-base font-medium`   |
| Value  | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Altura | `h-7`                   | `h-8`                   | `h-9`                     |
| Ícone  | `size-3.5`              | `size-4`                | `size-5`                  |

---

## Comportamentos e estados

| Estado                   | Comportamento                        |
| ------------------------ | ------------------------------------ |
| `loading`                | `<Skeleton>` dimensões fiéis         |
| `prefers-reduced-motion` | desativa animações / mostra estático |
| `hover` / `focus`        | spotlight/tilt/magnificação          |
| `keyboard`               | `Tab`, `Enter` em dock/beam          |

---

## Acessibilidade

| Requisito | Implementação                                            |
| --------- | -------------------------------------------------------- |
| Role      | `group`, `navigation`, `region`                          |
| Rótulo    | `aria-label` em dock, `aria-live="polite"` em typewriter |
| Teclado   | `focus-visible:ring-2`, `Enter/Space`                    |
| i18n      | `UI_I18N[locale]` quando houver strings                  |
| Motion    | `@media (prefers-reduced-motion: reduce)`                |

---

## Stories obrigatórias

- [ ] `Default`
- [ ] `AllVariants`
- [ ] `Loading`
- [ ] `Locales` (se i18n)
- [ ] `A11y` play com `expect(...).toBeInTheDocument()`

---

## Checklist antes de implementar

- [ ] Tipografia `sm=text-xs / md=text-sm / lg=text-base`
- [ ] Tokens semânticos apenas
- [ ] `cva()` com `defaultVariants`
- [ ] `*Variants` exportados
- [ ] Loading `<Skeleton>`
- [ ] `tabular-nums` em números
- [ ] `truncate` em labels
- [ ] `aria-label` presente
- [ ] `cn()` para classes
- [ ] Spacing Tailwind steps
- [ ] `locale` via `UI_I18N`
