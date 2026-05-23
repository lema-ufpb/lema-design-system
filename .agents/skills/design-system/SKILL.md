# Design System — LEMA-DS

Skill for reviewing and implementing components in the LEMA design system. Extends and **inherits all rules from the `shadcn` skill** — every shadcn rule applies here. This skill adds the design system layer: typography, spacing, color semantics, sizing, CVA patterns, and component quality standards.

> When both skills apply, this skill's rules take precedence where they are more specific.

---

## Inherited Rules (shadcn skill)

All rules from the `shadcn` skill apply without exception:
- Semantic colors only — no raw Tailwind values for meaning.
- `gap-*` not `space-y-*` / `space-x-*`.
- `size-*` when width = height.
- `cn()` for conditional classes.
- `Skeleton` for loading states — no custom `animate-pulse`.
- `Badge` instead of custom styled spans.
- `Separator` instead of `<hr>` or `border-t` divs.
- `FieldGroup` + `Field` for form layout.
- `asChild` / `render` for custom triggers.
- No manual `z-index` on overlay components.

---

## Typography Scale

### Canonical scale

| Class       | px  | Use                                                     |
|-------------|-----|---------------------------------------------------------|
| `text-xs`   | 12  | Micro labels, captions, Badge text, tabular data labels, progress bar sm |
| `text-sm`   | 14  | Body text, table cells, Field labels, card descriptions, progress bar md |
| `text-base` | 16  | Primary card titles, emphasized content, progress bar lg |
| `text-lg`   | 18  | Section headings, emphasized page titles                |
| `text-xl`   | 20  | Page-level headings                                     |
| `text-2xl`+ | 24+ | Hero / display text only                               |

### Font weight semantics

| Weight         | Use                                                        |
|----------------|------------------------------------------------------------|
| `font-normal`  | Body copy, descriptions, help text                         |
| `font-medium`  | Labels, names, metadata, descriptive strings               |
| `font-semibold`| Numeric values, emphasized labels, stat figures            |
| `font-bold`    | Avoid — use only for major page headings, never in components |

**Rule:** A label and its associated value should differ in weight, not in size alone. A name label is `font-medium text-muted-foreground`; its numeric counterpart is `font-semibold text-foreground`.

### Component size variant scale (sm / md / lg)

All multi-size components follow this consistent mapping. Never deviate:

| Slot       | sm          | md          | lg           |
|------------|-------------|-------------|--------------|
| Label text | `text-xs`   | `text-sm`   | `text-base`  |
| Value text | `text-xs`   | `text-sm`   | `text-base`  |
| Icon       | `size-3.5`  | `size-4`    | `size-5`     |
| Track / bar height | `h-2` | `h-3`    | `h-4`        |
| Row height  | `h-7`      | `h-8`       | `h-9`        |

**Common violations:**
```tsx
// Wrong — scale one step too large
sm: "text-sm", md: "text-base", lg: "text-lg"

// Correct — aligned to shadcn's Badge/Label convention
sm: "text-xs", md: "text-sm", lg: "text-base"
```

---

## Spacing System (4 px grid)

Every spacing value must be a Tailwind step. Never use arbitrary values like `gap-[7px]` or `px-[13px]`.

| Token  | px  | Use                                                         |
|--------|-----|-------------------------------------------------------------|
| `1`    | 4   | Tightest internal spacing (icon–label, badge gap)           |
| `2`    | 8   | Label–value pairs, inline badge + text, row item gaps       |
| `3`    | 12  | Between form fields, list item rows                         |
| `4`    | 16  | Card section internal padding, between card rows            |
| `6`    | 24  | Card padding (`p-6`), between major layout blocks           |
| `8`    | 32  | Between page-level sections                                 |

### Layout padding by context

| Context         | Padding         |
|-----------------|-----------------|
| Compact chip/badge | `px-2 py-0.5` |
| Tight row cell  | `px-3 py-1`     |
| Standard item   | `px-4 py-2`     |
| Card content    | `p-4` or `p-6`  |
| Page container  | `px-6` or `px-8`|

---

## Color Semantics

### Standard semantic tokens (shadcn)

