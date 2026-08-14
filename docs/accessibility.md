# Acessibilidade — LEMA Design System

## Conformidade

O LEMA Design System tem como alvo **WCAG 2.1 AA** (Web Content Accessibility Guidelines). Todos os componentes são projetados e testados para atender ou exceder este padrão.

## Princípios

1. **Perceptível**: informações e componentes de interface devem ser apresentados de forma que os usuários possam percebê-los, independentemente de capacidade sensorial.
2. **Operável**: componentes de interface e navegação devem ser operáveis por todos os meios de interação (teclado, mouse, tátil, voz).
3. **Compreensível**: informações e operação da interface devem ser compreensíveis.
4. **Robusto**: o conteúdo deve ser interpretado de forma confiável por uma ampla variedade de tecnologias assistivas.

## Padrões adotados

- **Contraste mínimo**: 4.5:1 para texto corpo, 3:1 para texto grande (≥18px ou bold ≥14px)
- **Navegação por teclado**: todos os componentes interativos suportam foco visível e operação via teclado
- **ARIA**: atributos ARIA gerenciados pelos primitivos Radix UI e shadcn/ui
- **Reduced motion**: `prefers-reduced-motion` respeitado em todas as animações via `tw-animate-css`
- **Modo escuro**: suporte nativo via `next-themes`, sem perda de contraste
- **Zoom e redimensionamento**: layouts responsivos que suportam zoom de até 200% sem perda de conteúdo
- **i18n**: internacionalização com 4 locales (pt-BR, en-US, es-ES, fr-FR)

## Testes

- **Storybook a11y addon**: o addon `@storybook/addon-a11y` está configurado no Storybook e roda automaticamente durante os testes com `make test`
- **Violações são tratadas como erro**: desde julho de 2026, violações de acessibilidade nos testes Storybook são tratadas como erro (não mais como "todo")
- **Testes de interação**: stories incluem testes `play` com `@storybook/test` para verificar comportamento de teclado e foco

## Limitações conhecidas

- Testes de acessibilidade automatizados cobrem aproximadamente 80% dos critérios WCAG; testes manuais com leitores de tela (NVDA, VoiceOver) são recomendados antes de release
- A conformidade final de uma aplicação construída com o design system depende também da implementação correta pelo time consumidor

## Referências

- [WCAG 2.1 Specification](https://www.w3.org/TR/WCAG21/)
- [Radix UI — Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [shadcn/ui — Acessibilidade](https://ui.shadcn.com/docs/accessibility)

---

_Este documento é atualizado conforme o design system evolui. Última revisão: julho de 2026._
