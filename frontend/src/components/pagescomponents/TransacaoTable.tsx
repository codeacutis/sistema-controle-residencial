import type { Transacao } from "../../types/Transacao";
import type { Pessoa } from "../../types/Pessoa";

interface Props {
  pessoas: Pessoa[]
  transacoes: Transacao[];
}

export default function TransacaoTable({
  pessoas,
  transacoes
}: Props) {
  return (
    <div className="table-responsive">
      <table className="table mt-3">

      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Pessoa</th>
        </tr>
      </thead>

      <tbody>
        {transacoes.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.descricao}</td>
            <td>{t.valor.toFixed(2)}</td>
            <td>{t.tipo}</td>
            <td>{pessoas.find(p => p.id === t.idPessoa)?.nome || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}