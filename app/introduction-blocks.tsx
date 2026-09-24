"use client"

import * as React from "react"
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Building2,
  Check,
  Clapperboard,
  Code2,
  Compass,
  Copy,
  Download,
  FileText,
  Footprints,
  Globe,
  Grid2x2,
  HelpCircle,
  Images,
  Info,
  KeyRound,
  Layers,
  LayoutDashboard,
  LayoutPanelLeft,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquare,
  MousePointerClick,
  Navigation,
  Newspaper,
  PackageCheck,
  Palette,
  PanelBottom,
  PanelTop,
  Plug,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Table2,
  Tag,
  Terminal,
  TrendingUp,
  Type,
  Users,
  Wand2,
  Wrench,
  Activity,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { VERSION } from "../lib/version"

// ── Shared building blocks ──

const docsHref = (id: string) => `/?path=/docs/${id}--docs`

function Section({
  id,
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-8 flex-col gap-10">
      <header className="flex max-w-2xl flex-col gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          <Icon className="size-4 text-highlight-violet" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground">
          {title}
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </header>
      {children}
    </section>
  )
}

function Card({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-6 text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

export function IntroPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-28 py-12 text-foreground">
      {children}
    </div>
  )
}

// ── Hero ──

const STATS = [
  { value: "378", label: "registry items" },
  { value: "311", label: "ds-* components" },
  { value: "61", label: "shadcn primitives" },
  { value: "4", label: "languages" },
  { value: "1k+", label: "automated tests" },
]

