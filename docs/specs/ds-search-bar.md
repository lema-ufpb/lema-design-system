# Spec: SearchBar

> Barra de busca full-width com variantes visuais, suporte a voz, debounce, atalho de teclado, modo controlado/não-controlado e skeleton loading.

---

## Propósito

Campo de busca versátil para uso no corpo de páginas. Suporta três modos visuais (`outline`, `filled`, `ghost`), seis presets de border-radius, ícone customizável, botão de voz via Web Speech API, atalho de teclado (`Kbd`), slot trailing para badges/ações e debounce configurável.

**Usar quando:** Necessário campo de busca simples (sem dropdown de autocomplete).
**Não usar quando:** Necessário dropdown de sugestões (preferir `SearchCombo`).
**Alternativa se não se aplicar:** `SearchCombo` para busca com autocomplete; `Input` simples para busca sem adornos.

---

## Localização

| Campo      | Valor                                                                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/search-bar.tsx`                                                                                                                                      |
| Tipo       | `registry:ui`                                                                                                                                                       |
| Categoria  | `Navigation`                                                                                                                                                        |
| Depende de | `lucide-react`, `class-variance-authority`, `Button` (shadcn), `Input` (ui/input), `Kbd`, `Skeleton`, `useSpeechRecognition` (hook compartilhado), `UI_I18N` (i18n) |

---

## API — Props

### SearchBarProps

| Prop           | Tipo                                               | Padrão       | Obrigatória | Descrição                      |
| -------------- | -------------------------------------------------- | ------------ | ----------- | ------------------------------ |
| `value`        | `string`                                           | —            |             | Valor controlado               |
| `defaultValue` | `string`                                           | `""`         |             | Valor inicial (não-controlado) |
| `onChange`     | `(value: string) => void`                          | —            |             | Callback de mudança            |
| `onSearch`     | `(value: string) => void`                          | —            |             | Callback de submit (Enter)     |
| `onClear`      | `() => void`                                       | —            |             | Callback de limpeza            |
| `placeholder`  | `string`                                           | i18n         |             | Placeholder                    |
| `size`         | `"sm" \| "md" \| "lg"`                             | `"md"`       |             | Tamanho                        |
| `variant`      | `"outline" \| "filled" \| "ghost"`                 | `"outline"`  |             | Estilo visual                  |
| `rounded`      | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"`       |             | Border radius                  |
| `icon`         | `React.ElementType`                                | `SearchIcon` |             | Ícone líder customizado        |
| `loading`      | `boolean`                                          | `false`      |             | Loading spinner                |
| `shortcut`     | `string`                                           | —            |             | Atalho teclado (ex: "⌘K")      |
| `trailingSlot` | `React.ReactNode`                                  | —            |             | Conteúdo extra no fim          |
| `debounceMs`   | `number`                                           | `0`          |             | Debounce do onChange (ms)      |
| `voice`        | `boolean`                                          | `false`      |             | Botão de voz                   |
| `onVoiceStart` | `() => void`                                       | —            |             | Callback início gravação       |
| `onVoiceEnd`   | `() => void`                                       | —            |             | Callback fim gravação          |
| `onVoiceError` | `(error: string) => void`                          | —            |             | Callback erro de voz           |
| `disabled`     | `boolean`                                          | `false`      |             | Desabilitado                   |
| `autoFocus`    | `boolean`                                          | `false`      |             | Auto focus                     |
| `locale`       | `UILocale`                                         | `"en-US"`    |             | Localização i18n               |

Estende `Omit<HTMLAttributes<HTMLDivElement>, "onChange">`.

### SearchBarSkeletonProps

| Prop        | Tipo                   | Padrão | Descrição      |
| ----------- | ---------------------- | ------ | -------------- |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho        |
| `rounded`   | `SearchBarRounded`     | `"lg"` | Border radius  |
| `className` | `string`               | —      | Classes extras |

---

## Variantes CVA

### searchBarVariants (container principal)

| Dimensão  | Valores                                | Padrão    |
| --------- | -------------------------------------- | --------- |
| `variant` | `outline`, `filled`, `ghost`           | `outline` |
| `size`    | `sm`, `md`, `lg`                       | `md`      |
| `rounded` | `none`, `sm`, `md`, `lg`, `xl`, `full` | `lg`      |

### searchBarIconVariants (ícone/spinner)

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

### searchBarInputVariants (input)

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

> **Input delegado ao `ui/Input`:** o `<input>` nativo foi substituído por `<Input>` de `ui/input.tsx`. O estilo built-in do Input (`h-9`, `rounded-3xl`, `border`, `bg-input/50`, `px-3`, `py-1`, `focus-visible:ring-3`) é anulado via `h-auto rounded-none border-none bg-transparent px-0 py-0 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-transparent`, deixando o input sem borda/bg/altura próprios — quem controla o visual é o container `searchBarVariants`. A fonte continua via `searchBarInputVariants`.

