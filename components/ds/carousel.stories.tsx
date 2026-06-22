import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Carousel } from "./carousel"

const meta = {
  title: "Navigation/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Enhanced carousel built on `ui/carousel` (Embla) with CVA variants, i18n, autoplay, skeleton loading, pagination dots, progress bar, and customizable navigation buttons using semantic design tokens.",
          "",
          "## Variants",
          "",
          "| Variant | Description |",
          "| --- | --- |",
          "| `default` | Standard carousel with side navigation |",
          "| `cards` | Elevated slides with shadow, border, and card background |",
          "| `showcase` | Full-width slides with overlay navigation (fade in on hover) |",
          "| `minimal` | No navigation buttons, dots only |",
          "",
          "## Navigation Button Variants",
          "",
          "| `navVariant` | Button variant | Icon / Foreground |",
          "| --- | --- | --- |",
          "| `outline` (default) | `outline` | — |",
          "| `ghost` | `ghost` | — |",
          "| `primary` | `default` | `bg-primary` / `text-primary-foreground` |",
          "| `secondary` | `default` | `bg-secondary` / `text-secondary-foreground` |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `CarouselVariant` | `"default"` | Carousel visual variant |',
          '| `orientation` | `"horizontal" \\| "vertical"` | `"horizontal"` | Scroll direction |',
          "| `slidesPerView` | `number \\| CarouselSlidesPerView` | — | Responsive slides per view |",
          "| `autoplayInterval` | `number` | — | Autoplay interval in ms |",
          "| `pauseOnHover` | `boolean` | `true` | Pause autoplay on hover |",
          "| `showDots` | `boolean` | `true` | Show pagination dots |",
          "| `showProgress` | `boolean` | `false` | Show progress bar |",
          "| `loading` | `boolean` | `false` | Skeleton state |",
          "| `loadingSlideCount` | `number` | `4` | Number of skeleton slides |",
          '| `locale` | `UILocale` | `"pt-BR"` | i18n locale |',
          '| `navVariant` | `CarouselNavVariant` | `"outline"` | Navigation button variant |',
          '| `navSize` | `CarouselNavSize` | `"icon-sm"` | Navigation button size |',
          "| `navPosition` | `CarouselNavPosition` | — | Navigation position (inferred from variant) |",
          '| `dotVariant` | `CarouselDotVariant` | `"filled"` | Dot style variant |',
          '| `dotPosition` | `CarouselDotPosition` | `"bottom"` | Dot position |',
          "| `loop` | `boolean` | `false` | Enable infinite loop |",
          '| `align` | `"start" \\| "center" \\| "end"` | `"start"` | Slide alignment |',
          "| `skipSnaps` | `boolean` | `false` | Skip snap points |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "cards", "showcase", "minimal"],
      table: { defaultValue: { summary: "default" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    navVariant: {
      control: "inline-radio",
      options: ["outline", "ghost", "primary", "secondary"],
      table: { defaultValue: { summary: "outline" } },
    },
    navPosition: {
      control: "inline-radio",
      options: ["side", "overlay", "bottom", "none"],
      table: { defaultValue: { summary: "side" } },
    },
    navSize: {
      control: "inline-radio",
      options: ["icon-sm", "icon", "icon-lg"],
      table: { defaultValue: { summary: "icon-sm" } },
    },
    dotVariant: {
      control: "inline-radio",
      options: ["filled", "outline"],
      table: { defaultValue: { summary: "filled" } },
    },
    dotPosition: {
      control: "inline-radio",
      options: ["bottom", "overlay"],
      table: { defaultValue: { summary: "bottom" } },
    },
    slidesPerView: {
      control: "object",
      table: { defaultValue: { summary: "undefined" } },
    },
    autoplayInterval: {
      control: "number",
      table: { defaultValue: { summary: "undefined" } },
    },
    showDots: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showProgress: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loop: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "pt-BR" } },
    },
    pauseOnHover: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    loadingSlideCount: {
      control: "number",
      table: { defaultValue: { summary: "4" } },
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
      table: { defaultValue: { summary: "start" } },
    },
    skipSnaps: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

function slide(i: number) {
  return (
    <div className="flex h-48 items-center justify-center rounded-xl bg-muted text-2xl font-medium text-muted-foreground">
      {i + 1}
    </div>
  )
}

export const Default: Story = {
  args: {
    variant: "default",
    orientation: "horizontal",
    pauseOnHover: true,
    showDots: true,
    showProgress: false,
    loading: false,
    loadingSlideCount: 4,
    locale: "pt-BR",
    navVariant: "outline",
    navSize: "icon-sm",
    dotVariant: "filled",
    dotPosition: "bottom",
    loop: false,
    align: "start",
    skipSnaps: false,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const Cards: Story = {
  args: {
    variant: "cards",
    slidesPerView: { sm: 1, md: 2, lg: 3 },
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex h-64 flex-col items-center justify-center gap-2 p-6"
        >
          <span className="text-4xl font-bold text-foreground">{i + 1}</span>
          <span className="text-sm text-muted-foreground">
            Card item {i + 1}
          </span>
        </div>
      ))}
    </Carousel>
  ),
}

export const Showcase: Story = {
  args: {
    variant: "showcase",
    navPosition: "overlay",
    showDots: true,
    dotPosition: "overlay",
    navVariant: "primary",
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`flex h-80 items-center justify-center text-3xl font-bold ${i % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          Showcase {i + 1}
        </div>
      ))}
    </Carousel>
  ),
}

export const Minimal: Story = {
  args: { variant: "minimal", showDots: true },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const Autoplay: Story = {
  args: {
    variant: "default",
    autoplayInterval: 3000,
    loop: true,
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const WithProgress: Story = {
  args: {
    variant: "default",
    showProgress: true,
    showDots: true,
    loop: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const PrimaryNav: Story = {
  args: {
    variant: "default",
    navVariant: "primary",
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const SecondaryNav: Story = {
  args: {
    variant: "default",
    navVariant: "secondary",
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const Vertical: Story = {
  args: {
    variant: "default",
    orientation: "vertical",
    showDots: true,
  },
  render: (args) => (
    <div className="flex justify-center">
      <Carousel className="h-80 w-64" {...args}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-32 items-center justify-center rounded-xl bg-muted text-2xl font-medium text-muted-foreground"
          >
            {i + 1}
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

export const MultipleSlides: Story = {
  args: {
    variant: "default",
    slidesPerView: { sm: 1, md: 2, lg: 3 },
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 9 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const Loading: Story = {
  args: { loading: true, loadingSlideCount: 4 },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}

export const OverlayDots: Story = {
  args: {
    variant: "default",
    dotPosition: "overlay",
    showDots: true,
  },
  render: (args) => (
    <Carousel className="mx-16" {...args}>
      {Array.from({ length: 6 }).map((_, i) => slide(i))}
    </Carousel>
  ),
}
