# Spec: Menubar

> Barra de menu horizontal com menus dropdown aninhados, suporte a checkbox, radio items, submenus e atalhos de teclado.

---

## Propósito

**Usar quando:** Disponibilizar um menu de navegação por categorias no topo da interface, similar a barras de menu de aplicativos desktop.

**Não usar quando:** A navegação é simples e linear — usar `NavigationMenu`. Ação primária em formulários — usar `Select` ou `DropdownMenu`.

**Alternativa:** `NavigationMenu` para navegação por links; `Select` para seleção única.

---

## Localização

| Campo      | Valor                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| Arquivo    | `components/ui/menubar.tsx`                                                            |
| Tipo       | `registry:ui` (name: `menubar`)                                                        |
| Categoria  | Navegação / Menu                                                                       |
| Depende de | `radix-ui` (Menubar), `lucide-react` (CheckIcon, ChevronRightIcon), `@/lib/utils` (cn) |

---

## API — Props

### Menubar (Root)

| Prop        | Tipo     | Padrão | Obrigatória | Descrição          |
| ----------- | -------- | ------ | ----------- | ------------------ |
| `className` | `string` | —      | Não         | Classes adicionais |

### MenubarTrigger

| Prop        | Tipo     | Padrão | Obrigatória | Descrição          |
| ----------- | -------- | ------ | ----------- | ------------------ |
| `className` | `string` | —      | Não         | Classes adicionais |

### MenubarContent

| Prop          | Tipo                           | Padrão    | Obrigatória | Descrição               |
| ------------- | ------------------------------ | --------- | ----------- | ----------------------- |
| `className`   | `string`                       | —         | Não         | Classes adicionais      |
| `align`       | `"start" \| "center" \| "end"` | `"start"` | Não         | Alinhamento do dropdown |
| `alignOffset` | `number`                       | `-4`      | Não         | Offset de alinhamento   |
| `sideOffset`  | `number`                       | `8`       | Não         | Distância do trigger    |

### MenubarItem

| Prop      | Tipo                         | Padrão      | Obrigatória | Descrição                                |
| --------- | ---------------------------- | ----------- | ----------- | ---------------------------------------- |
| `inset`   | `boolean`                    | —           | Não         | Aplica padding esquerdo para alinhamento |
| `variant` | `"default" \| "destructive"` | `"default"` | Não         | Variante visual                          |

### MenubarCheckboxItem

| Prop      | Tipo      | Padrão | Obrigatória | Descrição        |
| --------- | --------- | ------ | ----------- | ---------------- |
| `checked` | `boolean` | —      | Não         | Estado marcado   |
| `inset`   | `boolean` | —      | Não         | Padding esquerdo |

### MenubarRadioItem

| Prop    | Tipo      | Padrão | Obrigatória | Descrição        |
| ------- | --------- | ------ | ----------- | ---------------- |
| `value` | `string`  | —      | Sim         | Valor do item    |
| `inset` | `boolean` | —      | Não         | Padding esquerdo |

### MenubarLabel

| Prop    | Tipo      | Padrão | Obrigatória | Descrição        |
| ------- | --------- | ------ | ----------- | ---------------- |
| `inset` | `boolean` | —      | Não         | Padding esquerdo |

### MenubarSubTrigger

| Prop    | Tipo      | Padrão | Obrigatória | Descrição        |
| ------- | --------- | ------ | ----------- | ---------------- |
| `inset` | `boolean` | —      | Não         | Padding esquerdo |

### MenubarShortcut

| Prop        | Tipo     | Padrão | Obrigatória | Descrição          |
| ----------- | -------- | ------ | ----------- | ------------------ |
| `className` | `string` | —      | Não         | Classes adicionais |

Demais sub-componentes (`MenubarMenu`, `MenubarGroup`, `MenubarPortal`, `MenubarRadioGroup`, `MenubarSeparator`, `MenubarSub`, `MenubarSubContent`) propagam props diretamente para o primitivo Radix.

---

## Tokens de design

| Token                                | Slot                      |
| ------------------------------------ | ------------------------- |
| `--border`                           | Borda externa da menubar  |
| `--muted`                            | Hover do trigger          |
| `--popover` / `--popover-foreground` | Fundo e texto do dropdown |
| `--accent` / `--accent-foreground`   | Hover/focus nos items     |
| `--destructive` / `--destructive/10` | Variante destrutiva       |
| `--border/50`                        | Separador                 |
| `--muted-foreground`                 | Label e shortcut          |
| `ring-1 ring-foreground/5`           | Anel sutil do popover     |

---

## Comportamentos e estados

| Estado                 | Comportamento                                   |
| ---------------------- | ----------------------------------------------- |
| Hover no trigger       | Fundo `--muted`                                 |
| Menu aberto            | Trigger com `aria-expanded`                     |
| Focus no item          | Fundo `--accent`, texto `--accent-foreground`   |
| Item destrutivo focado | Fundo `--destructive/10`, texto `--destructive` |
| Disabled               | `pointer-events-none` + `opacity-50`            |
| Inset                  | Padding esquerdo aumentado via `pl-9.5`         |

---

## Acessibilidade

| Requisito             | Implementação                                    |
| --------------------- | ------------------------------------------------ |
| Navegação por teclado | `radix-ui` Menubar (setas, Enter, Escape)        |
| Roles ARIA            | Gerenciado pelo Radix                            |
| Item indicator        | `MenubarPrimitive.ItemIndicator` com `CheckIcon` |

---

## Stories obrigatórias

- [x] `Default` — Menubar com File (items + destructive), Edit, View (checkbox + submenu radio)

---

## Checklist

- [x] Componente funcional com 16 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `className` via `cn()`
- [x] Atributo `data-slot` em todos os sub-componentes
- [x] Variante `destructive` em items
- [x] Suporte a `inset` para alinhamento
