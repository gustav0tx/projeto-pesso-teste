# 📚 Sistema de Controle de Estoque de Livros

> Projeto pessoal desenvolvido com lógica de programação pura (sem bibliotecas externas), testes automatizados com Jest e pipeline de CI/CD com GitHub Actions.

---

## 🗂️ Sumário

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Elicitação de Requisitos](#elicitação-de-requisitos)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Como Rodar o Projeto](#como-rodar-o-projeto)
5. [Testes Automatizados](#testes-automatizados)
6. [Pipeline CI/CD](#pipeline-cicd)
7. [Explicação das Técnicas Utilizadas](#explicação-das-técnicas-utilizadas)

---

## Sobre o Projeto

Esse sistema resolve um problema real do dia a dia de uma livraria: **controlar o estoque de livros de forma simples e confiável**. Sem banco de dados externo, sem frameworks — apenas lógica de programação, organização em camadas e testes que garantem que tudo funciona.

---

## Elicitação de Requisitos

> A elicitação de requisitos é o processo de **identificar, entrevistar e documentar** o que o sistema precisa fazer antes de escrever qualquer código.

### 👤 Stakeholder (Usuário do Sistema)

| Campo       | Descrição                                      |
|-------------|------------------------------------------------|
| Quem é      | Dono ou funcionário de uma livraria            |
| Objetivo    | Controlar quais livros estão no estoque        |
| Dor atual   | Perder o controle de livros sem um sistema     |

---

### 📌 Requisitos Funcionais

São as **funcionalidades que o sistema deve ter** — o que ele faz.

| ID   | Requisito                         | Descrição                                                                 |
|------|-----------------------------------|---------------------------------------------------------------------------|
| RF01 | Cadastrar livro                   | O sistema deve permitir adicionar um livro com título, autor e descrição  |
| RF02 | Campos obrigatórios               | Título, autor e descrição são obrigatórios. Sem eles, o cadastro falha    |
| RF03 | Impedir duplicatas                | Não é possível cadastrar dois livros com mesmo título e autor             |
| RF04 | Remover livro                     | O sistema deve permitir remover um livro pelo título                      |
| RF05 | Buscar livro                      | O sistema deve retornar os dados de um livro ao buscar pelo título        |
| RF06 | Listar estoque                    | O sistema deve exibir todos os livros cadastrados                         |
| RF07 | Contar total de livros            | O sistema deve retornar quantos livros existem no estoque                 |

---

### 📌 Requisitos Não Funcionais

São as **qualidades do sistema** — como ele se comporta.

| ID    | Requisito             | Descrição                                                              |
|-------|-----------------------|------------------------------------------------------------------------|
| RNF01 | Sem bibliotecas       | Toda lógica usa apenas JavaScript puro (sem express, mongoose, etc.)   |
| RNF02 | Testável              | Todo o sistema deve ser coberto por testes automatizados com Jest      |
| RNF03 | Banco inicia vazio    | Cada execução de teste começa com o banco zerado                       |
| RNF04 | CI/CD automatizado    | O projeto deve rodar testes e build automaticamente via GitHub Actions |
| RNF05 | Código organizado     | Separação clara entre database, service e controller                   |

---

### 📌 Regras de Negócio

| ID   | Regra                                                                 |
|------|-----------------------------------------------------------------------|
| RN01 | Um livro só é cadastrado se título, autor e descrição forem válidos   |
| RN02 | Dois livros com mesmo título e mesmo autor são considerados iguais    |
| RN03 | A remoção é feita pelo título (case-insensitive)                      |
| RN04 | A busca é feita pelo título e retorna o objeto completo ou null       |

---

## Arquitetura do Projeto

```
livraria/
├── database/
│   └── livroDatabase.js       ← Armazena os dados em memória (array)
├── services/
│   └── livroService.js        ← Regras de negócio (adicionar, remover, buscar)
├── controllers/
│   └── livroController.js     ← Interface com o mundo externo (respostas formatadas)
├── test/
│   └── livroService.test.js   ← Testes automatizados com Jest
├── .github/
│   └── workflows/
│       └── ci.yml             ← Pipeline de CI/CD (GitHub Actions)
├── package.json
└── README.md
```

### Por que essa divisão?

| Camada       | Responsabilidade                                                    |
|--------------|---------------------------------------------------------------------|
| `database`   | Guardar e expor os dados (único lugar que sabe onde os dados ficam) |
| `service`    | Aplicar as regras de negócio (validar, buscar, adicionar)           |
| `controller` | Formatar as respostas para quem usa o sistema                       |
| `test`       | Garantir que as regras funcionam corretamente                       |

## Testes Automatizados

O projeto usa **Jest** para testes. Cada requisito tem seus próprios testes.

```bash
npm test
```

Exemplo de saída esperada:

```
PASS test/livroService.test.js
  Requisito 1 - Cadastro de livro
    ✓ Deve retornar true ao cadastrar um livro válido
    ✓ Deve salvar o livro no banco após cadastro
  Requisito 2 - Campos obrigatórios
    ✓ Deve retornar false se o título não for informado
    ✓ Deve retornar false se o autor não for informado
    ...

Tests: 16 passed, 16 total
```

### Técnicas de teste usadas

| Técnica         | Onde aparece                         | O que faz                                      |
|-----------------|--------------------------------------|------------------------------------------------|
| `beforeEach`    | Antes de cada teste                  | Limpa o banco para o teste começar zerado      |
| `describe`      | Agrupa testes por requisito          | Organiza os testes em blocos temáticos         |
| `test` / `it`   | Cada caso individual                 | Define o que está sendo testado                |
| `expect`        | Dentro de cada teste                 | Verifica se o resultado é o esperado           |
| `toBe`          | Comparações simples                  | Compara valores primitivos (true, false, 0...) |
| `toBeNull`      | Busca sem resultado                  | Verifica se o retorno foi null                 |
| `not.toBeNull`  | Busca com resultado                  | Verifica que o retorno não é null              |

---

## Pipeline CI/CD

O arquivo `.github/workflows/ci.yml` define dois jobs que rodam automaticamente no GitHub.

### Quando o pipeline roda?

| Evento                     | Branches afetadas    |
|----------------------------|----------------------|
| `push` (envio de código)   | `main` e `develop`   |
| `pull_request` (revisão)   | `main`               |

### Estrutura do pipeline

```
Pipeline CI
│
├── JOB 1: test  ──────────────────────────────────────
│   ├── Step 1: Checkout do código
│   ├── Step 2: Configurar Node.js 18
│   ├── Step 3: npm install
│   └── Step 4: npm test (Jest)
│
└── JOB 2: build  (só roda se JOB 1 passar) ──────────
    ├── Step 1: Checkout do código
    ├── Step 2: Configurar Node.js 18
    ├── Step 3: npm install
    ├── Step 4: Verificar estrutura de arquivos
    └── Step 5: Simular empacotamento
```

### Conceitos de CI/CD usados

| Conceito      | Onde está no projeto                                         |
|---------------|--------------------------------------------------------------|
| **Pipeline**  | O arquivo `.github/workflows/ci.yml` inteiro                 |
| **Job**       | `test` e `build` — blocos independentes de trabalho          |
| **Step**      | Cada `- name:` dentro de um job                              |
| **Branch**    | `main` e `develop` definidos no `on: push`                   |
| **Variables** | `env: NODE_VERSION` e `PROJECT_NAME`                         |
| **needs**     | `needs: test` — o build só roda se os testes passarem        |
| **cache**     | `cache: "npm"` — acelera builds reutilizando node_modules    |
| **triggers**  | `on: push` e `on: pull_request`                              |

---

## Explicação das Técnicas Utilizadas

### O que é CI/CD?

**CI (Integração Contínua)** significa que, sempre que alguém envia código novo, o sistema roda os testes automaticamente para garantir que nada quebrou.

**CD (Entrega Contínua)** significa que, após os testes passarem, o código pode ser empacotado e enviado para produção automaticamente.

### Por que usar?

Sem CI/CD: você envia código, esquece de testar, e só descobre o erro dias depois.
Com CI/CD: o GitHub testa automaticamente e te avisa imediatamente se algo quebrou.

