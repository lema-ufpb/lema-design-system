# Spec: Keyboard Shortcut

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `KeyboardShortcut` (ou `Kbd`) renderiza um ou mais botões/teclas de forma semântica (`<kbd>`) para ensinar atalhos de teclado aos usuários.
**Usar quando:** Em Tooltips, Menus de navegação, Command Palettes ou telas vazias para sugerir um atalho produtivo.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/keyboard-shortcut.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Data Display` / `Productivity`       |
| Depende de | Nenhum                                |

---

## API — Props

| Prop        | Tipo                   | Padrão | Obrigatória | Descrição                                         |
| ----------- | ---------------------- | ------ | ----------- | ------------------------------------------------- |
| `keys`      | `string[]`             | —      | ✓           | Ex: `["command", "k"]`, `["ctrl", "shift", "a"]`. |
| `className` | `string`               | —      |             | Classes para o wrapper geral.                     |
| `size`      | `"sm" \| "md" \| "lg"` | `"sm"` |             | Variante de tamanho (CVA).                        |

> Estender `HTMLAttributes<HTMLSpanElement>`.

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| size     | `sm`, `md`, `lg` | `sm`   |

---

## Tokens de design utilizados

| Token                   | Slot onde é usado           |
| ----------------------- | --------------------------- |
| `bg-muted`              | Fundo da tecla              |
| `text-muted-foreground` | Cor do texto/ícone          |
| `border-border`         | Borda inferior simulando 3D |

---

## Escala tipográfica e de tamanho

| Dimensão | Slot          | sm                | md            | lg            |
| -------- | ------------- | ----------------- | ------------- | ------------- |
| size     | Altura da key | `h-5 text-[10px]` | `h-6 text-xs` | `h-8 text-sm` |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico | Usa a tag `<kbd>`. O leitor de tela precisa ser capaz de ler as teclas. Alguns ícones como "Command" (⌘) podem precisar de `aria-label`. O componente converte nomes descritivos ("command", "shift") nos símbolos no Mac, mas preserva a leitura acessível se não for óbvio. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Várias combinações (Mac vs PC).

---

## Checklist antes de implementar

- [x] Mapear símbolos (Option = ⌥, Shift = ⇧, Command = ⌘, Control = ⌃).
- [x] Aplicar estilo de botão físico com borda `border-b-2`.
