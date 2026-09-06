# Spec: screenshot

> Inspirado em https://www.launchuicomponents.com/docs/components/screenshot — Launch UI Components. Evita colisão, criativo, acessível.

---

## Propósito

Screenshot theme-aware (light/dark) com skeleton e otimização — Launch UI Screenshot. Evita colisão com browser-mockup (frame) e image-gallery.

**Usar quando:** precisar de screenshot com tokens DS.
**Não usar quando:** primitivo simples já resolve.
**Alternativa:** `skeleton`.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/screenshot.tsx` |
| Tipo       | `registry:ui`                  |
| Categoria  | `Media`                        |
| Depende de | skeleton                       |

---

## API — Props

| Prop                              | Tipo      | Padrão    | Obrigatória | Descrição       |
| --------------------------------- | --------- | --------- | ----------- | --------------- |
| `variant`                         | `string`  | `default` |             | Variante CVA    |
| `rounded` / `shadow` / `position` | `string`  | —         |             | Controle visual |
| `loading`                         | `boolean` | `false`   |             | Skeleton        |
| `className`                       | `string`  | —         |             | Layout extra    |

---

## Variantes CVA

| Dimensão                          | Valores    | Padrão    |
| --------------------------------- | ---------- | --------- |
| `variant`                         | `default`  | `default` |
| `rounded` / `shadow` / `position` | ver código | `md`      |

---

## Tokens

| Token                  | Slot        |
| ---------------------- | ----------- |
| `bg-card` / `bg-muted` | fundo       |
| `border` / `ring`      | borda       |
| `bg-primary`           | glow/accent |

---

## Escala

| Slot  | sm         | md        | lg          |
| ----- | ---------- | --------- | ----------- |
| Label | `text-xs`  | `text-sm` | `text-base` |
| Ícone | `size-3.5` | `size-4`  | `size-5`    |

---

## Estados

| Estado    | Comportamento     |
| --------- | ----------------- |
| `loading` | `<Skeleton>`      |
| `hover`   | elevação/brilho   |
| `dark`    | `dark:` via token |

---

## Acessibilidade

| Requisito     | Implementação             |
| ------------- | ------------------------- |
| `alt`         | obrigatório em screenshot |
| `aria-busy`   | loading                   |
| `aria-hidden` | glow/fade decorativo      |

---

## Stories

- [ ] `Default`
- [ ] `AllVariants`
- [ ] `Loading`

---

## Checklist

- [ ] Tokens semânticos
- [ ] `cva` + `defaultVariants`
- [ ] `Skeleton`
- [ ] `aria-*`
- [ ] `cn()`
