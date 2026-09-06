# Spec: ds-hero-stats

> Hero Stats (bloco composto — não é um átomo novo).

---

## Propósito

Hero centralizado seguido de uma tira de estatísticas, remontando o bloco "Stats-grid hero" do blockus a partir de `HeroSection` e `CardStat`.

**Usar quando:** Quiser abrir a página com prova social numérica logo abaixo do título.
**Não usar quando:** As estatísticas precisarem de contexto de comparação (período anterior, meta) — use `CardStatComparison`/`CardStatProgress` compostos manualmente.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ds/hero-stats.tsx`             |
| Tipo       | `registry:block` (name: `ds-hero-stats`)   |
| Categoria  | `Layout`                                   |
| Depende de | `ds-hero-section`, `ds-card-stat`, `badge` |

---

## API — Props

| Prop          | Tipo                 | Obrigatória | Descrição                     |
| ------------- | -------------------- | ----------- | ----------------------------- |
| `kicker`      | `string`             |             | Badge acima do título         |
| `title`       | `React.ReactNode`    | ✓           | Título                        |
| `description` | `string`             |             | Parágrafo de apoio            |
| `actions`     | `React.ReactNode`    |             | Botões                        |
| `stats`       | `{ label, value }[]` | ✓           | Estatísticas (via `CardStat`) |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                     |
| ------------------- | ---------------------------------------------------------- |
| `stats.length >= 4` | Grid usa `sm:grid-cols-4`; caso contrário `sm:grid-cols-3` |

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `ThreeStats`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
