# Spec: ds-sticky-feature-list

> Sticky Feature List (lista interativa com painel de mídia fixo).

---

## Propósito

Narrativa de produto interativa: uma lista vertical de itens (título + descrição) seleciona, ao clique/hover de teclado, a mídia exibida em um painel `sticky` do lado oposto. Segue o padrão WAI-ARIA de abas verticais (roving tabindex, `Arrow Up`/`Arrow Down`). Inspirado no bloco "Split values — interactive list + sticky image" do blockus (padrão comum em páginas de produto estilo Stripe/Linear).

**Usar quando:** Seção de features/valores onde cada item tem uma mídia associada (ilustração, screenshot, ícone grande).
**Não usar quando:** Os itens não tiverem mídia associada — use `Accordion` ou uma lista simples. Para navegação por abas horizontal tradicional, use `Tabs`.

---

## Localização

| Campo      | Valor                                                          |
| ---------- | -------------------------------------------------------------- |
| Arquivo    | `components/ds/sticky-feature-list.tsx`                        |
| Tipo       | `registry:ui` (name: `ds-sticky-feature-list`)                 |
| Categoria  | `Layout`                                                       |
| Depende de | — (nenhum primitivo shadcn; mídia é fornecida pelo consumidor) |

---

## API — Props

### `StickyFeatureList` (root — grid 2 colunas em `lg`, contexto)

| Prop            | Tipo                      | Padrão    | Descrição                                       |
| --------------- | ------------------------- | --------- | ----------------------------------------------- |
| `value`         | `string`                  | —         | Item ativo (controlado)                         |
| `defaultValue`  | `string`                  | —         | Item ativo inicial (não controlado)             |
| `onValueChange` | `(value: string) => void` | —         | Callback ao trocar de item                      |
| `label`         | `string`                  | —         | `aria-label` do `tablist`; padrão via `UI_I18N` |
| `locale`        | `UILocale`                | `"en-US"` | Locale do `aria-label` padrão                   |
| `size`          | `"sm" \| "md" \| "lg"`    | `"md"`    | Tamanho tipográfico dos itens                   |

### `StickyFeatureListItem`

| Prop          | Tipo     | Obrigatória | Descrição                   |
| ------------- | -------- | ----------- | --------------------------- |
| `value`       | `string` | ✓           | Identificador único do item |
| `title`       | `string` | ✓           | Título do item              |
| `description` | `string` |             | Descrição curta             |

### `StickyFeatureListPanel`

| Prop    | Tipo     | Obrigatória | Descrição                               |
| ------- | -------- | ----------- | --------------------------------------- |
| `value` | `string` | ✓           | Deve corresponder ao `value` de um item |

### `StickyFeatureListPanels` (wrapper `sticky`)

Sem props próprias além de `React.HTMLAttributes<HTMLDivElement>` — todos os `StickyFeatureListPanel` filhos permanecem montados (com `hidden` no inativo) para que `aria-controls`/`aria-labelledby` sempre resolvam a um elemento real no DOM. Para um estado de carregamento, renderize o painel normalmente com um `<Skeleton>` como conteúdo.

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots:** `stickyFeatureListRootVariants`, `stickyFeatureListItemVariants`, `stickyFeatureListItemTitleVariants`, `stickyFeatureListItemDescriptionVariants`.

---

## Tokens de design utilizados

| Token                   | Slot                              |
| ----------------------- | --------------------------------- |
| `bg-muted`              | item ativo (`data-state=active`)  |
| `bg-accent`             | hover do item inativo             |
| `text-foreground`       | título do item ativo              |
| `text-muted-foreground` | título do item inativo, descrição |
| `ring-ring`             | foco visível                      |

---

## Escala tipográfica e de tamanho

| Slot      | sm        | md          | lg          |
| --------- | --------- | ----------- | ----------- |
| Título    | `text-sm` | `text-base` | `text-lg`   |
| Descrição | `text-xs` | `text-sm`   | `text-base` |

---

## Comportamentos e estados

| Estado                        | Comportamento esperado                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Click no item                 | Ativa o item e seu painel correspondente                                                                                                    |
| `ArrowDown`/`ArrowUp` no item | Move o foco para o próximo/anterior item e já o ativa (ativação automática)                                                                 |
| Sem `value`/`defaultValue`    | O primeiro item registrado é selecionado automaticamente ao montar                                                                          |
| Painel inativo                | Recebe `hidden` (removido da árvore de acessibilidade e do layout), mas permanece no DOM — mantém `aria-controls`/`aria-labelledby` válidos |

---

## Acessibilidade

| Requisito          | Implementação                                                               |
| ------------------ | --------------------------------------------------------------------------- |
| Padrão ARIA        | `role="tablist"` (nav) + `role="tab"` (item) + `role="tabpanel"` (painel)   |
| Roving tabindex    | Apenas o item ativo tem `tabIndex=0`; os demais `tabIndex=-1`               |
| Teclado            | `ArrowUp`/`ArrowDown` — ativação automática (padrão WAI-ARIA APG para tabs) |
| Relação tab↔painel | `aria-controls` no tab, `aria-labelledby` no painel                         |
| i18n               | `UI_I18N[locale].stickyFeatureList.sectionNav` como `aria-label` padrão     |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `Controlled`
- [x] `Loading`
- [x] `Locales`

---

## Checklist antes de implementar

- [x] Escala tipográfica sm/md/lg aplicada
- [x] Tokens semânticos apenas
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
- [x] Navegação por teclado documentada e implementada
- [x] Prop `locale` integrada via `UI_I18N`
