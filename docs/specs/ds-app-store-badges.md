# Spec: ds-app-store-badges

> App Store Badges (botões de download App Store / Google Play).

---

## Propósito

Botões de download para App Store e Google Play, com texto e ícone sobrescrevíveis por link (para uso com marcas oficiais quando necessário). Inspirado no bloco "App-store hero" do blockus.

**Usar quando:** Hero ou seção de produto anunciando um app mobile.
**Não usar quando:** Precisar de um botão de download genérico de arquivo — use `Button` padrão.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/app-store-badges.tsx`        |
| Tipo       | `registry:ui` (name: `ds-app-store-badges`) |
| Categoria  | `Actions`                                   |
| Depende de | `lucide-react`                              |

---

## API — Props

### `AppStoreBadges`

| Prop    | Tipo                   | Padrão | Descrição                    |
| ------- | ---------------------- | ------ | ---------------------------- |
| `links` | `AppStoreBadgeLink[]`  | —      | Lista de badges a renderizar |
| `size`  | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho do badge             |

### `AppStoreBadgeLink`

| Campo       | Tipo                  | Descrição                                                        |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| `href`      | `string`              | URL da loja                                                      |
| `store`     | `"apple" \| "google"` | Define ícone e texto padrão                                      |
| `eyebrow`   | `string`              | Sobrescreve a linha pequena (ex: "Download on the")              |
| `storeName` | `string`              | Sobrescreve o nome em negrito (ex: "App Store")                  |
| `icon`      | `React.ElementType`   | Sobrescreve o ícone padrão (use uma marca oficial se necessário) |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots:** `appStoreBadgeVariants`, `appStoreBadgeEyebrowVariants`, `appStoreBadgeNameVariants`.

> Escala própria de badge de marketing (`h-10`/`h-12`/`h-14`) — não segue a tabela de alturas de controles interativos (`xs..xl`), pois não é um controle de formulário.

---

## Tokens de design utilizados

| Token                             | Slot                                   |
| --------------------------------- | -------------------------------------- |
| `bg-foreground`/`text-background` | badge (fundo escuro em ambos os temas) |
| `ring-ring`                       | foco visível                           |

---

## Comportamentos e estados

| Estado               | Comportamento esperado                              |
| -------------------- | --------------------------------------------------- |
| `icon` não fornecido | Usa `Apple`/`PlayCircle` (lucide) como ícone padrão |
| Múltiplos `links`    | Renderizados lado a lado com `flex-wrap`            |

---

## Acessibilidade

| Requisito    | Implementação                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Link         | `aria-label` combinando `eyebrow` + `storeName` (texto visível já duplica, mas reforça contexto para leitores de tela) |
| Ícone        | `aria-hidden="true"`                                                                                                   |
| Foco visível | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`                                             |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `AppleOnly`

---

## Checklist antes de implementar

- [x] Tokens semânticos apenas
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] `aria-label` em todo link
