# ds-values-card

> Cartão atômico de princípio ou valor institucional com ícone em container semântico, índice ordinal, título, descrição e variantes visuais.

## 1. Visão Geral

Inspirado nos blocos `about-01`, `about-05` e `about-07` do Blockus, o `ValuesCard` encapsula a apresentação de princípios e valores institucionais (como Excelência, Ética, Inovação, Acessibilidade). Suporta badges ordinais ("01", "02"), ícones flexíveis do Lucide, e variantes de estilo (`default`, `outline`, `accent`, `muted`).

## 2. Anatomia

```
<div class="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all ...">
  <div class="flex items-center justify-between">
    <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
      {icon}
    </div>
    <span class="text-xs font-semibold tabular-nums text-muted-foreground">{index}</span>
  </div>
  <h3 class="mt-4 text-base font-semibold text-foreground">{title}</h3>
  <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
</div>
```

## 3. Propriedades (API)

| Prop          | Tipo                                            | Padrão          | Descrição                                |
| ------------- | ----------------------------------------------- | --------------- | ---------------------------------------- |
| `title`       | `string`                                        | **obrigatório** | Nome do princípio ou valor               |
| `description` | `string`                                        | **obrigatório** | Descrição do princípio                   |
| `icon`        | `React.ComponentType<{ className?: string }>`   | `undefined`     | Ícone do princípio (Lucide)              |
| `index`       | `string \| number`                              | `undefined`     | Indicador numérico/ordinal (ex: "01", 1) |
| `variant`     | `"default" \| "outline" \| "accent" \| "muted"` | `"default"`     | Estilo de superfície                     |
| `className`   | `string`                                        | `undefined`     | Classes CSS adicionais                   |

## 4. Acessibilidade

- Container semântico estruturado para listas e grids de leitura rápida.
- Relação de contraste adequada em todas as variantes de superfície.
- Foco e hover suaves sem depender unicamente de cor.

## 5. Stories Obrigatórias

1. `Default`: Cartão com ícone, índice e conteúdo padrão.
2. `AllVariants`: Comparativo entre `default`, `outline`, `accent` e `muted`.
3. `WithIndex`: Cartão destacando a numeração sequencial.
4. `WithoutIcon`: Cartão minimalista baseado em texto e numeração.
