# ds-mission-vision-cards

> Par articulado de cartões contrastantes para declaração de Missão e Visão institucionais.

## 1. Visão Geral

Inspirado nos blocos `about-01` e `about-03` do Blockus, o `MissionVisionCards` organiza as duas diretrizes estratégicas basilares de qualquer organização: Missão (o propósito do presente) e Visão (a ambição para o futuro). Apresenta suporte a ícones conceituais (alvo/bússola para missão, olho/telescópio para visão) e estilo contrastante opcional.

## 2. Anatomia

```
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Card de Missão -->
  <div class="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between">
    <div>
      <div class="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <TargetIcon class="size-5" />
      </div>
      <h3 class="mt-4 text-xl font-bold text-foreground">{missionTitle}</h3>
      <p class="mt-2 text-sm text-muted-foreground leading-relaxed">{missionText}</p>
    </div>
  </div>
  <!-- Card de Visão -->
  <div class="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between">
    ...
  </div>
</div>
```

## 3. Propriedades (API)

| Prop           | Tipo       | Padrão          | Descrição                         |
| -------------- | ---------- | --------------- | --------------------------------- |
| `missionTitle` | `string`   | `"Missão"`      | Título do cartão de Missão        |
| `missionText`  | `string`   | **obrigatório** | Texto de propósito da organização |
| `visionTitle`  | `string`   | `"Visão"`       | Título do cartão de Visão         |
| `visionText`   | `string`   | **obrigatório** | Texto da visão de futuro          |
| `locale`       | `UILocale` | `"pt-BR"`       | Idioma padrão                     |
| `className`    | `string`   | `undefined`     | Classes adicionais                |

## 4. Acessibilidade

- Cabeçalhos `<h3>` estruturados semanticamente.
- Contraste elevado de texto com superfícies de leitura confortável.

## 5. Stories Obrigatórias

1. `Default`: Par de cartões institucional padrão.
2. `Locales`: Exibição em inglês, espanhol e francês.
