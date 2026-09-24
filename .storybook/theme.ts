import { create } from "storybook/theming/create"

export default create({
  base: "light",
  // Literal stacks: the manager UI has no --font-sans variable (it only exists
  // in the preview iframe), so var() would be invalid and fall back to Times.
  fontBase:
    '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontCode:
    '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  brandTitle: "LEMA-UFPB Design System",
  brandUrl: "/",
  brandImage: "/favicon.ico",
  brandTarget: "_self",
})
