# Spec: ds-logo-cloud-quotes

> Logo Cloud Quotes (bloco composto — não é um átomo novo).

---

## Propósito

Logo do cliente pareado com um depoimento curto em grid de cartões, remontando os blocos "Logo + quote pairs" e "Customer story tiles" do blockus a partir de `ds-pull-quote`. O logo renderiza em cor plena (sem o tratamento grayscale do `ds-press-wall`, que é para murais grandes, não para um lockup individual em destaque).

**Usar quando:** Tiver poucos depoimentos (2–4) com o logo do cliente associado.
**Não usar quando:** For um mural grande de logos sem depoimento — use `ds-press-wall`.

---

## Localização

| Campo      | Valor                                           |
| ---------- | ----------------------------------------------- |
| Arquivo    | `components/ds/logo-cloud-quotes.tsx`           |
| Tipo       | `registry:block` (name: `ds-logo-cloud-quotes`) |
| Categoria  | `Layout`                                        |
| Depende de | `ds-pull-quote`                                 |

---

## API — Props

| Prop    | Tipo                   | Obrigatória | Descrição                                       |
| ------- | ---------------------- | ----------- | ----------------------------------------------- |
| `items` | `LogoCloudQuoteItem[]` | ✓           | `{ logo, quote, name, role?, avatarFallback? }` |

---

## Acessibilidade

Herdada integralmente de `PullQuote`. O logo é um `ReactNode` livre — garanta `alt`/rótulo acessível na marca fornecida.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas o átomo já existente (`ds-pull-quote`)
- [x] `registryDependencies` lista o átomo consumido
