# ds-culture-gallery

> Mosaico e grade visual da cultura institucional, vida no laboratório e equipe em ação com legendas discretas e cantos curvos.

## 1. Visão Geral

Inspirado nos blocos `about-05`, `about-06` e `about-11` do Blockus, o `CultureGallery` oferece um mosaico fotográfico da atmosfera de trabalho, pesquisa científica e integração da equipe. Suporta layouts assimétricos (bento-style) e grade uniforme com legendas flutuantes e transição suave no hover.

## 2. Anatomia

```
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="group relative overflow-hidden rounded-2xl border border-border bg-muted">
    <img src={item.image} alt={item.alt} class="w-full h-full object-cover transition-transform group-hover:scale-105" />
    <div class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <p class="absolute bottom-3 left-3 text-xs text-foreground font-medium">{item.caption}</p>
    </div>
  </div>
</div>
```

## 3. Propriedades (API)

| Prop        | Tipo                   | Padrão          | Descrição                                           |
| ----------- | ---------------------- | --------------- | --------------------------------------------------- |
| `items`     | `CultureGalleryItem[]` | **obrigatório** | Lista de fotos da galeria com imagem, alt e legenda |
| `layout`    | `"mosaic" \| "grid"`   | `"mosaic"`      | Estilo de distribuição das imagens                  |
| `className` | `string`               | `undefined`     | Classes adicionais                                  |

## 4. Acessibilidade

- Todos os elementos de imagem exigem texto descritivo `alt`.
- Legendas são associadas visualmente e acessíveis para sintetizadores de voz.

## 5. Stories Obrigatórias

1. `Default`: Mosaico assimétrico de 4 fotos institucionais.
2. `GridLayout`: Grade simétrica de 3 colunas.
