// Derives the dependency metadata each registry item MUST declare from the
// imports of its real source files, so consumers installing a single item via
// `npx shadcn@latest add @lema-ds/<name>` get everything it needs:
//
//   - local imports (`@/lib/*`, `@/components/{ui,ds}/*`, `./sibling`) become
//     `registryDependencies: ["@lema-ds/<item>"]`
//   - bare package imports become `dependencies`
//
// Shared by `sync-registry-deps.mjs` (writes registry.json) and
// `validate-registry.mjs` (fails when registry.json drifts from the sources).
import { readFileSync, existsSync } from "fs"
import { builtinModules } from "module"
import { dirname, join, normalize } from "path"

export const NAMESPACE = "@lema-ds/"

// Provided by the shadcn CLI / the consumer project, never by this registry.
const PROVIDED_ALIASES = new Set(["lib/utils"])
const PROVIDED_PACKAGES = new Set(["react", "react-dom", "next"])

const importRe =
  /(?:^|\n)\s*(?:import|export)\s[^"'`;]*?from\s*["']([^"']+)["']|(?:^|\n)\s*import\s*["']([^"']+)["']/g

const stripExt = (p) => p.replace(/\.(tsx?|jsx?)$/, "")

function packageName(specifier) {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

export function collectImports(source) {
  const found = new Set()
  for (const m of source.matchAll(importRe)) found.add(m[1] ?? m[2])
  return [...found]
}

export function analyze(
  registry,
  pkg = JSON.parse(readFileSync("package.json", "utf-8"))
) {
  const byPath = new Map()
  for (const item of registry.items)
    for (const f of item.files || []) byPath.set(stripExt(f.path), item.name)

  const declaredPackages = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ])

  const result = new Map()
  const problems = []

  for (const item of registry.items) {
    const registryDependencies = new Set()
    const dependencies = new Set()
    const devDependencies = new Set()

    for (const file of item.files || []) {
      if (!existsSync(file.path)) continue
      const source = readFileSync(file.path, "utf-8")

      for (const spec of collectImports(source)) {
        if (spec.startsWith("@/")) {
          const key = spec.slice(2)
          if (PROVIDED_ALIASES.has(key) || key.startsWith("hooks/")) {
            // hooks/* come from shadcn (e.g. use-mobile) unless this registry ships them
            const owner = byPath.get(key)
            if (owner && owner !== item.name) registryDependencies.add(owner)
            continue
          }
          const owner = byPath.get(key)
          if (!owner) {
            problems.push(
              `${item.name}: import "${spec}" não corresponde a nenhum item do registry`
            )
          } else if (owner !== item.name) {
            registryDependencies.add(owner)
          }
        } else if (spec.startsWith(".")) {
          const key = stripExt(normalize(join(dirname(file.path), spec)))
          const owner = byPath.get(key)
          if (!owner) {
            problems.push(
              `${item.name}: import relativo "${spec}" (${file.path}) não corresponde a nenhum item do registry`
            )
          } else if (owner !== item.name) {
            registryDependencies.add(owner)
          }
        } else {
          const name = packageName(spec)
          if (
            PROVIDED_PACKAGES.has(name) ||
            name === "next" ||
            builtinModules.includes(name) ||
            spec.startsWith("node:")
          )
            continue
          if (
            !declaredPackages.has(name) &&
            declaredPackages.has(`@types/${name}`)
          ) {
            // type-only package (e.g. `import type ... from "geojson"`)
            devDependencies.add(`@types/${name}`)
            continue
          }
          if (!declaredPackages.has(name)) {
            problems.push(
              `${item.name}: pacote "${name}" não está no package.json do design-system`
            )
            continue
          }
          dependencies.add(name)
        }
      }
    }
    result.set(item.name, {
      registryDependencies,
      dependencies,
      devDependencies,
    })
  }
  return { result, problems }
}

export function findCycles(registry) {
  const deps = new Map(
    registry.items.map((i) => [
      i.name,
      (i.registryDependencies || [])
        .filter((d) => d.startsWith(NAMESPACE))
        .map((d) => d.slice(NAMESPACE.length)),
    ])
  )
  const cycles = []
  const state = new Map()
  const stack = []
  const visit = (n) => {
    if (state.get(n) === 2) return
    if (state.get(n) === 1) {
      cycles.push([...stack.slice(stack.indexOf(n)), n].join(" -> "))
      return
    }
    state.set(n, 1)
    stack.push(n)
    for (const d of deps.get(n) || []) visit(d)
    stack.pop()
    state.set(n, 2)
  }
  for (const n of deps.keys()) visit(n)
  return cycles
}
