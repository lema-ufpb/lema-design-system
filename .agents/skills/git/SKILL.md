---
name: git
description: >
  Use when staging files, committing changes, opening pull requests, commenting
  on PRs, or creating issues and tasks in the app-programacao-fiscal project.
  Covers pre-commit quality gates (format + lint), semantic commit conventions
  in English, grouped commits, pt-BR PR workflows targeting the develop branch,
  and issue/task creation using the project's GitHub templates.
---

# Git Workflow — app-programacao-fiscal

Workflow for safe, consistent version control in this project.

---

## Pre-Commit Quality Gate (MANDATORY)

**Run BEFORE any `git add` or staging step:**

```bash
make format   # auto-formats code
make lint     # ESLint + TypeScript typecheck
```

- If `make lint` fails → fix all errors before staging. Never commit with lint errors.
- If `make format` changes files → stage the formatted versions, not the originals.
- Never bypass with `--no-verify`.

---

## Commit Conventions

Commits must be in **English** following [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <short description>

[optional body — explain WHY, not what]

[optional footer: Closes #issue, Co-Authored-By: ...]
```

### Rules

- Subject line: imperative mood, no period, max 72 chars
- Body lines: max 100 chars, blank line after subject
- Reference issues in footer: `Closes #123` or `Relates to #456`

### Types

| Type       | When to use                                          |
|------------|------------------------------------------------------|
| `feat`     | New feature or visible behavior change               |
| `fix`      | Bug fix                                              |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `style`    | Formatting, token/class renames, no logic change     |
| `docs`     | Documentation only                                   |
| `test`     | Add or update tests                                  |
| `perf`     | Performance improvement                              |
| `chore`    | Build, config, dependency, CI changes                |
| `revert`   | Reverts a previous commit                            |

### Scopes (examples for this project)

`risk-matrix`, `risk-matrix-table`, `risk-matrix-charts`, `dashboard`, `auth`,
`ui`, `theme`, `deps`, `ci`, `utils`

### Examples

```
feat(risk-matrix-charts): add bar chart visualization for risk distribution

fix(risk-matrix-table): correct tabular-nums alignment in numeric cells

chore(deps): upgrade recharts to 3.1.0

style(risk-matrix): replace bg-white with semantic bg-background token
```

---

## Grouping Commits

Split changes into logical, self-contained commits when:

- Multiple concerns changed (e.g., feature + dependency bump + config)
- A commit could be reverted independently without breaking others
- Different scopes are affected

**Grouping order (preference):**

1. `chore` / dependency / config changes
2. `refactor` / structural preparation
3. `feat` / `fix` actual changes
4. `test` / `docs` additions

**Never mix a `feat` with a `fix` in the same commit** — they have different reversal semantics.

---

## Pull Requests

### Target branch

**Always open PRs from the current feature branch → `develop`.**  
Never open PRs directly to `main`.

```bash
gh pr create --base develop --title "..." --body "..."
```

### Language and template

PRs must be written in **pt-BR**, filling in every section of `.github/pull_request_template.md`.

```bash
gh pr create --base develop \
  --title "<título em pt-BR>" \
  --body "$(cat <<'EOF'
# 📌 Pull Request

## 📖 Descrição

<resumo das mudanças>

---

## 🎯 Motivação

<problema resolvido ou motivação>

---

## 🔄 Tipo de mudança

Marque com `x` o que se aplica:

- [ ] 🐛 Bug fix (correção de um problema)
- [ ] ✨ Nova feature (funcionalidade adicionada)
- [ ] ♻️ Refatoração (mudança sem alterar comportamento)
- [ ] 📝 Documentação (adição ou atualização de docs)
- [ ] 🚀 Melhoria de performance
- [ ] ✅ Testes adicionados/atualizados
- [ ] ⚙️ Configuração ou infraestrutura

## 📷 Evidências

<prints, gifs, logs ou exemplos>

---

## ✅ Checklist

- [ ] Código segue o estilo do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação atualizada (se necessário)
- [ ] Não há warnings ou erros no build
- [ ] PR está pronto para revisão

## 📌 Issues relacionadas

<Fecha a issue #N ou Relacionado a issue #N>

---

👀 **Revisores**: sintam-se à vontade para sugerir melhorias!
EOF
)"
```

### PR title format

```
[tipo] Descrição curta em pt-BR
```

Examples:
- `[feat] Adiciona gráfico de barras na matriz de risco`
- `[fix] Corrige alinhamento numérico na tabela de risco`
- `[refactor] Extrai componente RiskMatrixCharts`

---

## PR Comments

When commenting on a PR (review, update, or status):

- Write in **pt-BR**
- Describe **what the last commit changed** and its impact
- Be concise — one paragraph max per comment

Example comment after a new commit:

```
O último commit (`fix(risk-matrix-table): correct tabular-nums alignment`)
corrige o alinhamento das células numéricas na tabela, aplicando `tabular-nums`
consistentemente em todas as colunas de valor. Sem impacto em outros componentes.
```

---

## Issues & Tasks

**All issues and tasks must be created using the project's GitHub templates** at `.github/ISSUE_TEMPLATE/`. Always write in **pt-BR**.

### Template selection

| Situation | Template file | Title prefix | Label |
|-----------|--------------|--------------|-------|
| Something is broken | `bug_report.yml` | `[BUG] ` | `bug` |
| New feature or improvement | `feature_request.yml` | `[Feature] ` | `enhancement` |
| Backlog task / implementation item | `task.yml` | `[Feature] ` | `enhancement` |
| Question or doubt | `question.yml` | `[Question] ` | `question` |

### Creating via CLI

Use `gh issue create` with the appropriate template:

```bash
# Bug
gh issue create --template bug_report.yml

# Feature request
gh issue create --template feature_request.yml

# Task
gh issue create --template task.yml

# Question
gh issue create --template question.yml
```

Or create interactively through the GitHub web interface — the templates will be offered automatically.

### Required fields by template

**Bug report** — must fill:
- Sistema Operacional
- Versão
- Passos para reproduzir *(required)*
- Comportamento esperado
- Informações adicionais

**Feature request** — must fill:
- Descrição da melhoria *(required)*
- Justificativa
- Alternativas consideradas
- Referência visual

**Task** — must fill:
- Descrição da melhoria *(required)* — include the `git checkout` command for the branch
- Checklist de implementação — use or adapt the standard checklist:
  - [ ] Checar componentes do Design System
  - [ ] Preparar/atualizar hook de dados (`use-*.ts`)
  - [ ] Adaptar/atualizar mock data na route da API
  - [ ] Atualizar tipos TypeScript: `make format`, `make lint`
  - [ ] Testes visuais (Playwright): `make test`
  - [ ] Realizar teste de build: `make build`
  - [ ] Criar pull request para `develop`
- Justificativa
- Referência visual

**Question** — must fill:
- Qual é a sua dúvida? *(required)*
- Contexto adicional

### Linking issues to commits and PRs

- Reference in commit footer: `Closes #123` or `Relates to #456`
- Reference in PR body under "Issues relacionadas": `Fecha a issue #123`

---

## Branch Hygiene

- **Never commit directly to `main` or `develop`**
- Feature branches: `feature/<issue>-<short-description>`
- Fix branches: `fix/<issue>-<short-description>` or `issue-<N>`
- Keep branches short-lived — open PR as soon as the first commit is ready

---

## Common Mistakes

| Mistake | Correct approach |
|---------|-----------------|
| Skipping `make format`/`make lint` | Always run both before staging |
| Committing in Portuguese | Commit messages always in English |
| Opening PR to `main` | Always target `develop` |
| Writing PR body in English | PR body always in pt-BR |
| One giant commit for many concerns | Split by logical group |
| Vague subject like `fix stuff` | Precise: `fix(scope): what exactly` |
| Bypassing hooks (`--no-verify`) | Fix the root cause instead |
