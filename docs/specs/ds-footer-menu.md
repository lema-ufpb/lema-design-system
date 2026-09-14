# Spec: FooterMenu

---

## Propósito

Menu de rodapé responsivo com acordeão em mobile e colunas estáticas em desktop. Grupos de links com suporte a uppercase e tamanhos de fonte.

**Usar quando:** Footer com múltiplas colunas de links que precisam colapsar em mobile.

**Não usar quando:** Footer simples com 1-2 links. Footer sem links (apenas copyright/social).

**Alternativa se não se aplicar:** `footer` com links simples, `Accordion` manual, `nav` nativo.

---

## Localização

| Campo      | Valor                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/footer-menu.tsx`                                                                                                 |
| data-slot  | `footer-menu`                                                                                                                   |
| Tipo       | `registry:component` (name: `footer-menu`)                                                                                      |
| Categoria  | `Navigation`                                                                                                                    |
| Depende de | `ui/accordion` (Accordion, AccordionItem, AccordionTrigger, AccordionContent), `next/link` (Link), `ChevronDown` (lucide-react) |

---

## API — Props

| Prop        | Tipo                   | Padrão    | Obrigatória | Descrição                                    |
| ----------- | ---------------------- | --------- | ----------- | -------------------------------------------- |
| `data`      | `FooterGroupData[]`    | —         | ✓           | Grupos de links do footer                    |
| `upper`     | `boolean`              | `false`   |             | Transforma títulos em uppercase com tracking |
| `locale`    | `UILocale`             | `"en-US"` |             | Localização do aria-label                    |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`    |             | Escala de tipografia dos títulos e links     |
| `className` | `string`               | —         |             | Classes extras                               |

**FooterGroupData:**

| Prop      | Tipo                 | Descrição       |
| --------- | -------------------- | --------------- |
| `title`   | `string`             | Título do grupo |
| `options` | `FooterOptionData[]` | Links do grupo  |

**FooterOptionData:**

| Prop     | Tipo                | Descrição                        |
| -------- | ------------------- | -------------------------------- |
| `name`   | `string`            | Texto do link                    |
| `url`    | `string`            | URL de destino                   |
| `target` | `string` (opcional) | Atributo target (`_blank`, etc.) |

---

## Variantes CVA

| Dimensão             | Valores          | Padrão  |
| -------------------- | ---------------- | ------- |
| `size` (title, link) | `sm`, `md`, `lg` | `md`    |
| `upper` (title)      | `true`, `false`  | `false` |

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

| Token                    | Slot onde é usado                   |
| ------------------------ | ----------------------------------- |
| `text-footer-heading`    | título do grupo                     |
| `text-footer-link`       | links, ícone ChevronDown            |
| `text-footer-link-hover` | link hover                          |
| `bg-accent/50`           | mobile: hover no header do acordeão |
| `ring-primary`           | focus-visible em header e links     |

> **Tokens semânticos:** `--footer-heading`, `--footer-link`, `--footer-link-hover` definidos em `app/globals.css` via `@theme inline`. Por padrão referenciam `--foreground` e `--muted-foreground`, mas consumidores podem sobrescrever apenas as cores do footer sem afetar o restante da UI.

---

## Escala tipográfica e de tamanho

| Slot   | sm                            | md                      | lg                    |
| ------ | ----------------------------- | ----------------------- | --------------------- |
| Título | `text-sm font-medium`         | `text-base font-medium` | `text-lg font-medium` |
| Link   | `text-xs`                     | `text-sm`               | `text-base`           |
| Ícone  | `size-4` (fixo, sem variante) |                         |                       |
| upper  | `tracking-wider uppercase`    |                         |                       |

---

## Comportamentos e estados

| Estado                      | Comportamento esperado                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `data` vazio ou `undefined` | `return null` — componente não renderiza                                                              |
| Mobile (< lg)               | Accordion collapsible via `ui/Accordion`, 1 item por vez                                              |
| Desktop (lg+)               | Colunas estáticas lado a lado, accordion oculto (`lg:hidden` / `lg:flex`)                             |
| Accordion trigger           | `hover:no-underline` (sobrescreve hover:underline do ui/AccordionTrigger). Focus-visible ring-primary |
| Accordion item              | `!border-b-0` — sem bordas entre itens (sobrescreve `not-last:border-b` do ui/AccordionItem)          |
| Link hover                  | Adiciona `hover:underline` + mudança de cor via `text-footer-link-hover`                              |
| Link com target             | Atributo `target` repassado ao `<Link>`                                                               |
| `upper={true}`              | Títulos em `tracking-wider uppercase`                                                                 |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Role semântico | `<nav>` com `aria-label` via `UI_I18N[locale].footerMenu.label`                                                            |
| Accordion      | `ui/Accordion` + `ui/AccordionItem` + `ui/AccordionTrigger` + `ui/AccordionContent` (gerenciam a11y nativamente via Radix) |
| Headers        | `AccordionTrigger` com Header                                                                                              |
| Links mobile   | `[&_a]:no-underline` (sobrescreve `underline` do `AccordionContent` do ui/accordion)                                       |
| Ícone          | `aria-hidden="true"` no ChevronDown                                                                                        |
| Focus          | `focus-visible:ring-2 focus-visible:ring-primary` em headers e links                                                       |
| Desktop        | `lg:pointer-events-none` no header para evitar interação                                                                   |
| i18n           | `UI_I18N[locale].footerMenu.label`                                                                                         |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `Simple` — Simple

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-sm / md=text-base / lg=text-lg` (títulos) e `sm=text-xs / md=text-sm / lg=text-base` (links)
- [x] Todos os tokens são semânticos (`text-footer-heading`, `text-footer-link`, `text-footer-link-hover` com fallback para `foreground`/`muted-foreground`)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading — N/A (sem estado loading)
- [x] `tabular-nums` — N/A
- [x] `truncate` — N/A (links não truncam)
- [x] `aria-label` no `<nav>`
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` integrada via `UI_I18N`
