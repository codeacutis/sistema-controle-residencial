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

    try{
      const response = await buscarTotais();
      setDados(response.data);
    } catch {
      setDados(null);
    }
    
  }

  if (!dados)
    return <p>Carregando...</p>;

  return (
    <div className="page-card">

      <h2 className="mb-4">📊 Totais</h2>

      <TotaisTable dados={dados}/>

    </div>
  );
}