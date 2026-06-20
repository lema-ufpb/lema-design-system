# LEMA Design System

Sistema de design oficial do [Laboratório de Economia e Modelagem Aplicada (LEMA)](https://lema.ufpb.br) da Universidade Federal da Paraíba (UFPB). Um sistema de componentes React moderno, acessível e themeável, construído sobre shadcn/ui e Radix UI Primitives.

## Visão Geral

Este design system fornece um conjunto de componentes React Typescript de alta qualidade, com suporte a:

- 🌙 Modo escuro/claro automático
- ♿ Acessibilidade WCAG 2.1 AA
- 🎨 Customização via CSS variables (Tailwind CSS v4)
- 📱 Design responsivo
- 🔍 TypeScript total

## Stack Tecnológica

| Tecnologia               | Propósito                    |
| ------------------------ | ---------------------------- |
| React 19                 | UI Library                   |
| Next.js 16               | Framework                    |
| TypeScript               | Tipagem                      |
| Tailwind CSS v4          | Estilização                  |
| Radix UI                 | Primitives de acessibilidade |
| shadcn/ui                | Componentes base             |
| class-variance-authority | Variantes de componentes     |
| Storybook                | Documentação de componentes  |
| Vitest                   | Testes                       |

## Instalação

```bash
# Clone o repositório
git clone https://github.com/lema-ufpb/design-system.git
cd design-system

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
make dev
```

## Uso via CLI dedicada — `@lema-ufpb/ds-sync` 📦

Para projetos institucionais da UFPB, disponibilizamos uma CLI dedicada no [npm](https://www.npmjs.com/package/@lema-ufpb/ds-sync) que estende o shadcn CLI com autenticação, lockfile, drift detection e modo CI:

```bash
npm install -D @lema-ufpb/ds-sync
```

Configure no `.env.local`:

```env
LEMA_DS_TOKEN=<seu-token>
LEMA_DS_REGISTRY=https://ds.lema.ufpb.br
```

> 🔑 O token é fornecido pelo NOC do LEMA. O registry padrão aponta para produção.

### Comandos principais

| Comando                          | Descrição                       |
| :------------------------------- | :------------------------------ |
| `npx ds add dashbox`        | Instala componente(s)           |
| `npx ds update dashbox`     | Atualiza componente(s)          |
| `npx ds list`               | Lista componentes disponíveis   |
| `npx ds verify`             | Verifica drift vs lockfile      |
| `npx ds diff dashbox`       | Diff local vs remoto            |
| `npx ds sync --all --yes`   | Sincronização completa (CI)     |
| `npx ds sync-tokens`        | Força refetch dos tokens CSS    |
| `npx ds whoami`             | Valida o token de autenticação  |

O lockfile `ds.lock` é gerado automaticamente e **deve ser versionado** — é a fonte da verdade para reprodutibilidade e detecção de drift.

## Uso via Registry (shadcn CLI)

Você pode instalar qualquer componente deste design system em seu próprio projeto usando o link do registro oficial:

```bash
# Adicionar um componente específico
npx ds add <component-name>

# Exemplos:
npx ds add dashbox
npx ds add progress-bar
```

## Internacionalização (i18n)

Todos os componentes com texto visível suportam internacionalização via prop `locale`. O dicionário centralizado fica em `lib/ui-i18n.ts`.

### Locais suportados

| Código | Idioma             |
| :----- | :----------------- |
| en-US  | English (default)  |
| pt-BR  | Português (Brasil) |
| es-ES  | Español            |
| fr-FR  | Français           |


> O arquivo `lib/ui-i18n.ts` (dicionário i18n) é instalado automaticamente como dependência de registro para todos os componentes que suportam locale. Não é necessário instalá-lo manualmente.


### Uso

```tsx
import { Dashbox } from "@/components/ds/dashbox"

<Dashbox title="Status" locale="pt-BR" status="live" />
// Badge mostra "Online", toolbar mostra "Atualizar", "Recolher" etc.
```

A prop `locale` é opcional (padrão `"en-US"`). Ao instalar um componente via shadcn CLI, o arquivo `lib/ui-i18n.ts` é instalado automaticamente como dependência.

### Registry

O dicionário `ui-i18n` está publicado como `registry:lib` no registro oficial:

```bash
# Instalação manual (se necessário)
npx ds add ui-i18n
```

## Estrutura do Projeto

```
design-system/
├── app/
│   ├── globals.css         # Tokens CSS e temas
│   └── layout.tsx          # Layout raiz com ThemeProvider
├── components/
│   ├── ui/                 # Primitivos shadcn (base)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── ds/                 # Componentes customizados
│       ├── dashbox.tsx
│       ├── bar-chart.tsx
│       ├── data-table.tsx
│       ├── search-combo/
│       │   ├── index.tsx
│       │   ├── types.ts
│       │   ├── variants.ts
│       │   ├── search-combo.stories.tsx
│       │   └── hooks/
│       └── ...
├── lib/
│   ├── utils.ts                    # Utilitários (cn)
│   ├── ui-i18n.ts                  # Dicionário i18n compartilhado (multi-locale)
│   ├── format-utils.ts             # Formatação numérica localizada (Intl.NumberFormat)
│   ├── card-stats-shared.tsx       # CVA variants, TrendBadge, helpers da família CardStat
│   └── version.ts                  # Constante de versão do app
├── providers/
│   └── theme.tsx           # ThemeProvider custom com suporte a color themes
├── .storybook/             # Configuração Storybook
├── registry.json           # Registro shadcn
└── Makefile                # Scripts de build
```

## Desenvolvimento Orientado a Spec (Spec-Driven)

Novos componentes customizados seguem um fluxo **spec-first**, com templates e habilidades de IA-guardrail em `.agents/`:

```
.agents/
├── skills/
│   ├── shadcn/          # Regras shadcn (composição, CLI, styling, forms)
│   │   └── rules/       # Styling, forms, composition, icons, base-vs-radix
│   └── design-system/   # Regras do LEMA-DS (escala, tokens, CVA, a11y)
├── specs/               # Specs de todos os componentes (107 arquivos — ui + custom)
└── templates/
    └── component-spec.md # Template de spec para novos componentes
```

### Workflow spec-first

1. **Preencher o template** `.agents/templates/component-spec.md` — propósito, API, variantes CVA, tokens, acessibilidade, stories obrigatórias
2. **Revisar a spec** contra as regras do design system (escala tipográfica, tokens semânticos, `gap-*`, `Skeleton`, `defaultVariants`)
3. **Implementar** seguindo o padrão CVA single-file (types → variants → helpers → component)
4. **Verificar** com `make lint` (0 erros) + `make registry` (rebuild do registro) + `make test` (714 testes em 106 arquivos)

As skills em `.agents/skills/` funcionam como guardrails de IA: ao desenvolver com assistência, as regras de estilo, composição e tokens são aplicadas automaticamente durante a geração de código.

### Specs existentes

Todos os componentes (55 ui primitives + 49 custom) já possuem spec documentada em `.agents/specs/`. Cada spec detalha propósito, API, variantes CVA, tokens, escala tipográfica, estados (loading/empty/disabled), acessibilidade e stories obrigatórias — servindo como fonte de verdade para manutenção e evolução.

### Spec template

O template cobre: propósito de uso, API completa com tipos, variantes CVA por slot, tokens de design, escala tipográfica sm/md/lg, comportamentos (loading, disabled, empty), acessibilidade (ARIA, teclado, i18n) e checklist de stories obrigatórias.

## Componentes

### Primitivos shadcn

Componentes base instalados via shadcn CLI, sem modificações:

| Componente        | Descrição                                                                                          |
| :---------------- | :------------------------------------------------------------------------------------------------- |
| **Accordion**     | Conjunto de painéis empilhados e colapsáveis.                                                      |
| **Avatar**        | Elemento visual para representar usuários com fallback de iniciais.                                |
| **Badge**         | Pequeno rótulo indicador de status ou categoria.                                                   |
| **Button**        | Botão interativo com variantes (default, destructive, outline, etc).                               |
| **Card**          | Container versátil com header, título, ação, descrição e footer.                                   |
| **Combobox**      | Autocomplete com busca, navegação por teclado e suporte a grupos, construído sobre @base-ui/react. |
| **Command**       | Menu de comandos rápido e acessível com busca integrada.                                           |
| **Dialog**        | Modal sobreposto para interações críticas.                                                         |
| **Dropdown Menu** | Menu flutuante acionado por um botão.                                                              |
| **Drawer**        | Painel deslizante com suporte a 4 direções e gestos de arrastar.                                   |
| **Input**         | Campo de entrada de texto padrão.                                                                  |
| **Input Group**   | Conjunto de inputs agrupados com ícones ou botões.                                                 |
| **Popover**       | Conteúdo flutuante ancorado a um elemento.                                                         |
| **Progress**      | Barra de progresso linear simples.                                                                 |
| **Scroll Area**   | Área de rolagem customizada e acessível.                                                           |
| **Skeleton**      | Placeholder de carregamento para estados vazios.                                                   |
| **Table**         | Componente responsivo de tabela com suporte a rolagem horizontal.                                  |
| **Textarea**      | Campo de entrada de texto multilinha.                                                              |
| **Tooltip**       | Breve descrição exibida ao passar o mouse.                                                         |

Para adicionar novos componentes shadcn ao projeto:

```bash
npx ds add <componente>
```

### Componentes customizados

Todos os componentes abaixo vivem em `components/ds/`.

#### Actions

| Componente     | Descrição                                                                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Button**     | Feature-rich button wrapping shadcn `Button`. Adiciona loading state, start/end icons, `rounded` variant (`full`/`lg`/`md`/`none`), `fullWidth`, double-click debounce, two-step confirmation, e tooltip integrado. |
| **IconButton** | Botão só de ícone com tooltip opcional, estado de loading e variantes de tamanho e arredondamento.                           |
| **ToggleTheme**| Botão dropdown para alternar entre temas claro, escuro e sistema. Re-exporta `ThemeProvider` e `useTheme` de `@/providers/theme` para configuração do app. |

```tsx
import { Button } from "@/components/ds/button"
import { IconButton } from "@/components/ds/icon-button"
import { ToggleTheme } from "@/components/ds/toggle-theme"

<Button loading startIcon={<Download className="size-4" />}>Download</Button>
<Button variant="destructive" confirm={{ text: "Tem certeza?" }}>Excluir</Button>
<Button tooltip={{ text: "Enviar relatório", side: "top" }}>Enviar</Button>

<IconButton icon={Download} label="Download" tooltip="Baixar arquivo" />
<ToggleTheme locale="pt-BR" />
```

#### Layout

| Componente     | Descrição                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------- |
| **Dashbox**    | Card de dashboard estruturado com collapse/expand, fullscreen, refresh, loading skeleton e status badge. |
| **Dashrow**    | Container responsivo para múltiplos painéis com divisor arrastável e proporções ajustáveis.              |
| **Drawer**     | Drawer completo com header, body scrollável, footer e botão de fechar adaptável à direção.               |
| **Modal**      | Modal dialog flexível construído sobre Dialog com 6 tamanhos, 5 intenções de cor, body scrollável, async confirm com loading e suporte a i18n. |

```tsx
import { Dashbox } from "@/components/ds/dashbox"
import { Dashrow } from "@/components/ds/dashrow"
import { Drawer } from "@/components/ds/drawer"
import { Modal } from "@/components/ds/modal"

<Modal
  title="Confirmar exclusão"
  intent="destructive"
  confirmLabel="Excluir"
  onConfirm={handleDelete}
>
  Tem certeza que deseja excluir este item?
</Modal>

<Drawer direction="right" title="Detalhes" description="ID #1234" footer={actions}>
  Conteúdo do drawer...
</Drawer>

<Dashrow alignment="left" storageKey="dashboard-layout">
  <Dashbox title="Performance" status="live" onRefresh={() => fetchData()}>
    Conteúdo do gráfico aqui...
  </Dashbox>
  <Dashbox title="Metas">
    Conteúdo lateral...
  </Dashbox>
</Dashrow>
```

#### Feedback

| Componente     | Descrição                                                                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PageLoader** | Overlay de carregamento em tela cheia com barra superior animada (`bar`) ou spinner XL centralizado (`spinner`). Controlado por `loading` com fade in/out, cores semânticas e i18n. |
| **Spinner**    | Indicador de carregamento animado com `aria-label` localizada via `locale` prop.                                                                                    |
| **ProgressBar**| Indicador horizontal com preenchimento animado, intenções semânticas e posições de rótulo configuráveis.                                                             |
| **ProgressCircular** | Indicador circular animado com valor percentual central.                                                                                                      |
| **RiskLevelBar**     | Barra segmentada para níveis de risco com marcador móvel e tokens `--risk-1` a `--risk-4`.                                                                   |

```tsx
import { PageLoader } from "@/components/ds/page-loader"
import { Spinner } from "@/components/ds/spinner"
import { ProgressBar } from "@/components/ds/progress-bar"
import { ProgressCircular } from "@/components/ds/progress-circular"
import { RiskLevelBar } from "@/components/ds/risk-level-bar"

<PageLoader loading={isLoading} locale="pt-BR" />
<PageLoader loading={isLoading} variant="spinner" message="Salvando..." color="success" blur />

<Spinner locale="pt-BR" />
<Spinner className="size-6 text-primary" />

<ProgressBar value={0.75} name="Taxa de Aprovação" intent="success" />
<ProgressCircular value={0.6} title="Frequência" size="lg" />
<RiskLevelBar labelLeft="Nível de Risco" labelRight="Score" value={0.4} />
```

#### Exibição de Dados

| Componente           | Descrição                                                                                                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CardStats**        | Coleção de 9 cards de KPI: CardStat, CardStatCompact, CardStatProgress, CardStatComparison, CardStatSparkline, CardStatHighlight, CardStatList, CardStatGauge, CardStatHeatbar. Cada variante é instalável individualmente via `card-stat`, `card-stat-compact`, etc., ou todas de uma vez via o barrel `card-stats`. |
| **MiniCard**         | Compact stat label+value unit para strips horizontais. Compõe com MiniCardGroup (pill/outlined/elevated/ghost) e MiniCardStrip (auto-dividers). Suporta ícones, sub-values, intent colors, delta indicators e formatação numérica. Size propaga via context. |
| **DataTable**        | Tabela virtualizada de alta performance com toolbar, ordenação, busca, paginação, `locale` prop para resolução automática de labels i18n, colunas sticky, redimensionamento e seleção de linhas. |

```tsx
import { MiniCard, MiniCardGroup, MiniCardStrip } from "@/components/ds/mini-card"
import { CardStatCompact } from "@/components/ds/card-stat-compact"
import { CardStatProgress } from "@/components/ds/card-stat-progress"
// Ou via barrel (instala todos):
// import { CardStatCompact, CardStatProgress } from "@/components/ds/card-stats"
import { DataTable } from "@/components/ds/data-table"

<MiniCardGroup variant="outlined" size="md" divide accent="success">
  <MiniCard label="Receita" value={124500} format="currency" locale="pt-BR" currency="BRL" delta="+26.8%" />
  <MiniCard label="Selecionados" value={53} sub="/153" />
</MiniCardGroup>
<CardStatCompact label="Revenue" value={124500} format="currency" trend="up" trendValue="+26.8%" icon={DollarSignIcon} />
<DataTable columns={columns} data={rows} searchable sortable paginated />
```

#### Gráficos

Componentes de visualização de dados construídos sobre Recharts e otimizados para o LEMA.

| Componente           | Descrição                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------- |
| **BarChart**         | Gráfico de barras com tooltips, legendas, empilhamento, cantos arredondados e brush zoom.                |
| **BoxplotChart**     | Gráfico estatístico boxplot com SVG custom, suporte a notch e plotting de outliers.                      |
| **CandlestickChart** | Gráfico financeiro (candlestick) com volume, médias móveis, linhas de referência e brush.                |
| **GeomapChart**      | Mapa geográfico interativo para renderizar GeoJSON/TopoJSON com tooltips, zoom, coropletas e marcadores. |
| **HeatmapChart**     | Matriz de calor com CSS grid e color-mix para interpolação suave de cores.                               |
| **LineChart**        | Gráfico de linhas com áreas gradientes, áreas empilhadas, linhas de referência e brush.                  |
| **PieChart**         | Gráfico de pizza/donut com label central interativa, legendas e labels externas.                         |
| **RadarChart**       | Gráfico de radar/teia para dados multivariados com grid poligonal ou circular.                           |
| **RadialChart**      | Gráfico de barras radiais com anéis concêntricos e modo gauge semicircular.                              |
| **ScatterChart**     | Gráfico de dispersão/bolha com linhas de tendência, multi-séries e brush.                                |
| **TreemapChart**     | Gráfico treemap com drill-down hierárquico, breadcrumb e controle de aspect ratio.                       |

```tsx
import { BarChart } from "@/components/ds/bar-chart"

<BarChart data={data} categoryKey="name" dataKeys={[{ key: "total", label: "Total" }]} />
```

#### Formulários

| Componente               | Descrição                                                                                          |
| :----------------------- | :------------------------------------------------------------------------------------------------- |
| **Counter**              | Input numérico com controles +/− e suporte a valor controlado/não-controlado.                      |
| **InputEmail**           | Campo de e-mail com ícone integrado e variantes de tamanho e raio.                                 |
| **InputPassword**        | Campo de senha com botão de visibilidade e variantes de tamanho e raio.                            |
| **SearchBar**            | Input de busca expansível para headers com ícone toggle, dica de atalho de teclado e placeholders i18n. |
| **SearchCombo**          | Campo de busca com dropdown de autocomplete virtualizado, highlight de texto (com acentuação insensitive), navegação por teclado, agrupamento de resultados e reconhecimento de voz opcional. Mantido em `components/ds/search-combo/`. |
| **Combobox** (primitivo) | Autocomplete com busca textual, navegação por teclado, grupos e suporte a @base-ui/react.          |
| **Combobox** (custom)    | Combobox completo com scroll virtual, seleção única/múltipla com chips e renderização customizada. |
| **SelectList**           | Lista pesquisável com estado de seleção, ícones e scroll virtual para grandes volumes.             |

```tsx
import { Counter } from "@/components/ds/counter"
import { Combobox } from "@/components/ui/combobox"          // primitivo
import { Combobox as ComboboxCustom } from "@/components/ds/combobox"  // custom
import { SelectList } from "@/components/ds/select-list"
import { InputEmail } from "@/components/ds/input-email"
import { InputPassword } from "@/components/ds/input-password"
import { SearchBar } from "@/components/ds/search-bar"
import { SearchCombo } from "@/components/ds/search-combo"

<Counter defaultValue={1} min={0} max={100} onChange={setValue} />
<Combobox options={items} value={selected} onChange={setSelected} />
<ComboboxCustom options={items} value={values} onChange={setValues} multiple />
<SelectList data={items} selectedId={id} onSelect={setItem} height={300} />
<InputEmail placeholder="email@example.com" />
<InputPassword placeholder="Senha" />
<SearchBar onSearch={(term) => router.push(`/search?q=${term}`)} />
<SearchCombo value={query} onChange={setQuery} options={results} onSearch={fetchResults} voice />
```

#### Navegação

| Componente       | Descrição                                                                         |
| :--------------- | :-------------------------------------------------------------------------------- |
| **Tabs**         | Componente declarativo de abas com 4 variantes, 3 tamanhos, ícones, badges, loading skeletons e fallback responsivo para Accordion em mobile. |
| **FooterMenu**   | Rodapé responsivo — colunas no desktop, accordion no mobile, suporte a uppercase. |
| **ScrollToTop**  | Botão flutuante com anel de progresso de rolagem, visibilidade direcional (aparece ao scrollar para cima) e suporte a i18n. |
| **NavDots**      | Navegação de seções por pontos com rastreamento automático de rolagem e tooltips. |
| **NavUser**      | Menu de perfil de usuário para headers, construído sobre DropdownMenu e Avatar.   |
| **Pagination**   | Paginação semântica com `locale` prop para labels "Anterior"/"Próxima" em pt-BR e `rounded` variant (`full`/`light`/`none`). |
| **StepProgress** | Guia visual para processos multi-etapa com círculo numerado, ícone opcional, conector animado e orientações horizontal/vertical. |

```tsx
import { FooterMenu } from "@/components/ds/footer-menu"
import { ScrollToTop } from "@/components/ds/scroll-to-top"
import { Pagination } from "@/components/ds/pagination"
import { NavDots } from "@/components/ds/nav-dots"
import { NavUser } from "@/components/ds/nav-user"
import { Tabs } from "@/components/ds/tabs"
import { StepProgress } from "@/components/ds/step-progress"

// Provider de tema (app-level):
import { ThemeProvider, useTheme } from "@/components/ds/toggle-theme"

function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
<NavDots sections={sections} />
<NavUser user={user} onLogout={handleLogout} />
<Tabs
  items={[
    { value: "profile", label: "Perfil", icon: User, content: <ProfileForm /> },
    { value: "security", label: "Segurança", icon: Lock, content: <SecurityForm /> },
  ]}
  variant="pill"
/>
<StepProgress steps={steps} currentStep={1} />
```

## Theming

### Cores

O sistema usa CSS variables para theming:

```css
/* Light mode */
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.97 0 0);
--muted: oklch(0.97 0 0);
--border: oklch(0.922 0 0);

/* Dark mode */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... */
}
```

### Tokens de risco (RiskLevelBar, CardStatGauge, CardStatHeatbar)

```css
:root {
  --risk-1: oklch(0.62 0.19 28);     /* Maior risco */
  --risk-2: oklch(0.72 0.17 50);
  --risk-3: oklch(0.85 0.18 85);
  --risk-4: oklch(0.92 0.15 105);    /* Menor risco */
  --success: oklch(0.72 0.16 155);   /* Positivo */
  --warning: oklch(0.78 0.14 75);    /* Atenção */
  --highlight-violet: oklch(0.68 0.18 295);
  --highlight-sky: oklch(0.72 0.12 225);
  --highlight-white: oklch(0.92 0.01 80);
}
```

### Tipografia

- **Sans**: Inter (variável `--font-sans`)
- **Mono**: Geist Mono (variável `--font-mono`)

### Border Radius

| Token         | Cálculo        |
| ------------- | -------------- |
| `--radius-sm` | `radius * 0.6` |
| `--radius-md` | `radius * 0.8` |
| `--radius-lg` | `radius`       |
| `--radius-xl` | `radius * 1.4` |

## Scripts

```bash
make dev              # Inicia o servidor local do Storybook (porta 6006)
make build            # Build produção
make start            # Servidor produção
make lint             # ESLint + typecheck + Prettier check
make format           # Prettier
make build-storybook  # Build Storybook estático
make test             # Vitest (726 testes em 107 arquivos)
make coverage         # Coverage com Vitest
make registry         # Rebuild do registry.json (shadcn build)
make shadcn-update    # Atualiza todos os primitivos shadcn para última versão
make clean            # Limpar artefatos
```

## Release & Deploy

O projeto usa um fluxo **GitFlow** com versionamento automático via [release-please](https://github.com/googleapis/release-please) e deploy contínuo para Kubernetes via ArgoCD.

### Branches

| Branch    | Propósito                                                           |
| :-------- | :------------------------------------------------------------------ |
| `develop` | Branch de integração — todo PR de feature/fix entra aqui            |
| `main`    | Branch de release — recebe merge de `develop` quando pronto p/ ship |

### Fluxo completo (do commit ao deploy)

```
feature/* ──PR──▶ develop ──PR──▶ main ──┐
                                          │ (release-please observa)
                                          ▼
                              chore(release): vX.Y.Z (PR aberto pelo bot)
                                          │
                                          ▼ merge
                              tag vX.Y.Z + GitHub Release criados
                                          │
                                          ▼ (release.published)
                              CD: build Docker → GHCR → argocd-apps → prod
```

### CI (`.github/workflows/ci.yml`)

Dispara **apenas em PR contra `develop`** — única etapa do fluxo onde código novo é introduzido. PRs `develop → main` e PRs do release-please **não rodam CI** (são promoção e version bump, respectivamente — mesmo código já validado). Pipeline **sequencial** com fail-fast (3 jobs encadeados via `needs:`) no self-hosted runner:

```
lint → test → build
```

| Job | Nome | Comando |
|-----|------|---------|
| 1º | `🕵️‍♂️ Lint` | `npm run format:check` + `npm run lint` |
| 2º | `🧪 Test` | `npm run test` (vitest browser mode, Chromium) |
| 3º | `📦 Build` | `npm run build-storybook` |

PRs do release-please são **explicitamente ignorados** no job `lint` via `if: ${{ !startsWith(github.head_ref, 'release-please--') }}`.

Runs antigos no mesmo PR são cancelados automaticamente via `concurrency`. Instalação usa `npm ci --legacy-peer-deps` com cache (composite action em `.github/actions/setup-node-deps`).

**Por que CI roda apenas uma vez por ciclo de release:** o invariante é "se `develop` está verde, `main` está verde". Branch protection em `develop` exige PR antes de merge → todo código que entra em `develop` foi validado. `develop → main` é promoção sem código novo. release-please PR só altera `package.json`, `CHANGELOG.md` e `.release-please-manifest.json` — nenhum desses afeta build/lint/test. Resultado: 1 run de CI por mudança real, não 4.

> ⚠️ **Branch protection é obrigatório** em `develop` e `main`. Como o CI não dispara em `push`, push direto burla a validação. Configure em **Settings → Branches**: exigir PR + branch atualizada antes do merge. Atualmente **nenhuma branch exige status checks** (`contexts: []`) — considere adicionar `🕵️‍♂️ Lint`, `🧪 Test` e `📦 Build` como required checks em `develop`.

### AI Review (`.github/workflows/ai-review.yml`)

Dispara **apenas em PR contra `develop`** (mesmo escopo do CI). Pula PRs do Dependabot e do `github-actions[bot]`. O fluxo:

1. Gera o diff do PR, histórico de commits e conteúdo dos arquivos `.ts`/`.tsx` modificados
2. Monta um prompt com as skills do design system (`.agents/skills/shadcn/SKILL.md` + `.agents/skills/design-system/SKILL.md`)
3. Roda o review via `opencode` com modelos free em rodízio (fallback automático entre modelos)
4. Posta o resultado como comentário no PR com seções: **Resumo**, **Problemas encontrados** e **Checklist da Skill**

PRs do release-please nunca disparam este workflow — eles vão contra `main`, não `develop`.

### Release automatizada (`.github/workflows/release-please.yml`)

Dispara em **push para `main`**. O bot do release-please:

1. Lê os commits desde a última tag e calcula a próxima versão (regras [Conventional Commits](https://www.conventionalcommits.org))
2. Abre/atualiza um PR `chore(release): vX.Y.Z` contendo:
   - Bump em `package.json`
   - `CHANGELOG.md` gerado com seções por tipo (✨ Features, 🐛 Bug Fixes, etc.)
   - Bump em `.release-please-manifest.json`
3. Quando o PR é mergeado → cria a tag `vX.Y.Z` + GitHub Release automaticamente

**Estado de versionamento** (não editar à mão):

- `.release-please-manifest.json` — versão atual rastreada pelo bot
- `package.json` `version` — sobrescrito pelo bot em cada release
- `release-please-config.json` — configuração das seções do CHANGELOG

### CD (`.github/workflows/cd.yml`)

Dispara em **`release: published`** (criada pelo release-please). O fluxo:

1. **Build Docker** — imagem multi-stage com Nginx servindo o Storybook estático. Antes do `docker build`, o `jq` injeta a versão da tag em `public/r/registry.json` (manifesto consumido por projetos downstream via shadcn).
2. **Push para GHCR** — duas tags: `:latest` e `:vX.Y.Z`.
3. **Update argocd-apps** — atualiza a tag da imagem nos overlays `prod` e `dev` do repo [lema-ufpb/argocd-apps](https://github.com/lema-ufpb/argocd-apps):
   - Cria o overlay + `kustomization.yml` do zero se não existir
   - Se o image já existe no `images:`, usa `kustomize edit set image`
   - Se o image **não** existe, adiciona via `awk` (primeira release)
   - Se já está na tag correta, faz `git commit --allow-empty` para forçar reconciliação no ArgoCD
4. ArgoCD sincroniza e aplica no cluster.

> 🔒 **Garantia de qualidade**: a tag só nasce de um PR de release-please mergeado em `main`. Como o CI validou o código em `develop` e branch protection exige PR + branch atualizada, todo commit que vira tag já passou pelo pipeline. Não existe gate adicional no CD — a confiança vem do fluxo upstream.

### Mecânica de versão (single source of truth: git tag)

A versão exibida na documentação Storybook é injetada em tempo de build via `git describe --tags --abbrev=0` em `.storybook/main.ts`. O fluxo é:

```
git tag vX.Y.Z  ──▶  __APP_VERSION__ (Vite define)  ──▶  lib/version.ts  ──▶  app/Introduction.mdx
```

Para builds locais (sem tag), a versão exibida é `0.0.0`.

### Recovery quando algo falha no CD

Caminho default (90% dos casos): **roll-forward**.

- **Abrir PR de fix em `develop`** → merge para `main`. O release-please atualiza o próximo PR de release automaticamente (ou abre um novo). Merge desse PR → nova tag patch (`vX.Y.Z+1`) criada limpa. **Zero `git tag -d`**.

> 💡 O step de `update-argocd` é resiliente: cria overlays do zero, adiciona image se ausente, e usa `git commit --allow-empty` quando já está na tag correta. Mesmo se o CD falhar parcialmente, o fix é sempre roll-forward.

Para cenários menos comuns (versão errada calculada, release por engano, rollback urgente em prod, manifest inconsistente, branch protection bloqueando), consulte **[`.github/RELEASE_RUNBOOK.md`](.github/RELEASE_RUNBOOK.md)** — roteiro detalhado com comandos prontos para cada situação.

## Contribuindo

### Setup

1. Fork o repositório
2. Clone e instale: `git clone ... && cd design-system && npm install --legacy-peer-deps`
3. Crie uma branch a partir de `develop`: `git checkout develop && git checkout -b feature/minha-feature`

### Conventional Commits (obrigatório)

Para que o release-please calcule corretamente a próxima versão e gere o `CHANGELOG.md`, **todos os commits devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org)**:

| Prefixo                                  | Bump (pre-1.0)                  | Aparece no CHANGELOG |
| :--------------------------------------- | :------------------------------ | :------------------- |
| `feat:`                                  | minor (`0.X.0`)                 | ✨ Features          |
| `fix:`                                   | patch (`0.0.X`)                 | 🐛 Bug Fixes         |
| `perf:`                                  | patch                           | ⚡ Performance       |
| `refactor:`                              | patch                           | ♻️ Refactor          |
| `docs:`                                  | patch                           | 📚 Documentation     |
| `revert:`                                | patch                           | ⏪ Reverts           |
| `feat!:` / `BREAKING CHANGE:`            | minor (pre-1.0 não pula p/ 1.0) | 💥 Breaking          |
| `chore:` `style:` `test:` `build:` `ci:` | — (sem bump)                    | oculto               |

**Exemplos:**

```bash
git commit -m "feat(dashbox): add fullscreen toggle"
git commit -m "fix(progress-bar): correct color on intent='warning'"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(card-stats)!: rename CardStat to CardStatBase"  # breaking
```

### Pull Request

1. Push da sua branch: `git push origin feature/minha-feature`
2. Abra PR contra `develop` — CI dispara automaticamente
3. Após aprovação e merge em `develop`, eventualmente um PR `develop → main` agrega features prontas para release
4. Merge em `main` → o bot do release-please abre `chore(release): vX.Y.Z` → revisar → merge → deploy automático

## Licença

MIT License - © 2026 LEMA/UFPB

See [LICENSE](./LICENSE) for details.

## Contato

Laboratório de Economia e Modelagem Aplicada da
Universidade Federal da Paraíba
https://lema.ufpb.br
