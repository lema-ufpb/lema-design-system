# Spec: Hover Card

> Cartão de informações exibido ao passar o mouse sobre um elemento.

---

## Propósito

Popup rico que exibe conteúdo adicional (como perfil, preview, detalhes) quando o usuário passa o cursor sobre um elemento gatilho.

**Usar quando:** É necessário mostrar informações contextuais sem exigir clique, como preview de perfil, resumo de documento, etc.

**Não usar quando:** O conteúdo deve aparecer ao clicar (use Popover). Para tooltips simples de texto, use Tooltip.

**Alternativa se não se aplicar:** `Tooltip` para texto curto; `Popover` para conteúdo interativo ao clique.

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ui/hover-card.tsx`     |
| Tipo       | `registry:ui` (name: `hover-card`) |
| Categoria  | Feedback / Popover                 |
| Depende de | `radix-ui`                         |

---

## API — Props

| Prop                          | Tipo                               | Padrão     | Obrigatória | Descrição            |
| ----------------------------- | ---------------------------------- | ---------- | ----------- | -------------------- |
| `HoverCard`                   | `HoverCardPrimitive.Root.Props`    | —          | —           | Root do hover card   |
| `HoverCardTrigger`            | `HoverCardPrimitive.Trigger.Props` | —          | —           | Elemento gatilho     |
| `HoverCardContent.align`      | `"start" \| "center" \| "end"`     | `"center"` | —           | Alinhamento do card  |
| `HoverCardContent.sideOffset` | `number`                           | `4`        | —           | Distância do gatilho |
| `HoverCardContent`            | `HoverCardPrimitive.Content.Props` | —          | —           | Conteúdo do card     |

---

## Tokens de design utilizados

| Token                  | Slot                                     |
| ---------------------- | ---------------------------------------- |
| `--popover`            | `HoverCardContent` (fundo)               |
| `--popover-foreground` | Texto do conteúdo                        |
| `--ring` / `--ring/5`  | Borda sutil (`ring-1 ring-foreground/5`) |

---

## Comportamentos e estados

| Estado     | Comportamento                                                     |
| ---------- | ----------------------------------------------------------------- |
| **Hover**  | Card exibido via portal com animação `animate-in fade-in zoom-in` |
| **Leave**  | Card oculto com `animate-out fade-out zoom-out`                   |
| **Aberto** | `w-72` padrão, `rounded-3xl`, `shadow-lg`                         |

---

## Acessibilidade

| Requisito      | Implementação                                  |
| -------------- | ---------------------------------------------- |
| Rolagem nativa | Radix UI gerencia delay de abertura/fechamento |
| ARIA           | Gerenciado pelo Radix UI                       |
| Portal         | Conteúdo via `HoverCardPrimitive.Portal`       |

---

## Stories obrigatórias

- [x] `Default`

---

## Checklist

- [x] Trigger customizável via `asChild`
- [x] Content com `align` e `sideOffset` configuráveis
- [x] Animação de entrada/saída
- [x] Portal para evitar overflow
