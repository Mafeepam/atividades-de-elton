import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './Layout.css';

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/upload', label: 'Upload' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/faq', label: 'FAQ' },
];

const LANGUAGES = [
  { value: 'pt-BR', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

export default function Header({ language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav
          id="menu-principal"
          className={`header__nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Menu principal"
        >
          <ul>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Dropdown
            label="Idioma"
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
