# Spec: StepProgress

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Wizard de progresso multi-etapa com orientação horizontal ou vertical. Cada etapa exibe status (completa/atual/futura) com círculo numerado, ícone opcional, título, descrição e conector animado.

**Usar quando:** formulários multi-etapa, checklists, onboarding  
**Não usar quando:** progresso linear simples (usar `ProgressBar`)  
**Alternativa se não se aplicar:** `ProgressBar` para barra única

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/step-progress.tsx` |
| data-slot | `step-progress` |
| Tipo | `registry:component` |
| Categoria | `Navigation` |
| Depende de | Nenhum primitivo shadcn (CSS puro + CVA + Lucide Check) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `steps` | `StepItem[]` | — | ✓ | Array de etapas |
| `currentStepId` | `string` | — | ✓ | ID da etapa atual |
| `onStepClick` | `(id: string) => void` | — | | Habilita navegação por clique |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | | Direção do layout |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho dos círculos |
| `locale` | `UILocale` | `"en-US"` | | Locale para aria-label |
| `className` | `string` | — | | Classes extras |

Tipos auxiliares:

```ts
interface StepItem {
  id: string
  title: string
  description?: string
  icon?: ReactNode  // ícone customizado substitui o número/check
}
```

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `orientation` | `horizontal`, `vertical` | `horizontal` |
| `status` | `complete`, `current`, `upcoming` | `upcoming` |
| `size` | `sm`, `md`, `lg` | `md` |

**Slots do componente:**

- `stepProgressVariants` — container `<ol>` (orientation)
- `stepCircleVariants` — círculo do step (status, size)
- `stepConnectorVariants` — linha conectora (orientation, status)
- `stepTitleVariants` — título do step (orientation, status)
- `stepDescriptionVariants` — descrição do step (orientation)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-primary` | Círculo complete, conector complete |
| `bg-background` | Círculo current e upcoming |
| `bg-border` | Conector upcoming |
| `text-primary` | Círculo current (número/ícone) |
| `text-primary-foreground` | Círculo complete (check) |
| `text-foreground` | Título complete |
| `text-muted-foreground` | Título upcoming, descrição |
| `border-border` | Círculo upcoming |
| `border-primary` | Círculo complete e current |
| `ring-ring` | Focus-visible ring |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Círculo | `h-7 w-7 text-xs` | `h-9 w-9 text-sm` | `h-11 w-11 text-base` |
| Check/ícone | `size-3` | `size-4` | `size-5` |
| Conector horizontal padding top | `pt-3.5` | `pt-4.5` | `pt-5.5` |
| Conector vertical margin left | `ml-3.5` | `ml-4.5` | `ml-5.5` |
| Título horizontal | `mt-3 max-w-[110px] text-center text-xs font-semibold` | `mt-3 max-w-[110px] text-center text-xs font-semibold` | `mt-3 max-w-[110px] text-center text-xs font-semibold` |
| Título vertical | `ml-4 pt-1 text-start text-sm font-semibold` | `ml-4 pt-1 text-start text-sm font-semibold` | `ml-4 pt-1 text-start text-sm font-semibold` |

> Nota: título horizontal é `text-xs` independente de `size` (fixo para caber no layout horizontal compacto).

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `status="complete"` | Círculo `bg-primary` com `text-primary-foreground`, ícone Check, conector `bg-primary`, título `text-foreground` |
| `status="current"` | Círculo `border-primary bg-background` com `text-primary`, `animate-pulse`, conector gradiente primary→border, título `text-primary` |
| `status="upcoming"` | Círculo `border-border bg-background` com `text-muted-foreground`, conector `bg-border`, título `text-muted-foreground` |
| `steps` vazio | Retorna `null` |
| `onStepClick` definido | Etapas viram `<button>` com `cursor-pointer`, foco visível |
| `icon` no StepItem | Substitui o número/check no círculo |
| Número (fallback) | `tabular-nums {index + 1}` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<ol>` com `aria-label` via `UI_I18N[locale].stepProgress.label` |
| Etapa atual | `aria-current="step"` no elemento da etapa atual |
| Conector horizontal | `<li role="presentation" aria-hidden="true">` |
| Conector vertical | `<span aria-hidden="true">` |
| Interatividade | `type="button"` em etapas clicáveis, `focus-visible:ring-2` |
| i18n | `UI_I18N[locale].stepProgress.label` no `<ol>` |

---

## Stories obrigatórias no Storybook

- [x] `Horizontal` — Horizontal
- [x] `Vertical` — Vertical
- [x] `Interactive` — Interactive
- [x] `LocalePTBR` — Locale PTBR
- [x] `Sizes` — Sizes

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base` (parcialmente; título horizontal é `text-xs` fixo)
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas — N/A (sem loading state)
- [x] `tabular-nums` em todos os valores numéricos (índice do step)
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
