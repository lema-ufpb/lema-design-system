# Spec: HeaderTransparent

> Header overlay hero que vira blurred ao scroll.

---

## Propósito

Landing / hero com header transparente sobre imagem blockus #08 #09 #13 #19.

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/header-transparent.tsx`        |
| Tipo       | `registry:ui` (name: `ds-header-transparent`) |
| Categoria  | Navigation                                    |
| Depende de | `Header` + hook `useScroll` interno           |

---

## API — Props

| Prop        | Tipo                   | Padrão    | Descrição                    |
| ----------- | ---------------------- | --------- | ---------------------------- |
| `brand`     | `HeaderBrandProps`     | ✓         |                              |
| `navItems`  | `HeaderNavItem[]`      | —         |                              |
| `actions`   | `HeaderActionItem[]`   | —         |                              |
| `threshold` | `number`               | `8`       | px scroll para virar blurred |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`    |                              |
| `locale`    | `UILocale`             | `"en-US"` |                              |

---

## Variantes

Não cria CVA — alterna `variant` de `Header` entre `transparent` e `blurred` via `scrollY > threshold` com `transition-colors duration-200`.

---

## Comportamentos

| Estado                 | Comportamento                                                       |
| ---------------------- | ------------------------------------------------------------------- |
| `scrollY <= threshold` | `variant="transparent"` + `text-white` via CSS var (se hero escuro) |
| `scrollY > threshold`  | `variant="blurred"` + shadow                                        |
| SSR                    | `variant="transparent"` inicial, hidratação corrige                 |

---

## Acessibilidade

| Requisito       | Implementação                                                      |
| --------------- | ------------------------------------------------------------------ |
| Scroll listener | `passive` + cleanup, sem `z-index` manual                          |
| Contrast        | Usuário deve garantir contraste hero; componente não força cor raw |

---

## Stories

- [ ] `Default` — transparent overlay
- [ ] `Scrolled` — simula scrollY=20 → blurred
- [ ] `InHero` — dentro wrapper `bg-slate-900 h-80`

---

## Checklist

- [x] `useEffect` scroll com cleanup
- [x] Tokens `bg-background/80` etc
- [x] `transition-colors`
