import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilePreview, FilePreviewList } from "./file-preview"

const meta = {
  title: "Media/FilePreview",
  component: FilePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A compact file preview component with auto-detected type icons, size formatting, and hover-revealed actions.",
          "Supports image thumbnails, multiple file types, and row/card/thumbnail variants.",
          "Use `FilePreviewList` to display a collection of files.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["row", "card", "thumbnail"] },
  },
} satisfies Meta<typeof FilePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fileName: "design-system-v2.pdf",
    fileSize: 4200000,
    onDownload: () => alert("Download"),
    onRemove: () => alert("Remove"),
  },
}

export const AllSizes: Story = {
  args: {
    fileName: "document.pdf",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <FilePreview
          key={size}
          fileName={`document-${size}.pdf`}
          fileSize={1024 * 1024 * 2.4}
          size={size}
          onDownload={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  ),
}

export const AllFileTypes: Story = {
  args: {
    fileName: "report.pdf",
  },
  render: () => (
    <FilePreviewList
      files={[
        { fileName: "report.pdf", fileSize: 2048000, onDownload: () => {} },
        {
          fileName: "photo.jpg",
          fileSize: 512000,
          previewUrl: "https://picsum.photos/seed/file/100/100",
          onDownload: () => {},
        },
        { fileName: "data.xlsx", fileSize: 156000, onDownload: () => {} },
        { fileName: "video.mp4", fileSize: 104857600, onDownload: () => {} },
        { fileName: "component.tsx", fileSize: 8200, onDownload: () => {} },
        { fileName: "readme.md", fileSize: 3400, onDownload: () => {} },
        { fileName: "archive.zip", fileSize: 52428800, onDownload: () => {} },
        { fileName: "unknown.bin", fileSize: 102400 },
      ]}
    />
  ),
}

export const WithImageThumbnail: Story = {
  args: {
    fileName: "hero-banner.png",
    fileSize: 890000,
    fileType: "image/png",
    previewUrl: "https://picsum.photos/seed/banner/300/200",
    onPreview: () => {},
    onDownload: () => {},
    onRemove: () => {},
  },
}

export const Loading: Story = {
  args: {
    fileName: "loading.pdf",
  },
  render: () => <FilePreviewList files={[]} loading loadingCount={4} />,
}

export const NoActions: Story = {
  args: {
    fileName: "contract-signed.pdf",
    fileSize: 380000,
  },
}
