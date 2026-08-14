# Spec: Badge

> Um pequeno indicador visual para categorização, contagens ou rótulos de status.

---

## Propósito

O Badge é um elemento de interface compacto que comunica status, categorias ou métricas secundárias de forma rápida e não-intrusiva. Construído com CVA, oferece seis variantes semânticas: `default`, `secondary`, `destructive`, `outline`, `ghost` e `link`. Suporta ícones posicionados via `data-icon="inline-start"` / `data-icon="inline-end"` com padding ajustado automaticamente. Pode ser renderizado como link ou outro elemento filho através de `asChild` (usando `Slot.Root` da Radix UI). Tem altura fixa de `h-5` (20px) com `text-xs`, tamanho de fonte consistente independente da variante.

**Usar quando:** Necessário rotular status (ativo, pendente, concluído), exibir contagens (notificações, itens no carrinho) ou categorizar elementos visualmente em tabelas, cards e listas.

**Não usar quando:** O rótulo precisa ser um elemento interativo primário (usar `Button`). Para indicadores de risco com múltiplos níveis, usar componentes específicos como `RiskLevelBar`. Evitar para texto longo que pode ultrapassar a altura do badge.

**Alternativa se não se aplicar:** `Button` com `variant="link"` para ações rotuladas, `Alert` para mensagens contextuais, `Kbd` para atalhos de teclado.

---

## Localização

| Campo      | Valor                         |
| ---------- | ----------------------------- |
| Arquivo    | `components/ui/badge.tsx`     |
| Tipo       | `registry:ui` (name: `badge`) |
| Categoria  | Data Display                  |
| Depende de | Nenhuma                       |

---

## API — Props

| Prop        | Tipo                                                                          | Padrão      | Obrigatória | Descrição                              |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ----------- | -------------------------------------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | Não         | Variante visual                        |
| `asChild`   | `boolean`                                                                     | `false`     | Não         | Renderiza como elemento filho via Slot |
| `className` | `string`                                                                      | —           | Não         | Classes adicionais                     |
| `children`  | `ReactNode`                                                                   | —           | Não         | Conteúdo do badge                      |

---

## Tokens de design utilizados

| Token                            | Slot onde é usado                                                 |
| -------------------------------- | ----------------------------------------------------------------- |
| `--primary`                      | Fundo da variante default                                         |
| `--primary-foreground`           | Texto da variante default                                         |
| `--secondary`                    | Fundo da variante secondary                                       |
| `--secondary-foreground`         | Texto da variante secondary                                       |
| `--destructive`                  | Texto e background translúcido da variante destructive            |
| `--border`                       | Borda da variante outline                                         |
| `--muted` / `--muted-foreground` | Hover da variante ghost/outline quando âncora                     |
| `--ring`                         | Focus ring (`focus-visible:border-ring focus-visible:ring-[3px]`) |

---

## Comportamentos e estados

| Estado                 | Comportamento esperado                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| Default                | Fundo `bg-primary`, texto `text-primary-foreground`                                      |
| Secondary              | Fundo `bg-secondary`, texto `text-secondary-foreground`                                  |
| Destructive            | Texto `text-destructive`, fundo `bg-destructive/10` (light) / `bg-destructive/20` (dark) |
| Outline                | Borda `border-border`, texto `text-foreground`, hover com `bg-muted`                     |
| Ghost                  | Fundo transparente, `hover:bg-muted hover:text-muted-foreground`                         |
| Link                   | Texto `text-primary` com `hover:underline`                                               |
| Com ícone inline-start | Padding esquerdo reduzido via `has-data-[icon=inline-start]:pl-1.5`                      |
| Com ícone inline-end   | Padding direito reduzido via `has-data-[icon=inline-end]:pr-1.5`                         |
| Focus visible          | `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`          |
| Aria-invalid           | Borda e ring em `--destructive`                                                          |

---

## Acessibilidade

| Requisito        | Implementação                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| Contraste de cor | Variantes usam `bg-primary`/`text-primary-foreground` para legibilidade         |
| Focus visible    | `focus-visible:border-ring focus-visible:ring-[3px]` para navegação por teclado |
| asChild          | Permite renderizar como `<a>` para links semânticos                             |
| Ícones           | `pointer-events-none` nos SVGs para não interferir na interação                 |
| Aria-invalid     | Suporte a `aria-invalid` com estilos destrutivos                                |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Badge primary com label "Badge"
- [x] `Variants` — Todas as seis variantes lado a lado
- [x] `WithIcon` — Badges com ícones inline-start e inline-end
- [x] `AsChild` — Badge renderizado como link `<a>`

---

## Checklist antes de implementar

- [x] Escala tipográfica — `text-xs font-medium`
- [x] Tokens semânticos — `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `destructive`, `border`, `muted`, `muted-foreground`
- [x] Altura fixa — `h-5` com `px-2 py-0.5`
- [x] Ícones — `size-3!` para SVGs, padding automático via `data-icon`
- [x] Borda arredondada — `rounded-3xl` para aparência de pill
- [x] Focus ring — `focus-visible:border-ring focus-visible:ring-[3px]`
