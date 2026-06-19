# Spec: Dashrow

---

## Propósito

Layout horizontal responsivo de múltiplos painéis com divisores redimensionáveis por drag ou teclado. Responsivo: empilha verticalmente em mobile (< lg), divide-se em colunas no desktop. Suporta persistência em `sessionStorage`.

**Usar quando:** Organizar dashboxes ou painéis lado a lado com necessidade de redimensionamento manual pelo usuário.

**Não usar quando:** Layout fixo sem redimensionamento — preferir `flex` ou `grid` direto. Apenas um único filho.

**Alternativa se não se aplicar:** `div` com `flex` + `gap`.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/dashrow.tsx` |
| data-slot | `dashrow` |
| Tipo | `registry:component` (name: `dashrow`) |
| Categoria | `Layout` |
| Depende de | Nenhum primitivo shadcn (apenas React + CVA) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `alignment` | `"left" \| "right" \| "equal"` | `"left"` | | Proporção entre filhos no desktop (lg+) |
| `gap` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | | Espaçamento entre painéis |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"none"` | | Padding no container |
| `storageKey` | `string` | — | | Chave para persistir widths em `sessionStorage` |
| `resizable` | `boolean` | `true` | | Habilita/desabilita divisores redimensionáveis |
| `locale` | `UILocale` | `"en-US"` | | Localização do aria-label dos divisores |
| `children` | `ReactNode` | — | ✓ | Painéis filhos |
| `className` | `string` | — | | Classes extras |

> Estende `VariantProps<typeof dashrowContainerVariants>`.

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `alignment` | `left`, `right`, `equal` | `left` |
| `gap` | `none`, `sm`, `md`, `lg` | `md` |
| `padding` | `none`, `sm`, `md`, `lg` | `none` |

**Compound variants (child):** `alignment` + `position` (`first`, `middle`, `last`) determinam `lg:flex-[N]`:

| alignment | first | middle | last |
|-----------|-------|--------|------|
| `left` | `flex-[3]` | `flex-[2]` | `flex-[2]` |
| `right` | `flex-[2]` | `flex-[2]` | `flex-[3]` |
| `equal` | `flex-1` | `flex-1` | `flex-1` |

**Slots:**

- `dashrowContainerVariants` — container flex com gap/padding
- `dashrowChildVariants` — wrapper individual de cada filho (alignment + position)
- `dashrowDividerVariants` — divisor vertical arrastável
- `dashrowDividerHandleVariants` — handle visual (barra fina arredondada)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-primary/10` | divider hover |
| `bg-primary/15` | divider dragging |
| `bg-border` | divider handle |
| `bg-primary/40` | divider handle on group hover |
| `ring-ring` | divider focus-visible |

---

## Escala tipográfica e de tamanho

Sem escala tipográfica — Dashrow é puramente layout. Não há texto próprio.

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| Mobile (< lg) | Painéis empilhados verticalmente, divisores ocultos |
| Desktop (lg+) | Painéis em linha com divisores visíveis |
| `resizable={false}` | Divisores não renderizados |
| Sem `storageKey` | Sizes não persistem entre renders |
| Drag ativo | `cursor: col-resize` no body, `user-select: none`, divider `data-dragging="true"` |
| Teclado | `ArrowLeft`/`ArrowRight` com step 5% (15% com Shift), mín 15% por painel |
| Limite mínimo | Cada painel nunca abaixo de 15% da largura total |
| `storageKey` corrompido | Ignorado silenciosamente (try/catch) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | `role="separator"` nos divisores |
| Orientação | `aria-orientation="vertical"` |
| Rótulo | `aria-label` com `UI_I18N[locale].dashrow.resizePanels` + índices |
| Valor | `aria-valuenow` (0–100) atualizado durante drag/teclado |
| Range | `aria-valuemin="15"`, `aria-valuemax="85"` |
| Teclado | `ArrowLeft` / `ArrowRight` (Shift para passo maior) |
| Focus | `tabIndex={0}` nos divisores, `focus-visible:ring-2` |
| i18n | `UI_I18N[locale].dashrow.resizePanels` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `AllAlignments` — All Alignments
- [x] `LocalePTBR` — Locale PTBR
- [x] `EqualHeightStretch` — Equal Height Stretch
- [x] `ThreePanels` — Three Panels
- [x] `Persistent` — Persistent
- [x] `NotResizable` — Not Resizable
- [x] `WithRealContent` — With Real Content
- [x] `GapVariants` — Gap Variants
- [x] `Mobile` — Mobile
- [x] `Desktop` — Desktop

## Checklist antes de implementar

- [x] Escala tipográfica — N/A (sem texto)
- [x] Tokens semânticos usados
- [x] `cva()` com `defaultVariants`
- [x] `*Variants` exportados
- [x] Loading — N/A (sem estado loading)
- [x] `tabular-nums` — N/A
- [x] `truncate` — N/A
- [x] `aria-label` nos divisores
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` integrada via `UI_I18N`
