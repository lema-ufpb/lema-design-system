# Spec: ds-press-wall

> Press Wall (mural estático de logos de imprensa/prêmios).

---

## Propósito

Exibir uma grade estática de logos de veículos de imprensa ou selos de prêmios, com efeito grayscale → cor no hover/focus. É a contraparte **estática** do `ds-marquee` (que rola continuamente) — use quando o movimento do marquee não é desejado. Inspirado no bloco "Press mentions + awards row" do blockus.

**Usar quando:** Seção "Sobre"/"Imprensa" com "As seen in" ou selos de prêmios.
**Não usar quando:** Quiser um efeito de rolagem contínua — use `Marquee`.

---

## Localização

| Campo      | Valor                                 |
| ---------- | ------------------------------------- |
| Arquivo    | `components/ds/press-wall.tsx`        |
| Tipo       | `registry:ui` (name: `ds-press-wall`) |
| Categoria  | `Data Display`                        |
| Depende de | `badge`, `skeleton`                   |

---

## API — Props

### `PressWall`

| Prop     | Tipo     | Padrão | Descrição                                        |
| -------- | -------- | ------ | ------------------------------------------------ |
| `kicker` | `string` | —      | Rótulo pequeno acima da grade (ex: "As seen in") |

### `PressWallLogo`

| Prop        | Tipo                   | Padrão  | Obrigatória | Descrição                                                                          |
| ----------- | ---------------------- | ------- | ----------- | ---------------------------------------------------------------------------------- |
| `label`     | `string`               | —       | ✓           | Nome acessível da menção/veículo (ou legenda visível se `showLabel`)               |
| `href`      | `string`               | —       |             | Torna o logo um link (`<a>`)                                                       |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`  |             | Altura do logo                                                                     |
| `showLabel` | `boolean`              | `false` |             | Renderiza `label` como legenda visível abaixo da marca (em vez de só `aria-label`) |
| `children`  | `React.ReactNode`      | —       | ✓           | Marca (imagem ou SVG inline)                                                       |

### `PressWallAward`

| Prop    | Tipo                | Descrição                         |
| ------- | ------------------- | --------------------------------- |
| `label` | `string`            | Texto do selo (dentro de `Badge`) |
| `icon`  | `React.ElementType` | Ícone opcional                    |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots:** `pressWallGridVariants`, `pressWallLogoVariants`.

---

## Tokens de design utilizados

| Token                   | Slot                              |
| ----------------------- | --------------------------------- |
| `text-muted-foreground` | kicker                            |
| `text-foreground`       | wordmark de exemplo (nas stories) |
| `ring-ring`             | foco visível no logo              |

> `grayscale`/`opacity` são efeitos estruturais (não semânticos de cor), permitidos aqui pois não carregam significado de status.

---

## Escala tipográfica e de tamanho

| Slot | sm    | md    | lg    |
| ---- | ----- | ----- | ----- |
| Logo | `h-5` | `h-6` | `h-8` |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                     |
| ------------------- | ---------------------------------------------------------- |
| Hover/focus no logo | `grayscale-0 opacity-100` (de `grayscale opacity-60`)      |
| `href` presente     | Renderiza `<a>` com o mesmo `aria-label`                   |
| Loading             | `PressWallSkeleton` com `count` placeholders do mesmo grid |

---

## Acessibilidade

| Requisito     | Implementação                                                                               |
| ------------- | ------------------------------------------------------------------------------------------- |
| Logo sem link | `role="img"` + `aria-label={label}` + `tabIndex={0}` (focável para revelar cor via teclado) |
| Logo com link | `aria-label={label}` no `<a>`                                                               |
| Foco visível  | `focus-visible:ring-2 focus-visible:ring-ring`                                              |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `AsLinks`
- [x] `WithAwards`
- [x] `Loading`
- [x] `Labeled`

---

## Checklist antes de implementar

- [x] `defaultVariants` no `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes ao grid real
- [x] `aria-label` em todo logo (link ou não)
