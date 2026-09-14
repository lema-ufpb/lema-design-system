# Spec: InlineEdit (ds-inline-edit)

> Spec do componente `InlineEdit` para o LEMA Design System.

---

## Propósito

O `InlineEdit` resolve a necessidade de editar títulos, nomes de projetos, descrições breves ou valores em tabelas diretamente no local de exibição (in-place / click-to-edit), eliminando o atrito de abrir modais ou formulários de página inteira para ajustes rápidos.

**Usar quando:**

- Edição rápida de nomes de arquivos, títulos de simulações, etiquetas e parâmetros em tabelas ou cartões.
- Interfaces administrativas ou de dashboard onde o usuário precisa renomear itens com agilidade.

**Não usar quando:**

- Edição de múltiplos campos dependentes com validação complexa em lote (use um formulário convencional com `FieldGroup`).
- Textos longos formatados com markdown (use `MarkdownEditor`).

**Alternativa se não se aplicar:** `Input`, `FieldGroup`.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/inline-edit.tsx`         |
| Tipo       | `registry:ui`                           |
| Categoria  | `Form`                                  |
| Depende de | `input`, `button`, `spinner`, `ui-i18n` |

---

## API — Props

| Prop          | Tipo                                          | Padrão    | Obrigatória | Descrição                                   |
| ------------- | --------------------------------------------- | --------- | ----------- | ------------------------------------------- |
| `value`       | `string`                                      | —         | ✓           | Valor textual atual                         |
| `onSave`      | `(newValue: string) => void \| Promise<void>` | —         | ✓           | Callback acionado ao salvar o novo valor    |
| `placeholder` | `string`                                      | —         |             | Texto exibido quando vazio                  |
| `validate`    | `(val: string) => string \| undefined`        | —         |             | Função de validação que retorna msg de erro |
| `disabled`    | `boolean`                                     | `false`   |             | Desabilita a edição                         |
| `size`        | `"sm" \| "md" \| "lg"`                        | `"md"`    |             | Escala tipográfica e de altura              |
| `locale`      | `UILocale`                                    | `"pt-BR"` |             | Idioma para mensagens e tooltips            |
| `className`   | `string`                                      | —         |             | Classes customizadas para o wrapper         |

---

## Variantes CVA

```tsx
export const inlineEditViewVariants = cva(
  "group inline-flex cursor-pointer items-center gap-1.5 rounded-md transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "min-h-6 px-1.5 py-0.5 text-xs",
        md: "min-h-8 px-2 py-1 text-sm",
        lg: "min-h-9 px-2.5 py-1.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
```

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                   |
| ----------------------- | ----------------------------------- |
| `text-foreground`       | Valor exibido e texto digitado      |
| `text-muted-foreground` | Placeholder e ícone de caneta lápis |
| `text-destructive`      | Mensagem de erro de validação       |
| `bg-muted/60`           | Hover no modo visualização          |
| `border-input`          | Borda do input no modo edição       |

---

## Escala tipográfica e de tamanho

| Slot        | sm                    | md                    | lg                      |
| ----------- | --------------------- | --------------------- | ----------------------- |
| Texto       | `text-xs font-medium` | `text-sm font-medium` | `text-base font-medium` |
| Ações/ícone | `size-3.5`            | `size-4`              | `size-5`                |
| Input       | `h-7 text-xs`         | `h-8 text-sm`         | `h-9 text-base`         |

---

## Comportamentos e estados

- **Modo visualização:** Exibe o texto com hover discreto e ícone sutil de lápis (`Pencil`). Ao clicar ou pressionar Enter/Espaço, entra no modo de edição.
- **Modo edição:** Input focado automaticamente. Tecla `Enter` aciona o salvamento; `Escape` cancela sem alterações.
- **Salvamento assíncrono:** Exibe `Spinner` durante a execução da Promise retornada por `onSave`.
- **Validação:** Exibe mensagem de erro e marca o input com `data-invalid` caso `validate` retorne erro.
