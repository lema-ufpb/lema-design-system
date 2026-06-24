# Spec: Table

> Tabela de dados responsiva construída com elementos HTML nativos.

---

## Propósito

**Usar quando:** É necessário exibir dados tabulares estruturados em linhas e colunas com cabeçalho, corpo e rodapé.

**Não usar quando:** Os dados são uma lista simples (usar List). O layout exige grade não-tabular (usar CSS Grid).

**Alternativa:** Listagem com cards para visualização mobile-first.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/table.tsx` |
| Tipo | `registry:ui` (name: `table`) |
| Categoria | Dados / Tabela |
| Depende de | Nenhuma |

---

## API — Props

Cada subcomponente aceita `className` e props HTML nativas do elemento correspondente.

| Componente | Elemento | Props |
|------------|----------|-------|
| `<Table>` | `<table>` | `React.ComponentProps<"table">` |
| `<TableHeader>` | `<thead>` | `React.ComponentProps<"thead">` |
| `<TableBody>` | `<tbody>` | `React.ComponentProps<"tbody">` |
| `<TableFooter>` | `<tfoot>` | `React.ComponentProps<"tfoot">` |
| `<TableRow>` | `<tr>` | `React.ComponentProps<"tr">` |
| `<TableHead>` | `<th>` | `React.ComponentProps<"th">` |
| `<TableCell>` | `<td>` | `React.ComponentProps<"td">` |
| `<TableCaption>` | `<caption>` | `React.ComponentProps<"caption">` |

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--border` | Borda inferior das linhas (`border-b`) |
| `--muted / 50%` | Fundo de header, footer e hover de linha |
| `--foreground` | Texto do cabeçalho |
| `--muted-foreground` | Texto do caption |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Normal** | Tabela com `w-full`, `caption-bottom`, `text-sm` |
| **Hover (linha)** | `hover:bg-muted/50` |
| **Selecionado** | `data-[state=selected]:bg-muted` |
| **Expansão** | `has-aria-expanded:bg-muted/50` |
| **Responsivo** | Container com `overflow-x-auto` para scroll horizontal |
| **Com checkbox** | `[&:has([role=checkbox])]:pr-0` para alinhamento |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Semântica | Elementos HTML nativos (`<table>`, `<thead>`, `<th>`, `<caption>`) |
| Caption | `<caption>` com `sr-only` ou texto visível para descrever a tabela |
| Navegação | Navegação por tab entre elementos interativos dentro das células |
| Contraste | Tokens semânticos garantem contraste adequado |

---

## Stories obrigatórias

- [x] `Default` — tabela com header, body, caption
- [x] `WithFooter` — tabela com header, body, footer (linha de total)

---

## Checklist

- [x] Componente implementado em `table.tsx`
- [x] Stories implementadas (Default, WithFooter)
- [x] 8 subcomponentes: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption
- [x] Container com scroll horizontal responsivo
- [x] `data-slot` em cada subcomponente
- [x] Tokens semânticos (`--border`, `--muted`, `--foreground`, `--muted-foreground`)
