# Spec: InputEmail

> Input de email com ícone decorativo e variantes de tamanho/arredondamento.

---

## Propósito

Wrapper do `Input` shadcn com ícone `Mail` à direita e configuração simplificada de tamanho e borda.

**Usar quando:** Formulários que requerem campo de email com indicador visual.

**Não usar quando:** O campo não é email (`type="email"`); necessita de validação ou loading state.

**Alternativa se não se aplicar:** `Input` do shadcn diretamente; `input-password` para senha.

---

## Localização

| Campo      | Valor                           |
| ---------- | ------------------------------- |
| Arquivo    | `components/ds/input-email.tsx` |
| data-slot  | `input-email`                   |
| Tipo       | `registry:component`            |
| Categoria  | `Form`                          |
| Depende de | `Input` (shadcn/ui)             |

---

## API — Props

| Prop        | Tipo                              | Padrão      | Obrigatória | Descrição                 |
| ----------- | --------------------------------- | ----------- | ----------- | ------------------------- |
| `size`      | `"sm" \| "default" \| "lg"`       | `"default"` |             | Tamanho do input          |
| `radius`    | `"pill" \| "rounded" \| "square"` | `"pill"`    |             | Arredondamento das bordas |
| `className` | `string`                          | —           |             | Classes extras            |

Estende `Omit<React.ComponentProps<"input">, "type" | "size">`. O tipo é fixo como `"email"`.

---

## Variantes CVA

Nenhuma. Usa `sizeConfig` e `radiusConfig` como objetos de configuração (não CVA).

---

## Tokens de design utilizados

| Token                   | Slot onde é usado  |
| ----------------------- | ------------------ |
| `text-muted-foreground` | ícone Mail         |
| `pointer-events-none`   | ícone (decorativo) |

---

## Escala tipográfica e de tamanho

| Slot  | sm                        | default          | lg                          |
| ----- | ------------------------- | ---------------- | --------------------------- |
| Input | `h-8 px-2.5 text-xs pr-7` | `h-9 pr-9`       | `h-10 px-4 text-base pr-11` |
| Ícone | `right-2 size-3.5`        | `right-3 size-4` | `right-4 size-4`            |

| Slot          | pill          | rounded      | square         |
| ------------- | ------------- | ------------ | -------------- |
| Border radius | `rounded-3xl` | `rounded-lg` | `rounded-none` |

---

## Comportamentos e estados

| Estado      | Comportamento esperado                                     |
| ----------- | ---------------------------------------------------------- |
| `disabled`  | Herdado do `Input` shadcn (classe `disabled:` do Tailwind) |
| Loading     | Não implementado (usar Input diretamente para loading)     |
| Placeholder | Herdado do `Input` via props                               |
| Validação   | Não implementada (type="email" nativo do browser)          |

> Sem loading/empty/error state próprio — é um wrapper puramente visual.

---

## Acessibilidade

| Requisito        | Implementação                                                      |
| ---------------- | ------------------------------------------------------------------ |
| Type semântico   | `type="email"` nativo                                              |
| Ícone decorativo | Nenhum aria-label (ícone decorativo sem role)                      |
| Label            | Deve ser fornecido externamente via prop `aria-label` ou `<label>` |
| i18n             | Não utiliza `UI_I18N`                                              |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Default
- [x] `Small` — Small
- [x] `Large` — Large
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
- [x] `truncate` não aplicável (não há label truncável)
- [x] Label deve ser fornecido externamente
- [x] `cn()` para classes condicionais
- [x] Spacing usa apenas steps Tailwind
- [x] N/A: sem i18n
