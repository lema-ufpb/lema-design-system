# Spec: FeatureSpotlight (ds-feature-spotlight)

> Spec do componente `FeatureSpotlight` para o LEMA Design System.

---

## Propósito

O `FeatureSpotlight` permite destacar e apresentar funcionalidades novas, dicas contextuais ou guias passo a passo de integração (product tour / onboarding) ancorados diretamente sobre o elemento de interface que está sendo explicado.

**Usar quando:**

- Introdução de uma nova funcionalidade ou botão recém-adicionado a usuários existentes.
- Guias de onboarding passo a passo (tours guiados com contadores "Passo 1 de 4").
- Dicas contextuais para orientar o primeiro uso de uma ferramenta complexa.

**Não usar quando:**

- Tooltips simples de um único termo exibidos no hover do cursor (use `Tooltip`).
- Modais informativos que interrompem todo o fluxo da tela (use `Dialog`).

**Alternativa se não se aplicar:** `Tooltip`, `Popover`.

---

## Localização

| Campo      | Valor                                   |
| ---------- | --------------------------------------- |
| Arquivo    | `components/ds/feature-spotlight.tsx`   |
| Tipo       | `registry:ui`                           |
| Categoria  | `Feedback`                              |
| Depende de | `popover`, `button`, `badge`, `ui-i18n` |

---

## API — Props

| Prop           | Tipo                                     | Padrão     | Obrigatória | Descrição                                 |
| -------------- | ---------------------------------------- | ---------- | ----------- | ----------------------------------------- |
| `children`     | `React.ReactNode`                        | —          | ✓           | Elemento gatilho/alvo destacado na tela   |
| `title`        | `React.ReactNode`                        | —          | ✓           | Título da dica/funcionalidade em destaque |
| `description`  | `React.ReactNode`                        | —          | ✓           | Texto explicativo                         |
| `open`         | `boolean`                                | —          |             | Controle de visibilidade                  |
| `onOpenChange` | `(open: boolean) => void`                | —          |             | Callback de alteração de visibilidade     |
| `step`         | `number`                                 | —          |             | Número do passo atual no tour             |
| `totalSteps`   | `number`                                 | —          |             | Quantidade total de passos no tour        |
| `onNext`       | `() => void`                             | —          |             | Callback para o botão Próximo             |
| `onPrevious`   | `() => void`                             | —          |             | Callback para o botão Anterior            |
| `onDismiss`    | `() => void`                             | —          |             | Callback ao fechar/dispensar o destaque   |
| `side`         | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` |             | Lado onde o popover é exibido             |
| `showBeacon`   | `boolean`                                | `true`     |             | Exibe anel pulsante ao redor do alvo      |
| `locale`       | `UILocale`                               | `"pt-BR"`  |             | Idioma para botões e contadores           |

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                           |
| ----------------------- | ------------------------------------------- |
| `bg-popover` / `border` | Cartão explicativo flutuante                |
| `bg-primary`            | Botão de avanço e anel luminoso de destaque |
| `text-foreground`       | Título do spotlight                         |
| `text-muted-foreground` | Descrição e contadores de passos            |

---

## Escala tipográfica e de tamanho

| Slot      | Tamanho                                  |
| --------- | ---------------------------------------- |
| Título    | `text-sm font-semibold`                  |
| Descrição | `text-xs text-muted-foreground`          |
| Contador  | `text-[11px] font-semibold tabular-nums` |
| Botões    | `h-7 text-xs px-2.5`                     |
