# Spec: PageLoader

> Overlay de carregamento em tela cheia com duas variantes: barra de progresso e spinner centralizado.

---

## Propósito

**Usar quando:** Uma operação assíncrona bloqueia a interação da página (navegação, submissão de formulário pesado, carregamento inicial de dados críticos).

**Não usar quando:** Apenas uma seção da página está carregando (usar `Skeleton` para o conteúdo específico). A operação é rápida < 300ms (não mostrar nada).

**Alternativa:** `Skeleton` para placeholders de conteúdo parcial, `Spinner` inline para ações em botões.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/page-loader.tsx` |
| Tipo | `registry:component` |
| Categoria | Feedback |
| Depende de | `Spinner` (ui), `cn`, `UI_I18N`, `cva` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `loading` | `boolean` | — | ✓ | Controla visibilidade e `aria-busy` |
| `variant` | `"bar" \| "spinner"` | `"bar"` | | Padrão de UI |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "4xl"` | `"md"` | | Escala (altura da barra, tamanho do spinner/fonte) |
| `color` | `"primary" \| "success" \| "destructive"` | `"primary"` | | Cor semântica da barra/spinner |
| `overlay` | `"ghost" \| "soft" \| "subtle" \| "solid" \| "none"` | `"soft"` | | Intensidade do fundo bloqueante |
| `blur` | `boolean` | `false` | | Frosted glass (`backdrop-blur-xs`) |
| `message` | `string` | — | | Texto exibido abaixo do spinner; usa i18n se omitido |
| `locale` | `UILocale` | `"en-US"` | | Locale para string de carregamento |
| `className` | `string` | — | | Classes extras no overlay |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `overlay` | `ghost`, `soft`, `subtle`, `solid`, `none` | `soft` |
| `blur` | `true`, `false` | `false` |
| `size` (bar track) | `sm`, `md`, `lg`, `xl`, `2xl`, `4xl` | `md` |
| `size` (spinner) | `sm`, `md`, `lg`, `xl`, `2xl`, `4xl` | `md` |
| `size` (message) | `sm`, `md`, `lg`, `xl`, `2xl`, `4xl` | `md` |
| `color` (bar fill) | `primary`, `success`, `destructive` | `primary` |
| `color` (spinner) | `primary`, `success`, `destructive` | `primary` |

**Slots exportados:**

- `pageLoaderOverlayVariants` — `fixed inset-0 z-50`, controla bg e blur
- `pageLoaderBarTrackVariants` — altura da track (`h-0.5` … `h-1.5`)
- `pageLoaderBarFillVariants` — barra sólida de cor semântica com `animate-loader-fill`
- `pageLoaderSpinnerSizeVariants` — tamanho do ícone spinner
- `pageLoaderSpinnerColorVariants` — cor do ícone spinner
- `pageLoaderMessageVariants` — fonte da mensagem abaixo do spinner

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `bg-background/25` | overlay ghost |
| `bg-background/50` | overlay soft |
| `bg-background/80` | overlay subtle |
| `bg-background/95` | overlay solid |
| `bg-primary` / `bg-success` / `bg-destructive` | barra sólida |
| `text-primary` / `text-success` / `text-destructive` | cor do spinner |
| `text-muted-foreground` | texto de mensagem |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| `loading={true}` | `opacity-100 pointer-events-auto`, `aria-busy=true` |
| `loading={false}` | `opacity-0 pointer-events-none`, `aria-busy=false` — fade-out suave |
| `variant="bar"` | Barra no topo com `animate-loader-fill` (expande da esquerda para direita) |
| `variant="spinner"` | Spinner `size-10` centralizado + mensagem abaixo |
| `blur={true}` | `backdrop-blur-sm` no overlay |
| `overlay="none"` | Sem fundo bloqueante (só a barra/spinner visível) |

---

## Animação

`@keyframes loader-fill` definida em `app/globals.css` via `@theme`:
- 0%: `transform: scaleX(0)`
- 50%: `transform: scaleX(1)`
- 100%: `transform: scaleX(0)`
- `transform-origin: left`
- Duração: 2s ease-in-out infinite

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role | `role="status"` no wrapper |
| Estado | `aria-busy={loading}` |
| Rótulo | `aria-label={t.loading}` (i18n) |
| Live region | `aria-live="polite"` |
| Conteúdo visual | `aria-hidden` na barra e spinner (rótulo no wrapper) |

---

## i18n

Chave: `UI_I18N[locale].pageLoader.loading`

| Locale | Valor |
|--------|-------|
| en-US | "Loading…" |
| pt-BR | "Carregando…" |
| es-ES | "Cargando…" |
| fr-FR | "Chargement…" |

---

## Stories obrigatórias no Storybook

- [x] `Default` — bar variant, interactive (auto-stop em 3s)
- [x] `SpinnerVariant` — spinner variant, interactive
- [x] `SpinnerWithMessage` — spinner com message customizada
- [x] `WithBlur` — bar com frosted glass overlay
- [x] `SolidOverlay` — spinner com overlay solid
- [x] `GhostOverlay` — bar com overlay ghost (25%)
- [x] `SoftOverlay` — spinner com overlay soft (50%)
- [x] `ColorSuccess` — bar cor success
- [x] `ColorDestructive` — spinner cor destructive com mensagem de erro
- [x] `LocalePTBR` — spinner locale pt-BR
- [x] `NotLoading` — loading=false (overlay invisível)

## Checklist

- [x] Escala tipográfica segue `text-sm font-medium` para mensagem
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Sem `animate-pulse` em divs custom (usa `animate-loader-fill` customizado)
- [x] `aria-label` no wrapper via i18n
- [x] `cn()` para todas as classes condicionais
- [x] Sem `dark:` manual — tokens semânticos
- [x] Spacing usa apenas steps Tailwind
- [x] `pointer-events-none` quando `loading=false`
- [x] Transição suave `transition-opacity duration-300`
