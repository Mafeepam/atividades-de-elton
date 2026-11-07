import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const FEATURES = [
  { to: '/produtos', title: 'nav.products', text: 'home.productsText', tags: ['components.pagination', 'components.dropdown'] },
  { to: '/upload', title: 'nav.upload', text: 'home.uploadText', tags: ['components.progress', 'components.toast'] },
  { to: '/perfil', title: 'nav.profile', text: 'home.profileText', tags: ['components.tabs', 'components.progress'] },
  { to: '/faq', title: 'nav.faq', text: 'home.faqText', tags: ['components.accordion'] },
];

export default function Home() {
  const { showToast } = useToast();
  const { t } = useLanguage();

  return (
    <>
      <section className="hero">
        <h1>{t('home.title')}</h1>
        <p>{t('home.intro')}</p>
      </section>

      <section aria-labelledby="titulo-paginas">
        <h2 id="titulo-paginas" className="section-title">{t('home.pagesTitle')}</h2>
        <div className="card-grid">
          {FEATURES.map((feature) => (
            <Link key={feature.to} to={feature.to} className="card card--link">
              <h3>{t(feature.title)}</h3>
              <p>{t(feature.text)}</p>
              <ul className="tag-list" aria-label={t('home.usedComponents')}>
                {feature.tags.map((tag) => <li key={tag} className="tag">{t(tag)}</li>)}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-toast" className="card">
        <h2 id="titulo-toast" className="section-title">{t('home.toastTitle')}</h2>
        <p className="muted">{t('home.toastHint')}</p>
        <div className="button-row">
          <button type="button" className="btn btn--success" onClick={() => showToast({ type: 'success', message: t('home.msgSuccess') })}>
            {t('home.btnSuccess')}
          </button>
          <button type="button" className="btn btn--danger" onClick={() => showToast({ type: 'error', message: t('home.msgError') })}>
            {t('home.btnError')}
          </button>
          <button type="button" className="btn btn--primary" onClick={() => showToast({ type: 'info', message: t('home.msgInfo') })}>
            {t('home.btnInfo')}
          </button>
        </div>
      </section>
    </>
  );
}
