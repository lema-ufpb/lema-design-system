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

## Uso via Registry (shadcn CLI)

Você pode instalar qualquer componente deste design system em seu próprio projeto usando o link do registro oficial:

```bash
# Adicionar um componente específico
npx shadcn@latest add https://ds.lema.ufpb.br/r/registry.json <component-name>

# Exemplos:
npx shadcn@latest add https://ds.lema.ufpb.br/r/registry.json dashbox
npx shadcn@latest add https://ds.lema.ufpb.br/r/registry.json progress-bar
```

> O arquivo `lib/ui-i18n.ts` (dicionário i18n) é instalado automaticamente como dependência de registro para todos os componentes que suportam locale. Não é necessário instalá-lo manualmente.

## Internacionalização (i18n)

Todos os componentes com texto visível suportam internacionalização via prop `locale`. O dicionário centralizado fica em `lib/ui-i18n.ts`.

### Locais suportados

| Código | Idioma             |
| :----- | :----------------- |
| en-US  | English (default)  |
| pt-PR  | Português (Brasil) |
| es-ES  | Español            |
| fr-FR  | Français           |

### Uso

```tsx
import { Dashbox } from "@/components/custom/dashbox"

<Dashbox title="Status" locale="pt-PR" status="live" />
// Badge mostra "Online", toolbar mostra "Atualizar", "Recolher" etc.
```

A prop `locale` é opcional (padrão `"en-US"`). Ao instalar um componente via shadcn CLI, o arquivo `lib/ui-i18n.ts` é instalado automaticamente como dependência.

### Registry

O dicionário `ui-i18n` está publicado como `registry:lib` no registro oficial:

```bash
# Instalação manual (se necessário)
npx shadcn@latest add https://ds.lema.ufpb.br/r/registry.json ui-i18n
```

## Estrutura do Projeto

```
lema-ds/
├── app/
│   ├── globals.css         # Tokens CSS e temas
│   └── layout.tsx          # Layout raiz com ThemeProvider
├── components/
│   ├── ui/                 # Primitivos shadcn (base)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── custom/             # Componentes customizados
│       ├── dashbox.tsx
│       ├── bar-chart.tsx
│       ├── data-table.tsx
│       ├── search-combo/
│       │   ├── index.tsx
│       │   ├── types.ts
│       │   ├── variants.ts
│       │   └── hooks/
│       └── ...
├── lib/
│   ├── utils.ts            # Utilitários (cn)
│   └── ui-i18n.ts          # Dicionário i18n compartilhado (multi-locale)
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
├── specs/               # Specs de todos os componentes custom (34 arquivos)
└── templates/
    └── component-spec.md # Template de spec para novos componentes
```

### Workflow spec-first

1. **Preencher o template** `.agents/templates/component-spec.md` — propósito, API, variantes CVA, tokens, acessibilidade, stories obrigatórias
2. **Revisar a spec** contra as regras do design system (escala tipográfica, tokens semânticos, `gap-*`, `Skeleton`, `defaultVariants`)
3. **Implementar** seguindo o padrão CVA single-file (types → variants → helpers → component)
4. **Verificar** com `make test` (590+ testes)

As skills em `.agents/skills/` funcionam como guardrails de IA: ao desenvolver com assistência, as regras de estilo, composição e tokens são aplicadas automaticamente durante a geração de código.

### Specs existentes

Todos os 34 componentes custom já possuem spec documentada em `.agents/specs/`. Cada spec detalha propósito, API, variantes CVA, tokens, escala tipográfica, estados (loading/empty/disabled), acessibilidade e stories obrigatórias — servindo como fonte de verdade para manutenção e evolução.

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
npx shadcn@latest add <componente>
```

### Componentes customizados

Todos os componentes abaixo vivem em `components/custom/`.

#### Layout

| Componente     | Descrição                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------- |
| **Dashbox**    | Card de dashboard estruturado com collapse/expand, fullscreen, refresh, loading skeleton e status badge. |
| **Dashrow**    | Container responsivo para múltiplos painéis com divisor arrastável e proporções ajustáveis.              |
| **Drawer**     | Drawer completo com header, body scrollável, footer e botão de fechar adaptável à direção.               |
| **IconButton** | Botão só de ícone com tooltip opcional, estado de loading e variantes de tamanho e arredondamento.       |

```tsx
import { Dashbox } from "@/components/custom/dashbox"
import { Dashrow } from "@/components/custom/dashrow"
import { Drawer } from "@/components/custom/drawer"

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

| Componente  | Descrição                                                                        |
| :---------- | :------------------------------------------------------------------------------- |
| **Spinner** | Indicador de carregamento animado com `aria-label` localizada via `locale` prop. |

