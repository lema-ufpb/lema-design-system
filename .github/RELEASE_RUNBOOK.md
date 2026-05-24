# 🚨 Release Recovery Runbook — LEMA-DS

Guia de recuperação quando o fluxo `release-please → CD` falha em algum ponto. Cada cenário tem **sintomas**, **comandos prontos** e **como verificar** que o estado voltou ao normal.

> ⚠️ Antes de qualquer comando destrutivo (`git tag -d`, force-push, delete release): confirme com `git log` e olhe a UI do GitHub. Pergunta de ouro: "se eu estiver errado, dá pra desfazer?"

## 🔑 Modelo mental — onde mora a garantia de qualidade

```
PR feature → develop   [CI roda AQUI, única vez]
    │
    ▼  (branch protection exige CI verde + branch up-to-date)
develop está sempre verde
    │
    ▼
PR develop → main   [SEM CI — promoção, sem código novo]
    │
    ▼  (branch protection exige branch up-to-date com main)
main reflete develop validado
    │
    ▼
release-please PR → main   [SEM CI — só version bump]
    │
    ▼
tag vX.Y.Z criada → CD dispara → deploy
```

**Invariante crítico:** se `develop` está verde, `main` está verde. CD confia em branch protection upstream, não em re-execução de CI no momento do deploy.

---

## 📑 Índice de cenários

