import { useEffect, useState } from "react";
import { listarTransacoes, criarTransacao } from "../services/transacaoService";
import { listarPessoas } from "../services/pessoaService";
import type { Pessoa } from "../types/Pessoa";
import TransacaoForm from "../components/pagescomponents/TransacaoForm";
import TransacaoTable from "../components/pagescomponents/TransacaoTable";
import type { Transacao } from "../types/Transacao";
import axios from "axios";

export default function TelaTransacoes() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() { // Busca pessoas e transações da API e atualiza os estados correspondentes

    try {
      const pessoasResponse = await listarPessoas();
      setPessoas(pessoasResponse.data || []);
    } catch {
      setPessoas([]);
    }

    try {
      const transacoesResponse = await listarTransacoes();
      setTransacoes(transacoesResponse.data || []);
    } catch {
      setTransacoes([]);
    }
  }

  async function salvar(descricao: string, valor: number, tipo: string, idPessoa: number) { // Envia os dados do formulário para a API e recarrega a lista em caso de sucesso
    
    try{
      await criarTransacao({
      descricao,
      valor,
      tipo,
      idPessoa
    });
      carregar();
      setErro(null);

    } catch (e){
      if (axios.isAxiosError(e) && e.response?.data?.mensagem) {
        setErro(e.response.data.mensagem);
      } else {
        setErro("Erro inesperado.");
      }
    }

    
  }

  useEffect(() => { // Carrega pessoas e transações ao montar o componente
    carregar();
  }, []);

  return (
    <div className="page-card">

      <h2 className="mb-4">💳 Transações</h2>

      <TransacaoForm pessoas={pessoas} onSalvar={salvar} />
      {erro && <div className="alert alert-danger mt-2">{erro}</div>}
      <hr />
      <TransacaoTable pessoas={pessoas} transacoes={transacoes} />
      
    </div>
  );
}