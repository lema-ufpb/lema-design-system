# Spec: BackgroundGlow

---

## Propósito

Elemento decorativo de ambientação luminosa e texturas de fundo em CSS puro (Aurora, Spotlight, Beam e Grid-dots) para seções Hero sem degradação de performance.

**Usar quando:** Adicionar profundidade e atmosfera visual moderna atrás de títulos e cards.
**Não usar quando:** Precisar de elementos interativos clicáveis.
**Alternativa se não se aplicar:** Background plano comum.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/background-glow.tsx` |
| Tipo       | `registry:ui`                       |
| Categoria  | `Data Display`                      |
| Depende de | Nenhum primitivo externo            |

---

## API — Props

| Prop        | Tipo                                               | Padrão      | Obrigatória | Descrição               |
| ----------- | -------------------------------------------------- | ----------- | ----------- | ----------------------- |
| `variant`   | `"aurora" \| "beam" \| "spotlight" \| "grid-dots"` | `"aurora"`  |             | Estilo do efeito visual |
| `tone`      | `"primary" \| "violet" \| "sky" \| "neutral"`      | `"primary"` |             | Tom semântico do brilho |
| `className` | `string`                                           | —           |             | Classes extras          |

---

## Variantes CVA

| Dimensão  | Valores                                    | Padrão    |
| --------- | ------------------------------------------ | --------- |
| `variant` | `aurora`, `beam`, `spotlight`, `grid-dots` | `aurora`  |
| `tone`    | `primary`, `violet`, `sky`, `neutral`      | `primary` |

- `backgroundGlowVariants` — container absoluto com pointer-events-none

---

## Acessibilidade

- [x] Totalmente decorativo com `aria-hidden="true"`
- [x] `pointer-events-none` absoluto para não bloquear cliques