| Token                      | Use                                        |
|----------------------------|--------------------------------------------|
| `bg-background`            | Page and panel backgrounds                 |
| `bg-card`                  | Card surfaces                              |
| `bg-muted`                 | Disabled, empty-state, skeleton fills, progress track |
| `bg-primary`               | Primary action fills                       |
| `bg-secondary`             | Secondary surfaces, subtle fills           |
| `bg-accent`                | Hover states on interactive items          |
| `text-foreground`          | Primary text, values, headings             |
| `text-muted-foreground`    | Secondary text, labels, descriptions       |
| `text-primary-foreground`  | Text on `bg-primary`                       |
| `text-destructive`         | Error states, negative values              |
| `border`                   | Default borders, dividers                  |
| `border-input`             | Form control borders                       |

### Project-specific semantic tokens

This project extends shadcn with custom tokens. Use them instead of raw colors:

| Token                              | Use                                              |
|------------------------------------|--------------------------------------------------|
| `bg-success` / `text-success`      | Positive fills and text (green, hue ~155)         |
| `text-success-foreground`          | Text **on** `bg-success` backgrounds              |
| `bg-warning` / `text-warning`      | Caution fills and text (amber, hue ~75)           |
| `text-warning-foreground`          | Text **on** `bg-warning` backgrounds              |
| `text-destructive`                 | Errors, failures, critical values                 |
| `bg-risk-1`                        | Highest risk segment (orange-red, hue ~28)        |
| `bg-risk-2`                        | High risk segment (amber, hue ~50)                |
| `bg-risk-3`                        | Medium risk segment (yellow-green, hue ~85)       |
| `bg-risk-4`                        | Low risk segment (green-yellow, hue ~105)         |

**Rule:** Trend/delta indicators must use semantic tokens:
```tsx
// Wrong
<span className="text-emerald-600">+20.1%</span>
<span className="text-red-500">-3.2%</span>

// Correct
<span className="text-success">+20.1%</span>
<span className="text-destructive">-3.2%</span>
```

**Rule:** Status values must use `Badge` or semantic tokens — never raw utility colors:
```tsx
// Wrong
<span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs">Active</span>

// Correct
<Badge variant="secondary">Active</Badge>
```

### Dark mode

Never write `dark:` overrides manually. All semantic tokens handle dark mode via CSS variables. If a value looks wrong in dark mode, the root cause is using a raw color, not a token.

---

## Sizing Proportions

### Interactive element heights

Follow these heights for interactive elements so touch targets and visual rhythm are consistent:

| Size   | Height  | Example                    |
|--------|---------|----------------------------|
| xs     | `h-6`   | Compact badges, tiny chips |
| sm     | `h-8`   | Secondary buttons, compact inputs |
| md     | `h-9`   | Default inputs, buttons    |
| lg     | `h-10`  | Primary CTAs, large inputs |
| xl     | `h-12`  | Hero actions only          |

### Icon sizing rules

Icons must always match their container context. Never size icons independently of their component:

```tsx
// Wrong — explicit sizing overrides component intent
<TrendingUpIcon className="size-4 text-success" />

// Correct — component handles sizing; only color is needed
<TrendingUpIcon className="text-success" />

// Correct — in a standalone context where explicit sizing is needed
<TrendingUpIcon className="size-4" />  // use size-*, not w-4 h-4
```

For standalone icons without a component wrapper:

| Context      | Size      |
|--------------|-----------|
| Inline text (sm) | `size-3.5` |
| Inline text (base) | `size-4` |
| Card/section header | `size-5` |
| Page heading | `size-6`  |

### Border radius

Always use the design token scale — never hardcode `rounded-full` for rectangles or `rounded-none` unless the design requires it:

