# Spec: PageHeader (ds-page-header)

> Spec do componente `PageHeader` para o LEMA Design System.

---

## Propósito

O `PageHeader` padroniza o cabeçalho de página em dashboards, visualizações detalhadas, módulos e páginas internas. Ele resolve a dispersão visual e inconsistência de hierarquia entre breadcrumbs, títulos, tags de status, botões de ação e navegação de retorno ("voltar").

**Usar quando:**

- Toda página ou tela principal que necessite de título padronizado, descrição contextual e ações primárias/secundárias no topo.
- Telas filhas que possuem botão de navegação "voltar" (`onBack` ou `backHref`) e trilhas de navegação (breadcrumbs).
- Telas que exibem status ou badges ao lado do título (ex: "Em rascunho", "Ativo", "v2.4.0").

**Não usar quando:**

- Cabeçalhos internos de seções de cards (use `CardHeader`).
- Modais ou gavetas (use `DialogHeader` ou `SheetHeader`).

**Alternativa se não se aplicar:** `CardHeader`, `DialogHeader`.

---

## Localização

| Campo      | Valor                                        |
| ---------- | -------------------------------------------- |
| Arquivo    | `components/ds/page-header.tsx`              |
| Tipo       | `registry:ui`                                |
| Categoria  | `Layout`                                     |
| Depende de | `button`, `skeleton`, `separator`, `ui-i18n` |

---

## API — Props

| Prop          | Tipo                                 | Padrão      | Obrigatória | Descrição                                        |
| ------------- | ------------------------------------ | ----------- | ----------- | ------------------------------------------------ |
| `title`       | `React.ReactNode`                    | —           | ✓           | Título principal da página                       |
| `description` | `React.ReactNode`                    | —           |             | Subtítulo ou texto descritivo de apoio           |
| `breadcrumbs` | `React.ReactNode`                    | —           |             | Trilha de navegação acima do título              |
| `actions`     | `React.ReactNode`                    | —           |             | Conjunto de botões de ação ou controles no topo  |
| `badge`       | `React.ReactNode`                    | —           |             | Tag ou Badge de status renderizado junto ao nome |
| `metadata`    | `React.ReactNode`                    | —           |             | Metadados adicionais abaixo da descrição         |
| `onBack`      | `() => void`                         | —           |             | Callback para o botão de voltar                  |
| `backHref`    | `string`                             | —           |             | Link de destino para o botão de voltar           |
| `backLabel`   | `string`                             | —           |             | Rótulo acessível do botão de retorno             |
| `size`        | `"sm" \| "md" \| "lg"`               | `"md"`      |             | Escala de dimensionamento                        |
| `variant`     | `"default" \| "compact" \| "banner"` | `"default"` |             | Estilo visual do cabeçalho                       |
| `loading`     | `boolean`                            | `false`     |             | Exibe esqueleto de carregamento                  |
| `locale`      | `UILocale`                           | `"pt-BR"`   |             | Idioma para internacionalização                  |
| `className`   | `string`                             | —           |             | Classes customizadas de container                |

---

## Variantes CVA

```tsx
export const pageHeaderContainerVariants = cva("flex w-full flex-col gap-3", {
  variants: {
    size: {
      sm: "pb-3",
      md: "pb-4",
      lg: "pb-6",
    },
    variant: {
      default: "border-b border-border",
      compact: "",
      banner: "rounded-xl border border-border bg-muted/40 p-6",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

export const pageHeaderTitleVariants = cva(
  "font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        sm: "text-base font-semibold",
        md: "text-lg font-semibold",
        lg: "text-xl font-bold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export const pageHeaderDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
```

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                           |
| ----------------------- | ------------------------------------------- |
| `text-foreground`       | Título principal                            |
| `text-muted-foreground` | Descrição e metadados secundários           |
| `border-border`         | Linha divisória inferior ou borda do banner |
| `bg-muted/40`           | Fundo na variante banner                    |
| `bg-muted`              | Skeletons de carregamento                   |

---

## Escala tipográfica e de tamanho

| Slot        | sm                        | md                      | lg                      |
| ----------- | ------------------------- | ----------------------- | ----------------------- |
| Title       | `text-base font-semibold` | `text-lg font-semibold` | `text-xl font-bold`     |
| Description | `text-xs font-normal`     | `text-sm font-normal`   | `text-base font-normal` |
| Back icon   | `size-3.5`                | `size-4`                | `size-5`                |

---

## Comportamentos e estados

- **Loading (`loading={true}`):** Renderiza skeletons correspondentes ao título, descrição e ações.
- **Navegação de retorno:** Se `onBack` ou `backHref` for fornecido, renderiza botão com ícone de seta para a esquerda (`ArrowLeft`) alinhado com o título.
- **Ações:** Agrupadas à direita com flex e `gap-2`, mantendo quebra responsiva em telas móveis (`flex-col sm:flex-row`).

---

## Acessibilidade

- Título utiliza tag semântica `<h1>` (ou permite nível customizado).
- Botão voltar com `aria-label` descritivo via `backLabel` ou i18n `pageHeader.back`.
- Breadcrumbs encapsulados em `<nav aria-label="Breadcrumb">`.
