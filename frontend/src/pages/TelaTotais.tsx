import { useEffect, useState } from "react";
import { buscarTotais } from "../services/transacaoService";
import TotaisTable from "../components/pagescomponents/TotaisTable";
import type { Totais } from "../types/Totais";

export default function TelaTotais() {

  const [dados, setDados] = useState<Totais | null>(null);

  useEffect(() => { // Carrega os totais ao montar o componente
    carregar();
  }, []);

  async function carregar() { // Busca os totais consolidados da API e atualiza o estado
    const response = await buscarTotais();
    setDados(response.data);
  }

  if (!dados)
    return <p>Carregando...</p>;

  return (
    <div className="container mt-4">

      <h2>Totais</h2>

      <TotaisTable dados={dados}/>

    </div>
  );
}