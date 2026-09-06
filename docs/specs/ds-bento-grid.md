# Spec: ds-bento-grid

> Bento Grid (grid assimétrico de tiles).

---

## Propósito

Layout de grid assimétrico para tiles de feature/mídia, com spans de coluna/linha configuráveis por item. Inspirado nos blocos "Bento feature hero" e "Left-aligned bento split" do blockus, reutilizável além de Hero (features, dashboards).

**Usar quando:** Precisar de um grid com tiles de tamanhos variados (destaque + itens menores).
**Não usar quando:** Todos os itens tiverem o mesmo tamanho — use um grid simples (`grid grid-cols-*`).

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/bento-grid.tsx`        |
| Tipo       | `registry:ui` (name: `ds-bento-grid`) |
| Categoria  | `Layout`                              |
| Depende de | `skeleton`                            |

---

## API — Props

### `BentoGrid` (root)

Sem props próprias além de `React.HTMLAttributes<HTMLDivElement>`.

### `BentoGridItem`

| Prop          | Tipo                   | Padrão  | Descrição                                                                                                                    |
| ------------- | ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `React.ReactNode`      | —       | Título do tile (layout padrão)                                                                                               |
| `description` | `React.ReactNode`      | —       | Descrição do tile (layout padrão)                                                                                            |
| `icon`        | `React.ElementType`    | —       | Ícone do tile (layout padrão)                                                                                                |
| `media`       | `React.ReactNode`      | —       | Camada de fundo (imagem/gradiente/chart)                                                                                     |
| `colSpan`     | `1 \| 2 \| 3 \| 4`     | `1`     | Colunas ocupadas (`md:col-span-*`)                                                                                           |
| `rowSpan`     | `1 \| 2 \| 3 \| 4`     | `1`     | Linhas ocupadas (`row-span-*`)                                                                                               |
| `titleAs`     | `"h2" \| "h3" \| "h4"` | `"h3"`  | Nível do heading de `title` — ajuste quando o grid ficar logo abaixo de um `h1`/`h2`, para não pular nível (`heading-order`) |
| `loading`     | `boolean`              | `false` | Estado de carregamento                                                                                                       |
| `children`    | `React.ReactNode`      | —       | Sobrescreve o layout padrão (título/desc)                                                                                    |

---

## Variantes CVA

| Dimensão  | Valores            | Padrão |
| --------- | ------------------ | ------ |
| `colSpan` | `1`, `2`, `3`, `4` | `1`    |
| `rowSpan` | `1`, `2`, `3`, `4` | `1`    |

**Slots:** `bentoGridVariants`, `bentoGridItemVariants`, `bentoGridItemIconVariants`, `bentoGridItemTitleVariants`, `bentoGridItemDescriptionVariants`.

---

## Tokens de design utilizados

| Token                            | Slot               |
| -------------------------------- | ------------------ |
| `bg-card` / `border-border`      | superfície do tile |
| `bg-primary/10` + `text-primary` | medalhão do ícone  |
| `text-foreground`                | título             |
| `text-muted-foreground`          | descrição          |

---

## Escala tipográfica e de tamanho

| Slot      | Valor                                        |
| --------- | -------------------------------------------- |
| Ícone     | `size-5` (medalhão `size-10`)                |
| Título    | `font-semibold` (herda tamanho do container) |
| Descrição | `text-sm`                                    |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                           |
| ------------------- | ---------------------------------------------------------------- |
| `loading={true}`    | `<Skeleton>` para medalhão, título e descrição                   |
| `media` presente    | Renderizado como camada `absolute inset-0 -z-10`, `aria-hidden`  |
| `children` presente | Sobrescreve totalmente o layout padrão de título/ícone/descrição |

---

## Acessibilidade

| Requisito      | Implementação                                    |
| -------------- | ------------------------------------------------ |
| Mídia de fundo | `aria-hidden="true"` (decorativa)                |
| Ícone          | `aria-hidden="true"` (título já é texto visível) |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSpans`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
