import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import Toast from './Toast';
import './Toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const { t } = useLanguage();

  return (
    <section className="toast-container" aria-label={t('toast.region')}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </section>
  );
}
