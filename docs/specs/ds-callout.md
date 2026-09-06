# Spec: ds-callout

> Callout (Alerta Destacado).

---

## Propósito

Destacar uma informação importante, como avisos, dicas, sucesso ou mensagens de erro. É uma abstração de alto nível sobre o primitivo `components/ui/alert.tsx`, injetando ícones e tokens de cor automaticamente conforme a variante semântica.

**Usar quando:** Você precisa de um bloco chamativo no meio do conteúdo (ex: documentação, painéis, onboarding).
**Não usar quando:** For uma notificação temporária no canto da tela (use `Sonner`/`Toast`).

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/callout.tsx`        |
| Tipo       | `registry:ui` (name: `ds-callout`) |
| Categoria  | `Data Display`                     |
| Depende de | `alert`, `lucide-react`            |

---

## API — Props

| Prop       | Tipo                                                             | Padrão      | Obrigatória | Descrição                                               |
| ---------- | ---------------------------------------------------------------- | ----------- | ----------- | ------------------------------------------------------- |
| `title`    | `string`                                                         | —           |             | Título do callout                                       |
| `children` | `React.ReactNode`                                                | —           | Sim         | Corpo (descrição) do callout                            |
| `variant`  | `"default" \| "info" \| "success" \| "warning" \| "destructive"` | `"default"` |             | Variante semântica visual                               |
| `icon`     | `React.ReactNode`                                                | —           |             | Ícone opcional (sobrescreve o ícone padrão da variante) |

---

## Variantes CVA

- `calloutVariants` baseia-se em `variant` para injetar cores de fundo, borda e texto, respeitando os tokens definidos em `app/globals.css`.

| Variante      | Cores (Tailwind/Tokens)                                 | Ícone Padrão        |
| ------------- | ------------------------------------------------------- | ------------------- |
| `default`     | `bg-muted`                                              | Nenhum              |
| `info`        | bg/border/text com base no highlight/blue               | `InfoIcon`          |
| `success`     | `border-success text-success bg-success/10`             | `CheckCircleIcon`   |
| `warning`     | `border-warning text-warning bg-warning/10`             | `AlertTriangleIcon` |
| `destructive` | `border-destructive text-destructive bg-destructive/10` | `AlertCircleIcon`   |

_(Nota: como o `globals.css` não exporta variantes info/success diretas no `Alert`, o `ds-callout` define essas classes em seu CVA)._

---

## Acessibilidade

- Utiliza `role="alert"` (fornecido pelo `Alert` do shadcn).
- Ícones usam `aria-hidden="true"`.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `Info`
- [x] `Success`
- [x] `Warning`
- [x] `Destructive`
- [x] `CustomIcon`

---

## Checklist antes de implementar

- [x] Mapear corretamente os ícones para as variantes.
- [x] Aplicar `text-success`, `text-warning`, `text-destructive` que estão nas regras (tokens de cor explícitos).
