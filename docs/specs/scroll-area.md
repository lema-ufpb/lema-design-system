# Spec: ScrollArea

> Wrapper de scroll customizado que substitui as barras de rolagem nativas por controles estilizados e consistentes entre navegadores.

---

## Propósito

**Usar quando:** Necessário estilizar as barras de rolagem de forma consistente cross-browser, especialmente em painéis com conteúdo extenso.

**Não usar quando:** O conteúdo não ultrapassa o contêiner (sem scroll) ou a barra nativa é aceitável.

**Alternativa:** CSS `overflow: auto` para scroll nativo; `overflow: hidden` para remover scroll.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/scroll-area.tsx` |
| Tipo | `registry:ui` (name: `scroll-area`) |
| Categoria | Layout |
| Depende de | `radix-ui` (ScrollArea), `@/lib/utils` (cn) |

---

## API — Props

### ScrollArea

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `React.ReactNode` | — | Sim | Conteúdo com scroll |

### ScrollBar

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Não | Direção do scroll |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--border` | Cor do thumb do scroll |
| `--ring/50` | Anel de foco no viewport |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Scroll vertical | Barra à direita, `w-2.5` |
| Scroll horizontal | Barra abaixo, `h-2.5` |
| Thumb | Arredondado `rounded-full`, cor `--border` |
| Viewport focus | Anel `--ring/50` |
| Touch | `touch-none` no scrollbar |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Foco de teclado | `focus-visible:ring-[3px]` no viewport |
| Scroll via teclado | Navegação padrão (setas, PgUp/PgDn) |

---

## Stories obrigatórias

- [x] `Default` — Texto longo com scroll vertical
- [x] `Horizontal` — Items em linha com scroll horizontal
- [x] `Small` — Conteúdo curto sem overflow
- [x] `LongContent` — 20 linhas com scroll vertical

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a orientação vertical e horizontal
- [x] Atributo `data-slot` no root, viewport, scrollbar e thumb
