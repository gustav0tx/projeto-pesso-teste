// 🧪 Testes automatizados — Estoque de Livros
const {
  adicionarLivro,
  removerLivro,
  buscarLivro,
  listarLivros,
  totalLivros,
} = require("../service/livroService")

const { limparBanco } = require("../database/livroDatabase")

// 🔁 Antes de cada teste, o banco começa vazio (Requisito 4)
beforeEach(() => {
  limparBanco()
})

// ─────────────────────────────────────────────
// 📌 REQUISITO 1 — Adicionar livro com sucesso
// ─────────────────────────────────────────────
describe("Requisito 1 - Cadastro de livro", () => {
  test("Deve retornar true ao cadastrar um livro válido", () => {
    const resultado = adicionarLivro(
      "Dom Casmurro",
      "Machado de Assis",
      "Clássico da literatura brasileira sobre ciúme e dúvida."
    )
    expect(resultado).toBe(true)
  })

  test("Deve salvar o livro no banco após cadastro", () => {
    adicionarLivro(
      "O Alquimista",
      "Paulo Coelho",
      "Jornada de um pastor em busca de seu tesouro."
    )
    expect(totalLivros()).toBe(1)
  })
})

// ─────────────────────────────────────────────
// 📌 REQUISITO 2 — Campos obrigatórios
// ─────────────────────────────────────────────
describe("Requisito 2 - Campos obrigatórios", () => {
  test("Deve retornar false se o título não for informado", () => {
    const resultado = adicionarLivro("", "Autor Teste", "Descrição.")
    expect(resultado).toBe(false)
  })

  test("Deve retornar false se o autor não for informado", () => {
    const resultado = adicionarLivro("Livro Teste", "", "Descrição.")
    expect(resultado).toBe(false)
  })

  test("Deve retornar false se a descrição não for informada", () => {
    const resultado = adicionarLivro("Livro Teste", "Autor Teste", "")
    expect(resultado).toBe(false)
  })

  test("Deve retornar false se todos os campos estiverem vazios", () => {
    const resultado = adicionarLivro("", "", "")
    expect(resultado).toBe(false)
  })
})

// ─────────────────────────────────────────────
// 📌 REQUISITO 3 — Não cadastrar livro duplicado
// ─────────────────────────────────────────────
describe("Requisito 3 - Livro duplicado", () => {
  test("Deve retornar false ao tentar cadastrar livro já existente", () => {
    adicionarLivro("1984", "George Orwell", "Distopia clássica.")
    const resultado = adicionarLivro("1984", "George Orwell", "Outra descrição.")
    expect(resultado).toBe(false)
  })

  test("Não deve duplicar o livro no banco", () => {
    adicionarLivro("1984", "George Orwell", "Distopia clássica.")
    adicionarLivro("1984", "George Orwell", "Outra descrição.")
    expect(totalLivros()).toBe(1)
  })
})

// ─────────────────────────────────────────────
// 📌 REQUISITO 4 — Remover livro
// ─────────────────────────────────────────────
describe("Requisito 4 - Remoção de livro", () => {
  test("Deve retornar true ao remover um livro existente", () => {
    adicionarLivro("Sapiens", "Yuval Harari", "História da humanidade.")
    const resultado = removerLivro("Sapiens")
    expect(resultado).toBe(true)
  })

  test("Deve diminuir o total de livros após remoção", () => {
    adicionarLivro("Sapiens", "Yuval Harari", "História da humanidade.")
    removerLivro("Sapiens")
    expect(totalLivros()).toBe(0)
  })

  test("Deve retornar false ao tentar remover livro inexistente", () => {
    const resultado = removerLivro("Livro Fantasma")
    expect(resultado).toBe(false)
  })

  test("Deve retornar false se o título não for informado", () => {
    const resultado = removerLivro("")
    expect(resultado).toBe(false)
  })
})

describe("Requisito 5 - Busca de livro", () => {
  test("Deve retornar o livro ao buscar pelo título correto", () => {
    adicionarLivro("Harry Potter", "J.K. Rowling", "Mundo mágico de Hogwarts.")
    const livro = buscarLivro("Harry Potter")
    expect(livro).not.toBeNull()
    expect(livro.titulo).toBe("Harry Potter")
    expect(livro.autor).toBe("J.K. Rowling")
  })

  test("Deve retornar null ao buscar livro inexistente", () => {
    const livro = buscarLivro("Livro Inexistente")
    expect(livro).toBeNull()
  })

  test("Deve retornar null se o título não for informado", () => {
    const livro = buscarLivro("")
    expect(livro).toBeNull()
  })
})

describe("Requisito 6 - Total e listagem de livros", () => {
  test("Banco deve iniciar vazio (total = 0)", () => {
    expect(totalLivros()).toBe(0)
  })

  test("Deve contabilizar corretamente múltiplos livros", () => {
    adicionarLivro("Livro A", "Autor A", "Desc A")
    adicionarLivro("Livro B", "Autor B", "Desc B")
    adicionarLivro("Livro C", "Autor C", "Desc C")
    expect(totalLivros()).toBe(3)
  })

  test("Deve listar todos os livros cadastrados", () => {
    adicionarLivro("Livro A", "Autor A", "Desc A")
    adicionarLivro("Livro B", "Autor B", "Desc B")
    const lista = listarLivros()
    expect(lista.length).toBe(2)
    expect(lista[0].titulo).toBe("Livro A")
    expect(lista[1].titulo).toBe("Livro B")
  })
})