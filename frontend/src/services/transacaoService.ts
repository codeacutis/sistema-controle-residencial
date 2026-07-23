import type { Transacao } from "../types/Transacao";
import { api } from "./api";

export const listarTransacoes = async () => { // Busca todas as transações cadastradas
  return await api.get("/transacao");
};

export const criarTransacao = async (dados: Transacao) => { // Envia uma nova transação para cadastro
  return await api.post("/transacao", dados);
};

export const buscarTotais = async () => { // Busca os totais consolidados por pessoa
  return await api.get("/transacao/totais");
};