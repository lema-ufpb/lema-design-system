# Spec: PillGroup

---

## Propósito

Barra horizontal de filtros com botões em forma de pílula. Cada pílula representa uma categoria de filtro e pode exibir ícone, contagem e cor semântica por estado ativo. Projetada para sentar acima de tabelas, listas ou painéis de gráfico.

**Usar quando:** Você precisa de um seletor de categoria compacto e visual — filtros de status, prioridade, tipo de auditoria, etc.
**Não usar quando:** Você precisa de abas de navegação de página (use `<Tabs>`), filtro dropdown com busca (use `<Combobox>`), ou seleção múltipla com chips removíveis (use tags/select).
**Alternativa se não se aplicar:** `<Tabs>` para navegação; `<ToggleGroup>` para seleção discreta sem barra visual.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/pill-group.tsx` |
| Tipo | `registry:ui` |
| Categoria | `Navigation / Filter` |
| Depende de | `Button`, `Skeleton`, `UI_I18N` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `items` | `PillGroupItem[]` | — | ✓ | Array de opções de filtro |
| `value` | `string \| string[] \| null` | — | | Valor controlado |
| `defaultValue` | `string \| string[] \| null` | `null` | | Valor inicial não-controlado |
| `multiple` | `boolean` | `false` | | Habilita seleção múltipla |
| `onChange` | `(v: string \| string[] \| null) => void` | — | | Callback de mudança |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho dos pills |
| `showCount` | `boolean` | auto | | Força exibição/ocultação de contagens |
| `loading` | `boolean` | `false` | | Estado de carregamento |
| `disabled` | `boolean` | `false` | | Desabilita todo o grupo |
| `locale` | `UILocale` | `"en-US"` | | Locale para formatação de números |
| `label` | `string` | i18n | | Label acessível do grupo |
| `skeletonCount` | `number` | `items.length` ou 3 | | Número de pills skeleton |
| `className` | `string` | — | | Classes extras de layout |

### PillGroupItem

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `value` | `string` | ✓ | Identificador único |
| `label` | `string` | ✓ | Texto exibido |
| `count` | `number` | | Contagem exibida ao lado do label |
| `icon` | `React.ElementType` | | Componente ícone Lucide |
| `disabled` | `boolean` | | Desabilita apenas este item |
| `intent` | `PillGroupIntent` | | Cor do estado ativo |

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `active` | `true`, `false` | `false` |
| `intent` | `default`, `success`, `warning`, `destructive` | `default` |

**Compound variants** (active + intent determinam cor do pill ativo):
- `active=true` + `default` → `bg-foreground text-background shadow-xs hover:bg-foreground/90 hover:text-background`
- `active=true` + `success` → `bg-success text-success-foreground shadow-xs hover:bg-success/90`
- `active=true` + `warning` → `bg-warning text-warning-foreground shadow-xs hover:bg-warning/90`
- `active=true` + `destructive` → `text-destructive-foreground bg-destructive shadow-xs hover:bg-destructive/90`

**Slots data-slot:**
- `data-slot="pill-group"` — root container
- `data-slot="pill-group-item"` — cada pill button
- `data-active="true"` — pill item ativo (omitted when inactive)
- `data-value="<item.value>"` — identificador do item

**Variants exportados:**
- `pillGroupItemVariants` — pill button individual
- `pillGroupCountVariants` — span de contagem

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-muted/30` | track background |
| `text-muted-foreground` | pill inativo — texto |
| `hover:bg-accent/50` | pill inativo — hover |
| `hover:text-foreground` | pill inativo — hover text |
| `bg-foreground` / `text-background` | pill ativo default |
| `bg-success` / `text-success-foreground` | pill ativo success |
| `bg-warning` / `text-warning-foreground` | pill ativo warning |
| `bg-destructive` / `text-destructive-foreground` | pill ativo destructive |
| `shadow-xs` | sombra em todos os pills ativos |
| `hover:bg-foreground/90` / `hover:text-background` | pill ativo default — hover |
| `hover:bg-success/90` | pill ativo success — hover |
| `hover:bg-warning/90` | pill ativo warning — hover |
| `hover:bg-destructive/90` | pill ativo destructive — hover |
| `border` | track container |
| `bg-background/80` | fade de scroll (gradiente) |
| `text-muted-foreground/70` | count inativo |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Pill text | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Count text | `text-xs font-normal` | `text-xs font-normal` | `text-xs font-normal` |
| Pill height | `h-7` | `h-8` | `h-9` |
| Ícone | `size-3` | `size-3.5` | `size-4` |
| Track padding | `p-0.5` | `p-1` | `p-1` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | N skeletons `rounded-full` com alturas idênticas às pills reais; widths variados para aspecto natural |
| `disabled={true}` | `opacity-50 pointer-events-none` no root; todos os botões ficam `disabled` |
| `item.disabled` | Apenas aquele botão fica `opacity-40 pointer-events-none` |
| Clique em pill ativa (single) | Deseleciona → `null` |
| Clique em pill ativa (multi) | Remove do array |
| Overflow horizontal | `ResizeObserver` detecta; fades `bg-linear-to-r/l from-background/80` aparecem nas bordas |
| Count ausente | Pill sem count não exibe espaço; `showCount=false` suprime globalmente |
| `multiple=true` | `role="group"` no container, `role="checkbox"` em items |
| `multiple=false` | `role="radiogroup"` no container, `role="radio"` em items |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `radiogroup` / `group` conforme `multiple`; items são `radio` / `checkbox` |
| Estado | `aria-checked` em cada item |
| Label | `aria-label` obrigatório no grupo (prop ou i18n fallback) |
| Itens desabilitados | `disabled` nativo no `<button>` |
| Fades decorativos | `aria-hidden="true"` |
| Count | `aria-hidden="true"` no span — label do button inclui o texto completo |
| Teclado | Navegação nativa por Tab entre buttons; Enter/Space para selecionar |
| i18n | `UI_I18N[locale].pillGroup.filterLabel` como fallback do group label |

---

## Stories obrigatórias no Storybook

- [x] `Default` — single-select com counts
- [x] `AllSizes` — sm, md, lg em coluna
- [x] `WithIntents` — pills com intent colors (critical/high/medium/low)
- [x] `WithIcons` — items com ícones Lucide
- [x] `MultiSelect` — multiple=true com estado externo
- [x] `ScrollOverflow` — container restrito que ativa os fades
- [x] `NoCount` — showCount=false
- [x] `PartialCounts` — mix de items com e sem count
- [x] `Controlled` — valor gerenciado externamente
- [x] `Disabled` — grupo inteiro + items individuais
- [x] `Loading` — skeleton para sm/md/lg
- [x] `LocalePTBR` — formatação de números pt-BR
- [x] `RiskMatrixExample` — caso de uso real (painel de risco)

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos (count)
- [x] `truncate` em label text
- [x] `aria-label` ou label visível no grupo
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
- [x] Nenhum `React.CSSProperties["..."]` indexado
