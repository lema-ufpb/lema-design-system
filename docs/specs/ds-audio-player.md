# Spec: AudioPlayer

## Propósito

Reprodutor de áudio completo que respeita 100% dos tokens de estilo do Design System, oferecendo controles de reprodução, barra de progresso (seek bar), controle de volume com mudo, seletor de velocidade de reprodução e suporte a capa e metadados de faixa.

**Usar quando:** sistemas de transcrição de voz, cursos online, podcasts, pré-escuta de áudio ou chamadas gravadas.  
**Não usar quando:** apenas disparar um efeito sonoro de interface sem controles visuais (use Web Audio API nativa).  
**Alternativa se não se aplicar:** `components/ds/video-dialog`.

---

## Localização

| Campo      | Valor                                            |
| ---------- | ------------------------------------------------ |
| Arquivo    | `components/ds/audio-player.tsx`                 |
| Tipo       | `registry:ui`                                    |
| Categoria  | `Media/AudioPlayer`                              |
| Depende de | `card`, `button`, `slider`, `avatar`, `skeleton` |

---

## API — Props

| Prop       | Tipo      | Padrão  | Obrigatória | Descrição                |
| ---------- | --------- | ------- | ----------- | ------------------------ |
| `src`      | `string`  | —       | ✓           | URL do arquivo de áudio  |
| `title`    | `string`  | —       |             | Nome da faixa            |
| `artist`   | `string`  | —       |             | Nome do artista ou autor |
| `coverUrl` | `string`  | —       |             | Imagem da capa           |
| `autoPlay` | `boolean` | `false` |             | Iniciar automaticamente  |
| `loading`  | `boolean` | `false` |             | Estado de carregamento   |

---

## Stories obrigatórias

- [x] `Default` — player com metadados e áudio demonstrativo
- [x] `Loading` — skeletons de capa e controles
- [x] `Minimal` — player sem metadados adicionais
