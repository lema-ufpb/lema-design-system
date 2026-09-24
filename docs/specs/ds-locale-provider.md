# Spec: LocaleProvider

> Provider de contexto que define o locale padrão de todos os componentes `ds-*` de uma aplicação, sem precisar repassar `locale="…"` em cada uso.

---

## Propósito

Hoje todo componente com texto fixo (aria-labels, placeholders, títulos, formatação) declara `locale = "en-US"` como padrão. Um app em outra língua precisa repetir `locale="pt-BR"` em **cada** `<Badge>`, `<Input>`, `<Drawer>`… — se esquecer, os textos de acessibilidade saem em inglês. Isso apareceu na migração do app SEFAZ-PB do `ds-sync` (que gravava o padrão do projeto dentro dos arquivos) para o CLI do shadcn (que instala os arquivos do registry sem alterá-los).

O `LocaleProvider` resolve isso no lado do consumidor: o app declara o locale **uma vez**, no layout, e todos os componentes o herdam.

**Usar quando:** o app tem um locale padrão diferente de `en-US` (ou quer trocar o locale em runtime) e usa componentes `ds-*` com texto fixo.

**Não usar quando:** o app é `en-US` (é o padrão, nada muda) ou precisa de um locale diferente só em um componente (basta a prop `locale` dele, que sempre vence).

**Alternativa:** passar `locale` em cada componente; ou uma biblioteca de i18n completa (next-intl, react-i18next) — este provider só cobre o dicionário `UI_I18N` de `lib/ui-i18n.ts`.

---

## Localização

| Campo      | Valor                                                  |
| ---------- | ------------------------------------------------------ |
| Arquivo    | `components/ds/locale-provider.tsx`                    |
| Tipo       | `registry:ui` (name: `ds-locale-provider`)             |
| Target     | `components/ui/ds-locale-provider.tsx` (no consumidor) |
| Categoria  | Utilities                                              |
| Depende de | `ui-i18n` (tipo `UILocale`). Sem dependências npm.     |

---

## API

```tsx
export const DEFAULT_UI_LOCALE: UILocale // "en-US"

export function UILocaleProvider(props: {
  locale: UILocale
  children: React.ReactNode
}): JSX.Element

export function useUILocale(override?: UILocale): UILocale

export function useOptionalUILocale(override?: UILocale): UILocale | undefined
export function useOptionalUILocale(override?: string): string | undefined
```

| Export                       | Descrição                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `DEFAULT_UI_LOCALE`          | Locale usado quando não há provider nem prop: `"en-US"`.                                           |
| `UILocaleProvider`           | Fornece `locale` a toda a subárvore. Providers aninhados: o mais próximo vence.                    |
| `useUILocale(prop?)`         | Resolve o locale efetivo. Usado internamente pelos componentes `ds-*`.                             |
| `useOptionalUILocale(prop?)` | Como `useUILocale`, mas devolve `undefined` (em vez de `"en-US"`) quando não há prop nem provider. |

### Precedência (do mais forte ao mais fraco)

1. Prop `locale` do próprio componente.
2. Locale do `UILocaleProvider` mais próximo na árvore.
3. `DEFAULT_UI_LOCALE` (`"en-US"`).

Sem provider, o comportamento é **idêntico ao atual** — a mudança é compatível para quem não adotar o provider.

---

## Integração nos componentes `ds-*`

Todo componente client que hoje faz `locale = "en-US"` na desestruturação passa a:

```tsx
export function Badge({ locale: localeProp, ...props }: BadgeProps) {
  const locale = useUILocale(localeProp)
  const i18n = UI_I18N[locale]
  // …
}
```

- A prop continua `locale?: UILocale` (tipo e documentação inalterados; só o padrão passa a ser "o do provider, senão `en-US`").
- `useUILocale` é chamado **no topo** do componente, antes de qualquer `return` antecipado (regra dos hooks).
- Helpers que não são componentes (ex.: `defaultDateFmt(date, locale = "en-US")`) não usam o hook; recebem o locale já resolvido do componente que os chama.

### Componentes em que `locale` é opcional (`useOptionalUILocale`)

Nos componentes abaixo, `locale` ausente **tem significado próprio**: textos fixos em inglês (`"Search…"`, `"Pending"`) e formatação numérica `en-US`, em vez do dicionário. Para não mudar o comportamento sem provider, eles usam `useOptionalUILocale`: com provider passam a usar o dicionário/formatação do locale (ex.: `R$ 1.234,56`); sem provider ficam exatamente como antes.

