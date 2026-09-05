# Spec: ds-team-roster

> Team Roster (grid de cartões de time).

---

## Propósito

Exibir um time ou grupo de pessoas em grid, com avatar, cargo, status de disponibilidade e links sociais revelados no hover/focus. Inspirado nos blocos "Mission copy + team headshot grid" e "Office culture photo grid" do blockus.

**Usar quando:** Página "Sobre", seção de cultura/equipe, página de contribuidores.
**Não usar quando:** For um único usuário no header do app — use `NavUser`. Para lista compacta (ex: assignees em uma task), use `AvatarGroup`.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/team-roster.tsx`        |
| Tipo       | `registry:ui` (name: `ds-team-roster`) |
| Categoria  | `Data Display`                         |
| Depende de | `avatar`, `card`, `skeleton`           |

---

## API — Props

### `TeamRoster` (grid wrapper)

| Prop      | Tipo          | Padrão | Descrição                     |
| --------- | ------------- | ------ | ----------------------------- |
| `columns` | `2 \| 3 \| 4` | `3`    | Colunas do grid em telas `lg` |

### `TeamRosterCard`

| Prop             | Tipo                                   | Padrão  | Obrigatória | Descrição                                     |
| ---------------- | -------------------------------------- | ------- | ----------- | --------------------------------------------- |
| `name`           | `string`                               | —       | ✓           | Nome da pessoa                                |
| `role`           | `string`                               | —       |             | Cargo                                         |
| `avatarSrc`      | `string`                               | —       |             | Foto do avatar                                |
| `avatarFallback` | `string`                               | —       |             | Iniciais (padrão: 2 primeiras letras do nome) |
| `status`         | `"available" \| "busy" \| "offline"`   | —       |             | Dot de disponibilidade sobre o avatar         |
| `social`         | `{ label, href, icon: ElementType }[]` | `[]`    |             | Links sociais revelados no hover/focus        |
| `size`           | `"sm" \| "md" \| "lg"`                 | `"md"`  |             | Tamanho do card                               |
| `loading`        | `boolean`                              | `false` |             | Estado de carregamento                        |

---

## Variantes CVA

| Dimensão  | Valores          | Padrão |
| --------- | ---------------- | ------ |
| `columns` | `2`, `3`, `4`    | `3`    |
| `size`    | `sm`, `md`, `lg` | `md`   |

**Slots:** `teamRosterGridVariants`, `teamRosterCardContentVariants`, `teamRosterAvatarVariants`, `teamRosterNameVariants`, `teamRosterRoleVariants`.

---

## Tokens de design utilizados

| Token                   | Slot                             |
| ----------------------- | -------------------------------- |
| `bg-success`            | dot de status `available`        |
| `bg-warning`            | dot de status `busy`             |
| `bg-muted-foreground`   | dot de status `offline`          |
| `text-foreground`       | nome                             |
| `text-muted-foreground` | cargo, ícones sociais em repouso |
| `bg-accent`             | hover dos links sociais          |

---

## Escala tipográfica e de tamanho

| Slot   | sm        | md          | lg          |
| ------ | --------- | ----------- | ----------- |
| Nome   | `text-sm` | `text-base` | `text-lg`   |
| Cargo  | `text-xs` | `text-sm`   | `text-base` |
| Avatar | `size-14` | `size-20`   | `size-24`   |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                             |
| ------------------- | ------------------------------------------------------------------ |
| `loading={true}`    | `<Skeleton>` para avatar circular, nome e cargo                    |
| Hover/focus no card | Links sociais aparecem via `opacity` (permanecem no DOM/tab order) |
| Sem `avatarSrc`     | `AvatarFallback` com iniciais                                      |
| Sem `social`        | Linha de links sociais não é renderizada                           |

---

## Acessibilidade

| Requisito          | Implementação                                                             |
| ------------------ | ------------------------------------------------------------------------- |
| Status dot         | `role="img"` + `aria-label` com o texto do status (não é decorativo)      |
| Links sociais      | `aria-label` obrigatório (nome da rede/label vem de `social[].label`)     |
| Revelação por foco | Usa `group-focus-within` — links continuam focáveis mesmo com `opacity-0` |
| Avatar             | `AvatarImage alt=""` (nome já é texto visível ao lado)                    |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `AllStatuses`
- [x] `TwoColumns`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Escala tipográfica sm/md/lg aplicada
- [x] Tokens semânticos para status (`success`/`warning`/`muted-foreground`)
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
- [x] `aria-label` em ícones sociais e status dot
