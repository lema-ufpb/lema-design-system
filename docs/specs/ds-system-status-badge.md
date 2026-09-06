# ds-system-status-badge

> Indicador de status de saúde operacional de serviços e APIs em tempo real com dot semântico pulsante.

## 1. Visão Geral

O `SystemStatusBadge` comunica a integridade e disponibilidade dos serviços (UFPB, portais, APIs ou plataformas SaaS). Inspirado nos padrões do GitHub, Vercel e Blockus (`footer-08`, `footer-21`), exibe o estado de uptime com animação suave e link opcional para a página de status.

## 2. Anatomia

```
<a href="..." class="inline-flex items-center gap-2 ...">
  <span class="relative flex size-2">
    <span class="animate-ping absolute ..."></span>
    <span class="relative rounded-full size-2 ..."></span>
  </span>
  <span class="text-xs font-medium ...">Todos os sistemas operacionais</span>
  <span class="text-xs text-muted-foreground">99.98%</span>
</a>
```

## 3. Propriedades (API)

| Prop        | Tipo                                                       | Padrão          | Descrição                                             |
| ----------- | ---------------------------------------------------------- | --------------- | ----------------------------------------------------- |
| `status`    | `"operational" \| "degraded" \| "outage" \| "maintenance"` | `"operational"` | Estado operacional                                    |
| `label`     | `string`                                                   | `undefined`     | Texto customizado de status                           |
| `uptime`    | `string`                                                   | `undefined`     | Percentual opcional de disponibilidade (ex: "99.99%") |
| `href`      | `string`                                                   | `undefined`     | URL da página de status                               |
| `size`      | `"sm" \| "md"`                                             | `"md"`          | Dimensão visual do badge                              |
| `locale`    | `UILocale`                                                 | `"pt-BR"`       | Idioma para textos automáticos                        |
| `className` | `string`                                                   | `undefined`     | Classes CSS extras                                    |

## 4. Variantes

- `operational`: `bg-success`, ping animado `bg-success/75`, texto semântico.
- `degraded`: `bg-warning`, texto de atenção.
- `outage`: `bg-destructive`, texto de erro/alerta.
- `maintenance`: `bg-primary` ou `bg-muted-foreground`, texto neutro de manutenção.

## 5. Acessibilidade

- Quando possui `href`, utiliza tag `<a>` com `rel="noopener noreferrer"`. Se estático, utiliza `<span>` ou `<div>`.
- Dot decorativo com `aria-hidden="true"`.
- Texto com valor descritivo acessível e contraste WCAG AA.

## 6. Stories Obrigatórias

1. `Default`: Status operacional padrão com dot verde pulsante.
2. `AllStatuses`: Grid comparando `operational`, `degraded`, `outage` e `maintenance`.
3. `WithUptime`: Exibição de uptime percentual (ex: 99.95%).
4. `AsLink`: Comportamento como link interativo com hover styling.
