# Spec: ButtonGroup

> Um contêiner de layout que agrupa visualmente botões relacionados com bordas mescladas ou separadas.

---

## Propósito

O ButtonGroup agrupa múltiplos botões e inputs relacionados em um único bloco visual coeso, mesclando bordas adjacentes para criar uma aparência unificada. Construído com CVA, suporta orientação `horizontal` (padrão) e `vertical`. Inclui o subcomponente `ButtonGroupText` para rótulos estáticos (segmentos de texto não-clicáveis com fundo `bg-muted`) e `ButtonGroupSeparator` para separadores visuais entre grupos lógicos (wrapper do `Separator` primitivo). Os botões filhos têm bordas automaticamente ajustadas: o primeiro filho tem `rounded-l-4xl`, o último `rounded-r-4xl`, e os do meio perdem bordas internas para evitar duplicação. Componentes como `Combobox` (Select), `InputGroup` e `Input` também são suportados como filhos, integrando-se ao sistema de bordas do grupo.

**Usar quando:** Ferramentas de formatação (toolbars), grupos de ações relacionadas (CRUD, filtros), combinações de input+botão (busca, quantidade), ou segmentos de toggle agrupados.

**Não usar quando:** Os botões são ações independentes não-relacionadas (usar `flex gap-*` simples). Evitar para ações primárias isoladas (usar `Button` sozinho).

**Alternativa se não se aplicar:** `flex gap-*` para botões independentes, `ToggleGroup` para seleção mutuamente exclusiva, `InputGroup` para combinações de input+botão estilizadas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/button-group.tsx` |
| Tipo | `registry:ui` (name: `button-group`) |
| Categoria | Layout |
| Depende de | `separator` |

---

## API — Props

### ButtonGroup
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Não | Direção do layout |
| `className` | `string` | — | Não | Classes adicionais |

### ButtonGroupText
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `asChild` | `boolean` | `false` | Não | Renderiza como Slot |
| `className` | `string` | — | Não | Classes adicionais |

### ButtonGroupSeparator
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Não | Orientação do separador |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--border` | Bordas externas e entre elementos do grupo |
| `--muted` | Fundo do `ButtonGroupText` |
| `--input` | Cor do separador (`ButtonGroupSeparator`) |
| `--ring` | Focus ring no filho focado (`focus-visible:z-10`) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Horizontal (padrão) | Filhos lado a lado; primeiro `rounded-l-4xl`, último `rounded-r-4xl`; `border-l-0` nos seguintes |
| Vertical | Filhos empilhados; primeiro `rounded-t-4xl`, último `rounded-b-4xl`; `border-t-0` nos seguintes |
| Focus visible | Filho focado recebe `z-10` para sobrepor bordas adjacentes |
| Com ButtonGroupText | Segmento estático com fundo `bg-muted` e `rounded-4xl` |
| Com Separator | Separador vertical/horizontal com cor `bg-input` e altura/largura automática |
| Com outline buttons | Bordas sincronizadas via `has-[>[data-variant=outline]]` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Role group | `role="group"` no container |
| Orientação | `data-orientation` para contexto |
| Focus visible | `focus-visible:relative focus-visible:z-10` nos filhos para sobreposição de anéis |
| Separação semântica | Separadores têm `role="presentation"` herdado do `Separator` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Grupo horizontal com botões outline de formatação
- [x] `WithSeparator` — Dois grupos separados por divisor visual
- [x] `Vertical` — Grupo empilhado verticalmente
- [x] `WithTextSegment` — Combinação de rótulo estático + botão de ação
- [x] `IconOnly` — Grupo compacto com botões icon-sm

---

## Checklist antes de implementar

- [ ] Bordas mescladas — first-child `rounded-l-4xl`, last-child `rounded-r-4xl`; `border-l-0` nos seguintes
- [ ] Orientação vertical — análogo com `rounded-t-4xl`/`rounded-b-4xl` e `border-t-0`
- [ ] Focus stacking — `focus-visible:relative focus-visible:z-10` para evitar corte do ring
- [ ] Separator — `self-stretch` com `bg-input` e margens automáticas `mx-px`/`my-px`
- [ ] Text segment — `rounded-4xl border bg-muted` com `text-sm font-medium`
