export default function SeletorVariantes({ tamanhos, cores, tamanhoSelecionado, corSelecionada, aoSelecionarTamanho, aoSelecionarCor }) {
    return (
      <div className="space-y-4">
        <div>
          <p className="font-medium">Tamanho</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tamanhos.map((t) => (
              <button
                key={t}
                onClick={() => aoSelecionarTamanho(t)}
                className={`px-4 py-2 rounded-full border ${
                  tamanhoSelecionado === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
  
        <div>
          <p className="font-medium">Cor</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {cores.map((c) => (
              <button
                key={c}
                onClick={() => aoSelecionarCor(c)}
                className={`px-4 py-2 rounded-full border ${
                  corSelecionada === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }