---
id: ds-receipt-card
title: Receipt Card
description: Um card projetado para exibir recibos de transações com um estilo de ticket picotado.
category: Data Display
components: ds-receipt-card
---

# Receipt Card

Um componente de exibição projetado especificamente para mostrar recibos, faturas e resumos de transações financeiras. O design incorpora um efeito visual de papel serrilhado ou picotado nas bordas, remetendo a recibos reais de supermercados ou bilhetes.

## Features

- **Efeito Serrilhado**: Utiliza `mask-image` (radial-gradient) ou SVG para criar as bordas recortadas superiores/inferiores.
- **Divisores Tracejados**: Estilo fiel a comprovantes impressos.
- **Estrutura Semântica**: Suporta cabeçalho, lista de itens, totais e rodapé de forma padronizada.

## Estrutura e Composição

- `<ReceiptCard>`: Container base com o efeito de borda picotada.
- `<ReceiptCardHeader>`: Título, data e ID da transação (frequentemente centralizado).
- `<ReceiptCardItems>`: Container para a lista de itens comprados/pagos.
- `<ReceiptCardItem>`: Uma linha contendo descrição, quantidade e valor.
- `<ReceiptCardDivider>`: Uma linha tracejada ou pontilhada.
- `<ReceiptCardTotal>`: Linha de destaque para o valor total final.
- `<ReceiptCardFooter>`: Informações adicionais (ex: código de barras, termos).

## Tematização

- O fundo utiliza `bg-card`, mas pode ser sobrescrito para simular papéis térmicos (ex: amarelo muito pálido ou branco puro).
- O texto utiliza tipografia mono-espaçada (`font-mono`) em valores financeiros e IDs para aumentar a similaridade com terminais POS.

## Acessibilidade

- Deve utilizar tags semânticas de descrição (ex: `dl`, `dt`, `dd`) para a estrutura de chave-valor.
- Leitores de tela devem ler os valores associados diretamente à sua descrição.
