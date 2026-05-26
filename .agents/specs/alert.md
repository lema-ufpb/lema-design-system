# Spec: Alert

> Um banner de notificação contextual para exibir mensagens de feedback, avisos, erros ou dicas informativas.

---

## Propósito

O Alert fornece um contêiner estilizado com função de `role="alert"` para comunicar informações importantes ao usuário sem interromper o fluxo. Suporta duas variantes visuais — `default` (neutro) e `destructive` (erro) — controladas via CVA. Aceita um ícone opcional como primeiro filho, que ativa um layout de grid de duas colunas com o título e a descrição. O slot `AlertAction` permite posicionar elementos absolutos (como botão de fechar) no canto superior direito. É um componente puramente visual (sem estado), ideal para mensagens estáticas em formulários, painéis e notificações in-page.

**Usar quando:** Necessário exibir feedback contextual imediato: validação de formulário, atualizações de sistema, avisos de segurança ou erros de operação. O Alert substitui banners estáticos e mensagens de estado dentro do conteúdo.

**Não usar quando:** A mensagem precisa persistir ou ser acionada por evento assíncrono (usar Sonner/Toast). Para modais de confirmação, usar `AlertDialog`. Evitar para notificações que desaparecem automaticamente.

**Alternativa se não se aplicar:** `Sonner` para toasts globais, `AlertDialog` para confirmações críticas modais, `Empty` para estados vazios sem mensagens de erro.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/alert.tsx` |
| Tipo | `registry:ui` (name: `alert`) |
| Categoria | Feedback / Notification |
| Depende de | Nenhuma |

---

## API — Props

### Alert
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | `"default" \| "destructive"` | `"default"` | Não | Variante visual |
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Não | Conteúdo (ícone + título + descrição + ação) |

### AlertTitle
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Não | Texto do título |

### AlertDescription
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Não | Texto descritivo |

### AlertAction
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Não | Elemento de ação (ex: botão) |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--card` | Fundo do alert (ambas variantes) |
| `--card-foreground` | Cor do texto na variante default |
| `--destructive` | Cor do texto do título e ícone na variante destructive |
| `--destructive/90` | Cor do texto da descrição na variante destructive |
| `--muted-foreground` | Cor do texto da descrição na variante default |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Padrão (default) | Fundo `bg-card`, texto `text-card-foreground`, descrição `text-muted-foreground` |
| Destrutivo (destructive) | Título/ícone em `text-destructive`, descrição em `text-destructive/90` |
| Com ícone | Ativa layout grid de 2 colunas (`has-[>svg]:grid-cols-[auto_1fr]`), ícone ocupa 2 linhas |
| Sem ícone | Layout padrão empilhado verticalmente |
| Com ação | Padding direito aumenta via `has-data-[slot=alert-action]:pr-18` |
| Links | `AlertTitle` e `AlertDescription` aplicam `underline` e `underline-offset-3` em links |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role alert | `role="alert"` no container principal |
| Anúncio automático | Leitores de tela anunciam o conteúdo automaticamente ao renderizar |
| Contraste de cor | Variante destructive usa `text-destructive` para título (deve ter contraste suficiente) |
| Estrutura semântica | Título como `div` com `font-medium`, descrição como `div` separada |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Alerta informativo com ícone Terminal, título e descrição
- [x] `Variants` — Comparação lado a lado entre default e destructive
- [x] `WithAction` — Alerta com slot de ação (botão ghost de fechar)
- [x] `Destructive` — Variante destrutiva com ícone TriangleAlert
- [x] `WithoutIcon` — Alerta sem ícone, apenas título e descrição

---

## Checklist antes de implementar

- [x] Escala tipográfica — título `font-medium` (sem escala definida), descrição `text-sm`
- [x] Tokens semânticos — `card`, `card-foreground`, `destructive`, `muted-foreground`
- [x] Grid responsivo — ícone como primeiro filho ativa grid, `row-span-2` para o ícone
- [x] Espaçamento — `px-4 py-3` com `gap-0.5`, ação posicionada em `top-2.5 right-3`
- [x] Borda — `rounded-2xl border` no container
