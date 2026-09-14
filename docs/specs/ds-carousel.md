# Spec: Carousel (DS)

> Carrossel/slider de alto nível sobre Embla Carousel com variantes visuais, autoplay, dots de navegação, carregamento skeleton e i18n.

---

## Propósito

Wrapper do `ui/carousel` (shadcn/Embla) que adiciona variantes visuais (`default`, `cards`, `showcase`, `minimal`), dots de navegação com `aria-label` i18n, autoplay configurável, `slidesPerView` responsivo, botões de navegação customizáveis e estado de carregamento com skeleton.

**Usar quando:** Galerias de imagens, listas de cards horizontais, depoimentos em rotação, showcases de produtos com navegação rica.

**Não usar quando:** Necessário controle total sobre o Embla raw (usar `ui/carousel` diretamente). Conteúdo crítico que precisa estar visível sem interação.

**Alternativa se não se aplicar:** `ui/carousel` para controle granular, `Tabs` para alternância entre visões.

---

## Localização

| Campo      | Valor                                                                                                                                                                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/carousel.tsx`                                                                                                                                                                                                                        |
| data-slot  | `ds-carousel`                                                                                                                                                                                                                                       |
| Tipo       | `registry:component`                                                                                                                                                                                                                                |
| Categoria  | Layout / Slider                                                                                                                                                                                                                                     |
| Depende de | `ui/carousel` (CarouselRoot, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel), `embla-carousel-autoplay`, `Skeleton` (shadcn), `lucide-react` (ChevronLeftIcon, ChevronRightIcon), `class-variance-authority`, `ui-i18n` |

---

## API — Props

| Prop                | Tipo                                               | Padrão         | Obrigatória | Descrição                                  |
| ------------------- | -------------------------------------------------- | -------------- | ----------- | ------------------------------------------ |
| `variant`           | `"default" \| "cards" \| "showcase" \| "minimal"`  | `"default"`    |             | Variante visual do carrossel               |
| `orientation`       | `"horizontal" \| "vertical"`                       | `"horizontal"` |             | Direção do scroll                          |
| `setApi`            | `(api: CarouselApi) => void`                       | —              |             | Callback para acessar API do Embla         |
| `slidesPerView`     | `number \| { sm?, md?, lg? }`                      | —              |             | Slides visíveis por breakpoint             |
| `autoplayInterval`  | `number`                                           | —              |             | Intervalo em ms para autoplay (0 desliga)  |
| `pauseOnHover`      | `boolean`                                          | `true`         |             | Pausa autoplay no hover                    |
| `showDots`          | `boolean`                                          | `true`         |             | Exibe dots de navegação                    |
| `showProgress`      | `boolean`                                          | `false`        |             | Exibe barra de progresso do autoplay       |
| `loading`           | `boolean`                                          | `false`        |             | Estado de carregamento com skeleton        |
| `loadingSlideCount` | `number`                                           | `4`            |             | Nº de slides skeleton                      |
| `locale`            | `UILocale`                                         | `"pt-BR"`      |             | Locale para i18n (`carousel.*`)            |
| `navVariant`        | `"outline" \| "ghost" \| "primary" \| "secondary"` | `"outline"`    |             | Variante dos botões de navegação           |
| `navSize`           | `"icon-sm" \| "icon" \| "icon-lg"`                 | `"icon-sm"`    |             | Tamanho dos botões de navegação            |
| `navPosition`       | `"side" \| "overlay" \| "bottom" \| "none"`        | —              |             | Posição da navegação (default por variant) |
| `dotVariant`        | `"filled" \| "outline"`                            | `"filled"`     |             | Estilo visual dos dots                     |
| `dotPosition`       | `"bottom" \| "overlay"`                            | `"bottom"`     |             | Posição dos dots                           |
| `loop`              | `boolean`                                          | `false`        |             | Loop infinito                              |
| `align`             | `"start" \| "center" \| "end"`                     | `"start"`      |             | Alinhamento dos slides                     |
| `skipSnaps`         | `boolean`                                          | `false`        |             | Pula snaps intermediários no scroll        |
| `className`         | `string`                                           | —              |             | Classes adicionais                         |
| `children`          | `React.ReactNode`                                  | —              | ✓           | Slides (`CarouselItem`)                    |

---

## Variantes CVA

| Dimensão  | Valores                                   | Padrão    |
| --------- | ----------------------------------------- | --------- |
| `variant` | `default`, `cards`, `showcase`, `minimal` | `default` |

**Slots do componente:**

- `carouselVariants` — container principal (padding, gap, rounded)

---

## Tokens de design utilizados

| Token                     | Slot onde é usado                               |
| ------------------------- | ----------------------------------------------- |
| `bg-card`                 | fundo do carrossel (variante cards)             |
| `border-border`           | borda entre slides (variante cards)             |
| `shadow-sm`               | sombra dos slides (variante showcase)           |
| `bg-primary`              | dot ativo (filled), seta de navegação (primary) |
| `bg-muted-foreground/30`  | dot inativo (filled)                            |
| `border-primary`          | dot ativo (outline)                             |
| `bg-muted`                | skeleton placeholder                            |
| `text-primary-foreground` | seta de navegação (primary)                     |
| `ring-ring`               | focus-visible dos dots e botões                 |
| Tokens do `ui/button`     | botões Previous/Next (delegado)                 |

---

## Comportamentos e estados

| Estado                      | Comportamento esperado                                                       |
| --------------------------- | ---------------------------------------------------------------------------- |
| `loading={true}`            | Skeleton com slides simulados (`loadingSlideCount`)                          |
| `variant="cards"`           | Slides com fundo `bg-card`, borda, padding e gap; navegação lateral          |
| `variant="showcase"`        | Slides com `shadow-sm`, navegação `overlay` (sobre o slide)                  |
| `variant="minimal"`         | Sem navegação (`navPosition="none"`), apenas dots                            |
| `autoplayInterval` definido | Plugin Autoplay do Embla ativado; `pauseOnHover` controla `stopOnMouseEnter` |
| `showProgress=true`         | Barra de progresso animada sincronizada com autoplay                         |
| `showDots=true`             | Dots de navegação com `role="tablist"` e `aria-label` i18n                   |
| `slidesPerView` responsivo  | Objeto `{ sm, md, lg }` define `basis` via breakpoints                       |
| `loop=true`                 | Scroll contínuo (Embla `loop` option)                                        |
| Navegação lateral           | Botões Previous/Next posicionados `absolute` com `-translate-y-1/2`          |
| `navPosition="overlay"`     | Botões sobrepostos ao slide com `z-10` e gaps ajustados                      |
| `navPosition="bottom"`      | Botões centralizados abaixo do carrossel                                     |
| `navPosition="none"`        | Botões ocultos                                                               |

---

## Acessibilidade

| Requisito           | Implementação                                                             |
| ------------------- | ------------------------------------------------------------------------- |
| Dots de navegação   | `role="tablist"` no container, `role="tab"` + `aria-selected` em cada dot |
| Rótulo dos dots     | `aria-label` via `UI_I18N[locale].carousel.goToSlide`                     |
| Teclado             | Navegação por setas via Embla (`onKeyDownCapture`)                        |
| Botões de navegação | `aria-label` via `UI_I18N[locale].carousel.previous` / `.next`            |
| i18n                | `UI_I18N[locale].carousel.goToSlide`, `.previous`, `.next`                |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Cards` — Cards
- [x] `Showcase` — Showcase
- [x] `Minimal` — Minimal
- [x] `Vertical` — Vertical
- [x] `Autoplay` — Autoplay
- [x] `ResponsiveSlides` — Responsive Slides
- [x] `WithDots` — With Dots
- [x] `Loop` — Loop
- [x] `LocalePTBR` — Locale PTBR
- [x] `Loading` — Loading
- [x] `NavPositions` — Nav Positions

## Checklist antes de implementar

- [x] Variantes visuais: default, cards, showcase, minimal
- [x] Dots de navegação com i18n
- [x] Autoplay com plugin Embla
- [x] slidesPerView responsivo (sm/md/lg)
- [x] Loading skeleton
- [x] Locale integrado via `UI_I18N`
