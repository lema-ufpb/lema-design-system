# ds-footer-cta

> Bloco de rodapé integrado com cartão ou faixa de conversão (CTA) de alto impacto posicionado antes dos links.

## 1. Visão Geral

Inspirado nos blocos `footer-03`, `footer-06` e `footer-20` do Blockus, o `FooterCta` unifica a chamada de conversão final da página com a terminação de rodapé. Evita a duplicação visual e gera uma transição fluida entre a ação desejada (inscrição, início de teste, contato) e o mapa do site.

## 2. Anatomia

```
<footer class="relative w-full border-t border-border bg-background pt-16 pb-12">
  <div class="container mx-auto flex flex-col gap-16">
    <!-- CTA Card / Band -->
    <div class="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
      <!-- Glow opcional -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold">{ctaTitle}</h2>
          <p class="text-muted-foreground mt-2">{ctaDescription}</p>
        </div>
        <div class="flex items-center gap-3">{ctaActions}</div>
      </div>
    </div>
    <!-- Links & Bottom Bar -->
    <div class="grid ...">...</div>
    <FooterBottomBar ... />
  </div>
</footer>
```

## 3. Propriedades (API)

| Prop              | Tipo                                                     | Padrão                   | Descrição                   |
| ----------------- | -------------------------------------------------------- | ------------------------ | --------------------------- |
| `ctaTitle`        | `string`                                                 | `"Pronto para começar?"` | Título do cartão CTA        |
| `ctaDescription`  | `string`                                                 | `undefined`              | Texto explicativo da oferta |
| `primaryAction`   | `{ label: string; href?: string; onClick?: () => void }` | `undefined`              | Ação principal              |
| `secondaryAction` | `{ label: string; href?: string; onClick?: () => void }` | `undefined`              | Ação secundária             |
| `columns`         | `FooterGroupData[]`                                      | `[]`                     | Colunas de links de rodapé  |
| `socialLinks`     | `SocialLinkItem[]`                                       | `[]`                     | Redes sociais               |
| `locale`          | `UILocale`                                               | `"pt-BR"`                | Idioma                      |
| `className`       | `string`                                                 | `undefined`              | Classes CSS extras          |

## 4. Acessibilidade

- O cartão de conversão usa cabeçalho semântico com hierarquia correta (`<h2>` ou `<h3>`).
- Botões de ação com contraste nítido, estados de foco e navegação acessível.

## 5. Stories Obrigatórias

1. `Default`: Bloco completo com CTA destacado e links de rodapé.
2. `GlowVariant`: Variante com brilho de fundo atmosférico no cartão.
3. `Locales`: Demonstração multilíngue.
