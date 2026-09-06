# ds-footer-mega

> Rodapé institucional e corporativo completo com múltiplas colunas de links, resumo de missão, newsletter e barra inferior.

## 1. Visão Geral

Inspirado nos blocos `footer-01` e `footer-18` do Blockus, o `FooterMega` reúne todos os pilares essenciais de um portal universitário ou produto SaaS: identidade visual, resumo institucional da UFPB / LEMA, colunas de navegação (responsivas em mobile via accordion), captura de newsletter, badges de download e rodapé jurídico completo.

## 2. Anatomia

```
<footer class="w-full border-t border-border bg-background py-16">
  <div class="container mx-auto flex flex-col gap-12">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <!-- Coluna da marca + missão -->
      <div class="lg:col-span-4">...</div>
      <!-- Colunas de links -->
      <div class="lg:col-span-5">...</div>
      <!-- Newsletter e App Badges -->
      <div class="lg:col-span-3">...</div>
    </div>
    <!-- Barra inferior -->
    <FooterBottomBar ... />
  </div>
</footer>
```

## 3. Propriedades (API)

| Prop          | Tipo                | Padrão      | Descrição                                     |
| ------------- | ------------------- | ----------- | --------------------------------------------- |
| `brand`       | `React.ReactNode`   | `undefined` | Logo e nome institucional                     |
| `description` | `string`            | `undefined` | Texto de apresentação ou declaração de missão |
| `columns`     | `FooterGroupData[]` | `[]`        | Grupos de links para o menu                   |
| `socialLinks` | `SocialLinkItem[]`  | `[]`        | Redes sociais                                 |
| `newsletter`  | `boolean`           | `true`      | Exibe o FooterNewsletter                      |
| `appBadges`   | `boolean`           | `false`     | Exibe AppStoreBadges                          |
| `statusBadge` | `boolean`           | `true`      | Exibe o SystemStatusBadge                     |
| `themeToggle` | `boolean`           | `true`      | Exibe o alternador de tema na barra inferior  |
| `locale`      | `UILocale`          | `"pt-BR"`   | Idioma                                        |
| `className`   | `string`            | `undefined` | Classes adicionais                            |

## 4. Acessibilidade

- Uso de landmarks semânticos `<footer>` e múltiplos `<nav>` com rótulos `aria-label` distintos.
- Em dispositivos móveis, os accordions utilizam `aria-expanded` e controle de teclado correto.
- Sem contraste inadequado ou elementos sobrepostos.

## 5. Stories Obrigatórias

1. `Default`: Layout completo com todas as seções (marca, links, newsletter, redes).
2. `WithAppBadges`: Inclusão dos badges de App Store e Google Play.
3. `NoNewsletter`: Versão puramente de links de navegação.
