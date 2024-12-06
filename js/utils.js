// Utilitários globais do InterFut

// Função para formatar números com zeros à esquerda
function padNumber(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

// Função para gerar um ID único
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para formatar data
function formatDate(date) {
    return `${padNumber(date.getDate(), 2)}/${padNumber(date.getMonth() + 1, 2)}/${date.getFullYear()}`;
}

// Função para formatar hora
function formatTime(date) {
    return `${padNumber(date.getHours(), 2)}:${padNumber(date.getMinutes(), 2)}`;
}
