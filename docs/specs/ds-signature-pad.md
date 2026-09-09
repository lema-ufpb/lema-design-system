# Spec: SignaturePad

## Propósito

Área de captura de assinatura digital manuscrita com suporte a mouse, stylus e touch, com exportação instantânea para formato Base64 PNG.

**Usar quando:** fluxos contratuais, termos de consentimento, recibos de entrega ou autorizações legais.  
**Não usar quando:** apenas coletar um aceite por checkbox (use `ui/checkbox`).  
**Alternativa se não se aplicar:** `ui/checkbox`.

---

## Localização

| Campo      | Valor                             |
| ---------- | --------------------------------- |
| Arquivo    | `components/ds/signature-pad.tsx` |
| Tipo       | `registry:ui`                     |
| Categoria  | `Form/SignaturePad`               |
| Depende de | `button`, `badge`, `skeleton`     |

---

## API — Props

| Prop          | Tipo                              | Padrão           | Obrigatória | Descrição                     |
| ------------- | --------------------------------- | ---------------- | ----------- | ----------------------------- |
| `value`       | `string \| null`                  | —                |             | Assinatura em base64 PNG      |
| `onChange`    | `(value: string \| null) => void` | —                |             | Callback com o dataURL gerado |
| `width`       | `number`                          | `500`            |             | Largura do canvas             |
| `height`      | `number`                          | `180`            |             | Altura do canvas              |
| `strokeColor` | `string`                          | `"currentColor"` |             | Cor do traço                  |
| `strokeWidth` | `number`                          | `2`              |             | Espessura do traço            |
| `label`       | `string`                          | —                |             | Rótulo acima do pad           |
| `clearLabel`  | `string`                          | `"Limpar"`       |             | Rótulo do botão limpar        |
| `disabled`    | `boolean`                         | `false`          |             | Estado desabilitado           |
| `loading`     | `boolean`                         | `false`          |             | Estado de carregamento        |

---

## Stories obrigatórias

- [x] `Default` — pad de assinatura pronto para desenho
- [x] `WithPreloadedSignature` — assinatura já preenchida
- [x] `Loading` — skeleton do canvas
- [x] `Disabled` — estado desabilitado
