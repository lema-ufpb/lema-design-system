#!/usr/bin/env node

import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  mkdirSync,
} from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const registry = JSON.parse(readFileSync(join(ROOT, "registry.json"), "utf-8"))
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"))

function matchBracket(content, startPos, open, close) {
  let depth = 1
  for (let pos = startPos; pos < content.length; pos++) {
    const ch = content[pos]
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch
      pos++
      while (pos < content.length) {
        if (content[pos] === "\\") {
          pos += 1
          continue
        }
        if (content[pos] === quote) break
        pos++
      }
      continue
    }
    if (ch === open) depth++
    else if (ch === close) {
      depth--
      if (depth === 0) return pos + 1
    }
  }
  return -1
}

function extractDescription(content, key) {
  const idx = content.indexOf(`${key}:`)
  if (idx === -1) return ""

  const rest = content.slice(idx + key.length + 1).trimStart()

  if (rest.startsWith("[")) {
    const end = matchBracket(rest, 1, "[", "]")
    if (end === -1) return ""
    const arrayContent = rest.slice(1, end - 1)
    const strings = []
    const strRe = /"((?:[^"\\]|\\.)*)"/g
    let m
    while ((m = strRe.exec(arrayContent)) !== null) {
      strings.push(m[1])
    }
    return strings.join("\n")
  }

  if (rest.startsWith('"')) {
    const m = rest.match(/^"((?:[^"\\]|\\.)*)"/)
    if (m) return m[1]
  }
  if (rest.startsWith("'")) {
    const m = rest.match(/^'((?:[^'\\]|\\.)*)'/)
    if (m) return m[1]
  }
  if (rest.startsWith("`")) {
    const end = rest.indexOf("`", 1)
    if (end !== -1) return rest.slice(1, end)
  }

  return ""
}

function extractArgTypes(metaContent) {
  const argTypes = []
  const idx = metaContent.indexOf("argTypes:")
  if (idx === -1) return argTypes

  const start = metaContent.indexOf("{", idx + 9)
  if (start === -1) return argTypes
  const end = matchBracket(metaContent, start + 1, "{", "}")
  if (end === -1) return argTypes

  const block = metaContent.slice(start + 1, end - 1)

  const propRe = /(\w+):\s*\{/g
  let m
  while ((m = propRe.exec(block)) !== null) {
    const propStart = m.index + m[0].length - 1
    const propEnd = matchBracket(block, propStart + 1, "{", "}")
    if (propEnd === -1) continue

    const propBlock = block.slice(propStart + 1, propEnd - 1)
    const prop = { name: m[1] }

    const ctrl = propBlock.match(/control:\s*"([^"]+)"/)
    if (ctrl) prop.control = ctrl[1]

    const optsIdx = propBlock.indexOf("options:")
    if (optsIdx !== -1) {
      const arrStart = propBlock.indexOf("[", optsIdx + 8)
      if (arrStart !== -1) {
        const arrEnd = matchBracket(propBlock, arrStart + 1, "[", "]")
        if (arrEnd !== -1) {
          const arrContent = propBlock.slice(arrStart + 1, arrEnd - 1)
          const items = []
          const strRe = /"((?:[^"\\]|\\.)*)"/g
          let sm
          while ((sm = strRe.exec(arrContent)) !== null) items.push(sm[1])
          if (items.length > 0) prop.options = items
        }
      }
    }

    const desc = propBlock.match(/description:\s*"((?:[^"\\]|\\.)*)"/)
    if (desc) prop.description = desc[1]

    const def = propBlock.match(
      /defaultValue:\s*\{[^}]*summary:\s*"((?:[^"\\]|\\.)*)"/
    )
    if (def) prop.default = def[1]

    if (ctrl || desc) argTypes.push(prop)
  }

  return argTypes
}

