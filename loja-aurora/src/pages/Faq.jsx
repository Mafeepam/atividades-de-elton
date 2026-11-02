import Accordion from '../components/Accordion/Accordion';
import { faqItems } from '../data/faq';

export default function Faq() {
  return (
    <>
      <header className="page-header">
        <h1>Perguntas frequentes</h1>
        <p className="muted">Clique em uma pergunta para ver a resposta. Só uma fica aberta por vez.</p>
      </header>
      <div className="narrow">
        <Accordion items={faqItems} defaultOpenId="prazo" />
      </div>
    </>
  );
}
