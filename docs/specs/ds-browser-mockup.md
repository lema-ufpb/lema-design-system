# Spec: BrowserMockup

---

## Propósito

Moldura estilizada simulando janela de navegador ou terminal de sistema operacional para apresentar screenshots de dashboard, pré-visualizações de produto e interfaces interativas em seções hero.

**Usar quando:** Apresentar aplicações web, dashboards, código ou previews em destaque dentro de páginas promocionais ou documentação.
**Não usar quando:** Apenas exibir uma imagem simples sem contexto de aplicação (usar `<img>` convencional ou `Card`).
**Alternativa se não se aplicar:** `Card` com imagem ou `Dialog`.

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/browser-mockup.tsx` |
| Tipo       | `registry:ui`                      |
| Categoria  | `Media`                            |
| Depende de | —                                  |

---

## API — Props

| Prop             | Tipo                                              | Padrão      | Obrigatória | Descrição                                      |
| ---------------- | ------------------------------------------------- | ----------- | ----------- | ---------------------------------------------- |
| `variant`        | `"default" \| "minimal" \| "glass" \| "terminal"` | `"default"` |             | Estilo visual da moldura                       |
| `url`            | `string`                                          | —           |             | URL fictícia ou título exibido na barra        |
| `controls`       | `"mac" \| "windows" \| "none"`                    | `"mac"`     |             | Estilo dos botões de controle da janela        |
| `showAddressBar` | `boolean`                                         | `true`      |             | Se a barra de endereço deve ser exibida        |
| `glow`           | `boolean`                                         | `false`     |             | Adiciona efeito de brilho suave ao fundo/borda |
| `children`       | `React.ReactNode`                                 | —           | [x]         | Conteúdo interno (imagem, app embed, etc.)     |
| `className`      | `string`                                          | —           |             | Classes extras                                 |

---

## Variantes CVA

| Dimensão  | Valores                                   | Padrão    |
| --------- | ----------------------------------------- | --------- |
| `variant` | `default`, `minimal`, `glass`, `terminal` | `default` |

- `browserMockupVariants` — container externo com borda, cantos arredondados (`rounded-xl` ou `rounded-2xl`) e overflow hidden.

---

## Acessibilidade

- [x] Controles de janela (círculos) usam `aria-hidden="true"` para não poluir leitores de tela.
- [x] Barra de URL possui texto acessível ou título semântico.
- [x] Todo conteúdo filho (imagens) deve prover texto alternativo apropriado (`alt`).
