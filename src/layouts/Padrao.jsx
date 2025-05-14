import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";

export default function Padrao({ children }) {
  return (
    <>
      <Cabecalho />
      <main className="min-h-screen">{children}</main>
      <Rodape />
    </>
  );
}
