import type { Pessoa } from "../types/Pessoa";
import { api } from "./api";

export const listarPessoas = async () => { // Busca todas as pessoas cadastradas
  return await api.get("/pessoa");
};

export const criarPessoa = async (dados: Pessoa) => { // Envia uma nova pessoa para cadastro
  return await api.post("/pessoa", dados);
};

export const excluirPessoa = async (id: number) => { // Remove uma pessoa pelo id
  return await api.delete(`/pessoa/${id}`);
};