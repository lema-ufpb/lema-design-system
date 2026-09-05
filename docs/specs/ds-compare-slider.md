# Spec: ds-compare-slider

> Compare Slider (comparação antes/depois).

---

## Propósito

Slider de comparação antes/depois via `clip-path` (nenhuma imagem é esticada durante o arraste), controlado por um `<input type="range">` nativo sobreposto — arrastável com mouse/touch e acessível via teclado.

**Usar quando:** Mostrar uma transformação (antes/depois de um redesign, edição, etc.).
**Não usar quando:** Não houver duas imagens comparáveis do mesmo enquadramento.

---

## Localização

| Campo      | Valor                                        |
| ---------- | ------------------------------------------------- |
| Arquivo    | `components/ds/compare-slider.tsx`                  |
| Tipo       | `registry:ui` (name: `ds-compare-slider`)          |
| Categoria  | `Data Display`                                      |
| Depende de | `lucide-react`                                      |

---

## API — Props

| Prop           | Tipo      | Padrão | Descrição                              |
| --------------- | ----------- | ------ | ------------------------------------------- |
| `beforeSrc`    | `string`   | —      | Imagem "antes"                              |
| `beforeAlt`    | `string`   | —      | Alt da imagem "antes"                       |
| `afterSrc`     | `string`   | —      | Imagem "depois"                             |
| `afterAlt`     | `string`   | —      | Alt da imagem "depois"                      |
| `defaultValue` | `number`   | `50`   | Posição inicial do controle (0–100)         |
| `label`        | `string`   | —      | `aria-label` do controle deslizante         |

---

## Comportamentos e estados

| Estado                | Comportamento esperado                                                 |
| ------------------------ | ---------------------------------------------------------------------------- |
| Arraste do controle      | `clip-path: inset(0 {100-value}% 0 0)` na imagem "antes" — sem distorção     |
| Teclado (setas)          | Navegação nativa do `<input type="range">`                                    |

---

## Acessibilidade

| Requisito     | Implementação                                                    |
| --------------- | ---------------------------------------------------------------------- |
| Controle         | `<input type="range">` nativo sobreposto — foco, teclado e leitor de tela de graça |
| `aria-label`     | Via prop `label`                                                        |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `StartAt25`

---

## Checklist antes de implementar

- [x] Controle via elemento nativo (`<input type="range">`), não `div` com `role` customizado
- [x] `aria-label` no controle
