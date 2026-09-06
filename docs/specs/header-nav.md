# Spec: HeaderNav

> Navegação principal horizontal baseada em `NavigationMenu` Radix.

---

## Propósito

Nav horizontal com suporte a links simples, dropdowns e mega-menu custom. Keyboard, roving focus e viewport animation herdados do primitivo.

**Usar quando:** Menu principal do header (3-7 itens).
**Não usar quando:** Breadcrumbs, Tabs, Sidebar vertical.

---

## Localização

| Campo      | Valor                                                        |
| ---------- | ------------------------------------------------------------ |
| Arquivo    | `components/ds/header-nav.tsx`                               |
| Tipo       | `registry:ui` (name: `ds-header-nav`)                        |
| Categoria  | Navigation                                                   |
| Depende de | `NavigationMenu`, `NavigationMenu*`, `Skeleton`, `next/link` |

---

## API — Props

| Prop         | Tipo                   | Padrão              | Obrigatória | Descrição     |
| ------------ | ---------------------- | ------------------- | ----------- | ------------- |
| `items`      | `HeaderNavItem[]`      | —                   | ✓           | Itens         |
| `onNavigate` | `(item)=>void`         | —                   |             | Click handler |
| `loading`    | `boolean`              | `false`             |             | Skeleton      |
| `ariaLabel`  | `string`               | `"Main navigation"` |             | Label nav     |
| `size`       | `"sm" \| "md" \| "lg"` | `"md"`              |             | Type scale    |
| `className`  | `string`               | —                   |             | Layout        |

```ts
type HeaderNavItem = {
  label: string
  href?: string
  active?: boolean
  description?: string
  icon?: ReactNode
  badge?: string
  children?: HeaderNavItem[]
  content?: ReactNode
}
```

---

## Variantes CVA

| Dimensão | Valores                                  | Padrão |
| -------- | ---------------------------------------- | ------ |
| `size`   | `sm` text-xs, `md` text-sm, `lg` text-sm | `md`   |

Slot único `headerNavVariants` — flex items-center com type override `[&_a]:text-*`.

---

## Tokens

| Token                                    | Slot                  |
| ---------------------------------------- | --------------------- |
| `bg-muted` / `text-foreground`           | `data-active` link    |
| `bg-popover`                             | NavigationMenuContent |
| `text-muted-foreground`                  | description `text-xs` |
| `bg-primary` / `text-primary-foreground` | badge pill            |

---

## Escala

| Slot  | sm                            | md                    | lg                    |
| ----- | ----------------------------- | --------------------- | --------------------- |
| Label | `text-xs font-medium`         | `text-sm font-medium` | `text-sm font-medium` |
| Icon  | `size-4` via `[&_svg]:size-4` | `size-4`              | `size-4`              |
| Badge | `text-[10px] px-1.5`          | `text-[10px]`         | `text-[10px]`         |

---

## Comportamentos

| Estado     | Comportamento                                            |
| ---------- | -------------------------------------------------------- |
| `loading`  | 4 `Skeleton h-8 w-20 rounded-full`                       |
| `active`   | `bg-muted` + `aria-current="page"`                       |
| `children` | Render `NavigationMenuTrigger + Content` com grid 2 cols |
| `content`  | Render custom node (mega) sem grid                       |
| `badge`    | Pill absoluto ao lado label                              |

---

## Acessibilidade

| Requisito | Implementação                                                   |
| --------- | --------------------------------------------------------------- |
| Nav       | `<nav aria-label>`                                              |
| Active    | `aria-current="page"` + `data-active`                           |
| Dropdown  | `NavigationMenu` roving focus, `aria-expanded` automático Radix |
| Icon      | `aria-hidden` se decorativo                                     |

---

## Stories

- [ ] `Default` — 4 links + 1 dropdown
- [ ] `ActiveState` — um item active
- [ ] `WithMegaContent` — content custom
- [ ] `WithIconsAndBadges`
- [ ] `Loading`
- [ ] `AllSizes`

---

## Checklist

- [x] Reuso NavigationMenu composition correta (Trigger inside Item)
- [x] `truncate` label + `line-clamp-2` description
- [x] `size-*` icons
- [x] Skeleton dims `h-8 w-20`
