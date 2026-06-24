# Spec: Textarea

> Campo de entrada de texto multilinha com redimensionamento dinâmico e validação.

---

## Propósito

**Usar quando:** O usuário precisa inserir ou editar texto com múltiplas linhas, como comentários, descrições, mensagens ou conteúdo livre.

**Não usar quando:** O texto é curto (até uma linha) — usar Input. O conteúdo precisa de formatação rica — usar Editor Rico.

**Alternativa:** Input para texto de linha única, Editor Rico para formatação (Markdown, HTML).

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/textarea.tsx` |
| Tipo | `registry:ui` (name: `textarea`) |
| Categoria | Formulário / Entrada de texto |
| Depende de | Nenhuma |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `placeholder` | `string` | — | Não | Texto de exemplo quando vazio |
| `disabled` | `boolean` | `false` | Não | Desabilita a edição |
| `rows` | `number` | — | Não | Número de linhas visíveis |
| `aria-invalid` | `boolean` | — | Não | Estado de erro/validação |
| `className` | `string` | — | Não | Classes adicionais |

Demais props são herdadas do elemento `<textarea>` nativo.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--input / 50%` | Fundo translúcido do campo |
| `--muted-foreground` | Texto do placeholder |
| `--ring` | Borda no foco |
| `--ring / 30%` | Brilho (glow) no foco |
| `--destructive` | Borda de erro (`aria-invalid`) |
| `--destructive / 20%` | Brilho de erro (dark: `40%`) |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | `min-h-16`, `resize-none`, borda `border-transparent` |
| **Focus** | `border-ring`, `ring-3 ring-ring/30` |
| **Placeholder** | Texto em `text-muted-foreground` |
| **Disabled** | `opacity-50`, `cursor-not-allowed` |
| **Invalid** | `border-destructive`, `ring-destructive/20` |
| **Auto-height** | `field-sizing-content` para ajuste dinâmico de altura |
| **Custom rows** | Aceita atributo nativo `rows` para altura fixa |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Label | Associado a `<label>` externo ou `aria-label` |
| Foco | `focus-visible:border-ring focus-visible:ring-3` |
| Erro | `aria-invalid` aciona estilos destrutivos |
| Descrição | `aria-describedby` para mensagem de erro |

---

## Stories obrigatórias

- [x] `Default` — placeholder "Enter your message..."
- [x] `WithValue` — pré-preenchido com conteúdo
- [x] `Disabled` — desabilitado
- [x] `Invalid` — `aria-invalid` com destaque destrutivo
- [x] `Rows` — 3, 5, 10 linhas

---

## Checklist

- [x] Componente implementado em `textarea.tsx`
- [x] Stories implementadas (Default, WithValue, Disabled, Invalid, Rows)
- [x] `data-slot="textarea"`
- [x] `field-sizing-content` para altura dinâmica
- [x] Estado inválido via `aria-invalid`
- [x] Tokens semânticos (`--input`, `--muted-foreground`, `--ring`, `--destructive`)
- [x] `resize-none` + `min-h-16` por padrão
