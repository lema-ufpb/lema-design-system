import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel"

const meta = {
  title: "Shadcn UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A scrollable carousel/slider component built on Embla Carousel.",
          "",
          "Composed of `Carousel` (context provider), `CarouselContent` (scrollable track), `CarouselItem` (individual slides), `CarouselPrevious`, and `CarouselNext` (navigation buttons). Supports `orientation` (`horizontal` | `vertical`), custom `opts` and `plugins` for Embla, and a `setApi` callback to access the underlying carousel API.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Navigation buttons** | *(delegates to Button)* | Previous/Next use `--primary`, `--border`, `--ring`, etc. from Button tokens |",
          "| **Content overflow** | *(none)* | Hidden overflow for the scrollable track |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Scroll direction",
      table: { defaultValue: { summary: "horizontal" } },
    },
    opts: {
      table: { disable: true },
    },
    plugins: {
      table: { disable: true },
    },
    setApi: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slideStyles = [
  "flex items-center justify-center rounded-4xl bg-muted p-12 text-2xl font-medium text-muted-foreground",
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal carousel with responsive slide widths (1/2 on md, 1/3 on lg) and navigation arrows.",
      },
    },
  },
  render: ({ orientation }) => (
    <Carousel className="mx-16" orientation={orientation}>
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
            <div className={slideStyles[0]}>{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  args: {
    orientation: "horizontal",
  },
}

export const SingleSlide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Carousel showing one full slide at a time with navigation arrows for browsing.",
      },
    },
  },
  render: () => (
    <Carousel className="mx-16">
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, i) => (
          <CarouselItem key={i}>
            <div className={slideStyles[0]}>{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Vertically oriented carousel with constrained 320px height for sidebar-like layouts.",
      },
    },
  },
  render: () => (
    <div className="flex justify-center">
      <Carousel orientation="vertical" className="h-80 w-64">
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem key={i}>
              <div className={slideStyles[0]}>{i + 1}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const WithCustomOpts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Carousel configured with start-aligned slides and infinite looping enabled via opts.",
      },
    },
  },
  render: () => (
    <Carousel className="mx-16" opts={{ align: "start", loop: true }}>
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, i) => (
          <CarouselItem key={i} className="md:basis-1/3">
            <div className={slideStyles[0]}>{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
