# Spec: Tabs

> Conjunto de seções em camadas que exibem um painel por vez, acionadas por uma barra de abas.

---

## Propósito

**Usar quando:** O conteúdo precisa ser organizado em categorias ou seções mutuamente exclusivas, permitindo que o usuário alterne entre elas sem navegação de página.

**Não usar quando:** O usuário precisa ver múltiplas seções simultaneamente (usar Accordion ou layout em grade). A navegação é estrutural (usar Sidebar ou Menu).

**Alternativa:** Accordion para conteúdo vertical expansível, Stepper para fluxos sequenciais.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/tabs.tsx` |
| Tipo | `registry:ui` (name: `tabs`) |
| Categoria | Navegação / Abas |
| Depende de | `radix-ui`, `class-variance-authority` |

---

## API — Props

### Tabs (Root)

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `defaultValue` | `string` | — | Não | Aba ativa inicial |
| `value` | `string` | — | Não | Aba ativa controlada |
| `onValueChange` | `(value: string) => void` | — | Não | Callback de mudança |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Não | Orientação |
| `className` | `string` | — | Não | Classes adicionais |

### TabsList

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | `"default" \| "line"` | `"default"` | Não | Estilo visual da lista |
| `className` | `string` | — | Não | Classes adicionais |

### TabsTrigger

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | Sim | Valor que identifica a aba |
| `disabled` | `boolean` | — | Não | Desabilita o trigger |

### TabsContent

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | Sim | Valor que vincula ao trigger |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--muted` | Fundo da TabsList variante `default` |
| `--foreground / 60%` | Texto de trigger inativo |
| `--background` | Fundo do trigger ativo |
| `--foreground` | Texto do trigger ativo / indicador line |
| `--ring / 50%` | Anel de foco no trigger |
| `--border` | Borda de containers e triggers |
| `--input / 30%` | Borda do trigger ativo (dark) |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default (horizontal)** | Lista horizontal com fundo `bg-muted` e abas arredondadas |
| **Line** | Lista sem fundo, indicador de linha animada via `::after` |
| **Vertical** | Lista vertical à esquerda, `flex-col`, conteúdo à direita |
| **Trigger ativo** | `bg-background`, `text-foreground` |
| **Trigger inativo** | `text-foreground/60` |
| **Trigger hover** | `hover:text-foreground` |
| **Trigger disabled** | `opacity-50`, `pointer-events-none` |
| **Focus** | `focus-visible:border-ring focus-visible:ring-[3px]` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA | Radix fornece `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` |
| Teclado | Navegação por setas (esquerda/direita ou cima/baixo dependendo da orientação) |
| Foco | `focus-visible` com ring e outline |

---

## Stories obrigatórias

- [x] `Default` — horizontal, 3 abas (Account, Password, Notifications)
- [x] `Variants` — default e line lado a lado
- [x] `Vertical` — orientação vertical com Profile, Security, Billing
- [x] `Disabled` — aba do meio desabilitada

---

## Checklist

- [x] Componente implementado em `tabs.tsx`
- [x] Stories implementadas (Default, Variants, Vertical, Disabled)
- [x] `data-slot` em Tabs, TabsList, TabsTrigger, TabsContent
- [x] Variantes `default` e `line` via CVA
- [x] Orientação horizontal e vertical via `data-orientation`
- [x] Tokens semânticos
- [x] Indicador animado via `::after` para variante line
