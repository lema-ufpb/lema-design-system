# Spec: ds-contact-channels

> Contact Channels (bloco composto — não é um átomo novo).

---

## Propósito

Linha de cartões de canal de contato (e-mail, telefone, chat), remontando o bloco "Three-channel contact cards" do blockus a partir de `CardIcon`.

**Usar quando:** Quiser oferecer múltiplos canais de contato lado a lado.
**Não usar quando:** Só houver um canal — use `CardIcon` diretamente.

---

## Localização

| Campo      | Valor                                             |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/contact-channels.tsx`                    |
| Tipo       | `registry:block` (name: `ds-contact-channels`)         |
| Categoria  | `Layout`                                                |
| Depende de | `ds-card-icon`                                          |

---

## API — Props

| Prop       | Tipo               | Obrigatória | Descrição                    |
| ----------- | -------------------- | ----------- | -------------------------------- |
| `channels` | `ContactChannel[]`  | ✓           | Canais (`icon,title,description,href,actionLabel,tone`) |

---

## Acessibilidade

Herdada integralmente de `CardIcon`.

---

## Stories obrigatórias no Storybook

- [x] `Default`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista o átomo consumido
