# ds-about-values-grid

> Bloco turnkey de apresentação dos valores e princípios organizacionais com cabeçalho de seção e grid responsivo de `ValuesCard`.

## 1. Visão Geral

Inspirado nos blocos `about-05` e `about-07` do Blockus, o `AboutValuesGrid` estrutura a seção completa de princípios fundamentais. Inclui cabeçalho de seção com título, subtítulo e badge, acompanhado de uma grade de 2, 3 ou 4 colunas de `ValuesCard`.

## 2. Anatomia

```
<section class="w-full py-16 md:py-24">
  <div class="container mx-auto flex flex-col gap-12">
    <!-- Cabeçalho -->
    <div class="flex flex-col items-center text-center max-w-2xl mx-auto gap-4">
      <Badge variant="outline">{badge}</Badge>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p class="text-muted-foreground text-base">{description}</p>
    </div>
    <!-- Grid de Valores -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => <ValuesCard ... />)}
    </div>
  </div>
</section>
```

## 3. Propriedades (API)

| Prop          | Tipo                | Padrão          | Descrição                       |
| ------------- | ------------------- | --------------- | ------------------------------- |
| `title`       | `string`            | **obrigatório** | Título da seção de valores      |
| `description` | `string`            | `undefined`     | Subtítulo ou texto introdutório |
| `badge`       | `string`            | `undefined`     | Badge temático                  |
| `values`      | `ValuesCardProps[]` | **obrigatório** | Lista de valores para os cards  |
| `columns`     | `2 \| 3 \| 4`       | `3`             | Número de colunas no desktop    |
| `locale`      | `UILocale`          | `"pt-BR"`       | Idioma                          |
| `className`   | `string`            | `undefined`     | Classes adicionais              |

## 4. Acessibilidade

- Estrutura clara de cabeçalho `<h2>` e títulos `<h3>` em cada cartão.
- Grid responsivo que reorganiza de forma limpa em telas móveis.

## 5. Stories Obrigatórias

1. `Default`: Grid de 3 colunas com 6 valores fundamentais.
2. `TwoColumns`: Grid de 2 colunas para cards com descrições mais longas.
3. `Locales`: Tradução multilíngue do cabeçalho.
