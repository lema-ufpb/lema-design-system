# ds-footer-brand-backdrop

> Rodapé de vanguarda com mega letreiro tipográfico de fundo, grade compacta de links, newsletter e status.

## 1. Visão Geral

Inspirado nos designs minimalistas e arrojados do Blockus (`footer-02`, `footer-15`, `footer-19`), o `FooterBrandBackdrop` ancora a identidade da marca através de um letreiro tipográfico de grandes proporções no plano de fundo inferior, enquanto posiciona os links, o status e o rodapé legal em uma composição equilibrada.

## 2. Anatomia

```
<footer class="relative w-full overflow-hidden border-t border-border bg-background pt-16 pb-8">
  <div class="container mx-auto flex flex-col gap-12">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div class="md:col-span-5">...</div>
      <div class="md:col-span-7">...</div>
    </div>
    <!-- Mega Wordmark Backdrop -->
    <FooterWordmark text={wordmarkText} variant={wordmarkVariant} />
    <!-- Bottom bar -->
    <FooterBottomBar ... />
  </div>
</footer>
```

## 3. Propriedades (API)

| Prop              | Tipo                                 | Padrão      | Descrição                  |
| ----------------- | ------------------------------------ | ----------- | -------------------------- |
| `wordmarkText`    | `string`                             | `"LEMA"`    | Texto do letreiro de fundo |
| `wordmarkVariant` | `"outline" \| "muted" \| "gradient"` | `"outline"` | Estilo do letreiro         |
| `brand`           | `React.ReactNode`                    | `undefined` | Logotipo e nome da marca   |
| `description`     | `string`                             | `undefined` | Texto de descrição         |
| `columns`         | `FooterGroupData[]`                  | `[]`        | Colunas de links           |
| `socialLinks`     | `SocialLinkItem[]`                   | `[]`        | Redes sociais              |
| `statusBadge`     | `boolean`                            | `true`      | Exibe SystemStatusBadge    |
| `locale`          | `UILocale`                           | `"pt-BR"`   | Localização                |
| `className`       | `string`                             | `undefined` | Classes adicionais         |

## 4. Acessibilidade

- Letreiro de fundo marcado como decorativo com `aria-hidden="true"`, sem gerar poluição sonora em leitores de tela.
- Landmarks semânticos e navegação estruturada.

## 5. Stories Obrigatórias

1. `Default`: Layout backdrop com wordmark outline ("LEMA").
2. `MutedVariant`: Wordmark no estilo muted fill.
3. `CustomInstitution`: Demonstração com "UFPB".
