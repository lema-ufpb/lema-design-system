# Spec: Chart

> Um wrapper para Recharts que fornece estilização temática via CSS custom properties, tooltip e legend pré-construídos.

---

## Propósito

O Chart é a camada de integração entre Recharts e o sistema de tokens do LEMA. O `ChartContainer` envolve qualquer gráfico Recharts (`BarChart`, `LineChart`, `PieChart`, etc.) em um `ResponsiveContainer` com aspect ratio `aspect-video` por padrão. Aceita uma `ChartConfig` que mapeia chaves de dados para labels e cores (fixas ou por tema light/dark). Injeta dinamicamente um `<style>` via `ChartStyle` com variáveis CSS `--color-<key>` para cada série, permitindo uso de `fill="var(--color-revenue)"` nos elementos Recharts. Inclui `ChartTooltipContent` (com indicadores `dot`, `line`, `dashed` e opção `hideLabel`/`hideIndicator`) e `ChartLegendContent` (com ícones configuráveis e `hideIcon`), ambos estilizados com tokens semânticos. O componente é puramente visual — o renderer real é o Recharts, e o Chart apenas fornece contexto (`config`), estilo e componentes de UI auxiliares.

**Usar quando:** Qualquer visualização de dados baseada em Recharts que precise de tooltip, legend e cores consistentes com o design system.

**Não usar quando:** Gráficos customizados não-Recharts (SVG puro). Para gráficos específicos já implementados no sistema (BarChart, LineChart, PieChart, etc.), usar os componentes custom em `components/custom/`.

**Alternativa se não se aplicar:** Componentes custom em `components/custom/` (bar-chart, line-chart, pie-chart, etc.) que já encapsulam ChartContainer com configurações específicas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/chart.tsx` |
| Tipo | `registry:ui` (name: `chart`) |
| Categoria | Data Display / Chart |
| Depende de | Nenhuma |

---

## API — Props

### ChartContainer
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `config` | `ChartConfig` | — | Sim | Config das séries (label, color/theme) |
| `initialDimension` | `{ width: number, height: number }` | `{ 320, 200 }` | Não | Dimensão inicial do ResponsiveContainer |
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Sim | Elemento Recharts (BarChart, LineChart, etc.) |

### ChartTooltipContent
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `indicator` | `"dot" \| "line" \| "dashed"` | `"dot"` | Não | Estilo do indicador |
| `hideLabel` | `boolean` | `false` | Não | Oculta o label do tooltip |
| `hideIndicator` | `boolean` | `false` | Não | Oculta o indicador |
| `label` | `string` | — | Não | Chave do label no config |
| `labelFormatter` | `(value, payload) => ReactNode` | — | Não | Formatador do label |
| `formatter` | `(value, name, item, index, payload) => ReactNode` | — | Não | Formatador de valor |
| `nameKey` | `string` | — | Não | Chave para lookup no config |
| `labelKey` | `string` | — | Não | Chave do label no payload |

### ChartLegendContent
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `hideIcon` | `boolean` | `false` | Não | Oculta o ícone/bolinha |
| `nameKey` | `string` | — | Não | Chave para lookup no config |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--muted-foreground` | Texto dos ticks dos eixos e labels da legenda |
| `--border/50` | Linhas do grid |
| `--muted` | Tooltip cursor e radial-bar-background |
| `--popover` | Fundo do tooltip |
| `--popover-foreground` | Texto primário do tooltip |
| `--foreground` | Valores numéricos no tooltip |
| `--foreground/5` | Anel sutil no tooltip |
| `--color-<key>` | Cor da série (injetada via ChartStyle) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Tooltip ativo | Exibido quando `active && payload.length > 0` |
| Tooltip inativo | Retorna `null` |
| Indicador dot | `h-2.5 w-2.5 rounded-[2px]` |
| Indicador line | `w-1` (linha vertical fina) |
| Indicador dashed | `w-0 border-[1.5px] border-dashed` |
| Legend | Ícone como bolinha `h-2 w-2` ou ícone custom via config |
| Config sem cor | `ChartStyle` não injeta CSS; cor padrão do Recharts |
| Nest label | Quando `payload.length === 1` e indicator não é `dot` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA data charts | `data-chart={chartId}` para vinculação de estilos |
| Recharts accessibilityLayer | Recomendado usar `accessibilityLayer` nos charts Recharts |
| Tooltip semântico | Conteúdo descritivo com label e valor |
| Legend | Labels textuais com indicador visual colorido |
| Keyboard | Navegação via Recharts (teclas de seta em alguns gráficos) |

---

## Stories obrigatórias no Storybook

- [x] `BarChartStory` — Gráfico de barras com tooltip dot e legend
- [x] `LineChartStory` — Gráfico de linhas com indicator line
- [x] `PieChartStory` — Gráfico de pizza com cores custom
- [x] `DashedIndicator` — Tooltip com indicator dashed
- [x] `HideLabel` — Tooltip com label oculto

---

## Checklist antes de implementar

- [x] ChartConfig — Tipo que aceita `color` fixa ou `theme` light/dark
- [x] ChartStyle — Injeção dinâmica de `<style>` com variáveis `--color-<key>`
- [x] Aspect ratio — `aspect-video` padrão, customizável via className
- [x] TooltipContent — Suporte a `hideLabel`, `hideIndicator`, `indicator` (dot/line/dashed)
- [x] LegendContent — Suporte a `hideIcon` e ícone custom via config
- [x] Grid lines — `stroke-border/50` para linhas do Recharts
- [x] Tokens — `muted-foreground`, `border`, `muted`, `popover`, `foreground`
