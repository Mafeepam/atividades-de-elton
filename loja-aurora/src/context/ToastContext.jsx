import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);


  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);


  const showToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = nextId++;
    setToasts((current) => [...current, { id, type, title, message, duration }]);
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>');
  }
  return context;
}
