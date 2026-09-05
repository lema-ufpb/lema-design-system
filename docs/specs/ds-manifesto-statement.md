# ds-manifesto-statement

> Declaração de manifesto institucional de impacto com tipografia editorial grande, suporte a destaque de palavras-chave e citação autoral.

## 1. Visão Geral

Inspirado nos blocos `about-03`, `about-04` e `about-08` do Blockus, o `ManifestoStatement` entrega um impacto visual tipográfico marcante. É utilizado para declarações de propósito central, crenças fundamentais e visão filosófica da instituição, com opções de tamanho tipográfico arrojado (`lg`, `xl`, `2xl`) e realce de termos-chave com fundo gradiente sutil ou cor semântica.

## 2. Anatomia

```
<div class="relative flex flex-col items-start gap-4">
  <p class="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
  <blockquote class="text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
    {statement}
  </blockquote>
  <p class="text-sm font-medium text-muted-foreground">{author}</p>
</div>
```

## 3. Propriedades (API)

| Prop        | Tipo                        | Padrão          | Descrição                                 |
| ----------- | --------------------------- | --------------- | ----------------------------------------- |
| `statement` | `React.ReactNode`           | **obrigatório** | Frase ou texto do manifesto               |
| `eyebrow`   | `string`                    | `undefined`     | Sobretítulo ou categoria do manifesto     |
| `author`    | `string`                    | `undefined`     | Autor, liderança ou instituição associada |
| `size`      | `"default" \| "lg" \| "xl"` | `"default"`     | Escala tipográfica do texto               |
| `align`     | `"left" \| "center"`        | `"left"`        | Alinhamento do texto                      |
| `className` | `string`                    | `undefined`     | Classes CSS adicionais                    |

## 4. Acessibilidade

- Utiliza a tag semântica `<blockquote>` com tipografia legível e contraste WCAG AAA.
- Espaçamento entre linhas ajustado para não cansar a leitura.

## 5. Stories Obrigatórias

1. `Default`: Declaração padrão com alinhamento à esquerda.
2. `Centered`: Declaração centralizada com eyebrow e autor.
3. `Large`: Escala `xl` com termos destacados.
