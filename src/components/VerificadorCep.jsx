import { buscarEndereco } from "../services/viaCep";

export default function VerificadorCep({ cep, setCep, endereco, setEndereco }) {
  const aoDigitarCep = async (valor) => {
    setCep(valor);
    if (valor.length === 8) {
      const resultado = await buscarEndereco(valor);
      setEndereco(resultado);
    } else {
      setEndereco(null);
    }
  };

  return (
    <div>
      <p className="font-medium">Consultar Frete</p>
      <input
        type="text"
        value={cep}
        onChange={(e) => aoDigitarCep(e.target.value)}
        maxLength={8}
        placeholder="Digite o CEP"
        className="w-full border p-2 rounded mt-2"
      />
      {endereco && <p className="mt-2 text-gray-600 text-sm">{endereco}</p>}
    </div>
  );
}
