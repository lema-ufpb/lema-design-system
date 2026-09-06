# Spec: glass

> Inspirado em https://www.launchuicomponents.com/docs/components/glass — Launch UI Components. Evita colisão, criativo, acessível.

---

## Propósito

Glassmorphism 5 variantes (glass-1..5) com gradient e backdrop-blur — Launch UI Glass. Novo, sem colisão.

**Usar quando:** precisar de glass com tokens DS.
**Não usar quando:** primitivo simples já resolve.
**Alternativa:** `—`.

---

## Localização

| Campo      | Valor                     |
| ---------- | ------------------------- |
| Arquivo    | `components/ds/glass.tsx` |
| Tipo       | `registry:ui`             |
| Categoria  | `Utilities`               |
| Depende de | —                         |

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
