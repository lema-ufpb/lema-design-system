# Spec: ds-command-palette

> Paleta de comandos (Command Palette) acessível via atalho de teclado.

---

## Propósito

Fornecer uma busca global e paleta de ações rápidas, geralmente acionada por `Cmd/Ctrl + K`. É um componente composto por cima do primitivo `Command` (`cmdk`), simplificando a declaração de itens agrupados e lidando com a abertura via atalho.

**Usar quando:** O sistema tem ações globais, navegação rápida ou busca geral de recursos e precisa de um modal unificado e acessível pelo teclado.

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/command-palette.tsx`            |
| Tipo       | `registry:ui` (name: `ds-command-palette`)     |
| Categoria  | `Navigation`                                   |
| Depende de | `command`, `dialog`, `lucide-react`, `ui-i18n` |

---

## Estrutura de Dados (Items e Groups)

```typescript
export interface CommandPaletteItem {
  id: string
  title: string
  icon?: React.ReactNode
  shortcut?: string[] // Ex: ["⌘", "K"]
  onSelect: () => void
}

export interface CommandPaletteGroup {
  heading?: string
  items: CommandPaletteItem[]
}
```

## API — Props

| Prop           | Tipo                      | Padrão    | Obrigatória | Descrição                                      |
| -------------- | ------------------------- | --------- | ----------- | ---------------------------------------------- |
| `groups`       | `CommandPaletteGroup[]`   | —         | Sim         | Grupos de comandos                             |
| `open`         | `boolean`                 | —         |             | Estado controlado (opcional)                   |
| `onOpenChange` | `(open: boolean) => void` | —         |             | Callback de abertura/fechamento                |
| `placeholder`  | `string`                  | —         |             | Placeholder da busca                           |
| `shortcut`     | `string`                  | `"k"`     |             | Tecla de atalho global (`Cmd/Ctrl + shortcut`) |
| `locale`       | `UILocale`                | `"pt-BR"` |             | Para i18n ("Sem resultados encontrados")       |

---

## Variantes CVA

Nenhuma variante visual configurável externamente, apenas os tamanhos padrão do `CommandDialog`. O design visual herda totalmente os tokens do `components/ui/command.tsx`.

---

## Acessibilidade

| Requisito      | Implementação                                                         |
| -------------- | --------------------------------------------------------------------- |
| Role semântico | Combobox (via `cmdk`) no `CommandDialog`                              |
| Teclado        | Setas para navegar, Enter para acionar, Esc para fechar               |
| Atalho Global  | `useEffect` na janela para detectar o evento (`Meta/Ctrl + shortcut`) |

---

## Comportamentos e estados

- **Abertura:** Ao pressionar o atalho configurado (padrão `Cmd+K` ou `Ctrl+K`), o dialog é ativado, contanto que o foco não esteja em um input de texto.
- **Fechamento:** Após um item ser selecionado via `onSelect`, a paleta deve fechar automaticamente, a menos que customizado internamente.

---

## Stories obrigatórias no Storybook

- [x] `Default` (Controlado no Story via state local simulando a UI, com botão de gatilho para demonstração, pois interceptar atalhos na janela do Storybook pode colidir).

---

## Checklist antes de implementar

- [x] Utilizar `<CommandDialog>` e seus subcomponentes.
- [x] Lidar com o atalho usando `useEffect`.
- [x] Traduzir a string vazia usando `UI_I18N`.
