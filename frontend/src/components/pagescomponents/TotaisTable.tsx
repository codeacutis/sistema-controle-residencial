import type { Totais } from "../../types/Totais";

interface Props {
  dados: Totais;
}

export default function TotaisTable({
  dados
}: Props) {
  return (
    <>
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
              <td>
                R$ {pessoa.totalReceitas.toFixed(2)}
              </td>
              <td>
                R$ {pessoa.totalDespesas.toFixed(2)}
              </td>
              <td>
                R$ {pessoa.saldo.toFixed(2)}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      <hr />

      <h4>Totais Gerais</h4>

      <p>
        <strong>Receitas:</strong>{" "}
        R$ {dados.totalGeralReceitas.toFixed(2)}
      </p>

      <p>
        <strong>Despesas:</strong>{" "}
        R$ {dados.totalGeralDespesas.toFixed(2)}
      </p>

      <p>
        <strong>Saldo Líquido:</strong>{" "}
        R$ {dados.saldoLiquido.toFixed(2)}
      </p>
    </>
  );
}