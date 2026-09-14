# Spec: Magnetic Element

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

O `MagneticElement` é um wrapper invisível (HOC ou wrapper div) que aplica um efeito físico de atração magnética quando o cursor do mouse se aproxima.
**Usar quando:** Quiser dar destaque a CTAs primários, botões flutuantes ou ícones de ferramentas interativas em landing pages.
**Não usar quando:** Em interfaces densas de dados (dashboards, formulários complexos) onde o movimento constante pode ser distrativo.
**Alternativa se não se aplicar:** Um botão comum com simples efeito `hover:bg-accent`.

---

## Localização

| Campo      | Valor                                                |
| ---------- | ---------------------------------------------------- |
| Arquivo    | `components/ds/magnetic-element.tsx`                 |
| Tipo       | `registry:ui`                                        |
| Categoria  | `Feedback` / `Delight`                               |
| Depende de | (nenhum primitivo shadcn específico, usa React puro) |

---

## API — Props

| Prop        | Tipo        | Padrão  | Obrigatória | Descrição                                                 |
| ----------- | ----------- | ------- | ----------- | --------------------------------------------------------- |
| `children`  | `ReactNode` | —       | ✓           | Elemento a ser "magnetizado"                              |
| `strength`  | `number`    | `50`    |             | Força de atração em pixels (área de efeito e intensidade) |
| `className` | `string`    | —       |             | Classes extras de layout do wrapper                       |
| `asChild`   | `boolean`   | `false` |             | Se true, usa o Radix Slot para não criar div extra        |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

O componente em si é transparente e não possui variações visuais de tamanho ou cor (isso é delegado ao `children`), porém ele possui configuração de força.

| Dimensão   | Valores                | Padrão |
| ---------- | ---------------------- | ------ |
| `strength` | (configurado via prop) | `50`   |

**Slots do componente**:

- `containerVariants` — wrapper externo transparente.

---

## Tokens de design utilizados

Nenhum token de cor é aplicado diretamente, já que é um wrapper invisível focado em comportamento (transformações CSS).

---

## Escala tipográfica e de tamanho

N/A (herda do `children`).

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------- |
| Hover (Mouse Enter) | O elemento interpola sua posição `x` e `y` na direção do cursor, com easing (física de mola). |
| Mouse Leave         | O elemento retorna suavemente para `x: 0, y: 0`.                                              |
| `disabled`          | Ignora a atração magnética.                                                                   |

---

## Acessibilidade

| Requisito             | Implementação                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Role semântico        | Transparente (o `children` mantém sua semântica).                                                                                        |
| Acessibilidade Visual | Respeita a media query `prefers-reduced-motion: reduce`. Se o usuário preferir menos animação, o efeito é desativado ou reduzido a zero. |

---

## Stories obrigatórias no Storybook

- [x] `Default` — envolvendo um botão com valores de strength moderados.
- [x] `Strong` — força de atração maior, envolvendo um Card.
- [x] `AsChild` — usando prop asChild para evitar criação de div wrapper.

---

## Checklist antes de implementar

- [x] Escala tipográfica (N/A)
- [x] Tokens semânticos (N/A)
- [x] `asChild` utilizando `@radix-ui/react-slot` se necessário.
- [x] Efeito é desativado se `prefers-reduced-motion`.
- [x] `cn()` para classes.
- [x] Spacing via Tailwind.
