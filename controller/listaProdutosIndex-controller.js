
import { clienteService } from '../service/cliente-service.js'

// Função que cria o HTML para exibir um produto
const mostraNovoProduto = (foto, nome, preco, id) => {
  const listaProdutos = document.createElement('li')
  const conteudo = ` 
                  <img src="${foto}" class="produto__foto">
                  <p class="produto__nome">${nome}</p>
                  <p class="produto__preco">${preco}</p>
                  <a href="produto.html?id=${id}" class="produto__link">Ver Produto</a><br>
                  `
  listaProdutos.classList.add('produto')
  listaProdutos.innerHTML = conteudo
  listaProdutos.dataset.id = id
  return listaProdutos
}

// Função que renderiza os produtos na página
const render = async () => {
  try {
    // Obtém a lista de produtos do serviço
    const lista = await clienteService.listaProdutos()

    // Embaralha a lista de produtos
    const listaSortida = shuffleArray(lista)

    // Seleciona somente os primeiros 18 produtos embaralhados
    const listaMenor = listaSortida.slice(0, 18)

    // Função que embaralha um array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Obtém as listas de produtos para cada categoria
    const listaProdutosStarWars = document.querySelector('[data-star]')
    const listaProdutosConsoles = document.querySelector('[data-console]')
    const listaProdutosDiversos = document.querySelector('[data-diverso]')

    // Contadores para controlar quantos produtos de cada categoria foram exibidos
    let starWarsCount = 0
    let consolesCount = 0
    let diversosCount = 0

    // Verifica a largura da página para determinar quantos produtos de cada categoria serão exibidos
    let larguraDaPagina = window.screen.width

    if (larguraDaPagina < 768) {
      // Exibe até 8 produtos de cada categoria se a largura da página for menor que 768px
      listaMenor.forEach(elemento => {
        if (elemento.categoria === 'Star Wars' && starWarsCount < 8) {
          listaProdutosStarWars.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          starWarsCount++
        } else if (elemento.categoria === 'Consoles' && consolesCount < 8) {
          listaProdutosConsoles.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          consolesCount++
        } else if (diversosCount < 8) {
          listaProdutosDiversos.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          diversosCount++
        }
      })
    } else if (larguraDaPagina == 768) {
      // Exibe até 4 produtos de cada categoria se a largura da página for igual a 768px
      listaMenor.forEach(elemento => {
        if (elemento.categoria === 'Star Wars' && starWarsCount < 4) {
          listaProdutosStarWars.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          starWarsCount++
        } else if (elemento.categoria === 'Consoles' && consolesCount < 4) {
          listaProdutosConsoles.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          consolesCount++
        } else if (diversosCount < 4) {
          listaProdutosDiversos.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          diversosCount++
        }
      })
    } else if (larguraDaPagina > 768) {

      listaMenor.forEach(elemento => {
        // Exibe até 6 produtos de cada categoria se a largura da página for maior a 768px
        if (elemento.categoria === 'Star Wars' && starWarsCount < 6) {
          listaProdutosStarWars.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          starWarsCount++
        } else if (elemento.categoria === 'Consoles' && consolesCount < 6) {
          listaProdutosConsoles.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          consolesCount++
        } else if (diversosCount < 6) {
          listaProdutosDiversos.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
          diversosCount++
        }
      })
    }
  }
  catch (erro) {
    console.log(erro)
    window.location.href = '../telas/index.html'
  }
}

render()






