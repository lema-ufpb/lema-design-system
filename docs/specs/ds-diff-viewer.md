# Spec: DiffViewer

## Propósito

Visualizador de diferenças textuais linha a linha entre duas versões de código, documentos ou dados em JSON, com suporte a visualização lado a lado (split) ou unificada (unified).

**Usar quando:** auditorias de alteração, histórico de edições, revisões de configuração ou diffs de código.  
**Não usar quando:** apenas exibir snippets simples e estáticos (use `ds-snippet` ou `ds-copy-block`).  
**Alternativa se não se aplicar:** `ds-snippet`.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/diff-viewer.tsx`             |
| Tipo       | `registry:ui`                               |
| Categoria  | `Data Display/DiffViewer`                   |
| Depende de | `card`, `badge`, `toggle-group`, `skeleton` |

---

## API — Props

| Prop       | Tipo                   | Padrão      | Obrigatória | Descrição                         |
| ---------- | ---------------------- | ----------- | ----------- | --------------------------------- |
| `oldValue` | `string`               | —           | ✓           | Conteúdo original                 |
| `newValue` | `string`               | —           | ✓           | Conteúdo modificado               |
| `mode`     | `"unified" \| "split"` | `"unified"` |             | Modo de visualização              |
| `title`    | `string`               | —           |             | Título no cabeçalho               |
| `maxLines` | `number`               | `0` (todas) |             | Limite de linhas antes de truncar |
| `loading`  | `boolean`              | `false`     |             | Estado de carregamento            |

---

## Tokens de design utilizados

| Token               | Uso                                   |
| ------------------- | ------------------------------------- |
| `bg-success/15`     | Fundo de linhas adicionadas           |
| `text-success`      | Texto e prefixos `+` de adições       |
| `bg-destructive/15` | Fundo de linhas removidas             |
| `text-destructive`  | Texto e prefixos `-` de remoções      |
| `bg-muted`          | Linhas inalteradas e números de linha |

---

## Stories obrigatórias

- [x] `Default` — diff unificado de arquivo de configuração
- [x] `SplitMode` — visualização lado a lado
- [x] `Loading` — skeletons com simulação de diff
- [x] `NoChanges` — arquivos idênticos
