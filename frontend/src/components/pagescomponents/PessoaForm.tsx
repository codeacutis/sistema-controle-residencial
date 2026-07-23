import { useState } from "react";

interface Props {
  onSalvar: (nome: string, idade: number) => void;
}

export default function PessoaForm({ onSalvar }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);

  function enviar() { // Chama a função de salvar recebida via props e limpa os campos do formulário
    onSalvar(nome, idade);

    setNome("");
    setIdade(0);
  }

  return (
    <>
      <input
        className="form-control mb-2"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
      />

      <button
        className="btn btn-primary"
        onClick={enviar}
      >
        Salvar
      </button>
    </>
  );
}