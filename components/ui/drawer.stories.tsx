import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { Button } from "./button"
import { Input } from "./input"

const meta = {
  title: "Shadcn UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Primitivos do drawer shadcn/ui, construídos sobre **vaul** de emilkowalski.",
          "",
          "Expõe os blocos de montagem brutos: `Drawer`, `DrawerTrigger`, `DrawerContent`,",
          "`DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter` e `DrawerClose`.",
          "Para uma API de alto nível com header/footer opcionais e conteúdo scrollable,",
          "use o componente `Drawer` de `drawer-ui`.",
          "",
          "## Estrutura",
          "",
          "```tsx",
          "<Drawer>",
          "  <DrawerTrigger />",
          "  <DrawerContent>",
          "    <DrawerHeader>",
          "      <DrawerTitle />",
          "      <DrawerDescription />",
          "    </DrawerHeader>",
          "    {/* conteúdo */}",
          "    <DrawerFooter>",
          "      <Button>Submit</Button>",
          "      <DrawerClose asChild>",
          '        <Button variant="outline">Cancel</Button>',
          "      </DrawerClose>",
          "    </DrawerFooter>",
          "  </DrawerContent>",
          "</Drawer>",
          "```",
          "",
          "## Design Tokens",
          "",
          "| Elemento | Variável CSS | Propósito |",
          "| --- | --- | --- |",
          "| **Background** | `--popover` | Cor de fundo do painel |",
          "| **Texto** | `--popover-foreground` | Títulos e corpo |",
          "| **Sub-texto** | `--muted-foreground` | Descrições |",
          "| **Drag handle** | `--muted` | Indicador pill nos drawers bottom |",
          "| **Overlay** | `bg-black/30` | Fundo translúcido |",
          "| **Borda** | `--border` | Contorno do painel |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 px-4">
          <Input placeholder="Your name" />
          <Input placeholder="Your email" />
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const ScrollableContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[60vh]">
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>
            Read carefully before accepting.
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <p
              key={i}
              className="mb-4 text-sm leading-relaxed text-muted-foreground"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
        <DrawerFooter>
          <Button>Accept</Button>
          <DrawerClose asChild>
            <Button variant="outline">Decline</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete Account</DrawerTitle>
          <DrawerDescription>
            Are you sure? This action is permanent and cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button variant="destructive">Delete</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromLeft: Story = {
  name: "Direction — Left",
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Left</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Browse available sections.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 px-4">
          {["Dashboard", "Analytics", "Settings", "Help"].map((item) => (
            <Button key={item} variant="ghost" className="justify-start">
              {item}
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromRight: Story = {
  name: "Direction — Right",
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Right</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Your recent activity.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4">
          {[
            "New comment on your post",
            "Server deployment complete",
            "Payment received — $249.00",
          ].map((msg) => (
            <div
              key={msg}
              className="rounded-lg border border-border bg-card p-3 text-sm"
            >
              {msg}
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const FromTop: Story = {
  name: "Direction — Top",
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Top</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerDescription>Select an action to perform.</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-3 gap-3 px-4">
          {["New File", "Upload", "Share"].map((action) => (
            <Button key={action} variant="outline">
              {action}
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost" className="w-full">
              Dismiss
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Controlled: Story = {
  name: "Controlled State",
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={!open}
          >
            Close
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          State: <span className="font-mono">{open ? "open" : "closed"}</span>
        </p>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                Managed via external state — no DrawerTrigger needed.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
}
