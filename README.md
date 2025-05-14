# Catálogo Montink - Desafio Técnico

Este projeto foi desenvolvido como parte de um desafio técnico com React + Vite, simulando uma loja de camisetas personalizadas da Montink. O objetivo é criar uma página de produto funcional, interativa e com comportamento realista de e-commerce.

---

## Funcionalidades implementadas

### Imagens do Produto
- Uma **imagem principal** ocupa cerca de 35% da tela.
- Abaixo, **miniaturas clicáveis** que substituem a imagem principal.
- As imagens são geradas dinamicamente a partir de um array (`produto.imagens`).

### Título e Preço
- Exibidos em destaque ao lado da imagem.
- O título e o preço são definidos dinamicamente pelo objeto `produto`.

### Seletores de Variantes
- Tamanhos e cores são exibidos como botões.
- Ambos são gerados dinamicamente a partir de `produto.variantes`.
- A seleção altera a imagem conforme a cor escolhida.

### Consulta de Frete
- Campo para digitação de CEP.
- Verifica e formata automaticamente o CEP.
- Ao informar um CEP válido, busca o endereço usando a [API ViaCEP](https://viacep.com.br).
- Exibe o endereço e calcula frete fictício baseado na distância.

### Carrinho de Compras
- Botão "Adicionar ao Carrinho" com animação.
- Modal com resumo do carrinho (itens, quantidade, preço, total).
- Permite alterar quantidades e remover itens.
- Ícone do carrinho no cabeçalho com contador.

### Persistência com `localStorage`
- Todos os dados do produto (imagem, tamanho, cor, CEP, endereço e imagem enviada) são salvos automaticamente.
- O carrinho também é persistido por até **15 minutos**, mesmo após recarregar a página.

### Upload de Estampa
- Campo de upload de imagem (`.png`, `.jpg`, etc).
- A imagem é exibida sobre a camiseta, simulando uma personalização em tempo real.

### Rodapé e Cabeçalho
- Cabeçalho fixo com menu de navegação e carrinho.
- Rodapé fixo ao final da página com créditos.

---

## Tecnologias Utilizadas

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com) (para chamada à API ViaCEP)

---

## Como rodar o projeto localmente

```bash
# Instale as dependências
npm install

# Rode o projeto
npm run dev
