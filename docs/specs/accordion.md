# Spec: Accordion

> Uma pilha vertical de cabeçalhos interativos que revelam seções de conteúdo ao serem clicados.

---

## Propósito

O Accordion permite organizar grandes quantidades de conteúdo em seções colapsáveis, economizando espaço vertical e melhorando a legibilidade. Cada item é composto por um trigger (cabeçalho clicável) e um painel de conteúdo que expande com animação suave. No design system LEMA, o Accordion é construído sobre o primitivo `Accordion.Root` da Radix UI e oferece dois modos de interação: `single` (apenas um item aberto por vez) e `multiple` (vários itens simultaneamente).

**Usar quando:** Necessário apresentar conteúdo hierárquico ou FAQ-like que pode ser expandido/recolhido seletivamente. Ideal para formulários longos, painéis de configuração e listas de documentação.

**Não usar quando:** O conteúdo precisa ser todo visível simultaneamente para leitura ou comparação. Evitar para navegação principal do site (usar Navigation Menu ou Sidebar).

**Alternativa se não se aplicar:** `Collapsible` para grupos independentes não relacionados entre si, ou `Tabs` para alternar entre visões sem acúmulo vertical.

---

## Localização

| Campo      | Valor                             |
| ---------- | --------------------------------- |
| Arquivo    | `components/ui/accordion.tsx`     |
| Tipo       | `registry:ui` (name: `accordion`) |
| Categoria  | Layout / Disclosure               |
| Depende de | Nenhuma                           |

---

## API — Props

O Accordion expõe 4 subcomponentes. As props refletem diretamente as da Radix UI:

### Accordion (Root)

| Prop           | Tipo                     | Padrão | Obrigatória | Descrição                                      |
| -------------- | ------------------------ | ------ | ----------- | ---------------------------------------------- |
| `type`         | `"single" \| "multiple"` | —      | Sim         | Modo de seleção                                |
| `defaultValue` | `string \| string[]`     | —      | Não         | Item(s) aberto(s) por padrão                   |
| `collapsible`  | `boolean`                | —      | Não         | Permite fechar o item aberto (apenas `single`) |
| `className`    | `string`                 | —      | Não         | Classes adicionais                             |

### AccordionItem

| Prop        | Tipo     | Padrão | Obrigatória | Descrição                   |
| ----------- | -------- | ------ | ----------- | --------------------------- |
| `value`     | `string` | —      | Sim         | Identificador único do item |
| `className` | `string` | —      | Não         | Classes adicionais          |

### AccordionTrigger

| Prop        | Tipo        | Padrão | Obrigatória | Descrição                                  |
| ----------- | ----------- | ------ | ----------- | ------------------------------------------ |
| `className` | `string`    | —      | Não         | Classes adicionais                         |
| `children`  | `ReactNode` | —      | Não         | Conteúdo do cabeçalho                      |
| `disabled`  | `boolean`   | —      | Não         | Desabilita o trigger (herdado da Radix UI) |

### AccordionContent

| Prop        | Tipo        | Padrão | Obrigatória | Descrição          |
| ----------- | ----------- | ------ | ----------- | ------------------ |
| `className` | `string`    | —      | Não         | Classes adicionais |
| `children`  | `ReactNode` | —      | Não         | Conteúdo do painel |

---

## Tokens de design utilizados

| Token                | Slot onde é usado                                                        |
| -------------------- | ------------------------------------------------------------------------ |
| `--border`           | Borda externa do Accordion e divisores entre itens (`not-last:border-b`) |
| `--muted`            | Fundo do item aberto (`data-open:bg-muted/50`)                           |
| `--muted-foreground` | Cor dos ícones de chevron                                                |
| `--foreground`       | Cor do texto do trigger e conteúdo                                       |

---

## Comportamentos e estados

| Estado           | Comportamento esperado                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Fechado (padrão) | Apenas o trigger é visível; conteúdo oculto                                                                                   |
| Aberto           | Conteúdo visível com animação `accordion-down`; fundo do item muda para `bg-muted/50`                                         |
| Transição        | Animações `accordion-down` (abrir) e `accordion-up` (fechar) via `data-open` / `data-closed`                                  |
| Disabled         | Trigger com `disabled` não responde a clique e fica `opacity-50`                                                              |
| Hover            | Trigger mostra underline                                                                                                      |
| Focus-visible    | Trigger usa `outline-none` sem `focus-visible:ring` alternativo — indicador de foco ausente (apenas fallback nativo do Radix) |

---

## Acessibilidade

| Requisito             | Implementação                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| WAI-ARIA Accordion    | Herdado da Radix UI: `aria-expanded` no trigger, `aria-controls` vinculado ao content             |
| Navegação por teclado | Teclas `ArrowDown`/`ArrowUp`/`Home`/`End` para navegação entre triggers (Radix)                   |
| Estrutura semântica   | `AccordionPrimitive.Header` envolve cada trigger; conteúdo dentro de `AccordionPrimitive.Content` |
| Contraste de foco     | Trigger usa `outline-none` sem indicador de foco customizado — indicador de foco ausente          |
| Screen reader         | Chevrons têm `pointer-events-none` e não interferem na leitura                                    |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Single com 3 itens FAQ, primeiro aberto por padrão
- [x] `Multiple` — Modo multiple com 3 itens independentes
- [x] `Collapsible` — Single collapsible, item pode ser fechado ao clicar novamente
- [x] `DefaultOpen` — Segundo item pre-expandido via `defaultValue`
- [x] `RichContent` — Conteúdo complexo com listas, links e parágrafos

---

## Checklist antes de implementar

- [x] Escala tipográfica — trigger usa `text-sm font-medium`, conteúdo usa `text-sm`
- [x] Tokens semânticos — `border`, `muted`, `muted-foreground`, `foreground`
- [x] Animações — `accordion-down`/`accordion-up` definidas no `globals.css`
- [x] Espaçamento — `gap-6` entre trigger-icon, `p-4` no trigger, `px-4` no content
- [x] Ícones — ChevronDownIcon (fechado) / ChevronUpIcon (aberto), troca via `group-aria-expanded`
