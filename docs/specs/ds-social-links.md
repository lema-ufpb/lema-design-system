# ds-social-links

> Linha ou grupo flexível de canais sociais e comunitários com rótulos acessíveis, variantes visuais e detecção de ícones.

## 1. Visão Geral

O `SocialLinks` renderiza uma lista horizontal acessível de canais sociais (GitHub, X/Twitter, LinkedIn, YouTube, Instagram, Discord, Bluesky, Mastodon, WhatsApp e Email) com suporte a tamanhos, formatos e estilos visuais consistentes com o LEMA Design System.

## 2. Anatomia

```
<nav aria-label="...">
  <ul class="flex items-center gap-...">
    <li>
      <a href="..." aria-label="..." title="...">
        <Icon />
      </a>
    </li>
  </ul>
</nav>
```

## 3. Propriedades (API)

| Prop        | Tipo                                | Padrão      | Descrição                                      |
| ----------- | ----------------------------------- | ----------- | ---------------------------------------------- |
| `links`     | `SocialLinkItem[]`                  | `[]`        | Lista de links sociais (platform, href, label) |
| `variant`   | `"ghost" \| "outline" \| "muted"`   | `"ghost"`   | Estilo visual dos botões                       |
| `size`      | `"sm" \| "md" \| "lg"`              | `"md"`      | Dimensão dos botões e ícones                   |
| `shape`     | `"circle" \| "rounded" \| "square"` | `"circle"`  | Formato das bordas do botão                    |
| `className` | `string`                            | `undefined` | Classes adicionais do container                |

## 4. Variantes

- **`variant`**:
  - `ghost`: Fundo transparente, hover com `bg-muted` e `text-foreground`.
  - `outline`: Borda `border-border`, hover com `bg-muted` e `border-foreground/20`.
  - `muted`: Fundo `bg-muted/60`, texto `text-muted-foreground`, hover com `bg-muted` e `text-foreground`.
- **`size`**:
  - `sm`: Botão `size-7`, ícone `size-3.5`.
  - `md`: Botão `size-8`, ícone `size-4`.
  - `lg`: Botão `size-9`, ícone `size-4.5`.
- **`shape`**:
  - `circle`: `rounded-full`
  - `rounded`: `rounded-lg`
  - `square`: `rounded-none`

## 5. Acessibilidade

- Container encapsulado em `<nav aria-label="Canais e redes sociais">` e estrutura de lista `<ul>`/`<li>`.
- Cada link possui `aria-label` descritivo com o nome da rede, atributo `title` para tooltips nativos e `rel="noreferrer noopener"`.
- Suporte a navegação completa por teclado com anel de foco `focus-visible:ring-2`.

## 6. Stories Obrigatórias

1. `Default`: Conjunto padrão de redes sociais (GitHub, X, LinkedIn, YouTube).
2. `AllVariants`: Comparação visual entre `ghost`, `outline` e `muted`.
3. `AllSizes`: Comparação entre `sm`, `md` e `lg`.
4. `Shapes`: Comparação entre `circle`, `rounded` e `square`.
