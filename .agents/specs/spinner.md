# Spec: Spinner

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `.agents/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Ícone de loading animado (spinning) baseado no Lucide `Loader2Icon`. Componente leve e puramente decorativo, sem estado ou variantes.

**Usar quando:** indicar carregamento de forma minimalista (botões, inline)  
**Não usar quando:** loading com dimensões fixas ou skeleton mais apropriado (preferir `<Skeleton>`)  
**Alternativa se não se aplicar:** shadcn `Skeleton` para blocos de conteúdo

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/spinner.tsx` |
| Tipo | `registry:component` |
| Categoria | `Feedback` |
| Depende de | `lucide-react` (Loader2Icon) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `locale` | `UILocale` | `"en-US"` | | Locale para aria-label |
| `className` | `string` | — | | Classes extras |

Estende `React.ComponentProps<"svg">` — aceita todas as props de SVG (`size`, `color`, etc.).

---

## Variantes CVA

Nenhuma. Sem CVA. Componente funcional puro.

---

## Tokens de design utilizados

Nenhum token semântico. A cor é herdada via `currentColor` do SVG (contexto do consumer).

---

## Escala tipográfica e de tamanho

| Propriedade | Valor |
|-------------|-------|
| Tamanho padrão | `size-4` (16px) |
| Animação | `animate-spin` |

Tamanho customizável via props SVG (ex: `width=24 height=24` ou className `size-6`).

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| Padrão | Loader2Icon com rotação contínua |
| `className` | Mesclado via `cn()` |

Não possui estados de loading, empty, ou disabled (é o próprio indicador de loading).

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `role="status"` |
| Rótulo | `aria-label` via `UI_I18N[locale].spinner.loading` |
| i18n | `UI_I18N[locale].spinner.loading` ("Loading" / "Carregando" / "Cargando" / "Chargement") |

---

## Stories obrigatórias no Storybook

- [ ] `Default` — spinner básico
- [ ] `CustomSize` — `size-8`, `size-12`
- [ ] `CustomColor` — `text-destructive`, `text-primary`
- [ ] `WithLabel` — spinner ao lado de texto

---

## Checklist antes de implementar

- [ ] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base` — N/A
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [ ] Todo `cva()` tem `defaultVariants` declarado — N/A
- [ ] Todos os `*Variants` são exportados — N/A
- [ ] Loading usa `<Skeleton>` com dimensões corretas — N/A (é o próprio loading)
- [ ] `tabular-nums` em todos os valores numéricos — N/A
- [ ] `truncate` em todos os labels de texto variável — N/A
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [ ] Spacing usa apenas steps Tailwind (sem arbitrary values) — N/A
- [x] Prop `locale` integrada via `UI_I18N`
