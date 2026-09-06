# ds-about-milestones

> Bloco turnkey completo da trajetória histórica com cabeçalho de seção e o componente `MilestoneStepper`.

## 1. Visão Geral

Inspirado nos blocos `about-07` e `about-10` do Blockus, o `AboutMilestones` provê uma seção dedicada para contar a evolução cronológica da organização, desde sua fundação até os marcos mais recentes e projeções futuras.

## 2. Anatomia

```
<section class="w-full py-16 md:py-24 bg-muted/30">
  <div class="container mx-auto flex flex-col gap-12 max-w-4xl">
    <div class="flex flex-col items-center text-center gap-4">
      <Badge variant="outline">{badge}</Badge>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      <p class="text-muted-foreground text-base max-w-xl">{description}</p>
    </div>
    <MilestoneStepper milestones={milestones} ... />
  </div>
</section>
```

## 3. Propriedades (API)

| Prop          | Tipo              | Padrão          | Descrição                      |
| ------------- | ----------------- | --------------- | ------------------------------ |
| `title`       | `string`          | **obrigatório** | Título da seção histórica      |
| `description` | `string`          | `undefined`     | Texto introdutório             |
| `badge`       | `string`          | `undefined`     | Badge de contexto              |
| `milestones`  | `MilestoneItem[]` | **obrigatório** | Lista de eventos da cronologia |
| `locale`      | `UILocale`        | `"pt-BR"`       | Idioma                         |
| `className`   | `string`          | `undefined`     | Classes extras                 |

## 4. Acessibilidade

- Cabeçalhos de seção devidamente relacionados.
- Linhas e marcadores decorativos isolados de leitores de tela.

## 5. Stories Obrigatórias

1. `Default`: Seção com histórico de 5 marcos cronológicos.
2. `Locales`: Demonstração multilíngue.
