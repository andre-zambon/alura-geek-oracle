import { clienteService } from '../service/cliente-service.js'

//Função autoexecutável 

(async () => {

    //Captura a url da página de edição do cliente, que é referente a esse arquivo js
    const pegaURL = new URL(window.location)

    //Captura o id que identifica a url - que foi adicionado no arquivo listaClientes.js
    const id = pegaURL.searchParams.get('id')

    const inputCategoria = document.querySelector('[data-categoria]')
    const inputNome = document.querySelector('[data-nome]') //captura o valor do input nome
    const inputPreco = document.querySelector('[data-preco]')
    const inputDescricao = document.querySelector('[data-descricao]')

    try {
        //chama função que retorna os dados dos clientes e recebe como parâmetro o id do cliente
        const dados = await clienteService.detalhaProduto(id)
        //insere as informações dos clientes nos campos
        inputNome.value = dados.nome
        inputPreco.value = dados.preco
    }
    catch (erro) {
        console.log(erro)
        window.location.href = "../telas/index.html"

    }


    //ENVIA OS DADOS DOS INPUTS PARA O ARQUIVO DE CONTROLE DE CONEXÃO COM API
    const formulario = document.querySelector('[data-form]')

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault()

        try {
            await clienteService.atualizaProduto(inputCategoria.value, inputNome.value, inputPreco.value, inputDescricao.value, id) //recebe os dados que devem ser alterados na AP
            window.location.href = "../telas/produtos.html"
        }
        catch (erro) {
            console.log(erro)
            window.location.href = "../telas/index.html"

        }
    })
})

    () //executa a função principal