import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React, { useRef } from "react"
import { ReadingProgress } from "./reading-progress"

const meta = {
  title: "Navigation/ReadingProgress",
  component: ReadingProgress,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReadingProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div className="p-8">
        <ReadingProgress />
        <h1 className="mb-8 text-4xl font-bold">Scroll this page</h1>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="mb-6 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum, neque sit amet dignissim varius, nisl magna consequat
            arcu, vel finibus est turpis pretium eros. Phasellus quis ipsum vel
            est fermentum mattis. Integer sodales interdum posuere. Morbi a arcu
            varius, dapibus purus non, malesuada elit. Proin elementum id metus
            eu dignissim. Aenean consectetur arcu a arcu sagittis, tincidunt
            pulvinar sapien lacinia. Nulla at risus ut dolor condimentum
            consequat sit amet nec magna. Praesent in arcu ac lorem feugiat
            ultrices a elementum sem. Nam elementum turpis ut sapien consectetur
            sagittis sit amet eget massa.
          </p>
        ))}
      </div>
    )
  },
}

export const WithContainerTarget: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null)
    return (
      <div className="flex h-screen w-full items-center justify-center p-8">
        <div className="relative h-100 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <ReadingProgress
            targetRef={containerRef}
            progressColor="bg-success"
            height="md"
          />
          <div ref={containerRef} className="h-full w-full overflow-y-auto p-8">
            <h2 className="mb-6 text-2xl font-bold text-card-foreground">
              Scroll the Inner Container
            </h2>
            {Array.from({ length: 15 }).map((_, i) => (
              <p key={i} className="mb-4 text-sm text-muted-foreground">
                This is an example of ReadingProgress attached to a specific
                container instead of the whole page. Note that it uses{" "}
                <code>absolute</code> inside the container instead of{" "}
                <code>fixed</code>. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Nostrum magnam tempora ea sint eaque
                inventore.
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  },
}
