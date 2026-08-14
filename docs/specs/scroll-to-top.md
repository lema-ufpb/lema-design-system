# Spec: ScrollToTop

---

## Propósito

Botão flutuante que revela um anel de progresso de rolagem e permite ao usuário voltar ao topo da página com um clique. A visibilidade é inteligente — aparece apenas ao rolar para **cima** após ultrapassar um limiar configurável e desaparece ao rolar para baixo.

**Usar quando:** Páginas longas onde o usuário precisa voltar ao topo rapidamente.
**Não usar quando:** Páginas curtas (viewport única). Scroll horizontal.
**Alternativa se não se aplicar:** Navegação nativa (Home/ End), âncoras manuais.

---

## Localização

| Campo      | Valor                                                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/scroll-to-top.tsx`                                                                                                             |
| data-slot  | N/A (usa `role="complementary"` + `aria-label`)                                                                                               |
| Tipo       | `registry:ui`                                                                                                                                 |
| Categoria  | `Navigation`                                                                                                                                  |
| Depende de | `lucide-react` (ArrowUp), `ui/tooltip` (Tooltip, TooltipTrigger, TooltipContent, TooltipProvider), `ui/skeleton` (Skeleton), `UI_I18N` (i18n) |

---

## API — Props

| Prop           | Tipo                                                           | Padrão           | Obrigatória | Descrição                                       |
| -------------- | -------------------------------------------------------------- | ---------------- | ----------- | ----------------------------------------------- |
| `threshold`    | `number`                                                       | `400`            | Não         | Pixels rolados antes do botão poder aparecer    |
| `showProgress` | `boolean`                                                      | `true`           | Não         | Exibe o anel SVG de progresso ao redor do botão |
| `variant`      | `"outline" \| "fill"`                                          | `"outline"`      | Não         | Estilo visual do botão                          |
| `locale`       | `UILocale`                                                     | `"en-US"`        | Não         | Localização do tooltip e aria-label             |
| `loading`      | `boolean`                                                      | `false`          | Não         | Exibe Skeleton placeholder                      |
| `position`     | `"bottom-right" \| "bottom-left" \| "top-right" \| "top-left"` | `"bottom-right"` | Não         | Posição fixa na tela                            |
| `className`    | `string`                                                       | —                | Não         | Classes extras                                  |

Estende `Omit<HTMLAttributes<HTMLDivElement>, "children">` + `VariantProps<typeof scrollToTopVariants>`.

---

## Variantes CVA

### scrollToTopVariants (container)

| Dimensão   | Valores                                                | Padrão         |
| ---------- | ------------------------------------------------------ | -------------- |
| `position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` |

---

## Tokens de design utilizados

| Token                                    | Slot onde é usado                       |
| ---------------------------------------- | --------------------------------------- |
| `--secondary` / `--secondary-foreground` | Fundo e texto do botão                  |
| `text-muted/20`                          | Track do anel de progresso (background) |
| `text-primary`                           | Arco de progresso (fill)                |
| `shadow-lg` / `shadow-xl`                | Sombra do botão (hover escala)          |
| `--ring`                                 | Focus-visible ring                      |
| `--foreground` / `--background`          | Tooltip bg/text                         |

---

## Comportamentos e estados

| Estado                               | Comportamento esperado                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| **Scroll down (qualquer distância)** | Botão oculto (`opacity-0 pointer-events-none translate-y-3`)                           |
| **Scroll up + pageY > threshold**    | Botão visível (`opacity-100 translate-y-0`) com transição de 400ms                     |
| **Clique**                           | `window.scrollTo({ top: 0, behavior: "smooth" })`                                      |
| **Hover**                            | `scale-110` + `shadow-xl` — micro-interação de elevação                                |
| **Active (pressionado)**             | `scale-95` — resposta tátil                                                            |
| **Progress ring**                    | SVG com `stroke-dasharray`/`stroke-dashoffset`, atualizado via `requestAnimationFrame` |
| **loading={true}**                   | `<Skeleton className="size-11 rounded-full" />`                                        |
| **Não montado (SSR)**                | `return null` — guard `useSyncExternalStore`                                           |

---

## Acessibilidade

| Requisito          | Implementação                                                                    |
| ------------------ | -------------------------------------------------------------------------------- |
| Role semântico     | `role="complementary"` no container                                              |
| Rótulo             | `aria-label` no container via `UI_I18N[locale].scrollToTop.label`                |
| Tooltip            | `aria-label` no botão + TooltipContent via `UI_I18N[locale].scrollToTop.tooltip` |
| Teclado            | Navegação por Tab + Enter/Espaço para ativar                                     |
| Foco               | `focus-visible:ring-2 focus-visible:ring-ring`                                   |
| Movimento reduzido | `motion-reduce:transition-none` no anel SVG                                      |
| i18n               | `UI_I18N[locale].scrollToTop.*` nos 4 locales                                    |

---

## Stories obrigatórias no Storybook

- [x] `Default` — padrão com progress ring + scroll container
- [x] `WithoutRing` — showProgress=false
- [x] `HighThreshold` — threshold=1200
- [x] `LowThreshold` — threshold=50
- [x] `PositionTopLeft` — top-left
- [x] `PositionBottomLeft` — bottom-left
- [x] `PositionTopRight` — top-right
- [x] `Loading` — skeleton
- [x] `LocalePTBR` — pt-BR
- [x] `LocaleES` — es-ES
- [x] `LocaleFR` — fr-FR

## Checklist antes de implementar

- [x] Escala tipográfica — N/A (usa ícone lucide ArrowUp)
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em todos `cva()`
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` do shadcn
- [x] `tabular-nums` — N/A
- [x] `truncate` — N/A
- [x] `aria-label` no container + tooltip no botão
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] i18n via `UI_I18N[locale].scrollToTop.*`
- [x] `useSyncExternalStore` para mounted guard (evita `set-state-in-effect`)
- [x] `requestAnimationFrame` throttling no scroll listener
