# Spec: ds-notification-center

> Central de Notificações (Notification Center).

---

## Propósito

Exibe uma lista de notificações recentes do usuário (alertas, mensagens de sistema, etc) agregadas em um botão de sino que abre um popover.

**Usar quando:** O sistema tem eventos assíncronos que o usuário precisa ser notificado e revisar depois (ex: mensagens, status de tarefas).

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/notification-center.tsx`        |
| Tipo       | `registry:ui` (name: `ds-notification-center`) |
| Categoria  | `Data Display`                                 |
| Depende de | `popover`, `button`, `lucide-react`, `badge`   |

---

## Estrutura de Dados

```typescript
export interface NotificationItem {
  id: string
  title: string
  description?: string
  date: Date
  unread: boolean
  onClick?: () => void
}
```

## API — Props

| Prop              | Tipo                 | Padrão                  | Obrigatória | Descrição                      |
| ----------------- | -------------------- | ----------------------- | ----------- | ------------------------------ |
| `notifications`   | `NotificationItem[]` | —                       | Sim         | Lista de notificações          |
| `onMarkAllAsRead` | `() => void`         | —                       |             | Ação "Marcar todas como lidas" |
| `emptyText`       | `string`             | `"Nenhuma notificação"` |             | Texto quando vazio             |
| `title`           | `string`             | `"Notificações"`        |             | Título do popover              |

---

## Variantes CVA

Nenhuma.

---

## Acessibilidade

- Botão principal (Bell) deve ter `aria-label="Notificações"`.
- O badge de não lidas não deve atrapalhar a leitura de tela (escondido ou lido como "N notificações não lidas").

---

## Stories obrigatórias no Storybook

- [x] `Default` (com notificações)
- [x] `Empty` (lista vazia)

---

## Checklist antes de implementar

- [x] O popover deve ter um tamanho razoável (ex: `w-80` ou `w-96`) e `max-h-96` com `overflow-y-auto` interno.
- [x] Indicador vermelho na bolinha do ícone se houver itens `unread`.
