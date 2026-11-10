function mascararCpf(valor) {
  const n = valor.replace(/\D/g, "").slice(0, 11);

  if (n.length <= 3) return n;
  if (n.length <= 6) return n.slice(0, 3) + "." + n.slice(3);
  if (n.length <= 9)
    return n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6);
  return (
    n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6, 9) + "-" + n.slice(9)
  );
}

const campoCpf = document.getElementById("cpf");

campoCpf.addEventListener("input", () => {
  campoCpf.value = mascararCpf(campoCpf.value);
});

const formLogin = document.getElementById("form-login");
const mensagemErro = document.getElementById("mensagem-erro");

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.hidden = false;
}

formLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  mensagemErro.hidden = true;
  mensagemErro.textContent = "";

  const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
  const senha = document.getElementById("senha").value;

  // 1. Campos vazios?
  if (!cpf || !senha) {
    mostrarErro("Informe o CPF e a senha.");
    return;
  }

  // 2. Procurar o usuário na lista
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find((u) => u.cpf === cpf);

  // 3. Não achou, ou a senha não bate?
  if (!usuario || usuario.senha !== senha) {
    mostrarErro("CPF ou senha incorretos.");
    return;
  }

  const sessao = {
    cpf: usuario.cpf,
    nome: usuario.nome,
  };
  sessionStorage.setItem("sessao", JSON.stringify(sessao));

  window.location.href = "dashboard.html";
});
