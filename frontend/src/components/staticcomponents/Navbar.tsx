import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3 px-md-4">
      <span className="navbar-brand fw-semibold fs-6 fs-md-5">💰 Controle Residencial</span>
      <div className="navbar-nav flex-row gap-2 gap-md-3 ms-auto">
        <Link
          className={`nav-link ${location.pathname === "/" ? "active fw-bold" : "text-white"}`}
          to="/"
        >
          Pessoas
        </Link>
        <Link
          className={`nav-link ${location.pathname === "/transacoes" ? "active fw-bold" : "text-white"}`}
          to="/transacoes"
        >
          Transações
        </Link>
        <Link
          className={`nav-link ${location.pathname === "/totais" ? "active fw-bold" : "text-white"}`}
          to="/totais"
        >
          Totais
        </Link>
      </div>
    </nav>
  );
}