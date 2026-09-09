# Spec: StatusPage (ds-status-page)

> Spec do componente `StatusPage` para o LEMA Design System.

---

## Propósito

O `StatusPage` fornece um painel visual unificado da disponibilidade e saúde operacional de múltiplos serviços, APIs, clusters de cálculo e fontes de dados, com indicador de histórico de 90 dias (barras diárias) e cálculo de uptime.

**Usar quando:**

- Páginas públicas ou internas de status de infraestrutura (`status.lema.ufpb.br`).
- Widgets de saúde de conexões de dados e APIs em dashboards administrativos.
- Monitoramento de integridade de microsserviços e workers de processamento.

**Não usar quando:**

- Monitoramento em tempo real com métricas detalhadas de CPU/RAM (use gráficos de linha ou dashboards dedicados).

**Alternativa se não se aplicar:** `CardStatGauge`, `ActivityFeed`.

---

## Localização

| Campo      | Valor                           |
| ---------- | ------------------------------- |
| Arquivo    | `components/ds/status-page.tsx` |
| Tipo       | `registry:ui`                   |
| Categoria  | `Data Display`                  |
| Depende de | `badge`, `skeleton`, `ui-i18n`  |

---

## API — Props

| Prop             | Tipo                                      | Padrão          | Obrigatória | Descrição                                 |
| ---------------- | ----------------------------------------- | --------------- | ----------- | ----------------------------------------- |
| `services`       | `StatusService[]`                         | —               | ✓           | Lista de serviços monitorados             |
| `overallStatus`  | `"operational" \| "degraded" \| "outage"` | `"operational"` |             | Status global do sistema                  |
| `showUptimeBars` | `boolean`                                 | `true`          |             | Exibe a linha diária de 90 dias de uptime |
| `incidents`      | `StatusIncident[]`                        | —               |             | Lista opcional de incidentes recentes     |
| `loading`        | `boolean`                                 | `false`         |             | Exibe esqueleto de carregamento           |
| `locale`         | `UILocale`                                | `"pt-BR"`       |             | Idioma para textos de status e datas      |
| `className`      | `string`                                  | —               |             | Classes customizadas para o wrapper       |

### Tipos `StatusService` e `StatusIncident`

```tsx
export interface ServiceDayStatus {
  date: string
  status: "operational" | "degraded" | "outage"
}

export interface StatusService {
  id: string
  name: string
  description?: string
  status: "operational" | "degraded" | "outage"
  uptimePercentage?: number
  history?: ServiceDayStatus[]
}

export interface StatusIncident {
  id: string
  title: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  date: string
  description: string
}
```

---

## Tokens de design utilizados

| Token                         | Slot onde é usado                      |
| ----------------------------- | -------------------------------------- |
| `bg-success` / `text-success` | Serviços e barras operacionais normais |
| `bg-warning` / `text-warning` | Degradação ou lentidão temporária      |
| `bg-destructive`              | Interrupções críticas e incidentes     |
| `bg-card` / `border-border`   | Superfície do container                |

---

## Escala tipográfica e de tamanho

| Slot         | Tamanho                              |
| ------------ | ------------------------------------ |
| Título geral | `text-base font-semibold`            |
| Nome serviço | `text-sm font-semibold`              |
| Uptime %     | `text-xs font-semibold tabular-nums` |
| Barras       | `h-6` cada barra                     |
