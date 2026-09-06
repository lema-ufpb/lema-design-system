# Spec: ds-dashboard-layout

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

**Usar quando:** Precisar de um layout base para dashboards complexos, que inclua uma navegação lateral (Sidebar), um cabeçalho global (Header) e uma área de conteúdo (Main). Ideal para estruturar aplicações SPA ou dashboards densos em dados.
**Não usar quando:** Para páginas simples institucionais ou landing pages.
**Alternativa se não se aplicar:** Utilizar estruturas mais simples baseadas apenas em Header (ex. `hero-*`).

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/dashboard-layout.tsx`                   |
| Tipo       | `registry:ui`                                          |
| Categoria  | `Blocks` / `Layout`                                    |
| Depende de | `app-sidebar.tsx`, `SidebarProvider`, `SidebarTrigger` |

---

## API — Props

| Prop        | Tipo        | Padrão | Obrigatória | Descrição                |
| ----------- | ----------- | ------ | ----------- | ------------------------ |
| `children`  | `ReactNode` | —      | ✓           | Conteúdo principal       |
| `sidebar`   | `ReactNode` | —      | ✓           | O menu lateral (Sidebar) |
| `header`    | `ReactNode` | —      |             | O cabeçalho global       |
| `className` | `string`    | —      |             | Classes extras de layout |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

N/A para este componente wrapper que lida primariamente com estrutura. Apenas `containerVariants` pode ser usado se aplicável para layout geral, mas não há `size` ou `intent`.

---

## Tokens de design utilizados

| Token           | Slot onde é usado        |
| --------------- | ------------------------ |
| `bg-background` | fundo geral do layout    |
| `border-border` | divisórias entre regiões |

---

## Escala tipográfica e de tamanho

N/A. Baseado nos atômicos inseridos dentro (como o app-sidebar e components de header).

---

## Comportamentos e estados

| Estado         | Comportamento esperado                                |
| -------------- | ----------------------------------------------------- |
| Resize de tela | Ocultação automática da sidebar via `SidebarProvider` |

---

## Acessibilidade

| Requisito      | Implementação                           |
| -------------- | --------------------------------------- |
| Role semântico | `<div role="main">` na área de conteúdo |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado padrão com sidebar mockada e área de conteúdo simples.

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
