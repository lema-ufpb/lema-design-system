# Spec: app-sidebar

> Gerado automaticamente para fechar gap spec-driven. Componente `components/ds/app-sidebar.tsx` estava sem spec em `docs/specs`. Base: template `docs/templates/component-spec.md`.

---

## Propósito

Componente `app-sidebar` — sidebar completa (TeamSwitcher + Search + NavMain + Projects + NavUser) para shell dashboard.

**Usar quando:** compor páginas/layouts que precisam de app-sidebar.
**Não usar quando:** um primitivo `components/ui` isolado já resolve.
**Alternativa:** compor com primitivos `Card`, `Button`, `Skeleton`.

---

## Localização

| Campo      | Valor                           |
| ---------- | ------------------------------- |
| Arquivo    | `components/ds/app-sidebar.tsx` |
| Tipo       | `registry:block`                |
| Categoria  | `Navigation`                    |
| Depende de | collapsible, sidebar, skeleton  |

---

## API — Props

| Prop                | Tipo                                   | Padrão     | Obrigatória | Descrição |
| ------------------- | -------------------------------------- | ---------- | ----------- | --------- |
| `teams`             | `TeamSwitcherTeam[]`                   | —          |             |           |
| `navMain`           | `AppSidebarNavItem[]`                  | —          |             |           |
| `projects`          | `AppSidebarProject[]`                  | —          |             |           |
| `user`              | `UserMenuData                          | null`      | —           |           |     |
| `showSearch`        | `boolean`                              | —          |             |           |
| `searchPlaceholder` | `string`                               | —          |             |           |
| `collapsible`       | `"offcanvas"                           | "icon"     | "none"`     | —         |     |     |
| `sidebarVariant`    | `"sidebar"                             | "floating" | "inset"`    | —         |     |     |
| `locale`            | `UILocale`                             | —          |             |           |
| `loading`           | `boolean`                              | —          |             |           |
| `onNavItemClick`    | `(item: AppSidebarNavItem) => void`    | —          |             |           |
| `onProjectClick`    | `(project: AppSidebarProject) => void` | —          |             |           |
| `onTeamChange`      | `(team: TeamSwitcherTeam) => void`     | —          |             |           |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof *Variants>` quando houver CVA.

---

## Variantes CVA

| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `default`, `muted` | `default` |

**Slots:** `appSidebarVariants`

---

## Tokens de design utilizados

| Token                   | Slot |
| ----------------------- | ---- |
| `text-muted-foreground` | —    |

> Sem raw Tailwind para semântica (ex: `bg-emerald-500` proibido).

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

| Estado           | Comportamento                                           |
| ---------------- | ------------------------------------------------------- |
| `loading={true}` | `<Skeleton>` com dimensões fiéis                        |
| `empty`          | mensagem `—` + i18n `nothingToMeasure` quando aplicável |
| `disabled`       | `opacity-50 pointer-events-none`                        |
| Overflow         | `truncate` em labels                                    |

---

## Acessibilidade

| Requisito | Implementação                               |
| --------- | ------------------------------------------- |
| Role      | `region`/`list`/`button` conforme semântica |
| Rótulo    | `aria-label` quando sem label visível       |
| Teclado   | `Enter`/`Space` em rows/cards clicáveis     |
| i18n      | `UI_I18N[locale].appsidebar`                |

---

## Stories obrigatórias

- [ ] `Default`
- [ ] `AllVariants`/`AllSizes`
- [ ] `Loading`
- [ ] `Empty` (se aplicável)
- [ ] `Locales` (pt-BR/en-US/es-ES/fr-FR)
- [ ] `A11y` / interação com `play`

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
- [ ] `cn()` para classes condicionais
- [ ] Spacing Tailwind steps
- [ ] `locale` via `UI_I18N`
