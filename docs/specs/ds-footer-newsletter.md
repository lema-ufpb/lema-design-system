# ds-footer-newsletter

> Caixa atômica de captura de e-mails para novidades, comunicados e atualizações com suporte a feedback dinâmico.

## 1. Visão Geral

O `FooterNewsletter` oferece um formulário enxuto e acessível para captura de leads e subscrição de newsletters no rodapé. Possui suporte aos modos `inline` (botão acoplado ao input) e `stacked`, gerenciamento de estados de envio, validação de e-mail e mensagem de confirmação acessível.

## 2. Anatomia

```
<form class="flex flex-col gap-2 ...">
  <div class="flex flex-col gap-1">
    <h3 class="text-sm font-semibold">{t.newsletterTitle}</h3>
    <p class="text-xs text-muted-foreground">{t.newsletterDescription}</p>
  </div>
  <div class="flex ...">
    <Input type="email" placeholder="..." />
    <Button type="submit">{t.subscribe}</Button>
  </div>
  <p class="text-[11px] text-muted-foreground">{t.privacyNotice}</p>
</form>
```

## 3. Propriedades (API)

| Prop          | Tipo                                                  | Padrão      | Descrição                                   |
| ------------- | ----------------------------------------------------- | ----------- | ------------------------------------------- |
| `layout`      | `"inline" \| "stacked"`                               | `"inline"`  | Disposição do campo e botão de envio        |
| `title`       | `string`                                              | `undefined` | Título customizado (usa i18n se omitido)    |
| `description` | `string`                                              | `undefined` | Descrição customizada (usa i18n se omitido) |
| `onSubscribe` | `(email: string) => Promise<boolean \| void> \| void` | `undefined` | Callback de submissão                       |
| `locale`      | `UILocale`                                            | `"pt-BR"`   | Localização para strings                    |
| `className`   | `string`                                              | `undefined` | Classes adicionais                          |

## 4. Acessibilidade

- Input com `id`, `name="email"`, `type="email"`, `required` e `aria-label` ou `<Label>` invisível (`sr-only`).
- Feedback de sucesso ou erro com `role="status"` e `aria-live="polite"`.
- Desabilita submissão concorrente com `aria-busy` e feedback de carregamento via `Loader2Icon`.

## 5. Stories Obrigatórias

1. `Default`: Layout inline padrão com textos i18n.
2. `StackedLayout`: Layout empilhado para colunas estreitas.
3. `SuccessState`: Demonstração da confirmação pós-inscrição.
4. `LoadingState`: Botão em estado de processamento.
