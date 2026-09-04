# Spec: AvatarGroup

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/avatar-group.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Exibe uma lista de avatares empilhados, útil para indicar múltiplos usuários associados a uma entidade (ex: participantes de um projeto, visualizadores de um documento, equipe responsável). Ele cuida da lógica de sobreposição (overlap) e do limite máximo de avatares mostrados visivelmente, agrupando o restante em um indicador tipo "+X".

**Usar quando:** Precisar listar 2 ou mais usuários/entidades visualmente em um espaço restrito.
**Não usar quando:** Precisar detalhar o nome e cargo de cada pessoa em formato de lista extensa.
**Alternativa se não se aplicar:** Lista vertical de `Avatar` ou `Data Table`.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/avatar-group.tsx`      |
| Tipo       | `registry:ui`                         |
| Categoria  | `Data Display`                        |
| Depende de | `Avatar` (`components/ui/avatar.tsx`) |

---

## API — Props

| Prop        | Tipo                                                       | Padrão | Obrigatória | Descrição                                      |
| ----------- | ---------------------------------------------------------- | ------ | ----------- | ---------------------------------------------- |
| `users`     | `Array<{ src?: string; initials: string; name?: string }>` | `[]`   | ✓           | Lista de usuários a exibir.                    |
| `max`       | `number`                                                   | `4`    |             | Máximo de avatares visíveis antes de colapsar. |
| `size`      | `"sm" \| "md" \| "lg"`                                     | `"md"` |             | Tamanho do componente (repassado ao Avatar).   |
| `className` | `string`                                                   | —      |             | Classes extras de layout.                      |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots do componente**:

- `groupVariants` — wrapper externo (flex, margin negativa para overlap).
- `avatarItemVariants` — cada item de avatar (borda para destaque).
- `overflowVariants` — o círculo "+X" extra.

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                                       |
| ----------------------- | ------------------------------------------------------- |
| `bg-background`         | borda dos avatares para criar o recorte de sobreposição |
| `bg-muted`              | fundo do círculo "+X"                                   |
| `text-muted-foreground` | cor do texto no círculo "+X"                            |

---

## Escala tipográfica e de tamanho

| Slot                    | sm            | md                    | lg                    |
| ----------------------- | ------------- | --------------------- | --------------------- |
| Altura/Largura (Avatar) | `size-7`      | `size-8`              | `size-10`             |
| Overlap margin          | `-ml-2`       | `-ml-3`               | `-ml-4`               |
| Fonte (+X)              | `text-[10px]` | `text-xs font-medium` | `text-sm font-medium` |

---

## Comportamentos e estados

| Estado               | Comportamento esperado                   |
| -------------------- | ---------------------------------------- |
| `users.length > max` | Exibe `max` avatares, seguido de um "+N" |
| Hover no avatar      | (Opcional) leve deslocamento para cima   |

---

## Acessibilidade

| Requisito         | Implementação                                       |
| ----------------- | --------------------------------------------------- |
| Role semântico    | `<div role="group" aria-label="Grupo de usuários">` |
| Rótulo individual | `alt` da imagem do avatar com o nome do usuário     |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado padrão com 5 usuários (exibindo 4 +1)
- [x] `AllSizes` — sm, md, lg em uma coluna
- [x] `UnderMaxLimit` — 3 usuários (max 4), não exibe o overflow
- [x] `Empty` / `ZeroState` (se aplicável)
