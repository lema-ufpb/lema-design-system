# Spec: AlertDialog

> Um diálogo modal que interrompe o usuário para confirmar ações ou transmitir informações críticas.

---

## Propósito

O AlertDialog é um modal de confirmação construído sobre `AlertDialogPrimitive` da Radix UI. Interrompe o fluxo atual com uma sobreposição semi-transparente (backdrop) e exibe conteúdo centralizado com animação de zoom. Suporta dois tamanhos: `default` (com header alinhado à esquerda em desktop e centralizado em mobile) e `sm` (layout mais compacto com footer em grid de 2 colunas). Inclui slot `AlertDialogMedia` para ícone/ilustração circular com fundo `bg-muted`. Os botões Action e Cancel são wrappers do componente `Button` primitivo, herdando suas variantes e tamanhos. O título usa a fonte `--font-heading` para destaque tipográfico.

**Usar quando:** Necessário confirmar ações destrutivas ou irreversíveis (deletar, descartar, sair sem salvar). Ideal para situações que exigem atenção explícita do usuário antes de prosseguir.

**Não usar quando:** Apenas exibir informação não-crítica (usar `Alert`). Para diálogos com formulários ou conteúdo extenso, usar `Dialog`. Evitar para confirmações simples que podem ser inline (ex: toggle switch com confirmação).

**Alternativa se não se aplicar:** `Dialog` para conteúdo mais rico, `Alert` para notificações não-interruptivas, `Sheet` para ações contextuais sem bloqueio total.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/alert-dialog.tsx` |
| Tipo | `registry:ui` (name: `alert-dialog`) |
| Categoria | Overlay / Modal |
| Depende de | `button` |

---

## API — Props

### AlertDialog (Root)
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `defaultOpen` | `boolean` | — | Não | Abre o diálogo por padrão |
| `open` | `boolean` | — | Não | Estado controlado |
| `onOpenChange` | `(open: boolean) => void` | — | Não | Callback de abertura/fechamento |

### AlertDialogContent
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `size` | `"default" \| "sm"` | `"default"` | Não | Preset de tamanho que ajusta layout do header/footer |
| `className` | `string` | — | Não | Classes adicionais |

### AlertDialogAction
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"` | `"default"` | Não | Variante do Button |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| ...` | `"default"` | Não | Tamanho do Button |

### AlertDialogCancel
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `variant` | `"default" \| ...` | `"outline"` | Não | Variante do Button |
| `size` | `"default" \| ...` | `"default"` | Não | Tamanho do Button |

### AlertDialogMedia, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription
Props padrão de `div` (ou `AlertDialogPrimitive.Title`/`Description`) com `className`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--background` | Overlay (`bg-black/30`) |
| `--popover` | Fundo do conteúdo do diálogo |
| `--popover-foreground` | Cor do texto primário |
| `--muted` | Fundo do slot media (ícone circular) |
| `--muted-foreground` | Cor da descrição |
| `--font-heading` | Fonte do título (`font-heading`) |
| `--foreground` | Anel sutil no conteúdo (`ring-foreground/5`) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Aberto | Conteúdo centralizado com animação `zoom-in-95`; overlay visível com `fade-in` |
| Fechado | Animação `zoom-out-95` + `fade-out` |
| Default (size default) | `max-w-xs` em mobile, `max-w-md` em `sm:`; header `place-items-start` em desktop |
| Small (size sm) | `max-w-xs`; footer em `grid-cols-2`; layout mais compacto |
| Com media | Header ajusta grid para `grid-rows-[auto_auto_1fr]`; media ocupa `row-span-2` em desktop |
| Focus visible | Botões Action/Cancel herdam focus ring do Button |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| WAI-ARIA Dialog | Herdado da Radix: `role="alertdialog"`, `aria-describedby`, `aria-labelledby` |
| Foco armadilhado | Foco fica dentro do modal enquanto aberto (Radix) |
| Fechamento com Escape | Comportamento padrão da Radix |
| Overlay clicável | Não fecha ao clicar no overlay (comportamento AlertDialog) |
| Navegação por Tab | Ordem lógica entre Cancel e Action |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Diálogo com media (ícone de aviso), título, descrição, Cancel e Delete
- [x] `WithoutMedia` — Diálogo sem slot media para confirmações mais leves
- [x] `Small` — Versão compacta com `size="sm"`

---

## Checklist antes de implementar

- [ ] Escala tipográfica — título `text-lg font-medium font-heading`, descrição `text-sm`
- [ ] Tokens semânticos — `popover`, `popover-foreground`, `muted`, `muted-foreground`, `font-heading`
- [ ] Overlay — suporte a `backdrop-blur-sm` via `supports-backdrop-filter`
- [ ] Animações — `animate-in`/`animate-out` com `fade-in-0`/`zoom-in-95`
- [ ] Responsividade — header centralizado em mobile, alinhado à esquerda em desktop (size default)
- [ ] Botões — `AlertDialogAction` e `AlertDialogCancel` usam `Button` com `asChild`
