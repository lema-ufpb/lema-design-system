# Spec: Item

> Item de lista versátil com mídia, conteúdo, título, descrição e ações.

---

## Propósito

Componente composable para construir linhas de lista, cards ou entradas selecionáveis com estrutura consistente de mídia, conteúdo, ações e tamanhos variáveis.

**Usar quando:** É necessário exibir uma lista de itens com estrutura repetível (ícone/avatar, título, descrição, ações).

**Não usar quando:** A estrutura é completamente customizada (use divs diretas). Para menus, use DropdownMenu ou ContextMenu.

**Alternativa se não se aplicar:** `Card` para cards com header/body/footer; `DropdownMenuItem` para itens de menu.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/item.tsx` |
| Tipo | `registry:ui` (name: `item`) |
| Categoria | Lista / Coleção |
| Depende de | `class-variance-authority`, `radix-ui`, `separator` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Item.variant` | `"default" \| "outline" \| "muted"` | `"default"` | — | Variante visual |
| `Item.size` | `"default" \| "sm" \| "xs"` | `"default"` | — | Tamanho do item |
| `Item.asChild` | `boolean` | `false` | — | Renderiza como elemento filho (Slot) |
| `Item` | `React.ComponentProps<"div">` + variantes | — | — | Container do item |
| `ItemGroup` | `React.ComponentProps<"div">` | — | — | Grupo de itens |
| `ItemSeparator` | `Separator.Props` | — | — | Divisor entre itens |
| `ItemMedia.variant` | `"default" \| "icon" \| "image"` | `"default"` | — | Estilo do media |
| `ItemMedia` | `React.ComponentProps<"div">` + variantes | — | — | Container para ícone/avatar/imagem |
| `ItemContent` | `React.ComponentProps<"div">` | — | — | Conteúdo textual |
| `ItemTitle` | `React.ComponentProps<"div">` | — | — | Título do item |
| `ItemDescription` | `React.ComponentProps<"p">` | — | — | Descrição do item |
| `ItemActions` | `React.ComponentProps<"div">` | — | — | Container de ações |
| `ItemHeader` | `React.ComponentProps<"div">` | — | — | Cabeçalho do grupo |
| `ItemFooter` | `React.ComponentProps<"div">` | — | — | Rodapé do grupo |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--ring` / `--ring/50` | Foco teclado (`focus-visible`) |
| `--border` | Borda `variant="outline"` |
| `--muted/50` | Fundo `variant="muted"` |
| `--muted-foreground` | `ItemDescription` |
| `--muted` | Hover background |
| `--border` | `ItemSeparator` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Sem borda, sem fundo |
| **Outline** | Borda `border-border` |
| **Muted** | Fundo `bg-muted/50` |
| **Size sm** | Padding reduzido: `px-3.5 py-3` |
| **Size xs** | Padding menor: `px-3 py-2.5` |
| **AsChild** | Renderiza como `Slot.Root` para composition |
| **Focus visible** | `border-ring`, `ring-3 ring-ring/50` |
| **ItemGroup** | Gap entre itens: `gap-4` (default), `gap-2.5` (sm), `gap-2` (xs) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | `role="list"` no `ItemGroup` |
| Foco teclado | `focus-visible` com ring |
| Composition | `asChild` via `Slot.Root` para elementos custom |

---

## Stories obrigatórias

- [x] `Default`
- [x] `Outline`
- [x] `WithHeader`

---

## Checklist

- [x] Três variantes: default, outline, muted
- [x] Três tamanhos: default, sm, xs
- [x] Media com variantes: default, icon, image
- [x] Content com title e description
- [x] Actions para botões de ação
- [x] ItemGroup com separador
- [x] Header e Footer para cabeçalho/rodapé do grupo
- [x] `asChild` para composition via Slot
