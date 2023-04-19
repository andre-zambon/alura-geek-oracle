// Importação do serviço clienteService para buscar produtos
import { clienteService } from '../service/cliente-service.js'

const botaoBuscar = document.querySelector('[botao-busca]')

// Função de busca de produto
async function buscaProduto() {
  try {
    let produtoProcurado = document.querySelector('[data-busca]').value
    // Busca uma lista de produtos no serviço clienteService
    const lista = await clienteService.listaProdutos()
    // Filtra a lista para encontrar o produto com o nome procurado
    const listaDeResultado = lista.filter(elemento => elemento.nome === produtoProcurado)

    if (listaDeResultado.length > 0) {
      // Armazena o resultado da busca no localStorage
      localStorage.setItem('resultado-busca', JSON.stringify(listaDeResultado));
      // Redireciona para a página que irá exibir o resultado da busca
      window.location.href = '../buscaprodutos.html';
    } else {
      alert("Produto não encontrado")
    }
  }
  catch (erro) {
    console.log(erro)
    window.location.href = '../index.html'
  }
}

botaoBuscar.addEventListener('click', buscaProduto)

// Exibe input de busca móvel
const botaoBusca = document.getElementsByClassName('cabecalho__botao-buscar')[0]

botaoBusca.addEventListener("click", () => {
  const inputBusca = document.getElementsByClassName('cabecalho__busca-mobile')[0]
  // Exibe ou oculta o input de busca móvel
  inputBusca.classList.toggle('cabecalho__busca--mobile')
})

// Busca mobile de produto
const botaoBuscarMobile = document.querySelector('[botao-busca-mobile]')

async function buscaProdutoMobile() {
  try {
    let produtoProcurado = document.querySelector('[data-busca-mobile]').value
    const lista = await clienteService.listaProdutos()
    // Filtra a lista para encontrar o produto com o nome procurado
    const listaDeResultado = lista.filter(elemento => elemento.nome === produtoProcurado)

    if (listaDeResultado.length > 0) {
      localStorage.setItem('resultado-busca', JSON.stringify(listaDeResultado));
      window.location.href = '../buscaprodutos.html';
    } else {
      alert('Não há o produto em estoque')
    }
  }
  catch (erro) {
    console.log(erro)
    window.location.href = '../index.html'
  }
}

// Adiciona um event listener para o botão de busca móvel, se existir
if (botaoBuscarMobile) {
  botaoBuscarMobile.addEventListener('click', buscaProdutoMobile)
}
