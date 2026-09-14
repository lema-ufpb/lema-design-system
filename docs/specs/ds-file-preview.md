# Spec: FilePreview

## Propósito

Componente unificado de pré-visualização de arquivos e anexos. Identifica automaticamente a extensão/MIME type para exibir o ícone contextual e cor temática adequada, tamanho formatado e botões de ação (download, remoção, visualização).

**Usar quando:** listas de anexos, uploads concluídos, cards de documentos ou relatórios gerados.  
**Não usar quando:** necessitar de dropzone para upload interativo (use `ds-file-upload`).  
**Alternativa se não se aplicar:** `ds-file-upload`.

---

## Localização

| Campo      | Valor                            |
| ---------- | -------------------------------- |
| Arquivo    | `components/ds/file-preview.tsx` |
| Tipo       | `registry:ui`                    |
| Categoria  | `Media/FilePreview`              |
| Depende de | `button`, `badge`, `skeleton`    |

---

## API — Props

| Prop         | Tipo                             | Padrão  | Obrigatória | Descrição                    |
| ------------ | -------------------------------- | ------- | ----------- | ---------------------------- |
| `fileName`   | `string`                         | —       | ✓           | Nome completo do arquivo     |
| `fileSize`   | `number`                         | —       |             | Tamanho do arquivo em bytes  |
| `fileType`   | `string`                         | —       |             | MIME type explícito          |
| `previewUrl` | `string`                         | —       |             | URL para thumbnail ou prévia |
| `size`       | `"sm" \| "md" \| "lg"`           | `"md"`  |             | Tamanho visual do componente |
| `variant`    | `"card" \| "row" \| "thumbnail"` | `"row"` |             | Variante de layout           |
| `onDownload` | `() => void`                     | —       |             | Ação de download             |
| `onRemove`   | `() => void`                     | —       |             | Ação de remoção              |
| `onPreview`  | `() => void`                     | —       |             | Ação de abrir visualizador   |

---

## Stories obrigatórias

- [x] `Default` — linha de arquivo PDF com botões de download e remoção
- [x] `AllSizes` — sm, md, lg
- [x] `AllFileTypes` — lista demonstrando PDF, PNG, XLSX, MP4, TSX, ZIP
- [x] `WithImageThumbnail` — preview com miniatura de imagem
- [x] `Loading` — skeletons de arquivo
