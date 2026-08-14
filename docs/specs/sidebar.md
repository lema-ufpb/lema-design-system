# Spec: Sidebar

> Sistema de barra lateral completo com suporte a colapso, variantes, menus aninhados, busca e responsividade mobile.

---

## Propósito

**Usar quando:** Implementar uma barra de navegação lateral persistente com suporte a colapso (ícone/offcanvas), menus agrupados, busca e responsividade mobile via sheet.

**Não usar quando:** A navegação é simples e linear — usar `NavigationMenu`. Apenas links de rodapé — usar navegação inline.

**Alternativa:** `NavigationMenu` para navegação horizontal no topo; `Tabs` para alternar seções sem sidebar.

---

## Localização

| Campo      | Valor                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ui/sidebar.tsx`                                                                                                                                                                                                                                                             |
| Tipo       | `registry:ui` (name: `sidebar`)                                                                                                                                                                                                                                                         |
| Categoria  | Navegação / Layout                                                                                                                                                                                                                                                                      |
| Depende de | `radix-ui` (Slot), `@/hooks/use-mobile`, `@/components/ui/button`, `@/components/ui/input`, `@/components/ui/separator`, `@/components/ui/sheet`, `@/components/ui/skeleton`, `@/components/ui/tooltip`, `class-variance-authority`, `lucide-react` (PanelLeftIcon), `@/lib/utils` (cn) |

---

## API — Props

### SidebarProvider

| Prop           | Tipo                      | Padrão | Obrigatória | Descrição                |
| -------------- | ------------------------- | ------ | ----------- | ------------------------ |
| `defaultOpen`  | `boolean`                 | `true` | Não         | Estado inicial expandido |
| `open`         | `boolean`                 | —      | Não         | Estado controlado        |
| `onOpenChange` | `(open: boolean) => void` | —      | Não         | Callback de mudança      |
| `className`    | `string`                  | —      | Não         | Classes adicionais       |

### Sidebar

| Prop          | Tipo                                 | Padrão        | Obrigatória | Descrição                |
| ------------- | ------------------------------------ | ------------- | ----------- | ------------------------ |
| `side`        | `"left" \| "right"`                  | `"left"`      | Não         | Lado da tela             |
| `variant`     | `"sidebar" \| "floating" \| "inset"` | `"sidebar"`   | Não         | Estilo visual            |
| `collapsible` | `"offcanvas" \| "icon" \| "none"`    | `"offcanvas"` | Não         | Comportamento de colapso |

### SidebarTrigger

Botão que aciona `toggleSidebar()`. Props herdadas de `Button`.

### SidebarMenuButton

| Prop       | Tipo                            | Padrão      | Obrigatória | Descrição                     |
| ---------- | ------------------------------- | ----------- | ----------- | ----------------------------- |
| `asChild`  | `boolean`                       | `false`     | Não         | Renderiza como filho via Slot |
| `isActive` | `boolean`                       | `false`     | Não         | Estado ativo                  |
| `variant`  | `"default" \| "outline"`        | `"default"` | Não         | Variante visual               |
| `size`     | `"default" \| "sm" \| "lg"`     | `"default"` | Não         | Tamanho                       |
| `tooltip`  | `string \| TooltipContentProps` | —           | Não         | Tooltip no modo colapsado     |

### SidebarMenuAction

| Prop          | Tipo      | Padrão  | Obrigatória | Descrição                     |
| ------------- | --------- | ------- | ----------- | ----------------------------- |
| `asChild`     | `boolean` | `false` | Não         | Renderiza como filho          |
| `showOnHover` | `boolean` | `false` | Não         | Exibe apenas no hover do item |

### SidebarMenuSkeleton

| Prop       | Tipo      | Padrão  | Obrigatória | Descrição             |
| ---------- | --------- | ------- | ----------- | --------------------- |
| `showIcon` | `boolean` | `false` | Não         | Exibe ícone esqueleto |

### SidebarGroupLabel

| Prop      | Tipo      | Padrão  | Obrigatória | Descrição            |
| --------- | --------- | ------- | ----------- | -------------------- |
| `asChild` | `boolean` | `false` | Não         | Renderiza como filho |

### SidebarGroupAction

| Prop      | Tipo      | Padrão  | Obrigatória | Descrição            |
| --------- | --------- | ------- | ----------- | -------------------- |
| `asChild` | `boolean` | `false` | Não         | Renderiza como filho |

### SidebarMenuSubButton

| Prop       | Tipo           | Padrão  | Obrigatória | Descrição            |
| ---------- | -------------- | ------- | ----------- | -------------------- |
| `asChild`  | `boolean`      | `false` | Não         | Renderiza como filho |
| `size`     | `"sm" \| "md"` | `"md"`  | Não         | Tamanho              |
| `isActive` | `boolean`      | `false` | Não         | Estado ativo         |

### SidebarRail

Botão de borda para toggle por clique/arraste.

### useSidebar()

Hook que retorna o contexto da sidebar:

| Propriedade     | Tipo                        | Descrição              |
| --------------- | --------------------------- | ---------------------- |
| `state`         | `"expanded" \| "collapsed"` | Estado atual           |
| `open`          | `boolean`                   | Se está aberto         |
| `setOpen`       | `(open: boolean) => void`   | Controlar abertura     |
| `openMobile`    | `boolean`                   | Sheet mobile aberto    |
| `setOpenMobile` | `(open: boolean) => void`   | Controlar sheet mobile |
| `isMobile`      | `boolean`                   | Detecta mobile         |
| `toggleSidebar` | `() => void`                | Alterna estado         |

---

## Tokens de design

| Token                         | Slot                             |
| ----------------------------- | -------------------------------- |
| `--sidebar`                   | Fundo primário do painel         |
| `--sidebar-foreground`        | Cor do texto padrão              |
| `--sidebar-accent`            | Hover/active de items            |
| `--sidebar-accent-foreground` | Texto no accent                  |
| `--sidebar-border`            | Bordas, separadores e rail       |
| `--sidebar-ring`              | Anel de foco                     |
| `--background`                | Fundo do content (inset variant) |

---

## Comportamentos e estados

| Estado                | Comportamento                                |
| --------------------- | -------------------------------------------- |
| Expandido             | Largura `--sidebar-width` (16rem)            |
| Colapsado (icon)      | Largura `--sidebar-width-icon` (3rem)        |
| Colapsado (offcanvas) | Painel desliza para fora da tela             |
| Flutuante             | Padding interno, bordas arredondadas, sombra |
| Inset                 | Painel sobreõe ao main content com margem    |
| Mobile                | Abre como Sheet em tela cheia                |
| Teclado               | `Cmd/Ctrl + B` para toggle global            |
| Cookie                | Estado persiste por 7 dias via cookie        |

---

## Acessibilidade

| Requisito             | Implementação                                   |
| --------------------- | ----------------------------------------------- |
| Navegação por teclado | `Cmd/Ctrl+B` para toggle                        |
| ARIA labels           | `aria-label="Toggle Sidebar"` no rail e trigger |
| Mobile acessível      | Sheet com título e descrição `sr-only`          |
| Tooltips no colapso   | `Tooltip` para menu buttons quando colapsado    |
| Focus visible         | `focus-visible:ring-2` em items interativos     |

---

## Stories obrigatórias

- [x] `Default` — Sidebar completa com search, grupos, menu, footer e rail
- [x] `Inset` — Variante inset com collapsible=icon e tooltips

---

## Checklist

- [x] Componente funcional com 26 sub-componentes + 1 hook exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a 3 variantes (sidebar, floating, inset)
- [x] Suporte a 3 modos de colapso (offcanvas, icon, none)
- [x] Responsivo com Sheet em mobile
- [x] Hook `useSidebar()` para controle externo
- [x] Atalho de teclado `Cmd/Ctrl+B`
- [x] Persistência via cookie
- [x] Menu items com tooltip, badge, action, skeleton
- [x] Sub-navegação com `SidebarMenuSub*`
- [x] Search input via `SidebarInput`
- [x] Botão `SidebarTrigger` e rail `SidebarRail`
- [x] CVA para variantes do menu button
