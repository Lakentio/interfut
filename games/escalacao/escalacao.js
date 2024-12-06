// Montador de Escalação
let jogadores = [];
let formacao = '4-4-2';
let posicoesOcupadas = new Set();

function adicionarJogador(nome, numero, posicao) {
    const jogador = {
        nome,
        numero: parseInt(numero),
        posicao
    };

    if (validarJogador(jogador)) {
        jogadores.push(jogador);
        atualizarListaJogadores();
        limparFormulario();
    }
}

function validarJogador(jogador) {
    if (!jogador.nome || !jogador.numero || !jogador.posicao) {
        alert('Preencha todos os campos!');
        return false;
    }

    if (jogadores.some(j => j.numero === jogador.numero)) {
        alert('Número já está em uso!');
        return false;
    }

    return true;
}

function limparFormulario() {
    document.getElementById('nome-jogador').value = '';
    document.getElementById('numero-jogador').value = '';
    document.getElementById('posicao-jogador').value = '';
}

function atualizarListaJogadores() {
    const lista = document.getElementById('lista-jogadores');
    lista.innerHTML = '';
    
    jogadores.sort((a, b) => a.numero - b.numero).forEach((jogador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${jogador.numero} - ${jogador.nome} (${jogador.posicao})</span>
            <button onclick="removerJogador(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    atualizarCampo();
}

function removerJogador(index) {
    jogadores.splice(index, 1);
    atualizarListaJogadores();
}

function mudarFormacao(novaFormacao) {
    formacao = novaFormacao;
    posicoesOcupadas.clear();
    atualizarCampo();
}

function atualizarCampo() {
    const campo = document.getElementById('campo-futebol');
    campo.innerHTML = '';

    // Adicionar goleiro
    adicionarPosicaoCampo(campo, 'GK', '50%', '90%');

    // Adicionar outras posições baseado na formação
    const linhas = formacao.split('-').map(Number);
    const alturas = ['75%', '50%', '25%', '10%'];

    linhas.forEach((numJogadores, index) => {
        const espacamento = 100 / (numJogadores + 1);
        for (let i = 1; i <= numJogadores; i++) {
            const left = `${i * espacamento}%`;
            adicionarPosicaoCampo(campo, `P${index + 1}`, left, alturas[index]);
        }
    });
}

function adicionarPosicaoCampo(campo, posicao, left, top) {
    const div = document.createElement('div');
    div.className = 'posicao-campo';
    div.style.left = left;
    div.style.top = top;
    
    // Encontrar jogador para esta posição
    const jogador = jogadores.find(j => !posicoesOcupadas.has(j.numero));
    if (jogador) {
        div.innerHTML = `
            <div class="numero-jogador">${jogador.numero}</div>
            <div class="nome-jogador">${jogador.nome}</div>
        `;
        posicoesOcupadas.add(jogador.numero);
    } else {
        div.innerHTML = `<div class="posicao-vazia">${posicao}</div>`;
    }

    campo.appendChild(div);
}

// Exportar funções necessárias
window.adicionarJogador = adicionarJogador;
window.removerJogador = removerJogador;
window.mudarFormacao = mudarFormacao;
