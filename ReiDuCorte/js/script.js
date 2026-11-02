const html = document.documentElement;
/*funcao tema*/
const botaoTema = document.getElementById("btn-tema");

botaoTema.addEventListener("click", () => {
   
    const  temaAtual = html.getAttribute("data-tema");
    const novo = temaAtual === "light" ? "dark" : "light";
    html.setAttribute("data-tema", novo);
});

/*funcao fonte*/
const escala_maxima = 1.5;
const escala_minima = 0.5;
const passo = 0.1;

let escala_atual = 1.0;

const botaoAumentar = document.getElementById("btn-mais");
const botaoDiminuir = document.getElementById("btn-menos");

function atualizarEscala(novaEscala) {
    novaEscala = Math.min(escala_maxima, Math.max(escala_minima, novaEscala));
    novaEscala = Math.round(novaEscala * 10) / 10; // Arredonda para uma casa decimal
    escala_atual = novaEscala;
    html.style.setProperty("--escala", novaEscala);
}

botaoAumentar.addEventListener("click", () => {
    atualizarEscala(escala_atual + passo);
});

botaoDiminuir.addEventListener("click", () => {
    atualizarEscala(escala_atual - passo);
});

