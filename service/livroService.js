const { getBanco, setBanco } = require("../database/livroDatabase")
 
function adicionarLivro(titulo, autor, descricao) {
  
    if (!titulo || !autor || !descricao) {
    return false
  }
 
  const banco = getBanco()
 
  const jaExiste = banco.some(
    (livro) =>
      livro.titulo.toLowerCase() === titulo.toLowerCase() &&
      livro.autor.toLowerCase() === autor.toLowerCase()
  )
 
  if (jaExiste) {
    return false
  }
 
  const novoLivro = {
    id: Date.now(),
    titulo,
    autor,
    descricao,
  }
 
  setBanco([...banco, novoLivro])
  return true
}
 
function removerLivro(titulo) {
  if (!titulo) {
    return false
  }
 
  const banco = getBanco()
  const tamanhoAntes = banco.length
 
  const novoBanco = banco.filter(
    (livro) => livro.titulo.toLowerCase() !== titulo.toLowerCase()
  )
 
  if (novoBanco.length === tamanhoAntes) {
    return false
  }
 
  setBanco(novoBanco)
  return true
}
 
function buscarLivro(titulo) {
  if (!titulo) {
    return null
  }
 
  const banco = getBanco()
  const livroEncontrado = banco.find(
    (livro) => livro.titulo.toLowerCase() === titulo.toLowerCase()
  )
 
  return livroEncontrado || null
}
 
function listarLivros() {
  return getBanco()
}
 
function totalLivros() {
  return getBanco().length
}
 
module.exports = {
  adicionarLivro,
  removerLivro,
  buscarLivro,
  listarLivros,
  totalLivros,
}