function HeroPreview() {
  const [enabled, setEnabled] = React.useState(true)
  return (
    <div className="relative">
      <div
        className="absolute -top-6 -right-6 size-48 rounded-full bg-highlight-violet/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-6 -left-6 size-48 rounded-full bg-highlight-sky/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-5 rounded-3xl border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Monthly revenue
            </span>
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              R$ 128.430
            </span>
          </div>
          <Badge variant="secondary" className="text-success">
            +20,1%
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Quarterly goal</span>
            <span className="font-semibold tabular-nums">72%</span>
          </div>
          <Progress value={72} />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border bg-muted/50 px-4 py-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Weekly digest</span>
            <span className="text-xs text-muted-foreground">
              Send every Monday at 08:00
            </span>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Weekly digest"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Save changes</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <span className="ml-auto text-xs text-muted-foreground">
            Real components, live.
          </span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative overflow-hidden rounded-3xl border bg-linear-to-b from-highlight-violet/10 via-background to-background">
        <div className="grid items-center gap-14 p-8 sm:p-12 lg:grid-cols-5 lg:p-14">
          <div className="flex flex-col items-start gap-8 lg:col-span-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <span className="size-1.5 rounded-full bg-success" />v{VERSION}{" "}
                · Stable
              </Badge>
              <Badge variant="outline">MIT · LEMA/UFPB</Badge>
              <Badge variant="outline" asChild>
                <a
                  href="https://github.com/lema-ufpb/lema-design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Badge>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
                Design decisions,{" "}
                <span className="text-highlight-violet">
                  distilled into code.
                </span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  LEMA-DS
                </strong>{" "}
                is the official design system of LEMA/UFPB: 378 registry items,
                accessible and themeable, built on shadcn/ui, Radix and Tailwind
                v4. It runs on Next.js, Vite, React Router, TanStack Start and
                Astro. Install only what you need.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="whitespace-nowrap">
                <a href={docsHref("data-display-datatable")} target="_top">
                  Browse components
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="whitespace-nowrap"
              >
                <a href="#install">
                  <Terminal data-icon="inline-start" />
                  Install a component
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <HeroPreview />
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 bg-card px-6 py-6 first:col-span-2 sm:first:col-span-1"
          >
            <dt className="order-2 text-xs font-medium text-muted-foreground">
              {s.label}
            </dt>
            <dd className="order-1 text-3xl font-semibold tracking-tight tabular-nums">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// ── Architecture ──

const LAYERS = [
  {
    icon: Palette,
    tag: "Foundation",
    title: "Tokens and i18n",
    path: "app/globals.css · lib/",
    desc: "Semantic colors (success, risk-1…4, chart-1…5, highlight-*), radius scale and a 4-locale dictionary. One locale prop, zero config.",
    tone: "bg-highlight-violet/10 text-highlight-violet",
  },
  {
    icon: Layers,
    tag: "Primitives",
    title: "61 shadcn/ui atoms",
    path: "components/ui/",
    desc: "Button, Dialog, Table, Bubble… Radix-backed and never edited by hand. Updated only through the shadcn CLI.",
    tone: "bg-highlight-sky/10 text-highlight-sky",
  },
  {
    icon: Sparkles,
    tag: "Compositions",
    title: "311 ds-* components",
    path: "components/ds/",
    desc: "Single-file CVA, Skeleton loading, locale-aware. Installed as components/ui/ds-*.tsx through @lema-ds/*.",
    tone: "bg-success/10 text-success",
  },
]

export function Architecture() {
  return (
    <Section
      icon={Layers}
      eyebrow="Architecture"
      title="Three layers, from token to page"
      description="Each layer only depends on the one below it, so you can adopt the system a piece at a time."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {LAYERS.map((l) => (
          <Card key={l.tag} className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  l.tone
                )}
              >
                <l.icon className="size-5" aria-hidden="true" />
              </span>
              <Badge variant="outline">{l.tag}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold tracking-tight">
                {l.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {l.desc}
              </p>
            </div>
            <span className="mt-auto border-t pt-4 text-xs font-medium text-muted-foreground">
              {l.path}
            </span>
          </Card>
        ))}
      </div>
    </Section>
  )
}

// ── Install ──

const MANAGERS = [
  { id: "npm", cmd: "npx shadcn@latest add ds-card-stat" },
  { id: "pnpm", cmd: "pnpm dlx shadcn@latest add ds-card-stat" },
  { id: "yarn", cmd: "yarn dlx shadcn@latest add ds-card-stat" },
  { id: "bun", cmd: "bunx --bun shadcn@latest add ds-card-stat" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={copy}
      className="whitespace-nowrap"
    >
      {copied ? (
        <Check data-icon="inline-start" />
      ) : (
        <Copy data-icon="inline-start" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

const INSTALL_POINTS = [
  "Single file per component — no bundle bloat",
  "CVA variants with typed defaultVariants",
  "Skeleton, empty and a11y states built in",
  "lib/ui-i18n.ts is installed when a component needs it",
]

export function Install() {
  const [active, setActive] = React.useState(MANAGERS[0].id)
  const current = MANAGERS.find((m) => m.id === active) ?? MANAGERS[0]
  return (
    <Section
      id="install"
      icon={Download}
      eyebrow="Install"
      title="One registry, one command"
      description="Add the @lema-ds registry once, then pull in exactly the components you use. Files land in components/ui/ with a ds- prefix, so they never collide with primitives."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col overflow-hidden rounded-2xl border bg-card lg:col-span-3">
          <div
            role="tablist"
            aria-label="Package manager"
            className="flex items-center gap-1 border-b bg-muted/40 p-2"
          >
            {MANAGERS.map((m) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                aria-selected={m.id === active}
                onClick={() => setActive(m.id)}
                className={cn(
                  "h-8 rounded-lg px-3 text-xs font-medium whitespace-nowrap transition-colors",
                  m.id === active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m.id}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6 p-6">
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-muted/50 px-4 py-3">
              <code className="overflow-x-auto text-sm font-medium whitespace-nowrap">
                <span className="text-muted-foreground">$ </span>
                {current.cmd}
              </code>
              <CopyButton text={current.cmd} />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              First time? Register the namespace first:{" "}
              <code className="mt-2 inline-block max-w-full overflow-x-auto rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                npx shadcn@latest registry add @lema-ds
              </code>
              .
            </p>
          </div>
        </div>

        <Card className="flex flex-col gap-5 lg:col-span-2">
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            What you get
          </span>
          <ul className="flex flex-col gap-4">
            {INSTALL_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-6">
                <Check
                  className="mt-1 size-4 shrink-0 text-success"
                  aria-hidden="true"
                />
                {p}
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant="outline"
            className="mt-auto w-fit whitespace-nowrap"
          >
            <a
              href="https://ds.lema.ufpb.br/r/ds-button.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              View registry JSON
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </Card>
      </div>
    </Section>
  )
}

// ── Frameworks ──

const FRAMEWORKS: {
  name: string
  status: "verified" | "unsupported"
  how: string
}[] = [
  {
    name: "Next.js",
    status: "verified",
    how: "Pass next/link to DSLinkProvider for client-side navigation.",
  },
  {
    name: "Vite",
    status: "verified",
    how: "Nothing to configure. Links render as plain anchors.",
  },
  {
    name: "React Router",
    status: "verified",
    how: "Pass your Link to DSLinkProvider, mapping href to to.",
  },
  {
    name: "TanStack Start",
    status: "verified",
    how: "Same pattern, with Link from @tanstack/react-router.",
  },
  {
    name: "Astro",
    status: "verified",
    how: "React islands. Add client:load to interactive components.",
  },
  {
    name: "Vue · Svelte · Angular",
    status: "unsupported",
    how: "The components are React, so they need a React host.",
  },
]

export function Frameworks() {
  return (
    <Section
      id="frameworks"
      icon={Plug}
      eyebrow="Compatibility"
      title="Built for React, not for one framework"
      description="Components never import next/*. Links go through DSLinkProvider, client-only rendering through ClientOnly, and semantic colors through the tokens item, so the same files install anywhere React 19 and Tailwind v4 run."
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMEWORKS.map((f) => (
            <Card key={f.name} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-semibold tracking-tight">
                  {f.name}
                </span>
                <Badge
                  variant={f.status === "verified" ? "secondary" : "outline"}
                  className={cn(
                    "whitespace-nowrap",
                    f.status === "verified" && "text-success"
                  )}
                >
                  {f.status === "verified" ? "Verified" : "Not supported"}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{f.how}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              How “verified” is measured
            </span>
            <p className="text-sm leading-6 text-muted-foreground">
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                npm run test:consumers
              </code>{" "}
              creates a fresh app per framework with{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                shadcn init --base radix
              </code>
              , installs eight registry items, then runs the type-check and the
              production build. It does not replace testing in a real browser.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Wire up your router once
            </span>
            <code className="overflow-x-auto rounded-xl bg-muted px-4 py-3 text-sm font-medium whitespace-nowrap">
              {"<DSLinkProvider link={Link}>{children}</DSLinkProvider>"}
            </code>
            <p className="text-sm leading-6 text-muted-foreground">
              Header and footer components use it for every link. Without a
              provider they render a plain{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                &lt;a&gt;
              </code>
              . Requires{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                shadcn init --base radix
              </code>
              .
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

// ── Categories ──

const CATEGORIES: {
  href: string
  icon: LucideIcon
  label: string
  desc: string
  count: number
}[] = [
  {
    href: "about-aboutmanifestohero",
    icon: BookOpen,
    label: "About",
    desc: "Manifesto, milestones, mission and values.",
    count: 9,
  },
  {
    href: "actions-button",
    icon: MousePointerClick,
    label: "Actions",
    desc: "Buttons and interface actions, from simple to iconic.",
    count: 10,
  },
  {
    href: "auth-loginform",
    icon: KeyRound,
    label: "Auth",
    desc: "Login, sign-up, password recovery and magic link.",
    count: 9,
  },
  {
    href: "bento-bentogrid",
    icon: Grid2x2,
    label: "Bento",
    desc: "Bento-style feature highlight grids.",
    count: 5,
  },
  {
    href: "blog-bloggrid",
    icon: Newspaper,
    label: "Blog",
    desc: "Cards, lists and blog post metadata.",
    count: 6,
  },
  {
    href: "cta-cta",
    icon: Megaphone,
    label: "CTA",
    desc: "Calls to action — centered, split or with newsletter.",
    count: 4,
  },
  {
    href: "chat-aichat",
    icon: MessageSquare,
    label: "Chat",
    desc: "AI conversation interface, ready to use.",
    count: 1,
  },
  {
    href: "commerce-checkout",
    icon: ShoppingCart,
    label: "Commerce",
    desc: "Checkout, credit card and product card.",
    count: 3,
  },
  {
    href: "contact-contactform",
    icon: Mail,
    label: "Contact",
    desc: "Institutional contact forms and sections.",
    count: 4,
  },
  {
    href: "dashboard-billing",
    icon: LayoutDashboard,
    label: "Dashboard",
    desc: "Internal widgets: kanban, calendar, billing, notifications.",
    count: 8,
  },
  {
    href: "data-display-datatable",
    icon: Table2,
    label: "Data Display",
    desc: "Tables, charts, stat cards, virtualized lists and more.",
    count: 68,
  },
  {
    href: "effects-tiltcard",
    icon: Wand2,
    label: "Effects",
    desc: "Tilt 3D, spotlight, tracing beam, particles, meteors.",
    count: 11,
  },
  {
    href: "faq-faqs",
    icon: HelpCircle,
    label: "FAQ",
    desc: "Frequently asked questions, with or without tabs.",
    count: 3,
  },
  {
    href: "feedback-pageloader",
    icon: Info,
    label: "Feedback",
    desc: "Loaders, progress, alerts, confetti and empty states.",
    count: 18,
  },
  {
    href: "footer-footermega",
    icon: PanelBottom,
    label: "Footer",
    desc: "Footers — from simple to complete, with newsletter.",
    count: 8,
  },
  {
    href: "form-input",
    icon: ListChecks,
    label: "Forms",
    desc: "Inputs, file upload, multi-select, cron, signature…",
    count: 34,
  },
  {
    href: "charts-funnelchart",
    icon: BarChart2,
    label: "Charts",
    desc: "Funnel, Waterfall, Sankey and Bullet — advanced viz.",
    count: 4,
  },
  {
    href: "gallery-imagegallery",
    icon: Images,
    label: "Gallery",
    desc: "Image and video galleries, with or without filters.",
    count: 5,
  },
  {
    href: "header-headermega",
    icon: PanelTop,
    label: "Header",
    desc: "Headers — from simple to mega menu.",
    count: 15,
  },
  {
    href: "hero-herosection",
    icon: Rocket,
    label: "Hero",
    desc: "Opening sections for product pages.",
    count: 10,
  },
  {
    href: "integrations-integrations",
    icon: Plug,
    label: "Integrations",
    desc: "Integration and partner showcases.",
    count: 3,
  },
  {
    href: "layout-dashboard",
    icon: LayoutPanelLeft,
    label: "Layout",
    desc: "Containers, drawers, modals and the dashboard skeleton.",
    count: 10,
  },
  {
    href: "logocloud-logocloudglow",
    icon: Building2,
    label: "LogoCloud",
    desc: "Customer and partner logo clouds.",
    count: 4,
  },
  {
    href: "marketing-howitworks",
    icon: TrendingUp,
    label: "Marketing",
    desc: "Process explainer sections, 'how it works' style.",
    count: 2,
  },
  {
    href: "media-screenshot",
    icon: Clapperboard,
    label: "Media",
    desc: "Screenshot, mockup, audio player, file preview.",
    count: 8,
  },
  {
    href: "navigation-tabs",
    icon: Navigation,
    label: "Navigation",
    desc: "Tabs, pagination, breadcrumbs and sidebar nav.",
    count: 25,
  },
  {
    href: "onboarding-wizard",
    icon: Footprints,
    label: "Onboarding",
    desc: "Wizards, steppers and guided first-use flows.",
    count: 4,
  },
  {
    href: "pricing-pricinggrid",
    icon: Tag,
    label: "Pricing",
    desc: "Plans and price comparison.",
    count: 3,
  },
  {
    href: "stats-stats",
    icon: Activity,
    label: "Stats",
    desc: "Featured stat grids.",
    count: 2,
  },
  {
    href: "team-teamgrid",
    icon: Users,
    label: "Team",
    desc: "Team presentation cards and grids.",
    count: 2,
  },
  {
    href: "testimonials-testimonials",
    icon: Quote,
    label: "Testimonials",
    desc: "Customer and user testimonials.",
    count: 2,
  },
  {
    href: "utilities-glow",
    icon: Wrench,
    label: "Utilities",
    desc: "Fade, glass and glow — plus LocaleProvider.",
    count: 4,
  },
  {
    href: "delight-magneticelement",
    icon: Sparkles,
    label: "Delight",
    desc: "Playful micro-interactions — magnetic, scramble.",
    count: 3,
  },
  {
    href: "saas-pricingcalculator",
    icon: Tag,
    label: "SaaS",
    desc: "Interactive price calculator for SaaS plans.",
    count: 1,
  },
]

export function Categories() {
  const [query, setQuery] = React.useState("")
  const q = query.trim().toLowerCase()
  const items = CATEGORIES.filter(
    (c) =>
      !q ||
      c.label.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
  )
  return (
    <Section
      icon={Grid2x2}
      eyebrow="Explore"
      title="Browse by use case"
      description="Every card opens the first component of its category. The full list lives in the Storybook sidebar."
    >
      <div className="flex flex-col gap-6">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter categories…"
            aria-label="Filter categories"
            className="pl-9"
          />
        </div>

        {items.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="text-sm font-medium">
              No category matches “{query}”
            </span>
            <span className="text-sm text-muted-foreground">
              Try a broader term, like “form” or “chart”.
            </span>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <a
                key={c.label}
                href={docsHref(c.href)}
                target="_top"
                className="group flex flex-col gap-4 rounded-2xl border bg-card p-5 text-card-foreground no-underline transition-colors hover:border-foreground/30 hover:bg-accent/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/50 text-muted-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <c.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="truncate text-base font-semibold tracking-tight">
                    {c.label}
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-auto whitespace-nowrap tabular-nums"
                  >
                    {c.count} {c.count === 1 ? "item" : "items"}
                  </Badge>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {c.desc}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium whitespace-nowrap text-muted-foreground group-hover:text-foreground">
                  Explore
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

// ── Features ──

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Accessible by default",
    desc: "WAI-ARIA, keyboard navigation, prefers-reduced-motion and axe checks in Vitest. WCAG 2.1 AA is a constraint, not a checklist.",
  },
  {
    icon: Palette,
    title: "Semantic tokens",
    desc: "bg-success, bg-risk-1…4 and --chart-1…5 instead of raw hex. Light, dark and system themes with no dark: overrides.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    desc: "Container queries, SidebarProvider and responsive fallbacks, like Tabs turning into Accordion on small screens.",
  },
  {
    icon: Code2,
    title: "100% TypeScript",
    desc: "CVA with defaultVariants and VariantProps. Every variant is typed and every prop is documented in Storybook.",
  },
  {
    icon: FileText,
    title: "Spec-first",
    desc: "370 specs in docs/specs/ define API, tokens, a11y and stories before code. The spec is the source of truth.",
  },
  {
    icon: PackageCheck,
    title: "Registry-ready",
    desc: "Namespaced @lema-ds/* dependencies, checked by registry:check, so one install works in a fresh project.",
  },
]

export function Features() {
  return (
    <Section
      icon={Sparkles}
      eyebrow="Principles"
      title="Opinionated defaults you can trust"
      description="Decisions made once, enforced by lint and tests, so you don't argue about them in every pull request."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} className="flex flex-col gap-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
              <f.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold tracking-tight">
              {f.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

// ── i18n ──

const LOCALES = [
  { code: "en-US", name: "English", flag: "🇺🇸", def: true },
  { code: "pt-BR", name: "Português", flag: "🇧🇷", def: false },
  { code: "es-ES", name: "Español", flag: "🇪🇸", def: false },
  { code: "fr-FR", name: "Français", flag: "🇫🇷", def: false },
]

export function I18n() {
  return (
    <Section
      icon={Globe}
      eyebrow="Internationalization"
      title="Four languages, one prop"
      description="Pass locale to a single component, or wrap your app in UILocaleProvider. Resolution order: prop, then provider, then en-US."
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {LOCALES.map((l) => (
            <div
              key={l.code}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-5",
                l.def
                  ? "border-foreground bg-foreground text-background"
                  : "bg-card"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl leading-none">{l.flag}</span>
                {l.def && (
                  <span className="rounded-full bg-background/15 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                    default
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-semibold">{l.name}</span>
                <span
                  className={cn(
                    "text-xs font-medium tracking-widest",
                    l.def ? "text-background/70" : "text-muted-foreground"
                  )}
                >
                  {l.code}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Per component
            </span>
            <code className="overflow-x-auto rounded-xl bg-muted px-4 py-3 text-sm font-medium whitespace-nowrap">
              {'<Dashbox title="Status" locale="pt-BR" status="live" />'}
            </code>
            <p className="text-sm leading-6 text-muted-foreground">
              The badge reads “Ao vivo” and the toolbar action reads
              “Atualizar”, with no extra setup.
            </p>
          </Card>
          <Card className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              App-wide
            </span>
            <code className="overflow-x-auto rounded-xl bg-muted px-4 py-3 text-sm font-medium whitespace-nowrap">
              {'<UILocaleProvider locale="pt-BR">'}
            </code>
            <p className="text-sm leading-6 text-muted-foreground">
              Spec:{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                docs/specs/ds-locale-provider.md
              </code>
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

// ── Typography ──

const TYPE_SCALE = [
  { cls: "text-xs", token: "text-xs · 12px", use: "Labels, captions, Badge" },
  { cls: "text-sm", token: "text-sm · 14px", use: "Body text, table cells" },
  { cls: "text-base", token: "text-base · 16px", use: "Card titles, emphasis" },
  { cls: "text-lg", token: "text-lg · 18px", use: "Section headings" },
]

export function Typography() {
  return (
    <Section
      icon={Type}
      eyebrow="Typography"
      title="One family: Inter"
      description="Sans-serif everywhere, code included. Weight carries hierarchy, and tabular-nums keeps figures aligned without a monospace face."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-2">
          <span className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Scale
          </span>
          {TYPE_SCALE.map((t) => (
            <div
              key={t.token}
              className="flex items-baseline justify-between gap-4 border-b py-3 last:border-b-0"
            >
              <span className={cn(t.cls, "font-medium")}>{t.use}</span>
              <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                {t.token}
              </span>
            </div>
          ))}
        </Card>
        <Card className="flex flex-col gap-2">
          <span className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Weight and numerals
          </span>
          {[
            ["font-normal", "Regular", "Body copy", "font-normal"],
            ["font-medium", "Medium", "Labels and names", "font-medium"],
            [
              "font-semibold",
              "Semibold",
              "Values and figures",
              "font-semibold",
            ],
          ].map(([cls, name, use, token]) => (
            <div
              key={cls}
              className="flex items-baseline justify-between gap-4 border-b py-3"
            >
              <span className={cn("text-sm", cls)}>
                {name} — {use}
              </span>
              <span className="text-xs whitespace-nowrap text-muted-foreground">
                {token}
              </span>
            </div>
          ))}
          <div className="mt-3 flex items-baseline justify-between gap-4 rounded-xl bg-muted px-4 py-3">
            <span className="text-lg font-semibold tabular-nums">
              1.234.567,89
            </span>
            <span className="text-xs text-muted-foreground">tabular-nums</span>
          </div>
        </Card>
      </div>
    </Section>
  )
}

// ── Get started ──

const STEPS = [
  {
    title: "Explore",
    desc: "Browse the sidebar. Each component has a playground, code snippets and full API docs.",
  },
  {
    title: "Install",
    desc: "Run npx shadcn add ds-<name>. The file lands ready in components/ui/, with no extra setup.",
  },
  {
    title: "Compose",
    desc: "Combine it with semantic tokens and shadcn primitives. Accessible, themeable and consistent from the start.",
  },
]

export function GetStarted() {
  return (
    <Section
      icon={Compass}
      eyebrow="Get started"
      title="Three steps, then you're composing"
      description="Start with a component that shows the system's range, then grow from there."
    >
      <div className="flex flex-col gap-10">
        <ol className="grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Card className="flex h-full flex-col gap-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background tabular-nums">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {s.desc}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-start gap-6 rounded-3xl border bg-linear-to-br from-highlight-violet/10 via-background to-highlight-sky/10 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-xl flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-tight">
              Ready to build with LEMA-DS?
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Good first picks: ds-card-stat, ds-data-table and ds-hero-layers.
            </p>
          </div>
          <Button asChild size="lg" className="whitespace-nowrap">
            <a href={docsHref("data-display-datatable")} target="_top">
              Open the component docs
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
