import { clienteService } from '../service/cliente-service.js'

const formulario = document.querySelector('[data-form]')

//adciona o evento 'subit' e uma função no formulário
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()

  const foto = evento.target.querySelector('[data-foto]').value
  const categoria = evento.target.querySelector('[data-categoria]').value
  const nome = evento.target.querySelector('[data-nome]').value
  const preco = evento.target.querySelector('[data-preco]').value
  const descricao = evento.target.querySelector('[data-descricao]').value


  try {
    await clienteService.criaProduto(foto, categoria, nome, preco, descricao)
    window.location.href = '../produtos.html'
  }

  catch (erro) {
    console.log(erro)
    window.location.href = '../index.html'
  }

})

