# Spec: ShortcutSheet (ds-shortcut-sheet)

> Spec do componente `ShortcutSheet` para o LEMA Design System.

---

## Propósito

O `ShortcutSheet` fornece uma janela modal ou painel de referência com todos os atalhos de teclado da aplicação agrupados por categoria (Geral, Navegação, Edição, Simulações), com suporte a busca rápida, renderização visual com `<Kbd>` e escuta global da tecla `?`.

**Usar quando:**

- Aplicações web ricas com foco em produtividade (dashboards analíticos, IDEs, editores de modelos).
- Permitir que os usuários descubram e consultem os atalhos disponíveis no sistema.

**Não usar quando:**

- Paleta de comandos executável direta (use `Command`).

**Alternativa se não se aplicar:** `Command`.

---

## Localização

| Campo      | Valor                                              |
| ---------- | -------------------------------------------------- |
| Arquivo    | `components/ds/shortcut-sheet.tsx`                 |
| Tipo       | `registry:ui`                                      |
| Categoria  | `Navigation`                                       |
| Depende de | `dialog`, `kbd`, `input`, `scroll-area`, `ui-i18n` |

---

## API — Props

| Prop                   | Tipo                      | Padrão    | Obrigatória | Descrição                                      |
| ---------------------- | ------------------------- | --------- | ----------- | ---------------------------------------------- |
| `open`                 | `boolean`                 | —         |             | Estado controlado de abertura                  |
| `onOpenChange`         | `(open: boolean) => void` | —         |             | Callback de alteração de abertura              |
| `groups`               | `ShortcutGroup[]`         | —         | ✓           | Grupos de atalhos categorizados                |
| `enableGlobalListener` | `boolean`                 | `true`    |             | Abre automaticamente ao pressionar a tecla `?` |
| `trigger`              | `React.ReactNode`         | —         |             | Gatilho customizado para abrir o diálogo       |
| `locale`               | `UILocale`                | `"pt-BR"` |             | Idioma para títulos e busca                    |
| `className`            | `string`                  | —         |             | Classes customizadas para o diálogo            |

### Tipo `ShortcutGroup`

```tsx
export interface ShortcutItem {
  id: string
  label: string
  keys: string[]
  description?: string
}

export interface ShortcutGroup {
  name: string
  shortcuts: ShortcutItem[]
}
```

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                   |
| ----------------------- | ----------------------------------- |
| `bg-card`               | Fundo do diálogo e blocos de atalho |
| `text-foreground`       | Nome da ação e teclas               |
| `text-muted-foreground` | Categoria e descrições              |
| `bg-muted`              | Teclas de atalho `<Kbd>`            |

---

## Escala tipográfica e de tamanho

| Slot      | Tamanho                                          |
| --------- | ------------------------------------------------ |
| Título    | `text-base font-semibold`                        |
| Ação      | `text-xs font-medium`                            |
| Categoria | `text-xs font-semibold uppercase tracking-wider` |
| Tecla Kbd | `h-5 px-1.5 text-[11px]`                         |
