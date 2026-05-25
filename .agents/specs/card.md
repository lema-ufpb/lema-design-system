# Spec: Card

> Um contêiner de card versátil com subcomponentes para header, título, ações, descrição, corpo e footer.

---

## Propósito

O Card é o contêiente de superfície primário para agrupar informações relacionadas em blocos visuais distintos. Construído com 7 subcomponentes que seguem uma arquitetura de composição: `Card` (container com `data-size`), `CardHeader` (grid responsivo com suporte a `CardAction`), `CardTitle` (fonte `--font-heading`), `CardDescription`, `CardContent` (corpo), `CardFooter` (ações inferiores) e `CardAction` (posicionado no canto superior direito do header). Suporta dois tamanhos: `default` (padding `p-6`, gap `gap-6`) e `sm` (padding `p-4`, gap `gap-4`). Inclui integração com container queries via `@container/card-header` para adaptação do header, e detecção de imagem como primeiro filho para `rounded-t-4xl` automático. O `CardTitle` usa `font-heading` para distinção tipográfica.

**Usar quando:** Dashboard widgets, painéis de informação, perfis de entidade, formulários agrupados, cartões de estatística, e qualquer conteúdo que precise ser visualmente delimitado em bloco.

**Não usar quando:** O conteúdo é uma lista simples ou tabela sem necessidade de container visual. Evitar para diálogos modais (usar `Dialog` ou `AlertDialog`).

**Alternativa se não se aplicar:** `Item` para listas com media, `Empty` para estados vazios, `Sheet` para painéis deslizantes.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/card.tsx` |
| Tipo | `registry:ui` (name: `card`) |
| Categoria | Layout / Container |
| Depende de | Nenhuma |

---

## API — Props

### Card
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `size` | `"default" \| "sm"` | `"default"` | Não | Preset de padding e gap |
| `className` | `string` | — | Não | Classes adicionais |

### CardTitle
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### CardDescription
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### CardHeader, CardContent, CardFooter, CardAction
Aceitam `className` e `children` padrão de `div`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--card` | Fundo do container |
| `--card-foreground` | Cor do texto primário |
| `--foreground` | Anel sutil (`ring-foreground/5`, dark: `ring-foreground/10`) |
| `--font-heading` | Fonte do título (`font-heading text-base font-medium`) |
| `--muted-foreground` | Cor da descrição |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Default size | `gap-6`, `py-6`, `px-6` para header/content/footer |
| Small size | `gap-4`, `py-4`, `px-4` |
| CardHeader com action | `grid-cols-[1fr_auto]` para layout título + ação |
| CardHeader com descrição | `grid-rows-[auto_auto]` |
| Imagem como primeiro filho | `pt-0` no card + `rounded-t-4xl` na imagem |
| Container query | `@container/card-header` para responsividade do header |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Estrutura semântica | Elementos `div` com `data-slot` para contexto |
| Título | `CardTitle` estilizado semanticamente |
| Descrição | `CardDescription` vinculada semanticamente via contexto visual |
| Ação | `CardAction` posicionado sem quebrar ordem de leitura |
| Leitor de tela | Ordem DOM lógica (header > content > footer) |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Card completo com header, content e footer
- [x] `Small` — Versão compacta `size="sm"`
- [x] `WithAction` — Card com ação no header (botão de contexto)
- [x] `StatusBadge` — Card com badge de status inline no header

---

## Checklist antes de implementar

- [x] Escala tipográfica — título `text-base font-medium font-heading`, descrição `text-sm`, conteúdo `text-sm`
- [x] Tokens semânticos — `card`, `card-foreground`, `foreground`, `muted-foreground`, `font-heading`
- [x] Sombra — `shadow-md ring-1 ring-foreground/5`
- [x] Imagens — `has-[>img:first-child]:pt-0` com cantos arredondados
- [x] Container query — `@container/card-header` para responsividade do header
- [x] Espaçamento — `gap-6` (default) / `gap-4` (sm), `rounded-4xl`
