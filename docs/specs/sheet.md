# Spec: Sheet

> Painel deslizante lateral (drawer) para conteúdo adicional ou navegação.

---

## Propósito

**Usar quando:** Exibir conteúdo complementar, formulários ou navegação em um painel que desliza de uma borda da tela.

**Não usar quando:** O conteúdo precisa de foco total e ação obrigatória — usar `Dialog`. Ação contextual rápida — usar `Popover`.

**Alternativa:** `Dialog` para modais centrais; `Popover` para pequenos contextos.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/sheet.tsx` |
| Tipo | `registry:ui` (name: `sheet`) |
| Categoria | Sobrepressão |
| Depende de | `radix-ui` (Dialog como SheetPrimitive), `@/components/ui/button`, `lucide-react` (XIcon), `@/lib/utils` (cn) |

---

## API — Props

### SheetContent

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Não | Borda de origem |
| `showCloseButton` | `boolean` | `true` | Não | Exibe botão de fechar |
| `className` | `string` | — | Não | Classes adicionais |

### SheetHeader

Container para título e descrição, com padding `p-6`.

### SheetFooter

Container para ações, com `mt-auto` e padding `p-6`.

### SheetTitle

Título acessível do sheet. Usa `font-heading`.

### SheetDescription

Descrição acessível do sheet.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--popover` | Fundo do painel |
| `--popover-foreground` | Cor do texto |
| `--black/30` | Overlay semi-transparente |
| `--foreground` | Cor do título |
| `--muted-foreground` | Cor da descrição |
| `--secondary` | Fundo do botão de fechar |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Aberto | Overlay fade-in, painel desliza de `side` |
| Fechado | Overlay fade-out, painel desliza para `side` |
| Side right | Largura `w-3/4`, `sm:max-w-sm` |
| Side left | Largura `w-3/4`, `sm:max-w-sm` |
| Side top | Altura `h-auto`, borda inferior |
| Side bottom | Altura `h-auto`, borda superior |
| Sem close button | Botão oculto via `showCloseButton=false` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Focus trap | Gerenciado pelo Radix Dialog |
| Fechar com Escape | Gerenciado pelo Radix |
| Role dialog | Gerenciado pelo Radix |
| Título acessível | `SheetTitle` vinculado via `aria-labelledby` |
| Descrição acessível | `SheetDescription` vinculado via `aria-describedby` |
| Botão close | `sr-only` "Close" |

---

## Stories obrigatórias

- [x] `Right` — Painel da direita com formulário, header e footer
- [x] `Left` — Painel da esquerda com navegação
- [x] `Top` — Painel superior com notificação
- [x] `Bottom` — Painel inferior com ações
- [x] `WithoutCloseButton` — Botão de fechar oculto

---

## Checklist

- [x] Componente funcional com 8 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte aos 4 lados (top/right/bottom/left)
- [x] Prop `showCloseButton`
- [x] Header, Footer, Title e Description
- [x] Atributo `data-slot` em todos os sub-componentes
