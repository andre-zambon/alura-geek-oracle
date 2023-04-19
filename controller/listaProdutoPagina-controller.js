// Função que retorna um elemento HTML com as informações do produto na página de detalhes
const listaProdutoPagina = (produto) => {
  const divProduto = document.createElement('div');
  divProduto.classList.add('descricao__container');

  const conteudo = `
    <img src="${produto.foto}" class="produto__foto-grande">
    <div>
    <h2 class="produto__nome produto__nome--tamanho">${produto.nome}</h2>
    <p class="produto__preco produto__preco--margin">${produto.preco}</p>
    <p class="produto__descricao">${produto.descricao}</p>
    </div>
  `;
  divProduto.innerHTML = conteudo;
  return divProduto;
};

// Função que retorna um elemento HTML com as informações do produto na seção de produtos similares
const listaProdutoSimilar = (nome, preco, foto, id) => {
  const item = document.createElement('li');
  const conteudoItem = `
    <img src="${foto}" class="produto__foto">
    <p class="produto__nome">${nome}</p>
    <p class="produto__preco">${preco}</p>
    <a href="produto.html?id=${id}" class="produto__link">Ver Produto</a><br>                      
  `;
  item.innerHTML = conteudoItem;
  return item;
};

// Função que renderiza as informações do produto na página de detalhes e na seção de produtos similares
const render = async () => {
  try {

    // Busca as informações do produto com o ID passado pela URL
    const produto = await clienteService.detalhaProduto(id);

    // Adiciona as informações do produto na seção de detalhes da página
    const conteudo = listaProdutoPagina(produto);
    const secaoProduto = document.querySelector('[data-produto]');
    secaoProduto.appendChild(conteudo);

    // Busca a lista de todos os produtos para encontrar outros produtos na mesma categoria do produto atual
    const lista = await clienteService.listaProdutos();
    const categoria = produto.categoria;
    const listaProdutos = document.querySelector('[data-similares]');

    // Filtra a lista de produtos para encontrar produtos na mesma categoria do produto atual e limita a 6 produtos
    const produtosMesmaCategoria = lista.filter(p => p.categoria === categoria);
    const produtosMesmaCategoriaLimite = produtosMesmaCategoria.slice(0, 6)

    console.log(produtosMesmaCategoria)

    // Adiciona os produtos similares na seção de produtos similares da página
    produtosMesmaCategoriaLimite.forEach(elemento => {
      if (elemento.categoria === categoria && elemento.id != id) {
        listaProdutos.appendChild(listaProdutoSimilar(elemento.nome, elemento.preco, elemento.foto, elemento.id));
      }
    });
  } catch (erro) {
    console.log(erro);
    
  }
};
render();
