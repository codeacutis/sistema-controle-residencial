import type { Pessoa } from "../../types/Pessoa";
import { useState } from "react";

interface Props {
  pessoas: Pessoa[];
  onSalvar: (
    descricao: string,
    valor: number,
    tipo: string,
    idPessoa: number
  ) => void;
}

export default function TransacaoForm({
  pessoas,
  onSalvar
}: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("Despesa");
  const [idPessoa, setIdPessoa] = useState(0);
  // Verifica se a pessoa é menor de idade
  const pessoaSelecionada = pessoas.find((p) => p.id === idPessoa)
  const menorDeIdade = pessoaSelecionada? pessoaSelecionada.idade < 18 : false;

  function handleSelecionarPessoa(id: number){ // Se a pessoa selecionada for menor de idade, força o valor para "Despesa"
    setIdPessoa(id);
    const pessoaSelecionada = pessoas.find((p) => p.id === id)
    if (pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === "Receita"){
      setTipo("Despesa")
    }
  }

  return (
    <>
      <select 
      className="form-select mb-2" 
      onChange={(e) => handleSelecionarPessoa(Number(e.target.value))}>
        <option value={0}> Selecione </option>
        {pessoas.map((p) => ( 
          <option key={p.id} value={p.id}>
            {p.nome}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) =>
          setDescricao(e.target.value)
        }
      />

      <input
        className="form-control mb-2"
        type="number"
        onChange={(e) =>
          setValor(Number(e.target.value))
        }
      />

      <select
        className="form-select mb-2"
        value={tipo}
        onChange={(e) =>
          setTipo(e.target.value)
        }
      >
        <option value="Receita" disabled={menorDeIdade}>
          Receita
        </option>

        <option value="Despesa">
          Despesa
        </option>
      </select>

      <button
        className="btn btn-primary"
        onClick={() =>
          onSalvar(
            descricao,
            valor,
            tipo,
            idPessoa
          )
        }
      >
        Salvar
      </button>
    </>
  );
}