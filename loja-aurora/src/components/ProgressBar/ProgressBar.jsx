import './ProgressBar.css';

export default function ProgressBar({ value, label, showValue = true, status = 'default' }) {
 
  const safeValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={`progress progress--${status}`}>
      {(label || showValue) && (
        <div className="progress__header">
          {label && <span className="progress__label">{label}</span>}
          {showValue && <span className="progress__value">{safeValue}%</span>}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label || 'Progresso'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div className="progress__fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
