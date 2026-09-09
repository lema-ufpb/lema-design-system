// Post-processes public/r/*.json after `shadcn build`.
//
// registry.json declares each component's source `path` (e.g.
// components/ds/header-nav.tsx) alongside its published `target`
// (components/ui/ds-header-nav.tsx) — every ds-* component is renamed with
// that prefix on install. Source files that reference a sibling ds-*
// component with a relative import (`./header-nav`) keep working in this
// repo (siblings sit unprefixed under components/ds/), but `shadcn build`
// copies that content verbatim into the published JSON, so consumers get
// `./header-nav` pointing at a file that was actually installed as
// `ds-header-nav.tsx` — a broken `Cannot find module` in every project that
// installs the component.
//
// This rewrites those relative imports in the *published* JSON only, to
// match each dependency's real installed basename. Source files under
// components/ds/ are untouched, so local dev/Storybook/tsc keep working
// exactly as before.
import { readFileSync, writeFileSync, readdirSync } from "fs"
import { basename, extname } from "path"

const registry = JSON.parse(readFileSync("registry.json", "utf-8"))

// sourceBasename (no ext) -> targetBasename (no ext), only when renamed.
const renameMap = new Map()
for (const item of registry.items) {
  for (const file of item.files || []) {
    if (!file.target) continue
    const sourceBase = basename(file.path, extname(file.path))
    const targetBase = basename(file.target, extname(file.target))
    if (sourceBase !== targetBase) {
      renameMap.set(sourceBase, targetBase)
    }
  }
}

const importRe = /from\s+(['"])\.\/([a-zA-Z0-9_-]+)\1/g

let filesChanged = 0
let importsRewritten = 0

for (const file of readdirSync("public/r")) {
  if (!file.endsWith(".json")) continue
  const fullPath = `public/r/${file}`
  const json = JSON.parse(readFileSync(fullPath, "utf-8"))
  let changed = false

  for (const f of json.files || []) {
    if (typeof f.content !== "string") continue
    const newContent = f.content.replace(importRe, (match, quote, name) => {
      const renamed = renameMap.get(name)
      if (!renamed || renamed === name) return match
      importsRewritten++
      return `from ${quote}./${renamed}${quote}`
    })
    if (newContent !== f.content) {
      f.content = newContent
      changed = true
    }
  }

  if (changed) {
    writeFileSync(fullPath, JSON.stringify(json, null, 2) + "\n")
    filesChanged++
  }
}

console.log(
  `✔ Rewrote ${importsRewritten} relative import(s) across ${filesChanged} registry file(s).`
)
