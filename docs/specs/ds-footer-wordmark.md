# ds-footer-wordmark

> Mega letreiro tipográfico de rodapé com escala responsiva, suporte a corte outline, preenchimento sutil ou gradiente.

## 1. Visão Geral

O `FooterWordmark` introduz a estética contemporânea de grandes marcas de tecnologia (Linear, Vercel, Stripe, Blockus `footer-02`, `footer-19`), exibindo um wordmark de alto impacto visual que preenche harmonicamente a base inferior da página.

## 2. Anatomia

```
<div class="relative w-full overflow-hidden select-none pointer-events-none ...">
  <span class="block text-center font-black tracking-tighter uppercase text-[clamp(3.5rem,15vw,12rem)] ...">
    {text}
  </span>
</div>
```

## 3. Propriedades (API)

| Prop         | Tipo                                 | Padrão      | Descrição                            |
| ------------ | ------------------------------------ | ----------- | ------------------------------------ |
| `text`       | `string`                             | `"LEMA"`    | Texto exibido no letreiro            |
| `variant`    | `"outline" \| "muted" \| "gradient"` | `"outline"` | Estilo de renderização do texto      |
| `align`      | `"center" \| "left"`                 | `"center"`  | Alinhamento do texto                 |
| `decorative` | `boolean`                            | `true`      | Se deve aplicar `aria-hidden="true"` |
| `className`  | `string`                             | `undefined` | Classes adicionais                   |

## 4. Variantes

- `outline`: Traço suave de texto com miolo transparente (`[-webkit-text-stroke:1px_hsl(var(--foreground)/0.15)] text-transparent`).
- `muted`: Preenchimento semântico suave com opacidade controlada (`text-foreground/[0.06] dark:text-foreground/[0.08]`).
- `gradient`: Gradiente sutil do texto (`bg-linear-to-b from-foreground/15 to-transparent bg-clip-text text-transparent`).

## 5. Acessibilidade

- Por padrão é puramente decorativo com `aria-hidden="true"`, evitando ruído em sintetizadores de voz.
- Se `decorative={false}`, renderiza como elemento semântico com tag e rótulo apropriados.

## 6. Stories Obrigatórias

1. `Default`: Letreiro outline centralizado ("LEMA").
2. `AllVariants`: Comparação visual entre `outline`, `muted` e `gradient`.
3. `CustomText`: Demonstração com nomes longos como "UNIVERSIDADE FEDERAL DA PARAÍBA".
