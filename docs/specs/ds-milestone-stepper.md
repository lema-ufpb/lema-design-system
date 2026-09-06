# ds-milestone-stepper

> Linha do tempo de evolução histórica e marcos cronológicos com anos tabulares, nó de destaque e conector contínuo.

## 1. Visão Geral

Inspirado nos blocos `about-07`, `about-10` e `about-14` do Blockus, o `MilestoneStepper` exibe a trajetória de crescimento de um projeto, laboratório ou instituição através de uma linha temporal com conector contínuo, anos em fonte tabular (`tabular-nums`), nó visual iluminado e descrição de conquistas.

## 2. Anatomia

```
<div class="relative flex flex-col gap-8">
  <!-- Linha conectora contínua -->
  <div class="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" />

  <div class="relative flex items-start gap-6">
    <div class="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
      {icon || dot}
    </div>
    <div>
      <span class="text-xs font-bold tabular-nums text-primary">{year}</span>
      <h4 class="text-base font-semibold text-foreground">{title}</h4>
      <p class="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
</div>
```

## 3. Propriedades (API)

| Prop          | Tipo                         | Padrão          | Descrição                    |
| ------------- | ---------------------------- | --------------- | ---------------------------- |
| `milestones`  | `MilestoneItem[]`            | **obrigatório** | Lista de marcos cronológicos |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"`    | Disposição dos marcos        |
| `className`   | `string`                     | `undefined`     | Classes adicionais           |

## 4. Acessibilidade

- Linhas conectoras e pontos decorativos possuem `aria-hidden="true"`.
- A lista de marcos é estruturada semanticamente em lista ordenada ou de definição para leitores de tela.

## 5. Stories Obrigatórias

1. `Default`: Stepper vertical com linha do tempo de 4 marcos históricos.
2. `Horizontal`: Disposição horizontal para dashboards ou páginas amplas.
