# Spec: ds-pull-quote

> Pull Quote (citação editorial em destaque).

---

## Propósito

Destacar uma citação longa e editorial — carta de fundador, depoimento de cliente ou frase de missão — com autoria opcional (avatar, nome, cargo). Inspirado nos blocos "Founder letter" e "About with large pull-quote" do blockus.

**Usar quando:** Você precisa dar peso editorial a uma frase/depoimento dentro de uma seção "Sobre" ou página de marketing.
**Não usar quando:** For uma citação curta em um card de review — use `Rating` + texto simples. Para depoimentos em carrossel, use `Carousel` compondo vários `PullQuote`.
**Alternativa se não se aplicar:** `Callout` (avisos), `CardStatHighlight` (destaque numérico).

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/pull-quote.tsx`        |
| Tipo       | `registry:ui` (name: `ds-pull-quote`) |
| Categoria  | `Data Display`                        |
| Depende de | `avatar`, `skeleton`, `lucide-react`  |

---

## API — Props

| Prop             | Tipo                           | Padrão    | Obrigatória | Descrição                      |
| ---------------- | ------------------------------ | --------- | ----------- | ------------------------------ |
| `quote`          | `React.ReactNode`              | —         | ✓           | Corpo da citação               |
| `name`           | `string`                       | —         |             | Nome do autor                  |
| `role`           | `string`                       | —         |             | Cargo/afiliação do autor       |
| `avatarSrc`      | `string`                       | —         |             | Imagem do avatar               |
| `avatarFallback` | `string`                       | —         |             | Iniciais de fallback do avatar |
| `size`           | `"sm" \| "md" \| "lg"`         | `"md"`    |             | Tamanho tipográfico da citação |
| `align`          | `"start" \| "center"`          | `"start"` |             | Alinhamento do bloco           |
| `tone`           | `"plain" \| "violet" \| "sky"` | `"plain"` |             | Fundo destacado opcional       |
| `loading`        | `boolean`                      | `false`   |             | Estado de carregamento         |

---

## Variantes CVA

| Dimensão | Valores                  | Padrão  |
| -------- | ------------------------ | ------- |
| `size`   | `sm`, `md`, `lg`         | `md`    |
| `align`  | `start`, `center`        | `start` |
| `tone`   | `plain`, `violet`, `sky` | `plain` |

**Slots:** `pullQuoteRootVariants`, `pullQuoteGlyphVariants`, `pullQuoteTextVariants`, `pullQuoteCiteNameVariants`, `pullQuoteCiteRoleVariants`.

---

## Tokens de design utilizados

| Token                                              | Slot                                        |
| -------------------------------------------------- | ------------------------------------------- |
| `text-foreground`                                  | corpo da citação, nome do autor             |
| `text-muted-foreground`                            | cargo do autor, glifo de aspas (tone plain) |
| `bg-highlight-violet/10` + `text-highlight-violet` | tone violet                                 |
| `bg-highlight-sky/10` + `text-highlight-sky`       | tone sky                                    |

---

## Escala tipográfica e de tamanho

| Slot    | sm            | md                 | lg                     |
| ------- | ------------- | ------------------ | ---------------------- |
| Citação | `text-lg`     | `text-2xl`         | `text-3xl sm:text-4xl` |
| Nome    | `text-sm`     | `text-base`        | `text-lg`              |
| Cargo   | `text-xs`     | `text-sm`          | `text-base`            |
| Glifo   | `size-6`      | `size-8`           | `size-10`              |
| Avatar  | `sm` (Avatar) | `default` (Avatar) | `lg` (Avatar)          |

---

## Comportamentos e estados

| Estado            | Comportamento esperado                                          |
| ----------------- | --------------------------------------------------------------- |
| `loading={true}`  | `<Skeleton>` para glifo, 2 linhas de citação e bloco de autoria |
| Sem `name`/`role` | `<figcaption>` inteiro não é renderizado                        |
| `align="center"`  | Autoria empilha verticalmente (avatar acima do nome)            |

---

## Acessibilidade

| Requisito        | Implementação                                                       |
| ---------------- | ------------------------------------------------------------------- |
| Semântica        | `<figure><blockquote><figcaption>` nativos                          |
| Ícone decorativo | `aria-hidden="true"` no glifo de aspas                              |
| Avatar           | `AvatarImage alt=""` (decorativo — nome já é texto visível ao lado) |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `AllTones`
- [x] `Centered`
- [x] `WithoutAvatar`
- [x] `Loading`

---

## Checklist antes de implementar

- [x] Escala tipográfica sm/md/lg aplicada em todos os slots de texto
- [x] Tokens semânticos apenas (`highlight-violet`, `highlight-sky`)
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
