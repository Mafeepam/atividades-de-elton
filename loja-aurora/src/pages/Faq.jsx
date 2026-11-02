import Accordion from '../components/Accordion/Accordion';
import { useLanguage } from '../context/LanguageContext';

export default function Faq() {
  const { t } = useLanguage();
  const items = t('faq.items');

  return (
    <>
      <header className="page-header">
        <h1>{t('faq.title')}</h1>
        <p className="muted">{t('faq.subtitle')}</p>
      </header>
      <div className="narrow">
        <Accordion items={items} defaultOpenId="prazo" />
      </div>
    </>
  );
}
