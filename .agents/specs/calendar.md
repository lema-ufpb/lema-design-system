# Spec: Calendar

> Um seletor de data com seleção de dia, suporte a intervalo e navegação por dropdown.

---

## Propósito

O Calendar é um seletor de data completo construído sobre `react-day-picker` v9, integrado com o sistema de tokens do LEMA via variáveis CSS customizadas. Suporta três modos de seleção (`single`, `multiple`, `range`) e dois layouts de navegação de mês/ano: `label` (texto simples) e `dropdown` (menus suspensos). O componente sobrescreve todos os classNames do `react-day-picker` com classes Tailwind semânticas, garantindo consistência visual com o resto do design system. Inclui `CalendarDayButton` customizado que usa o componente `Button` primitivo para cada célula de dia, com suporte a estados de seleção única, intervalo (start/middle/end), hoje e foco. Aceita `buttonVariant` para personalizar os botões de navegação.

**Usar quando:** Seleção de data única (birth date, agendamento), intervalo de datas (período de relatório, reserva) ou exibição de calendário informativo.

**Não usar quando:** Apenas uma data relativa é necessária (ex: "próximos 7 dias" — usar `Select` ou input com presets). Para seleção de data com contexto adicional (hora, fuso), considerar `DatePicker` composto.

**Alternativa se não se aplicar:** `Popover` + `Calendar` para date picker dropdown, `Select` para datas predefinidas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/calendar.tsx` |
| Tipo | `registry:ui` (name: `calendar`) |
| Categoria | Form / Date Input |
| Depende de | `button` |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `mode` | `"single" \| "multiple" \| "range"` | — | Sim (via DayPicker) | Modo de seleção |
| `selected` | `Date \| Date[] \| DateRange` | — | Não | Data(s) selecionada(s) |
| `onSelect` | `(date) => void` | — | Não | Callback de seleção |
| `captionLayout` | `"label" \| "dropdown"` | `"label"` | Não | Tipo de navegação do mês/ano |
| `showOutsideDays` | `boolean` | `true` | Não | Mostrar dias de meses adjacentes |
| `buttonVariant` | `"default" \| "outline" \| "secondary" \| "ghost" \| "destructive" \| "link"` | `"ghost"` | Não | Variante dos botões de navegação |
| `showWeekNumber` | `boolean` | — | Não | Mostrar números de semana |
| `numberOfMonths` | `number` | — | Não | Número de meses exibidos |
| `locale` | `Locale` (react-day-picker) | — | Não | Localização |
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--background` | Fundo do calendário |
| `--muted` | Dia de hoje, hover, fundo de intervalo (range_start/end) |
| `--primary` | Fundo do dia selecionado (selected, range_start, range_end) |
| `--primary-foreground` | Texto do dia selecionado |
| `--muted-foreground` | Cabeçalhos de dia da semana, dias outside/disabled |
| `--popover` | Fundo dos dropdowns de mês/ano |
| `--ring` / `--ring/50` | Focus ring no dia focado |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Dia normal | Texto `text-foreground`, sem fundo |
| Dia selecionado (single) | Fundo `bg-primary`, texto `text-primary-foreground` |
| Range start/end | Fundo `bg-primary` com after pseudo-elemento para extensão visual |
| Range middle | Fundo `bg-muted`, sem bordas arredondadas |
| Hoje | Fundo `bg-muted` |
| Fora do mês (outside) | Texto `text-muted-foreground` |
| Desabilitado | `opacity-50 text-muted-foreground` |
| Focado | `border-ring ring-[3px] ring-ring/50` |
| Caption label | `text-sm font-medium` (label) ou com ícone chevron (dropdown) |
| Navegação | Botões `buttonVariant="ghost"` com ChevronLeft/ChevronRight |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| ARIA grid | `react-day-picker` fornece `role="grid"`, `aria-label` nos dias |
| Navegação por teclado | Setas, Home/End, PageUp/PageDown (react-day-picker) |
| Foco programático | `CalendarDayButton` foca via `useEffect` quando `modifiers.focused` |
| Dias com aria-label | `data-day` com data localizada |
| Legendas de mês/ano | Dropdowns selecionáveis com `aria-label` |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Seleção única com data de hoje pre-selecionada
- [x] `WithDropdownCaption` — Navegação por dropdown de mês/ano
- [x] `RangeSelection` — Seleção de intervalo de 5 dias
- [x] `MultipleMonths` — Dois meses lado a lado
- [x] `WithWeekNumbers` — Calendário com números de semana

---

## Checklist antes de implementar

- [x] Escala tipográfica — `text-sm` (dias), `text-[0.8rem]` (weekday), `text-xs` (sub-labels)
- [x] Tokens semânticos — `background`, `muted`, `primary`, `primary-foreground`, `muted-foreground`, `popover`, `ring`
- [x] Tamanho de célula — `--cell-size: --spacing(8)` customizável
- [x] Raio de célula — `--cell-radius: var(--radius-4xl)` para aparência arredondada
- [x] Responsivo — `md:flex-row` para múltiplos meses lado a lado
- [x] Focus management — Foco programático no dia via `useEffect`
