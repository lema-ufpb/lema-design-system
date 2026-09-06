# Spec: fade

> Inspirado em https://www.launchuicomponents.com/docs/components/fade — Launch UI Components. Evita colisão, criativo, acessível.

---

## Propósito

Fade mask x/y/top/bottom etc com mask-image — Launch UI Fade. Evita colisão com separator/scroll-area — aqui é utilitário de máscara.

**Usar quando:** precisar de fade com tokens DS.
**Não usar quando:** primitivo simples já resolve.
**Alternativa:** `—`.

---

## Localização

| Campo      | Valor                    |
| ---------- | ------------------------ |
| Arquivo    | `components/ds/fade.tsx` |
| Tipo       | `registry:ui`            |
| Categoria  | `Utilities`              |
| Depende de | —                        |

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
