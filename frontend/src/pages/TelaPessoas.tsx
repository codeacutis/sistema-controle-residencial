import { useEffect, useState } from "react";
import PessoaForm from "../components/pagescomponents/PessoaForm";
import PessoaTable from "../components/pagescomponents/PessoaTable"
import axios from "axios";

import {
  listarPessoas,
  criarPessoa,
  excluirPessoa
} from "../services/pessoaService";
import type { Pessoa } from "../types/Pessoa";

export default function TelaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() { // Busca a lista atualizada de pessoas da API e atualiza o estado
    try {
      const response = await listarPessoas();
      setPessoas(response.data);
    } catch {
      setPessoas([]);
    }
  }

  async function salvar(nome: string, idade: number) { // Envia os dados do formulário para a API e recarrega a lista em caso de sucesso
    try{
      await criarPessoa({
      nome,
      idade
    });
    carregar();
    setErro(null);
    } catch (e){
      if (axios.isAxiosError(e) && e.response?.data?.mensagem) {
        setErro(e.response.data.mensagem);
      } else {
        setErro("e inesperado.");
      }
    }
  }

  async function excluir(id: number) { // Exclui a pessoa pelo id e recarrega a lista em caso de sucesso
    try{
      await excluirPessoa(id);
      carregar();
      setErro(null);
    } catch (e){
      if (axios.isAxiosError(e) && e.response?.data?.mensagem) {
        setErro(e.response.data.mensagem);
      } else {
        setErro("e inesperado.");
      }
    }
  }

  useEffect(() => { // Carrega as pessoas ao montar o componente
    carregar();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pessoas</h2>

      <PessoaForm onSalvar={salvar} />
      {erro && <div className="alert alert-danger">{erro}</div>}
      <hr />
      <PessoaTable pessoas={pessoas} onExcluir={excluir}/>


    </div>
  );
}
