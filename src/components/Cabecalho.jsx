import { Search, ShoppingCart } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

export default function Cabecalho({ setModalAberto, quantidadeCarrinho }) {
  const controls = useAnimation();

  return (
    <header className="bg-green-100 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="text-sm text-center bg-black text-white py-1">
        ⚠️ Conheça o catálogo oficial da Montink — Navegue, inspire-se e revenda em sua loja!
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-24 h-20" />
          <span className="text-lg font-semibold text-black">
            Catálogo <span className="text-green-600">Montink</span>
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-6 relative border-1">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full pl-4 pr-10 py-2 rounded border-none text-black"
          />
          <Search className="absolute right-3 top-2.5 text-gray-600" size={18} />
        </div>
      </div>

      <nav className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <ul className="flex flex-wrap gap-x-6 text-sm">
            <li><a href="#" className="hover:text-green-400">Avental</a></li>
            <li><a href="#" className="hover:text-green-400">Bonés</a></li>
            <li><a href="#" className="hover:text-green-400">Camisetas</a></li>
            <li><a href="#" className="hover:text-green-400">Oversized</a></li>
            <li><a href="#" className="hover:text-green-400">Linha Esportiva UV</a></li>
            <li><a href="#" className="hover:text-green-400">Canecas</a></li>
            <li><a href="#" className="hover:text-green-400">Moletons</a></li>
            <li><a href="#" className="hover:text-green-400">Poster e Flyer</a></li>
            <li><a href="#" className="hover:text-green-400">T-Shirt Pet</a></li>
            <li><a href="#" className="hover:text-green-400">Ecobags</a></li>
          </ul>

          <motion.div
            animate={controls}
            onClick={() => setModalAberto(true)}
            className="relative cursor-pointer ml-4"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {quantidadeCarrinho > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {quantidadeCarrinho}
              </div>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
