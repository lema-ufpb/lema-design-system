# Spec: Button

> Um controle de botão interativo usado para disparar ações, enviar formulários ou navegar.

---

## Propósito

O Button é o componente de ação primária do design system LEMA, construído com CVA para gerenciar 6 variantes visuais (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`) e 8 tamanhos (4 textuais + 4 icon-only). Inclui suporte a ícones posicionados via `data-icon` (inline-start/inline-end), estado de carregamento com `Loader2Icon` animado, estado desabilitado com `opacity-50` e `pointer-events-none`, e animação de clique com `translate-y-px` no `active`. O `asChild` permite renderizar como qualquer elemento (links Next.js, botões de formulário) via `Slot.Root` da Radix UI. O tamanho icon-only (`icon`, `icon-xs`, `icon-sm`, `icon-lg`) garante largura = altura para layout quadrado perfeito.

**Usar quando:** Qualquer ação do usuário: submit de formulários, navegação, disparo de modais, ações em tabelas, toolbars. O Button é o componente mais versátil e onipresente do sistema.

**Não usar quando:** A ação é um link de navegação comum sem importância primária (usar `BreadcrumbLink` ou Link do Next.js diretamente). Para ações de toggle on/off, usar `Toggle`. Para agrupamento de ações relacionadas, usar `ButtonGroup`.

**Alternativa se não se aplicar:** `Badge` com `asChild` para links decorativos, `Toggle` para estados binários, `ButtonGroup` para agrupamento visual.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ui/button.tsx`     |
| Tipo       | `registry:ui` (name: `button`) |
| Categoria  | Core / Action                  |
| Depende de | Nenhuma                        |

---

## API — Props

| Prop        | Tipo                                                                                 | Padrão      | Obrigatória | Descrição                              |
| ----------- | ------------------------------------------------------------------------------------ | ----------- | ----------- | -------------------------------------- |
| `variant`   | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"`        | `"default"` | Não         | Estilo visual do botão                 |
| `size`      | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | Não         | Tamanho e padding                      |
| `asChild`   | `boolean`                                                                            | `false`     | Não         | Renderiza como elemento filho via Slot |
| `disabled`  | `boolean`                                                                            | —           | Não         | Estado desabilitado                    |
| `className` | `string`                                                                             | —           | Não         | Classes adicionais                     |

---

## Tokens de design utilizados

| Token                                   | Slot onde é usado                         |
| --------------------------------------- | ----------------------------------------- |
| `--primary`                             | Fundo da variante default                 |
| `--primary-foreground`                  | Texto da variante default                 |
| `--secondary`                           | Fundo da variante secondary               |
| `--secondary-foreground`                | Texto da variante secondary               |
| `--border`                              | Borda da variante outline                 |
| `--background`                          | Fundo da variante outline                 |
| `--muted`                               | Hover da variante outline/ghost           |
| `--destructive`                         | Texto/borda da variante destructive       |
| `--destructive/10` / `--destructive/20` | Fundo translúcido da variante destructive |
| `--ring` / `--ring/30`                  | Focus ring (`focus-visible:ring-3`)       |
| `--input/30`                            | Hover da variante outline em dark mode    |

---

## Comportamentos e estados

| Estado          | Comportamento esperado                                                         |
| --------------- | ------------------------------------------------------------------------------ |
| Default         | Fundo `bg-primary`, texto `text-primary-foreground`, hover `bg-primary/80`     |
| Outline         | Borda `border-border`, fundo `bg-background`, hover `bg-muted`                 |
| Secondary       | Fundo `bg-secondary`, hover `bg-secondary/80`                                  |
| Ghost           | Fundo transparente, hover `bg-muted`                                           |
| Destructive     | Fundo `bg-destructive/10`, texto `text-destructive`, hover `bg-destructive/20` |
| Link            | Texto `text-primary` com `underline-offset-4` e `hover:underline`              |
| Disabled        | `opacity-50`, `pointer-events-none`                                            |
| Active (clique) | `translate-y-px` (exceto em `aria-haspopup`)                                   |
| Focus visible   | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30`    |
| Aria-expanded   | Outline/ghost/secondary alteram fundo quando expandido                         |
| Tamanho xs      | `h-6 gap-1 px-2.5 text-xs`                                                     |
| Tamanho sm      | `h-8 gap-1 px-3`                                                               |
| Tamanho default | `h-9 gap-1.5 px-3`                                                             |
| Tamanho lg      | `h-10 gap-1.5 px-4`                                                            |
| Tamanho icon-xs | `size-6`                                                                       |
| Tamanho icon-sm | `size-8`                                                                       |
| Tamanho icon    | `size-9`                                                                       |
| Tamanho icon-lg | `size-10`                                                                      |

---

## Acessibilidade

| Requisito     | Implementação                                                               |
| ------------- | --------------------------------------------------------------------------- |
| Role button   | Nativo do elemento `<button>`                                               |
| Focus visible | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30` |
| Desabilitado  | `disabled` nativo com estilos de `opacity-50`                               |
| asChild       | Permite `<a>` com `role="button"` quando necessário                         |
| Ícones        | `pointer-events-none` nos SVGs                                              |
| Aria-invalid  | Suporte com borda e ring destrutivos                                        |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Botão primary com label "Button"
- [x] `Variants` — Todas as 6 variantes lado a lado
- [x] `Sizes` — Tamanhos xs, sm, default, lg comparados
- [x] `IconSizes` — Botões icon-only em outline
- [x] `Icons` — Botões com ícone inline-start e inline-end
- [x] `Disabled` — Estado disabled em 3 variantes
- [x] `Loading` — Estado loading com spinner animado
- [x] `AsChild` — Botão renderizado como âncora `<a>`

---

## Checklist antes de implementar

- [x] Escala tipográfica — `text-sm` (default), `text-xs` (xs size)
- [x] Tokens semânticos — `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `border`, `background`, `muted`, `destructive`, `ring`
- [x] Borda arredondada — `rounded-4xl` para formato pill
- [x] Ícones — `size-4` (default), `size-3` (xs/icon-xs) via `[&_svg:not([class*='size-'])]`
- [x] Padding automático — `has-data-[icon=inline-start]:pl-2.5` e similar
- [x] Active state — `active:not-aria-haspopup:translate-y-px`
