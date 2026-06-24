# Spec: Avatar

> Uma imagem que representa um usuário ou entidade, com fallback para quando a imagem não carrega.

---

## Propósito

O Avatar exibe a foto de perfil de um usuário com fallback automático para iniciais quando a imagem está indisponível. Construído sobre `AvatarPrimitive` da Radix UI, suporta três tamanhos (`sm`, `default`, `lg`) controlados via `data-size` e inclui subcomponentes auxiliares: `AvatarBadge` (indicador de status posicionado no canto inferior direito) e `AvatarGroup`/`AvatarGroupCount` (para empilhamento visual de múltiplos avatares com sobreposição e anéis de borda). O componente é `"use client"` devido ao uso do primitivo Radix que gerencia estado de carregamento de imagem.

**Usar quando:** Exibir identidade visual de usuários em perfis, listas de participantes, comentários, headers de sistemas ou cards de equipe. `AvatarGroup` é ideal para mostrar múltiplos participantes com sobreposição economizando espaço.

**Não usar quando:** Apenas um ícone ou placeholder genérico é suficiente. Evitar para representações que não são pessoas físicas (preferir `Badge` ou ícones).

**Alternativa se não se aplicar:** `Badge` com iniciais, ícone lucide `UserCircle`, ou `Skeleton` circular para loading.

---

## Localização

| Campo | Valor |
|-------|-------|
| Arquivo | `components/ui/avatar.tsx` |
| Tipo | `registry:ui` (name: `avatar`) |
| Categoria | Data Display |
| Depende de | Nenhuma |

---

## API — Props

### Avatar (Root)
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Não | Tamanho do avatar |
| `className` | `string` | — | Não | Classes adicionais |

### AvatarImage
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `src` | `string` | — | Sim | URL da imagem |
| `alt` | `string` | — | Sim | Texto alternativo |

### AvatarFallback
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `children` | `ReactNode` | — | Sim | Iniciais ou ícone de fallback |
| `className` | `string` | — | Não | Classes adicionais |

### AvatarBadge
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### AvatarGroup
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

### AvatarGroupCount
| Prop | Tipo | Padrão | Obrigatória | Descrição |
|------|------|--------|-------------|-----------|
| `className` | `string` | — | Não | Classes adicionais |

---

## Tokens de design utilizados

| Token | Slot onde é usado |
|-------|-------------------|
| `--border` | Overlay de borda ao redor do avatar (`after:border`) |
| `--muted` | Fundo do fallback e do AvatarGroupCount |
| `--muted-foreground` | Cor do texto do fallback |
| `--primary` | Fundo do badge de status |
| `--primary-foreground` | Cor do ícone/texto do badge |
| `--background` | Anel separador entre avatares no grupo (`ring-background`) |

---

## Comportamentos e estados

| Estado | Comportamento esperado |
|--------|-----------------------|
| Imagem carregada | Exibe `AvatarImage` com `object-cover` |
| Imagem falhou/nula | Exibe `AvatarFallback` com iniciais |
| Tamanho sm | `size-6` (24px), fallback `text-xs` |
| Tamanho default | `size-8` (32px), fallback `text-sm` |
| Tamanho lg | `size-10` (40px), fallback `text-base` |
| AvatarGroup | Avatares sobrepostos com `[&>:not(:first-child)]:-ml-2` e `ring-2 ring-background` |
| AvatarBadge | Posicionado `absolute right-0 bottom-0` com `ring-2 ring-background` |

---

## Acessibilidade

| Requisito | Implementação |
|-----------|---------------|
| Imagem com alt | `AvatarImage` deve receber `alt` descritivo |
| Fallback semântico | `AvatarFallback` exibe iniciais como fallback textual |
| Badge | `span` sem role específico; conteúdo deve ser auto-descritivo |
| Grupo | Container `div` sem role; uso de `aria-label` recomendado |

---

## Stories obrigatórias no Storybook

- [x] `Default` — Avatar com imagem carregada e fallback de iniciais
- [x] `Fallback` — Avatar com imagem vazia demonstrando fallback
- [x] `Sizes` — Três tamanhos (sm, md, lg) via `className` custom (não correspondem ao prop `size` do componente — demonstra tamanhos arbitrários 32/48/64px)

---

## Checklist antes de implementar

- [x] Escala tipográfica — fallback `text-sm` (default), `text-xs` (sm), `text-base` (lg)
- [x] Tokens semânticos — `border`, `muted`, `muted-foreground`, `primary`, `primary-foreground`, `background`
- [x] Badge — tamanhos proporcionais ao avatar (`size-2` sm, `size-2.5` default, `size-3` lg)
- [x] Grupo — `[&>:not(:first-child)]:-ml-2` com `ring-2` para efeito de sobreposição (overlap negativo via `ml` individual em vez de `space-x` proibido)
- [x] Borda overlay — `after:absolute after:inset-0 after:rounded-full after:border` com suporte a dark mode via `mix-blend-mode`
