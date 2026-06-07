const {
  cadastrarLivro,
  excluirLivro,
  consultarLivro,
  consultarEstoque,
} = require("../controller/livroController")

const { limparBanco } = require("../database/livroDatabase")

beforeEach(() => {
  limparBanco()
})

describe("cadastrarLivro", () => {
  test("Deve retornar sucesso true ao cadastrar livro válido", () => {
    const resultado = cadastrarLivro("Dom Casmurro", "Machado de Assis", "Clássico brasileiro.")
    expect(resultado.sucesso).toBe(true)
  })

  test("Deve retornar mensagem de confirmação ao cadastrar", () => {
    const resultado = cadastrarLivro("Dom Casmurro", "Machado de Assis", "Clássico brasileiro.")
    expect(resultado.mensagem).toContain("Dom Casmurro")
    expect(resultado.mensagem).toContain("sucesso")
  })

  test("Deve retornar sucesso false se o título estiver vazio", () => {
    const resultado = cadastrarLivro("", "Autor", "Descrição.")
    expect(resultado.sucesso).toBe(false)
  })

  test("Deve retornar sucesso false se o autor estiver vazio", () => {
    const resultado = cadastrarLivro("Titulo", "", "Descrição.")
    expect(resultado.sucesso).toBe(false)
  })

  test("Deve retornar sucesso false se a descrição estiver vazia", () => {
    const resultado = cadastrarLivro("Titulo", "Autor", "")
    expect(resultado.sucesso).toBe(false)
  })

  test("Deve retornar mensagem de erro ao falhar no cadastro", () => {
    const resultado = cadastrarLivro("", "", "")
    expect(resultado.mensagem).toBeTruthy()
  })

  test("Deve retornar sucesso false ao tentar cadastrar livro duplicado", () => {
    cadastrarLivro("1984", "George Orwell", "Distopia.")
    const resultado = cadastrarLivro("1984", "George Orwell", "Outra descrição.")
    expect(resultado.sucesso).toBe(false)
  })
})

describe("excluirLivro", () => {
  test("Deve retornar sucesso true ao remover livro existente", () => {
    cadastrarLivro("Sapiens", "Yuval Harari", "História da humanidade.")
    const resultado = excluirLivro("Sapiens")
    expect(resultado.sucesso).toBe(true)
  })

  test("Deve retornar mensagem de confirmação ao remover", () => {
    cadastrarLivro("Sapiens", "Yuval Harari", "História da humanidade.")
    const resultado = excluirLivro("Sapiens")
    expect(resultado.mensagem).toContain("Sapiens")
  })

  test("Deve retornar sucesso false ao remover livro inexistente", () => {
    const resultado = excluirLivro("Livro Fantasma")
    expect(resultado.sucesso).toBe(false)
  })

  test("Deve retornar mensagem de erro ao tentar remover inexistente", () => {
    const resultado = excluirLivro("Livro Fantasma")
    expect(resultado.mensagem).toContain("Livro Fantasma")
  })
})

describe("consultarLivro", () => {
  test("Deve retornar sucesso true ao encontrar livro", () => {
    cadastrarLivro("Harry Potter", "J.K. Rowling", "Mundo mágico.")
    const resultado = consultarLivro("Harry Potter")
    expect(resultado.sucesso).toBe(true)
  })

  test("Deve retornar o objeto do livro com título, autor e descrição", () => {
    cadastrarLivro("Harry Potter", "J.K. Rowling", "Mundo mágico.")
    const resultado = consultarLivro("Harry Potter")
    expect(resultado.livro.titulo).toBe("Harry Potter")
    expect(resultado.livro.autor).toBe("J.K. Rowling")
    expect(resultado.livro.descricao).toBe("Mundo mágico.")
  })

  test("Deve retornar sucesso false ao não encontrar livro", () => {
    const resultado = consultarLivro("Livro Inexistente")
    expect(resultado.sucesso).toBe(false)
  })

  test("Deve retornar mensagem de erro ao não encontrar livro", () => {
    const resultado = consultarLivro("Livro Inexistente")
    expect(resultado.mensagem).toContain("Livro Inexistente")
  })

  test("Não deve retornar livro na resposta quando não encontrado", () => {
    const resultado = consultarLivro("Livro Inexistente")
    expect(resultado.livro).toBeUndefined()
  })
})

describe("consultarEstoque", () => {
  test("Deve retornar total 0 quando o estoque estiver vazio", () => {
    const resultado = consultarEstoque()
    expect(resultado.total).toBe(0)
  })

  test("Deve retornar lista vazia quando o estoque estiver vazio", () => {
    const resultado = consultarEstoque()
    expect(resultado.livros).toEqual([])
  })

  test("Deve retornar total correto após cadastros", () => {
    cadastrarLivro("Livro A", "Autor A", "Desc A")
    cadastrarLivro("Livro B", "Autor B", "Desc B")
    const resultado = consultarEstoque()
    expect(resultado.total).toBe(2)
  })

  test("Deve retornar todos os livros cadastrados", () => {
    cadastrarLivro("Livro A", "Autor A", "Desc A")
    cadastrarLivro("Livro B", "Autor B", "Desc B")
    const resultado = consultarEstoque()
    expect(resultado.livros.length).toBe(2)
  })

  test("Deve atualizar o total após remoção de livro", () => {
    cadastrarLivro("Livro A", "Autor A", "Desc A")
    cadastrarLivro("Livro B", "Autor B", "Desc B")
    excluirLivro("Livro A")
    const resultado = consultarEstoque()
    expect(resultado.total).toBe(1)
  })
})