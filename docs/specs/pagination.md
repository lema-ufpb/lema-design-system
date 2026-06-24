# Spec: Pagination

> Componente de navegação para paginação de dados em múltiplas páginas.

---

## Propósito

**Usar quando:** Navegar entre páginas de uma lista ou conjunto de dados paginado.

**Não usar quando:** A navegação é infinita (scroll infinito) ou carregada sob demanda ("load more").

**Alternativa:** Scroll infinito (`IntersectionObserver`) para feeds contínuos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo UI | `components/ui/pagination.tsx` |
| Arquivo DS | `components/ds/pagination.tsx` |
| Tipo | `registry:ui` (name: `pagination`) + `registry:ds` (name: `pagination`) |
| Categoria | Navegação |
| Depende de | `@/components/ui/button`, `@/components/ui/pagination`, `class-variance-authority`, `lucide-react` (ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon), `@/lib/ui-i18n`, `@/lib/utils` (cn) |

---

## API — Props

### Pagination

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `locale` | `UILocale` | `"en-US"` | Não | Idioma do `aria-label` |

Wrapper `<nav>` com `aria-label` i18n.

### PaginationLink

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `isActive` | `boolean` | — | Não | Marca como página ativa |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"icon"` | Não | Tamanho do botão |
| `rounded` | `"full" \| "light" \| "none"` | `"full"` | Não | Arredondamento do botão |

### PaginationPrevious

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `text` | `string` | `"Previous"` | Não | Texto do link anterior |
| `locale` | `UILocale` | `"en-US"` | Não | Idioma do `aria-label` e texto padrão |
| `rounded` | `"full" \| "light" \| "none"` | `"full"` | Não | Arredondamento do botão |

### PaginationNext

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `text` | `string` | `"Next"` | Não | Texto do link próximo |
| `locale` | `UILocale` | `"en-US"` | Não | Idioma do `aria-label` e texto padrão |
| `rounded` | `"full" \| "light" \| "none"` | `"full"` | Não | Arredondamento do botão |

---

## CVA Variants (DS layer)

| Variant | Prop | Valores | Default |
|---------|------|---------|---------|
| `rounded` | `rounded` | `"full"` → `rounded-4xl`, `"light"` → `rounded-lg`, `"none"` → `rounded-none` | `"full"` |

Aplicado em `PaginationLink`, `PaginationPrevious` e `PaginationNext` via `cn(paginationLinkVariants({ rounded }), className)`.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--primary` / `--primary-foreground` | Botão de página ativa (variant `default`) |
| `--border` / `--muted` | Botão inativo e hover (variant `ghost`) |
| `--ring` / `--ring/30` | Anel de foco |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Página ativa | `isActive=true`, `aria-current="page"`, variant `default` |
| Página inativa | Variant `ghost` |
| Hover | Estilo herdado de `Button` (ghost/default) |
| Ellipsis | Apenas visual, `aria-hidden` |
| Responsivo | Previous/Next exibem texto apenas em `sm:` |
| Locale i18n | `locale` controla `aria-label`, texto Previous/Next e ellipsis "More pages" |
| Rounded variant | `rounded` controla arredondamento dos botões (`full` / `light` / `none`) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Navegação semântica | `<nav role="navigation" aria-label="pagination">` |
| Página ativa | `aria-current="page"` |
| Previous/Next | `aria-label="Go to previous page"` / `"Go to next page"` |
| Ellipsis | `aria-hidden` no ícone, `sr-only` "More pages" |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `CustomText` — Custom Text

## Checklist

- [x] Componente funcional com 7 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `isActive` em `PaginationLink`
- [x] Texto customizável em Previous/Next
- [x] Atributo `data-slot` em todos os sub-componentes
- [x] Navegação semântica com `aria-label`
