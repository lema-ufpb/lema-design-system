import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TableOfContents } from "./table-of-contents"

const meta = {
  title: "Navigation/TableOfContents",
  component: TableOfContents,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [],
  },
  render: () => {
    return (
      <div className="mx-auto flex w-full max-w-5xl gap-12 p-8">
        <div className="flex-1 space-y-32">
          {/* Falso conteúdo para mockar âncoras */}
          <section id="introducao" className="space-y-4 pt-16">
            <h2 className="text-3xl font-bold">1. Introdução</h2>
            <div className="h-64 rounded-md bg-muted p-4">
              Conteúdo introdução...
            </div>
          </section>

          <section id="funcionalidades" className="space-y-4 pt-16">
            <h2 className="text-3xl font-bold">2. Funcionalidades</h2>
            <div className="h-48 rounded-md bg-muted p-4">
              Conteúdo funcionalidades...
            </div>
          </section>

          <section id="funcionalidade-1" className="space-y-4 pt-16">
            <h3 className="text-xl font-bold">2.1 Primeira Funcionalidade</h3>
            <div className="h-64 rounded-md bg-muted p-4">Conteúdo 2.1...</div>
          </section>

          <section id="funcionalidade-2" className="space-y-4 pt-16">
            <h3 className="text-xl font-bold">2.2 Segunda Funcionalidade</h3>
            <div className="h-125 rounded-md bg-muted p-4">Conteúdo 2.2...</div>
          </section>

          <section id="conclusao" className="space-y-4 pt-16">
            <h2 className="text-3xl font-bold">3. Conclusão</h2>
            <div className="h-96 rounded-md bg-muted p-4">
              Conteúdo final...
            </div>
          </section>
        </div>

        <div className="hidden w-64 md:block">
          <div className="sticky top-16">
            <h4 className="mb-4 text-sm font-semibold">Nesta página</h4>
            <TableOfContents
              items={[
                { id: "introducao", title: "1. Introdução", level: 2 },
                {
                  id: "funcionalidades",
                  title: "2. Funcionalidades",
                  level: 2,
                },
                {
                  id: "funcionalidade-1",
                  title: "2.1 Primeira Funcionalidade",
                  level: 3,
                },
                {
                  id: "funcionalidade-2",
                  title: "2.2 Segunda Funcionalidade",
                  level: 3,
                },
                { id: "conclusao", title: "3. Conclusão", level: 2 },
              ]}
              offset={80}
            />
          </div>
        </div>
      </div>
    )
  },
}
