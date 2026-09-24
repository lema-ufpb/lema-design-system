"use client"

import * as React from "react"

// ── Types ──

/** Props mínimas que todo componente de link do consumidor deve aceitar. */
export type DSLinkProps = Omit<React.ComponentPropsWithRef<"a">, "href"> & {
  href: string
}

/** Componente de link do consumidor (`next/link`, `Link` do react-router, `a`…). */
export type DSLinkComponent = React.ComponentType<DSLinkProps>

export interface DSLinkProviderProps {
  /** Componente de link usado por todos os `ds-*` da subárvore. */
  link: DSLinkComponent
  children: React.ReactNode
}

// ── Helpers ──

const DefaultLink: DSLinkComponent = (props) => <a {...props} />

const DSLinkContext = React.createContext<DSLinkComponent>(DefaultLink)

// ── Component ──

/**
 * Define o componente de link do app para os componentes `ds-*` de navegação
 * (header, footer). Sem provider, renderiza `<a>` — funciona em qualquer
 * framework; para navegação client-side passe o `Link` do seu router.
 */
function DSLinkProvider({ link, children }: DSLinkProviderProps) {
  return (
    <DSLinkContext.Provider value={link}>{children}</DSLinkContext.Provider>
  )
}

/** Componente de link efetivo: o do `DSLinkProvider` mais próximo, senão `<a>`. */
function useDSLink(): DSLinkComponent {
  return React.useContext(DSLinkContext)
}

/** Link usado internamente pelos `ds-*`; delega ao componente do provider. */
function DSLink(props: DSLinkProps) {
  return React.createElement(useDSLink(), props)
}

export { DSLinkProvider, DSLink, useDSLink }
