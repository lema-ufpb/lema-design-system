# Spec: auth-card

> Gerado automaticamente para fechar gap spec-driven. Componente `components/ds/auth-card.tsx` estava sem spec em `docs/specs`. Base: template `docs/templates/component-spec.md`.

---

## Propósito

Componente `auth-card` — shell unificado de autenticação (centered/muted/split/cover) que consolida login-01..05 e signup.

**Usar quando:** compor páginas/layouts que precisam de auth-card.
**Não usar quando:** um primitivo `components/ui` isolado já resolve.
**Alternativa:** compor com primitivos `Card`, `Button`, `Skeleton`.

---

## Localização

| Campo      | Valor                         |
| ---------- | ----------------------------- |
| Arquivo    | `components/ds/auth-card.tsx` |
| Tipo       | `registry:block`              |
| Categoria  | `Form`                        |
| Depende de | card, skeleton                |

---

## API — Props

| Prop          | Tipo              | Padrão    | Obrigatória | Descrição |
| ------------- | ----------------- | --------- | ----------- | --------- |
| `mode`        | `"login"          | "signup"` | —           |           |     |
| `title`       | `string`          | —         |             |           |
| `description` | `string`          | —         |             |           |
| `imageSrc`    | `string`          | —         |             |           |
| `imageAlt`    | `string`          | —         |             |           |
| `logo`        | `React.ReactNode` | —         |             |           |
| `appName`     | `string`          | —         |             |           |
| `locale`      | `UILocale`        | —         |             |           |
| `loading`     | `boolean`         | —         |             |           |

> Estende `HTMLAttributes<HTMLDivElement>` + `VariantProps<typeof *Variants>` quando houver CVA.

---

## Variantes CVA

| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `default`, `muted` | `default` |

**Slots:** `authCardVariants`

---

## Tokens de design utilizados

| Token                     | Slot |
| ------------------------- | ---- |
| `bg-muted`                | —    |
| `bg-primary`              | —    |
| `text-muted-foreground`   | —    |
| `text-primary`            | —    |
| `text-primary-foreground` | —    |

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
| i18n      | `UI_I18N[locale].authcard`                  |

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
