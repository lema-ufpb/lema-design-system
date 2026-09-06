# Spec: ds-settings-view

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/[nome-componente].md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

**Usar quando:** Precisar de um view complexo para área de configurações, separada em navegação interna (abas laterais) e painel principal.
**Não usar quando:** O usuário tiver que preencher um simples formulário linear.
**Alternativa se não se aplicar:** `signup-form.tsx` ou tabs simples.

---

## Localização

| Campo      | Valor                             |
| ---------- | --------------------------------- |
| Arquivo    | `components/ds/settings-view.tsx` |
| Tipo       | `registry:ui`                     |
| Categoria  | `Blocks` / `Layout`               |
| Depende de | `Tabs`, `Button`, `Separator`     |

---

## API — Props

| Prop          | Tipo             | Padrão | Obrigatória | Descrição            |
| ------------- | ---------------- | ------ | ----------- | -------------------- |
| `sections`    | `Array<Section>` | —      | ✓           | Seções de navegação  |
| `title`       | `string`         | —      | ✓           | Título da página     |
| `description` | `string`         | —      |             | Descrição secundária |

> Estender `HTMLAttributes<HTMLDivElement>`.

---

## Variantes CVA

N/A para o bloco principal. O menu interno usa estilos com botões em variante `ghost`.

---

## Tokens de design utilizados

| Token                   | Slot onde é usado          |
| ----------------------- | -------------------------- |
| `text-muted-foreground` | textos de descrição        |
| `border-border`         | divisória abaixo do header |

---

## Acessibilidade

| Requisito | Implementação                                      |
| --------- | -------------------------------------------------- |
| Teclado   | Navegação pelas abas laterais usando Tabs ou nav   |
| Rótulo    | Área principal com `aria-labelledby` para o título |

---

## Stories obrigatórias no Storybook

- [x] `Default` — exemplo contendo navegação em abas para Perfil, Conta e Notificações com forms mockados.

---

## Checklist antes de implementar

- [x] Escala tipográfica segue `sm=text-xs / md=text-sm / lg=text-base`
- [x] Todos os tokens são semânticos (sem raw Tailwind para cor/status)
- [x] `cn()` para todas as classes condicionais
- [x] Spacing usa apenas steps Tailwind (sem arbitrary values)
