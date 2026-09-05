import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { ContactChannels } from "./contact-channels"

const channels = [
  {
    icon: Mail,
    title: "Email us",
    description: "We reply within one business day.",
    href: "mailto:hello@example.com",
    actionLabel: "hello@example.com",
  },
  {
    icon: Phone,
    title: "Call us",
    description: "Mon-Fri, 9am to 6pm.",
    href: "tel:+15551234567",
    actionLabel: "+1 (555) 123-4567",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    description: "Chat with our team in real time.",
    href: "#",
    actionLabel: "Start a chat",
  },
]

const meta = {
  title: "Layout/ContactChannels",
  component: ContactChannels,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A row of contact-channel cards (email, phone, chat) — composed from CardIcon.",
      },
    },
  },
  args: { channels },
} satisfies Meta<typeof ContactChannels>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
