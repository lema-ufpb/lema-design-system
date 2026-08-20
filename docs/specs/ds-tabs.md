# Spec: Tabs (DS)

> Componente declarativo de abas com 4 variantes visuais, 3 tamanhos, ícones, badges, loading skeletons e fallback responsivo para Accordion em mobile.

---

## Propósito

O DS Tabs substitui o JSX aninhado do Radix (`TabsList > TabsTrigger > TabsContent`) por uma API declarativa baseada em array `items`. Adiciona variantes visuais (`default`, `line`, `pill`, `segmented`), suporte a ícones e badges por aba, skeletons durante carregamento, e um fallback automático para Accordion em viewports móveis.

**Usar quando:** Conteúdo organizado em categorias mutuamente exclusivas. Ideal para painéis de configuração, dashboards com seções, e qualquer UI que precise de navegação por abas com experiência mobile nativa.

**Não usar quando:** Múltiplas seções precisam ser visíveis simultaneamente (usar Accordion ou grade). A navegação é estrutural/persistente (usar Sidebar).

---

## Localização

| Campo     | Valor                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Arquivo   | `components/ds/tabs.tsx`                                                                                                       |
| Categoria | Navigation                                                                                                                     |
| Importa   | `Tabs as TabsRoot`, `TabsContent` de `@/components/ui/tabs`; `TabsPrimitive` de `radix-ui`; `AccordionPrimitive` de `radix-ui` |
| Hooks     | `useIsMobile` de `@/hooks/use-mobile`                                                                                          |

---

## API — Props

### `TabsProps`

| Prop             | Tipo                                           | Padrão         | Descrição                                  |
| ---------------- | ---------------------------------------------- | -------------- | ------------------------------------------ |
| `items`          | `TabItem[]`                                    | —              | Array de definições de abas                |
| `defaultValue`   | `string`                                       | primeiro item  | Aba inicial (não-controlado)               |
| `value`          | `string`                                       | —              | Aba ativa controlada                       |
| `onValueChange`  | `(value: string) => void`                      | —              | Callback de mudança                        |
| `variant`        | `"default" \| "line" \| "pill" \| "segmented"` | `"default"`    | Estilo visual                              |
| `size`           | `"sm" \| "md" \| "lg"`                         | `"md"`         | Tamanho dos triggers                       |
| `orientation`    | `"horizontal" \| "vertical"`                   | `"horizontal"` | Orientação do layout                       |
| `responsive`     | `boolean`                                      | `false`        | Collapsa para Accordion em mobile          |
| `forceAccordion` | `boolean`                                      | `false`        | Sempre renderiza como Accordion            |
| `activationMode` | `"automatic" \| "manual"`                      | `"automatic"`  | Se abas ativam ao focar ou requerem clique |
| `loading`        | `boolean`                                      | `false`        | Mostra skeletons                           |
| `skeletonCount`  | `number`                                       | items.length   | Número de skeletons                        |
| `locale`         | `UILocale`                                     | `"en-US"`      | Locale para aria-labels                    |

### `TabItem`

| Prop       | Tipo                | Descrição                          |
| ---------- | ------------------- | ---------------------------------- |
| `value`    | `string`            | Identificador único                |
| `label`    | `string`            | Texto exibido no trigger           |
| `icon`     | `React.ElementType` | Lucide icon antes do label         |
| `count`    | `number`            | Badge numérico (ex: notificações)  |
| `disabled` | `boolean`           | Desabilita a aba                   |
| `content`  | `ReactNode`         | Renderizado dentro do painel ativo |

---

## CVA Variants

### `dsTabsListVariants`

| Variant                     | Classes                                                          |
| --------------------------- | ---------------------------------------------------------------- |
| `variant: "default"`        | `bg-muted rounded-full p-1`                                      |
| `variant: "line"`           | `bg-transparent rounded-none gap-1 border-b border-border pb-px` |
| `variant: "pill"`           | `bg-transparent gap-2`                                           |
| `variant: "segmented"`      | `bg-muted rounded-lg p-0.5`                                      |
| `orientation: "horizontal"` | `flex-row`                                                       |
| `orientation: "vertical"`   | `flex-col h-fit rounded-2xl`                                     |

