---
id: ds-globe-3d
title: 3D Globe
description: Um globo terrestre interativo em 3D, ideal para páginas de vendas e hero sections.
category: Data Display
components: ds-globe-3d
---

# 3D Globe

Um componente visual impressionante que renderiza um globo terrestre interativo em 3D. Perfeito para ilustrar escala global, mapas de uso ou infraestrutura (CDNs, clientes pelo mundo) em landing pages e _hero sections_ de SaaS.

## Features

- **Alta Performance**: Utiliza a biblioteca `cobe` (WebGl) que é extremamente leve (5kB).
- **Interativo**: Responde ao movimento do mouse ou _drag_ do usuário.
- **Customizável**: Suporta marcações (markers) para destacar cidades ou datacenters com _glow_.
- **Auto-rotação**: Pode girar suavemente no eixo Y quando inativo.

## Props

| Prop        | Tipo                        | Default   | Descrição                                  |
| ----------- | --------------------------- | --------- | ------------------------------------------ |
| `className` | `string`                    | -         | Classes utilitárias do Tailwind CSS.       |
| `markers`   | `Array<{ location, size }>` | `[]`      | Array de coordenadas para os pins no mapa. |
| `baseColor` | `[number, number, number]`  | `[1,1,1]` | Cor base do globo (RGB normalizado 0-1).   |
| `glowColor` | `[number, number, number]`  | `[1,1,1]` | Cor do brilho do globo e dos markers.      |

## Estrutura e Composição

- `<Globe3D>`: O componente principal que inicializa o WebGL canvas e controla o estado de rotação, interação de ponteiro e redimensionamento responsivo.

## Dependências

- `cobe` (deve estar listado em `dependencies` no registry).
- `framer-motion` (opcional, mas geralmente usado para revelar o globo).
