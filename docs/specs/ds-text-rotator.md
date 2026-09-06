# Spec: TextRotator

---

## Propósito

Alternador animado de palavras-chave para headlines de destaque, permitindo apresentar múltiplos casos de uso ou propostas de valor na mesma linha de texto.

**Usar quando:** Quiser demonstrar versatilidade ou audiências variadas no título principal do Hero.
**Não usar quando:** O texto exigir leitura estática contínua ou impressão.
**Alternativa se não se aplicar:** Texto com vírgulas ou parágrafo descritivo.

---

## Localização

| Campo      | Valor                            |
| ---------- | -------------------------------- |
| Arquivo    | `components/ds/text-rotator.tsx` |
| Tipo       | `registry:ui`                    |
| Categoria  | `Data Display`                   |
| Depende de | Nenhum primitivo externo         |

---

## API — Props

| Prop           | Tipo                | Padrão    | Obrigatória | Descrição                         |
| -------------- | ------------------- | --------- | ----------- | --------------------------------- |
| `words`        | `string[]`          | `[]`      | ✓           | Lista de palavras para rotacionar |
| `interval`     | `number`            | `3000`    |             | Intervalo em milissegundos        |
| `transition`   | `"slide" \| "fade"` | `"slide"` |             | Tipo de transição visual          |
| `pauseOnHover` | `boolean`           | `true`    |             | Pausa rotação no hover ou foco    |
| `className`    | `string`            | —         |             | Classes extras                    |

---

## Variantes CVA

| Dimensão     | Valores         | Padrão  |
| ------------ | --------------- | ------- |
| `transition` | `slide`, `fade` | `slide` |

---

## Acessibilidade

- [x] Região com `aria-live="polite"` e `aria-atomic="true"`
- [x] Respeita `prefers-reduced-motion` pausando a rotação automática
