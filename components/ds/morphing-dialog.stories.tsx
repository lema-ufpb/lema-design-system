import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogClose,
} from "./morphing-dialog"

const meta = {
  title: "Layout/MorphingDialog",
  component: MorphingDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MorphingDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => {
    return (
      <MorphingDialog>
        <MorphingDialogTrigger className="group flex w-[300px] flex-col overflow-hidden rounded-2xl border bg-card p-4 transition-colors hover:bg-accent/50">
          <MorphingDialogImage
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
            alt="Retro computer"
            className="mb-4 h-40 w-full rounded-xl object-cover"
          />
          <MorphingDialogTitle className="text-lg">
            Retro Computing
          </MorphingDialogTitle>
          <MorphingDialogSubtitle>
            A look back at the 80s
          </MorphingDialogSubtitle>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogImage
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
            alt="Retro computer"
            className="h-64 w-full object-cover"
          />
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <MorphingDialogTitle className="mb-1 text-2xl">
                  Retro Computing
                </MorphingDialogTitle>
                <MorphingDialogSubtitle className="text-base">
                  A look back at the 80s
                </MorphingDialogSubtitle>
              </div>
              <MorphingDialogClose />
            </div>
            <MorphingDialogDescription className="mt-6 text-base leading-relaxed">
              The 1980s was a decade of rapid technological advancement,
              particularly in the realm of personal computing. Home computers
              became increasingly accessible, transforming how people worked,
              played, and communicated. Iconic machines like the Commodore 64,
              ZX Spectrum, and early Apple Macintoshes defined a
              generation&apos;s relationship with technology.
            </MorphingDialogDescription>
          </div>
        </MorphingDialogContainer>
      </MorphingDialog>
    )
  },
}
