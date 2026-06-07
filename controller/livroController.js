const {
  adicionarLivro,
  removerLivro,
  buscarLivro,
  listarLivros,
  totalLivros,
} = require("../service/livroService")
 
function cadastrarLivro(titulo, autor, descricao) {
  const resultado = adicionarLivro(titulo, autor, descricao)
 
  if (!resultado) {
    return {
      sucesso: false,
      mensagem:
        "Não foi possível cadastrar o livro. Verifique se todos os campos foram preenchidos ou se o livro já existe.",
    }
  }
 
  return {
    sucesso: true,
    mensagem: `Livro "${titulo}" cadastrado com sucesso!`,
  }
}
 
function excluirLivro(titulo) {
  const resultado = removerLivro(titulo)
 
  if (!resultado) {
    return {
      sucesso: false,
      mensagem: `Livro "${titulo}" não encontrado no estoque.`,
    }
  }
 
  return {
    sucesso: true,
    mensagem: `Livro "${titulo}" removido do estoque.`,
  }
}
 
function consultarLivro(titulo) {
  const livro = buscarLivro(titulo)
 
  if (!livro) {
    return {
      sucesso: false,
      mensagem: `Livro "${titulo}" não encontrado.`,
    }
  }
 
  return {
    sucesso: true,
    livro,
  }
}
 
function consultarEstoque() {
  const livros = listarLivros()
  const total = totalLivros()
 
  return {
    total,
    livros,
  }
}
 
module.exports = {
  cadastrarLivro,
  excluirLivro,
  consultarLivro,
  consultarEstoque,
}