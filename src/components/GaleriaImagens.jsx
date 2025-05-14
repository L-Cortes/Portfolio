export default function GaleriaImagens({ imagens, imagemAtual, aoTrocar }) {
    return (
      <div className="space-y-4">
        <img src={imagemAtual} alt="Imagem principal" className="w-full rounded-xl shadow-md max-h-[500px] object-cover" />
        <div className="flex gap-2">
          {imagens.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onClick={() => aoTrocar(img)}
              className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
                imagemAtual === img ? "border-blue-600" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }