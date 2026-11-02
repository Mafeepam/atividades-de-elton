import { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Pagination from '../components/Pagination/Pagination';
import { useToast } from '../context/ToastContext';
import { categories, products } from '../data/products';

const ITEMS_PER_PAGE = 6;

const CATEGORY_OPTIONS = [
  { value: 'todas', label: 'Todas' },
  ...categories.map((category) => ({ value: category, label: category })),
];

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome', label: 'Nome (A–Z)' },
];

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Produtos() {
  const { showToast } = useToast();
  const [category, setCategory] = useState('todas');
  const [sort, setSort] = useState('relevancia');
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef(null);

  // Filtra e ordena só quando categoria ou ordenação mudam
  const filtered = useMemo(() => {
    const list = category === 'todas' ? [...products] : products.filter((p) => p.category === category);
    if (sort === 'menor-preco') list.sort((a, b) => a.price - b.price);
    if (sort === 'maior-preco') list.sort((a, b) => b.price - a.price);
    if (sort === 'nome') list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    return list;
  }, [category, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Ao mudar o filtro, volta para a página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort]);

  function handlePageChange(page) {
    setCurrentPage(page);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addToCart(product) {
    showToast({ type: 'success', title: 'Adicionado ao carrinho', message: product.name });
  }

  return (
    <>
      <header className="page-header" ref={listTopRef}>
        <h1>Produtos</h1>
        <p className="muted">
          {filtered.length} produtos · página {currentPage} de {totalPages}
        </p>
      </header>

      <div className="toolbar" role="group" aria-label="Filtros">
        <Dropdown label="Categoria" options={CATEGORY_OPTIONS} selectedValue={category} onSelect={(o) => setCategory(o.value)} />
        <Dropdown label="Ordenar" options={SORT_OPTIONS} selectedValue={sort} onSelect={(o) => setSort(o.value)} />
      </div>

      <ul className="product-grid" aria-live="polite">
        {pageItems.map((product) => (
          <li key={product.id}>
            <article className="card product">
              <div className="product__thumb" aria-hidden="true">{product.name.charAt(0)}</div>
              <span className="tag">{product.category}</span>
              <h2 className="product__name">{product.name}</h2>
              <p className="product__rating" aria-label={`Avaliação ${product.rating} de 5`}>
                {'★'.repeat(Math.floor(product.rating))}
                <span className="muted"> {product.rating.toFixed(1)}</span>
              </p>
              <p className="product__price">{formatPrice(product.price)}</p>
              <button type="button" className="btn btn--primary btn--block" onClick={() => addToCart(product)}>
                Adicionar ao carrinho
              </button>
            </article>
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
