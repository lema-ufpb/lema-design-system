# Spec: ConfirmDialog (ds-confirm-dialog)

> Spec do componente `ConfirmDialog` para o LEMA Design System.

---

## Propósito

O `ConfirmDialog` protege os usuários contra ações irreversíveis ou de alto risco (excluir um projeto com dados brutos, revogar chaves de API, purgar banco de dados de simulações). Ele implementa o padrão "typed confirmation" (onde o usuário precisa digitar uma palavra de segurança como "EXCLUIR" ou o nome do próprio recurso) para liberar o botão de confirmação.

**Usar quando:**

- Exclusão irreversível de recursos críticos ou conjuntos de dados.
- Modificações em ambiente de produção ou cancelamento de contratos/planos.
- Operações que não possuem recurso de "desfazer" (Undo).

**Não usar quando:**

- Ações triviais e reversíveis (use confirmação simples ou toast com botão de "Desfazer").
- Diálogos informativos sem tomada de decisão crítica (use `Dialog` ou `Alert`).

**Alternativa se não se aplicar:** `AlertDialog` simples ou `toast`.

---

## Localização

| Campo      | Valor                                                      |
| ---------- | ---------------------------------------------------------- |
| Arquivo    | `components/ds/confirm-dialog.tsx`                         |
| Tipo       | `registry:ui`                                              |
| Categoria  | `Feedback`                                                 |
| Depende de | `dialog`, `input`, `button`, `alert`, `spinner`, `ui-i18n` |

---

## API — Props

| Prop            | Tipo                          | Padrão          | Obrigatória | Descrição                                   |
| --------------- | ----------------------------- | --------------- | ----------- | ------------------------------------------- |
| `open`          | `boolean`                     | —               |             | Controla a abertura do diálogo              |
| `onOpenChange`  | `(open: boolean) => void`     | —               |             | Callback de alteração do estado de abertura |
| `title`         | `React.ReactNode`             | —               | ✓           | Título do diálogo de confirmação            |
| `description`   | `React.ReactNode`             | —               | ✓           | Explicação detalhada do impacto da ação     |
| `confirmWord`   | `string`                      | `"EXCLUIR"`     |             | Palavra ou termo que o usuário deve digitar |
| `requireTyping` | `boolean`                     | `true`          |             | Se requer digitação para habilitar o botão  |
| `intent`        | `"destructive" \| "warning"`  | `"destructive"` |             | Semântica de risco visual                   |
| `onConfirm`     | `() => void \| Promise<void>` | —               | ✓           | Callback disparado ao confirmar             |
| `onCancel`      | `() => void`                  | —               |             | Callback ao cancelar                        |
| `confirmLabel`  | `string`                      | —               |             | Rótulo do botão de confirmação              |
| `cancelLabel`   | `string`                      | —               |             | Rótulo do botão de cancelamento             |
| `trigger`       | `React.ReactNode`             | —               |             | Gatilho opcional que abre o modal           |
| `locale`        | `UILocale`                    | `"pt-BR"`       |             | Idioma para internacionalização             |

---

## Tokens de design utilizados

| Token                         | Slot onde é usado                                |
| ----------------------------- | ------------------------------------------------ |
| `text-destructive`            | Título de alerta ou ícone na intenção destrutiva |
| `bg-destructive`              | Botão principal de confirmação destrutiva        |
| `text-warning` / `bg-warning` | Variante de atenção (warning)                    |
| `border-destructive/30`       | Contorno de destaque em alerta crítico           |

---

## Comportamentos e estados

- **Validação estrita:** O botão de confirmação permanece desabilitado (`disabled`) enquanto o valor digitado no input não for estritamente idêntico ao `confirmWord`.
- **Feedback de digitação:** Indicador visual discreto mostrando o termo esperado.
- **Estado de carregamento:** Durante a execução de `onConfirm`, o botão de confirmação exibe um `<Spinner>` e os inputs/botões ficam bloqueados.
