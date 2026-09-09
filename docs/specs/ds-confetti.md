# Spec: Confetti

## Propósito

Gatilho visual de celebração e micro-interação através de confetes na tela, fornecido tanto como componente acionável (`ConfettiButton`) quanto como hook utilitário imperativo (`useConfetti`).

**Usar quando:** comemorações de sucesso em transações, conquistas, conclusão de onboarding ou desbloqueio de recursos.  
**Não usar quando:** a ação não for uma conquista ou marco relevante (evitar fadiga do usuário).  
**Alternativa se não se aplicar:** `components/ui/toast` ou `components/ds/notification-center`.

---

## Localização

| Campo      | Valor                        |
| ---------- | ---------------------------- |
| Arquivo    | `components/ds/confetti.tsx` |
| Tipo       | `registry:ui`                |
| Categoria  | `Feedback/Confetti`          |
| Depende de | `canvas-confetti`, `button`  |

---

## API — Props

| Prop            | Tipo                                                  | Padrão     | Obrigatória | Descrição                         |
| --------------- | ----------------------------------------------------- | ---------- | ----------- | --------------------------------- |
| `preset`        | `"cannon" \| "fireworks" \| "school-pride" \| "snow"` | `"cannon"` |             | Efeito de animação                |
| `duration`      | `number`                                              | `3000`     |             | Duração da explosão em ms         |
| `particleCount` | `number`                                              | `100`      |             | Quantidade de confetes disparados |
| `spread`        | `number`                                              | `70`       |             | Ângulo de dispersão               |

---

## Stories obrigatórias

- [x] `Default` — botão de celebração com canhão de confetes
- [x] `Presets` — botões para presets fireworks, school-pride, cannon
- [x] `CustomColors` — confetes usando as cores primárias do design system
