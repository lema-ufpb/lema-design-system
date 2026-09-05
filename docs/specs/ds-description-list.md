# Spec: ds-description-list

> Lista de Descrição (Description List).

---

## Propósito

Exibe um grupo de termos (chave) e suas respectivas descrições (valor), como detalhes de um registro, metadados ou informações de perfil.

**Usar quando:** Você precisa mostrar dados no formato chave-valor de maneira estruturada e semântica.
**Não usar quando:** Os dados precisam de formatação de tabela com múltiplas colunas ordenáveis (use `Table`).

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/description-list.tsx`        |
| Tipo       | `registry:ui` (name: `ds-description-list`) |
| Categoria  | `Data Display`                              |
| Depende de | —                                           |

---

## API — Props

O componente é composto estruturalmente usando subcomponentes para máxima flexibilidade:

- `<DescriptionList>` (raiz, renderiza um `<dl>`)
- `<DescriptionListItem>` (renderiza um `<div className="group">` opcional para layout responsivo/grid)
- `<DescriptionListTerm>` (renderiza um `<dt>`)
- `<DescriptionListDetails>` (renderiza um `<dd>`)

| Componente               | Variantes/Props                                                         |
| ------------------------ | ----------------------------------------------------------------------- |
| `DescriptionList`        | `layout`: `"horizontal" \| "vertical" \| "grid"` (Padrão: `"vertical"`) |
| `DescriptionListItem`    | —                                                                       |
| `DescriptionListTerm`    | —                                                                       |
| `DescriptionListDetails` | —                                                                       |

---

## Variantes CVA

**`DescriptionList`**:

- `layout`:
  - `vertical`: Itens empilhados (padrão)
  - `horizontal`: Termo à esquerda, detalhes à direita (em telas maiores)
  - `grid`: Grade multicolunas para muitos dados (ex: `grid-cols-2` ou `grid-cols-3`)

---

## Acessibilidade

| Requisito      | Implementação                                      |
| -------------- | -------------------------------------------------- |
| Role semântico | Usa os elementos nativos `<dl>`, `<dt>`, e `<dd>`. |

---

## Stories obrigatórias no Storybook

- [x] `Vertical` (Padrão)
- [x] `Horizontal`
- [x] `Grid`

---

## Checklist antes de implementar

- [x] Usar tags semânticas `<dl>`, `<dt>`, `<dd>`.
- [x] Garantir que o texto do termo seja mais proeminente ou diferente do valor (ex: `text-muted-foreground` no termo, `text-foreground font-medium` no valor).
