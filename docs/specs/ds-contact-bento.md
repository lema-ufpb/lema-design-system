# Spec: ds-contact-bento

> Contact Bento (bloco composto — não é um átomo novo).

---

## Propósito

Grid bento com o formulário de contato como tile principal e tiles satélite (localização, tempo de resposta, etc.), remontando o bloco "Bento contact form" do blockus a partir de `BentoGrid` e `ds-contact-form`.

**Usar quando:** Página de contato com estilo bento, misturando o formulário com informações de apoio em tiles.
**Não usar quando:** Precisar de um layout simples de duas colunas — use `ds-contact-split`.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/contact-bento.tsx`           |
| Tipo       | `registry:block` (name: `ds-contact-bento`) |
| Categoria  | `Layout`                                    |
| Depende de | `ds-bento-grid`, `ds-contact-form`          |

---

## API — Props

| Prop        | Tipo               | Descrição                                                     |
| ----------- | ------------------ | ------------------------------------------------------------- |
| `formProps` | `ContactFormProps` | Props repassadas ao `ContactForm`                             |
| `children`  | `React.ReactNode`  | `BentoGridItem`s adicionais (localização, estatísticas, etc.) |

---

## Comportamentos e estados

O tile do formulário ocupa `colSpan={2} rowSpan={2}` por padrão (`BentoGridItem` com `items-stretch justify-center`).

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
