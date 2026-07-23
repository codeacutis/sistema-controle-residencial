import type { TotalPessoa } from "./TotalPessoa";

export interface Totais {
    pessoas: TotalPessoa[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoLiquido: number;
}