# Spec: SankeyChart

## Propósito

Visualiza fluxos, transferências de valores ou distribuição de tráfego entre múltiplos nós interconectados em estágios sequenciais.

**Usar quando:** mapear jornadas de usuários, migração de clientes entre planos, orçamentos governamentais ou alocação de energia.  
**Não usar quando:** não houver relação direta de origem e destino (use FunnelChart ou BarChart).  
**Alternativa se não se aplicar:** `ds-funnel-chart`.

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/sankey-chart.tsx`                       |
| Tipo       | `registry:ui`                                          |
| Categoria  | `Charts/SankeyChart`                                   |
| Depende de | `chart`, `skeleton`, `card`, `ui-i18n`, `format-utils` |

---

## API — Props

| Prop             | Tipo                    | Padrão  | Obrigatória | Descrição                         |
| ---------------- | ----------------------- | ------- | ----------- | --------------------------------- |
| `data`           | `SankeyData`            | —       | ✓           | Nós e links conectando origens    |
| `title`          | `string`                | —       |             | Título do card                    |
| `subtitle`       | `string`                | —       |             | Subtítulo descritivo              |
| `footer`         | `ReactNode`             | —       |             | Conteúdo do rodapé                |
| `height`         | `number`                | `400`   |             | Altura do gráfico em px           |
| `valueFormatter` | `(v: number) => string` | —       |             | Formatador customizado de valor   |
| `loading`        | `boolean`               | `false` |             | Estado de carregamento (skeleton) |
| `className`      | `string`                | —       |             | Classes extras                    |

---

## Tokens de design utilizados

| Token             | Uso                               |
| ----------------- | --------------------------------- |
| `bg-card`         | Fundo do card container           |
| `border`          | Borda do card                     |
| `--chart-1..5`    | Nós e fluxos conectados           |
| `text-foreground` | Rótulos de nós                    |
| `bg-muted`        | Fundo do skeleton de carregamento |

---

## Stories obrigatórias

- [x] `Default` — fluxo de tráfego e conversão em website
- [x] `Loading` — `loading={true}`
- [x] `ComplexFlow` — fluxo multinível com 8 nós
- [x] `EmptyData` — `data={ nodes: [], links: [] }`
