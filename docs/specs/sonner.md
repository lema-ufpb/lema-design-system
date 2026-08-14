# Spec: Sonner (Toaster)

> Sistema de notificações toast que se adapta automaticamente ao tema via `next-themes`.

---

## Propósito

**Usar quando:** É necessário exibir notificações temporárias de sucesso, erro, aviso, informação ou carregamento para o usuário.

**Não usar quando:** A comunicação exige ação obrigatória do usuário (usar Dialog ou Alert Dialog). A mensagem é persistente e importante (usar Banner).

**Alternativa:** Alert Dialog para ações críticas, Inline Alert para validação em formulário.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ui/sonner.tsx`              |
| Tipo       | `registry:ui` (name: `sonner`)          |
| Categoria  | Feedback / Notificação                  |
| Depende de | `sonner`, `next-themes`, `lucide-react` |

---

## API — Props

| Prop       | Tipo                    | Padrão | Obrigatória | Descrição                                                   |
| ---------- | ----------------------- | ------ | ----------- | ----------------------------------------------------------- |
| `...props` | `ToasterProps` (sonner) | —      | Não         | Props do `<Toaster>` do sonner (position, richColors, etc.) |

O componente não expõe props adicionais. As props restantes são herdadas do `<Sonner>` (sonner).

---

## Tokens de design

| Token                  | Slot                               |
| ---------------------- | ---------------------------------- |
| `--popover`            | Fundo do toast (`--normal-bg`)     |
| `--popover-foreground` | Texto do toast (`--normal-text`)   |
| `--border`             | Borda do toast (`--normal-border`) |
| `--radius`             | Arredondamento (`--border-radius`) |

---

## Comportamentos e estados

| Estado            | Comportamento                                                  |
| ----------------- | -------------------------------------------------------------- |
| **Default**       | Toast simples com título                                       |
| **Success**       | Ícone `CircleCheckIcon` + `toast.success()`                    |
| **Info**          | Ícone `InfoIcon` + `toast.info()`                              |
| **Warning**       | Ícone `TriangleAlertIcon` + `toast.warning()`                  |
| **Error**         | Ícone `OctagonXIcon` + `toast.error()`                         |
| **Loading**       | Ícone `Loader2Icon` com `animate-spin` + `toast.loading()`     |
| **Com descrição** | Toast com título + texto de descrição secundário               |
| **Dismissable**   | Auto-dismiss via `duration` (ms) ou `Infinity` para sticky     |
| **Tema**          | Adapta-se automaticamente ao tema do sistema via `next-themes` |

---

## Acessibilidade

| Requisito      | Implementação                                            |
| -------------- | -------------------------------------------------------- |
| Região de live | Sonner usa `role="status"` e `aria-live="polite"`        |
| Foco           | Toast não rouba foco; ações dentro do toast são focáveis |
| Fechamento     | Pode ser fechado por botão de close nativo do Sonner     |

---

## Stories obrigatórias

- [x] `Default` — botões para trigger de toast básico e com descrição
- [x] `Variants` — success, info, warning, error
- [x] `Loading` — loading com atualização para success após 2s
- [x] `Dismissable` — auto-dismiss (3s) e sticky (Infinity)

---

## Checklist

- [x] Componente implementado em `sonner.tsx`
- [x] Stories implementadas (Default, Variants, Loading, Dismissable)
- [x] Integração com `next-themes` para tema automático
- [x] Ícones customizados (success, info, warning, error, loading)
- [x] Mapeamento de tokens `--popover`, `--border`, `--radius`
- [x] Usa classe `cn-toast` via `toastOptions.classNames`
