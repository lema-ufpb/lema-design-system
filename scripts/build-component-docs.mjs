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

function findComponentName(content) {
  let m = content.match(/export function (\w+)/)
  if (m) return m[1]
  m = content.match(/export const (\w+)\s*=\s*React\.forwardRef/)
  if (m) return m[1]
  m = content.match(/^function (\w+)\(/m)
  if (m) return m[1]
  return null
}

function findInterfaceBody(content, interfaceName) {
  const re = new RegExp(`export interface ${interfaceName}\\b`)
  const m = re.exec(content)
  if (!m) return null
  const braceIdx = content.indexOf("{", m.index)
  if (braceIdx === -1) return null
  const end = matchBracket(content, braceIdx + 1, "{", "}")
  if (end === -1) return null
  return content.slice(braceIdx + 1, end - 1)
}

function parseInterfaceMembers(body) {
  const members = []
  let i = 0
  let pendingComment = ""

  while (i < body.length) {
    while (i < body.length && /\s/.test(body[i])) i++
    if (i >= body.length) break

    if (body.startsWith("/**", i)) {
      const end = body.indexOf("*/", i)
      if (end === -1) break
      pendingComment = body
        .slice(i + 3, end)
        .replace(/^[ \t]*\*[ \t]?/gm, "")
        .trim()
      i = end + 2
      continue
    }
    if (body.startsWith("//", i)) {
      const end = body.indexOf("\n", i)
      pendingComment = body.slice(i + 2, end === -1 ? body.length : end).trim()
      i = end === -1 ? body.length : end
      continue
    }

    const nameMatch = /^([A-Za-z_$][\w$]*)(\??):\s*/.exec(body.slice(i))
    if (!nameMatch) {
      const nl = body.indexOf("\n", i)
      i = nl === -1 ? body.length : nl + 1
      pendingComment = ""
      continue
    }

    const name = nameMatch[1]
    const optional = nameMatch[2] === "?"
    const typeStart = i + nameMatch[0].length
    let depth = 0
    let j = typeStart
    while (j < body.length) {
      const ch = body[j]
      if (ch === "=" && body[j + 1] === ">") {
        // arrow function type (`=>`) — the `>` is not a generic close
        j += 2
        continue
      }
      if ("<{[(".includes(ch)) depth++
      else if (">}])".includes(ch)) depth--
      else if (ch === ";" && depth === 0) break
      else if (ch === "\n" && depth === 0) {
        let k = j + 1
        while (k < body.length && (body[k] === " " || body[k] === "\t")) k++
        if (!(body[k] === "|" || body[k] === "&")) break
      }
      j++
    }

    const type = body
      .slice(typeStart, j)
      .trim()
      .replace(/,$/, "")
      .replace(/\s+/g, " ")

    if (type) {
      members.push({
        name,
        required: !optional,
        type,
        ...(pendingComment ? { description: pendingComment } : {}),
      })
    }
    pendingComment = ""
    i = j + 1
  }

  return members
}

function extractCvaVariants(content, variantsConstName) {
  const declRe = new RegExp(`\\b${variantsConstName}\\s*=\\s*cva\\(`)
  const m = declRe.exec(content)
  if (!m) return []

  const callParenIdx = m.index + m[0].length - 1
  const callEnd = matchBracket(content, callParenIdx + 1, "(", ")")
  if (callEnd === -1) return []
  const callBody = content.slice(callParenIdx + 1, callEnd - 1)

  const variantsIdx = callBody.indexOf("variants:")
  if (variantsIdx === -1) return []
  const vBraceStart = callBody.indexOf("{", variantsIdx)
  if (vBraceStart === -1) return []
  const vBraceEnd = matchBracket(callBody, vBraceStart + 1, "{", "}")
  if (vBraceEnd === -1) return []
  const variantsBlock = callBody.slice(vBraceStart + 1, vBraceEnd - 1)

  const defaults = {}
  const defIdx = callBody.indexOf("defaultVariants:")
  if (defIdx !== -1) {
    const dBraceStart = callBody.indexOf("{", defIdx)
    if (dBraceStart !== -1) {
      const dBraceEnd = matchBracket(callBody, dBraceStart + 1, "{", "}")
      if (dBraceEnd !== -1) {
        const defBlock = callBody.slice(dBraceStart + 1, dBraceEnd - 1)
        const defRe = /(\w+):\s*"([^"]*)"/g
        let dm
        while ((dm = defRe.exec(defBlock)) !== null) defaults[dm[1]] = dm[2]
      }
    }
  }

  const variants = []
  const keyRe = /(\w+):\s*\{/g
  let km
  while ((km = keyRe.exec(variantsBlock)) !== null) {
    const braceStart = km.index + km[0].length - 1
    const braceEnd = matchBracket(variantsBlock, braceStart + 1, "{", "}")
    if (braceEnd === -1) continue
    const optionsBlock = variantsBlock.slice(braceStart + 1, braceEnd - 1)
    const optKeyRe = /(?:^|\s)(["']?)([\w-]+)\1:\s*"/g
    const options = []
    let om
    while ((om = optKeyRe.exec(optionsBlock)) !== null) options.push(om[2])
    if (options.length > 0) {
      variants.push({
        name: km[1],
        required: false,
        type: options.map((o) => `"${o}"`).join(" | "),
        options,
        ...(defaults[km[1]] ? { default: defaults[km[1]] } : {}),
      })
    }
    keyRe.lastIndex = braceEnd
  }

  return variants
}

function extractComponentProps(content) {
  const componentName = findComponentName(content)
  const props = []
  const seen = new Set()

  if (componentName) {
    const body = findInterfaceBody(content, `${componentName}Props`)
    if (body !== null) {
      for (const member of parseInterfaceMembers(body)) {
        props.push(member)
        seen.add(member.name)
      }
    }
  }

  const variantsConstNames = new Set()
  const vpRe = /VariantProps<typeof (\w+)>/g
  let vm
  while ((vm = vpRe.exec(content)) !== null) variantsConstNames.add(vm[1])

  for (const constName of variantsConstNames) {
    for (const variant of extractCvaVariants(content, constName)) {
      if (!seen.has(variant.name)) {
        props.push(variant)
        seen.add(variant.name)
      }
    }
  }

  return props
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
    const componentSource = readFileSync(filePath, "utf-8")
    const tsProps = extractComponentProps(componentSource)
    if (tsProps.length > 0) entry.props = tsProps

    const storiesFile = findStoriesFile(item)
    if (storiesFile) {
      const content = readFileSync(storiesFile, "utf-8")
      const metaContent = extractMetaSection(content)

      if (metaContent) {
        const compDesc = extractDescription(metaContent, "component")
        if (compDesc) entry.description = compDesc

        const titleMatch = metaContent.match(/title:\s*"([^"]+)"/)
        if (titleMatch) entry.storyTitle = titleMatch[1]

        if (!entry.props || entry.props.length === 0) {
          entry.props = extractArgTypes(metaContent)
        }
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

// ── llms.txt (https://llmstxt.org/) — points AI agents at the machine-readable catalog ──

const dsCount = result.components.filter((c) => c.category === "ds").length
const uiCount = result.components.filter((c) => c.category === "ui").length
const libCount = result.components.filter((c) => c.category === "lib").length

const llmsTxt = `# LEMA-DS

> Design system oficial do LEMA (Laboratório de Economia e Modelagem Aplicada), Universidade Federal da Paraíba — biblioteca de componentes React construída sobre shadcn/ui e Radix UI. ${result.totalComponents} itens no registry: ${dsCount} componentes \`ds-*\`, ${uiCount} primitivos shadcn, ${libCount} bibliotecas compartilhadas.

Este site também expõe seu catálogo em formato estruturado e legível por máquina. Prefira os endpoints abaixo a extrair conteúdo das páginas HTML renderizadas.

## Catálogo de componentes

- [Component catalog](/docs/components.json): catálogo completo de todos os ${result.totalComponents} componentes — descrição, props, dependências, arquivos e código de exemplo de cada story.
- [Registry manifest](/registry.json): manifesto shadcn (nome, tipo, dependências, arquivos-alvo) de cada item instalável.
- [Story index](/index.json): índice bruto do Storybook (id, título, tipo) de todas as stories e páginas de documentação.

## Instalação

- ds-sync (\`npm install -D @lema-ufpb/ds-sync\`): \`npx ds add <nome>\` instala qualquer item do catálogo acima, incluindo primitivos shadcn.
- shadcn CLI: \`npx shadcn@latest add ds-<nome>\` lendo diretamente de \`/r/{name}.json\` neste domínio.
`

writeFileSync(join(ROOT, "storybook-static", "llms.txt"), llmsTxt, "utf-8")

console.log("✅ Generated storybook-static/llms.txt")
