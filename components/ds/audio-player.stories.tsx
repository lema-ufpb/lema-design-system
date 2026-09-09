import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AudioPlayer } from "./audio-player"

const meta = {
  title: "Media/AudioPlayer",
  component: AudioPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A full-featured audio player using the native HTML5 Audio API.",
          "Supports play/pause, seek, volume control, and playback rate cycling (0.5×–2×).",
          "No external dependencies.",
          "",
          "> **Note:** Stories use a public domain audio file for demo purposes.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof AudioPlayer>

export default meta
type Story = StoryObj<typeof meta>

// Public domain audio sample
const SAMPLE_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

export const Default: Story = {
  args: {
    src: SAMPLE_AUDIO,
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    coverUrl: "https://picsum.photos/seed/music/200/200",
  },
}

export const NoArtist: Story = {
  args: {
    src: SAMPLE_AUDIO,
    title: "Unknown Track",
  },
}

export const NoCover: Story = {
  args: {
    src: SAMPLE_AUDIO,
    title: "Track Without Cover",
    artist: "Various Artists",
  },
}

export const Loading: Story = {
  args: {
    src: "",
    title: "Loading…",
    loading: true,
  },
}
