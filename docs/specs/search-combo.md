# Spec: SearchCombo

> Componente de busca com autocomplete, dropdown virtualizado, highlight de texto, suporte a voz, e botão de ação submit.

---

## Propósito

Campo de busca com dropdown de resultados, virtual scrolling, destaque de texto correspondente (com acentuação insensitive), agrupamento, e suporte opcional a reconhecimento de voz.

**Usar quando:** Necessário campo de busca com sugestões em tempo real, com ou sem voz, com grupos e highlight.

**Não usar quando:** Apenas select de opções (preferir `Combobox`); lista curta estática.

**Alternativa se não se aplicar:** `Combobox` para seleção em dropdown; `Input` simples para busca sem sugestões.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/search-combo.tsx` (single-file, flattened de diretório multi-file) |
| data-slot | `search-combo` | | |
| Arquivos auxiliares | `components/ds/search-combo.stories.tsx` | | |
| Hook | `@/hooks/use-speech-recognition` (compartilhado) |
| Tipo | `registry:ui` |
| Categoria | `Navigation` |
| Depende de | `radix-ui`, `@tanstack/react-virtual`, `Spinner` (custom), `useSpeechRecognition` (hook compartilhado) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | ✓ | Valor controlado do input |
| `onChange` | `(value: string) => void` | — | ✓ | Callback de mudança |
| `onSearch` | `(value: string) => void` | — | | Callback de submit/enter |
| `options` | `SearchComboItem[]` | — | | Itens do dropdown |
| `onSelectResult` | `(item: SearchComboItem) => void` | — | | Callback de seleção de item |
| `placeholder` | `string` | `"Search..."` | | Placeholder |
| `button` | `boolean` | `true` | | Mostrar botão submit |
| `rounded` | `boolean` | `false` | | Borda pill (rounded-full) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | | Tamanho |
| `border` | `boolean` | `false` | | Modo borda destaque com bg-muted |
| `disabled` | `boolean` | `false` | | Desabilitado |
| `loading` | `boolean` | `false` | | Loading (spinner no lugar do ícone) |
| `autoFocus` | `boolean` | `true` | | Auto focus no mount |
| `label` | `string` | `"Search"` | | Aria label do landmark |
| `emptyMessage` | `string` | `"No results found."` | | Mensagem sem resultados |
| `voice` | `boolean` | `false` | | Habilitar reconhecimento de voz |
| `onVoiceStart` | `() => void` | — | | Callback início de gravação |
| `onVoiceEnd` | `() => void` | — | | Callback fim de gravação |
| `onVoiceError` | `(error: string) => void` | — | | Callback erro de voz |

Estende `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect" | "results">`.

**SearchComboItem:** `{ id: string | number, label: string, value?: string, group?: string, icon?: ReactNode, data?: unknown }`

---

## Variantes CVA

Múltiplos slots, cada um com seu próprio `cva()`:

### searchComboWrapperVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `loading` | `true`, `false` | `false` |

### searchComboInputWrapperVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `rounded` | `true`, `false` | `false` |
| `border` | `true`, `false` | `false` |
| `disabled` | `true`, `false` | `false` |
| `loading` | `true`, `false` | `false` |

### searchComboInputVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `border` | `true`, `false` | `false` |

### searchComboIconWrapperVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `border` | `true`, `false` | `false` |

### searchComboActionButtonVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `border` | `true`, `false` | `false` |

### searchComboSearchButtonVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `size` | `sm`, `md`, `lg` | `md` |
| `rounded` | `true`, `false` (ambos `rounded-none`) | `false` |

### searchComboResultItemVariants
| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `active` | `true`, `false` | `false` |

