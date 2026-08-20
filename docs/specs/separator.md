# Spec: Separator

> Divisor visual para separar conteúdo em seções distintas.

---

## Propósito

**Usar quando:** Separar visualmente grupos de conteúdo ou elementos em um layout horizontal ou vertical.

**Não usar quando:** A separação é semântica e deve ser anunciada por leitores de tela — configurar `decorative=false`.

**Alternativa:** `border` CSS para separação entre elementos; Espaçamento (`gap`) para agrupamento.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ui/separator.tsx`              |
| Tipo       | `registry:ui` (name: `separator`)          |
| Categoria  | Layout                                     |
| Depende de | `radix-ui` (Separator), `@/lib/utils` (cn) |

---

## API — Props

| Prop          | Tipo                         | Padrão         | Obrigatória | Descrição                 |
| ------------- | ---------------------------- | -------------- | ----------- | ------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Não         | Direção do separador      |
| `decorative`  | `boolean`                    | `true`         | Não         | Se é puramente decorativo |
| `className`   | `string`                     | —              | Não         | Classes adicionais        |

---

## Tokens de design

| Token      | Slot                   |
| ---------- | ---------------------- |
| `--border` | Cor da linha divisória |

---

## Comportamentos e estados

| Estado     | Comportamento                            |
| ---------- | ---------------------------------------- |
| Horizontal | Linha `h-px`, largura `w-full`           |
| Vertical   | Linha `w-px`, auto altura `self-stretch` |
| Decorativo | `aria-hidden` não é anunciado            |

---

## Acessibilidade

| Requisito  | Implementação                                |
| ---------- | -------------------------------------------- |
| Decorativo | `decorative=true` por padrão (não anunciado) |
| Semântico  | `decorative=false` para separador de seção   |
| Orientação | `aria-orientation` pelo Radix                |

---

## Stories obrigatórias

- [x] `Horizontal` — Divisor entre textos
- [x] `Vertical` — Divisores entre labels em linha

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a orientação horizontal e vertical
- [x] Prop `decorative`
- [x] Atributo `data-slot` no elemento raiz