| # | Sintoma | Severidade |
|---|---|---|
| [1](#cenário-1) | Tag criada, CD falhou no meio (Docker não pushou ou argocd não atualizou) | 🟡 médio |
| [2](#cenário-2) | release-please calculou versão errada (ex.: deveria ser major) | 🟡 médio |
| [3](#cenário-3) | Release criada por engano (não queria publicar agora) | 🟢 baixo |
| [4](#cenário-4) | Deploy chegou em prod, mas o artefato está quebrado (rollback urgente) | 🔴 alto |
| [5](#cenário-5) | Manifest/state do release-please ficou inconsistente | 🟡 médio |
| [6](#cenário-6) | Branch protection bloqueou release-please PR (não consegue mergear) | 🟢 baixo |

---

## Cenário 1 — Tag criada, CD falhou no meio

### Sintoma
- Tag `vX.Y.Z` existe em git (`git tag -l`)
- GitHub Release v`X.Y.Z` aparece em **Releases**
- CD workflow (`🚀 CD`) falhou em algum step (build, push, argocd)
- Docker image **NÃO** está em GHCR OU `argocd-apps` **NÃO** foi atualizado
- ArgoCD em prod ainda roda a versão anterior

> ℹ️ **"nothing to commit" no argocd-apps não acontece mais** — o step verifica se houve mudança via `git diff --cached --quiet`. Se não houve, faz `git commit --allow-empty` para forçar reconciliação no ArgoCD. O step também cria overlays do zero e adiciona image entries ausentes (primeira release).

### Análise: rollback vs roll-forward?

| Pergunta | Se SIM → roll-forward | Se NÃO → rollback |
|---|---|---|
| O conteúdo de `vX.Y.Z` é saudável (só o pipeline falhou)? | Sim | Não |
| Você consegue identificar e corrigir a causa raiz rapidamente? | Sim | Não |
| Outros já viram esse release publicado? | Sim | Não |

**Default**: roll-forward com `vX.Y.Z+1` que inclui o fix.

### Comandos — Roll-forward (recomendado)

```bash
# 1. Corrigir a causa raiz em develop
git checkout develop
# ... fazer correção ...
git commit -m "fix(ci): <descrição da correção>"
git push origin develop

# 2. PR develop → main, mergear
gh pr create --base main --head develop --title "fix: ..." --body "Fix do CD"

# 3. release-please vai abrir chore(release): X.Y.Z+1 automaticamente
#    Mergear esse PR → tag X.Y.Z+1 → CD roda → deploy chega em prod

# Alternativa: re-release da mesma versão (quando o conteúdo está correto e
# só o pipeline falhou — ex.: falha de infra, runner offline)
# Não delete tags manualmente. Siga:
# 1. Corrigir o workflow em develop e mergear para main
# 2. release-please re-abre o PR da versão (ou abre X.Y.Z+1)
# 3. Mergear → tag criada pelo bot → CD roda com o workflow corrigido
```

### Comandos — Rollback completo (se conteúdo está ruim)

```bash
# 1. Deletar tag local e remota
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z

# 2. Deletar GitHub Release
gh release delete vX.Y.Z --yes

# 3. Reverter o manifest do release-please pro estado anterior
# Editar .release-please-manifest.json: { ".": "X.Y.Z-1" } (versão anterior)
# Editar package.json: voltar version pra "X.Y.Z-1"

# 4. Commit em develop revertendo
git checkout develop
git add .release-please-manifest.json package.json
git commit -m "revert: undo release vX.Y.Z (CD failed and content needs rework)"
git push origin develop
```

### Verificação
- `gh release list` não lista mais a release
- `git ls-remote --tags origin | grep vX.Y.Z` retorna vazio
- ArgoCD continua na versão anterior (não rolou deploy parcial)

---

## Cenário 2 — release-please calculou versão errada

### Sintoma
- PR `chore(release): X.Y.Z` está aberto com versão **errada**
- Ex.: você fez um `feat!:` (breaking change) mas o PR sugere bump minor em vez de major

### Causa comum
- `bump-minor-pre-major: true` no config faz breaking changes ficarem em minor enquanto < 1.0
- Commit sem o `!` ou sem `BREAKING CHANGE:` no body
- Tipo de commit não está sendo reconhecido (ex.: `Feature:` em vez de `feat:`)

### Comandos
```bash
# Opção A: forçar versão específica via commit "release-as"
# Em develop:
git commit --allow-empty -m "chore: release as X.Y.Z

Release-As: X.Y.Z"
git push origin develop
# Mergear develop → main → release-please vai usar essa versão

# Opção B: editar release-please-config.json e descobrir o porquê
# Verificar:
# - bump-minor-pre-major / bump-patch-for-minor-pre-major
# - Se o tipo do commit está no changelog-sections
```

### Verificação
- Novo PR de release abre com a versão certa
- CHANGELOG.md mostra os commits no formato esperado

---

## Cenário 3 — Release criada por engano

### Sintoma
- Você (ou alguém) mergeou o `chore(release):` PR sem querer
- Tag e release foram criadas
- Mas o conteúdo **não deveria ter sido publicado ainda** (ex.: feature incompleta)

### Comandos
```bash
# 1. Deletar tag e release imediatamente (antes do CD finalizar)
gh release delete vX.Y.Z --yes
git push origin :refs/tags/vX.Y.Z
git tag -d vX.Y.Z

# 2. Se CD já rodou e pushou Docker image:
# Deletar a tag específica no GHCR (mantém :latest se útil)
# GitHub UI: Packages → design-system → vX.Y.Z → Delete

# 3. Se argocd-apps já foi atualizado:
# Reverter o commit no argocd-apps
cd /caminho/para/argocd-apps  # ou clone temp
git revert <SHA-do-commit-de-update>
git push origin main

# 4. Reverter o manifest pro estado anterior (igual Cenário 1 rollback)
```

### Verificação
- Tag não existe mais
- Release não existe mais
- ArgoCD voltou para versão anterior
- Próximo release-please run vai abrir PR a partir da versão correta

---

## Cenário 4 — Deploy em prod com artefato quebrado (🔴 URGENTE)

### Sintoma
- vX.Y.Z foi deployado com sucesso (Docker push OK, argocd OK)
- Mas o app em prod está quebrado / com bug crítico
- Usuários impactados

### Estratégia
- **NÃO mexa em tag/release** — o registro histórico importa
- **Faça rollback no nível do ArgoCD** apontando pra versão anterior
- **Depois** publique vX.Y.Z+1 com o fix (roll-forward seguindo o fluxo normal)

### Comandos (rollback imediato)
```bash
# 1. Encontrar a versão anterior boa
git tag -l --sort=-v:refname | head -5

# 2. No repo argocd-apps, reverter o commit que pôs vX.Y.Z
cd /caminho/argocd-apps
git log --oneline -10
git revert <SHA-do-commit-de-update-vX.Y.Z>
git push origin main

# Alternativa mais explícita: edit manual com kustomize
cd argocd-apps/apps/design-system/overlays/prod
kustomize edit set image ghcr.io/lema-ufpb/design-system=ghcr.io/lema-ufpb/design-system:vX.Y.Z-1
cd ../dev
kustomize edit set image ghcr.io/lema-ufpb/design-system=ghcr.io/lema-ufpb/design-system:vX.Y.Z-1
git add .
git commit -m "fix(design-system): rollback to vX.Y.Z-1 (vX.Y.Z is broken)"
git push origin main
```

### Verificação
- ArgoCD sincroniza dentro de ~2 minutos
- App em prod volta a funcionar com a versão anterior
- Storybook em `ds.lema.ufpb.br` mostra "vX.Y.Z-1" (via injeção `git describe`)

### Depois do rollback (roll-forward)
```bash
# Em develop, corrigir o bug
git checkout develop
# ... fix ...
git commit -m "fix: <descrição do bug crítico>"
# Eventualmente: develop → main → release-please → vX.Y.Z+1
```

---

## Cenário 5 — Manifest/state inconsistente

### Sintoma
- release-please abre PRs com versões absurdas (ex.: pula de 0.1.0 pra 2.0.0)
- `.release-please-manifest.json` não bate com a maior tag em git
- Erros tipo "no commits since last release" quando há commits novos

### Causa comum
- Edição manual de `.release-please-manifest.json` que ficou inconsistente
- Tags deletadas/recriadas sem atualizar manifest
- Migração de schema do release-please (ex.: troca de `release-type`)

### Comandos
```bash
# 1. Identificar a maior tag real
LATEST_TAG=$(git tag -l --sort=-v:refname | head -1)
echo "Última tag: $LATEST_TAG"

# 2. Ajustar manifest pra refletir esse estado
# Editar .release-please-manifest.json:
# { ".": "X.Y.Z" }   ← sem o 'v', só o número da versão

# 3. Ajustar package.json para a mesma versão
# "version": "X.Y.Z"

# 4. Commitar em develop
git add .release-please-manifest.json package.json
git commit -m "chore: resync release-please manifest to vX.Y.Z"
git push origin develop

# Mergear develop → main → release-please vai recalcular daqui em diante
```

### Verificação
- Próximo `release-please` run abre PR com versão coerente
- CHANGELOG.md inclui só commits desde a última tag real

---

## Cenário 6 — Branch protection bloqueia release PR

### Sintoma
- release-please abre o PR contra `main`
- Ao tentar mergear: "Required status check `🛠️ CI - Pull Request Checks` is expected" — bloqueado permanentemente
- Ou: "Not enough approvers" se houver required reviewers

### Causa raiz (armadilha do modelo atual)

Com CI rodando **apenas em PR contra `develop`**, configurar "Require status checks" do CI em `main` cria deadlock:
- release-please PR vai contra `main` → CI **não** dispara (correto por design)
- Branch protection exige check do CI → check nunca aparece → merge bloqueado pra sempre

**Solução:** branch protection de `main` **não deve exigir status checks do CI**. Confiança vem do invariante "develop sempre verde + branch up-to-date".

### Configuração correta de branch protection

**Em `develop`** (Settings → Branches → Add rule):
- ✅ Require a pull request before merging
- ✅ Require status checks to pass
  - Selecionar: `🕵️‍♂️ Lint`, `🧪 Test`, `📦 Build`
- ✅ Require branches to be up to date before merging

> ⚠️ **Estado atual:** `develop` está com `required_status_checks.contexts: []` (nenhum check exigido). É recomendado adicionar `🕵️‍♂️ Lint`, `🧪 Test` e `📦 Build` para garantir que código quebrado não entre.

**Em `main`** (Settings → Branches → Add rule):
- ✅ Require a pull request before merging
- ❌ **NÃO marcar** "Require status checks to pass" — CI não roda em PRs pra main
- ✅ Require branches to be up to date before merging  ← **CRÍTICO**: força develop estar à frente de main, garantindo que main só receba código já validado em develop
- ✅ Restrict who can push to matching branches (opcional, recomendado)

### Comandos para verificar/corrigir
```bash
# 1. Ver config atual de main (o ideal é "required_status_checks": null)
gh api repos/lema-ufpb/design-system/branches/main/protection --jq '.required_status_checks'

# Se retornar objeto com contexts não-vazio (ex.: ["🛠️ CI - Pull Request Checks"]):
# Settings → Branches → Edit rule de main → desmarcar "Require status checks to pass"

# 2. Confirmar config de develop (deve ter os 3 checks reais do CI)
gh api repos/lema-ufpb/design-system/branches/develop/protection --jq '.required_status_checks'
# Se contexts == []: Settings → Branches → develop → editar → marcar "Require status checks"
#   e selecionar: 🕵️‍♂️ Lint, 🧪 Test, 📦 Build

# 3. Resolver "single maintainer cannot approve own PR":
# Settings → Branches → Allow specified actors to bypass required pull requests
# Adicionar seu user (pragmático em time de 1)

# 4. Verificar tag mais recente e branches
git log --oneline --decorate -10
git tag -l --sort=-v:refname | head -5
```

### Verificação
- Próximo release PR mergea sem bloqueio
- CD dispara normalmente

---

## 🛠️ Comandos de uso geral (cheatsheet)

### Inspeção
```bash
# Última tag
git describe --tags --abbrev=0

# Listar releases via gh
gh release list --limit 10

# Ver status de uma run de CD
gh run list --workflow=cd.yml --limit 5

# Logs detalhados de um run específico
gh run view <RUN_ID> --log-failed

# Estado atual no argocd-apps
cd /caminho/argocd-apps
grep newTag apps/design-system/overlays/prod/kustomization.yml

# Verificar branches e tags locais vs remoto
git branch -vv
git log --oneline --decorate -10
git ls-remote --tags origin
```

### Limpeza segura
```bash
# Deletar tag (local + remoto) com confirmação dupla
read -p "Deletar tag vX.Y.Z? (yes/no) " ANS && [ "$ANS" = "yes" ] && \
  git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z

# Deletar GitHub Release (sem afetar a tag)
gh release delete vX.Y.Z --yes

# Listar Docker images em GHCR pra deletar (UI manual)
# Settings → Packages → design-system → Manage versions
```

---

## 📚 Quando consultar este runbook

- **Antes** de mexer em tags/releases manualmente
- **Durante** um incidente de release (não improvisar!)
- **Depois** de um incidente: revisar se algum cenário novo precisa entrar aqui

> 💡 Se aparecer um cenário não coberto aqui, **adicione**. Este arquivo só funciona se estiver atualizado.