| Token          | CSS                          | Use                          |
|----------------|------------------------------|------------------------------|
| `rounded-sm`   | `calc(var(--radius) * 0.6)`  | Compact chips, tight items   |
| `rounded-md`   | `calc(var(--radius) * 0.8)`  | Badges, tags, small buttons  |
| `rounded-lg`   | `var(--radius)` (0.625rem)   | Cards, inputs, standard elements |
| `rounded-xl`   | `calc(var(--radius) * 1.4)`  | Cards with emphasis           |
| `rounded-2xl`  | `calc(var(--radius) * 1.8)`  | Modals, large panels          |
| `rounded-3xl`  | `calc(var(--radius) * 2.2)`  | Feature cards, hero containers|
| `rounded-4xl`  | `calc(var(--radius) * 2.6)`  | Display/marketing elements    |
| `rounded-full` | 9999px                       | Pills, avatars, circular items only |

---

## CVA Component Patterns

All custom components in `components/custom/` follow the single-file CVA pattern. These rules apply when creating or modifying them:

### File structure

```
// 1. "use client" if needed
// 2. imports
// 3. Types block (export type, export interface)
// 4. Variants block (export const *Variants = cva(...))
// 5. Internal helpers (const skeletonDims, formatValue, etc.)
// 6. Component (export function Component / React.forwardRef)
```

### Variant naming

```tsx
// Pattern: {componentName}{SlotName}Variants
export const progressBarContainerVariants = cva(...)
export const progressBarNameVariants = cva(...)
export const progressBarFillVariants = cva(...)
```

All variant functions must be exported — they are part of the public API used in Storybook and tests.

### CVA defaults

Every `cva` call with variants must declare `defaultVariants`:

```tsx
// Wrong — no defaultVariants
export const cardVariants = cva("...", {
  variants: { size: { sm: "...", md: "...", lg: "..." } }
})

// Correct
export const cardVariants = cva("...", {
  variants: { size: { sm: "...", md: "...", lg: "..." } },
  defaultVariants: { size: "md" }
})
```

### Size system integration

Multi-size components must derive all size-dependent values from a single `size` prop. Never split sizing across multiple props:

```tsx
// Wrong — size is duplicated/split
<ProgressBar textSize="sm" trackSize="h-2" />

// Correct — single size controls all proportions
<ProgressBar size="sm" />
```

### Loading states with Skeleton

Loading skeleton dimensions must match the real content they replace:

```tsx
// Wrong — generic skeleton that doesn't match content
{loading && <Skeleton className="h-4 w-full" />}

// Correct — skeleton matches actual rendered output dimensions
const skeletonDims = {
  sm: { label: "h-3 w-8", track: "h-2" },
  md: { label: "h-4 w-10", track: "h-3" },
  lg: { label: "h-5 w-12", track: "h-4" },
}
```

---

## Data Display Components

### Card statistics

Stats cards (from `card-stats.tsx`) follow this hierarchy:

```
CardHeader → title (text-sm font-medium text-muted-foreground)
CardContent → value (text-2xl font-semibold tabular-nums)
             trend  (text-sm font-medium, color from semantic token)
CardFooter → auxiliary info (text-xs text-muted-foreground)
```

Never flatten this structure into `CardContent` only.

### Tabular data

In data tables and list rows:

- Row height: `h-10` for standard, `h-8` for compact
- Cell text: `text-sm` for data, `text-xs font-medium text-muted-foreground` for column headers
- Numeric cells: always `tabular-nums` to prevent layout shift
- Long text cells: always `truncate` with a fixed `max-w-*`

```tsx
// Correct tabular cell patterns
<td className="text-sm tabular-nums">1.234.567</td>
<th className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Valor</th>
```

### Progress indicators

- Track background: always `bg-muted`
- Fill: `bg-primary` (default) or semantic intent (`bg-success`, `bg-destructive`)
- Never use raw Tailwind colors (`bg-emerald-500`) for fill — define a CSS variable if a new color is needed
- Label: `font-semibold tabular-nums` to prevent reflow as value changes

### Charts

Charts use the `--chart-1` through `--chart-5` tokens exclusively. Never hardcode chart series colors with raw values. Use the `Chart` wrapper from shadcn which handles the token mapping.

---

## Accessibility Rules

### Interactive custom elements

Non-button elements used as buttons must have:
```tsx
<div
  role="button"
  tabIndex={0}
  aria-label="Descriptive action name"
  onKeyDown={(e) => e.key === "Enter" && handler()}
>
```

### Progress elements

```tsx
<progress-element
  aria-valuenow={Math.round(value)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Descriptive name"
/>
```

