# Spec: Table of Contents

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `TableOfContents` é um menu de navegação em árvore (geralmente lateral) que lista os títulos de uma página ou artigo. Ele rastreia automaticamente o scroll da página, destacando qual seção está visível no momento (Spy Scroll).
**Usar quando:** Postagens de blog muito grandes, guias de documentação (como este spec), ou páginas institucionais com âncoras.
**Não usar quando:** A página for muito curta ou não possuir um fluxo linear claro de conteúdo.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/table-of-contents.tsx` |
| Tipo       | `registry:ui`                         |
| Categoria  | `Navigation`                          |
| Depende de | Nenhum                                |

---

## API — Props

| Prop          | Tipo                                             | Padrão | Obrigatória | Descrição                                                                                     |
| ------------- | ------------------------------------------------ | ------ | ----------- | --------------------------------------------------------------------------------------------- |
| `items`       | `{ id: string; title: string; level: number }[]` | `[]`   | ✓           | Lista plana de itens. O `level` dita o recuo (h1=1, h2=2...).                                 |
| `activeId`    | `string`                                         | —      |             | Se passado, controla o item ativo. Se não, usa IntersectionObserver.                          |
| `onItemClick` | `(id: string) => void`                           | —      |             | Callback ao clicar no link (ex: para fazer o scroll manual). Se não passado, faz anchor link. |
| `className`   | `string`                                         | —      |             | Classes para o container `<nav>`.                                                             |
| `offset`      | `number`                                         | `100`  |             | Offset em pixels para a ativação do scroll spy.                                               |

> Estender `HTMLAttributes<HTMLElement>`.

---

## Variantes CVA

Nenhuma.

---

## Tokens de design utilizados

| Token                       | Slot onde é usado          |
| --------------------------- | -------------------------- |
| `text-muted-foreground`     | Itens inativos             |
| `text-foreground`           | Item ativo                 |
| `border-l-2 border-primary` | Borda de destaque no ativo |
| `border-l border-border`    | Borda base (track)         |

---

## Escala tipográfica e de tamanho

A tipografia deve ser `text-sm`.
Recuos: `pl-4` para nível principal, `pl-8` para nível secundário, etc.

---

## Comportamentos e estados

| Estado | Comportamento esperado                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------- |
| Scroll | `IntersectionObserver` atualiza o estado interno do ativo se `activeId` não for controlado externamente. |
| Click  | Rola suavemente até o elemento se `onItemClick` for padrão.                                              |

---

## Acessibilidade

| Requisito         | Implementação                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------- |
| Navegação por tab | Todos os itens renderizam `<a>` (mesmo com `onClick` previnindo default para scroll suave). |
| Semântica         | `<nav aria-label="Table of contents">` e uma lista `<ul>`.                                  |

---

## Stories obrigatórias no Storybook

- [x] `Default` — com estado interno cuidando de divs gigantes (mockando as âncoras na mesma story).

---

## Checklist antes de implementar

- [x] IntersectionObserver limpo no unmount.
- [x] Prevenir erros no SSR para APIs do DOM.
- [x] Cálculo dinâmico do `margin-left` baseado no `level`.
