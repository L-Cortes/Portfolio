import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { buscarEndereco } from "../services/viaCep";

export default function ModalCarrinho({ aberto, aoFechar, itens, total, atualizarQtd, removerItem }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [frete, setFrete] = useState(null);
  const modalRef = useRef();

  const formatarCep = (valor) => {
    const cepLimpo = valor.replace(/\D/g, "").slice(0, 8);
    return cepLimpo.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  };

  const calcularFrete = async () => {
    const cepNumerico = cep.replace(/\D/g, "");
    if (cepNumerico.length !== 8) return;
    const enderecoInfo = await buscarEndereco(cepNumerico);
    if (enderecoInfo) {
      setEndereco(enderecoInfo);

      const distanciasFicticias = {
        "04456000": 2,
        "04696000": 5,
        "04756000": 10,
        "00000000": 15
      };

      const distancia = distanciasFicticias[cepNumerico] || 20;
      let valorFrete = 0;
      if (distancia <= 2) valorFrete = 0;
      else if (distancia <= 5) valorFrete = 10;
      else if (distancia <= 10) valorFrete = 20;
      else valorFrete = 30;

      setFrete(valorFrete);
    }
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      aoFechar();
    }
  };

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-6xl rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <button
              onClick={aoFechar}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div>
              <h2 className="text-2xl font-bold mb-4">Resumo da Compra</h2>

              {itens.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {itens.map((item, i) => (
                    <div key={i} className="border-b pb-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-gray-500">
                          Cor: {item.cor} | Tamanho: {item.tamanho}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => atualizarQtd(i, item.quantidade - 1)} className="px-2">-</button>
                          <span>{item.quantidade}</span>
                          <button onClick={() => atualizarQtd(i, item.quantidade + 1)} className="px-2">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600 font-semibold">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p>
                        <button onClick={() => removerItem(i)} className="text-red-500 text-sm">
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-2">
                <p className="text-lg font-medium">CEP:</p>
                <input
                  type="text"
                  value={formatarCep(cep)}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                  placeholder="Digite seu CEP"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                />
                <button
                  onClick={calcularFrete}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Calcular Frete
                </button>
                {frete !== null && (
                  <p className="text-sm text-gray-700 mt-2">
                    Frete: <strong>{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</strong>
                  </p>
                )}
                <p className="text-xl font-bold mt-4">
                  Total: R$ {(total + (frete || 0)).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
              <h3 className="text-xl font-semibold mb-4">Login ou Cadastro</h3>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded">
                Entrar
              </button>
              <p className="text-sm text-center mt-3">
                Não tem conta? <a href="#" className="text-blue-600 underline">Cadastre-se</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
