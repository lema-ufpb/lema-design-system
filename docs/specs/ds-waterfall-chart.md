# Spec: WaterfallChart

## Propósito

Visualiza o efeito cumulativo de valores sequenciais positivos e negativos que levam de um valor inicial a um valor final (ex: demonstrações de resultado / DRE financeiro, fluxo de caixa, decomposição de métricas).

**Usar quando:** detalhar ganhos e perdas intermediárias até um total líquido ou comparar variações orçamentárias.  
**Não usar quando:** comparar séries temporais simples (use LineChart) ou proporções de um todo estático (use PieChart).  
**Alternativa se não se aplicar:** `ds-bar-chart` ou `ds-funnel-chart`.

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/waterfall-chart.tsx`                    |
| Tipo       | `registry:ui`                                          |
| Categoria  | `Charts/WaterfallChart`                                |
| Depende de | `chart`, `skeleton`, `card`, `ui-i18n`, `format-utils` |

---

## API — Props

| Prop             | Tipo                    | Padrão    | Obrigatória | Descrição                             |
| ---------------- | ----------------------- | --------- | ----------- | ------------------------------------- |
| `data`           | `WaterfallEntry[]`      | —         | ✓           | Array de entradas do gráfico          |
| `title`          | `string`                | —         |             | Título do card                        |
| `subtitle`       | `string`                | —         |             | Subtítulo descritivo                  |
| `footer`         | `ReactNode`             | —         |             | Conteúdo do rodapé                    |
| `height`         | `number`                | `320`     |             | Altura do gráfico em px               |
| `valueFormatter` | `(v: number) => string` | —         |             | Formatador customizado                |
| `format`         | `FormatPreset`          | —         |             | Preset de formatação (currency, etc.) |
| `decimals`       | `number`                | `0`       |             | Casas decimais                        |
| `currency`       | `string`                | `"USD"`   |             | Código de moeda                       |
| `abbreviate`     | `boolean`               | `false`   |             | Abreviar números grandes              |
| `loading`        | `boolean`               | `false`   |             | Estado de carregamento (skeleton)     |
| `locale`         | `UILocale`              | `"en-US"` |             | Locale para formatação                |
| `className`      | `string`                | —         |             | Classes extras                        |

---

## Tokens de design utilizados

| Token              | Uso                                     |
| ------------------ | --------------------------------------- |
| `bg-card`          | Fundo do card container                 |
| `border`           | Borda do card                           |
| `text-success`     | Barras e valores de incremento positivo |
| `text-destructive` | Barras e valores de redução negativa    |
| `text-foreground`  | Barras de totais e subtotais            |
| `bg-muted`         | Fundo do skeleton de carregamento       |

---

## Stories obrigatórias

- [x] `Default` — DRE financeiro com receitas, custos e lucro líquido
- [x] `Loading` — `loading={true}`
- [x] `Locales` — pt-BR, es-ES, fr-FR
- [x] `EmptyData` — `data=[]`
