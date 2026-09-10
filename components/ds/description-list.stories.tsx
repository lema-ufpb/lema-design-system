import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
} from "./description-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const meta = {
  title: "Data Display/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A data display component for key-value pairs.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `layout` | `"vertical" \| "horizontal" \| "grid"` | `"vertical"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

const SampleData = () => (
  <>
    <DescriptionListItem>
      <DescriptionListTerm>Full name</DescriptionListTerm>
      <DescriptionListDetails>Margot Foster</DescriptionListDetails>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Application for</DescriptionListTerm>
      <DescriptionListDetails>Backend Developer</DescriptionListDetails>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Email address</DescriptionListTerm>
      <DescriptionListDetails>margotfoster@example.com</DescriptionListDetails>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Salary expectation</DescriptionListTerm>
      <DescriptionListDetails>$120,000</DescriptionListDetails>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>About</DescriptionListTerm>
      <DescriptionListDetails>
        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
        cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit
        id mollit nulla mollit nostrud in ea officia proident.
      </DescriptionListDetails>
    </DescriptionListItem>
  </>
)

export const Vertical: Story = {
  render: () => (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionList layout="vertical">
          <SampleData />
        </DescriptionList>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default vertical layout.",
      },
    },
  },
}

export const Horizontal: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionList layout="horizontal">
          <SampleData />
        </DescriptionList>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout for wider screens.",
      },
    },
  },
}

export const Grid: Story = {
  render: () => (
    <Card className="max-w-[800px] w-full">
      <CardHeader>
        <CardTitle>Applicant Information</CardTitle>
      </CardHeader>
      <CardContent>
        <DescriptionList layout="grid">
          <SampleData />
        </DescriptionList>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout for dense data display.",
      },
    },
  },
}
