import { motion, useAnimation } from "framer-motion";

export default function BotaoCarrinho({ setModalAberto, adicionarAoCarrinho, quantidadeCarrinho }) {
  const controls = useAnimation();

  const handleAdicionar = async () => {
    const sucesso = adicionarAoCarrinho();
    if (sucesso) {
      await controls.start({
        scale: [1, 1.4, 1],
        transition: { duration: 0.3 }
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <motion.button
        onClick={handleAdicionar}
        whileTap={{ scale: 0.95 }}
        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Adicionar ao carrinho
      </motion.button>

     
    </div>
  );
}
