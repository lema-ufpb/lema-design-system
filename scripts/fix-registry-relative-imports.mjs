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
// The same problem occurs with alias imports: a source file under
// components/ds/ may import a sibling via `@/components/ds/pagination`
// (valid in this repo, where the file sits unprefixed under components/ds/),
// but that sibling installs for consumers as `components/ui/ds-pagination.tsx`
// — so the published import must become `@/components/ui/ds-pagination`.
//
// Only imports that really point at a sibling under components/ds/ are
// rewritten: `@/components/ui/tabs` is the shadcn primitive (installed as
// `ui/tabs.tsx`) and must NOT be turned into `ds-tabs` just because a ds-*
// component with the same source basename exists. Relative imports are only
// rewritten inside files whose source lives in components/ds/.
//
// This rewrites both relative and `@/components/ds/...` alias imports in the
// *published* JSON only, to match each dependency's real installed basename
// and directory. Source files under components/ds/ are untouched, so local
// dev/Storybook/tsc keep working exactly as before.
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

const relativeImportRe = /from\s+(['"])\.\/([a-zA-Z0-9_-]+)\1/g
const aliasImportRe = /from\s+(['"])@\/components\/ds\/([a-zA-Z0-9_-]+)\1/g

let filesChanged = 0
let importsRewritten = 0

for (const file of readdirSync("public/r")) {
  if (!file.endsWith(".json")) continue
  const fullPath = `public/r/${file}`
  const json = JSON.parse(readFileSync(fullPath, "utf-8"))
  let changed = false

  for (const f of json.files || []) {
    if (typeof f.content !== "string") continue
    const isDsSource =
      typeof f.path === "string" && f.path.startsWith("components/ds/")
    let newContent = isDsSource
      ? f.content.replace(relativeImportRe, (match, quote, name) => {
          const renamed = renameMap.get(name)
          if (!renamed || renamed === name) return match
          importsRewritten++
          return `from ${quote}./${renamed}${quote}`
        })
      : f.content
    newContent = newContent.replace(aliasImportRe, (match, quote, name) => {
      const renamed = renameMap.get(name)
      if (!renamed || renamed === name) return match
      importsRewritten++
      return `from ${quote}@/components/ui/${renamed}${quote}`
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
