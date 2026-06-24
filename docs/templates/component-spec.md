# Spec: [NomeDoComponente]

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

**Usar quando:** …  
**Não usar quando:** …  
**Alternativa se não se aplicar:** …

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/[nome].tsx` |
| Tipo | `registry:ui` |
| Categoria | `Data Display` / `Form` / `Navigation` / `Feedback` / `Layout` |
| Depende de | (primitivos shadcn usados: Card, Badge, Skeleton, etc.) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `number` | — | ✓ | … |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho do componente |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `className` | `string` | — | | Classes extras de layout |

> Estender `HTMLAttributes<HTMLDivElement>` (ou o elemento semântico correto) + `VariantProps<typeof *Variants>`.

---

## Variantes CVA

Liste todas as dimensões de variação. Cada dimensão vira um `variants` block no `cva()`.

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `intent` | `primary`, `success`, `destructive` | `primary` |
| … | … | … |

**Slots do componente** (cada slot ganha seu próprio `*Variants`):

- `containerVariants` — wrapper externo
- `labelVariants` — texto descritivo
- `valueVariants` — valor/número
- `…` — …

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted` | track / fundo do componente |
| `text-muted-foreground` | label/nome |
| `text-foreground` | valor principal |
| `bg-primary` | fill padrão |
| `text-success` / `bg-success` | variante success |
| `text-destructive` | variante destructive |
| … | … |

> Proibido: `bg-emerald-500`, `text-green-600`, qualquer cor Tailwind raw para semântica.

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Label text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Value text | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Altura do elemento | `h-7` | `h-8` | `h-9` |
| Ícone | `size-3.5` | `size-4` | `size-5` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<Skeleton>` com dimensões idênticas ao conteúdo real |
| `disabled` | `opacity-50 pointer-events-none` via `data-disabled` |
| Valor mínimo/máximo | … |
| Empty / null | … |
| Overflow de texto | `truncate` em todos os labels |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `<div role="…">` ou elemento HTML nativo |
| Rótulo | `aria-label` obrigatório quando sem label visível |
| Valores numéricos | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Teclado | Teclas suportadas: … |
| i18n | `UI_I18N[locale].componentName.*` para strings fixas |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — estado padrão com valores representativos
- [ ] `AllSizes` — sm, md, lg em uma coluna
- [ ] `AllIntents` (se aplicável) — todas as variantes de intenção
- [ ] `Loading` — `loading={true}` com cada `size`
- [ ] `Empty` / `ZeroState` (se aplicável)
- [ ] `Disabled` (se aplicável)
- [ ] Qualquer estado especial relevante para o caso de uso

---

## Checklist antes de implementar

- [ ] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [ ] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [ ] Todo `cva()` tem `defaultVariants` declarado
- [ ] Todos os `*Variants` são exportados
- [ ] Loading usa `<Skeleton>` com dimensões corretas
- [ ] `tabular-nums` em todos os valores numéricos
- [ ] `truncate` em todos os labels de texto variável
- [ ] `aria-label` ou label visível em todos os elementos interativos/informativos
- [ ] `cn()` para todas as classes condicionais
- [ ] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [ ] Prop `locale` integrada via `UI_I18N` se houver strings fixas
