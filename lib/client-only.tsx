"use client"

import * as React from "react"

// ── Types ──

export interface ClientOnlyProps {
  children: React.ReactNode
  /** Renderizado no servidor e na hidratação, antes de o cliente assumir. */
  fallback?: React.ReactNode
}

// ── Helpers ──

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

// ── Component ──

/**
 * Renderiza `children` somente no cliente (após a hidratação).
 * Substitui `next/dynamic` com `ssr: false`: funciona em qualquer framework
 * React (Next, Vite, Remix, Astro) e não causa mismatch de hidratação.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )
  return <>{isClient ? children : fallback}</>
}
