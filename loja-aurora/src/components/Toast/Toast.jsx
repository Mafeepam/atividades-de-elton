import { useEffect, useState } from 'react';
import './Toast.css';

const ICONS = { success: '✓', error: '✕', info: 'i' };
const DEFAULT_TITLES = { success: 'Sucesso', error: 'Erro', info: 'Informação' };

export default function Toast({ id, type = 'info', title, message, duration = 4000, onClose }) {
  const [paused, setPaused] = useState(false);
  const [leaving, setLeaving] = useState(false);

  
  useEffect(() => {
    if (paused || leaving) return undefined;
    const timer = setTimeout(() => setLeaving(true), duration);
    return () => clearTimeout(timer);
  }, [paused, leaving, duration]);

 
  useEffect(() => {
    if (!leaving) return undefined;
    const timer = setTimeout(() => onClose(id), 250);
    return () => clearTimeout(timer);
  }, [leaving, id, onClose]);

  return (
    <div
      className={`toast toast--${type} ${leaving ? 'toast--leaving' : ''}`}
    
      role={type === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="toast__icon" aria-hidden="true">{ICONS[type]}</span>
      <div className="toast__body">
        <p className="toast__title">{title || DEFAULT_TITLES[type]}</p>
        <p className="toast__message">{message}</p>
      </div>
      <button
        type="button"
        className="toast__close"
        aria-label="Fechar notificação"
        onClick={() => setLeaving(true)}
      >
        ×
      </button>
      <span
        className="toast__timer"
        aria-hidden="true"
        style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? 'paused' : 'running' }}
      />
    </div>
  );
}
