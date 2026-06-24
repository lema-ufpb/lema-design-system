# Spec: NavigationMenu

> Barra de navegação horizontal com painéis dropdown aninhados e viewport animado.

---

## Propósito

**Usar quando:** Criar uma navegação primária no topo da página com categorias que expandem em painéis de conteúdo ricos (grids de links, descrições).

**Não usar quando:** Precisa de menu dropdown simples com items de ação — usar `Menubar`. A navegação é uma lista linear simples — usar `<nav>` com links.

**Alternativa:** `Menubar` para menus de ação; `Tabs` para alternar entre seções.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/navigation-menu.tsx` |
| Tipo | `registry:ui` (name: `navigation-menu`) |
| Categoria | Navegação |
| Depende de | `radix-ui` (NavigationMenu), `class-variance-authority`, `lucide-react` (ChevronDownIcon), `@/lib/utils` (cn) |

---

## API — Props

### NavigationMenu

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `viewport` | `boolean` | `true` | Não | Renderiza o viewport animado |
| `className` | `string` | — | Não | Classes adicionais |

### NavigationMenuTrigger

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### NavigationMenuLink

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `active` | `boolean` | — | Não | Indica link ativo |

### navigationMenuTriggerStyle()

Função CVA que retorna as classes base para o trigger. Pode ser usada em links diretos sem trigger.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--muted` | Hover/focus do trigger e links |
| `--popover` / `--popover-foreground` | Fundo e texto do dropdown |
| `--border` | Cor do triângulo indicador |
| `--ring` / `--ring/30` | Anel de foco |
| `ring-1 ring-foreground/5` | Anel sutil no viewport |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Trigger hover | Fundo `--muted`, chevron rotaciona 180deg |
| Content aberto | Animação `fade-in` + `zoom-in-90` |
| Content fechado | Animação `fade-out` + `zoom-out-90` |
| Viewport true | Content renderizado via NavigationMenuViewport |
| Viewport false | Content estilizado como dropdown absoluto |
| Link ativo | Fundo `--muted/50` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Navegação por teclado | `radix-ui` NavigationMenu |
| Roles ARIA | Gerenciado pelo Radix |
| Chevron decorativo | `aria-hidden="true"` |

---

## Stories obrigatórias

- [x] `Default` — Dois menus com grid, um link direto, viewport ativado
- [x] `NoViewport` — Viewport desabilitado, dropdown inline

---

## Checklist

- [x] Componente funcional com 8 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `viewport` prop
- [x] Função `navigationMenuTriggerStyle()` exportada
- [x] Atributo `data-slot` em todos os sub-componentes
