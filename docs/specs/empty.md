# Spec: Empty

> Placeholder de estado vazio para listas, tabelas ou visualizações sem dados.

---

## Propósito

Componente de estado vazio que exibe uma mensagem amigável com ícone, título e descrição quando não há dados a serem mostrados.

**Usar quando:** Uma lista, tabela, busca ou filtro não retorna resultados e é necessário informar o usuário.

**Não usar quando:** Há dados carregando (use Skeleton). Para erros, use Alert com `variant="destructive"`.

**Alternativa se não se aplicar:** `Skeleton` para loading states; `Alert` para mensagens de erro.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/empty.tsx` |
| Tipo | `registry:ui` (name: `empty`) |
| Categoria | Feedback / Estado vazio |
| Depende de | `class-variance-authority` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Empty` | `React.ComponentProps<"div">` | — | — | Container principal |
| `EmptyHeader` | `React.ComponentProps<"div">` | — | — | Cabeçalho (ícone + título + descrição) |
| `EmptyMedia.variant` | `"default" \| "icon"` | `"default"` | — | Estilo do media container |
| `EmptyMedia` | `React.ComponentProps<"div">` | — | — | Container para ícone/ilustração |
| `EmptyTitle` | `React.ComponentProps<"div">` | — | — | Título |
| `EmptyDescription` | `React.ComponentProps<"p">` | — | — | Descrição |
| `EmptyContent` | `React.ComponentProps<"div">` | — | — | Ações adicionais (ex.: "Clear Filters") |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `--muted-foreground` | `EmptyDescription` |
| `--muted` | `EmptyMedia` `variant="icon"` (bg) |
| `--foreground` | `EmptyTitle`, ícone |
| `--primary` | Link hover em `EmptyDescription` |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Vazio padão** | `Empty` com `EmptyHeader` contendo `EmptyMedia` + `EmptyTitle` + `EmptyDescription` |
| **Com ação** | `EmptyContent` adicional para botões/links de ação |
| **Media icon** | `variant="icon"` aplica `bg-muted` com `size-10` e `rounded-xl` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Estrutura semântica | `div` com `data-slot` attributes |
| Leitura de tela | Descrição textual via `EmptyDescription` |

---

## Stories obrigatórias

- [x] `Default`
- [x] `WithContent`

---

## Checklist

- [x] Subcomponentes: Header, Media (com variant `default`/`icon`), Title, Description, Content
- [x] Layout centralizado com `flex-col items-center`
- [x] Media com variante `icon` para ícones com fundo
- [x] Content para ações adicionais
