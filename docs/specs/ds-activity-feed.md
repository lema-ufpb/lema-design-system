# Spec: ActivityFeed (ds-activity-feed)

> Spec do componente `ActivityFeed` para o LEMA Design System.

---

## Propósito

O `ActivityFeed` exibe um feed cronológico de eventos, trilha de auditoria (audit log), ações de colaboradores ou histórico de execuções de modelos econômicos e pipelines de dados. Ele padroniza a representação visual de "quem fez o quê, quando e com qual status".

**Usar quando:**

- Painéis de auditoria, logs de eventos de projetos e histórico de alterações em entidades.
- Feeds de atividade recente em dashboards de laboratório e colaboração de equipe.
- Histórico de execuções de pipelines, treinos ou publicações de dados.

**Não usar quando:**

- Linha do tempo estática puramente decorativa para páginas de marketing institucional (use `Timeline`).
- Notificações transitórias estilo popup (use `toast` ou `NotificationBadge`).

**Alternativa se não se aplicar:** `Timeline`.

---

## Localização

| Campo      | Valor                                              |
| ---------- | -------------------------------------------------- |
| Arquivo    | `components/ds/activity-feed.tsx`                  |
| Tipo       | `registry:ui`                                      |
| Categoria  | `Data Display`                                     |
| Depende de | `avatar`, `badge`, `button`, `skeleton`, `ui-i18n` |

---

## API — Props

| Prop           | Tipo                 | Padrão    | Obrigatória | Descrição                                  |
| -------------- | -------------------- | --------- | ----------- | ------------------------------------------ |
| `items`        | `ActivityFeedItem[]` | `[]`      | ✓           | Lista ordenada de eventos de atividade     |
| `loading`      | `boolean`            | `false`   |             | Exibe esqueleto de carregamento com trilho |
| `emptyMessage` | `string`             | —         |             | Mensagem quando não houver itens no feed   |
| `onViewMore`   | `() => void`         | —         |             | Callback para carregar mais itens          |
| `locale`       | `UILocale`           | `"pt-BR"` |             | Idioma para datas e textos de suporte      |
| `className`    | `string`             | —         |             | Classes customizadas para o container      |

### Tipo `ActivityFeedItem`

```tsx
export interface ActivityFeedItem {
  id: string
  actor: {
    name: string
    avatarUrl?: string
    initials?: string
  }
  action: string
  target?: string
  targetHref?: string
  timestamp: string | Date
  status?: "default" | "success" | "warning" | "destructive"
  statusLabel?: string
  icon?: React.ReactNode
  description?: React.ReactNode
}
```

---

## Tokens de design utilizados

| Token                         | Slot onde é usado                   |
| ----------------------------- | ----------------------------------- |
| `bg-border`                   | Linha/trilho conector entre nós     |
| `text-foreground`             | Nome do ator e entidade alvo        |
| `text-muted-foreground`       | Ação, timestamp e descrições        |
| `bg-success` / `text-success` | Tag ou indicador de status positivo |
| `text-destructive`            | Tag ou indicador de falha ou erro   |

---

## Escala tipográfica e de tamanho

| Slot      | Tamanho                                     |
| --------- | ------------------------------------------- |
| Ator      | `text-sm font-semibold`                     |
| Ação      | `text-sm font-normal text-muted-foreground` |
| Alvo      | `text-sm font-medium text-foreground`       |
| Timestamp | `text-xs text-muted-foreground`             |
| Avatar    | `size-7`                                    |

---

## Comportamentos e estados

- **Trilho conector:** Uma linha contínua vertical conecta os avatares de todos os eventos, exceto após o último item.
- **Loading (`loading={true}`):** Renderiza esqueletos circulares de avatar e barras de texto alinhadas ao trilho.
- **Vazio (`items.length === 0`):** Exibe estado vazio com mensagem acolhedora do dicionário `activityFeed.empty`.
- **Botão "Ver mais":** Renderiza botão discreto ao final para paginação sob demanda.
