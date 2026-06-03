# Spec: ScoreRow

Linha de item pontuada com ícone, label, score e barra de progresso opcional. Projetado para checklists de auditoria, formulários de avaliação e listas de notas.

**Usar quando:** exibir um item com pontuação (score/total), seja em listas de auditoria, avaliação docente, indicadores, etc.  
**Não usar quando:** o dado não tem score numérico ou a lista tem menos de 3 itens simples (preferir lista nativa).  
**Alternativa se não se aplicar:** `CardStat` para cards de métrica individual, lista HTML `<ul>` para itens sem score.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/score-row.tsx` |
| data-slot | `score-row` / `score-row-list` |
| Tipo | `registry:component` |
| Categoria | `Data Display` |
| Depende de | `Progress` (ui), `Skeleton`, `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`, `lucide-react`, `class-variance-authority`, `ui-i18n` |

---

## API — Props

### ScoreRow

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `title` | `string` | — | ✓ | Título do item |
| `description` | `string` | — | | Descrição / subtítulo |
| `icon` | `React.ElementType` | `FileTextIcon` | | Componente Lucide para o ícone |
| `score` | `number` | — | ✓ | Valor atual da pontuação |
| `total` | `number` | — | ✓ | Valor máximo da pontuação |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Densidade da linha |
| `status` | `"default" \| "success" \| "warning" \| "destructive" \| "auto"` | `"default"` | | Cor do ícone e score. `"auto"` deriva do ratio (score/total) |
| `scoreDisplay` | `"fraction" \| "percent" \| "raw"` | `"fraction"` | | Formato de exibição do score |
| `showProgress` | `boolean` | `true` | | Exibe barra de progresso na base da linha com tooltip |
| `loading` | `boolean` | `false` | | Estado skeleton |
| `locale` | `UILocale` | `"en-US"` | | Localização dos textos (`loading`, `scoreLabel`) |
| `percentDecimals` | `number` | `0` | | Casas decimais no percentual exibido no tooltip da barra e aria-label |
| `onClick` | `() => void` | — | | Quando presente, renderiza como `<button>` com hover/focus-visible |
| `className` | `string` | — | | Classes extras |
| `...HTMLAttributes<HTMLElement>` | — | — | | Demais atributos HTML (não aplicados se `onClick` presente) |

### ScoreRowList

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `children` | `ReactNode` | — | ✓ | Itens `ScoreRow` aninhados |
| `inset` | `boolean` | `false` | | Remove borda externa (`border-border rounded-xl`) para embutir em container já bordado |
| `className` | `string` | — | | Classes extras |
| `...HTMLAttributes<HTMLDivElement>` | — | — | | Demais atributos HTML |

---

## Variantes CVA

| Nome | Variantes | Slots |
|------|-----------|-------|
| `scoreRowVariants` | `size` (sm/md/lg), `interactive` (boolean) | Container da linha |
| `scoreRowIconContainerVariants` | `size` (sm/md/lg), `status` (default/success/warning/destructive) | Wrapper do ícone |
| `scoreRowIconVariants` | `size` (sm/md/lg) | Tamanho do ícone |
| `scoreRowTitleVariants` | `size` (sm/md/lg) | Título |
| `scoreRowDescriptionVariants` | `size` (sm/md/lg) | Descrição |
| `scoreRowCurrentVariants` | `size` (sm/md/lg), `status` (default/success/warning/destructive) | Valor numérico do score |
| `scoreRowTotalVariants` | `size` (sm/md/lg) | Separador `/` e total |

Todas com `defaultVariants` declarados.

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `bg-muted` | Container ícone (status default) |
| `text-muted-foreground` | Container ícone (default), descrição, score total, separador `/` |
| `text-foreground` | Título, score current (default) |
| `bg-success/10` / `text-success` | Container ícone e score (success) |
| `bg-warning/15` / `text-warning` | Container ícone e score (warning) |
| `bg-destructive/10` / `text-destructive` | Container ícone e score (destructive) |
| `bg-primary` | Indicador da barra de progresso (status default) |
| `bg-success` | Indicador da barra de progresso (success) |
| `bg-warning` | Indicador da barra de progresso (warning) |
| `bg-destructive` | Indicador da barra de progresso (destructive) |
| `border-border` | Borda inferior entre itens, borda do container ScoreRowList |
| `bg-accent` / `hover:bg-accent` | Hover da linha interativa |
| `ring-ring` | Focus-visible da linha interativa |
| `rounded-xl` | Container ScoreRowList |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Padding row | `px-3 py-2 gap-2` | `px-4 py-3 gap-2.5` | `px-5 py-4 gap-3` |
| Ícone container | `size-7` | `size-8` | `size-10` |
| Ícone | `size-3.5` | `size-4` | `size-5` |
| Título | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Descrição | `text-xs` | `text-xs` | `text-sm` |
| Score current | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Score total | `text-xs` | `text-sm` | `text-base` |
| Progress bar | `h-2` | `h-3` | `h-4` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Linha com ícone, título, score fracionado, sem barra de progresso |
| **Auto status** | `status="auto"` deriva cor do ratio: ≥70% success, ≥40% warning, <40% destructive |
| **Score display** | `fraction`: "42 / 95" · `percent`: "71,6%" (locale-aware, respeita `percentDecimals`) · `raw`: "42" |
| **Progress bar** | `showProgress=true` renderiza barra fina colorida na base + tooltip com percentual localizado |
| **Percent decimals** | `percentDecimals` controla casas decimais em todo percentual (score display, tooltip, aria-label). Usa `Intl.NumberFormat` com o locale ativo |
| **Loading** | `loading=true` renderiza `Skeleton` em todos os slots mantendo a estrutura visual |
| **Clickable** | `onClick` presente transforma a linha em `<button>` com `hover:bg-accent` e `focus-visible:ring` |
| **ScoreRowList** | Container com `rounded-xl border-border` (a menos que `inset=true`), remove borda do último filho |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Score semântico | Score visual com `aria-hidden`, `<span class="sr-only">` com texto localizado (`t.scoreLabel: 42 / 95`) |
| Texto truncado | `title` attribute nos spans de título e descrição para exibir texto completo ao passar o mouse |
| Progress bar | `aria-label` no `<Progress>` e tooltip com `role="tooltip"` |
| Loading | `aria-busy="true"` e `aria-label={t.loading}` |
| Interactive | Quando `onClick` presente, renderiza `<button>` com `aria-label` composto de título, descrição e score |
| Lista | `ScoreRowList` com `role="list"` |
| Container ícone | `aria-hidden="true"` (decorativo) |
| Lucide icons | Herdam `aria-hidden` do container (decorativos) |
| Contraste | Todos os tokens de cor são semânticos com opacidade controlada |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Sizes` — Sizes
- [x] `StatusVariants` — Status Variants
- [x] `AutoStatus` — Auto Status
- [x] `ScoreDisplayModes` — Score Display Modes
- [x] `WithProgressBar` — With Progress Bar
- [x] `WithoutProgressBar` — Without Progress Bar
- [x] `Interactive` — Interactive (Clickable)
- [x] `Loading` — Loading Skeleton
- [x] `AuditList` — ScoreRowList (Audit List)
- [x] `CustomIcons` — Custom Icons
- [x] `LocalePtBR` — Locale pt-BR
- [x] `PercentDecimals` — Percent Decimals

## Checklist

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos de score
- [x] `truncate` em todos os labels de texto variável
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
