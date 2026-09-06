# Spec: ds-hero-terminal

> Hero Terminal (bloco composto — não é um átomo novo).

---

## Propósito

Hero split com preview de terminal/navegador e glow de fundo, remontando o bloco "Split hero with terminal preview" do blockus inteiramente a partir de átomos existentes: `HeroSection`, `BackgroundGlow` e `BrowserMockup`.

**Usar quando:** Produto técnico (CLI, SaaS dev tool) que se beneficia de mostrar uma janela de terminal/navegador no hero.
**Não usar quando:** Precisar de controle fino — componha os átomos diretamente na sua página.

---

## Localização

| Campo      | Valor                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Arquivo    | `components/ds/hero-terminal.tsx`                                     |
| Tipo       | `registry:block` (name: `ds-hero-terminal`)                           |
| Categoria  | `Layout`                                                              |
| Depende de | `ds-hero-section`, `ds-background-glow`, `ds-browser-mockup`, `badge` |

---

## API — Props

| Prop             | Tipo                            | Obrigatória  | Descrição                                 |
| ---------------- | ------------------------------- | ------------ | ----------------------------------------- |
| `kicker`         | `string`                        |              | Badge acima do título                     |
| `title`          | `React.ReactNode`               | ✓            | Título (via `HeroTitle`)                  |
| `description`    | `string`                        |              | Parágrafo de apoio                        |
| `actions`        | `React.ReactNode`               |              | Botões (via `HeroActions`)                |
| `browserUrl`     | `string`                        |              | URL exibida na barra de endereço/terminal |
| `browserVariant` | `BrowserMockupProps["variant"]` | `"terminal"` | Estilo do preview                         |
| `glowTone`       | `BackgroundGlowProps["tone"]`   | `"primary"`  | Tom do glow de fundo                      |
| `children`       | `React.ReactNode`               |              | Conteúdo dentro da janela do preview      |

---

## Comportamentos e estados

| Estado            | Comportamento esperado           |
| ----------------- | -------------------------------- |
| Sem `kicker`      | Badge não é renderizado          |
| Sem `description` | Parágrafo não é renderizado      |
| Sem `actions`     | Linha de ações não é renderizada |

---

## Acessibilidade

Herdada integralmente dos átomos compostos — nenhuma lógica própria além da composição.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `VioletGlow`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
