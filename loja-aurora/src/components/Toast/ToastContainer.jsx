import { useToast } from '../../context/ToastContext';
import Toast from './Toast';
import './Toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <section className="toast-container" aria-label="Notificações">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </section>
  );
}
