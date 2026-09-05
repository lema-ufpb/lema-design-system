# Spec: ds-tag-input

> Componente criado seguindo o plano de implementação aprovado.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

**Usar quando:** Você precisar de um input onde o usuário possa digitar múltiplos valores que são convertidos em "tags" ou "pills" (ex: categorias, palavras-chave, e-mails).
**Não usar quando:** O usuário precisar escolher de uma lista predefinida (use `multi-select` ou `search-combo`).
**Alternativa se não se aplicar:** `input` padrão se for apenas um valor separado por vírgula em texto plano.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/tag-input.tsx`       |
| Tipo       | `registry:ui`                       |
| Categoria  | `Form`                              |
| Depende de | `Input`, `Badge`, `Button` (shadcn) |

---

## API — Props

| Prop              | Tipo                       | Padrão    | Obrigatória | Descrição                                                 |
| ----------------- | -------------------------- | --------- | ----------- | --------------------------------------------------------- |
| `value`           | `string[]`                 | —         | ✓           | Lista de tags atuais                                      |
| `onChange`        | `(tags: string[]) => void` | —         | ✓           | Callback chamado quando tags são adicionadas ou removidas |
| `size`            | `"sm" \| "md" \| "lg"`     | `"md"`    |             | Tamanho do componente                                     |
| `maxTags`         | `number`                   | —         |             | Número máximo de tags permitidas                          |
| `allowDuplicates` | `boolean`                  | `false`   |             | Se permite tags duplicadas                                |
| `loading`         | `boolean`                  | `false`   |             | Estado de carregamento                                    |
| `disabled`        | `boolean`                  | `false`   |             | Desabilita a interação                                    |
| `className`       | `string`                   | —         |             | Classes extras de layout                                  |
| `locale`          | `UILocale`                 | `"pt-BR"` |             | Idioma                                                    |

> Estender `Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>` + `VariantProps<typeof tagInputVariants>`.

---

## Variantes CVA

| Dimensão   | Valores          | Padrão  |
| ---------- | ---------------- | ------- |
| `size`     | `sm`, `md`, `lg` | `md`    |
| `disabled` | `true`, `false`  | `false` |
| `invalid`  | `true`, `false`  | `false` |

**Slots do componente**:

- `containerVariants` — wrapper externo (que se assemelha visualmente a um input)
- `tagVariants` — a tag renderizada (geralmente usando `Badge`)
- `inputVariants` — o `<input>` real sem borda dentro do container

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                              |
| ----------------------- | ---------------------------------------------- |
| `bg-background`         | fundo do input container                       |
| `border-input`          | borda do container                             |
| `ring-ring`             | anel de foco no container                      |
| `bg-muted`              | estado loading/disabled ou background do badge |
| `text-muted-foreground` | placeholder do input                           |
| `text-foreground`       | texto digitado                                 |
| `text-destructive`      | borda de erro quando invalid                   |

---

## Escala tipográfica e de tamanho

| Slot                 | sm        | md         | lg          |
| -------------------- | --------- | ---------- | ----------- |
| Input text           | `text-xs` | `text-sm`  | `text-base` |
| Tag text             | `text-xs` | `text-sm`  | `text-base` |
| Altura min container | `min-h-8` | `min-h-10` | `min-h-12`  |
| Ícone close          | `size-3`  | `size-3.5` | `size-4`    |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| `loading={true}`    | `<Skeleton>` com dimensões idênticas ao conteúdo real                                   |
| `disabled`          | `opacity-50 cursor-not-allowed` no container, botão close das tags oculto ou desativado |
| Valor mínimo/máximo | Impede adição de novas tags se `value.length >= maxTags`                                |
| Foco                | O container externo recebe estilo de anel de foco (`ring-ring`)                         |

---

## Acessibilidade

| Requisito | Implementação                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Rótulo    | Tags devem ter `aria-label` para o botão de remoção                                                                               |
| Teclado   | Backspace deleta a última tag se o input estiver vazio; Setas podem navegar? (Não estritamente necessário se Backspace funcionar) |
| i18n      | `UI_I18N[locale].tagInput.*` para strings fixas (`removeTag`, `maxReached`)                                                       |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado padrão
- [x] `AllSizes` — sm, md, lg
- [x] `MaxTags` — limite de tags
- [x] `WithInitialValues` — renderiza com tags
- [x] `Disabled`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] Todo `cva()` tem `defaultVariants` declarado
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` em todos os valores numéricos
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind
- [x] Prop `locale` integrada via `UI_I18N`
