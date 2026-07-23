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
      setPessoas(response.data || []);
    } catch {
      setPessoas([]);
    }
  }

  async function salvar(nome: string, idade: number) {
    if (!nome.trim() || !idade) { // Valida os dados antes de enviar
      setErro("Preencha todos os campos!");
      return;
    }

    if (idade <= 0 || idade > 120) {
      setErro("A idade deve ser um número entre 1 e 120.");
      return;
    }
 // Envia os dados do formulário para a API e recarrega a lista em caso de sucesso
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
        setErro("Erro inesperado.");
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
        setErro("Erro inesperado.");
      }
    }
  }

  useEffect(() => { // Carrega as pessoas ao montar o componente
    carregar();
  }, []);

  return (
    <div className="page-card">
      <h2 className="mb-4">👤 Pessoas</h2>

      <PessoaForm onSalvar={salvar} />
      {erro && <div className="alert alert-danger mt-2">{erro}</div>}
      <hr />
      <PessoaTable pessoas={pessoas} onExcluir={excluir}/>
    </div>
  );
}
