import type { Totais } from "../../types/Totais";

interface Props {
  dados: Totais;
}

export default function TotaisTable({
  dados
}: Props) {
  return (
    <>
      <div className="table-responsive">
        <table className="table">

        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>

        <tbody>

          {dados.pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td className="text-success fw-semibold">R$ {pessoa.totalReceitas.toFixed(2)}</td>
              <td className="text-danger fw-semibold">R$ {pessoa.totalDespesas.toFixed(2)}</td>
              <td className={pessoa.saldo >= 0 ? "saldo-positivo" : "saldo-negativo"}>
                R$ {pessoa.saldo.toFixed(2)}
              </td>
            </tr>
          ))}

        </tbody>

        </table>
      </div>

      <div className="row g-2 mt-3">
        <div className="col-6">
          <div className="card text-center border-success">
            <div className="card-body py-2">
              <small className="text-muted">Total Receitas</small>
              <p className="mb-0 text-success fw-bold">R$ {dados.totalGeralReceitas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card text-center border-danger">
            <div className="card-body py-2">
              <small className="text-muted">Total Despesas</small>
              <p className="mb-0 text-danger fw-bold">R$ {dados.totalGeralDespesas.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className={`card text-center ${dados.saldoLiquido >= 0 ? "border-success" : "border-danger"}`}>
            <div className="card-body py-2">
              <small className="text-muted">Saldo Líquido</small>
              <p className={`mb-0 fw-bold ${dados.saldoLiquido >= 0 ? "saldo-positivo" : "saldo-negativo"}`}>
                R$ {dados.saldoLiquido.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}