# Spec: Spinner UI

> Indicador de carregamento animado com `aria-label` localizado via i18n.

---

## Propósito

Ícone `Loader2` com `animate-spin`, `role="status"` e `aria-label` traduzido conforme o locale. Wrapper leve sobre o componente UI `Spinner` com suporte a i18n.

**Usar quando:** Uma operação assíncrona está em andamento e é necessário feedback visual com acessibilidade localizada.

**Não usar quando:** O carregamento substitui a página inteira (usar Skeleton). A operação leva mais que alguns segundos (combinar com Progress).

**Alternativa:** `Spinner` (shadcn/ui) sem suporte a locale.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/spinner.tsx` |
| Tipo | `registry:ui` (name: `ds-spinner`) |
| Categoria | Feedback / Indicador |
| Depende de | `lucide-react`, `ui-i18n` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | Não | Localização do `aria-label` |
| `className` | `string` | — | Não | Classes adicionais (útil para `size-*` customizado) |
| `...props` | `React.ComponentProps<"svg">` | — | Não | Props nativas SVG |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `currentColor` | Cor do ícone (herdada do container pai) |
| `size-4` (16px) | Tamanho padrão |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | `Loader2Icon` com `animate-spin`, `size-4` |
| **Custom size** | Ajustável via `className` (ex: `size-3`, `size-6`) |
| **Em botão** | Uso inline com `data-icon="inline-start"` |
| **Cor customizada** | Via `text-*` classes (ex: `text-primary`) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role | `role="status"` |
| Rótulo | `aria-label` via `UI_I18N[locale].spinner.loading` |
| Movimento reduzido | `animate-spin` respeita `prefers-reduced-motion` via Tailwind |

---

## Stories obrigatórias

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `Sizes` — Sizes
- [x] `InButton` — In Button
- [x] `CustomColor` — Custom Color

## Checklist

- [x] Componente exporta `Spinner`
- [x] `role="status"` + `aria-label` localizado
- [x] Suporte a locale (en-US, pt-BR, etc.)
- [x] Herda cor via `currentColor`
- [x] Tamanho ajustável via className
