# Spec: ToggleTheme

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

Alternador de tema claro/escuro/sistema usando `next-themes` com menu dropdown. Exibe ícone dinâmico (Sun/Moon/Monitor) baseado no tema ativo.

**Usar quando:** necessário toggle de tema no header/app layout  
**Não usar quando:** tema fixo sem alternância  
**Alternativa se não se aplicar:** Botão único de toggle (sem sistema)

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ds/toggle-theme.tsx` |
| data-slot | `toggle-theme` |
| Tipo | `registry:component` |
| Categoria | `Navigation` |
| Depende de | `Button`, `DropdownMenu` (shadcn), `@/providers/theme` (re-exporta `ThemeProvider` e `useTheme`), `lucide-react` |
| Re-exports | `ThemeProvider`, `useTheme` — consumíveis via `import { ThemeProvider, useTheme } from "@/components/ds/toggle-theme"` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `labels.light` | `string` | `"Light"` | | Rótulo do item Light |
| `labels.dark` | `string` | `"Dark"` | | Rótulo do item Dark |
| `labels.system` | `string` | `"System"` | | Rótulo do item System |
| `labels.trigger` | `string` | `"Toggle theme"` | | aria-label do botão |

---

## Variantes CVA

Nenhuma. Usa shadcn `Button` + `DropdownMenu` diretamente.

---

## Tokens de design utilizados

Nenhum token direto. Os primitivos shadcn (`Button`, `DropdownMenu`) gerenciam seus próprios tokens internamente via `globals.css`.

---

## Escala tipográfica e de tamanho

| Propriedade | Valor |
|-------------|-------|
| Botão | `Button variant="ghost" size="icon"` (shadcn padrão) |
| Ícone | Tamanho padrão Lucide (inherit do Button) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| Hydration | `mounted=false` → ícone `Monitor` (evita hydration mismatch) |
| `mounted=true` | Ícone dinâmico baseado no tema: `Sun` (light), `Moon` (dark), `Monitor` (system) |
| Dropdown | 3 opções: Light, Dark, System com ícones |
| Clique | `setTheme("light"|"dark"|"system")` via `next-themes` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Rótulo | `aria-label` no `DropdownMenuTrigger` via prop `trigger` |
| Dropdown | `DropdownMenuItem` com `onClick` para cada opção |
| Teclado | Navegação nativa do DropdownMenu (shadcn/Radix) |
| i18n | Labels customizáveis via props (sem `UI_I18N`) |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Portuguese` — Portuguese
- [x] `InHeader` — In Header

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base` — N/A
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado — N/A
- [x] Todos os `*Variants` são exportados — N/A
- [x] Loading usa `<Skeleton>` com dimensões corretas — N/A (usa `mounted` state check)
- [x] `tabular-nums` em todos os valores numéricos — N/A
- [x] `truncate` em todos os labels de texto variável — N/A
- [x] `aria-label` ou label visível em todos os elementos interativos/informativos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values) — N/A
- [x] Prop `locale` integrada via `UI_I18N` — usa labels props customizáveis
