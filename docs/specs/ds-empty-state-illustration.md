# Spec: EmptyStateIllustration

## Propósito

Estado vazio (Empty State) enriquecido com ilustrações vetoriais (SVG) e temas específicos para momentos sem dados: buscas sem resultados, caixa de entrada limpa, erros, ausência de filtros, bloqueios de permissão ou novos uploads.

**Usar quando:** guiar o usuário em telas sem conteúdo ou após ações de exclusão/filtro.  
**Não usar quando:** necessitar de um placeholder simples e inline (use `components/ui/empty`).  
**Alternativa se não se aplicar:** `components/ui/empty`.

---

## Localização

| Campo      | Valor                                        |
| ---------- | -------------------------------------------- |
| Arquivo    | `components/ds/empty-state-illustration.tsx` |
| Tipo       | `registry:ui`                                |
| Categoria  | `Feedback/EmptyStateIllustration`            |
| Depende de | `skeleton`                                   |

---

## API — Props

| Prop          | Tipo                                                                                           | Padrão      | Obrigatória | Descrição                            |
| ------------- | ---------------------------------------------------------------------------------------------- | ----------- | ----------- | ------------------------------------ |
| `variant`     | `"default" \| "search" \| "error" \| "success" \| "inbox" \| "filter" \| "upload" \| "locked"` | `"default"` |             | Tema visual e ilustração SVG         |
| `size`        | `"sm" \| "md" \| "lg"`                                                                         | `"md"`      |             | Escala da ilustração e textos        |
| `title`       | `string`                                                                                       | —           |             | Título do estado vazio               |
| `description` | `string`                                                                                       | —           |             | Texto de apoio explicativo           |
| `action`      | `ReactNode`                                                                                    | —           |             | Botão primário para ação recomendada |
| `loading`     | `boolean`                                                                                      | `false`     |             | Estado de carregamento               |

---

## Stories obrigatórias

- [x] `Default` — ilustração padrão
- [x] `SearchEmpty` — busca sem resultados
- [x] `InboxEmpty` — caixa de entrada zerada
- [x] `AllVariants` — grade com todas as 8 variantes visuais
- [x] `AllSizes` — sm, md, lg
- [x] `Loading` — skeletons de ilustração e textos
