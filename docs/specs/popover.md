# Spec: Popover

> Bolha de informação contextual acionada por clique/foco, com posicionamento automático.

---

## Propósito

**Usar quando:** Exibir conteúdo adicional ou contextual vinculado a um elemento, sem bloquear a interação como um Dialog.

**Não usar quando:** O conteúdo requer uma ação obrigatória antes de continuar — usar `Dialog`. Conteúdo é uma dica simples de ferramenta — usar `Tooltip`.

**Alternativa:** `Dialog` para ações modais; `Tooltip` para dicas curtas; `HoverCard` para conteúdo rico em hover.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/popover.tsx` |
| Tipo | `registry:ui` (name: `popover`) |
| Categoria | Sobrepressão |
| Depende de | `radix-ui` (Popover), `@/lib/utils` (cn) |

---

## API — Props

### PopoverContent

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `align` | `"start" \| "center" \| "end"` | `"center"` | Não | Alinhamento do popover |
| `sideOffset` | `number` | `4` | Não | Distância do trigger |
| `className` | `string` | — | Não | Classes adicionais |

### PopoverHeader

Container para título e descrição.

### PopoverTitle

Título do popover, renderizado como `<div>` com `text-base font-medium`.

### PopoverDescription

Descrição do popover, renderizada como `<p>` com `text-muted-foreground`.

### PopoverAnchor

Ponto de ancoragem alternativo.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--popover` | Fundo do conteúdo |
| `--popover-foreground` | Cor do texto |
| `--muted-foreground` | Cor da descrição |
| `ring-1 ring-foreground/5` | Anel de borda |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Aberto | Animação `fade-in` + `zoom-in-95` |
| Fechado | Animação `fade-out` + `zoom-out-95` |
| Alinhamento start/center/end | Controlado por `align` |
| Clique externo | Fecha automaticamente (Radix) |
| Tecla Escape | Fecha automaticamente (Radix) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Focus trap | Gerenciado pelo Radix |
| Fechar com Escape | Gerenciado pelo Radix |
| Rolagem ARIA | `radix-ui` Popover gerencia roles |
| Conteúdo no Portal | Renderizado via `PopoverPrimitive.Portal` |

---

## Stories obrigatórias

- [x] `Default` — Popover com header (título + descrição) e conteúdo extra
- [x] `AlignStart` — Alinhamento `start`
- [x] `AlignEnd` — Alinhamento `end`
- [x] `NoHeader` — Popover simples sem header, com lista de ações

---

## Checklist

- [x] Componente funcional com 7 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `align` e `sideOffset`
- [x] Sub-componentes `PopoverHeader`, `PopoverTitle`, `PopoverDescription`
- [x] Atributo `data-slot` em todos os sub-componentes
