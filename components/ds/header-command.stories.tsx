import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon, FileTextIcon, SettingsIcon, UsersIcon } from "lucide-react"
import { HeaderCommand } from "./header-command"

const brand = { title: "LEMA", logo: <BoxIcon /> }
const nav = [
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
]

const meta = {
  title: "Header/HeaderCommand",
  component: HeaderCommand,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderCommand component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `HeaderBrandProps` | — | - |",
          "| `navItems` | `HeaderNavItem[]` | — | - |",
          "| `commandGroups` | `HeaderCommandGroup[]` | — | - |",
          "| `searchPlaceholder` | `string` | — | - |",
          "| `onSearch` | `(value: string) => void` | — | - |",
          "| `user` | `HeaderUserData \| null` | — | - |",
          "| `userGroups` | `HeaderUserMenuItem[][]` | — | - |",
          "| `notifications` | `number` | — | - |",
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `sticky` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderCommand>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand,
    navItems: nav,
    searchPlaceholder: "Search or jump to...",
    commandGroups: [
      {
        heading: "Suggestions",
        items: [
          {
            label: "Create project",
            icon: <FileTextIcon className="size-4" />,
          },
          { label: "Invite team", icon: <UsersIcon className="size-4" /> },
        ],
      },
      {
        heading: "Settings",
        items: [
          { label: "Preferences", icon: <SettingsIcon className="size-4" /> },
        ],
      },
    ],
    user: { name: "Alex Silva", email: "alex@ufpb.br" },
    notifications: 3,
    actions: [{ label: "New", variant: "default" as const }],
  },
}

export const WithoutUser: Story = {
  args: {
    brand,
    navItems: nav,
    commandGroups: [{ heading: "Quick", items: [{ label: "Go to docs" }] }],
  },
}

export const Loading: Story = {
  args: {
    brand,
    navItems: nav,
    loading: true,
    user: { name: "Alex", email: "alex@ufpb.br" },
  },
}
