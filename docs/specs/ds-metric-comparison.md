# Spec: MetricComparison (ds-metric-comparison)

> Spec do componente `MetricComparison` para o LEMA Design System.

---

## Propósito

O `MetricComparison` exibe o contraste direto e objetivo entre dois pontos de dados quantitativos (ex: Período Atual vs. Período Anterior, Realizado vs. Meta, Cenário Base vs. Cenário Otimista), calculando e ilustrando visualmente a variação absoluta, relativa e uma barra proporcional de magnitude.

**Usar quando:**

- Dashboards financeiros e econômicos com comparação mensal/anual (MoM, YoY).
- Comparação entre dois cenários de simulação econômica.
- Acompanhamento de metas com "Realizado vs. Planejado".

**Não usar quando:**

- Comparação de múltiplos planos de preços com listas de funcionalidades (use `Comparison`).
- Séries temporais com mais de dois pontos (use `LineChart` ou `Sparkline`).

**Alternativa se não se aplicar:** `Comparison`, `CardStatComparison`.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/metric-comparison.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Data Display`                        |
| Depende de | `badge`, `skeleton`, `ui-i18n`        |

---

## API — Props

| Prop              | Tipo                                   | Padrão             | Obrigatória | Descrição                                        |
| ----------------- | -------------------------------------- | ------------------ | ----------- | ------------------------------------------------ |
| `title`           | `string`                               | —                  |             | Título do card ou métrica comparada              |
| `primaryMetric`   | `ComparisonItem`                       | —                  | ✓           | Métrica principal (geralmente período atual)     |
| `secondaryMetric` | `ComparisonItem`                       | —                  | ✓           | Métrica secundária (geralmente período anterior) |
| `sentiment`       | `"positiveIsGood" \| "negativeIsGood"` | `"positiveIsGood"` |             | Define se aumento é positivo ou negativo         |
| `layout`          | `"horizontal" \| "vertical"`           | `"horizontal"`     |             | Disposição dos blocos comparativos               |
| `showBar`         | `boolean`                              | `true`             |             | Exibe barra visual proporcional                  |
| `size`            | `"sm" \| "md" \| "lg"`                 | `"md"`             |             | Escala tipográfica                               |
| `loading`         | `boolean`                              | `false`            |             | Exibe esqueleto de carregamento                  |
| `locale`          | `UILocale`                             | `"pt-BR"`          |             | Idioma para formatação                           |
| `className`       | `string`                               | —                  |             | Classes customizadas para o wrapper              |

### Tipo `ComparisonItem`

```tsx
export interface ComparisonItem {
  label: string
  value: number
  format?: (val: number) => string
  subtext?: string
}
```

---

## Tokens de design utilizados

| Token                         | Slot onde é usado                      |
| ----------------------------- | -------------------------------------- |
| `bg-card`                     | Superfície do container                |
| `text-foreground`             | Valores numéricos                      |
| `text-muted-foreground`       | Labels e subtítulos                    |
| `text-success` / `bg-success` | Variação positiva favorável            |
| `text-destructive`            | Variação desfavorável                  |
| `bg-primary`                  | Barra de proporção da métrica primária |
| `bg-muted`                    | Trilho de fundo da barra               |

---

## Escala tipográfica e de tamanho

| Slot   | sm                      | md                      | lg                        |
| ------ | ----------------------- | ----------------------- | ------------------------- |
| Título | `text-xs font-medium`   | `text-sm font-medium`   | `text-base font-semibold` |
| Valor  | `text-sm font-semibold` | `text-lg font-bold`     | `text-2xl font-bold`      |
| Delta  | `text-xs font-semibold` | `text-xs font-semibold` | `text-sm font-semibold`   |
| Barra  | `h-1.5`                 | `h-2`                   | `h-2.5`                   |

---

## Comportamentos e estados

- **Cálculo automático do delta:** Calcula variação percentual `((primary - secondary) / secondary) * 100` e variação absoluta.
- **Inversão de sentimento:** Com `sentiment="negativeIsGood"`, quedas são destacadas com `text-success` (ex: redução de dívida ou taxa de juros).
