# Spec: AspectRatio

> Um contêiner que mantém uma proporção fixa (largura:altura) para seu conteúdo filho.

---

## Propósito

O AspectRatio é um wrapper puramente funcional que garante que seu conteúdo filho mantenha uma proporção específica independentemente do tamanho do contêiner pai. Construído sobre `AspectRatio.Root` da Radix UI, aceita um `ratio` numérico (padrão `1` para quadrado) e renderiza o filho dentro de um contêiner com altura calculada a partir da largura disponível. É frequentemente usado com imagens, vídeos incorporados, mapas e gráficos que precisam de proporções previsíveis em layouts responsivos. No design system, não aplica tokens de design próprios — todo o estilo visual é delegado ao conteúdo filho.

**Usar quando:** Imagens ou mídia precisam manter proporção específica em contêineres de largura variável. Útil para galerias, cards de mídia, thumbnails e embeds de vídeo.

**Não usar quando:** O conteúdo já tem altura/largura definidas por CSS ou o layout não precisa de proporção fixa. Evitar para imagens que devem preencher todo o espaço disponível sem restrição de aspecto.

**Alternativa se não se aplicar:** `object-fit` diretamente no elemento `<img>` para casos simples, ou `overflow-hidden` com dimensões fixas.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/aspect-ratio.tsx` |
| Tipo | `registry:ui` (name: `aspect-ratio`) |
| Categoria | Layout |
| Depende de | Nenhuma |

---

## API — Props

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `ratio` | `number` | — | Não | Proporção largura/altura (ex: `16/9`, `4/3`, `1`) |
| `className` | `string` | — | Não | Classes adicionais |
| `children` | `ReactNode` | — | Sim | Conteúdo a ser mantido na proporção |

> As demais props são herdadas de `AspectRatioPrimitive.Root`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| *(nenhum)* | Componente puramente layout; sem tokens semânticos |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Renderização | Altura calculada como `largura / ratio` |
| Redimensionamento | Altura atualiza automaticamente ao redimensionar o pai |
| Overflow | Conteúdo filho com `object-cover` ou similar controla o preenchimento |
| Filho ausente | Nenhum conteúdo renderizado |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Estrutura semântica | Nenhum role ou aria próprio; conteúdo filho é responsável pela acessibilidade |
| Imagens | `alt` deve ser fornecido no elemento `<img>` filho |
| Navegação | Não adiciona elementos focáveis |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Proporção 16:9 em contêiner de 400px
- [x] `Square` — Proporção 1:1 em contêiner de 200px
- [x] `Wide` — Proporção 21:9 em contêiner de 600px (banners widescreen)

---

## Checklist antes de implementar

- [x] Proporção padrão — `ratio={1}` quando não especificado
- [x] Responsivo — Funciona com qualquer largura de contêiner pai
- [x] Tokens — Nenhum token semântico aplicado
- [x] Filho — `AspectRatio` apenas calcula altura; conteúdo filho deve gerenciar `size-full` e `object-cover`
