import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SettingsView } from "./settings-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const meta = {
  title: "Blocks/SettingsView",
  component: SettingsView,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SettingsView>

export default meta
type Story = StoryObj<typeof meta>

function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="border-t border-border pt-6" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="shadcn" />
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <Button>Update profile</Button>
      </div>
    </div>
  )
}

function NotificationsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <div className="border-t border-border pt-6" />
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Security emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account activity and security.
            </p>
          </div>
          <Switch defaultChecked disabled />
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    title: "Settings",
    description: "Manage your account settings and set e-mail preferences.",
    sections: [
      {
        id: "profile",
        title: "Profile",
        content: <ProfileForm />,
      },
      {
        id: "account",
        title: "Account",
        content: (
          <div className="text-sm text-muted-foreground">
            Account settings content goes here.
          </div>
        ),
      },
      {
        id: "appearance",
        title: "Appearance",
        content: (
          <div className="text-sm text-muted-foreground">
            Appearance settings content goes here.
          </div>
        ),
      },
      {
        id: "notifications",
        title: "Notifications",
        content: <NotificationsForm />,
      },
      {
        id: "display",
        title: "Display",
        content: (
          <div className="text-sm text-muted-foreground">
            Display settings content goes here.
          </div>
        ),
      },
    ],
  },
}
