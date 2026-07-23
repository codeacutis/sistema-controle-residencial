export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: string;
  idPessoa: number;
}