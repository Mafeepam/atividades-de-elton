import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const FEATURES = [
  { to: '/produtos', title: 'Produtos', text: 'Paginação e menus suspensos para filtrar e ordenar.', tags: ['Paginação', 'Menu Suspenso'] },
  { to: '/upload', title: 'Upload', text: 'Barra de progresso simulando o envio de arquivos.', tags: ['Barra de Progresso', 'Toast'] },
  { to: '/perfil', title: 'Perfil', text: 'Dados do usuário organizados em abas.', tags: ['Abas', 'Barra de Progresso'] },
  { to: '/faq', title: 'FAQ', text: 'Perguntas frequentes em um acordeão.', tags: ['Acordeão'] },
];

export default function Home() {
  const { showToast } = useToast();

  return (
    <>
      <section className="hero">
        <h1>Componentes React na prática</h1>
        <p>
          Uma loja fictícia que demonstra seis componentes visuais: Acordeão, Paginação,
          Barra de Progresso, Abas, Menu Suspenso e Notificação Toast.
        </p>
      </section>

      <section aria-labelledby="titulo-paginas">
        <h2 id="titulo-paginas" className="section-title">Páginas</h2>
        <div className="card-grid">
          {FEATURES.map((feature) => (
            <Link key={feature.to} to={feature.to} className="card card--link">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <ul className="tag-list" aria-label="Componentes usados">
                {feature.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-toast" className="card">
        <h2 id="titulo-toast" className="section-title">Teste as notificações</h2>
        <p className="muted">Os toasts vêm de um Context global e somem sozinhos em alguns segundos.</p>
        <div className="button-row">
          <button type="button" className="btn btn--success" onClick={() => showToast({ type: 'success', message: 'Operação concluída com sucesso.' })}>
            Sucesso
          </button>
          <button type="button" className="btn btn--danger" onClick={() => showToast({ type: 'error', message: 'Não foi possível salvar. Tente novamente.' })}>
            Erro
          </button>
          <button type="button" className="btn btn--primary" onClick={() => showToast({ type: 'info', message: 'Há uma nova versão do catálogo.' })}>
            Informação
          </button>
        </div>
      </section>
    </>
  );
}
