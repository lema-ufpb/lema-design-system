# Spec: ds-guided-tour

> Tour Guiado (Guided Tour).

---

## Propósito

Exibe um cartão de onboarding ou tutorial passo a passo para introduzir novas funcionalidades ao usuário. Este componente gerencia a UI do cartão de tour (título, texto, progresso, botões Next/Prev/Skip), permitindo que o consumidor gerencie a ancoragem (ancorando a um Popover ou Tooltip, ou renderizando em um Dialog fixo).

**Usar quando:** Você quiser mostrar um passo a passo explicativo (onboarding).

---

## Localização

| Campo      | Valor                                  |
| ---------- | -------------------------------------- |
| Arquivo    | `components/ds/guided-tour.tsx`        |
| Tipo       | `registry:ui` (name: `ds-guided-tour`) |
| Categoria  | `Feedback`                             |
| Depende de | `button`, `lucide-react`, `ui-i18n`    |

---

## Estrutura de Dados

```typescript
export interface TourStep {
  id: string
  title: string
  content: React.ReactNode
}
```

## API — Props

| Prop          | Tipo         | Padrão    | Obrigatória | Descrição              |
| ------------- | ------------ | --------- | ----------- | ---------------------- |
| `steps`       | `TourStep[]` | —         | Sim         | Lista de passos        |
| `currentStep` | `number`     | `0`       | Sim         | Índice do passo atual  |
| `onNext`      | `() => void` | —         | Sim         | Callback próximo       |
| `onPrev`      | `() => void` | —         |             | Callback anterior      |
| `onSkip`      | `() => void` | —         |             | Callback pular (fecha) |
| `onFinish`    | `() => void` | —         |             | Callback concluir      |
| `locale`      | `UILocale`   | `"pt-BR"` |             | Textos de botões       |

---

## Variantes CVA

Nenhuma.

---

## Acessibilidade

- Deve ter `role="dialog"` ou `role="region"`.
- O foco deve ser movido adequadamente pelo consumidor quando usado em modal/popover, mas o card em si usa elementos acessíveis.

---

## Stories obrigatórias no Storybook

- [x] `Default` (Controlado pelo state do Story)

---

## Checklist antes de implementar

- [x] Exibe indicadores (bolinhas) de passo atual e total.
- [x] O botão "Próximo" vira "Concluir" no último passo.
- [x] O botão "Anterior" fica desabilitado ou oculto no primeiro passo.
