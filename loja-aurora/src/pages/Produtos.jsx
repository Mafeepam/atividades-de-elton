import { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Pagination from '../components/Pagination/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { categories, products } from '../data/products';

const ITEMS_PER_PAGE = 6;


function ProductImage({ src, name }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="product__thumb" aria-hidden="true">{name.charAt(0)}</div>;
  }
  return (
    <img
      className="product__thumb product__img"
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Produtos() {
  const { showToast } = useToast();
  const { t, language } = useLanguage();
  const [category, setCategory] = useState('todas');
  const [sort, setSort] = useState('relevancia');
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef(null);

  const categoryOptions = [
    { value: 'todas', label: t('products.all') },
    ...categories.map((key) => ({ value: key, label: t(`categories.${key}`) })),
  ];
  const sortOptions = [
    { value: 'relevancia', label: t('products.sortRelevance') },
    { value: 'menor-preco', label: t('products.sortLow') },
    { value: 'maior-preco', label: t('products.sortHigh') },
    { value: 'nome', label: t('products.sortName') },
  ];

  const formatPrice = (value) =>
    value.toLocaleString(language, { style: 'currency', currency: 'BRL', currencyDisplay: 'narrowSymbol' });

  const filtered = useMemo(() => {
    const list = category === 'todas' ? [...products] : products.filter((p) => p.category === category);
    if (sort === 'menor-preco') list.sort((a, b) => a.price - b.price);
    if (sort === 'maior-preco') list.sort((a, b) => b.price - a.price);
    if (sort === 'nome') list.sort((a, b) => a.names[language].localeCompare(b.names[language], language));
    return list;
  }, [category, sort, language]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort]);

  function handlePageChange(page) {
    setCurrentPage(page);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addToCart(product) {
    showToast({ type: 'success', title: t('products.added'), message: product.names[language] });
  }

  return (
    <>
      <header className="page-header" ref={listTopRef}>
        <h1>{t('products.title')}</h1>
        <p className="muted">
          {t('products.summary', { count: filtered.length, page: currentPage, total: totalPages })}
        </p>
      </header>

      <div className="toolbar" role="group" aria-label={t('products.filters')}>
        <Dropdown label={t('products.category')} options={categoryOptions} selectedValue={category} onSelect={(o) => setCategory(o.value)} />
        <Dropdown label={t('products.sort')} options={sortOptions} selectedValue={sort} onSelect={(o) => setSort(o.value)} />
      </div>

      <ul className="product-grid" aria-live="polite">
        {pageItems.map((product) => {
          const name = product.names[language];
          return (
            <li key={product.id}>
              <article className="card product">
                <ProductImage src={product.image} name={name} />
                <span className="tag">{t(`categories.${product.category}`)}</span>
                <h2 className="product__name">{name}</h2>
                <p className="product__rating" aria-label={t('products.rating', { r: product.rating })}>
                  {'★'.repeat(Math.floor(product.rating))}
                  <span className="muted"> {product.rating.toFixed(1)}</span>
                </p>
                <p className="product__price">{formatPrice(product.price)}</p>
                <button type="button" className="btn btn--primary btn--block" onClick={() => addToCart(product)}>
                  {t('products.addToCart')}
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
