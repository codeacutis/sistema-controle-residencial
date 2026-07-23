import type { Pessoa } from "../../types/Pessoa";

interface Props {
  pessoas: Pessoa[];
  onExcluir: (id: number) => void;
}

export default function PessoaTable({
  pessoas,
  onExcluir
}: Props) {
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Idade</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {pessoas.map((p) => (
          <tr key={p.id!}>
            <td>{p.id!}</td>
            <td>{p.nome}</td>
            <td>{p.idade}</td>

            <td>
              <button
                className="btn btn-danger"
                onClick={() => onExcluir(p.id!)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}