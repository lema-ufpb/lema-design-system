import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthSplitScreen } from "./auth-split-screen"
import { LoginForm } from "./login-form"
import { SignUpForm } from "./signup-form"

const meta = {
  title: "Layout/AuthSplitScreen",
  component: AuthSplitScreen,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    reverse: { control: "boolean" },
  },
} satisfies Meta<typeof AuthSplitScreen>

export default meta
type Story = StoryObj<typeof meta>

export const LoginSplitScreen: Story = {
  render: () => (
    <AuthSplitScreen
      appName="LEMA ID"
      testimonial={{
        quote:
          "O ecossistema unificado da UFPB reduziu a complexidade de acesso a laboratórios e pesquisas acadêmicas.",
        author: "Dra. Beatriz Fernandes",
        role: "Pesquisadora Principal · CCEN UFPB",
      }}
      stats={[
        { label: "Usuários Ativos", value: "32.000+" },
        { label: "Sistemas Integrados", value: "48" },
      ]}
    >
      <LoginForm
        variant="flat"
        socialProviders={["google", "govbr", "cafe"]}
        showPasskey
      />
    </AuthSplitScreen>
  ),
}

export const SignUpSplitScreen: Story = {
  render: () => (
    <AuthSplitScreen
      appName="LEMA ID"
      brandHeadline="Junte-se à maior comunidade de inovação acadêmica da Paraíba"
      brandDescription="Acesso centralizado a laboratórios, bolsas de pesquisa, editais e ferramentas institucionais de alta produtividade."
      stats={[
        { label: "Laboratórios Conectados", value: "24" },
        { label: "Artigos e Patentes", value: "1.200+" },
      ]}
    >
      <SignUpForm variant="flat" socialProviders={["google", "govbr"]} />
    </AuthSplitScreen>
  ),
}

export const ReversedTestimonialLeft: Story = {
  render: () => (
    <AuthSplitScreen
      reverse
      appName="LEMA Cloud"
      testimonial={{
        quote:
          "A facilidade do login unificado acelerou em dias a integração dos novos bolsistas de iniciação científica.",
        author: "Prof. Marcos Andrade",
        role: "Coordenador de TI · CI UFPB",
      }}
    >
      <LoginForm variant="flat" socialProviders={["govbr", "google"]} />
    </AuthSplitScreen>
  ),
}
