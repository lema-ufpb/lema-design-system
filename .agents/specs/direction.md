# Spec: Direction

> Provedor de direção de texto (LTR/RTL) para aplicações.

---

## Propósito

Provider que define a direção de texto (esquerda-para-direita ou direita-para-esquerda) para componentes descendentes, usando o primitivo Direction do Radix UI.

**Usar quando:** A aplicação precisa suportar idiomas RTL (árabe, hebraico, etc.) ou alternar dinamicamente entre LTR e RTL.

**Não usar quando:** A aplicação é exclusivamente LTR e não há planos de internacionalização com idiomas RTL.

**Alternativa se não se aplicar:** Atributo `dir` nativo do HTML no elemento `<html>` para direção global.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/direction.tsx` |
| Tipo | `registry:ui` (name: `direction`) |
| Categoria | Provedor / Internacionalização |
| Depende de | `radix-ui` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `DirectionProvider.dir` | `"ltr" \| "rtl"` | — | Sim | Direção de texto |
| `DirectionProvider.direction` | `"ltr" \| "rtl"` | — | — | Alias para `dir` |
| `DirectionProvider.children` | `React.ReactNode` | — | Sim | Conteúdo a envolver |
| `useDirection` | — | — | — | Hook que retorna direção atual |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| N/A | Nenhum token CSS — define atributo `dir` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **LTR** | Direção padrão (`"ltr"`) para idiomas ocidentais |
| **RTL** | Direção `"rtl"` para idiomas como árabe e hebraico |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Rolagem nativa | N/A — componente de contexto |
| Atributo `dir` | Gerenciado pelo `Direction.DirectionProvider` do Radix UI |

---

## Stories obrigatórias

- [x] `Default`
- [x] `RTL`

---

## Checklist

- [x] Provider aceita `dir` e `direction` como alias
- [x] Hook `useDirection` exportado para consumo
- [x] Suporte a LTR e RTL