```tsx
import { Spinner } from "@/components/custom/spinner"

<Spinner locale="pt-BR" />
<Spinner className="size-6 text-primary" />
```

#### Progresso & Exibição de Dados

| Componente           | Descrição                                                                                                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CardStats**        | Coleção de 9 cards de KPI: CardStat, CardStatCompact, CardStatProgress, CardStatComparison, CardStatSparkline, CardStatHighlight, CardStatList, CardStatGauge, CardStatHeatbar. |
| **DataTable**        | Tabela virtualizada de alta performance com toolbar, ordenação, busca, paginação, colunas sticky, redimensionamento e seleção de linhas.                                        |
| **ProgressBar**      | Indicador horizontal com preenchimento animado, intenções semânticas e posições de rótulo configuráveis.                                                                        |
| **ProgressCircular** | Indicador circular animado com valor percentual central.                                                                                                                        |
| **RiskLevelBar**     | Barra segmentada para níveis de risco com marcador móvel e tokens `--risk-1` a `--risk-4`.                                                                                      |
| **StepProgress**     | Guia visual para processos multi-etapa com círculo numerado, ícone opcional, conector animado e orientações horizontal/vertical.                                                |

```tsx
import { CardStatCompact, CardStatProgress } from "@/components/custom/card-stats"
import { ProgressBar } from "@/components/custom/progress-bar"
import { ProgressCircular } from "@/components/custom/progress-circular"
import { RiskLevelBar } from "@/components/custom/risk-level-bar"
import { StepProgress } from "@/components/custom/step-progress"
import { DataTable } from "@/components/custom/data-table"

<CardStatCompact label="Revenue" value={124500} format="currency" trend="up" trendValue="+26.8%" icon={DollarSignIcon} />
<ProgressBar value={0.75} name="Taxa de Aprovação" intent="success" />
<ProgressCircular value={0.6} title="Frequência" size="lg" />
<RiskLevelBar labelLeft="Nível de Risco" labelRight="Score" value={0.4} />
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
import { BarChart } from "@/components/custom/bar-chart"

<BarChart data={data} categoryKey="name" dataKeys={[{ key: "total", label: "Total" }]} />
```

#### Formulários

| Componente               | Descrição                                                                                          |
| :----------------------- | :------------------------------------------------------------------------------------------------- |
| **Counter**              | Input numérico com controles +/− e suporte a valor controlado/não-controlado.                      |
| **InputEmail**           | Campo de e-mail com ícone integrado e variantes de tamanho e raio.                                 |
| **InputPassword**        | Campo de senha com botão de visibilidade e variantes de tamanho e raio.                            |
| **Combobox** (primitivo) | Autocomplete com busca textual, navegação por teclado, grupos e suporte a @base-ui/react.          |
| **Combobox** (custom)    | Combobox completo com scroll virtual, seleção única/múltipla com chips e renderização customizada. |
| **SelectList**           | Lista pesquisável com estado de seleção, ícones e scroll virtual para grandes volumes.             |

```tsx
import { Counter } from "@/components/custom/counter"
import { Combobox } from "@/components/ui/combobox"          // primitivo
import { Combobox as ComboboxCustom } from "@/components/custom/combobox"  // custom
import { SelectList } from "@/components/custom/select-list"
import { InputEmail } from "@/components/custom/input-email"
import { InputPassword } from "@/components/custom/input-password"

<Counter defaultValue={1} min={0} max={100} onChange={setValue} />
<Combobox options={items} value={selected} onChange={setSelected} />
<ComboboxCustom options={items} value={values} onChange={setValues} multiple />
<SelectList data={items} selectedId={id} onSelect={setItem} height={300} />
<InputEmail placeholder="email@example.com" />
<InputPassword placeholder="Senha" />
```

#### Navegação

| Componente       | Descrição                                                                         |
| :--------------- | :-------------------------------------------------------------------------------- |
| **HeaderSearch** | Botão de busca expansível com animação suave para headers de página.              |
| **FooterMenu**   | Rodapé responsivo — colunas no desktop, accordion no mobile, suporte a uppercase. |
| **NavDots**      | Navegação de seções por pontos com rastreamento automático de rolagem e tooltips. |
| **NavUser**      | Menu de perfil de usuário para headers, construído sobre DropdownMenu e Avatar.   |
| **Pagination**   | Paginação semântica com `locale` prop para labels "Anterior"/"Próxima" em pt-BR.  |
| **ToggleTheme**  | Botão dropdown para alternar entre temas claro, escuro e sistema.                 |

