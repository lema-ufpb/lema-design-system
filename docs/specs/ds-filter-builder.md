# Spec: ds-filter-builder

> Construtor de Filtros Avançados (Filter Builder).

---

## Propósito

Permite ao usuário construir consultas complexas compostas por múltiplas condições (campo, operador, valor), útil em tabelas de dados ou relatórios.

**Usar quando:** Você precisa de filtragem avançada além de buscas simples de texto.

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/filter-builder.tsx`                     |
| Tipo       | `registry:ui` (name: `ds-filter-builder`)              |
| Categoria  | `Data Display`                                         |
| Depende de | `select`, `input`, `button`, `lucide-react`, `ui-i18n` |

---

## Estrutura de Dados

```typescript
export interface FilterRule {
  id: string
  field: string
  operator: string
  value: string
}

export interface FilterField {
  id: string
  label: string
  operators: { value: string; label: string }[]
}
```

## API — Props

| Prop       | Tipo                            | Padrão    | Obrigatória | Descrição                       |
| ---------- | ------------------------------- | --------- | ----------- | ------------------------------- |
| `fields`   | `FilterField[]`                 | —         | Sim         | Campos disponíveis para filtrar |
| `rules`    | `FilterRule[]`                  | —         | Sim         | Regras atuais                   |
| `onChange` | `(rules: FilterRule[]) => void` | —         |             | Callback ao atualizar regras    |
| `locale`   | `UILocale`                      | `"pt-BR"` |             | Localização para os botões      |

---

## Variantes CVA

Não possui. O layout é fixo em um container flexível com gap entre os inputs.

---

## Acessibilidade

- Todos os campos iterativos (selects, inputs) devem ter labels (mesmo que `aria-label`).
- Botão de remover com `aria-label="Remover regra"`.

---

## Stories obrigatórias no Storybook

- [x] `Default` (Controlado no Story)
- [x] `Empty`

---

## Checklist antes de implementar

- [x] O componente permite "Adicionar regra" (adiciona um objeto vazio ou com defaults na lista).
- [x] O botão "Remover" exclui a regra pelo ID.
- [x] Renderiza 3 blocos por regra: Campo (Select), Operador (Select), Valor (Input).
