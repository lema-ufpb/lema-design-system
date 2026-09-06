# Spec: ds-hero-cycling

> Hero Cycling (bloco composto — não é um átomo novo).

---

## Propósito

Hero centralizado cujo título alterna palavras, remontando o bloco "Hero with cycling word" do blockus a partir de `HeroSection` e `TextRotator`.

**Usar quando:** Quiser comunicar múltiplos públicos/casos de uso no mesmo título ("Built for _design_/_engineering_/_product_ teams").
**Não usar quando:** O título for uma frase fixa — use `HeroSection` diretamente.

---

## Localização

| Campo      | Valor                                         |
| ---------- | --------------------------------------------- |
| Arquivo    | `components/ds/hero-cycling.tsx`              |
| Tipo       | `registry:block` (name: `ds-hero-cycling`)    |
| Categoria  | `Layout`                                      |
| Depende de | `ds-hero-section`, `ds-text-rotator`, `badge` |

---

## API — Props

| Prop              | Tipo              | Padrão | Obrigatória | Descrição                        |
| ----------------- | ----------------- | ------ | ----------- | -------------------------------- |
| `kicker`          | `string`          | —      |             | Badge acima do título            |
| `titlePrefix`     | `React.ReactNode` | —      |             | Texto antes da palavra rotativa  |
| `words`           | `string[]`        | —      | ✓           | Palavras que alternam no título  |
| `titleSuffix`     | `React.ReactNode` | —      |             | Texto depois da palavra rotativa |
| `rotatorInterval` | `number`          | `2500` |             | Intervalo entre trocas (ms)      |
| `description`     | `string`          | —      |             | Parágrafo de apoio               |
| `actions`         | `React.ReactNode` | —      |             | Botões (via `HeroActions`)       |

---

## Comportamentos e estados

Herdados de `TextRotator` — pausa no hover, respeita `prefers-reduced-motion` (para na primeira palavra).

---

## Acessibilidade

Herdada integralmente dos átomos compostos (`TextRotator` já usa `aria-live="polite"` na palavra rotativa).

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `FastRotation`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
