# Product

## Register

product

## Users

Desenvolvedores e equipes de TI da Universidade Federal da Paraíba (UFPB), especialmente do Laboratório de Economia e Modelagem Aplicada (LEMA), que constroem aplicações institucionais — dashboards administrativos, sistemas de indicadores, portais de dados, painéis de gestão acadêmica. Também desenvolvedores externos que adotam o design system via registry público (`npx shadcn@latest add`).

O contexto de uso é profissional e orientado a dados: telas densas de informação, tabelas, gráficos, formulários, painéis de monitoramento. O usuário precisa de clareza, consistência e performance, não de ornamentos.

## Product Purpose

Fornecer um sistema de componentes React tipado, acessível, multi-tema e internacionalizado que garanta consistência visual e de interação em todas as aplicações institucionais da UFPB. Reduz o custo de desenvolvimento, unifica a experiência do usuário final e estabelece um padrão de qualidade baseado em WCAG 2.1 AA.

Sucesso é medido por: adoção em projetos reais, consistência entre aplicações, conformidade de acessibilidade, e facilidade de manutenção.

## Brand Personality

**Moderno, confiável, flexível.**

- **Moderno**: componentes atualizados com a stack mais recente (React 19, Tailwind v4, OKLCH), sem parecer genérico ou seguir modas passageiras.
- **Confiável**: tipos estritos, testes abrangentes (840+ testes), documentação via Storybook, spec-first workflow. Um componente do LEMA-DS funciona como esperado em qualquer contexto.
- **Flexível**: multi-tema (neutral, blue, green, violet), i18n com 4 locales, variantes de tamanho e estilo via CVA, modo escuro/claro. Adapta-se à aplicação, não o contrário.

Tom editorial: técnico mas acessível, preciso sem ser árido. As aplicações finais devem inspirar confiança, não euforia.

## Anti-references

- **Visual genérico SaaS**: evitar o cinza-azulado padrão de dashboards corporativos genéricos. Sem side-stripe borders, sem cartões idênticos repetidos, sem hero-metric templates.
- **Tema Bootstrap**: nada de aparência de template comprado ou framework CSS dos anos 2010. Sem glassmorphism decorativo, gradients, sombras exageradas.
- **Excesso de decoração**: sem gradient text, sem grid backgrounds decorativos, sem eyebrow tracking em toda seção. O design serve aos dados, não compete com eles.

## Design Principles

1. **Dados em primeiro lugar**: o layout serve ao conteúdo — tabelas, gráficos e métricas são protagonistas. Componentes são ferramentas de leitura e análise, não de decoração.
2. **Consistência sobre criatividade**: uma vez que um padrão é estabelecido (escala tipográfica, tokens de cor, espaçamento), ele é aplicado em todo o sistema. A criatividade está em resolver problemas de interação, não em variar estilos.
3. **Acessibilidade não é opcional**: WCAG 2.1 AA é linha de base. Todo componente é testado com `@storybook/addon-a11y` e suporta navegação por teclado, reduced motion, e contraste suficiente.
4. **Internacionalização desde o início**: todo texto visível passa pelo dicionário i18n. pt-BR é locale primário, en-US é fallback, es-ES e fr-FR são suportados.
5. **API enxuta, DX rica**: componentes expõem o mínimo de props necessário, com defaults inteligentes. A experiência do desenvolvedor consumidor é tão importante quanto a do usuário final.

## Accessibility & Inclusion

- Alvo: WCAG 2.1 AA
- Suporte a navegação por teclado em todos os componentes interativos
- `prefers-reduced-motion` respeitado em todas as animações
- Contraste mínimo 4.5:1 para texto corpo, 3:1 para texto grande
- Modo escuro nativo com `next-themes`
- i18n para todos os textos visíveis
- `@storybook/addon-a11y` configurado (atualmente em modo "todo", planejado para hardening)
