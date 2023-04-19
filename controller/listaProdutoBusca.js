import { clienteService } from '../service/cliente-service.js'

//EXIBE O RESULTADO DA BUSCA

const listaProdutos = document.querySelector('[data-lista]')

//renderiza na tela a lista de produtos
const render = async () => {
  try {
    // Recupera o resultado da busca armazenado no localStorage
    const resultadoBusca = localStorage.getItem('resultado-busca');

    if (resultadoBusca) {
      const listaDeResultado = JSON.parse(resultadoBusca);

      const mostraNovoProduto = (foto, nome, preco, id) => {
        const listaProdutos = document.createElement('ul')
        const conteudo = ` 
          <li class="produto" data-produto>
          <img src="${foto}" class="produto__foto">
          <p class="produto__nome">${nome}</p>
          <p class="produto__preco">${preco}</p>
          <a href="produto.html?id=${id}" class="produto__link">Ver Produto</a><br>
          <li>
        `
        listaProdutos.innerHTML = conteudo
        // cria um novo data-atributte no lina do novo produto
        listaProdutos.dataset.id = id
        return listaProdutos
      }

      //itera sobre os elementos que existe na api e exibe nos campos nome e email
      listaDeResultado.forEach(elemento => {
        listaProdutos.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
      })

    } else {
      console.log("Resultado da busca não encontrado")
    }
  }
  catch (erro) {
    console.log(erro)
    window.location.href = '../index.html'
  }
}

render()
