// ESTE ARQUIVO FAZ A COMUNICAÇÃO ENTRE CLIENTE E SERVIDOR
// AS FUNÇÕES USAM OS DADOS CAPTURADOS DO HTML E ENVIAM PARA ALTERAR NO BANCO DE DADOS DA API



const listaProdutos = () => {
    return fetch('http://localhost:3000/profile') //abre a conexão e retorna uma promisse de conexão com o endereço
    .then (resposta => {
        if (resposta.ok){ // se a resposta do servidor estiver bem, executa, se não mostra erro
            return resposta.json() //transforma em objeto html
        }
        throw new Error('Não foi possível listar os clientes') //cria erro se a resposta da conexão não der certo
    })        
}

const buscaProduto = (nome) => {
    return fetch(`http://localhost:3000/profile${nome}`) //abre a conexão e retorna uma promisse de conexão com o endereço
    .then (resposta => {
        if (resposta.ok){ // se a resposta do servidor estiver bem, executa, se não mostra erro
            return resposta.json() //transforma em objeto html
        }
        throw new Error('Não foi possível listar os clientes') //cria erro se a resposta da conexão não der certo
    })        
}


const criaProduto = (foto, categoria, nome, preco, descricao) => {
    return fetch('http://localhost:3000/profile', { //abre nova requisição
        method: 'POST', //method post - diz que está enviando dados pra api, por padrão o fatch faz um GET
        headers: { //cabeçalho da requisição
            'Content-type' : 'application/json' //tipo da requisição
        },
        body: JSON.stringify ({ //corpo da requisição / 'stringfy' transforma o objeto em string
            foto: foto,
            categoria: categoria,
           nome: nome,
           preco: preco,
           descricao: descricao
           
        })

    })
    .then(resposta => { //então, retorna o corpo da requisição que possui o nome e o email
        if(resposta.ok){
            return resposta.body
        }
        throw new Error('Não foi possível cadastrar os produtos') 
    } )
}


const removeProduto = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, { //abre nova requisição e acessa o id que representa um item específico da API (cliente)
    method: 'DELETE' //deleta os dados da API
}) .then (resposta => {
    if(!resposta.ok){
        throw new Error('Não foi possível remover o produto') 
    }
})
}

const detalhaProduto = (id) => { //acessa o cliente pelo id e retorna os dados dos clientes
    return fetch(`http://localhost:3000/profile/${id}`)  //abre nova requisição e acessa o id que representa o cliente com os dados como resposta (nome e email)
 .then (resposta => {
        if(resposta.ok) {
            return resposta.json() //transforma em objeto html
        }
        throw new Error('Não foi possível detalhar os produtos') 

})
}

const atualizaProduto = (categoria, nome, preco, descricao, id) => { //abre nova requisição e acessa o id que representa o cliente, nome e email
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT', //envia os dados para a API, sem criar outro cliente, apenas modifica o cliente selecionado pelo id
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify ({
            categoria: categoria,
            nome: nome,
            preco: preco,
            descricao: descricao
        }) 
    }) 
    .then (resposta => {
        if(resposta.ok) {
            return resposta.json()
        }
        throw new Error('Não foi possível atualizar os produtos') 
})
}





export const clienteService = {
    listaProdutos,
    criaProduto,
    removeProduto,
    detalhaProduto,
    atualizaProduto,
    buscaProduto
}


// const listaCliente = () => {
//     const promisse = new Promise((resolve, reject) => { //iciializa uma promisse - cria uma promessa de que vai acessar a API se der certa a conexão

//         const http = new XMLHttpRequest() //inicializa um xml
        
//         http.open('GET', 'http://localhost:3000/profile') //abre conexão com a API
        
//         http.onload = () => { //onload = quando carregar a página
//             if (http.status >= 400){ //verifica o status do http e só executa se não tiver erro
//                 reject(JSON.parse(http.response))
//             }else{
//                 resolve(JSON.parse(http.response))
//             }
//         }
//         http.send() //envia os dados
//     })
//     console.log(promisse)
//     return promisse //promisse possui agroa a lista de elementos que tem na api
// } 



