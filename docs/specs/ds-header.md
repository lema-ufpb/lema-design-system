# Spec: Header

> Container semântico `banner` para navegação global. Base para todos os headers do design system.

---

## Propósito

O `Header` provê o wrapper semântico, sticky, responsivo e acessível que ancora identidade, navegação e ações. Inspiração direta nos 24 headers blockus — de minimal SaaS a mega-menu e-commerce. Reuso de `NavigationMenu`, `Sheet`, `Avatar`, `Command`.

**Usar quando:** Cabeçalho global de página, dashboard ou marketing site com logo + nav + CTA.
**Não usar quando:** Navegação lateral (`Sidebar`) ou toolbar interna de card (`Dashbox`).
**Alternativa:** `Sidebar` (app shell vertical), `Breadcrumbs` (navegação hierárquica secundária).

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/header.tsx`                     |
| Tipo       | `registry:ui` (name: `ds-header`)              |
| Categoria  | Navigation / Layout                            |
| Depende de | `UI_I18N`, `cn`, sem primitivos shadcn diretos |

---

## API — Props

### Header (Root)

| Prop             | Tipo                                                 | Padrão           | Obrigatória | Descrição                     |
| ---------------- | ---------------------------------------------------- | ---------------- | ----------- | ----------------------------- |
| `variant`        | `"default" \| "blurred" \| "transparent" \| "solid"` | `"default"`      |             | Tratamento de fundo/borda     |
| `size`           | `"sm" \| "md" \| "lg"`                               | `"md"`           |             | Altura e padding do container |
| `sticky`         | `boolean`                                            | `true`           |             | `sticky top-0 z-40`           |
| `bordered`       | `boolean`                                            | `true`           |             | Exibe `border-b`              |
| `locale`         | `UILocale`                                           | `"en-US"`        |             | Skip-link i18n                |
| `skipLinkTarget` | `string`                                             | `"main-content"` |             | Alvo do skip link             |
| `className`      | `string`                                             | —                |             | Classes extras de layout      |

### HeaderContainer

| Prop   | Tipo                   | Padrão                      | Descrição                |
| ------ | ---------------------- | --------------------------- | ------------------------ |
| `size` | `"sm" \| "md" \| "lg"` | herda do Header via context | Altura/padding max-w-7xl |

Estende `HTMLAttributes<HTMLElement>` / `HTMLAttributes<HTMLDivElement>` + `VariantProps`.

---

## Variantes CVA

| Dimensão  | Valores                                                                                                                                                       | Padrão    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `variant` | `default` (border-b + bg-background), `blurred` (bg/80 + backdrop-blur-xl), `transparent` (sem borda/fundo, para hero overlay), `solid` (bg-card + shadow-sm) | `default` |
| `size`    | `sm` h-14, `md` h-16, `lg` h-20 (via container)                                                                                                               | `md`      |

Slots:

- `headerVariants` — header externo
- `headerContainerVariants` — inner max-w-7xl flex justify-between gap-4

---

## Tokens de design utilizados

| Token                                       | Slot                  |
| ------------------------------------------- | --------------------- |
| `bg-background`                             | default/blurred fundo |
| `bg-card`                                   | variant solid         |
| `border`                                    | borda inferior        |
| `text-foreground` / `text-muted-foreground` | conteúdo herdado      |
| `ring`                                      | focus skip-link       |

---

## Escala tipográfica e de tamanho

| Slot              | sm      | md             | lg                     |
| ----------------- | ------- | -------------- | ---------------------- |
| Altura header     | `h-14`  | `h-16`         | `h-20`                 |
| Padding container | `px-4`  | `px-4 sm:px-6` | `px-4 sm:px-6 lg:px-8` |
| Gap               | `gap-4` | `gap-4`        | `gap-4`                |

---

## Comportamentos e estados

| Estado                | Comportamento                         |
| --------------------- | ------------------------------------- |
| `sticky=true`         | `sticky top-0 z-40`                   |
| `sticky=false`        | `relative`                            |
| `variant=transparent` | sem borda/fundo, exposto para overlay |
| Loading               | N/A — filhos gerenciam Skeleton       |
| Overflow              | `truncate` nos filhos                 |

---

## Acessibilidade

| Requisito | Implementação                                                |
| --------- | ------------------------------------------------------------ |
| Role      | `role="banner"` no `<header>`                                |
| Skip link | `<a href="#main-content" class="sr-only focus:not-sr-only">` |
| i18n      | `UI_I18N[locale].header.skipToContent`                       |
| Context   | `HeaderContext` propaga `size` para filhos                   |

---

## Stories obrigatórias

- [ ] `Default` — variant default md com brand + nav + actions
- [ ] `AllVariants` — default/blurred/transparent/solid
- [ ] `AllSizes` — sm/md/lg
- [ ] `Sticky` vs `NotSticky`
- [ ] `WithSkipLink` — tab focus revela skip

---

## Checklist antes de implementar

- [x] Escala h-14/16/20 segue interactive heights
- [x] Tokens semânticos apenas
- [x] `defaultVariants` declarado
- [x] `cn()` condicional
- [x] `aria-label` skip link i18n
