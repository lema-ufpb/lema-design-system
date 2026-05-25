# Spec: Collapsible

> Uma seção expansível que alterna a visibilidade do conteúdo usando um elemento de gatilho.

---

## Propósito

O Collapsible é um componente de disclosure simples que permite expandir/recolher uma região de conteúdo através de um trigger. Construído sobre `CollapsiblePrimitive` da Radix UI, é composto por três subcomponentes: `Collapsible` (root com estado), `CollapsibleTrigger` (elemento clicável que alterna a abertura) e `CollapsibleContent` (região que anima entrada/saída). Diferente do Accordion, o Collapsible é independente — não há relação entre múltiplos collapsibles no mesmo layout. O trigger pode ser qualquer elemento (botão, ícone, texto) usando `asChild`. O componente não aplica estilos próprios significativos além dos `data-slot`, deixando a estilização visual para o consumidor. É o componente mais leve da família disclosure.

**Usar quando:** Seções de conteúdo que podem ser ocultadas para economizar espaço: filtros laterais, configurações avançadas, notas expandíveis, painéis de ajuda contextual.

**Não usar quando:** Múltiplos itens precisam ser agrupados com apenas um aberto por vez (usar `Accordion`). Para navegação hierárquica, usar `Sidebar` ou `NavigationMenu`.

**Alternativa se não se aplicar:** `Accordion` para grupos relacionados (FAQ, listas aninhadas), `Tabs` para alternar entre visões, `Sheet` para painéis deslizantes com conteúdo mais pesado.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/collapsible.tsx` |
| Tipo | `registry:ui` (name: `collapsible`) |
| Categoria | Layout / Disclosure |
| Depende de | Nenhuma |

---

## API — Props

### Collapsible (Root)
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `open` | `boolean` | — | Não | Estado controlado |
| `defaultOpen` | `boolean` | — | Não | Estado inicial |
| `onOpenChange` | `(open: boolean) => void` | — | Não | Callback de alternância |
| `className` | `string` | — | Não | Classes adicionais |
| `disabled` | `boolean` | — | Não | Desabilita interação |

### CollapsibleTrigger
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `asChild` | `boolean` | — | Não | Renderiza como elemento filho |
| `className` | `string` | — | Não | Classes adicionais |

### CollapsibleContent
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Sim | Conteúdo colapsável |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| *(nenhum)* | Componente delega estilo ao consumidor; nenhum token diretamente |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Fechado | `CollapsibleContent` oculto via animação Radix (`data-closed`) |
| Aberto | `CollapsibleContent` visível via animação Radix (`data-open`) |
| Trigger | `group-data-open/collapsible` disponível para estilizar filhos (ex: rotacionar ícone) |
| Disabled | Trigger não responde a clique |
| Transição | Radix gerencia `enter`/`exit` animations |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| WAI-ARIA Disclosure | Radix fornece `aria-expanded` e `aria-controls` no trigger |
| Navegação por teclado | Enter/Space para alternar (Radix) |
| Foco | Trigger focável via Tab |
| Estado de abertura | `data-open`/`data-closed` para estilização |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Collapsible com trigger outline, chevron animado e conteúdo estilizado

---

## Checklist antes de implementar

- [ ] Estado — `open`, `defaultOpen`, `onOpenChange` gerenciados pela Radix
- [ ] Trigger — `asChild` para composição com Button, IconButton, etc.
- [ ] Animação — Chevron rotaciona `180deg` via `group-data-open/collapsible:rotate-180`
- [ ] Estilo — Nenhum estilo próprio no componente; consumidor gerencia aparência
- [ ] Semântica — `data-slot` em cada subcomponente para rastreamento
