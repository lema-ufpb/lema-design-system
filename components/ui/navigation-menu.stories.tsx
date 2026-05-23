import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu"

const meta = {
  title: "Shadcn UI/Navigation Menu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A horizontal navigation bar with support for nested dropdown panels.",
          "",
          "Built on Radix NavigationMenu. The top-level `NavigationMenu` component accepts a `viewport` boolean prop (default `true`) that controls whether the viewport indicator is rendered for the expanding dropdown. Items are grouped via `NavigationMenuList`, each `NavigationMenuItem` may contain a `NavigationMenuTrigger` and optional `NavigationMenuContent` for the dropdown panel.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Trigger background** | `--muted` | Hover/focus background for trigger & links |",
          "| **Dropdown background** | `--popover` | Background for the content/viewport panel |",
          "| **Dropdown text** | `--popover-foreground` | Text color inside the content panel |",
          "| **Border/shadow** | `--border` / `--ring` | Indicator triangle color and focus ring |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus indicator on triggers and links |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    viewport: {
      control: "boolean",
      description:
        "Whether to render the animated viewport indicator for the active dropdown",
    },
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

const ListItem = ({
  title,
  children,
  href,
}: {
  title: string
  children: string
  href?: string
}) => (
  <li>
    <NavigationMenuLink asChild href={href ?? "#"}>
      <a className="flex flex-col gap-1 rounded-xl p-3 leading-none no-underline outline-hidden select-none">
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
)

export const Default: Story = {
  args: {
    viewport: true,
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-3 md:w-96 md:grid-cols-2 lg:w-[32rem]">
              <ListItem title="Installation" href="#">
                How to install and set up the project
              </ListItem>
              <ListItem title="Quick Start" href="#">
                Get up and running in minutes
              </ListItem>
              <ListItem title="Configuration" href="#">
                Customize your setup
              </ListItem>
              <ListItem title="API Reference" href="#">
                Complete API documentation
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-3 md:w-96 md:grid-cols-2">
              <ListItem title="Button" href="#">
                Interactive button control
              </ListItem>
              <ListItem title="Badge" href="#">
                Visual indicators for status
              </ListItem>
              <ListItem title="Card" href="#">
                Content containers
              </ListItem>
              <ListItem title="Dialog" href="#">
                Modal overlay dialogs
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild href="#">
            <a className="inline-flex h-9 w-max items-center justify-center rounded-3xl px-4.5 py-2.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1">
              Documentation
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const NoViewport: Story = {
  args: {
    viewport: false,
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-3">
              <ListItem title="Installation" href="#">
                How to install and set up the project
              </ListItem>
              <ListItem title="Quick Start" href="#">
                Get up and running in minutes
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild href="#">
            <a className="inline-flex h-9 w-max items-center justify-center rounded-3xl px-4.5 py-2.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1">
              Changelog
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
