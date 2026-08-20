---
name: LEMA Design System
description: Sistema de componentes React para aplicações institucionais da UFPB
colors:
  background: oklch(1 0 0)
  foreground: oklch(0.145 0 0)
  primary: oklch(0.205 0 0)
  primary-foreground: oklch(0.985 0 0)
  secondary: oklch(0.97 0 0)
  secondary-foreground: oklch(0.205 0 0)
  muted: oklch(0.97 0 0)
  muted-foreground: oklch(0.48 0 0)
  accent: oklch(0.97 0 0)
  accent-foreground: oklch(0.205 0 0)
  destructive: oklch(0.577 0.245 27.325)
  border: oklch(0.922 0 0)
  input: oklch(0.922 0 0)
  ring: oklch(0.708 0 0)
  success: oklch(0.55 0.17 155)
  success-foreground: oklch(0.98 0 0)
  warning: oklch(0.75 0.18 75)
  warning-foreground: oklch(0.145 0 0)
  risk-1: oklch(0.62 0.19 28)
  risk-2: oklch(0.72 0.17 50)
  risk-3: oklch(0.85 0.18 85)
  risk-4: oklch(0.92 0.15 105)
  highlight-violet: oklch(0.55 0.22 290)
  highlight-violet-foreground: oklch(0.98 0 0)
  highlight-sky: oklch(0.58 0.18 240)
  highlight-sky-foreground: oklch(0.98 0 0)
  highlight-white: oklch(1 0 0)
  highlight-white-foreground: oklch(0.145 0 0)
  chart-1: oklch(0.55 0.12 260)
  chart-2: oklch(0.60 0.14 30)
  chart-3: oklch(0.65 0.10 140)
  chart-4: oklch(0.50 0.11 290)
  chart-5: oklch(0.55 0.09 190)
  footer-heading: oklch(0.145 0 0)
  footer-link: oklch(0.556 0 0)
  footer-link-hover: oklch(0.145 0 0)
  sidebar: oklch(0.985 0 0)
  sidebar-foreground: oklch(0.145 0 0)
  sidebar-primary: oklch(0.205 0 0)
  sidebar-primary-foreground: oklch(0.985 0 0)
  sidebar-accent: oklch(0.97 0 0)
  sidebar-accent-foreground: oklch(0.205 0 0)
  sidebar-border: oklch(0.922 0 0)
  sidebar-ring: oklch(0.708 0 0)
typography:
  display:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: clamp(1.75rem, 3vw, 2.5rem)
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.03em
    textWrap: balance
  headline:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: clamp(1.25rem, 2vw, 1.75rem)
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: normal
    textWrap: balance
  title:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: clamp(1rem, 1.5vw, 1.25rem)
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: normal
    textWrap: balance
  body:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
    textWrap: pretty
  label:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: normal
  mono:
    fontFamily: Geist Mono, ui-monospace, SFMono-Regular, monospace
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.625rem
  xl: 0.875rem
  2xl: 1.125rem
  3xl: 1.375rem
  4xl: 1.625rem
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  3xl: 4rem
---

# Design System: LEMA Design System

## 1. Overview

**Creative North Star: "O Painel de Controle"**

O LEMA Design System é um sistema de componentes institucional com personalidade de painel de controle — preciso, informativo, sem ornamentos. Cada componente é um instrumento calibrado para uma tarefa: exibir um dado, disparar uma ação, revelar uma métrica. A interface não compete com os dados; ela os organiza.

O sistema rejeita explicitamente o visual genérico de dashboards SaaS (cinza-azulado, cartões idênticos, side-stripe borders, hero-metric templates), o tema Bootstrap (sombra exagerada, glassmorphism decorativo, gradients) e o excesso de decoração (gradient text, grid backgrounds, eyebrows em toda seção). O design serve aos dados, não compete com eles.

**Key Characteristics:**

- Chroma zero como base — fundos e superfícies são neutros verdadeiros, sem tingimento artificial
- Tipografia mono para dados, sans para navegação e labels
- Multi-tema (blue, green, violet) para identidade institucional sem perder coerência
- Planar por default — profundidade é exceção, não regra
- Denso mas legível — tabelas, gráficos e métricas convivem sem ruído visual

## 2. Colors

A paleta cromática segue a filosofia "neutralidade como tela em branco": cores verdadeiramente neutras (chroma 0) como base, deixando que os dados falem. Os temas opcionais (blue, green, violet) adicionam personalidade institucional sem quebrar a neutralidade estrutural.

### Primary

- **Ink** (`oklch(0.205 0 0)`): Título, texto de alto destaque, primary solid backgrounds. O preto quase absoluto garante contraste máximo em light mode.
- **Ink Dim** (`oklch(0.145 0 0)`): Foreground padrão em light mode. Leitura longa.

### Neutral

