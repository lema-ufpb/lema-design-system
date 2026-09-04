# Spec: CopyBlock

> Preencha este template ANTES de escrever qualquer código.
> Mova o arquivo preenchido para `docs/specs/copy-block.md` ao finalizar.

---

## Propósito

_O que este componente resolve? Quando usar vs. alternativas existentes?_

Exibe um trecho de texto, código ou token e fornece um botão acoplado para copiá-lo diretamente para a área de transferência do usuário, com feedback visual imediato.

**Usar quando:** Precisar exibir chaves de API, tokens de acesso, comandos de terminal ou pequenos trechos de código que o usuário frequentemente precisa copiar.
**Não usar quando:** O texto for longo demais e devesse estar em um editor completo, ou se a cópia não for uma ação primária.
**Alternativa se não se aplicar:** `Button` simples com ícone de `Copy`.

---

## Localização

| Campo      | Valor                          |
| ---------- | ------------------------------ |
| Arquivo    | `components/ds/copy-block.tsx` |
| Tipo       | `registry:ui`                  |
| Categoria  | `Data Display` / `Feedback`    |
| Depende de | `Button`, `Tooltip`            |

---

## API — Props

| Prop       | Tipo                   | Padrão  | Obrigatória | Descrição                                |
| ---------- | ---------------------- | ------- | ----------- | ---------------------------------------- |
| `value`    | `string`               | —       | ✓           | O texto a ser copiado.                   |
| `size`     | `"sm" \| "md" \| "lg"` | `"md"`  |             | Tamanho do bloco.                        |
| `truncate` | `boolean`              | `false` |             | Se o texto deve truncar com reticências. |
| `locale`   | `UILocale`             | `pt-BR` |             | Idioma para o tooltip de cópia.          |

---

## Variantes CVA

| Dimensão | Valores          | Padrão |
| -------- | ---------------- | ------ |
| `size`   | `sm`, `md`, `lg` | `md`   |

**Slots do componente**:

- `containerVariants` — wrapper externo (border, bg, flex, padding, corner radius).
- `textVariants` — texto exibido.
- `buttonVariants` — botão de cópia (tamanho específico ajustado para o bloco).

---

## Tokens de design utilizados

| Token                   | Slot onde é usado                     |
| ----------------------- | ------------------------------------- |
| `bg-muted`              | Fundo do bloco                        |
| `border-border`         | Borda do bloco                        |
| `text-foreground`       | Cor do texto/valor                    |
| `text-muted-foreground` | Cor do ícone de cópia                 |
| `text-success`          | Cor do ícone após copiado (CheckIcon) |

---

## Escala tipográfica e de tamanho

| Slot            | sm                  | md                  | lg                    |
| --------------- | ------------------- | ------------------- | --------------------- |
| Altura do Bloco | `h-8`               | `h-10`              | `h-12`                |
| Fonte do Valor  | `text-xs font-mono` | `text-sm font-mono` | `text-base font-mono` |
| Ícone (Copy)    | `size-3.5`          | `size-4`            | `size-5`              |

---

## Comportamentos e estados

| Estado              | Comportamento esperado                                                           |
| ------------------- | -------------------------------------------------------------------------------- |
| Ao clicar em Copiar | O ícone de `Copy` muda para `Check` por ~2 segundos. O Tooltip exibe "Copiado!". |

---

## Acessibilidade

| Requisito      | Implementação                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Teclado        | O botão é acessível por `Tab`.                                                                     |
| Leitor de Tela | `aria-label="Copiar para área de transferência"` no botão. Live region anunciando que foi copiado. |
| i18n           | Strings do tooltip e aria-label via `UI_I18N`.                                                     |

---

## Stories obrigatórias no Storybook

- [x] `Default` — bloco normal com um token curto.
- [x] `AllSizes` — sm, md, lg.
- [x] `Truncated` — texto muito longo com `truncate={true}` limitando a largura.
