import axios from "axios";

export async function buscarEndereco(cep) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (!data.erro) {
      return `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
    }
    return "CEP não encontrado";
  } catch {
    return "Erro ao buscar CEP";
  }
}