- **Paper** (`oklch(1 0 0)`): Background padrão (light). Branco puro, chroma zero.
- **Paper Dark** (`oklch(0.145 0 0)`): Background padrão (dark). Preto quase absoluto.
- **Surface** (`oklch(0.97 0 0)`): Secondary, muted, accent backgrounds. Cartões e superfícies elevadas.
- **Surface Dark** (`oklch(0.269 0 0)`): Equivalente em dark mode.
- **Border** (`oklch(0.922 0 0)`): Bordas divisórias, separadores.
- **Muted Ink** (`oklch(0.48 0 0)`): Texto secundário, labels, placeholders.

### Accent (semantic)

- **Success** (`oklch(0.55 0.17 155)`): Indicadores positivos, crescimento, completo.
- **Warning** (`oklch(0.75 0.18 75)`): Atenção, alertas moderados.
- **Destructive** (`oklch(0.577 0.245 27.325)`): Erro, perigo, remoção.

### Risk

- **Risk 1** (`oklch(0.62 0.19 28)`): Risco máximo (vermelho).
- **Risk 2** (`oklch(0.72 0.17 50)`): Risco alto (laranja).
- **Risk 3** (`oklch(0.85 0.18 85)`): Risco médio (amarelo).
- **Risk 4** (`oklch(0.92 0.15 105)`): Risco baixo (lima).

### Highlights

- **Highlight Violet** (`oklch(0.55 0.22 290)`): Destaque para cards e gráficos.
- **Highlight Sky** (`oklch(0.58 0.18 240)`): Destaque alternativo.
- **Highlight White** (`oklch(1 0 0)`): Destaque overlay.

### Chart

- **Chart 1–5**: Paleta multicolorida neutra (azul, laranja, verde, roxo, ciano) com chroma 0.09–0.14. Substituída pelos temas opcionais (blue, green, violet) que aplicam sua própria família de matiz.

### Named Rules

**The Zero Chroma Rule.** Fundos, superfícies e textos estruturais têm chroma 0. Nenhum tingimento "para dar personalidade". A personalidade vem dos temas opcionais e dos dados.

**The One Hue Rule.** Cada tema (blue, green, violet) usa uma única família de matiz para primary, secondary, accent e charts. A coerência cromática do tema é mantida mesmo quando o matiz muda.

## 3. Typography

**Display / Body Font:** Inter (com fallback ui-sans-serif)
**Mono Font:** Geist Mono (com fallback ui-monospace)

**Character:** Uma só família sem serifa (Inter) para todo o texto — display, headline, body, label. A distinção visual vem de peso, tamanho e cor, não de troca de fonte. Geist Mono é reservado exclusivamente para dados, métricas, código e valores tabulares, reforçando a leitura técnica onde ela é necessária.

### Hierarchy

- **Display** (700, `clamp(1.75rem, 3vw, 2.5rem)`, 1.2, -0.03em): Títulos de página e cabeçalhos de dashboard. Uso esparso — uma ocorrência por tela.
- **Headline** (600, `clamp(1.25rem, 2vw, 1.75rem)`, 1.3): Títulos de seção e cards.
- **Title** (600, `clamp(1rem, 1.5vw, 1.25rem)`, 1.4): Subtítulos, nomes de widget, títulos de tabela.
- **Body** (400, `0.875rem`, 1.5): Corpo de texto, descrições, células de tabela. Cap line length 65–75ch. `text-wrap: pretty` em parágrafos longos.
- **Label** (500, `0.75rem`, 1.25, tracking normal): Rótulos de campo, navegação, metadata. Caixa alta ou baixa conforme o contexto, nunca tracking forçado.
- **Mono** (400, `0.8125rem`, 1.5): Dados numéricos, código, timestamps, valores financeiros. Sempre `tabular-nums` ativado.

### Scale Conventions (sm/md/lg)

Usar esta tabela em componentes com variante de tamanho:

- Label/Nome sm: `text-xs (0.75rem) font-medium` → md: `text-sm (0.875rem) font-medium` → lg: `text-base (1rem) font-medium`
- Valor/Número sm: `text-xs (0.75rem) font-semibold` → md: `text-sm (0.875rem) font-semibold` → lg: `text-base (1rem) font-semibold`

### Named Rules

**The One Family Rule.** Nunca adicionar uma segunda fonte display ou body sem alterar todo o sistema. Inter carrega a identidade tipográfica inteira. Mono é reservado exclusivamente para dados.

**The No-Eyebrow Rule.** Nenhuma label tracking-wide em caixa alta acima de títulos de seção ("ABOUT", "PROCESS", "PRICING"). O sistema não tem kickers.

## 4. Layout

O layout segue o modelo de grid flexível do Tailwind CSS v4, sem breakpoints fixos de design system. A responsividade é tratada por componente, não por macro-layout.