### searchComboHighlightVariants (sem variants — única classe)
### searchComboGroupHeaderVariants (sem variants — única classe)
### searchComboResultsListVariants (sem variants — única classe)
### searchComboEmptyVariants (sem variants — única classe)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-background` | input wrapper |
| `bg-muted/50` | border mode fundo |
| `bg-muted` | disabled |
| `bg-accent` | item ativo/hover |
| `bg-popover` | dropdown list |
| `bg-primary/15` | highlight match |
| `text-foreground` | input texto |
| `text-muted-foreground` | ícone busca, placeholder, subtítulo, empty |
| `text-primary` | highlight match, border mode ícone |
| `text-primary-foreground` | botão submit texto |
| `text-popover-foreground` | texto do item |
| `text-destructive` | voice recording active |
| `border-input` | input wrapper |
| `border-border/80` | dropdown border |
| `border-border/50` | item divisor |
| `ring-ring/20` | focus ring |
| `ring-primary/20` | border mode focus ring |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Wrapper | `text-sm` | `text-base` | `text-lg` |
| Input wrapper | `h-8 min-h-8` | `h-10 min-h-10` | `h-12 min-h-12` |
| Input font | `text-sm` | `text-base` | `text-lg` |
| Submit button | `text-sm px-2.5 self-stretch` | `text-sm px-3 self-stretch` | `text-base px-4 self-stretch` |
| Item height | `40px` (56px com subtitle) | — | — |
| Group header | `32px` | — | — |
| Max dropdown | `200px` | — | — |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `Spinner` no lugar do ícone Search; `pointer-events-none` no wrapper; `animate-pulse` no input wrapper |
| `disabled={true}` | Input desabilitado; opacidade; cursor not-allowed |
| `focused + options.length > 0` | Dropdown aberto com resultados |
| `focused + value.length > 0 + options.length === 0` | Dropdown aberto com empty state |
| `value.trim().length > 0` | Botão clear visível |
| `voice + hasSpeechSupport` | Botão microfone visível; `text-destructive animate-pulse` quando gravando |
| Enter sem dropdown | `onSearch` chamado |
| Enter com dropdown | Item ativo selecionado |
| Highlight | Separa texto em partes, renderiza `<mark>` nas correspondências (acentuação insensitive) |
| Agrupamento | Group headers com labels uppercase |
| Virtual scrolling | `@tanstack/react-virtual` com overscan 3 |
| Scroll to index | `virtualizer.scrollToIndex` para item ativo |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | Container `role="search"` + `aria-label` |
| Combobox | Input `role="combobox"` + `aria-expanded` + `aria-autocomplete="list"` + `aria-controls` |
| Active descendant | `aria-activedescendant` apontando para `${listboxId}-option-${index}` |
| Listbox | `<ul role="listbox">` com `aria-label` |
| Opções | `<li role="option">` + `aria-selected` |
| Group headers | `<li role="presentation">` |
| Botão clear | `aria-label="Clear search"` |
| Botão voz | `aria-label` dinâmico ("Stop recording" / "Search by voice") |
| Teclado | `ArrowDown`/`ArrowUp` navega, `Enter` seleciona, `Escape` fecha |
| i18n | Não usa `UI_I18N` atualmente (strings em inglês inline) |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default search combo with results
- [x] `AllSizes` — sm, md, lg sizes
- [x] `AllVariants` — all variant configurations
- [x] `WithGroups` — grouped results
- [x] `WithIcons` — items with icons
- [x] `Rounded` — pill vs. default
- [x] `BorderMode` — border=true with bg-muted
- [x] `WithoutButton` — button=false
- [x] `Disabled` — disabled state
- [x] `Loading` — loading state with spinner
- [x] `WithVoice` — voice recognition enabled
- [x] `EmptyState` — no results found
- [x] `WithOnSearch` — submit callback demo
- [x] `WithOnSelectResult` — selection callback demo
- [x] `Virtualized` — large list with virtual scrolling

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-sm / md=text-base / lg=text-lg`
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em todos `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `Spinner` custom (não Skeleton — loading na busca)
- [x] `tabular-nums` não aplicável
- [x] `truncate` não aplicável (texto quebrado com highlight)
- [x] `aria-label` no container, input, botões clear e voz
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas `gap-*`
- [x] i18n: strings em inglês inline (não usa UI_I18N atualmente)
