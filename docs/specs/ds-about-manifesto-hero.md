# ds-about-manifesto-hero

> Bloco imersivo de abertura para páginas "Sobre" ou "Manifesto" combinando `ManifestoStatement`, métricas institucionais e ações.

## 1. Visão Geral

Inspirado nos blocos `about-03` e `about-08` do Blockus, o `AboutManifestoHero` serve como uma introdução solene e inspiradora para a instituição. Posiciona no centro um manifesto arrojado com tipografia editorial, seguido de uma linha de indicadores-chave (métricas) e botões para conhecer a equipe ou ler a carta da diretoria.

## 2. Anatomia

```
<section class="relative w-full py-20 md:py-32 overflow-hidden bg-background">
  <BackgroundGlow variant="subtle" />
  <div class="container relative mx-auto flex flex-col items-center text-center gap-12 max-w-4xl">
    <ManifestoStatement align="center" size="xl" ... />
    <!-- Métricas / Indicadores -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-8 border-t border-border">
      {stats.map(stat => (
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold tabular-nums text-foreground">{stat.value}</span>
          <span class="text-xs text-muted-foreground mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
    <!-- Ações -->
    <div class="flex items-center gap-4">{actions}</div>
  </div>
</section>
```

## 3. Propriedades (API)

| Prop              | Tipo                                                     | Padrão          | Descrição                  |
| ----------------- | -------------------------------------------------------- | --------------- | -------------------------- |
| `statement`       | `React.ReactNode`                                        | **obrigatório** | Frase central do manifesto |
| `eyebrow`         | `string`                                                 | `undefined`     | Sobretítulo temático       |
| `author`          | `string`                                                 | `undefined`     | Assinatura institucional   |
| `stats`           | `Array<{ label: string; value: string }>`                | `[]`            | Métricas resumidas         |
| `primaryAction`   | `{ label: string; href?: string; onClick?: () => void }` | `undefined`     | Ação principal             |
| `secondaryAction` | `{ label: string; href?: string; onClick?: () => void }` | `undefined`     | Ação secundária            |
| `locale`          | `UILocale`                                               | `"pt-BR"`       | Idioma                     |
| `className`       | `string`                                                 | `undefined`     | Classes adicionais         |

## 4. Acessibilidade

- Tipografia de alto contraste.
- Métricas com marcação clara para tecnologias assistivas.

## 5. Stories Obrigatórias

1. `Default`: Hero de manifesto completo com estatísticas e botões.
2. `WithoutStats`: Versão concisa focada unicamente na declaração do manifesto.
3. `Locales`: Demonstração multilíngue.
