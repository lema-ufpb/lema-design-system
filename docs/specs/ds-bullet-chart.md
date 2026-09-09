# Spec: BulletChart

## Propósito

Gráfico ultra compacto projetado como substituto superior a velocímetros/gauges e medidores analógicos. Compara uma medida principal contra um alvo (target) e faixas qualitativas de desempenho (ex: ruim, satisfatório, bom).

**Usar quando:** exibir KPIs densos em dashboards, scorecards ou linhas de tabelas.  
**Não usar quando:** necessitar de detalhamento histórico ou granular ao longo do tempo.  
**Alternativa se não se aplicar:** `ds-progress-bar` ou `ds-linear-gauge`.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/bullet-chart.tsx`                 |
| Tipo       | `registry:ui`                                    |
| Categoria  | `Charts/BulletChart`                             |
| Depende de | `skeleton`, `tooltip`, `ui-i18n`, `format-utils` |

---

## API — Props

| Prop             | Tipo                       | Padrão    | Obrigatória | Descrição                            |
| ---------------- | -------------------------- | --------- | ----------- | ------------------------------------ |
| `label`          | `string`                   | —         | ✓           | Rótulo da métrica                    |
| `value`          | `number`                   | —         | ✓           | Valor medido atual                   |
| `target`         | `number`                   | —         |             | Linha/tick vertical de meta atingida |
| `ranges`         | `[number, number, number]` | —         |             | Faixas qualitativas de fundo         |
| `max`            | `number`                   | —         |             | Valor máximo da escala               |
| `size`           | `"sm" \| "md" \| "lg"`     | `"md"`    |             | Altura e escala do gráfico           |
| `valueFormatter` | `(v: number) => string`    | —         |             | Formatador customizado               |
| `format`         | `FormatPreset`             | —         |             | Preset de formatação                 |
| `loading`        | `boolean`                  | `false`   |             | Estado de carregamento               |
| `locale`         | `UILocale`                 | `"en-US"` |             | Locale                               |

---

## Tokens de design utilizados

| Token                   | Uso                               |
| ----------------------- | --------------------------------- |
| `bg-primary`            | Barra de medida principal         |
| `bg-foreground`         | Marcador vertical de meta         |
| `bg-muted`              | Faixas de fundo qualitativas      |
| `text-foreground`       | Valores e rótulos                 |
| `text-muted-foreground` | Descrição secundária e subtítulos |

---

## Stories obrigatórias

- [x] `Default` — métrica de receita com faixas e meta
- [x] `AllSizes` — sm, md, lg
- [x] `Group` — múltiplos gráficos empilhados com `BulletChartGroup`
- [x] `Loading` — skeletons em todos os tamanhos
- [x] `Locales` — pt-BR, es-ES, fr-FR
