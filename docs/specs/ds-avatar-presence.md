# Spec: AvatarPresence (ds-avatar-presence)

> Spec do componente `AvatarPresence` para o LEMA Design System.

---

## Propósito

O `AvatarPresence` adiciona indicador em tempo real de presença e disponibilidade de usuários (online, ausente, ocupado/não perturbe, offline), com anel de isolamento temático e animação opcional de pulso para usuários ativos.

**Usar quando:**

- Listas de pesquisadores ou colaboradores com status em tempo real.
- Chats de suporte, comentários colaborativos e discussões de equipe.
- Menus de perfil de usuário com indicador de conexão ativa.

**Não usar quando:**

- Avatares estáticos sem conceito de conectividade (use `Avatar`).
- Listas de avatares empilhados (use `AvatarGroup`).

**Alternativa se não se aplicar:** `Avatar`.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/avatar-presence.tsx` |
| Tipo       | `registry:ui`                       |
| Categoria  | `Data Display`                      |
| Depende de | `avatar`, `tooltip`, `ui-i18n`      |

---

## API — Props

| Prop        | Tipo                                        | Padrão           | Obrigatória | Descrição                                     |
| ----------- | ------------------------------------------- | ---------------- | ----------- | --------------------------------------------- |
| `src`       | `string`                                    | —                |             | URL da foto de perfil                         |
| `alt`       | `string`                                    | —                |             | Texto alternativo para acessibilidade         |
| `fallback`  | `string`                                    | —                |             | Letras iniciais para fallback quando sem foto |
| `status`    | `"online" \| "offline" \| "busy" \| "away"` | `"online"`       | ✓           | Estado de presença do usuário                 |
| `pulse`     | `boolean`                                   | `false`          |             | Animação sutil de pulso para status online    |
| `size`      | `"sm" \| "md" \| "lg" \| "xl"`              | `"md"`           |             | Escala de dimensionamento                     |
| `position`  | `"bottom-right" \| "top-right"`             | `"bottom-right"` |             | Posição da bolha indicadora                   |
| `locale`    | `UILocale`                                  | `"pt-BR"`        |             | Idioma para o tooltip de status               |
| `className` | `string`                                    | —                |             | Classes customizadas para o wrapper           |

---

## Tokens de design utilizados

| Token                 | Slot onde é usado                                 |
| --------------------- | ------------------------------------------------- |
| `bg-success`          | Indicador de status online                        |
| `bg-warning`          | Indicador de status ausente (away)                |
| `bg-destructive`      | Indicador de status ocupado (busy)                |
| `bg-muted-foreground` | Indicador de status offline                       |
| `ring-background`     | Anel de recorte e separação ao redor do indicador |

---

## Escala tipográfica e de tamanho

| Slot      | sm         | md        | lg          | xl         |
| --------- | ---------- | --------- | ----------- | ---------- |
| Avatar    | `size-8`   | `size-10` | `size-12`   | `size-16`  |
| Indicador | `size-2.5` | `size-3`  | `size-3.5`  | `size-4.5` |
| Fallback  | `text-xs`  | `text-sm` | `text-base` | `text-lg`  |
