import { useEffect, useState } from "react";
import GaleriaImagens from "../components/GaleriaImagens";
import SeletorVariantes from "../components/SeletorVariantes";
import VerificadorCep from "../components/VerificadorCep";
import BotaoCarrinho from "../components/BotaoCarrinho";

const corParaImagem = {
  Preta: "/images/camiseta4.jpg",
  Verde: "/images/camiseta3.jpg",
  Marrom: "/images/camiseta2.jpg"
};

const imagemParaCor = {
  "/images/camiseta4.jpg": "Preta",
  "/images/camiseta3.jpg": "Verde",
  "/images/camiseta2.jpg": "Marrom"
};

const produto = {
  titulo: "T-shirt Pima",
  preco: 149.9,
  imagens: [
    "/images/camiseta2.jpg",
    "/images/camiseta3.jpg",
    "/images/camiseta4.jpg"
  ],
  variantes: {
    tamanhos: ["P", "M", "G", "GG", "XG"],
    cores: ["Preta", "Verde", "Marrom"]
  }
};

export default function Produto({ adicionarAoCarrinho, setModalAberto, itens }) {
  const [imagem, setImagem] = useState(produto.imagens[0]);
  const [tamanho, setTamanho] = useState(null);
  const [cor, setCor] = useState(null);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  useEffect(() => {
    const salvo = localStorage.getItem("produto-page");
    if (salvo) {
      const { data, timestamp } = JSON.parse(salvo);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        setImagem(data.imagem);
        setTamanho(data.tamanho);
        setCor(data.cor);
        setCep(data.cep);
        setEndereco(data.endereco);
      }
    }
  }, []);

  useEffect(() => {
    const data = { imagem, tamanho, cor, cep, endereco };
    localStorage.setItem("produto-page", JSON.stringify({ data, timestamp: Date.now() }));
  }, [imagem, tamanho, cor, cep, endereco]);

  const handleAdicionarAoCarrinho = () => {
    if (!tamanho || !cor) return alert("Selecione tamanho e cor antes de adicionar ao carrinho.");
    const novoItem = {
      nome: produto.titulo,
      preco: produto.preco,
      cor,
      tamanho,
      imagem,
      quantidade: 1
    };
    adicionarAoCarrinho(novoItem);
  };

  return (
    <div className="pt-[60px]">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        <GaleriaImagens
          imagens={produto.imagens}
          imagemAtual={imagem}
          aoTrocar={(novaImagem) => {
            setImagem(novaImagem);
            if (imagemParaCor[novaImagem]) {
              setCor(imagemParaCor[novaImagem]);
            }
          }}
        />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{produto.titulo}</h1>
          <p className="text-2xl text-green-600 font-semibold">
            R$ {produto.preco.toFixed(2)}
          </p>

          <SeletorVariantes
            tamanhos={produto.variantes.tamanhos}
            cores={produto.variantes.cores}
            tamanhoSelecionado={tamanho}
            corSelecionada={cor}
            aoSelecionarTamanho={setTamanho}
            aoSelecionarCor={(corSelecionada) => {
              setCor(corSelecionada);
              if (corParaImagem[corSelecionada]) {
                setImagem(corParaImagem[corSelecionada]);
              }
            }}
          />

          <VerificadorCep
            cep={cep}
            setCep={setCep}
            endereco={endereco}
            setEndereco={setEndereco}
          />

          <BotaoCarrinho
            setModalAberto={setModalAberto}
            adicionarAoCarrinho={handleAdicionarAoCarrinho}
            quantidadeCarrinho={quantidadeTotal}
          />
        </div>
      </div>
    </div>
    
  );
}
