# Spec: Sparkline (ds-sparkline)

> Spec do componente `Sparkline` para o LEMA Design System.

---

## Propósito

O `Sparkline` é um micro-gráfico SVG autônomo e ultra-leve projetado para enriquecer tabelas de dados, células numéricas, cartões e cabeçalhos com tendências temporais compactas, sem a sobrecarga de renderização de bibliotecas pesadas de gráficos.

**Usar quando:**

- Exibir a tendência de uma série temporal em linhas de tabelas (`DataTable`, `ScoreRow`).
- Miniaturas gráficas em widgets de mercado, finanças, sensores ou métricas de servidor.
- Visualizações compactas de 7, 30 ou 90 dias onde eixos completos seriam excessivos.

**Não usar quando:**

- Gráficos completos com eixos X/Y numéricos, legendas complexas e zoom (use `LineChart` ou `BarChart`).
- Cartões de estatística prontos com título e métricas embutidas (use `CardStatSparkline`).

**Alternativa se não se aplicar:** `LineChart`, `CardStatSparkline`.

---

## Localização

| Campo      | Valor                         |
| ---------- | ----------------------------- |
| Arquivo    | `components/ds/sparkline.tsx` |
| Tipo       | `registry:ui`                 |
| Categoria  | `Data Display`                |
| Depende de | `skeleton`, `ui-i18n`         |

---

## API — Props

| Prop            | Tipo                                                   | Padrão      | Obrigatória | Descrição                                   |
| --------------- | ------------------------------------------------------ | ----------- | ----------- | ------------------------------------------- |
| `data`          | `number[]`                                             | —           | ✓           | Vetor de valores numéricos ordenados        |
| `type`          | `"line" \| "area" \| "bar"`                            | `"line"`    |             | Tipo de representação gráfica               |
| `intent`        | `"primary" \| "success" \| "destructive" \| "warning"` | `"primary"` |             | Semântica de cor                            |
| `strokeWidth`   | `number`                                               | `2`         |             | Espessura do traço no modo linha/área       |
| `showLastPoint` | `boolean`                                              | `true`      |             | Exibe ponto destacado no valor mais recente |
| `height`        | `number`                                               | `36`        |             | Altura em pixels do gráfico                 |
| `width`         | `number \| string`                                     | `"100%"`    |             | Largura do gráfico (px ou %)                |
| `loading`       | `boolean`                                              | `false`     |             | Exibe esqueleto de carregamento             |
| `locale`        | `UILocale`                                             | `"pt-BR"`   |             | Idioma para tooltips e rótulos              |
| `className`     | `string`                                               | —           |             | Classes customizadas para o wrapper SVG     |

---

## Tokens de design utilizados

| Token                | Slot onde é usado          |
| -------------------- | -------------------------- |
| `stroke-primary`     | Linha padrão               |
| `stroke-success`     | Tendência positiva         |
| `stroke-destructive` | Tendência negativa / queda |
| `stroke-warning`     | Atenção                    |
| `bg-muted`           | Skeleton de carregamento   |

---

## Comportamentos e estados

- **Cálculo de escala SVG:** Normaliza automaticamente os valores de `min` a `max` para a faixa de coordenadas do viewBox, evitando cortes nas extremidades com padding interno.
- **Ponto terminal:** Renderiza um círculo no último dado da série para guiar a leitura temporal.
- **Variante Area:** Aplica gradiente vertical suave que decai para opacidade zero no rodapé do SVG.
- **Variante Bar:** Renderiza barras finas verticais uniformemente espaçadas.
