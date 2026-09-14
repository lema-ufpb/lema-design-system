# Spec: Reading Progress

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `ReadingProgress` exibe uma fina barra de progresso no topo da tela ou container, preenchendo-se da esquerda para a direita conforme o usuário faz o scroll da página.
**Usar quando:** Artigos longos, guias extensos ou documentações complexas, ajudando a dar uma sensação de "quanto falta".
**Não usar quando:** Páginas curtas, modais não-scrolláveis ou se a página possuir scroll infinito.
**Alternativa se não se aplicar:** Barra de scroll nativa ou indicativos de página (`Pagination`).

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ds/reading-progress.tsx` |
| Tipo       | `registry:ui`                        |
| Categoria  | `Data Display` / `Navigation`        |
| Depende de | Nenhum                               |

---

## API — Props

| Prop            | Tipo                           | Padrão         | Obrigatória | Descrição                                                      |
| --------------- | ------------------------------ | -------------- | ----------- | -------------------------------------------------------------- |
| `targetRef`     | `React.RefObject<HTMLElement>` | `undefined`    |             | Ref do container com overflow. Se vazio, usa `window`.         |
| `progressColor` | `string`                       | `"bg-primary"` |             | Classe tailwind de cor para o fill da barra.                   |
| `height`        | `"sm" \| "md" \| "lg"`         | `"sm"`         |             | Altura da barra.                                               |
| `className`     | `string`                       | —              |             | Classes para o container da barra (background/posicionamento). |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

Nenhuma via CVA, usaremos um mapeamento simples para `height`.

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| height   | `sm`, `md`, `lg` | `sm`   |

---

## Tokens de design utilizados

| Token               | Slot onde é usado           |
| ------------------- | --------------------------- |
| `bg-primary`        | Fundo da barra de progresso |
| `h-1`, `h-2`, `h-3` | Alturas                     |

---

## Escala tipográfica e de tamanho

| Dimensão | Slot         | sm    | md    | lg    |
| -------- | ------------ | ----- | ----- | ----- |
| height   | Altura (h-*) | `h-1` | `h-2` | `h-3` |

---

## Comportamentos e estados

| Estado   | Comportamento esperado                              |
| -------- | --------------------------------------------------- |
| Resize   | Ao redimensionar a janela, a porcentagem se adapta. |
| Position | Por padrão usa `fixed left-0 top-0 w-full z-50`.    |

---

## Acessibilidade

| Requisito      | Implementação                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| Role semântico | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` atualizados em tempo real. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Mostrando com conteúdo falso gigante (window scroll).
- [x] `Container` — Acoplado a um container com scroll próprio via ref.

---

## Checklist antes de implementar

- [x] Eventos de scroll `passive: true`
- [x] Unmount limpa os event listeners
- [x] Atualização de layout suporta SSR (checar `typeof window`)
