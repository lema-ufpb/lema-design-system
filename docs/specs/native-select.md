# Spec: NativeSelect

> Select nativo do HTML5 estilizado com wrapper consistente e ícone de chevron.

---

## Propósito

**Usar quando:** Necessário um elemento de seleção que use o controle nativo do navegador (sem virtualização), com aparência consistente entre browsers.

**Não usar quando:** Precisa de opções com busca, virtualização ou customização avançada de dropdown — usar `Select`.

**Alternativa:** `Select` (Radix) para dropdown estilizado com acesso por teclado avançado.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/native-select.tsx` |
| Tipo | `registry:ui` (name: `native-select`) |
| Categoria | Formulário |
| Depende de | `lucide-react` (ChevronDownIcon), `@/lib/utils` (cn) |

---

## API — Props

### NativeSelect

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `size` | `"sm" \| "default"` | `"default"` | Não | Altura do select |
| `className` | `string` | — | Não | Classes adicionais |
| `disabled` | `boolean` | — | Não | Estado desabilitado |
| `placeholder` | `string` | — | Não | Texto de placeholder |

Demais props propagadas para o elemento `<select>` nativo (exceto `size`).

### NativeSelectOption

Wrapper para `<option>`.

### NativeSelectOptGroup

Wrapper para `<optgroup>`.

---

## Tokens de design

| Token | Slot |
|-------|------|
| `--input/50` | Fundo do select |
| `--ring` | Borda no focus |
| `--ring/30` | Anel de glow no focus |
| `--destructive` / `--destructive/20` | Borda/ring de erro |
| `--muted-foreground` | Placeholder e cor do ícone |
| `--primary` / `--primary-foreground` | Seleção de texto |
| `opacity-50` | Estado disabled |

---

## Comportamentos e estados

| Estado | Comportamento |
|--------|---------------|
| Normal | Input com borda transparente, fundo `--input/50` |
| Focus | Borda `--ring`, anel `--ring/30` |
| Invalid | Borda `--destructive`, anel `--destructive/20` |
| Disabled | Opacidade 50% no wrapper, cursor not-allowed |
| Size sm | Altura `h-8` (vs `h-9` no default) |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Elemento nativo `<select>` | Screen readers reconhecem nativamente |
| Ícone decorativo | `aria-hidden="true"` no ChevronDownIcon |
| Estados inválidos | `aria-invalid` aplicado via props |

---

## Stories obrigatórias

- [x] `Default` — Três opções simples
- [x] `Small` — Size `sm`
- [x] `WithGroup` — OptGroups organizados
- [x] `Disabled` — Estado desabilitado

---

## Checklist

- [x] Componente funcional
- [x] Stories no Storybook
- [x] Documentação de tokens no stories
- [x] Suporte a `size` (`sm` / `default`)
- [x] Ícone decorativo com `aria-hidden`
- [x] Atributo `data-slot` no wrapper e select
