# ✨ LEMA Design System

Official design system of the [Laboratory of Economics and Applied Modeling (LEMA)](https://lema.ufpb.br) at the Federal University of Paraíba (UFPB). A modern, accessible, and themeable React component library built on top of shadcn/ui and Radix UI Primitives.

## 🎯 Overview 🎯

This design system provides a set of high-quality React TypeScript components with support for:

- 🌙 Automatic dark/light mode
- ♿ WCAG 2.1 AA Accessibility (`docs/accessibility.md`)
- 🎨 Customization via CSS variables (Tailwind CSS v4)
- 📱 Responsive design
- 🔍 Full TypeScript

## 💻 Tech Stack 🛠️

| Technology               | Purpose                  |
| ------------------------ | ------------------------ |
| React 19                 | UI Library               |
| Next.js 16               | Framework                |
| TypeScript               | Typing                   |
| Tailwind CSS v4          | Styling                  |
| Radix UI                 | Accessibility primitives |
| shadcn/ui                | Base components          |
| class-variance-authority | Component variants       |
| Storybook                | Component documentation  |
| Vitest                   | Testing                  |

## 🚀 Installation 🚀

```bash
# Clone the repository
git clone https://github.com/lema-ufpb/design-system.git
cd design-system

# Install dependencies
npm install

# Start the development server
make dev
```

## 📦 Usage via dedicated CLI — `@lema-ufpb/ds-sync`

For institutional UFPB projects, we provide a dedicated CLI on [npm](https://www.npmjs.com/package/@lema-ufpb/ds-sync) that extends the shadcn CLI with authentication, lockfile, drift detection and CI mode:

```bash
npm install -D @lema-ufpb/ds-sync
```

Configure in `.env.local`:

```env
LEMA_DS_TOKEN=<seu-token>
LEMA_DS_REGISTRY=https://ds.lema.ufpb.br
```

> 🔑 The token is provided by LEMA NOC. The default registry points to production.

### ⌨️ Main commands

| Command                   | Description                   |
| :------------------------ | :---------------------------- |
| `npx ds add dashbox`      | Install component(s)          |
| `npx ds update dashbox`   | Update component(s)           |
| `npx ds list`             | List available components     |
| `npx ds verify`           | Check drift vs lockfile       |
| `npx ds diff dashbox`     | Local vs remote diff          |
| `npx ds sync --all --yes` | Full sync (CI)                |
| `npx ds sync-tokens`      | Force CSS tokens refetch      |
| `npx ds whoami`           | Validate authentication token |

The `ds.lock` lockfile is generated automatically and **should be versioned** — it is the source of truth for reproducibility and drift detection.

## ⬇️ Usage via Registry (shadcn CLI)

You can install any component from this design system in your own project via the official shadcn registry at `https://ds.lema.ufpb.br`.

### 1. Add the LEMA-DS registry

If your project was initialized with `npx shadcn@latest init`, register the LEMA-DS registry once:

```bash
npx shadcn@latest registry add @lema-ds https://ds.lema.ufpb.br/r/{name}.json
# shorthand when running inside this repository (resolves registry.json locally):
# npx shadcn@latest registry add @lema-ds .
```

This adds an entry to your `components.json`:

```json
{
  "registries": {
    "@lema-ds": "https://ds.lema.ufpb.br/r/{name}.json"
  }
}
```

Verify:

```bash
npx shadcn@latest registry list
# or
cat components.json
```

> This is the **shadcn-native** way to add the registry. You do **not** need `@lema-ufpb/ds-sync` for it — both CLIs consume the same `registry.json` / `public/r/*.json` build output (`make registry`).

### 2. Install components

Once the registry is configured, install any `ds-*` component by its registry name:

```bash
# registry-qualified (recommended, unambiguous)
npx shadcn@latest add @lema-ds/ds-button
npx shadcn@latest add @lema-ds/ds-card-stat
npx shadcn@latest add @lema-ds/ds-data-table

# shorthand also works when the name is unique across registries
npx shadcn@latest add ds-button
npx shadcn@latest add ds-hero-layers
```

Install multiple at once:

```bash
npx shadcn@latest add @lema-ds/ds-card-stat @lema-ds/ds-bar-chart @lema-ds/ds-data-table
```

Without a local registry entry you can also install directly by URL:

```bash
npx shadcn@latest add https://ds.lema.ufpb.br/r/ds-button.json
npx shadcn@latest add https://ds.lema.ufpb.br/r/ds-card-stat.json
```

Files land in the consumer project as `components/ui/ds-*.tsx` (prefix avoids collision with `components/ui/button.tsx` etc.), exactly as declared in `registry.json` (`name: "ds-*"`, `target: "components/ui/ds-*.tsx"`). Dependencies declared in the registry item (`lib/ui-i18n.ts`, `lib/format-utils.ts`, shadcn primitives, sibling `ds-*` items, npm packages) are installed automatically. Every `registryDependencies` entry is namespaced (`@lema-ds/<name>`) so the CLI resolves it against this registry and never against `ui.shadcn.com`, and `npm run registry:check` guarantees each item declares everything its source imports — so installing a single item in a fresh project works.

The legacy UFPB wrapper `ds-sync` is no longer needed (the shadcn CLI above is the supported path). If you still use it, the same install works:

```bash
# equivalent via ds-sync
npx ds add dashbox
npx ds add progress-bar
npx ds add ds-button
```

## 🌐 Internationalization (i18n)

All components with visible text support internationalization via the `locale` prop. The centralized dictionary lives in `lib/ui-i18n.ts`.

### 🌍 Supported locales

| Code  | Language            |
| :---- | :------------------ |
| en-US | English (default)   |
| pt-BR | Portuguese (Brazil) |
| es-ES | Español             |
| fr-FR | Français            |

> The `lib/ui-i18n.ts` file (i18n dictionary) is automatically installed as a registry dependency for all locale-supporting components. No need to install it manually.

### 💡 Usage

```tsx
import { Dashbox } from "@/components/ds/dashbox"

;<Dashbox title="Status" locale="en-US" status="live" />
// Badge shows "Online", toolbar shows "Refresh", "Collapse" etc.
```

The `locale` prop is optional (default `"en-US"`). When installing a component via shadcn CLI, the `lib/ui-i18n.ts` file is installed automatically as a dependency.

### 🗃️ Registry

The `ui-i18n` dictionary is published as `registry:lib` in the official registry:

```bash
# Manual installation (if needed)
npx shadcn@latest add @lema-ds/ui-i18n
```

## 📁 Project Structure

```
design-system/
├── app/
│   ├── globals.css         # CSS tokens and themes (Tailwind v4 @theme inline)
│   ├── Introduction.mdx    # Storybook intro (v{VERSION}, 374 items, 309 ds)
│   └── layout.tsx          # Root layout with ThemeProvider
├── components/
│   ├── ui/                 # shadcn primitives — 62, never edit (npx shadcn add)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (62)
│   └── ds/                 # Composites — 309 (CVA single-file, i18n, Skeleton)
│       ├── dashbox.tsx
│       ├── bar-chart.tsx
│       ├── data-table.tsx
│       ├── tilt-card.tsx          # Aceternity 3D/Wobble
│       ├── hero-layers.tsx        # Launch UI Layers
│       ├── screenshot.tsx         # Launch UI theme-aware
│       └── ... (250+)
├── lib/
│   ├── utils.ts                    # cn()
│   ├── ui-i18n.ts                  # Dictionary 4 locales (300+ keys)
│   ├── format-utils.ts             # Intl.NumberFormat + abrev.
│   ├── card-stats-shared.tsx       # CardStat family CVA (9 variants)
│   └── version.ts                  # __APP_VERSION__
├── providers/theme.tsx     # ThemeProvider (next-themes)
├── .storybook/             # Storybook 10 + Vitest browser
├── registry.json           # 374 items (309 ds-* → components/ui/ds-*.tsx)
├── public/r/               # shadcn build output
├── docs/specs/             # 368 specs (spec-first)
├── docs/templates/component-spec.md
└── Makefile                # make dev/lint/test/registry
```

## 📋 Spec-Driven Development

New custom components follow a **spec-first** flow, with templates and specs in `docs/`:

```
docs/
├── specs/               # Specs for all components (368 files — 62 ui + 309 ds, 374 items in registry)
└── templates/
    └── component-spec.md # Spec template for new components
```

### 🔄 Spec-first workflow

1. **Fill the template** `docs/templates/component-spec.md` — purpose, API, CVA variants, tokens, accessibility, required stories
2. **Review the spec** against design system rules (typographic scale, semantic tokens, `gap-*`, `Skeleton`, `defaultVariants`)
3. **Implement** following the CVA single-file pattern (types → variants → helpers → component)
4. **Verify** with `make lint` (0 errors) + `make registry` (registry rebuild — `374` items) + `make test` (>1000 tests in 160+ files)

Specs in `docs/specs/` act as the source of truth: each component has its purpose, API, CVA variants, tokens and accessibility documented.

### 📚 Existing specs

All components (`62` ui primitives + `309` ds + `3` libs = `374` registry items) have documented specs in `docs/specs/` (`368` specs). Each spec details purpose, API, CVA variants, tokens (`bg-success`, `bg-risk-1`…`4`, `--chart-1`…`5`), typographic scale `sm=text-xs/md=text-sm/lg=text-base`, states (loading `Skeleton`/empty/disabled), accessibility (`aria-*`, `prefers-reduced-motion`) and required stories — spec-first source of truth.

### 📄 Spec template

The template covers: usage purpose, complete API with types, CVA variants per slot, design tokens, typographic scale sm/md/lg, behaviors (loading, disabled, empty), accessibility (ARIA, keyboard, i18n) and required stories checklist.

## 🧩 Components

### 🧱 shadcn Primitives

Base components installed via shadcn CLI, without modifications:

| Component           | Description                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------- |
| **Accordion**       | Set of stacked and collapsible panels.                                                             |
| **Attachment**      | File attachment with media preview, title, description, actions and trigger overlay.               |
| **Avatar**          | Visual element to represent users with initials fallback.                                          |
| **Badge**           | Small label indicating status or category.                                                         |
| **Bubble**          | Chat bubble with sent/received variants and tail support.                                          |
| **Button**          | Interactive button with variants (default, destructive, outline, etc).                             |
| **Card**            | Versatile container with header, title, action, description and footer.                            |
| **Combobox**        | Autocomplete with search, keyboard navigation and group support, built on @base-ui/react.          |
| **Command**         | Fast and accessible command menu with integrated search.                                           |
| **Dialog**          | Overlay modal for critical interactions.                                                           |
| **Dropdown Menu**   | Floating menu triggered by a button.                                                               |
| **Drawer**          | Sliding panel with 4-direction support and drag gestures.                                          |
| **Input**           | Standard text input field.                                                                         |
| **Input Group**     | Grouped inputs with icons or buttons.                                                              |
| **Marker**          | Status/pin indicator for chat and list items.                                                      |
| **Message**         | Chat message with avatar, content, header and footer slots.                                        |
| **MessageScroller** | Container with auto-scroll for message lists and navigation buttons.                               |
| **Popover**         | Floating content anchored to an element.                                                           |
| **Progress**        | Simple linear progress bar.                                                                        |
| **Questionnaire**   | Multi-step questionnaire with single choice, multiple choice, free text and skip option questions. |
| **Scroll Area**     | Custom and accessible scroll area.                                                                 |
| **Skeleton**        | Loading placeholder for empty states.                                                              |
| **Spinner**         | Animated loading indicator.                                                                        |
| **Table**           | Responsive table component with horizontal scroll support.                                         |
| **Textarea**        | Multiline text input field.                                                                        |
| **Tooltip**         | Brief description shown on hover.                                                                  |

To add new shadcn components to the project:

```bash
npx ds add <componente>
```

### ✨ Custom components

All components below live in `components/ds/`.

#### ⚡ Actions

| Component       | Description                                                                                                                                                                                                        |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button**      | Feature-rich button wrapping shadcn `Button`. Adds loading state, start/end icons, `rounded` variant (`full`/`lg`/`md`/`none`), `fullWidth`, double-click debounce, two-step confirmation, and integrated tooltip. |
| **IconButton**  | Icon-only button with optional tooltip, loading state and size and rounding variants.                                                                                                                              |
| **ToggleTheme** | Dropdown button to switch between light, dark and system themes. Re-exports `ThemeProvider` and `useTheme` from `@/providers/theme` for app configuration.                                                         |

```tsx
import { Button } from "@/components/ds/button"
import { IconButton } from "@/components/ds/icon-button"
import { ToggleTheme } from "@/components/ds/toggle-theme"

<Button loading startIcon={<Download className="size-4" />}>Download</Button>
<Button variant="destructive" confirm={{ text: "Tem certeza?" }}>Excluir</Button>
<Button tooltip={{ text: "Send report", side: "top" }}>Send</Button>

<IconButton icon={Download} label="Download" tooltip="Baixar arquivo" />
<ToggleTheme locale="en-US" />
```

#### 📐 Layout

| Component   | Description                                                                                                                                                     |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dashbox** | Structured dashboard card with collapse/expand, fullscreen, refresh, loading skeleton and status badge.                                                         |
| **Dashrow** | Responsive container for multiple panels with draggable divider and adjustable proportions.                                                                     |
| **Drawer**  | Full drawer with header, scrollable body, footer, snap points, scale background, event handlers and direction-adaptive close button.                            |
| **Modal**   | Flexible modal dialog built on Dialog with 6 sizes, 5 color intents, defaultOpen, scrollable body, async confirm with loading, event handlers and i18n support. |

```tsx
import { Dashbox } from "@/components/ds/dashbox"
import { Dashrow } from "@/components/ds/dashrow"
import { Drawer } from "@/components/ds/drawer"
import { Modal } from "@/components/ds/modal"

<Modal
  title="Confirm deletion"
  intent="destructive"
  confirmLabel="Excluir"
  onConfirm={handleDelete}
>
  Are you sure you want to delete this item?
</Modal>

<Drawer direction="right" title="Detalhes" description="ID #1234" footer={actions}>
  Drawer content...
</Drawer>

<Dashrow alignment="left" storageKey="dashboard-layout">
  <Dashbox title="Performance" status="live" onRefresh={() => fetchData()}>
    Chart content here...
  </Dashbox>
  <Dashbox title="Metas">
    Side content...
  </Dashbox>
</Dashrow>
```

#### 💬 Feedback

| Component            | Description                                                                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty** (ds)       | Contextual empty states with built-in SVG icons for no-data, search, error, and no-results scenarios, i18n titles, action button, compact mode, and skeleton loading. |
| **PageLoader**       | Full-screen loading overlay with animated top bar (`bar`) or centered XL spinner (`spinner`). Controlled by `loading` with fade in/out, semantic colors and i18n.     |
| **Spinner**          | Animated loading indicator with `aria-label` localized via `locale` prop.                                                                                             |
| **ProgressBar**      | Horizontal indicator with animated fill, semantic intents, configurable label positions, fill/track color override via CSS tokens and getValueLabel.                  |
| **ProgressCircular** | Animated circular indicator with centered percentage value.                                                                                                           |
| **RiskLevelBar**     | Segmented bar for risk levels with movable marker and `--risk-1` to `--risk-4` tokens.                                                                                |

```tsx
import { PageLoader } from "@/components/ds/page-loader"
import { Spinner } from "@/components/ds/spinner"
import { ProgressBar } from "@/components/ds/progress-bar"
import { ProgressCircular } from "@/components/ds/progress-circular"
import { Empty } from "@/components/ds/empty"
import { RiskLevelBar } from "@/components/ds/risk-level-bar"

<PageLoader loading={isLoading} locale="en-US" />
<PageLoader loading={isLoading} variant="spinner" message="Salvando..." color="success" blur />

<Spinner locale="en-US" />
<Spinner className="size-6 text-primary" />

<ProgressBar value={0.75} name="Approval Rate" intent="success" />
<ProgressCircular value={0.6} title="Frequency" size="lg" />
<RiskLevelBar labelLeft="Risk Level" labelRight="Score" value={0.4} />

<Empty variant="no-data" locale="en-US" />
<Empty variant="search" title="Nenhum resultado encontrado" action={{ label: "Limpar filtros", onClick: clearFilters }} />
```

#### 📊 Data Display

| Component       | Description                                                                                                                                                                                                                                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CardStats**   | Collection of 9 KPI cards: CardStat, CardStatCompact, CardStatProgress, CardStatComparison, CardStatSparkline, CardStatHighlight, CardStatList, CardStatGauge, CardStatHeatbar. Each variant is installable individually via `card-stat`, `card-stat-compact`, etc., or all at once via the barrel `card-stats`. |
| **MiniCard**    | Compact stat label+value unit for horizontal strips. Composes with MiniCardGroup (pill/outlined/elevated/ghost) and MiniCardStrip (auto-dividers). Supports icons, sub-values, intent colors, delta indicators and numeric formatting. Size propagates via context.                                              |
| **DataTable**   | High-performance virtualized table with toolbar, sorting, search, pagination, `locale` prop for automatic i18n label resolution, sticky columns, resizing and row selection.                                                                                                                                     |
| **ScoreRow**    | Score row component with configurable icon, score/total, progress bar with localized percent tooltip, auto-derived status (success/warning/destructive), sm/md/lg sizes, ScoreRowList support and loading skeleton.                                                                                              |
| **Avatar** (ds) | Extended avatar with 5 size variants (sm through 2xl), status indicator dots, initials color generator, image loading status callback, delay fallback, avatar group with overflow count, tooltip, and skeleton loading.                                                                                          |
| **Badge** (ds)  | Extended badge with dot indicator, removable close icon, icon support, counter/overflow display, and semantic color variants (success/warning).                                                                                                                                                                  |
| **CopyBlock**   | Text/code snippet with attached copy button, copied state tooltip, 3 sizes and i18n labels.                                                                                                                                                                                                                      |
| **Rating**      | Interactive star rating with keyboard navigation (radiogroup pattern), customizable icon, readonly/disabled states and 3 sizes.                                                                                                                                                                                  |
| **Timeline**    | Vertical timeline of events with connectors, status-colored dots (outline/solid) and custom icon slots.                                                                                                                                                                                                          |

```tsx
import { MiniCard, MiniCardGroup, MiniCardStrip } from "@/components/ds/mini-card"
import { CardStatCompact } from "@/components/ds/card-stat-compact"
import { CardStatProgress } from "@/components/ds/card-stat-progress"
// Ou via barrel (instala todos):
// import { CardStatCompact, CardStatProgress } from "@/components/ds/card-stats"
import { DataTable } from "@/components/ds/data-table"
import { ScoreRow, ScoreRowList } from "@/components/ds/score-row"
import { Avatar, AvatarGroup } from "@/components/ds/avatar"
import { Badge } from "@/components/ds/badge"
import { CopyBlock } from "@/components/ds/copy-block"
import { Rating } from "@/components/ds/rating"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@/components/ds/timeline"

<MiniCardGroup variant="outlined" size="md" divide accent="success">
  <MiniCard label="Receita" value={124500} format="currency" locale="en-US" currency="BRL" delta="+26.8%" />
  <MiniCard label="Selecionados" value={53} sub="/153" />
</MiniCardGroup>
<CardStatCompact label="Revenue" value={124500} format="currency" trend="up" trendValue="+26.8%" icon={DollarSignIcon} />
<DataTable columns={columns} data={rows} searchable sortable paginated />

<ScoreRowList>
  <ScoreRow title="Accuracy" description="Modelo XGBoost" score={88} total={100} status="success" locale="en-US" />
  <ScoreRow title="Precision" description="Modelo Random Forest" score={45} total={100} status="warning" locale="en-US" />
</ScoreRowList>

<Avatar src="/user.jpg" alt="John Doe" size="lg" />
<Avatar initials="JS" />
<AvatarGroup limit={3}>
  <Avatar initials="AL" tooltip="Ana Lima" />
  <Avatar initials="BC" tooltip="Bruno Costa" />
</AvatarGroup>

<Badge>Completed</Badge>
<Badge variant="success" dot>Aprovado</Badge>
<Badge variant="warning" removable onRemove={handleDismiss}>Pendente</Badge>

<CopyBlock value="npm install @lema-ufpb/design-system" locale="en-US" />
<Rating value={3} max={5} onChange={setRating} locale="en-US" />
<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot status="success" solid />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>Pedido recebido</TimelineContent>
  </TimelineItem>
</Timeline>
```

#### 📈 Charts

Data visualization components built on Recharts and optimized for LEMA.

| Component            | Description                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------------- |
| **BarChart**         | Bar chart with tooltips, legends, stacking, rounded corners and brush zoom.                         |
| **BoxplotChart**     | Statistical boxplot chart with custom SVG, notch support and outlier plotting.                      |
| **CandlestickChart** | Financial (candlestick) chart with volume, moving averages, reference lines and brush.              |
| **GeomapChart**      | Interactive geographic map to render GeoJSON/TopoJSON with tooltips, zoom, choropleths and markers. |
| **HeatmapChart**     | Heat matrix with CSS grid and color-mix for smooth color interpolation.                             |
| **LineChart**        | Line chart with gradient areas, stacked areas, reference lines and brush.                           |
| **PieChart**         | Pie/donut chart with interactive central label, legends and external labels.                        |
| **RadarChart**       | Radar/spider chart for multivariate data with polygonal or circular grid.                           |
| **RadialChart**      | Radial bar chart with concentric rings and semicircular gauge mode.                                 |
| **ScatterChart**     | Scatter/bubble chart with trend lines, multi-series and brush.                                      |
| **TreemapChart**     | Treemap chart with hierarchical drill-down, breadcrumb and aspect ratio control.                    |

```tsx
import { BarChart } from "@/components/ds/bar-chart"

;<BarChart
  data={data}
  categoryKey="name"
  dataKeys={[{ key: "total", label: "Total" }]}
/>
```

#### 📝 Forms

| Component                | Description                                                                                                                                                                                              |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Counter**              | Numeric input with +/− controls, controlled/uncontrolled value support and inputProps for native HTML attributes.                                                                                        |
| **Input** (ds)           | Extended input with icon prefix/suffix, clearable button, character counter with maxLength, loading spinner, rounded/bordered variants, and error state.                                                 |
| **InputEmail**           | Email field with integrated icon and size and radius variants.                                                                                                                                           |
| **InputPassword**        | Password field with visibility button and size and radius variants.                                                                                                                                      |
| **SearchBar**            | Expandable search input for headers with toggle icon, keyboard shortcut hint and i18n placeholders.                                                                                                      |
| **SearchCombo**          | Search field with virtualized autocomplete dropdown, text highlighting (accent-insensitive), keyboard navigation, result grouping and optional voice recognition. Kept in `components/ds/search-combo/`. |
| **Combobox** (primitivo) | Autocomplete with textual search, keyboard navigation, groups and @base-ui/react support.                                                                                                                |
| **Combobox** (custom)    | Full combobox with virtual scroll, single/multiple selection with chips, custom rendering and configurable positioning.                                                                                  |
| **Select** (ds)          | Extended select with search filter, async option loading, grouped options, creatable new option, configurable popover positioning, i18n placeholder/no-results, and skeleton loading.                    |
| **SelectList**           | Searchable list with selection state, icons and virtual scroll for large datasets.                                                                                                                       |
| **Slider** (ds)          | Extended slider with value tooltip on hover, step marks/labels, range (dual handle) support, format-utils integration, and skeleton loading.                                                             |
| **Switch** (ds)          | Extended switch with label positioning, semantic color variants (success/destructive/warning), skeleton loading, and error state.                                                                        |
| **DatePicker**           | Date picker combining a trigger button and a Calendar in Popover, with formatting via date-fns localized in 4 languages and 3 sizes.                                                                     |
| **FileUpload**           | Upload area with drag-and-drop, max size validation, upload progress bar and i18n labels.                                                                                                                |
| **MultiSelect**          | Multi-value combobox with removable chips, overflow via `maxCount`, search filter and i18n labels.                                                                                                       |

```tsx
import { Counter } from "@/components/ds/counter"
import { Combobox } from "@/components/ui/combobox"          // primitivo
import { Combobox as ComboboxCustom } from "@/components/ds/combobox"  // custom
import { SelectList } from "@/components/ds/select-list"
import { Input } from "@/components/ds/input"
import { InputEmail } from "@/components/ds/input-email"
import { InputPassword } from "@/components/ds/input-password"
import { SearchBar } from "@/components/ds/search-bar"
import { Select } from "@/components/ds/select"
import { Slider } from "@/components/ds/slider"
import { Switch } from "@/components/ds/switch"
import { SearchCombo } from "@/components/ds/search-combo"
import { DatePicker } from "@/components/ds/date-picker"
import { FileUpload } from "@/components/ds/file-upload"
import { MultiSelect } from "@/components/ds/multi-select"

<Counter defaultValue={1} min={0} max={100} onChange={setValue} />
<Input placeholder="Digite seu nome" clearable maxLength={100} locale="en-US" />
<Combobox options={items} value={selected} onChange={setSelected} />
<ComboboxCustom options={items} value={values} onChange={setValues} multiple />
<SelectList data={items} selectedId={id} onSelect={setItem} height={300} />
<Select options={options} value={selected} onChange={setSelected} searchable locale="en-US" />
<Slider defaultValue={[50]} max={100} step={1} showTooltip locale="en-US" />
<Switch label="Notifications" />
<Switch label="Modo escuro" variant="success" />
<InputEmail placeholder="email@example.com" />
<InputPassword placeholder="Senha" />
<SearchBar onSearch={(term) => router.push(`/search?q=${term}`)} />
<SearchCombo value={query} onChange={setQuery} options={results} onSearch={fetchResults} voice />

<DatePicker date={date} onSelect={setDate} locale="en-US" />
<FileUpload maxSizeMB={10} onUpload={handleUpload} locale="en-US" />
<MultiSelect options={options} value={selected} onChange={setSelected} maxCount={3} locale="en-US" />
```

#### 🧭 Navigation

| Component          | Description                                                                                                                                                                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Accordion** (ds) | Extended accordion with icon style variants (chevron/plus/arrow/sign), size variants, rounded/bordered CVA, discriminated single/multiple types with collapsible control, i18n aria-labels, skeleton loading, and nested accordion support. |
| **Tabs**           | Declarative tabs component with 4 variants, 3 sizes, icons, badges, activation mode (automatic/manual), loading skeletons and responsive fallback to Accordion on mobile.                                                                   |
| **FooterMenu**     | Responsive footer — columns on desktop, accordion on mobile, uppercase support.                                                                                                                                                             |
| **ScrollToTop**    | Floating button with scroll progress ring, directional visibility (appears when scrolling up) and i18n support.                                                                                                                             |
| **NavDots**        | Section navigation via dots with automatic scroll tracking and tooltips.                                                                                                                                                                    |
| **NavUser**        | User profile menu for headers, built on DropdownMenu and Avatar.                                                                                                                                                                            |
| **Pagination**     | Semantic pagination with `locale` prop for labels "Previous"/"Next" in pt-BR e `rounded` variant (`full`/`light`/`none`).                                                                                                                   |
| **StepProgress**   | Visual guide for multi-step processes with numbered circle, optional icon, animated connector and horizontal/vertical orientations.                                                                                                         |

```tsx
import { Accordion } from "@/components/ds/accordion"
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
    { value: "security", label: "Security", icon: Lock, content: <SecurityForm /> },
  ]}
  variant="pill"
/>
<StepProgress steps={steps} currentStep={1} />

<Accordion
  type="single"
  collapsible
  items={[
    { value: "config", trigger: "Settings", children: <div>Content...</div> },
    { value: "prefs", trigger: "Preferences", children: <div>Content...</div> },
  ]}
  iconVariant="chevron"
  locale="en-US"
/>
```

## 🎨 Theming

### 🎭 Colors

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

### ⚠️ Risk tokens

```css
:root {
  --risk-1: oklch(0.62 0.19 28); /* Highest risk */
  --risk-2: oklch(0.72 0.17 50);
  --risk-3: oklch(0.85 0.18 85);
  --risk-4: oklch(0.92 0.15 105); /* Lowest risk */
  --success: oklch(0.72 0.16 155); /* Positive */
  --warning: oklch(0.78 0.14 75); /* Attention */
  --highlight-violet: oklch(0.68 0.18 295);
  --highlight-sky: oklch(0.72 0.12 225);
  --highlight-white: oklch(0.92 0.01 80);
}
```

### 🔤 Typography

- **Sans**: Inter (variable `--font-sans`)
- **Mono**: Geist Mono (variable `--font-mono`)

### 📏 Border Radius

| Token         | Calculation    |
| ------------- | -------------- |
| `--radius-sm` | `radius * 0.6` |
| `--radius-md` | `radius * 0.8` |
| `--radius-lg` | `radius`       |
| `--radius-xl` | `radius * 1.4` |

## 📜 Scripts

```bash
make dev              # Start local Storybook server (port 6006)
make build            # Production build
make start            # Production server
make lint             # ESLint + typecheck + Prettier check
make format           # Prettier
make build-storybook  # Static Storybook build
make test             # Vitest (>1000 testes em 160+ arquivos)
make coverage         # Coverage with Vitest
make registry         # Rebuild public/r/*.json (shadcn build — 374 items)
npm run registry:sync   # Derive missing registryDependencies/dependencies from source imports (updates registry.json)
npm run registry:check  # Validate registry.json vs. files on disk and vs. source imports (namespace, deps, cycles)
make shadcn-update    # Update all shadcn primitives to latest version
make clean            # Clean artifacts
```

## 🚢 Release & Deploy

The project uses a **GitFlow** workflow with automated versioning via [release-please](https://github.com/googleapis/release-please) and continuous deploy to Kubernetes via ArgoCD.

### 🌿 Branches

| Branch    | Purpose                                                           |
| :-------- | :---------------------------------------------------------------- |
| `develop` | Integration branch — every feature/fix PR goes here               |
| `main`    | Release branch — receives merge from `develop` when ready to ship |

### 🔄 Full flow

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

### 🔍 CI

Triggers **only on PR against `develop`** — the only stage where new code is introduced. PRs `develop → main` and release-please PRs **do not run CI** (they are promotion and version bump, respectively — same already validated code). **Sequential** pipeline with fail-fast (3 jobs chained via `needs:`) on self-hosted runner:

```
lint → test → build
```

| Job | Nome       | Command                                        |
| --- | ---------- | ---------------------------------------------- |
| 1º  | `🕵️‍♂️ Lint`  | `npm run format:check` + `npm run lint`        |
| 2º  | `🧪 Test`  | `npm run test` (vitest browser mode, Chromium) |
| 3º  | `📦 Build` | `npm run build-storybook`                      |

PRs do release-please are **explicitly ignored** in the `lint` job via `if: ${{ !startsWith(github.head_ref, 'release-please--') }}`.

Older runs on the same PR are automatically canceled via `concurrency`. Installation uses `npm ci --legacy-peer-deps` with cache (composite action in `.github/actions/setup-node-deps`).

**Why CI runs only once per release cycle:** the invariant is "if `develop` is green, `main` is green". Branch protection on `develop` requires a PR before merge → all code entering `develop` has been validated. `develop → main` is promotion without new code. The release-please PR only changes `package.json`, `CHANGELOG.md` and `.release-please-manifest.json` — none of these affect build/lint/test. Result: 1 CI run per real change, not 4.

> ⚠️ **Branch protection is required** em `develop` e `main`. As CI does not trigger on `push`, direct push bypasses validation. Configure in **Settings → Branches**: require PR + up-to-date branch before merge. Currently **no branch requires status checks** (`contexts: []`) — consider adding `🕵️‍♂️ Lint`, `🧪 Test` and `📦 Build` as required checks on `develop`.

### 🤖 AI Review

Dispara **apenas em PR contra `develop`** (mesmo escopo do CI). Pula PRs do Dependabot e do `github-actions[bot]`. O fluxo:

1. Generates the PR diff, commit history and contents of changed `.ts`/`.tsx` files
2. Monta um prompt com as skills do design system (`.agents/skills/shadcn/SKILL.md` + `.agents/skills/design-system/SKILL.md`)
3. Runs the review via `opencode` with free models in rotation (automatic fallback between models)
4. Posts the result as a PR comment with sections: **Summary**, **Issues found** and **Skill Checklist**

release-please PRs never trigger this workflow — they target `main`, not `develop`.

### ⚙️ Release automatizada

Dispara em **push para `main`**. O bot do release-please:

1. Reads commits since the last tag and calculates the next version (rules [Conventional Commits](https://www.conventionalcommits.org))
2. Abre/atualiza um PR `chore(release): vX.Y.Z` contendo:
   - Bump em `package.json`
   - `CHANGELOG.md` generated with sections by type (✨ Features, 🐛 Bug Fixes, etc.)
   - Bump em `.release-please-manifest.json`
3. When the PR is merged → creates the `vX.Y.Z` tag + GitHub Release automatically

**Versioning state** (do not edit manually):

- `.release-please-manifest.json` — current version tracked by the bot
- `package.json` `version` — sobrescrito pelo bot em cada release
- `release-please-config.json` — CHANGELOG sections configuration

### 🚀 CD

Dispara em **`release: published`** (criada pelo release-please). O fluxo:

1. **Build Docker** — multi-stage image with Nginx serving the static Storybook. Before `docker build`, `jq` injects the tag version into `public/r/registry.json` (manifest consumed by downstream projects via shadcn).
2. **Push para GHCR** — duas tags: `:latest` e `:vX.Y.Z`.
3. **Update argocd-apps** — atualiza a tag da imagem nos overlays `prod` e `dev` do repo [lema-ufpb/argocd-apps](https://github.com/lema-ufpb/argocd-apps):
   - Creates the overlay + `kustomization.yml` from scratch if it doesn't exist
   - If the image already exists in `images:`, uses `kustomize edit set image`
   - If the image **does not** exist, adds it via `awk` (first release)
   - If it is already on the correct tag, does `git commit --allow-empty` to force reconciliation in ArgoCD
4. ArgoCD sincroniza e aplica no cluster.

> 🔒 **Quality guarantee**: the tag only originates from a release-please PR merged into `main`. As CI validated the code on `develop` and branch protection requires PR + up-to-date branch, every commit that becomes a tag has already passed the pipeline. There is no additional gate in CD — trust comes from the upstream flow.

### 🏷️ Version mechanics

The version shown in the Storybook documentation is injected at build time via `git describe --tags --abbrev=0` in `.storybook/main.ts`. The flow is:

```
git tag vX.Y.Z  ──▶  __APP_VERSION__ (Vite define)  ──▶  lib/version.ts  ──▶  app/Introduction.mdx
```

For local builds (without tag), the displayed version is `0.0.0`.

### 🚑 Recovery

Caminho default (90% dos casos): **roll-forward**.

- **Open fix PR against `develop`** → merge into `main`. release-please automatically updates the next release PR (or opens a new one). Merging that PR → new patch tag (`vX.Y.Z+1`) cleanly created. **Zero `git tag -d` CMDS**.

> 💡 The `update-argocd` step is resilient: it creates overlays from scratch, adds the image if missing, and uses `git commit --allow-empty` when already on the correct tag. Even if CD partially fails, the fix is always roll-forward.

For less common scenarios (wrong version calculated, accidental release, urgent rollback in prod, inconsistent manifest, branch protection blocking), see **[`.github/RELEASE_RUNBOOK.md`](.github/RELEASE_RUNBOOK.md)** — detailed runbook with ready-to-use commands for each situation.

## 🤝 Contributing

### ⚙️ Setup

1. Fork the repository
2. Clone and install: `git clone ... && cd design-system && npm install --legacy-peer-deps`
3. Create a branch from `develop`: `git checkout develop && git checkout -b feature/my-feature`

### 📝 Conventional Commits

For release-please to correctly calculate the next version and generate `CHANGELOG.md`, **all commits must follow [Conventional Commits](https://www.conventionalcommits.org)**:

| Prefixo                                  | Bump (pre-1.0)                       | Aparece no CHANGELOG |
| :--------------------------------------- | :----------------------------------- | :------------------- |
| `feat:`                                  | minor (`0.X.0`)                      | ✨ Features          |
| `fix:`                                   | patch (`0.0.X`)                      | 🐛 Bug Fixes         |
| `perf:`                                  | patch                                | ⚡ Performance       |
| `refactor:`                              | patch                                | ♻️ Refactor          |
| `docs:`                                  | patch                                | 📚 Documentation     |
| `revert:`                                | patch                                | ⏪ Reverts           |
| `feat!:` / `BREAKING CHANGE:`            | minor (pre-1.0 does not bump to 1.0) | 💥 Breaking          |
| `chore:` `style:` `test:` `build:` `ci:` | — (no bump)                          | hidden               |

**Examples:**

```bash
git commit -m "feat(dashbox): add fullscreen toggle"
git commit -m "fix(progress-bar): correct color on intent='warning'"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(card-stats)!: rename CardStat to CardStatBase"  # breaking
```

### 🔀 Pull Request

1. Push your branch: `git push origin feature/my-feature`
2. Open PR against `develop` — CI triggers automatically
3. After approval and merge into `develop`, eventually a PR `develop → main` aggregates features ready for release
4. Merge into `main` → the release-please bot opens `chore(release): vX.Y.Z` → review → merge → automatic deploy

## 📄 License

MIT License - © 2026 LEMA/UFPB

See [LICENSE](./LICENSE) for details.

## 📬 Contact

Laboratory of Economics and Applied Modeling at the
Federal University of Paraíba
https://lema.ufpb.br