### `dsTabsTriggerVariants`

| Variant + Size | Classes                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------- |
| `default`      | `rounded-full border border-transparent! data-active:bg-background data-active:shadow-xs` |
| `line`         | `rounded-none bg-transparent after:... data-active:after:opacity-100`                     |
| `pill`         | `rounded-full data-active:bg-primary data-active:text-primary-foreground`                 |
| `segmented`    | `rounded-md data-active:bg-background data-active:shadow-xs`                              |
| `size: "sm"`   | `h-7 px-2.5 text-xs [&_svg]:size-3`                                                       |
| `size: "md"`   | `h-9 px-3 text-sm [&_svg]:size-4`                                                         |
| `size: "lg"`   | `h-10 px-4 text-base [&_svg]:size-4`                                                      |

---

## Comportamentos

| Funcionalidade                | Detalhes                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Declarativo**               | `items` array em vez de JSX aninhado                                                                                    |
| **Controlled / uncontrolled** | `value` + `onValueChange` ou `defaultValue`                                                                             |
| **Ícones**                    | `icon` renderizado como `<Icon />` antes do label no trigger                                                            |
| **Badges**                    | `count` renderiza chip numérico `min-w-[1.25rem] h-5 rounded-full bg-muted-foreground/20`                               |
| **Loading**                   | `<Skeleton>` com formato correspondente à variante (rounded ou não)                                                     |
| **Responsivo**                | `useIsMobile()` (breakpoint 768px). Em mobile renderiza `AccordionPrimitive.Root` com chevron animado.                  |
| **Accordion fallback**        | Itens viram `AccordionItem` com trigger, chevron `rotate-180` no expandido, e conteúdo com `animate-accordion-down/up`. |
| **Vertical**                  | `flex-col` no list, `group-data-vertical/tabs:w-full` nos triggers                                                      |
| **Aria-label**                | Lista recebe `aria-label` do i18n (`tabs.tabList`)                                                                      |

---

## Acessibilidade

| Requisito          | Implementação                                                 |
| ------------------ | ------------------------------------------------------------- |
| Tablist            | Radix fornece `role="tablist"`, `role="tab"`, `aria-selected` |
| Navegação teclado  | Setas direcionais (nativo Radix)                              |
| Focus visible      | `focus-visible:border-ring focus-visible:ring-[3px]`          |
| Accordion fallback | Radix Accordion com `aria-expanded`                           |
| i18n               | `aria-label` na tab list localizado (4 idiomas)               |

---

## Stories obrigatórias

- [x] `Default` — 3 tabs com Account, Security, Notifications
- [x] `Variants` — default, line, pill, segmented lado a lado
- [x] `Sizes` — sm, md, lg
- [x] `WithIcons` — User, Lock, CreditCard
- [x] `WithBadges` — Mail (12), Activity (3), Messages (7), Cart (2)
- [x] `Vertical` — orientação vertical com ícones
- [x] `Loading` — 5 skeletons
- [x] `ResponsiveAccordion` — forceAccordion simula mobile
- [x] `Controlled` — botões externos controlam tab ativa
- [x] `KitchenSink` — pill + icons + badges + cards + activity feed

---

## Checklist

- [x] CVA single-file: Types → Variants → Helpers → Component
- [x] `"use client"` (hooks: useState, useRef, useCallback, useEffect)
- [x] `cn()` para class overrides
- [x] `data-slot="ds-tabs-list"`, `data-slot="ds-tabs-trigger"`, `data-slot="tabs-accordion"`
- [x] Todos os tokens semânticos (bg-muted, text-foreground, text-muted-foreground, etc.)
- [x] Loading state com Skeleton
- [x] Empty state (items.length === 0 → null)
- [x] Accordion fallback responsivo com animação
- [x] i18n: `tabs.tabList` em en-US, pt-BR, es-ES, fr-FR
- [x] Badge numérico seguro para valores opcionais
