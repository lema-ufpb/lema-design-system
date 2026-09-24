import { readFileSync, readdirSync, existsSync } from "fs"

import { analyze, findCycles, NAMESPACE } from "./registry-deps.mjs"

const registry = JSON.parse(readFileSync("registry.json", "utf-8"))

const regFiles = new Set()
registry.items.forEach((item) =>
  (item.files || []).forEach((f) => regFiles.add(f.path))
)

let exitCode = 0

// Check 1: every file in registry exists on disk
regFiles.forEach((f) => {
  if (!existsSync(f)) {
    console.error(`✗ FALTA no disco: ${f}`)
    exitCode = 1
  }
})

// Check 2: every component file is registered
const dirs = ["components/ds", "components/ui", "lib"]
const skipFiles = new Set(["card-stats.tsx", "utils.ts", "version.ts"])
dirs.forEach((dir) => {
  if (!existsSync(dir)) return
  readdirSync(dir).forEach((f) => {
    if (
      (f.endsWith(".tsx") || f.endsWith(".ts")) &&
      !f.endsWith(".stories.tsx")
    ) {
      const full = dir + "/" + f
      if (!regFiles.has(full) && !skipFiles.has(f)) {
        console.error(`✗ NÃO REGISTRADO: ${full}`)
        exitCode = 1
      }
    }
  })
})

// Check 3: dependency metadata matches the imports of each source file, so a
// consumer installing one item gets everything it needs
const { result: needed, problems } = analyze(registry)
problems.forEach((p) => {
  console.error(`✗ ${p}`)
  exitCode = 1
})
registry.items.forEach((item) => {
  const need = needed.get(item.name)
  const regDeps = item.registryDependencies || []
  regDeps.forEach((d) => {
    if (!d.startsWith(NAMESPACE)) {
      console.error(
        `✗ ${item.name}: registryDependency "${d}" sem namespace (use ${NAMESPACE}${d})`
      )
      exitCode = 1
    }
  })
  need.registryDependencies.forEach((n) => {
    if (!regDeps.includes(NAMESPACE + n)) {
      console.error(
        `✗ ${item.name}: falta registryDependency "${NAMESPACE + n}" (importado no código)`
      )
      exitCode = 1
    }
  })
  ;[
    ["dependencies", need.dependencies],
    ["devDependencies", need.devDependencies],
  ].forEach(([field, set]) => {
    set.forEach((pkg) => {
      if (!(item[field] || []).includes(pkg)) {
        console.error(
          `✗ ${item.name}: falta ${field} "${pkg}" (importado no código)`
        )
        exitCode = 1
      }
    })
  })
})
findCycles(registry).forEach((c) => {
  console.error(`✗ ciclo em registryDependencies: ${c}`)
  exitCode = 1
})

if (exitCode === 0) {
  console.log(
    `✓ Registry OK — ${registry.items.length} items, ${regFiles.size} files`
  )
} else {
  console.error(
    `\n⚠  Registry drift detected. Run \`npm run registry:sync\` (dependências) e \`npm run registry:build\`.`
  )
}

process.exit(exitCode)
