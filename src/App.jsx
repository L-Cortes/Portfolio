import { useEffect, useState } from "react";
import Cabecalho from "./components/Cabecalho";
import Produto from "./pages/Produto";
import ModalCarrinho from "./components/ModalCarrinho";
import Rodape from "./components/Rodape";

export default function App() {
  const [modalAberto, setModalAberto] = useState(false);


  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) {
      const { data, timestamp } = JSON.parse(salvo);
      if (Date.now() - timestamp < 15 * 60 * 1000) {
        return data;
      } else {
        localStorage.removeItem("carrinho");
      }
    }
    return [];
  });


  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify({ data: itens, timestamp: Date.now() }));
  }, [itens]);

  const adicionarAoCarrinho = (novoItem) => {
    setItens((prev) => {
      const existente = prev.find(
        (item) => item.cor === novoItem.cor && item.tamanho === novoItem.tamanho
      );
      if (existente) {
        return prev.map((item) =>
          item.cor === novoItem.cor && item.tamanho === novoItem.tamanho
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, novoItem];
      }
    });
  };

  const atualizarQuantidade = (index, novaQtd) => {
    setItens((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantidade: novaQtd < 1 ? 1 : novaQtd } : item
      )
    );
  };

  const removerItem = (index) => {
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho setModalAberto={setModalAberto} quantidadeCarrinho={quantidadeTotal} />

      <main className="flex-1 pt-[144px]">
        <Produto
          adicionarAoCarrinho={adicionarAoCarrinho}
          setModalAberto={setModalAberto}
          itens={itens}
        />
      </main>

      <Rodape />

      <ModalCarrinho
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        itens={itens}
        total={total}
        atualizarQtd={atualizarQuantidade}
        removerItem={removerItem}
      />
    </div>
  );
}
