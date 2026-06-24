# Spec: Tooltip

> Popup de dica leve exibindo texto auxiliar ao passar o mouse ou focar em um elemento alvo.

---

## Propósito

**Usar quando:** É necessário fornecer uma descrição curta ou contexto adicional para um ícone, botão ou elemento interativo sem ocupar espaço permanente na interface.

**Não usar quando:** O conteúdo é longo ou contém elementos interativos (usar Popover). A informação é crítica para a conclusão da tarefa (deve estar visível permanentemente).

**Alternativa:** Popover para conteúdo rico e interativo, Accordion para informações expandíveis.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/tooltip.tsx` |
| Tipo | `registry:ui` (name: `tooltip`) |
| Categoria | Sobrepõe / Dica |
| Depende de | `radix-ui` |

---

## API — Props

### TooltipProvider

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `delayDuration` | `number` | `0` | Não | Atraso em ms antes de exibir |
| `skipDelayDuration` | `number` | — | Não | Tempo para pular delay em navegação rápida |

### Tooltip

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `open` | `boolean` | — | Não | Estado controlado |
| `defaultOpen` | `boolean` | — | Não | Estado inicial |
| `onOpenChange` | `(open: boolean) => void` | — | Não | Callback |

### TooltipTrigger

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `asChild` | `boolean` | — | Não | Mescla ao filho (Radix) |
| `...props` | `React.ComponentProps<typeof TooltipPrimitive.Trigger>` | — | Não | Props nativas |

### TooltipContent

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `side` | `"top" \| "right" \| "bottom" \| "left"` | — | Não | Lado de exibição |
| `sideOffset` | `number` | `0` | Não | Distância do trigger |
| `align` | `"start" \| "center" \| "end"` | — | Não | Alinhamento |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--foreground` | Fundo do tooltip (alta coragem) |
| `--background` | Texto do tooltip |
| `fill-foreground` | Cor da seta (arrow) |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Hover** | Exibe após `delayDuration` (padrão 0ms) |
| **Focus** | Exibe ao focar via teclado no trigger |
| **Top** | Acima do trigger, `slide-in-from-bottom-2` |
| **Right** | À direita, `slide-in-from-left-2` |
| **Bottom** | Abaixo, `slide-in-from-top-2` |
| **Left** | À esquerda, `slide-in-from-right-2` |
| **Abertura** | `animate-in`, `fade-in-0`, `zoom-in-95` |
| **Fechamento** | `animate-out`, `fade-out-0`, `zoom-out-95` |
| **Com kbd** | Suporte a `kbd` com padding condicional |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Trigger | Radix gerencia `aria-describedby` no trigger |
| Foco | Ativado por hover e foco de teclado |
| Dismiss | Fechado ao pressionar Escape ou mover o mouse |
| Animação | `prefers-reduced-motion` respeitado via Tailwind |

---

## Stories obrigatórias

- [x] `Default` — "Add to library" ao hover
- [x] `Sides` — top, right, bottom, left
- [x] `Delay` — 700ms de atraso

---

## Checklist

- [x] Componente implementado em `tooltip.tsx`
- [x] Stories implementadas (Default, Sides, Delay)
- [x] `data-slot` em Provider, Tooltip, Trigger, Content
- [x] Usa `<Portal>` do Radix para renderização fora do fluxo
- [x] Seta (`Arrow`) com cor `fill-foreground`
- [x] Animações de entrada/saída com Tailwind
- [x] Tokens semânticos (`--foreground`, `--background`)
- [x] Suporte a `delayDuration` via Provider
