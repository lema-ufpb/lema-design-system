# Spec: Input

> Campo de entrada de texto fundamental para formulários.

---

## Propósito

Input de texto estilizado para formulários, suportando diversos tipos (text, password, email, number, search, tel, url, file) com estados de foco, disabled, inválido e placeholder.

**Usar quando:** É necessário coletar entrada de texto do usuário em formulários.

**Não usar quando:** O input precisa de ícones ou botões acoplados (use InputGroup). Para senha com toggle, use InputPassword custom.

**Alternativa se não se aplicar:** `InputGroup` para inputs com addons; `Textarea` para múltiplas linhas; `InputOTP` para códigos de verificação.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/input.tsx` |
| Tipo | `registry:ui` (name: `input`) |
| Categoria | Formulário / Entrada |
| Depende de | Nenhum |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `Input` | `React.ComponentProps<"input">` | — | — | Todas as props nativas de `<input>` |
| `Input.type` | `string` | — | — | Tipo do input (text, password, email, etc.) |

---

## Tokens de design utilizados

| Token | Slot |
|-------|------|
| `bg-input/50` | Fundo do input |
| `--foreground` | Cor do texto digitado |
| `--muted-foreground` | Placeholder |
| `--ring` / `border-ring` | Borda de foco |
| `--destructive` | Borda de erro (`aria-invalid`) |
| `--destructive/20` | Ring de foco em erro |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Borda `border-transparent`, fundo `bg-input/50` |
| **Focus** | `border-ring`, `ring-3 ring-ring/30` |
| **Disabled** | `pointer-events-none`, `cursor-not-allowed`, `opacity-50` |
| **Invalid** | `aria-invalid`: `border-destructive`, `ring-destructive/20` |
| **Placeholder** | Cor `text-muted-foreground` |
| **File** | Botão file nativo estilizado via `file:` utilities |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA | `aria-invalid` para estado de erro |
| Foco | `focus-visible:border-ring` com outline removido |

---

## Stories obrigatórias

- [x] `Default`
- [x] `Types`
- [x] `Disabled`
- [x] `WithValue`
- [x] `Invalid`
- [x] `File`

---

## Checklist

- [ ] Suporte a todos os tipos HTML nativos
- [ ] Estados: default, focus, disabled, invalid, file
- [ ] Transição suave de cores via `transition-[color,box-shadow,background-color]`
- [ ] Placeholder estilizado com `--muted-foreground`
