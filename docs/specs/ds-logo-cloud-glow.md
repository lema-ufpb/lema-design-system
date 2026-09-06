# Spec: ds-logo-cloud-glow

> Logo Cloud Glow (bloco composto — não é um átomo novo).

---

## Propósito

Mural de logos centralizado dentro de um card com glow que reage ao ponteiro, remontando o bloco "Glow centered logos" do blockus a partir de `ds-press-wall` e `ds-cursor-spotlight`.

**Usar quando:** Quiser um mural de logos com um toque interativo/premium.
**Não usar quando:** Preferir um visual neutro — use `ds-press-wall` diretamente.

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/logo-cloud-glow.tsx`           |
| Tipo       | `registry:block` (name: `ds-logo-cloud-glow`) |
| Categoria  | `Layout`                                      |
| Depende de | `ds-press-wall`, `ds-cursor-spotlight`        |

---

## API — Props

| Prop       | Tipo                             | Padrão      | Descrição                      |
| ---------- | -------------------------------- | ----------- | ------------------------------ |
| `kicker`   | `string`                         | —           | Repassado ao `PressWall`       |
| `tone`     | `"primary" \| "violet" \| "sky"` | `"primary"` | Repassado ao `CursorSpotlight` |
| `children` | `React.ReactNode`                | —           | `PressWallLogo` itens          |

---

## Acessibilidade

Herdada integralmente de `PressWall` e `CursorSpotlight` (glow é puramente decorativo, `aria-hidden`).

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `VioletTone`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista os átomos consumidos
