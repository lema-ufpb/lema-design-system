# Spec: Resizable

> Painéis redimensionáveis com arraste para dividir espaço horizontal ou verticalmente.

---

## Propósito

**Usar quando:** Permitir que o usuário redimensione painéis adjacentes em layouts de ferramentas, IDEs ou dashboards.

**Não usar quando:** O layout é fixo ou responsivo sem interação de redimensionamento — usar `flexbox` ou `grid`.

**Alternativa:** `Grid` CSS para layouts responsivos automáticos.

---

## Localização

| Campo      | Valor                                        |
| ---------- | -------------------------------------------- |
| Arquivo    | `components/ui/resizable.tsx`                |
| Tipo       | `registry:ui` (name: `resizable`)            |
| Categoria  | Layout                                       |
| Depende de | `react-resizable-panels`, `@/lib/utils` (cn) |

---

## API — Props

### ResizablePanelGroup

| Prop          | Tipo                         | Padrão | Obrigatória | Descrição           |
| ------------- | ---------------------------- | ------ | ----------- | ------------------- |
| `orientation` | `"horizontal" \| "vertical"` | —      | Sim         | Direção dos painéis |
| `className`   | `string`                     | —      | Não         | Classes adicionais  |

### ResizablePanel

| Prop          | Tipo     | Padrão | Obrigatória | Descrição            |
| ------------- | -------- | ------ | ----------- | -------------------- |
| `defaultSize` | `number` | —      | Não         | Tamanho inicial em % |
| `minSize`     | `number` | —      | Não         | Tamanho mínimo em %  |
| `maxSize`     | `number` | —      | Não         | Tamanho máximo em %  |

### ResizableHandle

| Prop         | Tipo      | Padrão | Obrigatória | Descrição                        |
| ------------ | --------- | ------ | ----------- | -------------------------------- |
| `withHandle` | `boolean` | —      | Não         | Renderiza alça visual de arraste |
| `className`  | `string`  | —      | Não         | Classes adicionais               |

---

## Tokens de design

| Token                                       | Slot                          |
| ------------------------------------------- | ----------------------------- |
| `--border`                                  | Cor da linha divisória e alça |
| `--ring`                                    | Anel de foco no handle        |
| `--background` (via ring-offset-background) | Offset do focus ring          |

---

## Comportamentos e estados

| Estado        | Comportamento                                 |
| ------------- | --------------------------------------------- |
| Arrastando    | Handle focus-visible com `--ring`             |
| Horizontal    | Handle como linha vertical (`w-px`)           |
| Vertical      | Handle como linha horizontal (`h-px`)         |
| withHandle    | Alça visual central rotacionada se horizontal |
| Focus teclado | `focus-visible:ring-1`                        |

---

## Acessibilidade

| Requisito                     | Implementação                    |
| ----------------------------- | -------------------------------- |
| Redimensionamento por teclado | `react-resizable-panels` (setas) |
| Orientação ARIA               | `aria-orientation` no separator  |
| Focus visível                 | `focus-visible:ring` no handle   |

---

## Stories obrigatórias

- [x] `Horizontal` — Dois painéis com handle visível
- [x] `Vertical` — Dois painéis empilhados verticalmente
- [x] `ThreePanels` — Três painéis com mix de handles

---

## Checklist

- [x] Componente funcional com 3 sub-componentes exportados
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `withHandle`
- [x] Suporte a orientação horizontal e vertical
- [x] Atributo `data-slot` no group, panel e handle
