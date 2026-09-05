# Spec: ds-logo-cloud-stats

> Logo Cloud Stats (bloco composto — não é um átomo novo).

---

## Propósito

Estatística/headline em destaque acima de um mural de logos, remontando os blocos "Headline-count logos" e "Hero stat with logo row" do blockus a partir de `ds-press-wall`.

**Usar quando:** Quiser reforçar prova social com um número grande ("500+ empresas confiam") acima dos logos.
**Não usar quando:** Não houver uma estatística a destacar — use `ds-press-wall` sozinho.

---

## Localização

| Campo      | Valor                                             |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/logo-cloud-stats.tsx`                     |
| Tipo       | `registry:block` (name: `ds-logo-cloud-stats`)          |
| Categoria  | `Layout`                                                 |
| Depende de | `ds-press-wall`                                          |

---

## API — Props

| Prop          | Tipo               | Obrigatória | Descrição                          |
| -------------- | -------------------- | ----------- | -------------------------------------- |
| `headline`    | `React.ReactNode`   | ✓           | Estatística/headline em destaque        |
| `description` | `string`            |             | Texto de apoio abaixo do headline       |
| `kicker`      | `string`            |             | Repassado ao `PressWall`                |
| `children`    | `React.ReactNode`   | ✓           | `PressWallLogo` itens                    |

---

## Acessibilidade

Herdada integralmente de `PressWall`.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas o átomo já existente (`ds-press-wall`)
- [x] `registryDependencies` lista o átomo consumido
