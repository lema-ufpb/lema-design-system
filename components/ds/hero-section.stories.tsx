import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  HeroSection,
  HeroHeader,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroMedia,
} from "./hero-section"
import { AnnouncementBadge } from "./announcement-badge"
import { TextRotator } from "./text-rotator"
import { BackgroundGlow } from "./background-glow"
import { BrowserMockup } from "./browser-mockup"
import { VideoDialog } from "./video-dialog"
import { WaitlistForm } from "./waitlist-form"
import { Marquee } from "./marquee"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Hero/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeroSection component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `align` | `"center" \| "left" \| "split"` | `"center"` | Variant |',
          '| `spacing` | `"compact" \| "default" \| "spacious"` | `"default"` | Variant |',
          '| `container` | `"default" \| "narrow" \| "wide" \| "full"` | `"default"` | Variant |',
          '| `size` | `"default" \| "large" \| "display"` | — | Variant |',
          '| `gradient` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["center", "left", "split"],
    },
    spacing: {
      control: "inline-radio",
      options: ["compact", "default", "spacious"],
    },
    container: {
      control: "select",
      options: ["default", "narrow", "wide", "full"],
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const CompleteCenteredHero: Story = {
  render: () => (
    <HeroSection align="center" spacing="default">
      <BackgroundGlow variant="aurora" tone="primary" />

      <HeroHeader>
        <AnnouncementBadge tag="New" ping variant="glow">
          LEMA Design System v2.0 available
        </AnnouncementBadge>
      </HeroHeader>

      <HeroTitle size="large" gradient>
        Build{" "}
        <TextRotator words={["elegant", "accessible", "fast", "consistent"]} />
        <br />
        interfaces for academic digital products
      </HeroTitle>

      <HeroDescription size="large">
        The definitive ecosystem of React 19, Tailwind CSS v4 and shadcn/ui
        components standardized by the Federal University of Paraíba.
      </HeroDescription>

      <HeroActions align="center">
        <WaitlistForm
          variant="pill"
          size="md"
          socialProof="Over 50 production-ready components."
        />
      </HeroActions>

      <HeroMedia>
        <BrowserMockup url="https://lema.ufpb.br/design-system" glow>
          <div className="flex h-72 flex-col items-center justify-center bg-card/60 p-8 text-center">
            <p className="text-lg font-semibold">Application Preview</p>
            <p className="mt-2 max-w-md text-xs text-muted-foreground">
              High-fidelity frame to showcase admin system screens, research
              dashboards and institutional portals.
            </p>
          </div>
        </BrowserMockup>
      </HeroMedia>
    </HeroSection>
  ),
}

export const SplitHeroWithVideo: Story = {
  render: () => (
    <HeroSection align="split" spacing="spacious">
      <BackgroundGlow variant="spotlight" tone="violet" />

      <div className="flex flex-col gap-6">
        <HeroHeader className="justify-start">
          <AnnouncementBadge tag="Demo" variant="outline">
            Interactive demo video
          </AnnouncementBadge>
        </HeroHeader>

        <HeroTitle size="default">
          Unified governance and design for modern squads
        </HeroTitle>

        <HeroDescription>
          Eliminate rework between design and engineering with spec-first
          specifications, automated accessibility tests and interactive
          documentation in Storybook.
        </HeroDescription>

        <HeroActions align="left">
          <Button size="lg">Get Started Now</Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </HeroActions>
      </div>

      <HeroMedia>
        <VideoDialog
          title="LEMA-DS Overview"
          thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
          videoSrc="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
          variant="glow"
        />
      </HeroMedia>
    </HeroSection>
  ),
}

export const WithSocialProofMarquee: Story = {
  render: () => (
    <HeroSection align="center" spacing="default">
      <BackgroundGlow variant="grid-dots" />

      <HeroTitle size="default" gradient>
        Technology driving innovation at UFPB
      </HeroTitle>

      <HeroDescription>
        Used by more than 20 laboratories and strategic projects for technology
        and research.
      </HeroDescription>

      <div className="w-full pt-8">
        <Marquee speed="slow" pauseOnHover>
          {["LEMA", "CI UFPB", "STI", "PRPG", "CCEN", "CCS", "CE"].map(
            (item) => (
              <div
                key={item}
                className="rounded-lg border border-border/50 bg-muted/40 px-6 py-2.5 text-xs font-semibold text-muted-foreground"
              >
                {item}
              </div>
            )
          )}
        </Marquee>
      </div>
    </HeroSection>
  ),
}
