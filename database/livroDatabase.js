let banco = []

function getBanco() {
    return banco
}

function setBanco(novoEstado) {
    banco = novoEstado
}

function limparBanco() {
    banco = []
}

module.exports = { getBanco, setBanco, limparBanco }