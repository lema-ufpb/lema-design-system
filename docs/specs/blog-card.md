# Spec: BlogCard

> Card de post com imagem, categoria, título, excerpt, meta e autor — átomo base blockus blog.

---

## Propósito

Card reuso em grid, lista e featured hero. Unifica `Card`, `Badge`, `Avatar`.

**Usar quando:** Listar posts em blog, news, updates.
**Não usar quando:** Hero complexo (usar `BlogFeatured`).

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/blog-card.tsx`                    |
| Tipo       | `registry:ui` (name: `ds-blog-card`)             |
| Categoria  | Data Display / Blog                              |
| Depende de | `Card`, `Badge`, `Avatar`, `Skeleton`, `UI_I18N` |

---

## API — Props

| Prop           | Tipo                       | Padrão    | Descrição                      |
| -------------- | -------------------------- | --------- | ------------------------------ |
| `title`        | `string`                   | ✓         | Título `truncate line-clamp-2` |
| `excerpt`      | `string`                   | —         | Resumo `line-clamp-2`          |
| `imageSrc`     | `string`                   | —         | Cover `aspect 16/10`           |
| `imageAlt`     | `string`                   | `title`   | Alt                            |
| `category`     | `string`                   | —         | Badge                          |
| `categoryHref` | `string`                   | —         | Link categoria                 |
| `href`         | `string`                   | —         | Link post                      |
| `author`       | `{name, avatarUrl, href?}` | —         | BlogAuthor                     |
| `publishedAt`  | `string \| Date`           | —         | Data                           |
| `readingTime`  | `number`                   | —         | Minutos                        |
| `tags`         | `string[]`                 | —         | Até 3 badges                   |
| `featured`     | `boolean`                  | `false`   | Borda destaque                 |
| `size`         | `"sm" \| "md" \| "lg"`     | `"md"`    | Tipografia                     |
| `locale`       | `UILocale`                 | `"en-US"` | i18n                           |
| `loading`      | `boolean`                  | `false`   | Skeleton                       |

---

## Variantes CVA

| Dimensão   | Valores                                                  | Padrão  |
| ---------- | -------------------------------------------------------- | ------- |
| `size`     | `sm` image `aspect-video h-32`, `md` `h-44`, `lg` `h-56` | `md`    |
| `featured` | `true` `ring-1 ring-primary/20 shadow-md`                | `false` |

Slots: `blogCardVariants`, `blogCardImageVariants`, `blogCardTitleVariants`, `blogCardExcerptVariants`.

---

## Tokens

| Token                                | Slot                                         |
| ------------------------------------ | -------------------------------------------- |
| `bg-card text-card-foreground`       | Card                                         |
| `text-foreground font-semibold`      | title `text-sm md:text-base`                 |
| `text-muted-foreground`              | excerpt `text-xs sm:text-sm`, meta `text-xs` |
| `bg-primary text-primary-foreground` | featured ring                                |
| `bg-muted`                           | skeleton                                     |

---

## Escala

| Slot    | sm                                   | md                        | lg                      |
| ------- | ------------------------------------ | ------------------------- | ----------------------- |
| Title   | `text-sm font-semibold line-clamp-2` | `text-base font-semibold` | `text-lg font-semibold` |
| Excerpt | `text-xs line-clamp-2`               | `text-sm line-clamp-2`    | `text-sm`               |
| Image   | `h-32`                               | `h-44`                    | `h-56`                  |
| Badge   | `text-[10px] h-5`                    | `text-xs h-6`             | `text-xs`               |

---

## Comportamentos

| Estado     | Comportamento                                                        |
| ---------- | -------------------------------------------------------------------- |
| `loading`  | `Skeleton` image + `h-4 w-3/4` title + `h-3 w-full` excerpt + avatar |
| `href`     | Card inteiro `<a>` focus ring                                        |
| `category` | `Badge variant outline`                                              |
| `featured` | `ring-primary/20` + `Badge Featured`                                 |

---

## Acessibilidade

| Requisito        | Implementação                        |
| ---------------- | ------------------------------------ |
| Imagem           | `alt` obrigatório                    |
| Link             | `aria-label=title`                   |
| `AvatarFallback` | obrigatório                          |
| Title            | `line-clamp-2` + `truncate` fallback |

---

## Stories

- [ ] `Default` — image + category + title + excerpt + author
- [ ] `AllSizes` — sm/md/lg
- [ ] `Featured`
- [ ] `WithoutImage`
- [ ] `Loading`

---

## Checklist

- [x] `size-*` avatar, `truncate` title, `tabular-nums` readingTime
