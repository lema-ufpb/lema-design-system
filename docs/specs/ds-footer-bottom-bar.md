# ds-footer-bottom-bar

> Faixa inferior atômica com copyright dinâmico, links legais, theme toggle e status operacional.

## 1. Visão Geral

O `FooterBottomBar` padroniza a terminação visual das páginas web, organizando o copyright com ano dinâmico, links jurídicos (Termos, Privacidade, Cookies), slots para alternador de tema e status operacional.

## 2. Anatomia

```
<div class="flex flex-col gap-4 pt-6 border-t border-border sm:flex-row sm:items-center sm:justify-between ...">
  <div class="flex items-center gap-4 text-xs text-muted-foreground">
    <p>© {year} {brandName}. {t.allRightsReserved}</p>
    <nav aria-label="Links legais">...</nav>
  </div>
  <div class="flex items-center gap-3">
    {children}
  </div>
</div>
```

## 3. Propriedades (API)

| Prop         | Tipo               | Padrão                     | Descrição                                            |
| ------------ | ------------------ | -------------------------- | ---------------------------------------------------- |
| `brandName`  | `string`           | `"LEMA"`                   | Nome da instituição / marca                          |
| `year`       | `number \| string` | `new Date().getFullYear()` | Ano do copyright                                     |
| `legalLinks` | `LegalLinkItem[]`  | `[]`                       | Lista de links legais (label, href)                  |
| `children`   | `React.ReactNode`  | `undefined`                | Slot para ações direitas (ToggleTheme, Status, etc.) |
| `locale`     | `UILocale`         | `"pt-BR"`                  | Idioma para textos automáticos                       |
| `className`  | `string`           | `undefined`                | Classes CSS extras                                   |

## 4. Acessibilidade

- Links legais com sublinhado ou destaque no hover, contraste WCAG AA (`text-muted-foreground hover:text-foreground`).
- Navegação dos links legais em `<nav aria-label="Links legais">`.
- Suporte a navegação por teclado e foco visível.

## 5. Stories Obrigatórias

1. `Default`: Copyright simples com links legais padrão (Privacidade, Termos, Cookies).
2. `WithActions`: Inclusão de ToggleTheme e SystemStatusBadge no slot direito.
3. `Locales`: Demonstração nos 4 idiomas suportados.
