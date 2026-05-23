# Spec: Pagination

---

## Propósito

Componente de paginação semântica com `<nav>` e `<ul>`, links anterior/próximo com texto + ícone, ellipsis, e suporte a locale nos aria-label.

**Usar quando:** Qualquer lista ou tabela paginada no design system.

**Não usar quando:** Paginação com select de página (quantas páginas). Scroll infinito.

**Alternativa se não se aplicar:** Scroll infinito, "load more" button.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/pagination.tsx` |
| Tipo | `registry:component` (name: `pagination-ui`) |
| Categoria | `Navigation` |
| Depende de | `Button` (shadcn), `ChevronLeftIcon`, `ChevronRightIcon`, `MoreHorizontalIcon` (lucide-react) |

---

## API — Props

**Pagination (root):**

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | | Localização dos aria-label |
| `className` | `string` | — | | Classes extras |

> Estende `React.ComponentProps<"nav">`. Não estende VariantProps (sem CVA).

**PaginationLink:**

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `isActive` | `boolean` | — | | Aplica variante `outline` ao Button |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"icon"` | | Tamanho do botão |

> Estende `React.ComponentProps<"a">`.

**PaginationPrevious / PaginationNext:**

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `text` | `string` | — | | Sobrescreve o texto padrão i18n |
| `locale` | `UILocale` | `"en-US"` | | Localização do label |

> Estende `React.ComponentProps<typeof PaginationLink>`.

**PaginationEllipsis:**

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | | Localização do sr-only |

> Estende `React.ComponentProps<"span">`.

---

## Variantes CVA

Nenhuma. O componente delega variantes visuais ao shadcn `Button` (variants: `outline`, `ghost`; size: `default`, `icon`).

---

## Tokens de design utilizados

Nenhum diretamente. Os tokens vêm do shadcn `Button` (delegação).

- `variant="outline"` → botão de página ativa
- `variant="ghost"` → demais botões
- `size="default"` → Previous/Next
- `size="icon"` → botões de página

---

## Escala tipográfica e de tamanho

| Slot | Valor |
|------|-------|
| Previous/Next text | `text-sm` (hidden em mobile com `hidden sm:block`) |
| Icon | `size-4` (gerenciado pelo Button shadcn) |
| Ellipsis container | `size-9 flex items-center justify-center` |
| Ellipsis icon | `size-4` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `isActive` | Button `variant="outline"`, link `aria-current="page"` |
| Mobile (< sm) | Previous/Next mostram apenas ícone, texto oculto |
| Ellipsis | `aria-hidden` com `sr-only` para leitores de tela |
| Previous | `aria-label="Go to previous page"`, ícone à esquerda |
| Next | `aria-label="Go to next page"`, ícone à direita |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<nav role="navigation">` com `aria-label` i18n |
| Lista | `<ul>` com itens `<li>` |
| Link ativo | `aria-current="page"` |
| Previous/Next | `aria-label` i18n (`goToPrevious`, `goToNext`) |
| Ellipsis | `aria-hidden`, com `sr-only` "More pages" i18n |
| Previous/Next text | `hidden sm:block` (acessível mesmo oculto via label) |
| i18n | `UI_I18N[locale].pagination.*` (navLabel, previous, next, goToPrevious, goToNext, morePages) |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — página 1 ativa, 5 páginas
- [ ] `ActiveMiddle` — página 3 ativa
- [ ] `LastPage` — última página ativa
- [ ] `CustomText` — Previous/Next com texto customizado
- [ ] `ManyPages` — 10+ páginas com ellipsis em ambos lados
- [ ] `Mobile` — viewport < sm (texto oculto)
- [ ] `Locales` — pt-BR, es-ES, fr-FR

---

## Checklist antes de implementar

- [ ] Escala tipográfica — N/A (usa tamanhos do shadcn Button)
- [x] Tokens semânticos — N/A (delega ao shadcn Button)
- [ ] `cva()` — N/A (sem variantes próprias)
- [ ] Loading — N/A (sem estado loading)
- [ ] `tabular-nums` — N/A
- [ ] `truncate` — N/A
- [x] `aria-label` no `<nav>` e Previous/Next
- [x] `aria-current="page"` no link ativo
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` integrada via `UI_I18N`
