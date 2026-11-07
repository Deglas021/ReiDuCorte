const formCadastro = document.getElementById("form-cadastro");
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const usuario = {
    nome: document.getElementById("nome").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    telefoneFixo: document.getElementById("telefone-fixo").value.trim(),
    celular: document.getElementById("celular").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    numero: document.getElementById("numero").value.trim(),
    cep: document.getElementById("cep").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    uf: document.getElementById("uf").value,
    senha: document.getElementById("senha").value,
    confirmarSenha: document.getElementById("confirmar-senha").value,
  };
  console.log(usuario);
});
