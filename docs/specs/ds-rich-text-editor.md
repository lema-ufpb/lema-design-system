# Spec: ds-rich-text-editor

> Editor de Texto Rico (Rich Text Editor).

---

## Propósito

Fornecer a estrutura visual e os estilos de um editor WYSIWYG. Como o Design System evita forçar bibliotecas pesadas (ex: TipTap, Lexical) nos consumidores que podem não precisar, o `ds-rich-text-editor` fornece o esqueleto (Toolbar, Botões de Formatação, Container de Conteúdo) que o consumidor pode conectar ao seu próprio estado ou motor de edição.

**Usar quando:** Precisar de campos de texto complexos (ex: descrições longas, artigos).

---

## Localização

| Campo      | Valor                                           |
| ---------- | ----------------------------------------------- |
| Arquivo    | `components/ds/rich-text-editor.tsx`            |
| Tipo       | `registry:ui` (name: `ds-rich-text-editor`)     |
| Categoria  | `Form`                                          |
| Depende de | `button`, `toggle`, `separator`, `lucide-react` |

---

## Estrutura

- `RichTextEditor`: Container principal com bordas e foco.
- `RichTextToolbar`: Barra de ferramentas.
- `RichTextContent`: A área de texto onde o conteúdo é renderizado ou editado.

---

## API — Props

### RichTextEditor

| Prop       | Tipo              | Padrão | Descrição                    |
| ---------- | ----------------- | ------ | ---------------------------- |
| `children` | `React.ReactNode` | —      | Conteúdo (Toolbar e Content) |

### RichTextToolbar

| Prop       | Tipo              | Padrão | Descrição        |
| ---------- | ----------------- | ------ | ---------------- |
| `children` | `React.ReactNode` | —      | Botões / Toggles |

### RichTextContent

| Prop       | Tipo              | Padrão | Descrição                          |
| ---------- | ----------------- | ------ | ---------------------------------- |
| `children` | `React.ReactNode` | —      | Área `contentEditable` ou Textarea |

---

## Acessibilidade

- Os botões da barra de ferramentas devem usar `<Toggle>` com `aria-label` descritivo.
- O editor tem estados de foco (`focus-within:ring`).

---

## Stories obrigatórias no Storybook

- [x] `Default` (Exemplo com barra de ferramentas e área editável simples)

---

## Checklist antes de implementar

- [x] Usar o `Toggle` do shadcn para os botões de Bold, Italic, etc., se disponível, ou `Button variant="ghost"`. Usaremos `Toggle` se estiver na registry (vamos usar `Toggle` se registrado, senão um `Button` com `data-state`).
- [x] Aplicar `focus-within:ring` no container para simular o comportamento de Input.
