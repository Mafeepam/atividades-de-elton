import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ToastContainer from './components/Toast/ToastContainer';
import { useToast } from './context/ToastContext';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Upload from './pages/Upload';
import Perfil from './pages/Perfil';
import Faq from './pages/Faq';
import NotFound from './pages/NotFound';

export default function App() {
  const { showToast } = useToast();
  const [language, setLanguage] = useState('pt-BR');

  function handleLanguageChange(option) {
    setLanguage(option.value);
    showToast({ type: 'info', message: `Idioma alterado para ${option.label}.` });
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header language={language} onLanguageChange={handleLanguageChange} />

      <main id="conteudo" className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </>
  );
}
