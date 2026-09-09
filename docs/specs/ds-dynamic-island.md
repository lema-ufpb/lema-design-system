# Spec: ds-dynamic-island

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

**Usar quando:** Você tem processos contínuos ou de fundo (uploading, chamadas em andamento, salvamento, reprodução de mídia) que precisam de um indicador visual contínuo e não intrusivo (pílula), que pode se expandir em um card para revelar detalhes.
**Não usar quando:** Para simples notificações efêmeras que desaparecem rápido.
**Alternativa se não se aplicar:** Toast, Notification Center ou Banners globais.

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/dynamic-island.tsx` |
| Tipo       | `registry:ui`                      |
| Categoria  | `Feedback`                         |
| Depende de | framer-motion, cn, lucide-react    |

---

## API — Props

| Prop        | Tipo                                                   | Padrão      | Obrigatória | Descrição                      |
| ----------- | ------------------------------------------------------ | ----------- | ----------- | ------------------------------ |
| `state`     | `"idle" \| "compact" \| "expanded"`                    | `"idle"`    |             | Estado atual do componente     |
| `intent`    | `"default" \| "success" \| "warning" \| "destructive"` | `"default"` |             | Intenção/Cor de fundo          |
| `size`      | `"sm" \| "md" \| "lg"`                                 | `"md"`      |             | Tamanho base do componente     |
| `className` | `string`                                               | —           |             | Classes extras de layout       |
| `children`  | `ReactNode`                                            | —           |             | Conteúdo expandido (slot)      |
| `icon`      | `ReactNode`                                            | —           |             | Ícone (modo compacto)          |
| `title`     | `ReactNode`                                            | —           |             | Título principal               |
| `subtitle`  | `ReactNode`                                            | —           |             | Subtítulo ou valor             |
| `onClick`   | `() => void`                                           | —           |             | Ação ao clicar (para expandir) |

---

## Variantes CVA

| Dimensão | Valores                                        | Padrão    |
| -------- | ---------------------------------------------- | --------- |
| `size`   | `sm`, `md`, `lg`                               | `md`      |
| `intent` | `default`, `success`, `warning`, `destructive` | `default` |

**Slots do componente**:

- `islandVariants` — wrapper principal
- `iconVariants` — container do ícone
- `titleVariants` — texto primário
- `subtitleVariants` — texto secundário

---

## Tokens de design utilizados

| Token                                            | Slot onde é usado                   |
| ------------------------------------------------ | ----------------------------------- |
| `bg-foreground` / `text-background`              | Fundo principal da ilha (dark pill) |
| `bg-success` / `text-success-foreground`         | Variante success                    |
| `bg-warning` / `text-warning-foreground`         | Variante warning                    |
| `bg-destructive` / `text-destructive-foreground` | Variante destructive                |
| `text-muted`                                     | Subtítulo                           |
| `bg-muted/20`                                    | Hover/Active effects                |

---

## Escala tipográfica e de tamanho

| Slot             | sm                        | md                    | lg                      |
| ---------------- | ------------------------- | --------------------- | ----------------------- |
| Title text       | `text-xs font-medium`     | `text-sm font-medium` | `text-base font-medium` |
| Subtitle text    | `text-[10px] font-normal` | `text-xs font-normal` | `text-sm font-normal`   |
| Altura (compact) | `h-8`                     | `h-10`                | `h-12`                  |
| Ícone            | `size-3.5`                | `size-4`              | `size-5`                |

---

## Comportamentos e estados

| Estado             | Comportamento esperado                                                                  |
| ------------------ | --------------------------------------------------------------------------------------- |
| `state="idle"`     | Ilha oculta ou ultra minimalista (apenas 1 ícone/dot)                                   |
| `state="compact"`  | Formato pílula. Mostra ícone, titulo truncado e subtítulo animado. Clique para expandir |
| `state="expanded"` | Expande usando framer-motion `layout`. Renderiza `children`.                            |
| Hover              | Leve escalonamento `scale-[1.02]` se interativo                                         |

---

## Acessibilidade

| Requisito      | Implementação                                    |
| -------------- | ------------------------------------------------ |
| Role semântico | `role="status"` ou `role="region"`               |
| Rótulo         | `aria-label="Dynamic Status"`                    |
| Live region    | `aria-live="polite"` para o texto da notificação |

---

## Stories obrigatórias no Storybook

- [x] `Default` — estado compacto padrão
- [x] `Interactive` — botão para alternar entre idle/compact/expanded
- [x] `AllSizes` — sm, md, lg
- [x] `AllIntents` — default, success, warning, destructive
- [x] `MusicPlayer` — exemplo de conteúdo expandido rico (ex: controles de áudio)
- [x] `UploadProgress` — exemplo de estado de carregamento com progress bar

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos
- [x] Todo `cva()` tem `defaultVariants`
- [x] Todos os `*Variants` são exportados
- [x] `tabular-nums` em valores numéricos
- [x] `truncate` em labels
- [x] `aria-label` e `role="status"` aplicados
- [x] `cn()` para classes
- [x] Spacing via Tailwind steps
