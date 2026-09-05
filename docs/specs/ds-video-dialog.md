# Spec: VideoDialog

---

## Propósito

Thumbnail de vídeo ou demo de produto com overlay interativo, botão play pulsante e abertura de modal responsivo em `<Dialog>` acessível do Radix / shadcn.

**Usar quando:** Apresentar vídeo de demonstração, trailer do produto ou explicação interativa na seção hero.
**Não usar quando:** O vídeo precisa tocar diretamente em background sem som (usar `<video autoplay muted loop>`).
**Alternativa se não se aplicar:** `Dialog` genérico com iframe embed.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/video-dialog.tsx`                 |
| Tipo       | `registry:ui`                                    |
| Categoria  | `Media`                                          |
| Depende de | `Dialog` (`components/ui/dialog.tsx`), `UI_I18N` |

---

## API — Props

| Prop           | Tipo                                 | Padrão      | Obrigatória | Descrição                                      |
| -------------- | ------------------------------------ | ----------- | ----------- | ---------------------------------------------- |
| `videoSrc`     | `string`                             | —           | [x]         | URL do vídeo embed (YouTube, Vimeo, MP4, etc.) |
| `thumbnailSrc` | `string`                             | —           | [x]         | URL da imagem de capa/preview                  |
| `thumbnailAlt` | `string`                             | —           |             | Texto alternativo da imagem de capa            |
| `title`        | `string`                             | —           |             | Título do vídeo para acessibilidade/diálogo    |
| `variant`      | `"default" \| "minimal" \| "glow"`   | `"default"` |             | Estilo visual do botão play e moldura          |
| `aspectRatio`  | `"16/9" \| "4/3" \| "1/1" \| "21/9"` | `"16/9"`    |             | Proporção de tela da preview e do modal        |
| `locale`       | `Locale`                             | `"pt-BR"`   |             | Idioma para textos de suporte e aria-label     |
| `className`    | `string`                             | —           |             | Classes extras                                 |

---

## Variantes CVA

| Dimensão  | Valores                      | Padrão    |
| --------- | ---------------------------- | --------- |
| `variant` | `default`, `minimal`, `glow` | `default` |

---

## Acessibilidade

- [x] Botão trigger possui `aria-label` descritivo (ex: "Assistir vídeo: [title]").
- [x] Modal utiliza `DialogTitle` para identificação obrigatória pelo Radix UI / Axe.
- [x] Foco gerenciado automaticamente ao abrir e fechar a caixa de diálogo.
- [x] Tecla `Escape` fecha o modal.
