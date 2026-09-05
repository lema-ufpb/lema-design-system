# ds-footer-simple

> Bloco de rodapé minimalista e centralizado com logotipo, navegação horizontal, links sociais e copyright.

## 1. Visão Geral

Inspirado nos blocos `footer-16` e `footer-09` do Blockus, o `FooterSimple` oferece um rodapé direto e elegante, ideal para ferramentas web, páginas de produto focadas, dashboards e telas utilitárias que não demandam árvores extensas de navegação.

## 2. Anatomia

```
<footer class="w-full border-t border-border bg-background py-10">
  <div class="container mx-auto flex flex-col items-center gap-6 text-center">
    <div class="brand">{brandLogo}</div>
    <nav aria-label="Rodapé">{navLinks}</nav>
    <SocialLinks links={socialLinks} />
    <FooterBottomBar ... />
  </div>
</footer>
```

## 3. Propriedades (API)

| Prop          | Tipo                                     | Padrão      | Descrição                          |
| ------------- | ---------------------------------------- | ----------- | ---------------------------------- |
| `brand`       | `React.ReactNode`                        | `undefined` | Elemento de marca / logo           |
| `links`       | `Array<{ label: string; href: string }>` | `[]`        | Links de navegação horizontal      |
| `socialLinks` | `SocialLinkItem[]`                       | `[]`        | Lista de canais sociais            |
| `statusBadge` | `boolean`                                | `false`     | Se deve exibir o SystemStatusBadge |
| `locale`      | `UILocale`                               | `"pt-BR"`   | Localização                        |
| `className`   | `string`                                 | `undefined` | Classes adicionais                 |

## 4. Acessibilidade

- Elemento semântico `<footer>` como landmark principal.
- Links com tags semânticas `<a>` organizados em listas de navegação `<nav>`.
- Ordem lógica de tabulação por teclado.

## 5. Stories Obrigatórias

1. `Default`: Layout centralizado clássico.
2. `WithStatusBadge`: Adição do status operacional em tempo real.
3. `Locales`: Renderização nos idiomas suportados.
