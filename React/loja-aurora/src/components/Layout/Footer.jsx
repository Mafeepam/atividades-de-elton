import { useLanguage } from '../../context/LanguageContext';
import './Layout.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <p>{t('common.footer', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}