`ds-card-stat`, `ds-card-stat-progress`, `ds-card-stat-comparison`, `ds-card-stat-heatbar`, `ds-card-stat-highlight`, `ds-card-stat-sparkline`, `ds-card-stat-gauge`, `ds-card-stat-list`, `ds-data-table`, `ds-search-combo` e `ds-mini-card` (+ `MiniCardGroup`, que repassa o locale aos filhos).

### Exceção: componentes sem `"use client"`

Contexto React não existe em Server Components. Os componentes abaixo não têm `"use client"` e continuam **só com a prop** `locale` (padrão `en-US`); quem os usa em outra língua passa `locale` explicitamente:

`ds-footer-brand-backdrop`, `ds-pagination`, `ds-system-status-badge`, `ds-footer-mega`, `ds-footer-bottom-bar`, `ds-about-milestones`, `ds-about-values-grid`, `ds-mission-vision-cards`, `ds-footer-simple`.

> Não adicionar `"use client"` a esses arquivos só para ler o contexto: quebraria quem os renderiza em Server Components com props não serializáveis.

---

## Uso no consumidor

```tsx
// app/layout.tsx (Next.js) — o layout pode ser Server Component: o provider é client
import { UILocaleProvider } from "@/components/ui/ds-locale-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <UILocaleProvider locale="pt-BR">{children}</UILocaleProvider>
      </body>
    </html>
  )
}
```

Locale dinâmico (troca em runtime): guarde o locale em estado no seu próprio provider e repasse `locale={locale}` ao `UILocaleProvider`.

---

## Comportamentos e estados

| Situação                                | Comportamento                                 |
| --------------------------------------- | --------------------------------------------- |
| Sem provider, sem prop                  | `"en-US"`                                     |
| Provider `pt-BR`, sem prop              | `"pt-BR"`                                     |
| Provider `pt-BR`, prop `es-ES`          | `"es-ES"` (prop vence)                        |
| Providers aninhados (`pt-BR` > `fr-FR`) | `"fr-FR"` no interior; `"pt-BR"` fora         |
| Locale do provider muda                 | Componentes re-renderizam com os novos textos |
| `locale={undefined}` no provider        | Não permitido pelo tipo (obrigatório)         |

Sem estados visuais próprios: o provider não renderiza DOM (só `Context.Provider`), logo não há `loading`, tamanhos, variantes CVA nem tokens de cor.

---

## Variantes CVA e tokens

Não se aplica — componente sem UI.

---

## Acessibilidade

O propósito do provider é justamente garantir que `aria-label`, `title` e textos `sr-only` dos componentes saiam na língua da aplicação, evitando leitores de tela lendo rótulos em inglês em um app pt-BR. O provider **não** define `lang` no HTML — isso continua sendo responsabilidade do app (`<html lang="pt-BR">`).

---

## Stories obrigatórias no Storybook

Arquivo: `components/ds/locale-provider.stories.tsx` — título `Utilities/LocaleProvider`.

- [ ] `Default` — sem provider: componentes em `en-US`
- [ ] `PortugueseProvider` — provider `pt-BR`, sem prop nos componentes (play: `aria-label` em português)
- [ ] `PropOverridesProvider` — prop `locale` vence o provider
- [ ] `NestedProviders` — provider interno sobrescreve o externo
- [ ] `SwitchAtRuntime` — botões trocam o locale e os textos mudam (play)

---

## Critérios de aceitação da mudança

- [ ] `lib`/`registry`: item `ds-locale-provider` em `registry.json`; todo componente que o importa o declara em `registryDependencies` (`npm run registry:sync`)
- [ ] Os 137 componentes client com `locale = "en-US"` usam `useUILocale(localeProp)`; os 11 com `locale` opcional usam `useOptionalUILocale`; os 9 sem `"use client"` ficam inalterados
- [ ] Nenhum componente muda de comportamento sem provider (testes existentes passam sem alteração)
- [ ] `make lint`, `make registry`, `npm run registry:check` e `make test` passam
- [ ] `docs/specs/ui-i18n.md` e `README.md` documentam o provider; contagens de itens/specs atualizadas em `README.md` e `app/Introduction.mdx`
- [ ] Nota na spec de `card-stats-shared`: `TrendBadge` usa o primitivo `Badge` (`ui/badge`), não `ds-badge`
