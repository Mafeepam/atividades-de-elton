import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import { useLanguage } from '../../context/LanguageContext';
import './Layout.css';

const LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/produtos', key: 'nav.products' },
  { to: '/upload', key: 'nav.upload' },
  { to: '/perfil', key: 'nav.profile' },
  { to: '/faq', key: 'nav.faq' },
];

const LANGUAGES = [
  { value: 'pt-BR', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

export default function Header({ language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="header">
      <div className="header__inner container">
        <NavLink to="/" className="header__brand" onClick={() => setMenuOpen(false)}>
          <span className="header__logo" aria-hidden="true">◆</span>
          Loja Aurora
        </NavLink>

        <button
          type="button"
          className="header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav
          id="menu-principal"
          className={`header__nav ${menuOpen ? 'is-open' : ''}`}
          aria-label={t('nav.main')}
        >
          <ul>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}>
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <Dropdown
            label={t('nav.language')}
            options={LANGUAGES}
            selectedValue={language}
            onSelect={onLanguageChange}
            align="right"
          />
        </nav>
      </div>
    </header>
  );
}
