# Spec: ds-contact-split

> Contact Split (bloco composto — não é um átomo novo).

---

## Propósito

Seção de contato split — formulário de um lado, slot flexível do outro — remontando os blocos "Split contact with details", "Form with HQ panel", "Meet the team contact" e "Form with office locations" do blockus a partir de `HeroSection` e `ds-contact-form`. O slot `aside` aceita `OfficeLocations`, `TeamRoster`, uma lista de `CardIcon`, ou texto simples.

**Usar quando:** Página de contato com formulário + contexto adicional ao lado (escritórios, time, detalhes).
**Não usar quando:** Não precisar do slot lateral — use `ds-contact-form` sozinho, centralizado.

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/contact-split.tsx`             |
| Tipo       | `registry:block` (name: `ds-contact-split`)   |
| Categoria  | `Layout`                                      |
| Depende de | `ds-hero-section`, `ds-contact-form`, `badge` |

---

## API — Props

| Prop          | Tipo               | Obrigatória | Descrição                         |
| ------------- | ------------------ | ----------- | --------------------------------- |
| `kicker`      | `string`           |             | Badge acima do título             |
| `title`       | `React.ReactNode`  | ✓           | Título (renderizado como `h2`)    |
| `description` | `string`           |             | Parágrafo de apoio                |
| `formProps`   | `ContactFormProps` |             | Props repassadas ao `ContactForm` |
| `aside`       | `React.ReactNode`  | ✓           | Conteúdo ao lado do formulário    |

---

## Comportamentos e estados

`HeroTitle` usa `as="h2"` por padrão (esta seção normalmente não é o topo da página) — evita quebrar a ordem de headings quando composta abaixo de um hero com `h1`.

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `WithOfficeLocations`
- [x] `WithTeam`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
- [x] Heading level correto (`h2`) para evitar `heading-order`
