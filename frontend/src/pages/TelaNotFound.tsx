import { Link } from 'react-router-dom'

export function TelaNotFound() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center page-card mx-auto" style={{ maxWidth: 480 }}>
            <h1 className="display-1 fw-bold text-secondary">404</h1>
            <h2 className="fw-semibold mb-2">Página não encontrada</h2>
            <p className="text-muted mb-4">Parece que você se perdeu em meio aos números...</p>
            <Link to="/" className="btn btn-dark">
                Voltar para o início
            </Link>
        </div>
    )
}
