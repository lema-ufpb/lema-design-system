// Adds the registryDependencies / dependencies each item is missing (derived
// from its source imports). Never removes a dependency that is already declared.
// Usage: node scripts/sync-registry-deps.mjs [--dry-run]
import { readFileSync, writeFileSync } from "fs"

import { analyze, findCycles, NAMESPACE } from "./registry-deps.mjs"

const dryRun = process.argv.includes("--dry-run")
const raw = readFileSync("registry.json", "utf-8")
const registry = JSON.parse(raw)
const { result, problems } = analyze(registry)

let addedRegistry = 0
let addedNpm = 0

for (const item of registry.items) {
  const need = result.get(item.name)

  const currentReg = item.registryDependencies || []
  const missingReg = [...need.registryDependencies]
    .map((n) => NAMESPACE + n)
    .filter((n) => !currentReg.includes(n))
    .sort()
  if (missingReg.length) {
    item.registryDependencies = [...currentReg, ...missingReg]
    addedRegistry += missingReg.length
  }

  const currentNpm = item.dependencies || []
  const missingNpm = [...need.dependencies]
    .filter((d) => !currentNpm.includes(d))
    .sort()
  if (missingNpm.length) {
    item.dependencies = [...currentNpm, ...missingNpm]
    addedNpm += missingNpm.length
  }

  const currentDev = item.devDependencies || []
  const missingDev = [...need.devDependencies]
    .filter((d) => !currentDev.includes(d))
    .sort()
  if (missingDev.length) {
    item.devDependencies = [...currentDev, ...missingDev]
    addedNpm += missingDev.length
  }
}

const cycles = findCycles(registry)

console.log(
  `+ ${addedRegistry} registryDependencies, + ${addedNpm} dependencies`
)
if (problems.length) {
  console.error("\nProblemas que exigem correção manual:")
  problems.forEach((p) => console.error(`  ✗ ${p}`))
}
if (cycles.length) {
  console.error("\nCiclos em registryDependencies:")
  cycles.forEach((c) => console.error(`  ✗ ${c}`))
}

if (!dryRun && !problems.length && !cycles.length) {
  writeFileSync(
    "registry.json",
    JSON.stringify(registry, null, 2) + (raw.endsWith("\n") ? "\n" : "")
  )
  console.log("✔ registry.json atualizado")
}
process.exit(problems.length || cycles.length ? 1 : 0)
