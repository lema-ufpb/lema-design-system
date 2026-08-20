# Spec: Label

> Elemento de rótulo de formulário com estilização automática para estados disabled e peer-disabled.

---

## Propósito

**Usar quando:** Associar um texto descritivo a um input de formulário, com suporte a estados de desabilitação via grupo pai ou peer anterior.

**Não usar quando:** Precisa de um título de seção ou heading — usar `Heading` ou elemento semântico `<hN>`.

**Alternativa:** Texto simples sem vinculação semântica.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ui/label.tsx`              |
| Tipo       | `registry:ui` (name: `label`)          |
| Categoria  | Formulário                             |
| Depende de | `radix-ui` (Label), `@/lib/utils` (cn) |

---

## API — Props

| Prop        | Tipo     | Padrão | Obrigatória | Descrição                |
| ----------- | -------- | ------ | ----------- | ------------------------ |
| `className` | `string` | —      | Não         | Classes adicionais       |
| `htmlFor`   | `string` | —      | Não         | ID do elemento associado |

Demais props propagadas para `LabelPrimitive.Root`.

---

## Tokens de design

| Token          | Slot                                                  |
| -------------- | ----------------------------------------------------- |
| `--foreground` | Cor do texto do label                                 |
| `opacity-50`   | Diminuição de opacidade quando disabled/peer-disabled |

---

## Comportamentos e estados

| Estado               | Comportamento                                             |
| -------------------- | --------------------------------------------------------- |
| Normal               | Exibe o texto do label com cor `--foreground`             |
| Disabled (grupo pai) | Opacidade 50% via `group-data-[disabled=true]:opacity-50` |
| Peer disabled        | Opacidade 50% quando o input anterior está disabled       |

---

## Acessibilidade

| Requisito            | Implementação                        |
| -------------------- | ------------------------------------ |
| Vinculação a input   | `htmlFor` com ID do input alvo       |
| Atributo `data-slot` | `data-slot="label"` no elemento raiz |

---

## Stories obrigatórias

- [x] `Default` — Label vinculado a input de email
- [x] `Disabled` — Label com input disabled

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `className` via `cn()`
- [x] Atributo `data-slot` no elemento raiz
