# Spec: IconButton

---

## Propósito

Botão com ícone + tooltip opcional. Encapsula o shadcn `Button` com `aria-label` obrigatório, loading spinner e tooltip configurável.

**Usar quando:** Ação representada apenas por ícone (sem texto visível). Tooltips em botões de toolbar.

**Não usar quando:** Botão com texto + ícone (usar `Button` direto). Precisa de variantes visuais além das do shadcn `Button`.

**Alternativa se não se aplicar:** `Button` shadcn com `children`, `Tooltip` manual.

---

## Localização

| Campo      | Valor                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Arquivo    | `components/ds/icon-button.tsx`                                                                                        |
| data-slot  | `icon-button`                                                                                                          |
| Tipo       | `registry:component` (name: `icon-button`)                                                                             |
| Categoria  | `Form`                                                                                                                 |
| Depende de | `Button` (shadcn), `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` (shadcn), `Loader2` (lucide-react) |

---

## API — Props

| Prop          | Tipo                                            | Padrão     | Obrigatória | Descrição                                                 |
| ------------- | ----------------------------------------------- | ---------- | ----------- | --------------------------------------------------------- |
| `icon`        | `ReactNode`                                     | —          | ✓           | Ícone a exibir (tipicamente lucide)                       |
| `label`       | `string`                                        | —          | ✓           | Label acessível (aria-label e tooltip padrão)             |
| `tooltip`     | `string \| false`                               | —          |             | Texto do tooltip; `false` desabilita; omite = usa `label` |
| `tooltipSide` | `"top" \| "right" \| "bottom" \| "left"`        | `"bottom"` |             | Lado do tooltip                                           |
| `variant`     | `IconButtonVariant` (do shadcn Button)          | `"ghost"`  |             | Variante visual                                           |
| `size`        | `"icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"` | `"icon"`   |             | Tamanho do botão                                          |
| `rounded`     | `"none" \| "md" \| "full"`                      | `"md"`     |             | Border radius                                             |
| `loading`     | `boolean`                                       | `false`    |             | Exibe `Loader2` spinner e desabilita                      |
| `disabled`    | `boolean`                                       | —          |             | Desabilita o botão                                        |

> Estende `Omit<React.ComponentProps<"button">, "children">`.

---

## Variantes CVA

Nenhuma própria. Usa `buttonVariants` do shadcn Button:

| Dimensão  | Valores (delegados ao shadcn Button)                              | Padrão  |
| --------- | ----------------------------------------------------------------- | ------- |
| `variant` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` | `ghost` |
| `size`    | `icon-xs`, `icon-sm`, `icon`, `icon-lg`                           | `icon`  |

**Rounded** é gerenciado via lookup table interna:

| Valor  | Classe         |
| ------ | -------------- |
| `none` | `rounded-none` |
| `md`   | `rounded-md`   |
| `full` | `rounded-full` |

---

## Tokens de design utilizados

Nenhum diretamente. Os tokens vêm do shadcn `Button` através da prop `variant`:

| Variant       | Tokens (gerenciados pelo shadcn)               |
| ------------- | ---------------------------------------------- |
| `ghost`       | `hover:bg-accent hover:text-accent-foreground` |
| `outline`     | `border border-input bg-background`            |
| `destructive` | `bg-destructive text-destructive-foreground`   |
| etc.          | (delegado ao shadcn)                           |

---

## Escala tipográfica e de tamanho

| Slot            | Valor                                                       |
| --------------- | ----------------------------------------------------------- |
| Loading spinner | `className="animate-spin"` (tamanho gerenciado pelo Button) |
| Rounded md      | `rounded-md`                                                |

Tamanhos de botão e ícone gerenciados pelo shadcn `Button` via prop `size` (`icon-xs`, `icon-sm`, `icon`, `icon-lg`).

---

## Comportamentos e estados

| Estado                  | Comportamento esperado                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `loading={true}`        | Exibe `<Loader2 className="animate-spin" />` no lugar do ícone, `aria-busy="true"`, `disabled`, `cursor-wait` |
| `disabled`              | Button disabled (shadcn), `cursor-wait` se loading                                                            |
| `tooltip` não informado | Tooltip usa `label` como texto                                                                                |
| `tooltip={false}`       | Tooltip não é renderizado (apenas button puro)                                                                |
| `rounded`               | Aplica classe de border radius ao button                                                                      |
| Sem tooltip             | Apenas `<Button>` com `aria-label`, sem wrapper Tooltip                                                       |

---

## Acessibilidade

| Requisito     | Implementação                                     |
| ------------- | ------------------------------------------------- |
| Rótulo        | `aria-label={label}` obrigatório no Button        |
| Estado busy   | `aria-busy={loading \| undefined}`                |
| Tooltip       | `TooltipTrigger asChild` envolvendo o Button      |
| Texto tooltip | `<p>{tooltipText}</p>` dentro de `TooltipContent` |
| i18n          | N/A — label é prop string, sem chave i18n         |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Playground` — Playground
- [x] `Variants` — Variants
- [x] `Sizes` — Sizes
- [x] `Rounded` — Rounded
- [x] `TooltipSides` — Tooltip Sides
- [x] `Loading` — Loading
- [x] `States` — States
- [x] `NoTooltip` — No Tooltip
- [x] `ToolbarExample` — Toolbar Example
- [x] `CardActions` — Card Actions

## Checklist antes de implementar

- [x] Escala tipográfica — N/A (delega ao shadcn Button)
- [x] Tokens semânticos — N/A (delega ao shadcn Button)
- [x] `cva()` — N/A (usa buttonVariants do shadcn)
- [x] Loading usa spinner do lucide com `animate-spin` + `aria-busy`
- [x] `tabular-nums` — N/A
- [x] `truncate` — N/A
- [x] `aria-label` obrigatório
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` — N/A (label é prop string)
