# Spec: ds-about-section

> About Section (bloco composto — não é um átomo novo).

---

## Propósito

Demonstrar e disponibilizar a composição pronta de uma seção "Sobre" completa, remontando o padrão "story + values + stats strip" (about-22 do blockus) inteiramente a partir de átomos já existentes do catálogo: `HeroSection`, `PullQuote`, `CardStat` e `TeamRoster`. Diferente dos demais itens do registry, é um `registry:block` — instala o arquivo e resolve as dependências dos átomos automaticamente via `registryDependencies`.

**Usar quando:** Precisar montar rapidamente uma página "Sobre" completa e customizar a partir daí.
**Não usar quando:** Precisar de controle fino sobre o layout — nesse caso componha os átomos diretamente (`HeroSection` + `PullQuote` + `CardStat` + `TeamRoster`) na sua própria página.

---

## Localização

| Campo      | Valor                                                                         |
| ---------- | ----------------------------------------------------------------------------- |
| Arquivo    | `components/ds/about-section.tsx`                                             |
| Tipo       | `registry:block` (name: `ds-about-section`)                                   |
| Categoria  | `Layout`                                                                      |
| Depende de | `ds-hero-section`, `ds-pull-quote`, `ds-card-stat`, `ds-team-roster`, `badge` |

---

## API — Props

| Prop                                                           | Tipo                       | Obrigatória | Descrição                                  |
| -------------------------------------------------------------- | -------------------------- | ----------- | ------------------------------------------ |
| `kicker`                                                       | `string`                   |             | Badge acima do título                      |
| `title`                                                        | `React.ReactNode`          | ✓           | Título principal (via `HeroTitle`)         |
| `description`                                                  | `string`                   |             | Parágrafo de apoio (via `HeroDescription`) |
| `quote`                                                        | `string`                   |             | Citação do fundador (via `PullQuote`)      |
| `quoteName`/`quoteRole`/`quoteAvatarSrc`/`quoteAvatarFallback` | `string`                   |             | Autoria da citação                         |
| `stats`                                                        | `{ label, value }[]`       |             | Tira de estatísticas (via `CardStat`)      |
| `team`                                                         | `AboutSectionTeamMember[]` |             | Grid de equipe (via `TeamRoster`)          |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                     |
| ------------------- | ---------------------------------------------------------- |
| Sem `quote`         | Bloco `PullQuote` não é renderizado                        |
| Sem `stats`         | Tira de estatísticas não é renderizada                     |
| Sem `team`          | Grid de equipe não é renderizado                           |
| `stats.length >= 4` | Grid usa `sm:grid-cols-4`; caso contrário `sm:grid-cols-3` |

---

## Acessibilidade

Herdada integralmente dos átomos compostos (`HeroSection`, `PullQuote`, `CardStat`, `TeamRoster`) — nenhuma lógica de acessibilidade própria além da composição.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `WithoutQuote`
- [x] `WithoutTeam`
- [x] `StoryOnly`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes (nenhum CVA/token novo introduzido)
- [x] `registryDependencies` lista todos os átomos consumidos
- [x] Estados vazios (`quote`/`stats`/`team` ausentes) tratados sem erro
