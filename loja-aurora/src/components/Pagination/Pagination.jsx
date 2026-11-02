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
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className="pagination" aria-label="Paginação">
      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Página anterior"
      >
        <span aria-hidden="true">‹</span>
        <span className="pagination__nav-text">Anterior</span>
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
                aria-label={`Página ${item}`}
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
        aria-label="Próxima página"
      >
        <span className="pagination__nav-text">Próxima</span>
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
}
