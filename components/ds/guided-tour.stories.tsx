import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { GuidedTour, type TourStep } from "./guided-tour"
import { fn } from "storybook/test"

const meta = {
  title: "Feedback/GuidedTour",
  component: GuidedTour,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A presentation component for a guided tour or onboarding card.",
      },
    },
  },
} satisfies Meta<typeof GuidedTour>

export default meta
type Story = StoryObj<typeof meta>

const sampleSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to the new dashboard",
    content:
      "We have redesigned the interface to make it easier for you to find what you need.",
  },
  {
    id: "navigation",
    title: "New Navigation",
    content:
      "The sidebar now collapses to give you more screen real estate. Try hovering over the icons.",
  },
  {
    id: "search",
    title: "Global Search",
    content:
      "Press Cmd+K to open the command palette and search across all your projects instantly.",
  },
]

export const Default: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 0,
    onNext: fn(),
  },
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = () =>
      setCurrentStep((prev) => Math.min(prev + 1, sampleSteps.length - 1))
    const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    return (
      <GuidedTour
        steps={sampleSteps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
        onSkip={fn()}
        onFinish={fn()}
      />
    )
  },
}
