# Spec: Input Group

> Grupo integrado de input com addons, botões, textos e atalhos.

---

## Propósito

Container que agrupa um input (ou textarea) com addons visuais como ícones, labels, botões, atalhos de teclado e textos, em layout horizontal ou vertical.

**Usar quando:** O input precisa de elementos adjacentes como ícone de busca, label de unidade, botão de ação, ou atalho de teclado.

**Não usar quando:** Apenas um input simples é necessário (use Input). Múltiplos inputs independentes (use Field).

**Alternativa se não se aplicar:** `Input` para campo simples; `Field` para label + input com validação.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/input-group.tsx` |
| Tipo | `registry:ui` (name: `input-group`) |
| Categoria | Formulário / Entrada |
| Depende de | `class-variance-authority`, `button`, `input`, `textarea` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `InputGroup` | `React.ComponentProps<"div">` | — | — | Container do grupo |
| `InputGroupAddon.align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | — | Posição do addon |
| `InputGroupAddon` | `React.ComponentProps<"div">` + variantes | — | — | Addon (ícone, texto, kbd) |
| `InputGroupButton.type` | `"button" \| "submit" \| "reset"` | `"button"` | — | Tipo do botão |
| `InputGroupButton.variant` | `Button.variant` | `"ghost"` | — | Variante do botão |
| `InputGroupButton.size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` | — | Tamanho do botão |
| `InputGroupButton` | `Omit<Button.Props, "size">` + variantes | — | — | Botão dentro do grupo |
| `InputGroupText` | `React.ComponentProps<"span">` | — | — | Texto não-interativo |
| `InputGroupInput` | `React.ComponentProps<"input">` | — | — | Input sem bordas próprio para grupo |
| `InputGroupTextarea` | `React.ComponentProps<"textarea">` | — | — | Textarea sem bordas próprio para grupo |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `bg-input/50` | Container do grupo |
| `--ring` / `border-ring` | Borda de foco |
| `--ring/30` | Glow de foco |
| `--destructive` | Borda de erro |
| `--destructive/20` | Ring de erro |
| `bg-muted-foreground/10` | Fundo de KBD addon |
| `--muted-foreground` | Addons de texto/ícone |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Borda `border-transparent`, fundo `bg-input/50` |
| **Focus (inner input)** | `border-ring`, `ring-3 ring-ring/30` via `has-[[data-slot=input-group-control]:focus-visible]` |
| **Invalid** | `aria-invalid` no inner input: `border-destructive` |
| **Disabled** | `data-disabled` no grupo: `opacity-50` |
| **Inline addon** | `inline-start` (esquerda) / `inline-end` (direita) |
| **Block addon** | `block-start` (acima) / `block-end` (abaixo) para layout vertical |
| **Com botão** | `InputGroupButton` com variantes de tamanho |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | `role="group"` no container e addons |
| Foco | Clique no addon foca o input interno via `onClick` |

---

## Stories obrigatórias

- [x] `Default`
- [x] `WithAddon`
- [x] `WithButton`
- [x] `WithText`
- [x] `BlockAddon`
- [x] `Disabled`

---

## Checklist

- [x] Suporte a addons inline (esquerda/direita) e block (acima/abaixo)
- [x] Botão com variantes de tamanho (xs, sm, icon-xs, icon-sm)
- [x] Input sem bordas acoplado ao container
- [x] Textarea sem bordas acoplada
- [x] Texto não-interativo (InputGroupText)
- [x] Propagação de estado disabled/invalid
- [x] Foco do addon no input ao clicar
