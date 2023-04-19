// Importa o módulo clienteService do arquivo cliente-service.js
import { clienteService } from '../service/cliente-service.js'

// Define uma função que cria a estrutura HTML para exibir um produto na lista de produtos
const mostraNovoProduto = (foto, nome, preco, id) => {
    const listaProdutos = document.createElement('ul')

    const conteudo = ` 
                        <li class="produto" data-produto>
                            <img src="${foto}" class="produto__foto">
                            <p class="produto__nome">${nome}</p>
                            <p class="produto__preco">${preco}</p>
                            <a href="produto.html?id=${id}" class="produto__link">Ver Produto</a><br>
                            <a href="editaproduto.html?id=${id}" class="produto__link">Editar Produto</a><br>
                            <button class="botao--padrao">Excluir</button>
                        </li>                       
                        `
    listaProdutos.innerHTML = conteudo
    listaProdutos.dataset.id = id
    return listaProdutos
}

const cardProduto = document.querySelector('[data-lista]')

// Adiciona um listener de eventos no cardProduto que será disparado ao clicar em algum elemento dentro dele
cardProduto.addEventListener('click', async (evento) => {

    // Verifica se o botão clicado é o botão de excluir
    let ehBotaoDeletar = evento.target.className === "botao--padrao"

    if (ehBotaoDeletar) {

        try {
            const produto = evento.target.closest('[data-id]')
            let id = produto.dataset.id

            // Remove o produto do banco de dados e da lista de produtos
            await clienteService.removeProduto(id)
            produto.remove()
        }

        catch (erro) {
            // Em cas de erro, redireciona para a página inicial
            console.log(erro)
            window.location.href = '../telas/index.html'
        }
    }
})

// Seleciona o elemento HTML que contém a lista de produtos novamente
const listaProdutos = document.querySelector('[data-lista]')

// Define uma função async para buscar a lista de produtos no banco de dados e renderizá-los na tela
const render = async () => {
    try {
        const lista = await clienteService.listaProdutos()

        // Para cada produto na lista, cria a estrutura HTML correspondente e a adiciona na lista de produtos
        lista.forEach(elemento => {
            listaProdutos.appendChild(mostraNovoProduto(elemento.foto, elemento.nome, elemento.preco, elemento.id))
        })
    }
    catch (erro) {
        console.log(erro)
        window.location.href = '../telas/index.html'
    }

}

// Chama a função render para renderizar os produtos na tela
render()
