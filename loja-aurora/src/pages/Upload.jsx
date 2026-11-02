import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useToast } from '../context/ToastContext';

export default function Upload() {
  const { showToast } = useToast();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | done | error
  const [simulateError, setSimulateError] = useState(false);


  useEffect(() => {
    if (status !== 'uploading') return undefined;
    const interval = setInterval(() => {
      setProgress((current) => Math.min(100, current + Math.random() * 8 + 2));
    }, 200);
    return () => clearInterval(interval); 
  }, [status]);

 
  useEffect(() => {
    if (status !== 'uploading') return;
    if (simulateError && progress >= 60) {
      setStatus('error');
      showToast({ type: 'error', title: 'Falha no envio', message: 'A conexão foi interrompida em 60%.' });
    } else if (progress >= 100) {
      setStatus('done');
      showToast({ type: 'success', title: 'Upload concluído', message: `${files.length} arquivo(s) enviado(s).` });
    }
  }, [progress, status, simulateError, files.length, showToast]);

  function handleFileChange(event) {
    setFiles(Array.from(event.target.files));
    setProgress(0);
    setStatus('idle');
  }

  function startUpload() {
    if (files.length === 0) {
      showToast({ type: 'info', message: 'Selecione ao menos um arquivo antes de enviar.' });
      return;
    }
    setProgress(0);
    setStatus('uploading');
  }

  function cancelUpload() {
    setStatus('idle');
    setProgress(0);
    showToast({ type: 'info', message: 'Upload cancelado.' });
  }

  const barStatus = status === 'done' ? 'success' : status === 'error' ? 'error' : 'default';
  const statusText = {
    idle: 'Aguardando envio',
    uploading: 'Enviando…',
    done: 'Concluído',
    error: 'Erro no envio',
  }[status];

  return (
    <>
      <header className="page-header">
        <h1>Upload de arquivos</h1>
        <p className="muted">O envio é simulado — nenhum arquivo sai do seu computador.</p>
      </header>

      <div className="two-columns">
        <section className="card" aria-labelledby="titulo-envio">
          <h2 id="titulo-envio" className="section-title">Enviar documentos</h2>

          <label className="file-drop">
            <input type="file" multiple onChange={handleFileChange} disabled={status === 'uploading'} />
            <span className="file-drop__icon" aria-hidden="true">⇪</span>
            <span><strong>Escolha arquivos</strong> ou arraste-os aqui</span>
          </label>

          {files.length > 0 && (
            <ul className="file-list" aria-label="Arquivos selecionados">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <span>{file.name}</span>
                  <span className="muted">{(file.size / 1024).toFixed(1)} KB</span>
                </li>
              ))}
            </ul>
          )}

          <ProgressBar value={progress} label={statusText} status={barStatus} />

          <label className="checkbox">
            <input type="checkbox" checked={simulateError} onChange={(e) => setSimulateError(e.target.checked)} />
            Simular erro durante o envio
          </label>

          <div className="button-row">
            {status === 'uploading' ? (
              <button type="button" className="btn btn--ghost" onClick={cancelUpload}>Cancelar</button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={startUpload}>
                {status === 'error' ? 'Tentar novamente' : 'Enviar'}
              </button>
            )}
          </div>
        </section>

        <aside className="card" aria-labelledby="titulo-armazenamento">
          <h2 id="titulo-armazenamento" className="section-title">Seu armazenamento</h2>
          <div className="stack">
            <ProgressBar value={68} label="Espaço usado (6,8 de 10 GB)" />
            <ProgressBar value={40} label="Documentos" showValue={false} />
            <ProgressBar value={92} label="Imagens" status="error" />
          </div>
        </aside>
      </div>
    </>
  );
}
