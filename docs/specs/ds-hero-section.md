# Spec: HeroSection

---

## Propósito

Shell de layout de seção Hero de alto impacto, totalmente responsivo e composível em subcomponentes atômicos (`HeroSection`, `HeroHeader`, `HeroTitle`, `HeroDescription`, `HeroActions`, `HeroMedia`).

**Usar quando:** Estruturar a área principal no topo de landing pages, documentação ou portfólio.
**Não usar quando:** Seções de conteúdo secundário no meio da página (usar layouts de grid normais ou cards).
**Alternativa se não se aplicar:** Estruturas manuais com `section` e flex/grid.

---

## Localização

| Campo      | Valor                            |
| ---------- | -------------------------------- |
| Arquivo    | `components/ds/hero-section.tsx` |
| Tipo       | `registry:ui`                    |
| Categoria  | `Layout`                         |
| Depende de | —                                |

---

## API — Componentes & Props

### `HeroSection`

| Prop        | Tipo                                        | Padrão      | Descrição                   |
| ----------- | ------------------------------------------- | ----------- | --------------------------- |
| `align`     | `"center" \| "left" \| "split"`             | `"center"`  | Alinhamento do conteúdo     |
| `spacing`   | `"compact" \| "default" \| "spacious"`      | `"default"` | Padding vertical da seção   |
| `container` | `"default" \| "narrow" \| "wide" \| "full"` | `"default"` | Largura máxima do container |
| `children`  | `React.ReactNode`                           | —           | Elementos filhos            |
| `className` | `string`                                    | —           | Classes extras              |

### `HeroHeader`

Wrapper para badges, tags ou anúncios no topo do hero.

### `HeroTitle`

| Prop       | Tipo                                | Padrão      | Descrição                                |
| ---------- | ----------------------------------- | ----------- | ---------------------------------------- |
| `as`       | `"h1" \| "h2"`                      | `"h1"`      | Tag HTML semântica                       |
| `size`     | `"default" \| "large" \| "display"` | `"default"` | Escala tipográfica                       |
| `gradient` | `boolean`                           | `false`     | Adiciona efeito gradiente sutil no texto |

### `HeroDescription`

| Prop   | Tipo                   | Padrão      | Descrição                       |
| ------ | ---------------------- | ----------- | ------------------------------- |
| `size` | `"default" \| "large"` | `"default"` | Tamanho do parágrafo descritivo |

### `HeroActions`

| Prop    | Tipo                            | Padrão | Descrição                      |
| ------- | ------------------------------- | ------ | ------------------------------ |
| `align` | `"center" \| "left" \| "start"` | herda  | Alinhamento dos botões de ação |

### `HeroMedia`

Wrapper para mídia principal (mockup, vídeo, ilustração, preview de produto).

---

## Variantes CVA

- `heroSectionVariants`: `align` (center, left, split), `spacing` (compact, default, spacious), `container` (default, narrow, wide, full)
- `heroTitleVariants`: `size` (default, large, display), `gradient` (true, false)
- `heroDescriptionVariants`: `size` (default, large)
- `heroActionsVariants`: `align` (center, left)

---

## Acessibilidade

- [x] Tag semântica `<section>` com suporte a `aria-label` ou `aria-labelledby`.
- [x] Título principal usa `<h1>` por padrão, respeitando hierarquia visual e de documentos.
- [x] Contraste de cores compatível com WCAG AA em light e dark mode.
