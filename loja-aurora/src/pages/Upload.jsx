import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';


export default function Upload() {
  const { showToast } = useToast();
  const { t } = useLanguage();
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
      showToast({ type: 'error', title: t('upload.failTitle'), message: t('upload.failMsg') });
    } else if (progress >= 100) {
      setStatus('done');
      showToast({ type: 'success', title: t('upload.doneTitle'), message: t('upload.doneMsg', { count: files.length }) });
    }
  }, [progress, status, simulateError, files.length, showToast, t]);

  function handleFileChange(event) {
    setFiles(Array.from(event.target.files));
    setProgress(0);
    setStatus('idle');
  }

  function startUpload() {
    if (files.length === 0) {
      showToast({ type: 'info', message: t('upload.selectFirst') });
      return;
    }
    setProgress(0);
    setStatus('uploading');
  }

  function cancelUpload() {
    setStatus('idle');
    setProgress(0);
    showToast({ type: 'info', message: t('upload.canceled') });
  }

  const barStatus = status === 'done' ? 'success' : status === 'error' ? 'error' : 'default';

  return (
    <>
      <header className="page-header">
        <h1>{t('upload.title')}</h1>
        <p className="muted">{t('upload.subtitle')}</p>
      </header>

      <div className="two-columns">
        <section className="card" aria-labelledby="titulo-envio">
          <h2 id="titulo-envio" className="section-title">{t('upload.sendTitle')}</h2>

          <label className="file-drop">
            <input type="file" multiple onChange={handleFileChange} disabled={status === 'uploading'} />
            <span className="file-drop__icon" aria-hidden="true">⇪</span>
            <span><strong>{t('upload.choose')}</strong> {t('upload.orDrag')}</span>
          </label>

          {files.length > 0 && (
            <ul className="file-list" aria-label={t('upload.selected')}>
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <span>{file.name}</span>
                  <span className="muted">{(file.size / 1024).toFixed(1)} KB</span>
                </li>
              ))}
            </ul>
          )}

          {}
          <ProgressBar value={progress} label={t(`upload.${status}`)} status={barStatus} />

          <label className="checkbox">
            <input type="checkbox" checked={simulateError} onChange={(e) => setSimulateError(e.target.checked)} />
            {t('upload.simulateError')}
          </label>

          <div className="button-row">
            {status === 'uploading' ? (
              <button type="button" className="btn btn--ghost" onClick={cancelUpload}>{t('upload.cancel')}</button>
            ) : (
              <button type="button" className="btn btn--primary" onClick={startUpload}>
                {status === 'error' ? t('upload.retry') : t('upload.send')}
              </button>
            )}
          </div>
        </section>

        <aside className="card" aria-labelledby="titulo-armazenamento">
          <h2 id="titulo-armazenamento" className="section-title">{t('upload.storageTitle')}</h2>
          <div className="stack">
            <ProgressBar value={68} label={t('upload.used')} />
            <ProgressBar value={40} label={t('upload.docs')} showValue={false} />
            <ProgressBar value={92} label={t('upload.images')} status="error" />
          </div>
        </aside>
      </div>
    </>
  );
}
