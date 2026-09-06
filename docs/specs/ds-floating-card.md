# Spec: ds-floating-card

> Floating Card (card com tilt 3D ao seguir o ponteiro).

---

## Propósito

Envolve um screenshot/mockup de produto com um tilt 3D sutil que reage à posição do ponteiro — para dar profundidade a um hero. Inspirado no bloco "Gradient mesh hero with floating card" do blockus.

**Usar quando:** Exibir um screenshot/UI mockup em destaque em um hero.
**Não usar quando:** O conteúdo for interativo (formulário, botões) — o tilt 3D pode atrapalhar a interação; use um `Card` estático.

---

## Localização

| Campo      | Valor                                    |
| ---------- | ---------------------------------------- |
| Arquivo    | `components/ds/floating-card.tsx`        |
| Tipo       | `registry:ui` (name: `ds-floating-card`) |
| Categoria  | `Layout`                                 |
| Depende de | — (nenhum primitivo shadcn)              |

---

## API — Props

| Prop        | Tipo              | Padrão | Descrição                            |
| ----------- | ----------------- | ------ | ------------------------------------ |
| `intensity` | `number`          | `8`    | Rotação máxima em graus              |
| `children`  | `React.ReactNode` | —      | Conteúdo do card (screenshot/mockup) |

---

## Tokens de design utilizados

| Token           | Slot               |
| --------------- | ------------------ |
| `bg-card`       | superfície do card |
| `border-border` | borda do card      |

---

## Comportamentos e estados

| Estado                           | Comportamento esperado                                                    |
| -------------------------------- | ------------------------------------------------------------------------- |
| `pointermove` sobre o card       | Aplica `rotateX`/`rotateY`/`scale3d` via transform, escrito direto no DOM |
| `pointerleave`                   | Remove o transform (retorna ao estado neutro) com transição suave         |
| `prefers-reduced-motion: reduce` | Não aplica nenhum tilt — card permanece estático                          |

---

## Acessibilidade

| Requisito          | Implementação                                            |
| ------------------ | -------------------------------------------------------- |
| Movimento reduzido | Respeitado via `prefers-reduced-motion` (ver acima)      |
| Conteúdo           | Renderizado normalmente — nenhuma alteração de semântica |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `CustomIntensity`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas
- [x] `prefers-reduced-motion` respeitado
- [x] Sem `aria-live`/anúncios (efeito puramente visual)
