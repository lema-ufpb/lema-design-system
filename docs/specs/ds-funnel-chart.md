# Spec: FunnelChart

## Propósito

Visualiza taxas de conversão entre estágios sequenciais (ex: Visitante → Lead → Oportunidade → Cliente). Exibe a queda entre etapas como barras horizontais centralizadas e decrescentes.

**Usar quando:** mostrar perdas progressivas num pipeline de vendas, funil de marketing, fluxo de onboarding, ou qualquer sequência onde o volume diminui a cada passo.  
**Não usar quando:** comparar categorias não-sequenciais (use BarChart), ou quando há apenas 1 ou 2 estágios.  
**Alternativa se não se aplicar:** `ds-bar-chart` (horizontal) ou `ds-pie-chart`.

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/funnel-chart.tsx`               |
| Tipo       | `registry:ui`                                  |
| Categoria  | `Charts/FunnelChart`                           |
| Depende de | `chart`, `skeleton`, `ui-i18n`, `format-utils` |

---

## API — Props

| Prop             | Tipo                    | Padrão    | Obrigatória | Descrição                               |
| ---------------- | ----------------------- | --------- | ----------- | --------------------------------------- |
| `data`           | `FunnelStage[]`         | —         | ✓           | Array de estágios do funil              |
| `title`          | `string`                | —         |             | Título do card                          |
| `subtitle`       | `string`                | —         |             | Subtítulo abaixo do título              |
| `footer`         | `ReactNode`             | —         |             | Conteúdo do rodapé                      |
| `height`         | `number`                | `300`     |             | Altura do gráfico em px                 |
| `showLabels`     | `boolean`               | `true`    |             | Exibir rótulos de valor nas barras      |
| `showPercentage` | `boolean`               | `true`    |             | Exibir taxa de conversão entre estágios |
| `valueFormatter` | `(v: number) => string` | —         |             | Formatador customizado de valor         |
| `format`         | `FormatPreset`          | —         |             | Preset de formatação                    |
| `decimals`       | `number`                | `0`       |             | Casas decimais                          |
| `currency`       | `string`                | `"USD"`   |             | Código de moeda                         |
| `abbreviate`     | `boolean`               | `false`   |             | Abreviar números grandes                |
| `loading`        | `boolean`               | `false`   |             | Estado de carregamento (skeleton)       |
| `locale`         | `UILocale`              | `"en-US"` |             | Locale para formatação                  |
| `className`      | `string`                | —         |             | Classes extras                          |

### FunnelStage

```ts
interface FunnelStage {
  name: string
  value: number
  color?: string // CSS token ou hex — padrão: --chart-N ciclicamente
}
```

---

## Variantes CVA

| Dimensão                                      | Valores | Padrão |
| --------------------------------------------- | ------- | ------ |
| Não usa CVA de variante — componente estático |         |        |

---

## Tokens de design utilizados

| Token                   | Uso                               |
| ----------------------- | --------------------------------- |
| `bg-card`               | Fundo do card container           |
| `border`                | Borda do card                     |
| `text-foreground`       | Título, valores nas barras        |
| `text-muted-foreground` | Subtítulo, rótulos de estágio     |
| `--chart-1..5`          | Cores das barras (ciclicamente)   |
| `bg-muted`              | Fundo do skeleton de carregamento |

---

## Comportamentos e estados

| Estado           | Comportamento esperado                                 |
| ---------------- | ------------------------------------------------------ |
| `loading={true}` | Skeletons de barras + labels com larguras decrescentes |
| `data=[]`        | Mensagem "Nenhum dado disponível" centralizada         |
| `showPercentage` | Taxa entre estágio N e N-1 em `text-muted-foreground`  |

---

## Acessibilidade

| Requisito | Implementação                                  |
| --------- | ---------------------------------------------- |
| Role      | `role="img"` no container SVG com `aria-label` |
| Rótulo    | `aria-label={title ?? "Funnel chart"}`         |
| Teclado   | N/A (visualização estática)                    |

---

## Stories obrigatórias

- [x] `Default` — funil de marketing com 5 estágios
- [x] `Loading` — `loading={true}`
- [x] `WithCurrency` — valores formatados como moeda
- [x] `Locales` — pt-BR, es-ES, fr-FR
- [x] `EmptyData` — `data=[]`
