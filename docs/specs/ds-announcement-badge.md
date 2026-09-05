# Spec: AnnouncementBadge

---

## Propósito

Badge clicável ou informativo de anúncio localizado no topo de seções hero ou cabeçalhos de página, ideal para novidades de produto, versões lançadas ou avisos importantes.

**Usar quando:** Destacar lançamentos, changelogs, chamadas para ação promocionais no topo do Hero.
**Não usar quando:** Apenas rotular categorias ou status passivos (usar `Badge`).
**Alternativa se não se aplicar:** `Badge` primitivo ou `Callout`.

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/announcement-badge.tsx` |
| Tipo       | `registry:ui`                          |
| Categoria  | `Actions`                              |
| Depende de | `Badge` (`components/ui/badge.tsx`)    |

---

## API — Props

| Prop        | Tipo                                             | Padrão      | Obrigatória | Descrição                                 |
| ----------- | ------------------------------------------------ | ----------- | ----------- | ----------------------------------------- |
| `variant`   | `"default" \| "outline" \| "glow" \| "gradient"` | `"default"` |             | Estilo visual do anúncio                  |
| `size`      | `"sm" \| "md" \| "lg"`                           | `"md"`      |             | Escala de tamanho                         |
| `ping`      | `boolean`                                        | `false`     |             | Exibe ponto com animação pulsante         |
| `href`      | `string`                                         | —           |             | Link de destino opcional                  |
| `icon`      | `React.ReactNode`                                | —           |             | Ícone customizado opcional                |
| `showArrow` | `boolean`                                        | `true`      |             | Exibe seta indicativa com hover animation |
| `className` | `string`                                         | —           |             | Classes extras                            |

---

## Variantes CVA

| Dimensão  | Valores                                  | Padrão    |
| --------- | ---------------------------------------- | --------- |
| `variant` | `default`, `outline`, `glow`, `gradient` | `default` |
| `size`    | `sm`, `md`, `lg`                         | `md`      |

- `announcementBadgeVariants` — wrapper interativo (focus ring, backdrop blur, rounded-full)

---

## Acessibilidade

- [x] Teclado: foco com `focus-visible:ring-ring`
- [x] Screen reader: sem texto escondido redundante; `ping` é `aria-hidden="true"`
