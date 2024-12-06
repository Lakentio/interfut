// Sorteador de Fase de Grupos
let times = [];
let grupos = [];
const TIMES_POR_GRUPO = 4;
const MAX_TIMES_POR_POTE = 8;

function inicializarSorteio() {
    const container = document.getElementById('grupos-container');
    container.innerHTML = '';
    grupos = [];
}

function validarTime(nome, pote) {
    if (!nome || !pote) {
        alert('Preencha todos os campos!');
        return false;
    }

    if (times.some(t => t.nome === nome)) {
        alert('Este time já foi adicionado!');
        return false;
    }

    const timesPote = times.filter(t => t.pote === pote).length;
    if (timesPote >= MAX_TIMES_POR_POTE) {
        alert(`O pote ${pote} já está cheio! (máximo ${MAX_TIMES_POR_POTE} times)`);
        return false;
    }

    return true;
}

function adicionarTime(nome, pote) {
    if (!validarTime(nome, pote)) return;
    
    times.push({ nome, pote: parseInt(pote) });
    atualizarListaTimes();
    limparFormulario();
}

function removerTime(index) {
    times.splice(index, 1);
    atualizarListaTimes();
}

function limparFormulario() {
    document.getElementById('nome-time').value = '';
    document.getElementById('pote-time').value = '';
}

function atualizarListaTimes() {
    for (let i = 1; i <= 4; i++) {
        const lista = document.getElementById(`lista-pote-${i}`);
        if (lista) {
            lista.innerHTML = '';
            times.filter(t => t.pote === i).forEach((time, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${time.nome}
                    <button onclick="removerTime(${times.indexOf(time)})">×</button>
                `;
                lista.appendChild(li);
            });
        }
    }
}

function validarSorteio() {
    if (times.length === 0) {
        alert('Adicione times antes de realizar o sorteio!');
        return false;
    }

    const numTimesPorPote = {};
    times.forEach(time => {
        numTimesPorPote[time.pote] = (numTimesPorPote[time.pote] || 0) + 1;
    });

    const numTimes = Object.values(numTimesPorPote)[0];
    if (!Object.values(numTimesPorPote).every(n => n === numTimes)) {
        alert('Todos os potes devem ter o mesmo número de times!');
        return false;
    }

    return true;
}

function sortearGrupos() {
    if (!validarSorteio()) return;
    
    inicializarSorteio();
    
    // Organizar times por potes
    const potes = {};
    times.forEach(time => {
        if (!potes[time.pote]) {
            potes[time.pote] = [];
        }
        potes[time.pote].push(time);
    });

    // Número de grupos baseado no número de times por pote
    const numGrupos = Object.values(potes)[0].length;
    
    // Criar grupos vazios
    for (let i = 0; i < numGrupos; i++) {
        grupos.push([]);
    }

    // Sortear times de cada pote
    Object.keys(potes).sort().forEach(poteNum => {
        const timesEmbaralhados = embaralharArray([...potes[poteNum]]);
        timesEmbaralhados.forEach((time, index) => {
            grupos[index].push(time);
        });
    });

    exibirGrupos();
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function exibirGrupos() {
    const container = document.getElementById('grupos-container');
    container.innerHTML = '';

    grupos.forEach((grupo, index) => {
        const grupoElement = document.createElement('div');
        grupoElement.className = 'grupo';
        grupoElement.innerHTML = `
            <h3>Grupo ${String.fromCharCode(65 + index)}</h3>
            <ul>
                ${grupo.map((time, idx) => `
                    <li>
                        <span class="pote-indicator">P${time.pote}</span>
                        ${time.nome}
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(grupoElement);
    });
}

// Exportar funções necessárias
window.inicializarSorteio = inicializarSorteio;
window.adicionarTime = adicionarTime;
window.removerTime = removerTime;
window.sortearGrupos = sortearGrupos;
