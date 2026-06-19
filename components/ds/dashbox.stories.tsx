import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DownloadIcon, SettingsIcon } from "lucide-react"
import { Dashbox } from "@/components/ds/dashbox"
import { ProgressBar } from "@/components/ds/progress-bar"

const meta = {
  title: "Layout/Dashbox",
  component: Dashbox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A comprehensive panel and card container structure designed for metrics, charts, and information tables on dashboard layouts.",
          "",
          "Includes out-of-the-box support for: status badges, action toolbars, collapsible states, fullscreen toggling, pull-to-refresh triggers, loading skeletons, and title/subtitle layout options.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Card Container** | `--card` | Background color for the dashboard card |",
          "| **Card Text** | `--card-foreground` | Standard text color inside the card |",
          "| **Borders** | `--border` | Outer container borders and headers separators |",
          "| **Header Text** | `--foreground` | Main title text color |",
          "| **Header Subtitles** | `--muted-foreground` | Subtitle description text color |",
          "| **Toolbar Buttons** | `--muted-foreground` | Color of icons in the header toolbar |",
          "| **Toolbar Hover** | `--accent` / `--accent-foreground` | Hover states highlights for toolbar actions |",
          "| **Loading Skeleton** | `--muted` | Skeleton background gradient pulse color |",
          "| **Error Badge** | `--destructive` | Text and border color for error status |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    bodyPadding: {
      control: "radio",
      options: ["none", "sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: [undefined, "live", "warning", "error", "idle"],
      table: { defaultValue: { summary: "" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showMaximize: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showMinimize: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showHeader: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    description: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "select",
      options: ["en-US", "pt-PR", "es-ES", "fr-FR"],
      description: "Locale for toolbar tooltips and status labels.",
      table: { defaultValue: { summary: "en-US" } },
    },
    toolbar: { table: { disable: true } },
    children: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
  },
} satisfies Meta<typeof Dashbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "My Dashbox",
    description: "An example panel with simple content.",
    size: "md",
    children: (
      <p className="text-muted-foreground">
        Place any content here — charts, tables, metrics.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default Dashbox with title, description, and placeholder content.",
      },
    },
  },
}

export const NoHeader: Story = {
  args: {
    showHeader: false,
    title: "My Dashbox",
    children: (
      <p className="text-muted-foreground">
        Content without header or toolbar.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dashbox with showHeader={false} — header, toolbar, and status badge are hidden.",
      },
    },
  },
}

export const WithStatus: Story = {
  args: {
    title: "API Status",
    status: "live",
    children: (
      <p className="text-sm text-muted-foreground">
        Service is responding normally.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Dashbox with a live status badge in the header.",
      },
    },
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Dashbox title="Live" status="live">
        <p className="text-sm text-muted-foreground">
          Real-time data stream active.
        </p>
      </Dashbox>
      <Dashbox title="Warning" status="warning">
        <p className="text-sm text-muted-foreground">
          High latency detected in region us-east-1.
        </p>
      </Dashbox>
      <Dashbox title="Error" status="error">
        <p className="text-sm text-muted-foreground">
          Service currently unavailable.
        </p>
      </Dashbox>
      <Dashbox title="Idle" status="idle">
        <p className="text-sm text-muted-foreground">
          Maintenance mode active.
        </p>
      </Dashbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all four status badges — live, warning, error, and idle.",
      },
    },
  },
}

export const WithToolbar: Story = {
  args: {
    title: "Monthly Revenue",
    description: "January — May 2025",
    toolbar: (
      <>
        <button
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Download CSV"
        >
          <DownloadIcon className="size-3.5" />
        </button>
        <button
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Settings"
        >
          <SettingsIcon className="size-3.5" />
        </button>
      </>
    ),
    children: (
      <div className="grid grid-cols-3 gap-3">
        {["Jan", "Feb", "Mar"].map((m) => (
          <div key={m} className="rounded-lg bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">{m}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ${Math.floor(Math.random() * 500 + 100)}k
            </p>
          </div>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dashbox with custom toolbar actions (download, settings) in the header.",
      },
    },
  },
}

export const WithRefresh: Story = {
  args: {
    title: "Real-time Data",
    status: "live",
    onRefresh: async () => {
      await new Promise((r) => setTimeout(r, 1200))
    },
    children: (
      <p className="text-sm text-muted-foreground">
        Click the refresh button to see the spin animation.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dashbox with a refresh button that triggers an async onRefresh callback.",
      },
    },
  },
}

export const LocalizedToolbar: Story = {
  args: {
    title: "Overview",
    description: "Example with locale pt-PR",
    status: "live",
    locale: "pt-BR",
    onRefresh: async () => {
      await new Promise((r) => setTimeout(r, 800))
    },
    children: (
      <p className="text-sm text-muted-foreground">
        Hover over the buttons in the top right corner to see the translated
        tooltips and status badge.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toolbar labels and status badge translated to Portuguese (pt-BR).",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    title: "Loading...",
    loading: true,
    children: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state — the entire Dashbox body is replaced by animated skeleton placeholders.",
      },
    },
  },
}

export const NoPadding: Story = {
  args: {
    title: "No Padding",
    bodyPadding: "none",
    children: (
      <div className="flex h-32 w-full items-center justify-center bg-linear-to-r from-primary/20 to-primary/5">
        <span className="text-sm text-muted-foreground">
          Edge-to-edge content area
        </span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dashbox with bodyPadding='none' — content stretches edge-to-edge.",
      },
    },
  },
}

export const WithProgressBars: Story = {
  render: () => (
    <div className="flex w-full gap-4">
      <Dashbox
        title="Performance"
        description="Semester indicators summary"
        status="live"
        onRefresh={async () => {
          await new Promise((r) => setTimeout(r, 800))
        }}
      >
        <div className="flex flex-col gap-3">
          <ProgressBar
            value={0.88}
            name="Approval Rate"
            intent="success"
            precision={1}
          />
          <ProgressBar
            value={0.62}
            name="Attendance"
            intent="primary"
            precision={1}
          />
          <ProgressBar
            value={0.35}
            name="Dropout Rate"
            intent="destructive"
            precision={1}
          />
        </div>
      </Dashbox>

      <Dashbox
        title="Goals"
        description="Q1 target achievement"
        status="warning"
      >
        <div className="flex flex-col gap-3">
          <ProgressBar value={100} name="Enrolled" intent="success" />
          <ProgressBar value={72} name="Active" intent="primary" />
          <ProgressBar value={18} name="Completed" intent="destructive" />
        </div>
      </Dashbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Two Dashbox panels side-by-side containing ProgressBar components with different intents.",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Dashbox title="Small" size="sm">
        <p className="text-muted-foreground">Content in small size variant.</p>
      </Dashbox>
      <Dashbox title="Medium" size="md">
        <p className="text-muted-foreground">Content in medium size variant.</p>
      </Dashbox>
      <Dashbox title="Large" size="lg">
        <p className="text-muted-foreground">Content in large size variant.</p>
      </Dashbox>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size presets — sm, md, and lg.",
      },
    },
  },
}
