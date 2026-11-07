import { useLanguage } from '../../context/LanguageContext';
import './Pagination.css';

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  if (start > 2) pages.push('start-ellipsis');
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push('end-ellipsis');
  pages.push(totalPages);
  return pages;
}

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const { t } = useLanguage(); 
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className="pagination" aria-label={t('pagination.label')}>
      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label={t('pagination.prevAria')}
      >
        <span aria-hidden="true">‹</span>
        <span className="pagination__nav-text">{t('pagination.prev')}</span>
      </button>

      <ul className="pagination__list">
        {getPageItems(currentPage, totalPages).map((item) =>
          typeof item === 'string' ? (
            <li key={item} className="pagination__ellipsis" aria-hidden="true">…</li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`pagination__btn ${item === currentPage ? 'is-active' : ''}`}
                onClick={() => onPageChange(item)}
                aria-label={t('pagination.page', { n: item })}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label={t('pagination.nextAria')}
      >
        <span className="pagination__nav-text">{t('pagination.next')}</span>
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
}
