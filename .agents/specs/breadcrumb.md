# Spec: Breadcrumb

> Uma navegação hierárquica que mostra a localização atual do usuário dentro da estrutura do site.

---

## Propósito

O Breadcrumb ajuda o usuário a entender sua posição em uma hierarquia de páginas e navegar para níveis ancestrais. Composto por 7 subcomponentes: `Breadcrumb` (nav), `BreadcrumbList` (ol), `BreadcrumbItem` (li), `BreadcrumbLink` (a), `BreadcrumbPage` (span para página atual), `BreadcrumbSeparator` (li com ícone ChevronRight) e `BreadcrumbEllipsis` (indicador de níveis colapsados). O `BreadcrumbLink` suporta `asChild` para integração com frameworks de roteamento (Next.js Link). O separador padrão é um ícone ChevronRight, mas pode ser substituído por qualquer conteúdo filho do `BreadcrumbSeparator`. O `BreadcrumbPage` usa `aria-current="page"` para acessibilidade.

**Usar quando:** A aplicação tem mais de dois níveis de profundidade (ex: Home > Section > Page). Essencial para SEO e orientação do usuário em sistemas complexos com hierarquia profunda.

**Não usar quando:** A navegação tem apenas um nível (página única). Evitar para fluxos não-lineares como wizards ou formulários multi-etapas (usar `StepProgress`).

**Alternativa se não se aplicar:** `StepProgress` para wizards, `Tabs` para navegação plana entre seções, `Button` com `variant="link"` para links de volta simples.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/breadcrumb.tsx` |
| Tipo | `registry:ui` (name: `breadcrumb`) |
| Categoria | Navigation |
| Depende de | Nenhuma |

---

## API — Props

### Breadcrumb
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### BreadcrumbLink
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `asChild` | `boolean` | — | Não | Renderiza como elemento filho via Slot |
| `href` | `string` | — | Sim (se não asChild) | URL do link |
| `className` | `string` | — | Não | Classes adicionais |

### BreadcrumbPage
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Sim | Nome da página atual |

### BreadcrumbSeparator
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `children` | `ReactNode` | `<ChevronRightIcon />` | Não | Separador customizado |

### BreadcrumbEllipsis
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

> `BreadcrumbItem`, `BreadcrumbList` aceitam `className` padrão.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--muted-foreground` | Cor dos links, separadores e ellipsis |
| `--foreground` | Cor da página atual (`BreadcrumbPage`) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Link normal | Texto em `text-muted-foreground` com `hover:text-foreground` |
| Página atual | `font-normal text-foreground` com `aria-current="page"` e `aria-disabled="true"` |
| Separador padrão | Ícone ChevronRight de `size-3.5` com `aria-hidden="true"` e `role="presentation"` |
| Separador customizado | Substitui o ícone por qualquer nó filho |
| Ellipsis | Ícone MoreHorizontal com `role="presentation"` e texto `sr-only "More"` |
| Colapso (ellipsis) | Pode ser combinado com DropdownMenu para navegação intermediária |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA Navigation | `aria-label="breadcrumb"` no elemento `<nav>` |
| Estrutura semântica | `<ol>` + `<li>` para lista ordenada de navegação |
| Página atual | `aria-current="page"` no `BreadcrumbPage` |
| Separador | `role="presentation"` e `aria-hidden="true"` |
| Ellipsis | `role="presentation"` com texto `sr-only` para leitores de tela |
| Links | `BreadcrumbLink` usa `<a>` ou Slot para integração com roteador |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Trilha de 3 níveis (Home > Components > Breadcrumb)
- [x] `WithEllipsis` — Trilha com ellipsis colapsando níveis intermediários
- [x] `WithCustomSeparator` — Separador textual "/" no lugar do ícone
- [x] `WithDropdown` — Ellipsis interativo com DropdownMenu para navegação

---

## Checklist antes de implementar

- [x] Escala tipográfica — `text-sm` para todos os elementos
- [x] Tokens semânticos — `muted-foreground`, `foreground`
- [x] Espaçamento — `gap-1.5` (mobile) / `gap-2.5` (sm:) entre itens
- [x] Ícones — `size-3.5` para separador, `size-4` para ellipsis
- [x] asChild — `BreadcrumbLink` usa `Slot.Root` para Next.js Link
- [x] Word break — `wrap-break-word` na lista para evitar overflow
