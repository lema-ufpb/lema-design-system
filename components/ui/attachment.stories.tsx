import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
} from "./attachment"
import {
  FileIcon,
  XIcon,
  DownloadIcon,
  ImageIcon,
  LoaderCircleIcon,
  AlertCircleIcon,
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

const meta = {
  title: "Shadcn UI/Attachment",
  component: Attachment,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A file attachment component with support for media preview, title, description, actions, and trigger overlay.",
          "",
          "Composed of `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, and `AttachmentTrigger` sub-components. Supports orientation (`horizontal` | `vertical`), size (`default` | `sm` | `xs`), and state (`idle` | `uploading` | `processing` | `error` | `done`).",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Card background** | `--card` | Attachment container background |",
          "| **Card foreground** | `--card-foreground` | Attachment container text |",
          "| **Media background** | `--muted` | Icon / preview area background |",
          "| **Error state** | `--destructive` | Border and text for error state |",
          "| **Description** | `--muted-foreground` | Secondary descriptive text |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
      table: { defaultValue: { summary: "done" } },
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
      table: { defaultValue: { summary: "default" } },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal attachment with a file icon, title, description, and a remove action.",
      },
    },
  },
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove file">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Vertical orientation attachment showing a media preview with title and description stacked below.",
      },
    },
  },
  render: () => (
    <Attachment orientation="vertical">
      <AttachmentMedia variant="image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=120&h=120&fit=crop"
          alt="Preview"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>photo.jpg</AttachmentTitle>
        <AttachmentDescription>1.8 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove file">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All attachment states displayed side by side: idle, uploading, processing, error, and done.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Attachment state="idle">
        <AttachmentMedia>
          <ImageIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Select file</AttachmentTitle>
          <AttachmentDescription>Click or drag to upload</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <LoaderCircleIcon className="animate-spin" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploading.zip</AttachmentTitle>
          <AttachmentDescription>Uploading…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>processing.zip</AttachmentTitle>
          <AttachmentDescription>Processing…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <AlertCircleIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>failed.zip</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry">
            <DownloadIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>completed.pdf</AttachmentTitle>
          <AttachmentDescription>100% done</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove file">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all three size presets — default, sm, and xs — in horizontal orientation.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Attachment size="default">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>document.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment size="sm">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>document.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment size="xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>document.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Uploading and processing states representing active loading feedback with shimmer on title text.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploading.zip</AttachmentTitle>
          <AttachmentDescription>Uploading… 45%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel" disabled>
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>processing.zip</AttachmentTitle>
          <AttachmentDescription>Processing…</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel" disabled>
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  ),
}

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Error state with destructive styling and a retry action button.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Attachment state="error">
        <AttachmentMedia>
          <AlertCircleIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>failed_upload.pdf</AttachmentTitle>
          <AttachmentDescription>
            Upload failed — network error
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry">
            <DownloadIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  ),
}

export const WithTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Attachment with an invisible trigger overlay, making the entire area clickable.",
      },
    },
  },
  render: () => (
    <Attachment state="idle" orientation="vertical">
      <AttachmentTrigger asChild>
        <button type="button" />
      </AttachmentTrigger>
      <AttachmentMedia variant="icon">
        <ImageIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Click to upload</AttachmentTitle>
        <AttachmentDescription>PNG, JPG up to 10MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "AttachmentGroup with multiple attachments in a horizontal scrollable row.",
      },
    },
  },
  render: () => (
    <AttachmentGroup>
      <Attachment>
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>document.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment>
        <AttachmentMedia variant="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=120&h=120&fit=crop"
            alt="Preview"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>photo.jpg</AttachmentTitle>
          <AttachmentDescription>1.8 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>archive.zip</AttachmentTitle>
          <AttachmentDescription>4.2 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </AttachmentGroup>
  ),
}
