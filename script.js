function openFaseGrupos() {
    window.location.href = 'games/fasegrupos/fasegrupos.html';
}

function openEscalacao() {
    window.location.href = 'games/escalacao/escalacao.html';
}

// Função para rolagem suave do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
