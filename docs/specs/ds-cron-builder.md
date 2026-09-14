# Spec: CronBuilder

## Propósito

Construtor visual e intuitivo de expressões `cron` para agendamento de tarefas recorrentes em sistemas empresariais, com suporte a modos simples (frequência, horários, dias da semana) e avançado (expressão direta com cálculo das próximas execuções).

**Usar quando:** configurar rotinas de automação, relatórios periódicos, backups ou alertas recorrentes.  
**Não usar quando:** necessitar de agendamento de data única (use `ds-date-picker` ou `ds-time-picker`).  
**Alternativa se não se aplicar:** `ds-time-picker`.

---

## Localização

| Campo      | Valor                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| Arquivo    | `components/ds/cron-builder.tsx`                                         |
| Tipo       | `registry:ui`                                                            |
| Categoria  | `Form/CronBuilder`                                                       |
| Depende de | `button`, `input`, `badge`, `select`, `toggle-group`, `tabs`, `skeleton` |

---

## API — Props

| Prop       | Tipo                      | Padrão        | Obrigatória | Descrição                        |
| ---------- | ------------------------- | ------------- | ----------- | -------------------------------- |
| `value`    | `string`                  | `"* * * * *"` |             | Expressão cron atual             |
| `onChange` | `(value: string) => void` | —             |             | Callback acionado a cada mudança |
| `mode`     | `"simple" \| "advanced"`  | `"simple"`    |             | Modo inicial de interação        |
| `disabled` | `boolean`                 | `false`       |             | Estado desabilitado              |
| `loading`  | `boolean`                 | `false`       |             | Estado de carregamento           |

---

## Stories obrigatórias

- [x] `Default` — modo simples com frequência diária
- [x] `Weekly` — agendamento semanal com seleção de dias
- [x] `AdvancedMode` — edição manual da string cron com preview
- [x] `Loading` — skeletons de formulário
- [x] `Disabled` — estado desabilitado
