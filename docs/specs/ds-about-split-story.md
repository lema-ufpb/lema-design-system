# ds-about-split-story

> Seção turnkey de narrativa institucional dividida em duas colunas: texto de história com badge de missão e mídia/fotografia emoldurada com badge de destaque.

## 1. Visão Geral

Inspirado nos blocos `about-01`, `about-02` e `about-06` do Blockus, o `AboutSplitStory` é a seção fundamental de "Quem Somos". Apresenta em uma coluna a narrativa histórica, pilares e botões de ação (ex: "Conheça nossos projetos"), enquanto a outra coluna exibe a fotografia do laboratório ou campus com um badge flutuante de métrica ou conquista.

## 2. Anatomia

```
<section class="relative w-full py-16 md:py-24">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <!-- Coluna de Texto -->
    <div class="flex flex-col items-start gap-6">
      <Badge variant="outline">{badge}</Badge>
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <p class="text-base text-muted-foreground leading-relaxed">{description}</p>
      <div class="flex items-center gap-4">{actions}</div>
    </div>
    <!-- Coluna de Imagem / Mídia -->
    <div class="relative">
      <img src={image} alt={imageAlt} class="rounded-3xl object-cover shadow-xl" />
      <div class="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur-md">
        {floatingCard}
      </div>
    </div>
  </div>
</section>
```

## 3. Propriedades (API)

| Prop                | Tipo                                                     | Padrão          | Descrição                                        |
| ------------------- | -------------------------------------------------------- | --------------- | ------------------------------------------------ |
| `title`             | `string`                                                 | **obrigatório** | Título principal da história                     |
| `description`       | `string`                                                 | **obrigatório** | Narrativa detalhada da instituição               |
| `badge`             | `string`                                                 | `undefined`     | Texto do badge superior (ex: "Nossa Trajetória") |
| `imageSrc`          | `string`                                                 | **obrigatório** | URL da fotografia institucional                  |
| `imageAlt`          | `string`                                                 | **obrigatório** | Texto alternativo da imagem                      |
| `floatingBadgeText` | `string`                                                 | `undefined`     | Texto de destaque do badge flutuante             |
| `primaryAction`     | `{ label: string; href?: string; onClick?: () => void }` | `undefined`     | Ação principal                                   |
| `reverse`           | `boolean`                                                | `false`         | Inverter ordem das colunas (imagem à esquerda)   |
| `locale`            | `UILocale`                                               | `"pt-BR"`       | Idioma                                           |
| `className`         | `string`                                                 | `undefined`     | Classes adicionais                               |

## 4. Acessibilidade

- Imagens com textos alternativos semânticos.
- Botões acessíveis via teclado e leitores de tela.

## 5. Stories Obrigatórias

1. `Default`: Narrativa padrão com imagem à direita e badge flutuante.
2. `Reversed`: Coluna de imagem à esquerda.
3. `Locales`: Exibição em inglês, espanhol e francês.
