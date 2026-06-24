# Spec: HeaderSearch

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Campo de busca expansível com animação, ideal para headers e barras de navegação. Ao clicar no ícone de lupa, expande-se para exibir um input de texto completo. Suporta autofoco, teclas Enter/Escape e i18n.

**Usar quando:** necessário um campo de busca que economiza espaço no header  
**Não usar quando:** busca sempre visível (preferir Input simples)  
**Alternativa se não se aplicar:** `Input` do shadcn com `Search` ícone

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/header-search.tsx` |
| data-slot | `header-search` |
| Tipo | `registry:component` |
| Categoria | `Form` |
| Depende de | `Button`, `Input` (shadcn), `lucide-react`, `cva` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `value` | `string` | — | | Valor controlado do input |
| `onChange` | `(value: string) => void` | — | | Handler de mudança |
| `onSearch` | `(value: string) => void` | — | | Handler disparado ao pressionar Enter |
| `placeholder` | `string` | `"Search..."` | | Placeholder do input |
| `autoFocus` | `boolean` | `true` | | Autofoca o input ao expandir |
| `isExpanded` | `boolean` | `false` | | Estado expandido (controlado) |
| `rounded` | `"full" \| "md" \| "none"` | `"full"` | | Arredondamento do botão/input |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof headerSearchVariants>` (Omit `onChange`).

---

## Variantes CVA

| Dimensão | Valores | Padrão |
|----------|---------|--------|
| `isExpanded` | `true`, `false` | `false` |
| `rounded` | `full`, `md`, `none` | `full` |

**Slots:**

- `headerSearchVariants` — container principal (expansão width + transition)
- `headerSearchButtonVariants` — botão toggle (size, rounded)

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `bg-background` | Input de busca |
| `border-border` | Borda do input |
| `text-muted-foreground` | Ícone Search, placeholder |
| `text-foreground` | Ícone X hover |
| `ring-ring` | Focus ring do input e do botão |
| `bg-accent` | Hover do botão |
| `hover:bg-transparent` | Botão close |

---

## Escala tipográfica e de tamanho

| Slot | sm | md | lg |
|------|----|----|----|
| Botão | `size-8` | `size-10` | `size-12` |
| Input height | `h-10` (fixo) | `h-10` (fixo) | `h-10` (fixo) |
| Ícone Search | `size-4` | `size-4` | `size-4` |
| Ícone X | `size-4` | `size-4` | `size-4` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| Recolhido (padrão) | Botão ghost com ícone Search; `w-10` |
| Expandido | Input visível com ícone Search à esquerda, X à direita; `w-full md:w-[300px] lg:w-[400px]` |
| Autofoco | Input recebe foco automaticamente ao expandir |
| Enter | Dispara `onSearch` com valor atual |
| Escape | Recolhe o campo e limpa o valor |
| Transition | `duration-300 ease-in-out` na expansão; `zoom-in-95 fade-in` no conteúdo |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | `aria-label` no botão toggle via `UI_I18N[locale].headerSearch.open/close` |
| Teclado | Enter → `onSearch`, Escape → recolhe |
| i18n | `UI_I18N[locale].headerSearch.open` / `UI_I18N[locale].headerSearch.close` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `LocalePTBR` — Locale PTBR
- [x] `Square` — Square
- [x] `Expanded` — Expanded
- [x] `InHeaderMock` — In Header Mock

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Todos os `*Variants` são exportados
- [x] Loading usa `<Skeleton>` com dimensões corretas — N/A (sem loading state)
- [x] `tabular-nums` em todos os valores numéricos — N/A
- [x] `truncate` em todos os labels de texto variável — N/A
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
- [x] Prop `locale` integrada via `UI_I18N`
