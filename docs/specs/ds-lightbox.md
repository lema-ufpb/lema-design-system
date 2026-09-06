# Spec: ds-lightbox

> Lightbox (visualizador de imagem em tela cheia).

---

## Propósito

Diálogo de imagem em tela cheia com navegação anterior/próxima, setas do teclado e tira de miniaturas — para uso com `ds-image-gallery` (cada item chama `onIndexChange`+`open` ao clicar).

**Usar quando:** Quiser que o usuário amplie uma imagem da galeria em tela cheia.
**Não usar quando:** For vídeo — use `ds-video-dialog`.

---

## Localização

| Campo      | Valor                               |
| ---------- | ----------------------------------- |
| Arquivo    | `components/ds/lightbox.tsx`        |
| Tipo       | `registry:ui` (name: `ds-lightbox`) |
| Categoria  | `Data Display`                      |
| Depende de | `dialog`, `button`, `lucide-react`  |

---

## API — Props

| Prop             | Tipo                      | Padrão    | Obrigatória | Descrição                       |
| ---------------- | ------------------------- | --------- | ----------- | ------------------------------- |
| `images`         | `LightboxImage[]`         | —         | ✓           | `{ src, alt, caption? }`        |
| `index`          | `number`                  | —         | ✓           | Índice atual (controlado)       |
| `open`           | `boolean`                 | —         | ✓           | Estado do diálogo (controlado)  |
| `onOpenChange`   | `(open: boolean) => void` | —         | ✓           | Callback ao abrir/fechar        |
| `onIndexChange`  | `(index: number) => void` | —         | ✓           | Callback ao navegar             |
| `showThumbnails` | `boolean`                 | `true`    |             | Mostra a tira de miniaturas     |
| `locale`         | `UILocale`                | `"en-US"` |             | Locale das strings de navegação |

---

## Comportamentos e estados

| Estado                   | Comportamento esperado                                          |
| ------------------------ | --------------------------------------------------------------- |
| `ArrowLeft`/`ArrowRight` | Navega para a imagem anterior/próxima                           |
| `Escape`                 | Fecha o diálogo (comportamento nativo do `Dialog`)              |
| `images.length === 1`    | Setas de navegação e contador não são renderizados              |
| Clique em miniatura      | Navega diretamente para aquele índice (`aria-current` no ativo) |

---

## Acessibilidade

| Requisito          | Implementação                                                 |
| ------------------ | ------------------------------------------------------------- |
| Título do diálogo  | `DialogTitle className="sr-only"` com o `alt` da imagem atual |
| Setas de navegação | `aria-label` via `UI_I18N[locale].lightbox.{previous,next}`   |
| Miniaturas         | `aria-label={alt}` + `aria-current` no item ativo             |
| Foco/teclado       | Herdado do `Dialog` (focus trap, `Escape` fecha)              |
| i18n               | `UI_I18N[locale].lightbox.*`                                  |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `SingleImage`

---

## Checklist antes de implementar

- [x] `aria-label` em toda ação de navegação
- [x] Prop `locale` integrada via `UI_I18N`
- [x] `tabular-nums` no contador
