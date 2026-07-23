import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="navbar-nav flex-row gap-3">
        <Link className="nav-link text-white" to="/">
          Pessoas
        </Link>

        <Link className="nav-link text-white" to="/transacoes">
          Transações
        </Link>

        <Link className="nav-link text-white" to="/totais">
          Totais
        </Link>
      </div>
    </nav>
  );
}