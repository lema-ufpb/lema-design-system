# Spec: Marquee

---

## Propósito

Carrossel de rolagem contínua horizontal ou vertical para logos de clientes, parceiros, depoimentos ou cartões de dados, comum em seções de destaque e hero.

**Usar quando:** Apresentar nuvem de logos, tickers de métricas ou depoimentos contínuos.
**Não usar quando:** Precisar de navegação paginada por clique manual exclusivo (usar `Carousel`).
**Alternativa se não se aplicar:** `Carousel`.

---

## Localização

| Campo      | Valor                                |
| ---------- | ------------------------------------ |
| Arquivo    | `components/ds/marquee.tsx`          |
| Tipo       | `registry:ui`                        |
| Categoria  | `Data Display`                       |
| Depende de | Nenhum primitivo externo obrigatório |

---

## API — Props

| Prop           | Tipo                                  | Padrão     | Obrigatória | Descrição                            |
| -------------- | ------------------------------------- | ---------- | ----------- | ------------------------------------ |
| `direction`    | `"left" \| "right" \| "up" \| "down"` | `"left"`   |             | Direção da rolagem                   |
| `pauseOnHover` | `boolean`                             | `true`     |             | Pausa animação ao passar o mouse     |
| `speed`        | `"slow" \| "normal" \| "fast"`        | `"normal"` |             | Velocidade da animação               |
| `fadeEdges`    | `boolean`                             | `true`     |             | Adiciona máscara suave com gradiente |
| `repeat`       | `number`                              | `2`        |             | Quantidade de repetições do conteúdo |
| `className`    | `string`                              | —          |             | Classes extras                       |

---

## Variantes CVA

| Dimensão    | Valores                       | Padrão   |
| ----------- | ----------------------------- | -------- |
| `direction` | `left`, `right`, `up`, `down` | `left`   |
| `speed`     | `slow`, `normal`, `fast`      | `normal` |

- `marqueeVariants` — container com overflow hidden
- `marqueeTrackVariants` — flex track com animação contínua

---

## Acessibilidade

- [x] Respeita `prefers-reduced-motion` pausando a animação
- [x] Elementos clonados recebem `aria-hidden="true"` para evitar repetições em screen readers