### Botões clear / voz (inline sizing)

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

> **Nota:** Clear e voice buttons usam objeto inline `{ sm: "size-5", md: "size-6", lg: "size-7" }[size]` em vez de um CVA separado. O slot `searchBarClearVariants` não existe como CVA exportado.

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                |
| ----------------------- | -------------------------------- |
| `bg-background`         | outline variant                  |
| `bg-muted`              | filled variant                   |
| `bg-accent`             | ghost hover                      |
| `border-border`         | borda outline                    |
| `ring-ring`             | focus ring                       |
| `text-foreground`       | input texto                      |
| `text-muted-foreground` | ícone, placeholder, clear button |
| `text-destructive`      | voice recording active           |

---

## Escala tipográfica e de tamanho

| Slot        | sm                   | md                | lg                  |
| ----------- | -------------------- | ----------------- | ------------------- |
| Container   | `h-8 gap-1.5 px-2.5` | `h-10 gap-2 px-3` | `h-12 gap-2.5 px-4` |
| Input font  | `text-xs`            | `text-sm`         | `text-base`         |
| Ícone       | `size-3.5`           | `size-4`          | `size-5`            |
| Botão clear | `size-5`             | `size-6`          | `size-7`            |

---

## Comportamentos e estados

| Estado                     | Comportamento esperado                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `loading={true}`           | `LoaderCircleIcon` girando no lugar do ícone; clear oculto; `aria-busy`                   |
| `disabled={true}`          | `opacity-50 pointer-events-none cursor-not-allowed`                                       |
| `value.length > 0`         | Botão clear visível (exceto se loading)                                                   |
| `voice + hasSpeechSupport` | Botão microfone visível; `text-destructive animate-pulse` quando gravando; `aria-pressed` |
| `shortcut + empty`         | `Kbd` badge no trailing                                                                   |
| `trailingSlot`             | Renderizado após clear, antes do shortcut                                                 |
| `debounceMs > 0`           | `onChange` atrasado via `setTimeout`                                                      |
| Enter sem dropdown         | `onSearch` chamado com valor atual                                                        |
| Escape com valor           | Input limpo e foco mantido                                                                |
| Modo controlado            | `value` definido → estado externo                                                         |
| Modo não-controlado        | `useState` interno com `defaultValue`                                                     |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico | Container `role="search"`, input `role="searchbox"`                                                                                       |
| Rótulo         | `aria-label` traduzido via `UI_I18N[locale].searchBar.label`                                                                              |
| Busy           | `aria-busy` quando loading                                                                                                                |
| Botão clear    | `aria-label` traduzido via `UI_I18N[locale].searchBar.clear`                                                                              |
| Botão voz      | `aria-label` dinâmico (start/stop) + `aria-pressed`                                                                                       |
| Teclado        | `Enter` → `onSearch`, `Escape` → clear                                                                                                    |
| i18n           | Todas as strings via `UI_I18N[locale].searchBar.*`                                                                                        |
| `data-slot`    | `search-bar`, `search-bar-icon`, `search-bar-input`, `search-bar-clear`, `search-bar-voice`, `search-bar-shortcut`, `search-bar-trailing` |
| Input          | Delegado ao `<Input>` de `ui/input.tsx`; ref passa por `React.ComponentProps<"input">` (React 19)                                         |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado padrão uncontrolled
- [x] `Variants` — outline, filled, ghost lado a lado
- [x] `Sizes` — sm, md, lg
- [x] `RoundedVariants` — none, sm, md, lg, xl, full
- [x] `WithShortcut` — atalho teclado visível quando vazio
- [x] `WithTrailingSlot` — conteúdo extra (filtros, botão)
- [x] `VoiceInput` — reconhecimento de voz
- [x] `Loading` — loading spinner em todos os sizes
- [x] `Disabled` — disabled em todas as variants
- [x] `Controlled` — modo controlado com onChange + onSearch
- [x] `WithDebounce` — debounce de 500ms
- [x] `CustomIcon` — ícone líder customizado
- [x] `Skeleton` — SearchBarSkeleton em sizes e rounded
- [x] `Locales` — todos os 4 locales
- [x] `InContext` — uso realista em card

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos
- [x] `defaultVariants` declarado em todos `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` apenas no `SearchBarSkeleton`; loading state usa `LoaderCircleIcon` com `animate-spin`
- [x] `tabular-nums` não aplicável
- [x] `truncate` não aplicável (input é elemento nativo)
- [x] `aria-label` no container, input, botões clear e voz
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas steps Tailwind
- [x] i18n via `UI_I18N[locale].searchBar.*` com fallback `"en-US"`
