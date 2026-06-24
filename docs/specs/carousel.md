# Spec: Carousel

> Um carrossel/slider rolável para navegação horizontal ou vertical através de elementos.

---

## Propósito

O Carousel é um componente de navegação por slides construído sobre a biblioteca Embla Carousel. Composto por `Carousel` (provider de contexto com estado de scroll), `CarouselContent` (track rolável), `CarouselItem` (slide individual), `CarouselPrevious` e `CarouselNext` (botões de navegação). Suporta orientação `horizontal` (padrão) e `vertical`. Aceita `opts` e `plugins` do Embla para configuração avançada (loop, alinhamento, drag free, etc.) e `setApi` para acesso externo à API do Embla. A navegação por teclado (setas) é nativa via `onKeyDownCapture`. Os botões de navegação são wrappers do componente `Button` com `variant="outline"` e `size="icon-sm"` por padrão, posicionados nas laterais externas ao carrossel.

**Usar quando:** Galerias de imagens, listas de cards horizontais, depoimentos em rotação, dashboards com múltiplos painéis navegáveis, showcases de produtos.

**Não usar quando:** O conteúdo deve ser todo visível simultaneamente (usar grid/flex). Para navegação por tabs entre visões, usar `Tabs`. Evitar para conteúdo crítico que precisa estar visível sem interação (ex: avisos).

**Alternativa se não se aplicar:** `Tabs` para alternância entre visões, `ScrollArea` para scroll livre, `flex overflow-x-auto` para scroll simples.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/carousel.tsx` |
| Tipo | `registry:ui` (name: `carousel`) |
| Categoria | Layout / Slider |
| Depende de | `button` |

---

## API — Props

### Carousel
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Não | Direção do scroll |
| `opts` | `CarouselOptions` (Embla) | — | Não | Opções do Embla (loop, align, dragFree, etc.) |
| `plugins` | `CarouselPlugin[]` | — | Não | Plugins do Embla |
| `setApi` | `(api: CarouselApi) => void` | — | Não | Callback para acessar API do Embla |
| `className` | `string` | — | Não | Classes adicionais |

### CarouselItem
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Largura responsiva do slide |

### CarouselPrevious / CarouselNext
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | Variantes do Button | `"outline"` | Não | Variante do botão |
| `size` | Tamanhos do Button | `"icon-sm"` | Não | Tamanho do botão |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| *(delega para Button)* | Botões Previous/Next usam tokens do Button (`--primary`, `--border`, `--ring`, etc.) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Horizontal | Slides em linha com `-ml-4` (gap via padding); botões laterais |
| Vertical | Slides em coluna com `-mt-4`; botões superior/inferior (rotacionados 90°) |
| Primeiro slide | Botão Previous desabilitado (`canScrollPrev = false`) |
| Último slide | Botão Next desabilitado (`canScrollNext = false`) |
| Navegação por teclado | `ArrowLeft`/`ArrowRight` (horizontal) |
| Slide responsivo | `basis-full` por padrão; customizável via className (ex: `md:basis-1/2`) |
| Loop | Configurado via `opts={{ loop: true }}` |
| Posição do botão | `absolute` nas laterais externas com `-translate-y-1/2` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA region | `role="region"` com `aria-roledescription="carousel"` |
| ARIA slide | `role="group"` com `aria-roledescription="slide"` |
| Navegação por teclado | `ArrowLeft`/`ArrowRight` via `onKeyDownCapture` |
| Botões com sr-only | `Previous slide` / `Next slide` como texto `sr-only` |
| Desabilitado | Botões desabilitados quando não há scroll disponível |
| Touch/mouse drag | Navegação por arrasto nativa do Embla |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Carrossel horizontal com slides 1/2 md e 1/3 lg
- [x] `SingleSlide` — Um slide inteiro por vez
- [x] `Vertical` — Carrossel vertical com altura fixa
- [x] `WithCustomOpts` — Loop infinito com alinhamento start

---

## Checklist antes de implementar

- [x] Context API — `CarouselContext` com `useCarousel()` hook
- [x] Orientação — Eixo `x` (horizontal) ou `y` (vertical) no Embla
- [x] Botões — Posicionamento absoluto com `-translate-y-1/2` (horizontal)
- [x] Gap entre slides — Padding `pl-4` (horizontal) / `pt-4` (vertical) com margem negativa no content
- [x] Keyboard — `ArrowLeft`/`ArrowRight` via `onKeyDownCapture`
- [x] API pública — `setApi` para acesso externo, tipagem exportada `CarouselApi`
