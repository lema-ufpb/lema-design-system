import { readFileSync, readdirSync, existsSync } from "fs"

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

if (exitCode === 0) {
  console.log(
    `✓ Registry OK — ${registry.items.length} items, ${regFiles.size} files`
  )
} else {
  console.error(`\n⚠  Registry drift detected. Run \`npm run registry:build\` to sync.`)
}

process.exit(exitCode)
