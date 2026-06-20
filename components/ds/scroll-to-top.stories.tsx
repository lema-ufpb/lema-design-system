import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { ScrollToTop } from "@/components/ds/scroll-to-top"

/**
 * A helper component used inside some stories to simulate a
 * scrollable page so the floating button can be tested visually.
 */
function TallContainer({ children }: { children: React.ReactNode }) {
  const id = React.useId()
  return (
    <div
      id={id}
      style={{
        position: "relative",
        height: "300vh",
        background: `
          linear-gradient(
            to bottom,
            var(--color-background) 0%,
            var(--color-muted) 50%,
            var(--color-background) 100%
          )
        `,
      }}
    >
      {/* Progress indicator */}
      <div
        style={{
          position: "sticky",
          top: 8,
          left: 8,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 12px",
          borderRadius: 999,
          fontSize: 12,
          fontFamily: "monospace",
          background: "var(--color-muted)",
          color: "var(--color-muted-foreground)",
          zIndex: 1,
        }}
      >
        Scroll down ⬇ then scroll up to reveal
      </div>

      {/* Centered marker halfway */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "var(--color-muted-foreground)",
          fontSize: 14,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>👋</div>
        <div>Halfway marker — keep scrolling!</div>
      </div>

      {/* Bottom marker */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "var(--color-muted-foreground)",
          fontSize: 14,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>🏁</div>
        <div>Bottom of page — now scroll up</div>
      </div>

      {children}
    </div>
  )
}

// ── Meta ──

const meta = {
  title: "Navigation/ScrollToTop",
  component: ScrollToTop,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "A floating button that reveals a **scroll‑progress ring** and lets the user jump back to the top of the page with one click.",
          "",
          "Smart visibility — the button appears only when scrolling **up** past a configurable threshold and hides when scrolling down, reducing visual noise.",
          "",
          "Built on `Tooltip` (shadcn) for the hover label, an animated SVG ring for the progress indicator, and `requestAnimationFrame` throttling for smooth 60fps scroll tracking.",
          "",
          "## Design Tokens",
          "",
          "| Element | Token | Purpose |",
          "|---------|-------|---------|",
          "| Button bg (outline) | `--secondary` / `--secondary-foreground` | Floating button default colors |",
          "| Button bg (fill) | `--primary` / `--primary-foreground` | Floating button filled variant |",
          "| Ring track | `text-muted/20` | Background track of progress ring |",
          "| Ring arc | `text-primary` (outline) / `text-primary-foreground/70` (fill) | Progress arc accent |",
          "| Shadow | `shadow-lg` → `shadow-xl` on hover | Lift on interaction |",
          "| Tooltip bg | `--foreground` / `--background` | Tooltip appearance |",
        ],
      },
    },
  },
} satisfies Meta<typeof ScrollToTop>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ──

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Reveals when scrolling up past 400px. Shows the progress ring.",
      },
    },
  },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const Fill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Filled variant with primary background and white icon — pops more against dark sections.",
      },
    },
  },
  args: { variant: "fill" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const WithoutRing: Story = {
  parameters: {
    docs: {
      description: {
        story: "Clean mode without the progress ring — just the arrow button.",
      },
    },
  },
  args: { showProgress: false },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const HighThreshold: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Only appears after scrolling past 1200px — useful for very long documents.",
      },
    },
  },
  args: { threshold: 1200 },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const LowThreshold: Story = {
  parameters: {
    docs: {
      description: {
        story: "Appears almost immediately — after just 50px of scroll.",
      },
    },
  },
  args: { threshold: 50 },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const TopLeft: Story = {
  name: "Position — Top Left",
  parameters: {
    docs: {
      description: {
        story:
          "Floats at the top‑left corner instead of the default bottom‑right.",
      },
    },
  },
  args: { position: "top-left" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const BottomLeft: Story = {
  name: "Position — Bottom Left",
  parameters: {
    docs: { description: { story: "Bottom‑left corner placement." } },
  },
  args: { position: "bottom-left" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const TopRight: Story = {
  name: "Position — Top Right",
  parameters: {
    docs: { description: { story: "Top‑right corner placement." } },
  },
  args: { position: "top-right" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton placeholder before the component hydrates or while data is loading.",
      },
    },
  },
  args: { loading: true },
}

export const LocalePTBR: Story = {
  name: "Locale — pt‑BR",
  parameters: {
    docs: {
      description: { story: "Tooltip and aria‑label in Brazilian Portuguese." },
    },
  },
  args: { locale: "pt-BR" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const LocaleES: Story = {
  name: "Locale — es‑ES",
  parameters: {
    docs: { description: { story: "Tooltip and aria‑label in Spanish." } },
  },
  args: { locale: "es-ES" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}

export const LocaleFR: Story = {
  name: "Locale — fr‑FR",
  parameters: {
    docs: { description: { story: "Tooltip and aria‑label in French." } },
  },
  args: { locale: "fr-FR" },
  decorators: [
    (StoryFn) => (
      <TallContainer>
        <StoryFn />
      </TallContainer>
    ),
  ],
}
