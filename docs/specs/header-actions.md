# Spec: HeaderActions

> Grupo de CTAs do header (entrar, começar, etc).

---

## Propósito

Agrupa 1-3 Buttons com variantes semânticas. Esconde responsabilidade de layout e a11y do consumidor.

---

## Localização

| Campo      | Valor                                     |
| ---------- | ----------------------------------------- |
| Arquivo    | `components/ds/header-actions.tsx`        |
| Tipo       | `registry:ui` (name: `ds-header-actions`) |
| Categoria  | Navigation                                |
| Depende de | `Button`, `Skeleton`                      |

---

## API — Props

| Prop        | Tipo                   | Padrão  | Descrição        |
| ----------- | ---------------------- | ------- | ---------------- |
| `actions`   | `HeaderActionItem[]`   | ✓       | Lista ações      |
| `loading`   | `boolean`              | `false` | Skeleton         |
| `gap`       | `"sm" \| "md" \| "lg"` | `"md"`  | Gap entre botões |
| `className` | `string`               | —       | Layout           |

```ts
type HeaderActionItem = {
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "sm" | "default" | "lg" | "icon"
  icon?: ReactNode
  iconPosition?: "start" | "end"
  disabled?: boolean
  ariaLabel?: string
}
```

---

## Variantes CVA

| Dimensão | Valores                              | Padrão |
| -------- | ------------------------------------ | ------ |
| `gap`    | `sm` gap-1.5, `md` gap-2, `lg` gap-3 | `md`   |

---

## Tokens

| Token             | Slot                                        |
| ----------------- | ------------------------------------------- |
| `Button` variants | `bg-primary`, `bg-secondary`, etc — sem raw |
| `text-foreground` | label `truncate`                            |

---

## Comportamentos

| Estado     | Comportamento                                     |
| ---------- | ------------------------------------------------- |
| `loading`  | 2 Skeletons `h-9 w-20/24 rounded-full`            |
| `href`     | `Button asChild <a>`                              |
| `disabled` | `disabled` nativo                                 |
| `icon`     | `data-icon="inline-start/end"` + `[&_svg]:size-4` |

---

## Acessibilidade

| Requisito | Implementação                      |
| --------- | ---------------------------------- |
| Label     | `aria-label` fallback para `label` |
| Truncate  | `truncate` label                   |
| Focus     | Button já gerencia ring            |

---

## Stories

- [ ] `Default` — ghost + default
- [ ] `WithIcons`
- [ ] `SingleAction`
- [ ] `Loading`
- [ ] `Disabled`

---

## Checklist

- [x] `gap-*` não `space-x-*`
- [x] `data-icon` pattern
- [x] `truncate` label
- [x] `cn()` condicional
