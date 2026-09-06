# Spec: hero-bento

> Gerado automaticamente para fechar gap spec-driven. Componente `components/ds/hero-bento.tsx` estava sem spec em `docs/specs`. Base: template `docs/templates/component-spec.md`.

---

## Propósito

Componente `hero-bento` — hero centralizado + grid bento.

**Usar quando:** compor páginas/layouts que precisam de hero-bento.
**Não usar quando:** um primitivo `components/ui` isolado já resolve.
**Alternativa:** compor com primitivos `Card`, `Button`, `Skeleton`.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/hero-bento.tsx` |
| Tipo       | `registry:block`               |
| Categoria  | `Layout`                       |
| Depende de | badge                          |

---

## API — Props

| Prop          | Tipo              | Padrão | Obrigatória | Descrição |
| ------------- | ----------------- | ------ | ----------- | --------- |
| `kicker`      | `string`          | —      |             |           |
| `title`       | `React.ReactNode` | —      | ✓           |           |
| `description` | `string`          | —      |             |           |
| `actions`     | `React.ReactNode` | —      |             |           |
| `children`    | `React.ReactNode` | —      | ✓           |           |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof *Variants>` quando houver CVA.

---

## Variantes CVA

| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `default`, `muted` | `default` |

---

## Tokens de design utilizados

| Token                   | Slot          |
| ----------------------- | ------------- |
| `bg-muted`              | track / fundo |
| `text-muted-foreground` | label         |
| `text-foreground`       | valor         |

> Sem raw Tailwind para semântica (ex: `bg-emerald-500` proibido).

---

## Escala tipográfica e de tamanho

| Slot   | sm                      | md                      | lg                        |
| ------ | ----------------------- | ----------------------- | ------------------------- |
| Label  | `text-xs font-medium`   | `text-sm font-medium`   | `text-base font-medium`   |
| Value  | `text-xs font-semibold` | `text-sm font-semibold` | `text-base font-semibold` |
| Altura | `h-7`                   | `h-8`                   | `h-9`                     |
| Ícone  | `size-3.5`              | `size-4`                | `size-5`                  |

---

## Comportamentos e estados

| Estado           | Comportamento                                           |
| ---------------- | ------------------------------------------------------- |
| `loading={true}` | `<Skeleton>` com dimensões fiéis                        |
| `empty`          | mensagem `—` + i18n `nothingToMeasure` quando aplicável |
| `disabled`       | `opacity-50 pointer-events-none`                        |
| Overflow         | `truncate` em labels                                    |

---

## Acessibilidade

| Requisito | Implementação                               |
| --------- | ------------------------------------------- |
| Role      | `region`/`list`/`button` conforme semântica |
| Rótulo    | `aria-label` quando sem label visível       |
| Teclado   | `Enter`/`Space` em rows/cards clicáveis     |
| i18n      | `locale?: UILocale` quando houver strings   |

---

## Stories obrigatórias

- [ ] `Default`
- [ ] `AllVariants`/`AllSizes`
- [ ] `Loading`
- [ ] `Empty` (se aplicável)
- [ ] `Locales` (pt-BR/en-US/es-ES/fr-FR)
- [ ] `A11y` / interação com `play`

---

## Checklist antes de implementar

- [ ] Tipografia `sm=text-xs / md=text-sm / lg=text-base`
- [ ] Tokens semânticos apenas
- [ ] `cva()` com `defaultVariants`
- [ ] `*Variants` exportados
- [ ] Loading `<Skeleton>`
- [ ] `tabular-nums` em números
- [ ] `truncate` em labels
- [ ] `aria-label` presente
- [ ] `cn()` para classes condicionais
- [ ] Spacing Tailwind steps
- [ ] `locale` via `UI_I18N`
