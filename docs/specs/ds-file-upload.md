# Spec: FileUpload

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/file-upload.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Permite que o usuário selecione um arquivo (ou vários) arrastando-o para uma área (dropzone) ou clicando nela. Exibe o progresso de upload ou o arquivo selecionado.

**Usar quando:** O usuário precisar enviar arquivos (imagens, documentos) como parte de um fluxo.
**Não usar quando:** For apenas entrada de texto (use `Input`).

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ds/file-upload.tsx`      |
| Tipo       | `registry:ui`                        |
| Categoria  | `Form`                               |
| Depende de | `lucide-react`, `Button`, `Progress` |

---

## API — Props

| Prop        | Tipo                   | Padrão  | Obrigatória | Descrição                                     |
| ----------- | ---------------------- | ------- | ----------- | --------------------------------------------- |
| `onUpload`  | `(file: File) => void` | —       | ✓           | Ação após seleção.                            |
| `accept`    | `string`               | `"*/*"` |             | Extensões permitidas (ex: `"image/*, .pdf"`). |
| `maxSizeMB` | `number`               | `10`    |             | Tamanho máximo em MB.                         |
| `progress`  | `number`               | —       |             | Progresso do upload (0 a 100).                |
| `disabled`  | `boolean`              | `false` |             | Se desabilitado.                              |
| `locale`    | `UILocale`             | `pt-BR` |             | Idioma para mensagens da UI.                  |

---

## Variantes CVA

| Slot       | Variantes                                         |
| ---------- | ------------------------------------------------- |
| `dropzone` | `isDragActive` (borda primária e fundo destacado) |
| `size`     | `sm`, `md`                                        |

---

## Tokens de design utilizados

| Token                         | Slot onde é usado        |
| ----------------------------- | ------------------------ |
| `border-dashed border-border` | Borda padrão da dropzone |
| `bg-muted`                    | Fundo no hover / drag    |
| `text-primary`                | Ícone em foco            |

---

## Acessibilidade

| Requisito    | Implementação                                                     |
| ------------ | ----------------------------------------------------------------- |
| Teclado      | Área focável via Tab. Enter/Space abre seletor.                   |
| Input nativo | Um `<input type="file" />` oculto (`sr-only`) gerencia a seleção. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Dropzone normal.
- [x] `Disabled` — Desabilitado.
- [x] `Uploading` — Com progresso definido.
