# Spec: FooterMenu

---

## Propósito

Menu de rodapé responsivo com acordeão em mobile e colunas estáticas em desktop. Grupos de links com suporte a uppercase e tamanhos de fonte.

**Usar quando:** Footer com múltiplas colunas de links que precisam colapsar em mobile.

**Não usar quando:** Footer simples com 1-2 links. Footer sem links (apenas copyright/social).

**Alternativa se não se aplicar:** `footer` com links simples, `Accordion` manual, `nav` nativo.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/footer-menu.tsx` |
| Tipo | `registry:component` (name: `footer-menu`) |
| Categoria | `Navigation` |
| Depende de | `@radix-ui/react-accordion` (AccordionPrimitive), `next/link` (Link), `ChevronDown` (lucide-react) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `data` | `FooterGroupData[]` | — | ✓ | Grupos de links do footer |
| `upper` | `boolean` | `false` | | Transforma títulos em uppercase com tracking |
| `locale` | `UILocale` | `"en-US"` | | Localização do aria-label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Escala de tipografia dos títulos e links |
| `className` | `string` | — | | Classes extras |

**FooterGroupData:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título do grupo |
| `options` | `FooterOptionData[]` | Links do grupo |

**FooterOptionData:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `name` | `string` | Texto do link |
| `url` | `string` | URL de destino |
| `target` | `string` (opcional) | Atributo target (`_blank`, etc.) |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` (title, link) | `sm`, `md`, `lg` | `md` |
| `upper` (title) | `true`, `false` | `false` |

**Slots:**

- `footerMenuVariants` — container `<nav>` flex
- `footerGroupVariants` — grupo individual
- `footerHeaderVariants` — header do acordeão (mobile)
- `footerTitleVariants` — texto do título (size + upper)
- `footerContentVariants` — lista de links
- `footerLinkVariants` — link individual (size)
- `footerNavIconVariants` — ícone ChevronDown no acordeão

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-foreground` | título do grupo |
| `text-muted-foreground` | links, ícone ChevronDown |
| `hover:text-primary` | link hover |
| `bg-accent/50` | mobile: hover no header do acordeão |
| `ring-primary` | focus-visible em header e links |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Título | `text-sm font-medium` | `text-base font-medium` | `text-lg font-medium` |
| Link | `text-xs` | `text-sm` | `text-base` |
| Ícone | `size-4` (fixo, sem variante) | | |
| upper | `tracking-wider uppercase` | | |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `data` vazio ou `undefined` | `return null` — componente não renderiza |
| Mobile (< lg) | Accordion collapsible, 1 item por vez |
| Desktop (lg+) | Colunas estáticas lado a lado, accordion oculto (`lg:hidden` / `lg:flex`) |
| Accordion trigger | Focus-visible ring-primary |
| Link com target | Atributo `target` repassado ao `<Link>` |
| `upper={true}` | Títulos em `tracking-wider uppercase` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<nav>` com `aria-label` via `UI_I18N[locale].footerMenu.label` |
| Accordion | Radix AccordionPrimitive (gerencia a11y nativamente) |
| Headers | `AccordionPrimitive.Header` com Trigger |
| Ícone | `aria-hidden="true"` no ChevronDown |
| Focus | `focus-visible:ring-2 focus-visible:ring-primary` em headers e links |
| Desktop | `lg:pointer-events-none` no header para evitar interação |
| i18n | `UI_I18N[locale].footerMenu.label` |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — 4 grupos com vários links cada
- [ ] `AllSizes` — sm, md, lg
- [ ] `Uppercase` — `upper={true}`
- [ ] `SingleGroup` — apenas 1 grupo
- [ ] `EmptyData` — `data={[]}`
- [ ] `Mobile` — viewport < lg
- [ ] `Desktop` — viewport >= lg
- [ ] `WithExternalLinks` — links com `target="_blank"`

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-sm / md=text-base / lg=text-lg` (títulos) e `sm=text-xs / md=text-sm / lg=text-base` (links)
- [x] Todos os tokens são semânticos (sem raw Tailwind)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [ ] Loading — N/A (sem estado loading)
- [ ] `tabular-nums` — N/A
- [ ] `truncate` — N/A (links não truncam)
- [x] `aria-label` no `<nav>`
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` integrada via `UI_I18N`