### Visible labels

Every form control, progress bar, chart, and interactive data element must have either a visible label or `aria-label`. `aria-label="Progress"` is a fallback — prefer a descriptive name from props.

---

## Component Quality Checklist

When creating or modifying a custom component, verify:

- [ ] Type scale follows the `sm: text-xs / md: text-sm / lg: text-base` convention
- [ ] Font weights use `font-medium` for labels and `font-semibold` for values
- [ ] All colors use semantic tokens (no raw Tailwind color values for meaning)
- [ ] Custom semantic tokens (`success`, `warning`, `risk-*`) used where applicable
- [ ] Loading state uses `<Skeleton>` with dimensions matching real content
- [ ] CVA variants all have `defaultVariants` declared
- [ ] All variant functions exported
- [ ] Spacing uses Tailwind steps only (no arbitrary values)
- [ ] `size-*` used instead of `w-* h-*` where width = height
- [ ] `truncate` used for text that may overflow its container
- [ ] `tabular-nums` on numeric labels/values
- [ ] `aria-label` on progress bars, charts, and interactive elements
- [ ] `cn()` used for all conditional class merging
- [ ] No `dark:` manual overrides
- [ ] No `React.CSSProperties["..."]` indexed access in prop types — use concrete types (`string | number`, `string`) instead

---

## Common Violations in This Project

These patterns have appeared in code reviews — flag them:

| Violation | Rule |
|-----------|------|
| `text-sm/text-base/text-lg` in sm/md/lg slots | Type scale is one step too large — use `text-xs/text-sm/text-base` |
| `font-bold` on component labels | Use `font-medium` (labels) or `font-semibold` (values) |
| `animate-pulse` on custom divs | Use `<Skeleton>` from shadcn |
| `bg-emerald-500` or `text-emerald-600` | Use `bg-success` / `text-success` |
| `space-y-*` inside components | Use `flex flex-col gap-*` |
| `w-4 h-4` on icons | Use `size-4` |
| Inline `style={{ color: "oklch(...)" }}` for semantic states | Define a CSS variable and use a utility class |
| Missing `tabular-nums` on numeric values | Add it — prevents layout shift as numbers change |
| Skeleton height different from real content height | Skeleton must match real content dimensions |
| `React.CSSProperties["maxWidth"]` (or any indexed CSS property access) in props | Tailwind v4 augments `CSSProperties` and indexed access types produce IDE false positives — use concrete types: `string \| number` for layout props, `string` for color/display props |

---

## Creating a New Component — Spec-First Workflow

Follow these 4 steps in order. Never write implementation code before completing step 1.

### Step 1 — Fill the spec template

Copy `.agents/templates/component-spec.md` to `.agents/specs/[component-name].md` and fill every section:

- **Propósito** — what problem it solves, when to use vs. alternatives
- **API** — every prop with type, default, and description
- **Variantes CVA** — all variant dimensions with their allowed values and defaults
- **Tokens de design** — which CSS variables are used in which slots
- **Escala tipográfica** — sm/md/lg values for each text/height slot
- **Comportamentos** — loading, disabled, empty, error states
- **Acessibilidade** — ARIA roles, keyboard, i18n string keys
- **Stories obrigatórias** — minimum story list before the component ships

### Step 2 — Review the spec (before any code)

Validate against these gates before proceeding:

- Type scale follows `sm: text-xs / md: text-sm / lg: text-base`
- All colors use semantic tokens (no raw Tailwind for meaning)
- Loading state is `<Skeleton>` with matching dimensions
- Every text slot has `truncate` or a bounded width
- Every numeric slot has `tabular-nums`
- `aria-label` or visible label on all meaningful elements

If any gate fails, fix the spec — not the code.

### Step 3 — Implement

Follow the single-file CVA pattern (types → variants → helpers → component). Reference the filled spec during implementation — if code diverges from spec, update the spec first and justify the change.

### Step 4 — Verify

```bash
make test          # must still pass (567 tests)
```

Open Storybook and visually check each required story. The component is not done until:
- All required stories render without error
- `make test` passes
- All checklist items in the spec are checked off
