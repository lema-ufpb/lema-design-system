# Spec: ds-office-locations

> Office Locations (lista de escritórios com hora local ao vivo).

---

## Propósito

Substituir o clássico mapa embutido em blocos "Sobre" por uma lista acessível e leve: cada escritório mostra cidade, endereço, hora local ao vivo (via `Intl.DateTimeFormat` + timezone) e um indicador aberto/fechado calculado pelo horário comercial. Inspirado no bloco "About with office locations map" do blockus, sem o custo/peso de uma lib de mapas.

**Usar quando:** Seção "Sobre"/"Contato" com múltiplos escritórios/fusos horários.
**Não usar quando:** For necessário um mapa geográfico real e interativo — nesse caso use `GeomapChart`.

---

## Localização

| Campo      | Valor                                       |
| ---------- | ------------------------------------------- |
| Arquivo    | `components/ds/office-locations.tsx`        |
| Tipo       | `registry:ui` (name: `ds-office-locations`) |
| Categoria  | `Data Display`                              |
| Depende de | `skeleton`, `lucide-react`                  |

---

## API — Props

### `OfficeLocations` (root `<ul>`)

Sem props próprias além de `React.HTMLAttributes<HTMLUListElement>`.

### `OfficeLocationItem`

| Prop            | Tipo                             | Padrão             | Obrigatória | Descrição                                          |
| --------------- | -------------------------------- | ------------------ | ----------- | -------------------------------------------------- |
| `city`          | `string`                         | —                  | ✓           | Nome da cidade                                     |
| `country`       | `string`                         | —                  |             | País (concatenado após a cidade)                   |
| `address`       | `string`                         | —                  |             | Endereço/bairro                                    |
| `timeZone`      | `string` (IANA)                  | —                  | ✓           | Ex: `"America/Sao_Paulo"`                          |
| `businessHours` | `{ start: number; end: number }` | `{start:9,end:18}` |             | Horas locais 0–24 usadas para o dot aberto/fechado |
| `locale`        | `UILocale`                       | `"en-US"`          |             | Locale do relógio e das strings de status          |
| `size`          | `"sm" \| "md" \| "lg"`           | `"md"`             |             | Tamanho da linha                                   |
| `loading`       | `boolean`                        | `false`            |             | Estado de carregamento                             |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots:** `officeLocationItemVariants`, `officeLocationIconVariants`, `officeLocationCityVariants`, `officeLocationMetaVariants`, `officeLocationTimeVariants`.

---

## Tokens de design utilizados

| Token                   | Slot                                    |
| ----------------------- | --------------------------------------- |
| `bg-success`            | dot "aberto agora"                      |
| `bg-muted-foreground`   | dot "fechado"                           |
| `text-foreground`       | cidade, hora                            |
| `text-muted-foreground` | endereço, ícone de pin, label de status |
| `border-border`         | separador entre itens                   |

---

## Escala tipográfica e de tamanho

| Slot   | sm         | md        | lg          |
| ------ | ---------- | --------- | ----------- |
| Cidade | `text-xs`  | `text-sm` | `text-base` |
| Hora   | `text-xs`  | `text-sm` | `text-base` |
| Meta   | `text-xs`  | `text-sm` | `text-sm`   |
| Ícone  | `size-3.5` | `size-4`  | `size-5`    |

---

## Comportamentos e estados

| Estado                                | Comportamento esperado                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `loading={true}`                      | `<Skeleton>` para ícone, cidade/endereço e hora                                           |
| Relógio                               | Atualiza a cada 30s via `setInterval`; sem `aria-live` (silencioso para leitores de tela) |
| `localHour` dentro de `businessHours` | Dot `bg-success` + label `openNow`                                                        |
| Fora do intervalo                     | Dot `bg-muted-foreground` + label `closed`                                                |
| Texto longo em `address`              | `truncate`                                                                                |

---

## Acessibilidade

| Requisito              | Implementação                                           |
| ---------------------- | ------------------------------------------------------- |
| Hora                   | `<time dateTime={ISO}>` semântico                       |
| Ícone de pin           | `aria-hidden="true"`                                    |
| i18n                   | `UI_I18N[locale].officeLocations.{openNow,closed}`      |
| Atualização silenciosa | Sem `aria-live` — evita anúncios repetitivos a cada 30s |

---

## Stories obrigatórias no Storybook

- [x] `Default`
- [x] `AllSizes`
- [x] `CustomBusinessHours`
- [x] `Loading`
- [x] `Locales`

---

## Checklist antes de implementar

- [x] Escala tipográfica sm/md/lg aplicada
- [x] Tokens semânticos (`bg-success`/`bg-muted-foreground`)
- [x] `defaultVariants` em todos os `cva()`
- [x] Todos os `*Variants` exportados
- [x] Loading usa `<Skeleton>` com dimensões correspondentes
- [x] `tabular-nums` na hora
- [x] `truncate` no endereço
- [x] Prop `locale` integrada via `UI_I18N`
