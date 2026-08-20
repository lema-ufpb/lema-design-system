# Spec: Toggle

> Botão de dois estados (pressionado/não pressionado) para habilitar/desabilitar opções de formatação ou filtros.

---

## Propósito

**Usar quando:** O usuário precisa ativar/desativar uma opção de formatação (negrito, itálico), filtro ou modo de visualização.

**Não usar quando:** A alternância é uma configuração global (usar Switch). O grupo de opções permite múltiplas seleções (usar Toggle Group).

**Alternativa:** Switch para configurações binárias, Checkbox para seleção independente.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ui/toggle.tsx`             |
| Tipo       | `registry:ui` (name: `toggle`)         |
| Categoria  | Ação / Alternância                     |
| Depende de | `radix-ui`, `class-variance-authority` |

---

## API — Props

| Prop              | Tipo                         | Padrão      | Obrigatória | Descrição                     |
| ----------------- | ---------------------------- | ----------- | ----------- | ----------------------------- |
| `variant`         | `"default" \| "outline"`     | `"default"` | Não         | Estilo visual                 |
| `size`            | `"sm" \| "default" \| "lg"`  | `"default"` | Não         | Tamanho                       |
| `pressed`         | `boolean`                    | —           | Não         | Estado pressionado controlado |
| `defaultPressed`  | `boolean`                    | —           | Não         | Estado pressionado inicial    |
| `onPressedChange` | `(pressed: boolean) => void` | —           | Não         | Callback de mudança           |
| `disabled`        | `boolean`                    | —           | Não         | Desabilita interação          |
| `aria-label`      | `string`                     | —           | Recomendado | Rótulo de acessibilidade      |

Demais props são herdadas de `TogglePrimitive.Root`.

---

## Tokens de design

| Token                  | Slot                                              |
| ---------------------- | ------------------------------------------------- |
| `--muted`              | Fundo quando pressionado (`aria-pressed`) e hover |
| `--border` / `--input` | Borda da variante `outline`                       |
| `--ring / 30%`         | Anel de foco                                      |
| `--destructive / 20%`  | Anel de estado inválido                           |

---

## Comportamentos e estados

| Estado                      | Comportamento                                        |
| --------------------------- | ---------------------------------------------------- |
| **Default não pressionado** | Fundo `bg-transparent`, texto normal                 |
| **Default pressionado**     | `bg-muted`                                           |
| **Outline não pressionado** | `border border-input bg-transparent`                 |
| **Outline pressionado**     | `bg-muted` com borda                                 |
| **Hover (não pressionado)** | `hover:bg-muted hover:text-foreground`               |
| **Focus**                   | `focus-visible:border-ring focus-visible:ring-[3px]` |
| **Disabled**                | `opacity-50`, `pointer-events-none`                  |
| **Invalid**                 | `border-destructive`, `ring-destructive/20`          |

---

## Acessibilidade

| Requisito | Implementação                                    |
| --------- | ------------------------------------------------ |
| Role      | `aria-pressed` para estado (não `role="button"`) |
| Rótulo    | `aria-label` obrigatório quando apenas ícone     |
| Foco      | `focus-visible` com outline e ring               |

---

## Stories obrigatórias

- [x] `Default` — texto "Toggle", variante default
- [x] `Variants` — default e outline lado a lado
- [x] `Sizes` — sm, default, lg
- [x] `WithIcons` — Bold, Italic, Underline com ícone
- [x] `Pressed` — default e outline pressionados
- [x] `Disabled` — disabled default, outline e pressed

---

## Checklist

- [x] Componente implementado em `toggle.tsx`
- [x] Stories implementadas (Default, Variants, Sizes, WithIcons, Pressed, Disabled)
- [x] CVA com variantes `default` / `outline`
- [x] Três tamanhos: `sm`, `default`, `lg`
- [x] `toggleVariants` exportado para consumo no Toggle Group
- [x] Suporte a `data-icon` (inline-start / inline-end)
