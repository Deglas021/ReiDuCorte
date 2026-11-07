const formCadastro = document.getElementById("form-cadastro");
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const usuario = {
    nome: document.getElementById("nome").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    celular: document.getElementById("celular").value.trim(),
    senha: document.getElementById("senha").value.trim(),
    confirmarSenha: document.getElementById("confirmar-senha").value.trim(),
  };
  console.log(usuario);
});
