# Spec: feature-sticky

> Inspirado em https://www.launchuicomponents.com/blocks — Launch UI. Evita colisão com DS existente. Criativo, acessível e aderente.

---

## Propósito

Feature com texto e mockup sticky (left/right) — Launch UI Feature Sticky Left/Right. Evita colisão com sticky-feature-list (lista pura sem media).

**Usar quando:** compor landing com padrão Launch UI.
**Não usar quando:** hero/bento/marquee simples já resolve.
**Alternativa:** `badge, skeleton` primitivos.

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/feature-sticky.tsx` |
| Tipo       | `registry:block`                   |
| Categoria  | `Feature`                          |
| Depende de | badge, skeleton                    |

---

## API — Props

| Prop                                  | Tipo                    | Padrão    | Obrigatória | Descrição                  |
| ------------------------------------- | ----------------------- | --------- | ----------- | -------------------------- |
| `variant`                             | `string`                | `default` |             | Variante CVA               |
| `inset` / `sticky` / `glow` / `speed` | `boolean/string/number` | —         |             | Controle visual específico |
| `loading`                             | `boolean`               | `false`   |             | Skeleton                   |
| `className`                           | `string`                | —         |             | Layout extra               |

> Estende `HTMLAttributes<HTMLElement>`.

---

## Variantes CVA

| Dimensão                    | Valores                                 | Padrão     |
| --------------------------- | --------------------------------------- | ---------- |
| `variant`                   | `default`, `muted`                      | `default`  |
| `inset` / `sticky` / `glow` | `true`/`false` ou `top`/`center`/`none` | ver código |

---

## Tokens de design utilizados

| Token                                       | Slot        |
| ------------------------------------------- | ----------- |
| `bg-background` / `bg-card`                 | superfície  |
| `text-foreground` / `text-muted-foreground` | texto       |
| `border` / `bg-accent`                      | borda/hover |
| `bg-primary` / `text-primary`               | glow/beam   |

> Sem raw Tailwind.

---

## Escala tipográfica e de tamanho

| Slot      | sm           | md           | lg            |
| --------- | ------------ | ------------ | ------------- |
| Título    | `text-3xl`   | `text-4xl`   | `text-5xl`    |
| Descrição | `text-sm`    | `text-base`  | `text-base`   |
| Card      | `rounded-xl` | `rounded-xl` | `rounded-2xl` |

---

## Comportamentos e estados

| Estado           | Comportamento                |
| ---------------- | ---------------------------- |
| `loading`        | `<Skeleton>` fiel            |
| `hover`          | pause marquee / elevate card |
| `reduced-motion` | desativa animações           |

---

## Acessibilidade

| Requisito | Implementação                          |
| --------- | -------------------------------------- |
| Role      | `banner`/`region`/`navigation`         |
| Rótulo    | `aria-label` em nav/marquee            |
| Teclado   | `Tab`, `Enter` em links                |
| i18n      | via props `badge/title` (sem hardcode) |

---

## Stories obrigatórias

- [ ] `Default`
- [ ] `AllVariants` (se houver)
- [ ] `Loading`
- [ ] `A11y`

---

## Checklist antes de implementar

- [ ] Tipografia `sm=text-xs / md=text-sm / lg=text-base` quando aplicável
- [ ] Tokens semânticos apenas
- [ ] `cva()` com `defaultVariants`
- [ ] `*Variants` exportados
- [ ] Loading `<Skeleton>`
- [ ] `truncate` em labels
- [ ] `aria-label` presente
- [ ] `cn()` para classes
- [ ] Spacing Tailwind steps
