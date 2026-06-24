# Spec: Pagination UI

> Paginação semântica com `aria-label` localizado via i18n e texto customizável em Previous/Next.

---

## Propósito

Wrapper sobre a paginação shadcn/ui que adiciona suporte a locale para `aria-label` e texto dos botões Previous/Next/Ellipsis.

**Usar quando:** Navegar entre páginas de dados paginados com acessibilidade localizada.

**Não usar quando:** Navegação infinita (scroll infinito) ou "load more".

**Alternativa:** `Pagination` (shadcn/ui) sem suporte a locale.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/pagination.tsx` |
| Tipo | `registry:ui` (name: `ds-pagination`) |
| Categoria | Navegação |
| Depende de | `lucide-react`, `button`, `ui-i18n` |

---

## API — Props

### Pagination

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | Não | Localização dos `aria-label` |
| `className` | `string` | — | Não | Classes adicionais |

Wrapper `<nav>` com `aria-label` via i18n.

### PaginationLink

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `isActive` | `boolean` | — | Não | Marca como página ativa |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"icon"` | Não | Tamanho do botão |

### PaginationPrevious / PaginationNext

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `text` | `string` | i18n | Não | Texto do link |
| `locale` | `UILocale` | `"en-US"` | Não | Localização do `aria-label` |

### PaginationEllipsis

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | Não | Localização do `sr-only` |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--primary` / `--primary-foreground` | Botão de página ativa (variant `outline`) |
| `--border` / `--muted` | Botão inativo e hover (variant `ghost`) |
| `--ring` / `--ring/30` | Anel de foco |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Página ativa | `isActive=true`, `aria-current="page"`, variant `outline` |
| Página inativa | Variant `ghost` |
| Ellipsis | Apenas visual, `aria-hidden`, `sr-only` via i18n |
| Responsivo | Previous/Next exibem texto apenas em `sm:` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Navegação semântica | `<nav role="navigation" aria-label>` via i18n |
| Página ativa | `aria-current="page"` |
| Previous/Next | `aria-label` via i18n |
| Ellipsis | `aria-hidden`, `sr-only` via i18n |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `CustomText` — Custom Text

## Checklist

- [x] Componentes exportados: Pagination, PaginationContent, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationItem
- [x] `aria-label` localizado via i18n
- [x] Texto customizável em Previous/Next
- [x] Suporte a `isActive` em PaginationLink
- [x] `data-slot` em todos os sub-componentes
