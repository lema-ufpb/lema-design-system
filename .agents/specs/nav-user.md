# Spec: NavUser

---

## Propósito

Menu de usuário para sidebar/navbar com avatar, nome, email e dropdown de ações (agrupáveis). Inclui estado de loading com Skeleton e tratamento de usuário ausente.

**Usar quando:** Sidebar ou topbar precisa exibir usuário logado com menu de ações (perfil, configurações, logout).

**Não usar quando:** Menu de usuário complexo com submenus aninhados. Precisa de avatar sem dropdown.

**Alternativa se não se aplicar:** `Avatar` + `DropdownMenu` manual, ou `Button` com ícone de usuário.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/custom/nav-user.tsx` |
| data-slot | `nav-user` |
| Tipo | `registry:component` (name: `nav-user`) |
| Categoria | `Navigation` |
| Depende de | `Avatar`, `AvatarFallback`, `AvatarImage` (shadcn), `Button` (shadcn), `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuTrigger` (shadcn), `Skeleton` (shadcn), `ChevronsUpDown` (lucide) |

---

## API — Props

**NavUser (component):**

| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `user` | `UserMenuData` | — | | Dados do usuário (name, email, avatarUrl) |
| `groups` | `UserMenuItem[][]` | `[]` | | Grupos de itens do menu |
| `loading` | `boolean` | `false` | | Exibe Skeleton no lugar |

**UserMenuData:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `name` | `string` | Nome completo do usuário |
| `email` | `string` | Email do usuário |
| `avatarUrl` | `string` (opcional) | URL do avatar |

**UserMenuItem:**

| Prop | Tipo | Descrição |
|------|------|-----------|
| `id` | `string` | Identificador único |
| `label` | `string` | Texto do item |
| `icon` | `ReactNode` (opcional) | Ícone JSX pré-renderizado |
| `shortcut` | `string` (opcional) | Atalho de teclado |
| `onClick` | `() => void` (opcional) | Callback de clique |
| `variant` | `"default" \| "destructive"` (opcional) | Variante visual |

---

## Variantes CVA

Nenhuma. O componente não usa `cva()` — delega variantes visuais ao `Button` (shadcn) e `DropdownMenuItem`.

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|------------------|
| `text-muted-foreground` | email, ChevronsUpDown ícone |
| `text-destructive` | item de menu com `variant="destructive"` |
| `text-destructive` (focus) | foco em item destructive |

---

## Escala tipográfica e de tamanho

| Slot | Tamanho |
|------|---------|
| Nome (trigger + dropdown) | `text-sm font-medium` |
| Email (trigger + dropdown) | `text-xs text-muted-foreground` |
| Avatar (trigger) | `size-7 rounded-lg` |
| Avatar (dropdown) | `size-8 rounded-lg` |
| Skeleton avatar | `size-7 shrink-0 rounded-lg` |
| Skeleton name | `h-3 w-20 rounded-md` |
| Skeleton email | `h-2.5 w-28 rounded-md` |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|----------------------|
| `loading={true}` | `<div>` com `<Skeleton>` no lugar do avatar + texto + ChevronsUpDown opaco |
| `user` = `undefined`/`null` | Mesmo layout do loading (sem sessão detectada) |
| `user` sem `avatarUrl` | AvatarExibe iniciais (2 primeiras letras de cada nome, em maiúsculas) |
| `groups` vazio | Dropdown exibe apenas o header com dados do usuário |
| `variant="destructive"` | Item em `text-destructive` |
| Sem grupos | DropdownMenuContent sem separadores, apenas label do usuário |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|--------------|
| Role semântico | DropdownMenu (shadcn gerencia a11y) |
| Avatar | `alt={user.name}` no AvatarImage |
| Fallback initials | AvatarFallback com iniciais em `text-xs` |
| Trigger | `Button variant="ghost"` como trigger do dropdown |
| Shortcuts | `DropdownMenuShortcut` para atalhos de teclado |
| i18n | N/A — labels vêm dos dados (user.name, item.label) |

---

## Stories obrigatórias no Storybook

- [x] `Loading` — Loading
- [x] `Default` — Default
- [x] `WithoutAvatar` — Without Avatar
- [x] `DashboardMock` — Dashboard Mock

## Checklist antes de implementar

- [x] Escala tipográfica — N/A (usa shadcn Button/Avatar)
- [x] Tokens semânticos usados (text-muted-foreground, text-destructive)
- [x] `cva()` — N/A (sem variantes próprias)
- [x] Loading usa `<Skeleton>` com dimensões corretas
- [x] `tabular-nums` — N/A
- [x] `truncate` em name e email
- [x] `aria-label` — N/A (shadcn gerencia)
- [x] `cn()` para classes condicionais
- [x] Spacing sem arbitrary values
- [x] Prop `locale` — N/A (sem i18n interna)
