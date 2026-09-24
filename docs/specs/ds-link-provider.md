# Spec: LinkProvider

> Provider de contexto que define o componente de link (`next/link`, `Link` do React Router, `<a>`…) usado pelos componentes de navegação `ds-*`, mantendo o design system independente de framework.

---

## Propósito

Componentes de navegação (`ds-header-*`, `ds-footer-menu`) precisam renderizar links. Importar `next/link` amarrava o design system ao Next.js e quebrava em Vite, React Router, TanStack Start e Astro (`Cannot find module 'next/link'`). O `DSLinkProvider` inverte a dependência: o **app** informa seu componente de link; os `ds-*` só conhecem a interface `DSLinkProps`.

**Usar quando:** o app quer navegação client-side (router) nos headers/footers.

**Não usar quando:** links comuns (`<a>`, recarrega a página) bastam — sem provider o padrão já é `<a>`.

---

## Localização

| Campo      | Valor                                                |
| ---------- | ---------------------------------------------------- |
| Arquivo    | `components/ds/link-provider.tsx`                    |
| Tipo       | `registry:ui` (name: `ds-link-provider`)             |
| Target     | `components/ui/ds-link-provider.tsx` (no consumidor) |
| Categoria  | Utilities                                            |
| Depende de | Nada (só `react`).                                   |

---

## API

```tsx
export type DSLinkProps = Omit<React.ComponentPropsWithRef<"a">, "href"> & {
  href: string
}
export type DSLinkComponent = React.ComponentType<DSLinkProps>

export function DSLinkProvider(props: {
  link: DSLinkComponent
  children: React.ReactNode
}): JSX.Element
export function DSLink(props: DSLinkProps): JSX.Element
export function useDSLink(): DSLinkComponent
```

| Export           | Descrição                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| `DSLinkProvider` | Fornece o componente de link à subárvore. O provider mais próximo vence. |
| `DSLink`         | Link usado internamente pelos `ds-*`; delega ao componente do provider.  |
| `useDSLink()`    | Componente de link efetivo: do provider, senão `<a>`.                    |

### Uso por framework

```tsx
// Next.js
import Link from "next/link"
<DSLinkProvider link={Link}>{children}</DSLinkProvider>

// React Router / TanStack Start
<DSLinkProvider link={({ href, ...p }) => <RouterLink to={href} {...p} />}>{children}</DSLinkProvider>

// Vite, Astro ou sem router: não precisa de provider (renderiza <a>)
```

---

## Componentes que consomem

`ds-header-nav`, `ds-header-brand`, `ds-header-mega`, `ds-header-mobile-drawer`, `ds-footer-menu`.

---

## Regras de framework-agnosticismo (`components/ds/` e `lib/`)

- Proibido importar `next` ou `next/*` (regra ESLint `no-restricted-imports`).
- Sem SSR: usar `ClientOnly` (`lib/client-only.tsx`) em vez de `next/dynamic` com `ssr:false`; para code-splitting, `React.lazy` + `Suspense`.
- Tokens de cor customizados (`success`, `warning`, `risk-*`, `highlight-*`) vêm do item `tokens` (`registry:theme`), declarado como dependência dos itens que os usam.

---

## Acessibilidade

Não renderiza UI própria; repassa `aria-*` e demais props ao componente de link.

---

## Stories

`Utilities/LinkProvider`: Default (âncora padrão), CustomLink (componente do provider), ClientSideNavigation (interação via `play`).
