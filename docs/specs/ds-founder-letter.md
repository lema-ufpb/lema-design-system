# ds-founder-letter

> Carta aberta ou mensagem do coordenador/diretor institucional com retrato, prosa editorial, drop cap e assinatura formal.

## 1. Visão Geral

Inspirado nos blocos `about-02` e `about-09` do Blockus, o `FounderLetter` humaniza a instituição apresentando a palavra do coordenador, diretor ou fundador. Possui estrutura editorial cuidadosa com tipografia serifada ou moderna, capitular (drop cap), fotografia emoldurada e assinatura formal.

## 2. Anatomia

```
<div class="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <!-- Coluna de Liderança -->
    <div class="flex flex-col items-start gap-4">
      <img src={authorAvatar} alt={authorName} class="size-20 rounded-2xl object-cover" />
      <div>
        <h4 class="text-base font-semibold text-foreground">{authorName}</h4>
        <p class="text-sm text-muted-foreground">{authorRole}</p>
      </div>
      {authorSignature && <img src={authorSignature} alt="Assinatura" class="h-10 opacity-70" />}
    </div>
    <!-- Coluna da Mensagem -->
    <div class="md:col-span-2 space-y-4">
      <h3 class="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
      <div class="prose text-muted-foreground text-sm leading-relaxed ...">
        {paragraphs}
      </div>
    </div>
  </div>
</div>
```

## 3. Propriedades (API)

| Prop              | Tipo       | Padrão          | Descrição                            |
| ----------------- | ---------- | --------------- | ------------------------------------ |
| `title`           | `string`   | **obrigatório** | Título ou tema da carta              |
| `paragraphs`      | `string[]` | **obrigatório** | Parágrafos do texto da mensagem      |
| `authorName`      | `string`   | **obrigatório** | Nome do autor/coordenador            |
| `authorRole`      | `string`   | **obrigatório** | Cargo ou papel institucional         |
| `authorAvatar`    | `string`   | `undefined`     | URL da foto do autor                 |
| `authorSignature` | `string`   | `undefined`     | URL da imagem de assinatura          |
| `withDropCap`     | `boolean`  | `true`          | Primeira letra destacada (capitular) |
| `className`       | `string`   | `undefined`     | Classes CSS extras                   |

## 4. Acessibilidade

- Imagens com texto alternativo descritivo (`alt`).
- Hierarquia textual estruturada para leitores de tela com parágrafos semanticamente separados.

## 5. Stories Obrigatórias

1. `Default`: Carta editorial com retrato e parágrafos completos.
2. `WithSignature`: Versão com imagem de assinatura formal.
3. `WithoutDropCap`: Versão com tipografia uniforme sem capitular.
