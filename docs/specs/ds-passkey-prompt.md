# Spec: PasskeyPrompt

---

## Propósito

Botão e prompt para autenticação biométrica e chaves de segurança (WebAuthn / Passkeys / Touch ID / Face ID / Windows Hello).

**Usar quando:** Oferecer método de login de alta segurança sem senhas para dispositivos compatíveis.
**Não usar quando:** O ambiente exigir exclusivamente autenticação via LDAP ou formulários legados.
**Alternativa se não se aplicar:** Botão tradicional com `FingerprintIcon`.

---

## Localização

| Campo      | Valor                              |
| ---------- | ---------------------------------- |
| Arquivo    | `components/ds/passkey-prompt.tsx` |
| Tipo       | `registry:ui`                      |
| Categoria  | `Actions`                          |
| Depende de | `Button`, `Badge`, `UI_I18N`       |

---

## API — Props

| Prop             | Tipo                                     | Padrão    | Descrição                                        |
| ---------------- | ---------------------------------------- | --------- | ------------------------------------------------ |
| `onAuthenticate` | `() => Promise<boolean \| void> \| void` | —         | Callback acionado para disparar o WebAuthn       |
| `variant`        | `"card" \| "button"`                     | `"card"`  | Renderiza como card de destaque ou botão de ação |
| `loading`        | `boolean`                                | `false`   | Exibe estado de espera biométrica ativa          |
| `supported`      | `boolean`                                | `true`    | Se o navegador/dispositivo suporta WebAuthn      |
| `locale`         | `UILocale`                               | `"pt-BR"` | Idioma para os textos e orientações              |
| `className`      | `string`                                 | —         | Classes extras                                   |

---

## Acessibilidade

- [x] Rótulo acessível anunciando "Entrar com chave de acesso ou biometria".
- [x] Estado de carregamento com `aria-busy="true"` e feedback claro.
- [x] Aviso acessível se o dispositivo não for compatível com WebAuthn.
