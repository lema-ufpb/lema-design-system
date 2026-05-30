# Spec: InputPassword

> Input de senha com toggle de visibilidade (mostrar/esconder), botão ghost integrado e suporte a i18n.

---

## Propósito

Wrapper do `Input` shadcn com botão de olho para alternar entre `type="password"` e `type="text"`, com labels acessíveis e i18n.

**Usar quando:** Formulários que requerem campo de senha com toggle de visibilidade.

**Não usar quando:** Não há necessidade de toggle de senha (usar `Input` shadcn diretamente).

**Alternativa se não se aplicar:** `Input` do shadcn com `type="password"`; `input-email` para email.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/input-password.tsx` |
| data-slot | `input-password` |
| Tipo | `registry:component` |
| Categoria | `Form` |
| Depende de | `Input`, `Button` (shadcn/ui) |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | | Tamanho do input |
| `radius` | `"pill" \| "rounded" \| "square"` | `"pill"` | | Arredondamento das bordas |
| `locale` | `UILocale` | `"en-US"` | | Locale para i18n |
| `className` | `string` | — | | Classes extras |

Estende `Omit<React.ComponentProps<"input">, "type" | "size">`. O tipo alterna entre `"password"` e `"text"` conforme estado.

---

## Variantes CVA

Nenhuma. Usa `sizeConfig` e `radiusConfig` como objetos de configuração.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-muted-foreground` | botão toggle (estado normal) |
| `text-foreground` | botão toggle (hover) |

---

## Escala tipográfica e de tamanho

| Slot | sm | default | lg |
|------|----|---------|----|
| Input | `h-8 px-2.5 text-xs pr-7` | `h-9 pr-9` | `h-10 px-4 text-base pr-10` |
| Botão | `icon-xs` (h-6 w-6) | `icon-sm` (h-7 w-7) | `icon` (h-9 w-9) |
| Ícone | Eye/EyeOff (size-4 padrão do Button) | — | — |

| Slot | pill | rounded | square |
|------|------|---------|--------|
| Border radius | `rounded-3xl` | `rounded-lg` | `rounded-none` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `disabled` | Herdado do `Input` shadcn via props |
| Loading | Não implementado (usar Input diretamente para loading) |
| Show password | `type="text"`, ícone `EyeOff`, aria-label i18n `hide` |
| Hide password | `type="password"`, ícone `Eye`, aria-label i18n `show` |
| Toggle | `useState<boolean>` interno, alterna ao clicar no botão |

> Sem loading/empty/error state próprio.

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Type semântico | Alterna entre `type="password"` e `type="text"` |
| Botão toggle | `aria-label` dinâmico via i18n (`show` / `hide`) |
| TabIndex | `tabIndex={-1}` no botão toggle (não entra no tab order) |
| i18n | `UI_I18N[locale].inputPassword.*`: `show`, `hide` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Small` — Small
- [x] `Large` — Large
- [x] `LocalePTBR` — Locale PTBR
- [x] `AllSizes` — All Sizes
- [x] `AllRadius` — All Radius
- [x] `Variants` — Variants
- [x] `Disabled` — Disabled
- [x] `WithValue` — With Value
- [x] `Invalid` — Invalid

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / default=text-sm / lg=text-base`
- [x] Tokens são semânticos
- [x] N/A: sem CVA
- [x] N/A: sem loading state
- [x] N/A: sem valores numéricos
- [x] `truncate` não aplicável
- [x] `aria-label` no botão toggle via i18n
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas steps Tailwind
- [x] Prop `locale` integrada via `UI_I18N`
