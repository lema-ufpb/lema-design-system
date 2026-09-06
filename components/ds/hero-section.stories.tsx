import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  HeroSection,
  HeroHeader,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroMedia,
} from "./hero-section"
import { AnnouncementBadge } from "./announcement-badge"
import { TextRotator } from "./text-rotator"
import { BackgroundGlow } from "./background-glow"
import { BrowserMockup } from "./browser-mockup"
import { VideoDialog } from "./video-dialog"
import { WaitlistForm } from "./waitlist-form"
import { Marquee } from "./marquee"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Blocks/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["center", "left", "split"],
    },
    spacing: {
      control: "inline-radio",
      options: ["compact", "default", "spacious"],
    },
    container: {
      control: "select",
      options: ["default", "narrow", "wide", "full"],
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const CompleteCenteredHero: Story = {
  render: () => (
    <HeroSection align="center" spacing="default">
      <BackgroundGlow variant="aurora" tone="primary" />

      <HeroHeader>
        <AnnouncementBadge tag="Novo" ping variant="glow">
          LEMA Design System v2.0 disponível
        </AnnouncementBadge>
      </HeroHeader>

      <HeroTitle size="large" gradient>
        Construa interfaces{" "}
        <TextRotator
          words={["elegantes", "acessíveis", "rápidas", "consistentes"]}
        />
        <br />
        para produtos digitais acadêmicos
      </HeroTitle>

      <HeroDescription size="large">
        O ecossistema definitivo de componentes React 19, Tailwind CSS v4 e
        shadcn/ui padronizado pela Universidade Federal da Paraíba.
      </HeroDescription>

      <HeroActions align="center">
        <WaitlistForm
          variant="pill"
          size="md"
          socialProof="Mais de 50 componentes prontos para produção."
        />
      </HeroActions>

      <HeroMedia>
        <BrowserMockup url="https://lema.ufpb.br/design-system" glow>
          <div className="flex h-72 flex-col items-center justify-center bg-card/60 p-8 text-center">
            <p className="text-lg font-semibold">Preview da Aplicação</p>
            <p className="mt-2 max-w-md text-xs text-muted-foreground">
              Moldura de alta fidelidade para demonstrar telas de sistemas
              administrativos, dashboards de pesquisa e portais institucionais.
            </p>
          </div>
        </BrowserMockup>
      </HeroMedia>
    </HeroSection>
  ),
}

export const SplitHeroWithVideo: Story = {
  render: () => (
    <HeroSection align="split" spacing="spacious">
      <BackgroundGlow variant="spotlight" tone="violet" />

      <div className="flex flex-col gap-6">
        <HeroHeader className="justify-start">
          <AnnouncementBadge tag="Demo" variant="outline">
            Vídeo de demonstração interativa
          </AnnouncementBadge>
        </HeroHeader>

        <HeroTitle size="default">
          Governança e design unificados para squads modernas
        </HeroTitle>

        <HeroDescription>
          Elimine retrabalho entre design e engenharia com especificações
          spec-first, testes automatizados de acessibilidade e documentação
          interativa no Storybook.
        </HeroDescription>

        <HeroActions align="left">
          <Button size="lg">Começar Agora</Button>
          <Button variant="outline" size="lg">
            Ver Documentação
          </Button>
        </HeroActions>
      </div>

      <HeroMedia>
        <VideoDialog
          title="Visão Geral do LEMA-DS"
          thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
          videoSrc="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
          variant="glow"
        />
      </HeroMedia>
    </HeroSection>
  ),
}

export const WithSocialProofMarquee: Story = {
  render: () => (
    <HeroSection align="center" spacing="default">
      <BackgroundGlow variant="grid-dots" />

      <HeroTitle size="default" gradient>
        A tecnologia que move a inovação na UFPB
      </HeroTitle>

      <HeroDescription>
        Utilizado por mais de 20 laboratórios e projetos estratégicos de
        tecnologia e pesquisa.
      </HeroDescription>

      <div className="w-full pt-8">
        <Marquee speed="slow" pauseOnHover>
          {["LEMA", "CI UFPB", "STI", "PRPG", "CCEN", "CCS", "CE"].map(
            (item) => (
              <div
                key={item}
                className="rounded-lg border border-border/50 bg-muted/40 px-6 py-2.5 text-xs font-semibold text-muted-foreground"
              >
                {item}
              </div>
            )
          )}
        </Marquee>
      </div>
    </HeroSection>
  ),
}
