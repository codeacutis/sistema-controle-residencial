import { useState } from "react";

interface Props {
  onSalvar: (nome: string, idade: number) => void;
}

export default function PessoaForm({ onSalvar }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");

  function enviar() { // Chama a função de salvar recebida via props e limpa os campos do formulário
    onSalvar(nome, Number(idade));

    setNome("");
    setIdade("");
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
        min="0"
        max="120"
        value={idade}
        onChange={(e) => setIdade(e.target.value === "" ? "" : Number(e.target.value))}
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