```tsx
import { HeaderSearch } from "@/components/custom/header-search"
import { FooterMenu } from "@/components/custom/footer-menu"
import { ToggleTheme } from "@/components/custom/toggle-theme"
import { Pagination } from "@/components/custom/pagination"
import { NavDots } from "@/components/custom/nav-dots"
import { NavUser } from "@/components/custom/nav-user"

// No layout do header:
<HeaderSearch onSearch={(term) => router.push(`/search?q=${term}`)} />
<ToggleTheme labels={{ light: "Claro", dark: "Escuro", system: "Sistema" }} />

<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
<NavDots sections={sections} />
<NavUser user={user} onLogout={handleLogout} />
```

### Blocos multi-arquivo

Componentes de alta complexidade mantidos em subdiretórios dentro de `components/custom/`.

#### SearchCombo

Campo de busca com dropdown de autocomplete virtualizado, highlight de texto (com acentuação insensitive), navegação por teclado, agrupamento de resultados e reconhecimento de voz opcional.

```tsx
import { SearchCombo } from "@/components/custom/search-combo"

<SearchCombo
  value={query}
  onChange={setQuery}
  options={results}
  onSearch={(term) => fetchResults(term)}
  onSelectResult={(item) => router.push(item.url)}
  voice
  placeholder="Buscar documentos..."
/>
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
  --risk-1: oklch(0.62 0.19 28); /* Baixo */
  --risk-2: oklch(0.72 0.17 50);
  --risk-3: oklch(0.85 0.18 85);
  --risk-4: oklch(0.92 0.15 105); /* Alto */
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
make lint             # ESLint e typecheck
make format           # Prettier
make build-storybook  # Build Storybook estático
make test             # Vitest
make coverage         # Coverage com Vitest
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

Dispara **apenas em PR contra `develop`** — única etapa do fluxo onde código novo é introduzido. PRs `develop → main` e PRs do release-please **não rodam CI** (são promoção e version bump, respectivamente — mesmo código já validado). Roda 3 jobs em paralelo no self-hosted runner:

- 🏗️ **build** — `npm run build-storybook`
- 🕵️ **lint** — `npm run format:check` + `npm run lint`
- 🎭 **test** — `npm run test` (vitest browser mode, usa Chromium em `PLAYWRIGHT_BROWSERS_PATH=/mnt/dados/playwright-browsers`)

Runs antigos no mesmo PR são cancelados automaticamente via `concurrency`. Instalação usa `npm ci --legacy-peer-deps` com cache (composite action em `.github/actions/setup-node-deps`).

**Por que CI roda apenas uma vez por ciclo de release:** o invariante é "se `develop` está verde, `main` está verde". Branch protection em `develop` exige CI verde antes de merge → todo código que entra em `develop` foi validado. `develop → main` é promoção sem código novo. release-please PR só altera `package.json`, `CHANGELOG.md` e `.release-please-manifest.json` — nenhum desses afeta build/lint/test. Resultado: 1 run de CI por mudança real, não 4.

> ⚠️ **Branch protection é obrigatório** em `develop` e `main`. Como o CI não dispara em `push`, push direto burla a validação. Configure em **Settings → Branches**: exigir PR + status checks verdes + branch atualizada antes do merge.

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
3. **Update argocd-apps** — commita o bump da tag nos overlays `prod` e `dev` do repo [lema-ufpb/argocd-apps](https://github.com/lema-ufpb/argocd-apps). ArgoCD sincroniza e aplica no cluster.

> 🔒 **Garantia de qualidade**: a tag só nasce de um PR de release-please mergeado em `main`. Como branch protection exige CI verde pra mergear, todo commit que vira tag **já foi validado** pelo CI. Não existe gate adicional no CD — a confiança vem da branch protection upstream.

### Mecânica de versão (single source of truth: git tag)

A versão exibida na documentação Storybook é injetada em tempo de build via `git describe --tags --abbrev=0` em `.storybook/main.ts`. O fluxo é:

```
git tag vX.Y.Z  ──▶  __APP_VERSION__ (Vite define)  ──▶  lib/version.ts  ──▶  app/Introduction.mdx
```

Para builds locais (sem tag), a versão exibida é `0.0.0`.

### Recovery quando algo falha no CD

Caminho default (90% dos casos): **roll-forward**.

- **Antes (fluxo antigo)**: corrigir em develop → merge main → `git tag -d` local → `git push --delete` remoto → recriar tag manualmente.
- **Agora**: abrir PR de fix em `develop` → merge para `main`. O release-please atualiza o próximo PR de release automaticamente (ou abre um novo). Merge desse PR → nova tag patch (`vX.Y.Z+1`) criada limpa. **Zero `git tag -d`**.

Para cenários menos comuns (versão errada calculada, release por engano, rollback urgente em prod, manifest inconsistente), consulte **[`.github/RELEASE_RUNBOOK.md`](.github/RELEASE_RUNBOOK.md)** — roteiro detalhado com comandos prontos para cada situação.

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
