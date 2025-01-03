function status(request, response) {
  response.status(200).json({ chave: "Deu tudo certo aqui amigão" });
}

export default status;
