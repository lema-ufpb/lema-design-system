# Spec: Changelog (ds-changelog)

> Spec do componente `Changelog` para o LEMA Design System.

---

## Propósito

O `Changelog` fornece uma visualização elegante e estruturada de notas de lançamento (release notes), histórico de versões e atualizações de produtos ou bibliotecas, com categorização semântica de alterações (novidades, correções, melhorias e quebras de compatibilidade).

**Usar quando:**

- Páginas de documentação e notas de versão de produtos digitais ou pacotes de software.
- Modais de "O que há de novo?" (What's New) exibidos após uma nova atualização.
- Histórico de versões de conjuntos de dados e especificações técnicas.

**Não usar quando:**

- Feed de atividades de usuários ou logs de auditoria em tempo real (use `ActivityFeed`).
- Cronologia estática de história institucional de marketing (use `AboutMilestones`).

**Alternativa se não se aplicar:** `ActivityFeed`, `AboutMilestones`.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/changelog.tsx`  |
| Tipo       | `registry:ui`                  |
| Categoria  | `Data Display`                 |
| Depende de | `badge`, `skeleton`, `ui-i18n` |

---

## API — Props

| Prop        | Tipo                 | Padrão    | Obrigatória | Descrição                               |
| ----------- | -------------------- | --------- | ----------- | --------------------------------------- |
| `releases`  | `ChangelogRelease[]` | —         | ✓           | Lista ordenada de lançamentos de versão |
| `loading`   | `boolean`            | `false`   |             | Exibe esqueleto de carregamento         |
| `locale`    | `UILocale`           | `"pt-BR"` |             | Idioma para tags e títulos              |
| `className` | `string`             | —         |             | Classes customizadas para o wrapper     |

### Tipos `ChangelogRelease` e `ChangelogEntry`

```tsx
export type ChangeType = "feature" | "fix" | "improvement" | "breaking"

export interface ChangelogEntry {
  type: ChangeType
  description: React.ReactNode
}

export interface ChangelogRelease {
  version: string
  date: string | Date
  title: string
  isLatest?: boolean
  changes: ChangelogEntry[]
}
```

---

## Tokens de design utilizados

| Token                                | Slot onde é usado                          |
| ------------------------------------ | ------------------------------------------ |
| `bg-primary/15 text-primary`         | Tag para `feature` (Novas Funcionalidades) |
| `bg-warning/15 text-warning`         | Tag para `fix` (Correções)                 |
| `bg-success/15 text-success`         | Tag para `improvement` (Melhorias)         |
| `bg-destructive/15 text-destructive` | Tag para `breaking` (Mudanças Críticas)    |
| `bg-border`                          | Linha/trilho vertical de conexão temporal  |

---

## Escala tipográfica e de tamanho

| Slot        | Tamanho                               |
| ----------- | ------------------------------------- |
| Versão      | `text-base font-bold font-mono`       |
| Data        | `text-xs text-muted-foreground`       |
| Título      | `text-sm font-semibold`               |
| Descrição   | `text-xs text-foreground`             |
| Tag de tipo | `text-[10px] uppercase font-semibold` |