- `gap-*` sempre para espaçamento entre elementos — nunca `space-y-*` ou `space-x-*`
- Flexbox para eixos 1D, Grid para 2D. Preferir `flex-wrap` antes de `grid` quando possível
- Grids responsivos sem breakpoint: `repeat(auto-fit, minmax(280px, 1fr))`
- Cards de métrica em grid de 2–4 colunas. Cards de conteúdo em grid de 1–3 colunas
- Row heights: `h-10` (standard) / `h-8` (compact) para tabelas e listas densas
- Interactive element heights: `xs: h-6` | `sm: h-8` | `md: h-9` | `lg: h-10` | `xl: h-12`

## 5. Elevation & Depth

**Planar por default.** Superfícies são planas (sem sombras) em repouso. Profundidade é introduzida apenas como resposta a estado: hover, foco, modal, dropdown.

- Foco visível via `outline-ring/50` com `outline-offset` — sem glow ou box-shadow decorativa
- Modal e dialog: backdrop escuro (`bg-black/50`) + sombra sutil no container (`shadow-lg`)
- Dropdown e popover: `shadow-md` + `border` para separação de contexto
- Hover em cards e botões interativos: `shadow-sm` ou mudança de `bg` sem sombra (em superfícies, prefere-se tonal layering)
- Sticky header: sem sombra, usa `border-b` para demarcação

**The Flat-By-Default Rule.** Toda superfície nasce sem sombra. Sombra só aparece como resposta a interação ou como stack context explícito (modal, dropdown, tooltip).

## 6. Shapes

A linguagem de formas é definida por **arestas suaves e consistentes**, com raio base de 0.625rem (~10px) modulado por multiplicadores.

- **sm** (0.375rem): Botões de ação primária, inputs, chips — micro-interações
- **md** (0.5rem): Cards compactos, formulários, selects
- **lg** (0.625rem raiz): Cards padrão, modais, containers de seção
- **xl** (0.875rem): Cards de métrica destacados, containers de gráfico
- **2xl** (1.125rem): Cards amplos, containers de dashboard
- **3xl** (1.375rem): Containers especiais
- **4xl** (1.625rem): Containers de landing page
- **full**: Exclusivo para pills, tags, badges, avatares — nunca usado em cards

**The Precision Radius Rule.** Nunca usar `rounded-full` em cards, seções ou inputs. Full radius é reservado para elementos que são circular ou pill por natureza.

**The One-Border Rule.** `border: 1px solid X` + `box-shadow` com blur ≥ 16px no mesmo elemento é proibido. Escolher um: borda sólida OU sombra, nunca ambos como decoração.

## 7. Components

### Buttons (ds/button)

- **Shape:** `rounded-md` (0.5rem) ou `rounded-lg` (0.625rem) via variante `rounded`
- **Primary:** Background `bg-primary`, texto `text-primary-foreground`, padding `h-9 px-4` (md)
- **Hover / Focus:** Darken bg em 10%, outline ring no foco via teclado
- **States:** Default, hover, active, disabled, loading (com Spinner interno + disabled), confirm mode (two-step com tooltip)
- **Variants:** default, secondary, destructive, outline, ghost, link, success, warning (via shadcn variant)
- **Tamanhos:** sm (`h-8 px-3 text-xs`), md (`h-9 px-4 text-sm`), lg (`h-10 px-5 text-sm`), xl (`h-12 px-6 text-base`)
- **Extra:** `startIcon`, `endIcon` (Lucide, `size-4`), `loading`, `debounceMs`, `tooltip`, `fullWidth`

### Input Fields (ds/input, ds/input-email, ds/input-password)

- **Shape:** `rounded-md` (0.5rem)
- **Style:** Border `border-input` (oklch 0.922 0 0), bg `bg-background`, text `text-foreground`
- **Focus:** Ring `ring-ring` (oklch 0.708 0 0) com outline offset 2px
- **Error:** Border `border-destructive` + mensagem de erro abaixo
- **Disabled:** Opacity 50%, cursor not-allowed
- **Tamanhos:** sm (`h-8 text-xs`), md (`h-9 text-sm`), lg (`h-10 text-sm`)
- **Input-email:** Validação de email + máscara + i18n
- **Input-password:** Toggle show/hide + force logout em múltiplas abas via BroadcastChannel

### Cards (card-stat, card-icon, mini-card)

- **Shape:** `rounded-lg` (0.625rem)
- **Background:** `bg-card` (white / dark surface)
- **Shadow:** Nenhuma em repouso. Opcional `shadow-sm` apenas quando interativo
- **Border:** Nenhuma (usar bg contrast) ou `border` sutil quando necessário separar
- **Padding interno:** `p-4` (md) / `p-3` (sm) / `p-5` (lg)
- **Variações:** card-stat (métrica + label + ícone), card-stat-comparison (métrica + delta), card-icon (ícone + título), mini-card (compacto)

