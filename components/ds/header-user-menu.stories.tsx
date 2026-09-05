import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { HeaderUserMenu } from "./header-user-menu"

const user = {
  name: "Alex Silva",
  email: "alex@ufpb.br",
  avatarUrl: "https://picsum.photos/100/100",
}

const meta = {
  title: "Navigation/HeaderUserMenu",
  component: HeaderUserMenu,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof HeaderUserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user,
    groups: [
      [
        {
          id: "profile",
          label: "Profile",
          icon: <UserIcon className="size-4" />,
        },
        {
          id: "settings",
          label: "Settings",
          icon: <SettingsIcon className="size-4" />,
        },
      ],
      [
        {
          id: "logout",
          label: "Log out",
          icon: <LogOutIcon className="size-4" />,
          variant: "destructive",
        },
      ],
    ],
  },
}

export const WithNotifications: Story = { args: { user, notifications: 3 } }

export const Loading: Story = { args: { user, loading: true } }

export const WithoutAvatar: Story = {
  args: { user: { name: "Maria Santos", email: "maria@ufpb.br" } },
}
