/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DynamicIsland } from "./dynamic-island"
import {
  PhoneCallIcon,
  UploadCloudIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const meta = {
  title: "Feedback/DynamicIsland",
  component: DynamicIsland,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DynamicIsland>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    state: "compact",
    title: "Uploading 3 files",
    subtitle: "24%",
    icon: <UploadCloudIcon className="size-4" />,
  },
}

export const Interactive: Story = {
  render: () => {
    const [state, setState] = React.useState<"idle" | "compact" | "expanded">(
      "compact"
    )

    return (
      <div className="flex max-w-[400px] w-full flex-col items-center gap-12">
        <div className="flex h-[200px] w-full items-start justify-center rounded-2xl border bg-muted/30 pt-8">
          <DynamicIsland
            state={state}
            title={state === "expanded" ? undefined : "Incoming Call"}
            subtitle="0:24"
            icon={<PhoneCallIcon className="size-4 text-success" />}
            intent="default"
            onClick={() =>
              setState(state === "expanded" ? "compact" : "expanded")
            }
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Jane Doe</span>
                    <span className="text-xs opacity-70">iPhone</span>
                  </div>
                </div>
                <span className="text-xl font-light opacity-80">0:24</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="text-destructive-foreground size-12 rounded-full bg-destructive hover:bg-destructive/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    setState("idle")
                  }}
                >
                  <PhoneCallIcon className="size-5 rotate-[135deg]" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-12 rounded-full bg-success text-success-foreground hover:bg-success/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    setState("compact")
                  }}
                >
                  <PhoneCallIcon className="size-5" />
                </Button>
              </div>
            </div>
          </DynamicIsland>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setState("idle")}>
            Idle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setState("compact")}
          >
            Compact
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setState("expanded")}
          >
            Expanded
          </Button>
        </div>
      </div>
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <DynamicIsland
        state="compact"
        size="sm"
        title="Connected"
        icon={<CheckCircle2Icon />}
      />
      <DynamicIsland
        state="compact"
        size="md"
        title="Connected"
        icon={<CheckCircle2Icon />}
      />
      <DynamicIsland
        state="compact"
        size="lg"
        title="Connected"
        icon={<CheckCircle2Icon />}
      />
    </div>
  ),
}

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <DynamicIsland
        state="compact"
        intent="default"
        title="System update"
        icon={<UploadCloudIcon />}
      />
      <DynamicIsland
        state="compact"
        intent="success"
        title="Payment sent"
        subtitle="$45.00"
        icon={<CheckCircle2Icon />}
      />
      <DynamicIsland
        state="compact"
        intent="warning"
        title="Low battery"
        subtitle="10%"
        icon={<AlertTriangleIcon />}
      />
      <DynamicIsland
        state="compact"
        intent="destructive"
        title="Connection lost"
        subtitle="Retry"
        icon={<AlertTriangleIcon />}
      />
    </div>
  ),
}

export const MusicPlayer: Story = {
  render: () => {
    const [state, setState] = React.useState<"compact" | "expanded">("expanded")
    const [isPlaying, setIsPlaying] = React.useState(true)

    return (
      <div className="flex h-[300px] max-w-[400px] w-full items-start justify-center pt-8">
        <DynamicIsland
          state={state}
          title="Lo-fi Beats"
          subtitle={
            <div className="flex items-center gap-1">
              <span className="flex h-3.5 items-end gap-[2px]">
                <span
                  className={cn(
                    "block h-2 w-1 rounded-full bg-current",
                    isPlaying && "animate-[bounce_1s_ease-in-out_infinite]"
                  )}
                />
                <span
                  className={cn(
                    "block h-3 w-1 rounded-full bg-current",
                    isPlaying && "animate-[bounce_1s_ease-in-out_infinite]"
                  )}
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className={cn(
                    "block h-1.5 w-1 rounded-full bg-current",
                    isPlaying && "animate-[bounce_1s_ease-in-out_infinite]"
                  )}
                  style={{ animationDelay: "0.4s" }}
                />
              </span>
            </div>
          }
          icon={
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop"
              className="size-full rounded-sm object-cover"
              alt="Album art"
              loading="lazy"
              decoding="async"
            />
          }
          onClick={() =>
            setState(state === "expanded" ? "compact" : "expanded")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
                className="size-16 rounded-lg object-cover shadow-sm"
                alt="Album art"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-base font-semibold">
                  Chill Study Beats
                </span>
                <span className="text-sm opacity-70">Lofi Girl</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-current hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPlaying(!isPlaying)
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <PauseIcon className="size-6 fill-current" />
                ) : (
                  <PlayIcon className="size-6 fill-current" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs opacity-70">1:24</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-1/3 rounded-full bg-white" />
              </div>
              <span className="text-xs opacity-70">-2:10</span>
            </div>
          </div>
        </DynamicIsland>
      </div>
    )
  },
}
