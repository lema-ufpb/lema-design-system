# Spec: DateRangePicker (ds-date-range-picker)

> Spec do componente `DateRangePicker` para o LEMA Design System.

---

## Propósito

O `DateRangePicker` permite a seleção intuitiva de intervalos de datas (início e término) em formulários, filtros analíticos, filtros de gráficos e relatórios temporais. Ele compõe sobre os primitivos `Calendar` (`mode="range"`), `Popover` e `Button` do shadcn/ui, incluindo painel opcional de atalhos rápidos (presets: Hoje, Últimos 7 dias, Últimos 30 dias, etc.) e suporte completo aos 4 locales.

**Usar quando:**

- Filtragem por períodos temporais (ex: "01/01/2025 – 31/01/2025").
- Relatórios, consultas analíticas e dashboards com intervalo de início e fim.
- Seleção de período de reservas, agendamentos ou execução de modelos.

**Não usar quando:**

- Seleção de apenas uma data específica (use `DatePicker`).
- Seleção de horário/tempo contínuo (use `TimePicker`).

**Alternativa se não se aplicar:** `DatePicker`.

---

## Localização

| Campo      | Valor                                      |
| ---------- | ------------------------------------------ |
| Arquivo    | `components/ds/date-range-picker.tsx`      |
| Tipo       | `registry:ui`                              |
| Categoria  | `Form`                                     |
| Depende de | `button`, `calendar`, `popover`, `ui-i18n` |

---

## API — Props

| Prop          | Tipo                         | Padrão    | Obrigatória | Descrição                                      |
| ------------- | ---------------------------- | --------- | ----------- | ---------------------------------------------- |
| `date`        | `DateRange \| undefined`     | —         |             | Intervalo selecionado (`{ from, to }`)         |
| `onSelect`    | `(date?: DateRange) => void` | —         |             | Callback disparado ao selecionar um intervalo  |
| `presets`     | `boolean`                    | `true`    |             | Exibe coluna de atalhos rápidos                |
| `placeholder` | `string`                     | —         |             | Texto exibido quando nenhum intervalo é eleito |
| `disabled`    | `boolean`                    | `false`   |             | Desabilita a interação com o componente        |
| `locale`      | `UILocale`                   | `"pt-BR"` |             | Idioma para data e textos da interface         |
| `size`        | `"sm" \| "md" \| "lg"`       | `"md"`    |             | Tamanho do botão gatilho                       |
| `className`   | `string`                     | —         |             | Classes CSS adicionais para o gatilho          |

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                                     |
| ----------------------- | ----------------------------------------------------- |
| `bg-background`         | Fundo do popover e botões                             |
| `text-foreground`       | Texto do intervalo selecionado                        |
| `text-muted-foreground` | Placeholder e ícone de calendário                     |
| `border-border`         | Borda do gatilho e divisor entre presets e calendário |
| `bg-accent`             | Hover nos itens de preset                             |

---

## Escala tipográfica e de tamanho

| Slot    | sm            | md            | lg               |
| ------- | ------------- | ------------- | ---------------- |
| Gatilho | `h-8 text-xs` | `h-9 text-sm` | `h-10 text-base` |
| Ícone   | `size-3.5`    | `size-4`      | `size-5`         |

---

## Comportamentos e estados

- **Sem seleção:** Mostra o placeholder localizado (ex: "Selecione um período").
- **Com início apenas:** Mostra a data inicial seguida de "— …".
- **Com início e término:** Mostra o intervalo completo formatado (ex: "10 de jan. de 2025 - 25 de jan. de 2025").
- **Atalhos rápidos (Presets):** Ao clicar em "Hoje", "Últimos 7 dias", etc., atualiza instantaneamente o `date` e fecha ou mantém o seletor atualizado.
- **Limpar:** Botão discreto para resetar a seleção.

---

## Acessibilidade

- Disparador com `aria-haspopup="dialog"`.
- Popover fecha com Escape e foco retorna ao gatilho.
- Calendário com navegação por teclado nativa do Radix / DayPicker.
