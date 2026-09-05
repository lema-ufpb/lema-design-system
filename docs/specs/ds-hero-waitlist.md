# Spec: ds-hero-waitlist

> Hero Waitlist (bloco composto — não é um átomo novo).

---

## Propósito

Hero centralizado com captura de e-mail, remontando o bloco "Email waitlist hero" do blockus a partir de `HeroSection` e `WaitlistForm`.

**Usar quando:** Página de pré-lançamento/"em breve" capturando e-mails.
**Não usar quando:** Precisar de mais campos além de e-mail — use um formulário completo com `FieldGroup`/`Field`.

---

## Localização

| Campo      | Valor                                          |
| ---------- | ---------------------------------------------- |
| Arquivo    | `components/ds/hero-waitlist.tsx`              |
| Tipo       | `registry:block` (name: `ds-hero-waitlist`)    |
| Categoria  | `Layout`                                       |
| Depende de | `ds-hero-section`, `ds-waitlist-form`, `badge` |

---

## API — Props

| Prop          | Tipo                            | Obrigatória | Descrição                              |
| ------------- | ------------------------------- | ----------- | -------------------------------------- |
| `kicker`      | `string`                        |             | Badge acima do título                  |
| `title`       | `React.ReactNode`               | ✓           | Título                                 |
| `description` | `string`                        |             | Parágrafo de apoio                     |
| `socialProof` | `React.ReactNode`               |             | Texto de prova social sob o formulário |
| `onSubmit`    | `WaitlistFormProps["onSubmit"]` |             | Handler de envio                       |
| `locale`      | `UILocale`                      |             | Locale das strings do formulário       |

---

## Comportamentos e estados

Herdados de `WaitlistForm` (variante `pill` fixa) — ver `docs/specs/ds-waitlist-form.md`.

---

## Acessibilidade

Herdada integralmente dos átomos compostos.

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `WithoutSocialProof`

---

## Checklist antes de implementar

- [x] Reutiliza apenas átomos já existentes
- [x] `registryDependencies` lista todos os átomos consumidos
