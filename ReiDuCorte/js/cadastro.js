const formCadastro = document.getElementById("form-cadastro");

function cpfValido(cpf) {
  // 1. Deixar só os números (remove pontos, traço, espaços)
  const numeros = cpf.replace(/\D/g, "");

  // 2. Precisa ter 11 dígitos
  if (numeros.length !== 11) {
    return false;
  }

  // 3. Barrar CPFs com todos os dígitos iguais (ex.: 11111111111)
  if (/^(\d)\1{10}$/.test(numeros)) {
    return false;
  }

  // 4. Calcular um dígito verificador
  function calcularDigito(quantidade) {
    let soma = 0;
    for (let i = 0; i < quantidade; i++) {
      soma += Number(numeros[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  // 5. Comparar com os dígitos reais do CPF
  const digito1 = calcularDigito(9);
  const digito2 = calcularDigito(10);

  return digito1 === Number(numeros[9]) && digito2 === Number(numeros[10]);
}

function mascararCpf(valor) {
  // 1. Só números, no máximo 11
  const n = valor.replace(/\D/g, "").slice(0, 11);

  // 2. Colocar pontos e traço conforme a quantidade de dígitos
  if (n.length <= 3) return n;
  if (n.length <= 6) return n.slice(0, 3) + "." + n.slice(3);
  if (n.length <= 9) return n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6);
  return n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6, 9) + "-" + n.slice(9);
}
const campoCpf = document.getElementById("cpf");


campoCpf.addEventListener("input", () => {
  campoCpf.value = mascararCpf(campoCpf.value);
});

function mascararCep(valor) {
  const n = valor.replace(/\D/g, "").slice(0, 8);

  if (n.length <= 5) return n;
  return n.slice(0, 5) + "-" + n.slice(5);
}

const campoCep = document.getElementById("cep");

campoCep.addEventListener("input", () => {
  campoCep.value = mascararCep(campoCep.value);
});

function mascararTelefone(valor) {
  const n = valor.replace(/\D/g, "").slice(0, 11);

  if (n.length <= 2) return n;
  if (n.length <= 6) return "(" + n.slice(0, 2) + ") " + n.slice(2);
  if (n.length <= 10) return "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
  return "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
}

const camposTelefone = [
  document.getElementById("telefone-fixo"),
  document.getElementById("celular")
];

camposTelefone.forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.value = mascararTelefone(campo.value);
  });
});



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

  // Validação de campos obrigatórios
  const mensagemErro = document.getElementById("mensagem-erro");
    mensagemErro.hidden = true; // Oculta a mensagem de erro inicialmente
    mensagemErro.textContent = ""; // Limpa o conteúdo da mensagem de erro

    if (!usuario.nome || !usuario.cpf || !usuario.celular || !usuario.rua || !usuario.numero || !usuario.cep || !usuario.bairro || !usuario.cidade || !usuario.uf || !usuario.senha || !usuario.confirmarSenha) {
      mensagemErro.textContent = "Por favor, preencha todos os campos obrigatórios.";
      mensagemErro.hidden = false;
      return;
    }

    if (usuario.senha !== usuario.confirmarSenha) {
      mensagemErro.textContent = "As senhas não coincidem.";
      mensagemErro.hidden = false;
      mensagemErro.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

        // CPF inválido?
    if (!cpfValido(usuario.cpf)) {
      mensagemErro.textContent = "CPF inválido.";
      mensagemErro.hidden = false;
      mensagemErro.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

  const cpfLimpo = usuario.cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioExistente = usuarios.find(u => u.cpf === cpfLimpo);
  if (usuarioExistente) {
    mensagemErro.textContent = "CPF já cadastrado.";
    mensagemErro.hidden = false;
    mensagemErro.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const novoUsuario = {
    ...usuario,
    cpf: cpfLimpo // Armazena o CPF sem formatação
  };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  window.location.href = "login.html"; // Redireciona para a página de login
});