function extractRenderCode(storyBlock) {
  const renderIdx = storyBlock.indexOf("render:")
  if (renderIdx === -1) return ""

  const after = storyBlock.slice(renderIdx + 7)

  const arrowMatch = after.match(/\(\s*\)\s*=>\s*\(/)
  if (arrowMatch) {
    const parenPos = arrowMatch.index + arrowMatch[0].lastIndexOf("(")
    const end = matchBracket(after, parenPos + 1, "(", ")")
    if (end !== -1) {
      return after.slice(parenPos + 1, end - 1).trim()
    }
  }

  const blockMatch = after.match(/\(\s*\)\s*=>\s*\{/)
  if (blockMatch) {
    const braceStart = blockMatch.index + blockMatch[0].length - 1
    const braceEnd = matchBracket(after, braceStart + 1, "{", "}")
    if (braceEnd !== -1) {
      const bodyContent = after.slice(braceStart + 1, braceEnd - 1)
      const returnIdx = bodyContent.lastIndexOf("return (")
      if (returnIdx !== -1) {
        const parenPos = bodyContent.indexOf("(", returnIdx + 7)
        if (parenPos !== -1) {
          const end = matchBracket(bodyContent, parenPos + 1, "(", ")")
          if (end !== -1) {
            return bodyContent.slice(parenPos + 1, end - 1).trim()
          }
        }
      }
    }
  }

  return ""
}

function extractMetaSection(content) {
  const idx = content.indexOf("const meta = {")
  if (idx === -1) return null
  const start = idx + 13
  const end = matchBracket(content, start + 1, "{", "}")
  if (end === -1) return null
  return content.slice(start, end)
}

function extractStories(content) {
  const stories = []
  const storyRe = /export\s+const\s+(\w+):\s*Story\s*=\s*\{/g
  let m

  while ((m = storyRe.exec(content)) !== null) {
    const storyName = m[1]
    const storyStart = m.index + m[0].length - 1
    const storyEnd = matchBracket(content, storyStart + 1, "{", "}")
    if (storyEnd === -1) continue

    const storyBlock = content.slice(storyStart, storyEnd)
    const story = { name: storyName }

    story.description = extractDescription(storyBlock, "story")

    const argsIdx = storyBlock.indexOf("args: {")
    if (argsIdx !== -1) {
      const argsEnd = matchBracket(storyBlock, argsIdx + 6, "{", "}")
      if (argsEnd !== -1) {
        story.args = storyBlock.slice(argsIdx + 6, argsEnd - 1).trim()
      }
    }

    const code = extractRenderCode(storyBlock)
    if (code) story.code = code

    if (story.args || story.code || story.description) {
      stories.push(story)
    }
  }

  return stories
}

function findStoriesFile(item) {
  const firstFile = item.files[0].path
  const baseDir = dirname(join(ROOT, firstFile))
  const baseName = item.name.replace(/^ds-/, "").replace(/^ui-/, "")

  let candidate = join(baseDir, baseName + ".stories.tsx")
  if (existsSync(candidate)) return candidate

  candidate = join(baseDir, baseName + ".stories.ts")
  if (existsSync(candidate)) return candidate

  try {
    const files = readdirSync(baseDir)
    const match = files.find((f) => f.startsWith(baseName + ".stories."))
    if (match) return join(baseDir, match)
  } catch {}

  return null
}

// ── Main ──

const result = {
  $schema: "https://ds.lema.ufpb.br/docs/components.schema.json",
  generatedAt: new Date().toISOString(),
  version: pkg.version,
  totalComponents: 0,
  components: [],
}

for (const item of registry.items) {
  const firstFile = item.files[0].path
  const filePath = join(ROOT, firstFile)

  if (!existsSync(filePath)) {
    console.warn(`[warn] File not found: ${firstFile}`)
    continue
  }

  let category = "ui"
  if (firstFile.startsWith("components/ds/")) category = "ds"
  else if (firstFile.startsWith("lib/")) category = "lib"

  const importPath = firstFile.replace(/\.tsx?$/, "")

  const entry = {
    name: item.name,
    title: item.title,
    description: item.description,
    type: item.type,
    category,
    importPath: "@/" + importPath,
    dependencies: item.dependencies || [],
    registryDependencies: item.registryDependencies || [],
    files: item.files.map((f) => f.path),
  }

  if (category !== "lib") {
    const storiesFile = findStoriesFile(item)
    if (storiesFile) {
      const content = readFileSync(storiesFile, "utf-8")
      const metaContent = extractMetaSection(content)

      if (metaContent) {
        const compDesc = extractDescription(metaContent, "component")
        if (compDesc) entry.description = compDesc

        const titleMatch = metaContent.match(/title:\s*"([^"]+)"/)
        if (titleMatch) entry.storyTitle = titleMatch[1]

        entry.props = extractArgTypes(metaContent)
      }

      entry.stories = extractStories(content)
    }
  }

  result.components.push(entry)
}

result.totalComponents = result.components.length

const outputDir = join(ROOT, "storybook-static", "docs")
mkdirSync(outputDir, { recursive: true })

writeFileSync(
  join(outputDir, "components.json"),
  JSON.stringify(result, null, 2),
  "utf-8"
)

console.log(
  `✅ Generated docs for ${result.totalComponents} components → storybook-static/docs/components.json`
)
console.log(
  `   ${result.components.filter((c) => c.stories?.length).length} components have stories`
)
console.log(
  `   ${result.components.filter((c) => c.category === "lib").length} libraries`
)
