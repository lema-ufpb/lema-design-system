# Spec: UI i18n

> Dicionário de internacionalização compartilhado com suporte a 4 locales para componentes de UI.

---

## Propósito

**Usar quando:** Um componente de UI precisa exibir texto localizado (rótulos, placeholders, a11y labels, tooltips) sem depender de uma biblioteca externa de i18n.

**Não usar quando:** O conteúdo é dinâmico vindo de API. A aplicação já usa uma biblioteca i18n (next-i18next, react-intl) e prefere centralizar todo o texto.

**Alternativa:** next-intl, react-i18next, next-i18next para i18n completo da aplicação.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `lib/ui-i18n.ts` |
| Tipo | `registry:lib` (name: `ui-i18n`) |
| Categoria | Lib / Internacionalização |
| Depende de | Nenhuma |

---

## API — Estrutura

```typescript
type UILocale = "en-US" | "pt-BR" | "es-ES" | "fr-FR"

// Dicionário completo com todas as chaves de texto da UI
const UI_I18N: Record<UILocale, { ... }>
```

### Seções do dicionário

| Seção | Descrição |
|-------|-----------|
| `dialog` | Rótulo do botão de fechar |
| `spinner` | Texto de loading |
| `pagination` | Navegação de página |
| `counter` | Controle de incremento/decremento |
| `command` | Paleta de comandos |
| `selectList` | Seleção e busca |
| `inputPassword` | Show/hide de senha |
| `progressCircular` | Rótulo de progresso |
| `riskLevelBar` | Rótulo de valor de risco |
| `headerSearch` | Abertura/fechamento de busca |
| `navDots` | Navegação de seção |
| `footerMenu` | Rótulo de navegação do rodapé |
| `stepProgress` | Rótulo de progresso |
| `combobox` | Placeholder, busca, resultados vazios, seleção |
| `dashbox` | Toolbar (refresh, collapse, expand, fullscreen) e status (live, warning, error, idle) |
| `dashrow` | Redimensionamento de painéis |
| `treemap` | Navegação de breadcrumb |
| `scatterChart` | Início/fim de intervalo |
| `candlestick` | Open, high, low, close, volume, bullish, bearish, MA |
| `emptyState` | Nenhum dado / dados aparecerão |
| `cardStats` | Rótulos de período atual e anterior |
| `pieChart` | Total |

---

## Locales

| Locale | Idioma |
|--------|--------|
| `en-US` | Inglês (EUA) |
| `pt-BR` | Português (Brasil) |
| `es-ES` | Espanhol (Espanha) |
| `fr-FR` | Francês (França) |

---

## Comportamentos

- Estrutura tipada com `UILocale` e tipo completo do dicionário
- Acesso via `UI_I18N[locale].<section>.<key>`
- Sem dependências externas
- Design para ser importado por componentes `custom/` que usam React Context para locale

---

## Check de cobertura

- [x] `dialog.close` em 4 locales
- [x] `spinner.loading` em 4 locales
- [x] `pagination` (navLabel, previous, next, goToPrevious, goToNext, morePages)
- [x] `counter` (groupLabel, decrease, increase)
- [x] `command` (title, description)
- [x] `selectList` (select, selected, clearSearch)
- [x] `inputPassword` (hide, show)
- [x] `progressCircular.label`
- [x] `riskLevelBar.value`
- [x] `headerSearch` (open, close)
- [x] `navDots` (sectionNav, goTo)
- [x] `footerMenu.label`
- [x] `stepProgress.label`
- [x] `combobox` (placeholder, searchPlaceholder, noResults, noOptions, clearSearch, clearSelection, clearAll, selected)
- [x] `dashbox` toolbar e status
- [x] `dashrow.resizePanels`
- [x] `treemap.breadcrumb`
- [x] `scatterChart` (rangeStart, rangeEnd)
- [x] `candlestick` (open, high, low, close, volume, bullish, bearish, ma)
- [x] `emptyState` (noData, dataWillAppear)
- [x] `cardStats` (thisPeriod, lastPeriod, noComparison)
- [x] `pieChart.total`

---

## Checklist

- [x] `UI_I18N` exportado como `Record<UILocale, {...}>`
- [x] Tipo `UILocale` exportado
- [x] 4 locales completos: en-US, pt-BR, es-ES, fr-FR
- [x] Sem dependências externas
- [x] Dicionário tipado estaticamente