### Data Table (ds/data-table)

- **Header:** `bg-muted`, `text-muted-foreground`, `font-medium`, `text-sm`
- **Row height:** `h-10` (standard) / `h-8` (compact)
- **Células numéricas:** `tabular-nums`, `text-right`
- **Hover row:** `bg-muted/50`
- **Selected row:** `bg-accent`
- **Pagination:** Componente ds/pagination integrado
- **Sort:** Indicador de direção no header, via @tanstack/react-table

### Dashboard Widgets (dashbox, dashrow)

- **dashbox:** Container de widget com header (título + ações), corpo, footer. Padding `p-4`, gap `gap-4`
- **dashrow:** Linha horizontal de dashboxes, gap `gap-4`, responsivo via grid `auto-fit`

### Charts (bar-chart, pie-chart, line-chart, etc.)

- **Wrapper:** shadcn Chart com `--chart-1` a `--chart-5`
- **Tooltip:** Sempre presente, com valor formatado + label
- **Eixos:** `text-muted-foreground`, `text-xs`
- **Espaçamento:** `p-4` mínimo ao redor do canvas

### Badge / Pill (ds/badge, ds/pill-group)

- **Shape:** `rounded-full` (pill)
- **Tamanhos:** sm (`text-xs px-1.5 py-0.5`), md (`text-xs px-2 py-0.5`), lg (`text-sm px-2.5 py-1`)
- **Variants:** default, secondary, destructive, outline, success, warning
- **Pill-group:** Grupo horizontal de pills com gap, wrap responsivo

### Modal / Dialog (ds/modal)

- **Shape:** `rounded-xl` (0.875rem)
- **Overlay:** `bg-black/50`, `backdrop-blur-sm`
- **Padding:** `p-6`
- **Header:** Título + botão fechar, opcional descrição
- **Footer:** Alinhado à direita, gap `gap-2`

### Navigation (nav-user, tabs, select, combobox)

- **Nav-user:** Avatar + nome + email + dropdown de ações. Sem sombra, separado por `border-t` ou `bg-muted`
- **Tabs:** `text-sm`, `font-medium`, active `text-foreground border-b-2 border-primary`, inactive `text-muted-foreground`
- **Select / Combobox:** Trigger com `justify-between`, chevron `size-4`, dropdown com `shadow-md` + `rounded-md`

## 8. Do's and Don'ts

### Do:

- **Do** usar chroma zero para fundos, superfícies e texto estrutural. A tela em branco é o canvas dos dados.
- **Do** usar `tabular-nums` em todas as células de valor, métricas e dados financeiros.
- **Do** usar `gap-*` para espaçamento — nunca `space-y-*` ou `space-x-*`.
- **Do** usar `size-*` para ícones e avatares (nunca `w-* h-*` separados).
- **Do** usar `cn()` para classes condicionais — nunca template literals.
- **Do** respeitar a escala sm/md/lg de tipografia: labels começam em `text-xs font-medium`.
- **Do** usar `<Skeleton>` do shadcn para loading states — nunca `animate-pulse` custom.
- **Do** respeitar `prefers-reduced-motion` em toda animação.
- **Do** colocar todo texto visível no dicionário i18n (`lib/ui-i18n.ts`).

### Don't:

- **Don't** alterar o código-fonte de `components/ui/` — esses componentes são gerenciados exclusivamente pelo CLI shadcn.
- **Don't** usar side-stripe borders (`border-left > 1px` colorido) em cards, listas ou callouts.
- **Don't** usar gradient text (`background-clip: text` + gradient).
- **Don't** usar glassmorphism (backdrop-filter: blur) como decoração padrão.
- **Don't** usar hero-metric template (big number + small label + stats).
- **Don't** usar cartões idênticos em grid (icon + heading + text repetido).
- **Don't** usar tiny uppercase tracked eyebrow ("ABOUT", "PROCESS") acima de seções.
- **Don't** usar numbered section markers (01 / 02 / 03) como scaffolding default.
- **Don't** usar `border: 1px solid` + `box-shadow` com blur ≥ 16px no mesmo elemento.
- **Don't** usar `rounded-full` em cards, inputs ou containers — apenas pills e avatares.
- **Don't** usar `text-sm`/`text-base`/`text-lg` em slots de componente — a escala correta começa em `text-xs`.
- **Don't** usar valores arbitrários Tailwind (`gap-[7px]`, `px-[13px]`).
- **Don't** usar `dark:` manual — sempre usar tokens semânticos que já se adaptam ao tema.
- **Don't** usar `repeating-linear-gradient(...)` stripe backgrounds.
- **Don't** usar decorative grid backgrounds (CSS grid overlay com linear-gradient).
- **Don't** parecer um template Bootstrap ou SaaS genérico — o sistema rejeita a aparência de template comprado.
