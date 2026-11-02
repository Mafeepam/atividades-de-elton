import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="hero">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe.</p>
      <Link to="/" className="btn btn--primary">Voltar ao início</Link>
    </section>
  );
}
