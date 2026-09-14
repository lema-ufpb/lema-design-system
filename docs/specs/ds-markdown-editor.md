# Spec: MarkdownEditor

## Propósito

Editor e visualizador de Markdown com barra de ferramentas rica (negrito, itálico, listas, links, código, blocos de citação) e alternância entre modos de edição, pré-visualização ou divisão lado a lado (split view).

**Usar quando:** criação de conteúdo técnico, documentação, tickets de suporte, artigos ou anotações em Markdown.  
**Não usar quando:** exigir formatação visual pura tipo Word/WYSIWYG sem conhecimento de markdown (use `ds-rich-text-editor`).  
**Alternativa se não se aplicar:** `ds-rich-text-editor`.

---

## Localização

| Campo      | Valor                                     |
| ---------- | ----------------------------------------- |
| Arquivo    | `components/ds/markdown-editor.tsx`       |
| Tipo       | `registry:ui`                             |
| Categoria  | `Form/MarkdownEditor`                     |
| Depende de | `button`, `tabs`, `separator`, `skeleton` |

---

## API — Props

| Prop          | Tipo                             | Padrão    | Obrigatória | Descrição                      |
| ------------- | -------------------------------- | --------- | ----------- | ------------------------------ |
| `value`       | `string`                         | —         |             | Conteúdo markdown              |
| `onChange`    | `(value: string) => void`        | —         |             | Callback acionado na alteração |
| `placeholder` | `string`                         | —         |             | Texto de placeholder           |
| `height`      | `number`                         | `360`     |             | Altura da área de edição em px |
| `mode`        | `"edit" \| "preview" \| "split"` | `"split"` |             | Modo de exibição               |
| `showToolbar` | `boolean`                        | `true`    |             | Exibir barra de ferramentas    |
| `disabled`    | `boolean`                        | `false`   |             | Estado desabilitado            |
| `loading`     | `boolean`                        | `false`   |             | Estado de carregamento         |

---

## Stories obrigatórias

- [x] `Default` — split mode com preview de markdown renderizado
- [x] `EditMode` — apenas editor de texto
- [x] `PreviewOnly` — modo leitura
- [x] `Loading` — skeletons de toolbar e área de texto
- [x] `Disabled` — estado desabilitado
