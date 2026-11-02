import { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useToast } from '../context/ToastContext';

const ORDERS = [
  { id: '#10482', date: '28/10/2026', total: 'R$ 249,90', status: 'Entregue' },
  { id: '#10397', date: '15/10/2026', total: 'R$ 89,90', status: 'Em trânsito' },
  { id: '#10211', date: '02/10/2026', total: 'R$ 1.120,00', status: 'Entregue' },
];

export default function Perfil() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ nome: 'Ana Souza', email: 'ana.souza@exemplo.com', cidade: 'Salvador' });
  const [notifications, setNotifications] = useState(true);


  const filled = Object.values(form).filter((value) => value.trim() !== '').length;
  const completion = (filled / Object.keys(form).length) * 100;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.email.includes('@')) {
      showToast({ type: 'error', message: 'Informe um e-mail válido.' });
      return;
    }
    showToast({ type: 'success', message: 'Dados pessoais salvos.' });
  }

  const tabs = [
    {
      id: 'dados',
      label: 'Dados pessoais',
      content: (
        <form className="form" onSubmit={handleSubmit}>
          <ProgressBar value={completion} label="Perfil completo" status={completion === 100 ? 'success' : 'default'} />
          <div className="form__grid">
            <label>Nome<input name="nome" value={form.nome} onChange={handleChange} /></label>
            <label>E-mail<input name="email" type="email" value={form.email} onChange={handleChange} /></label>
            <label>Cidade<input name="cidade" value={form.cidade} onChange={handleChange} /></label>
          </div>
          <button type="submit" className="btn btn--primary">Salvar</button>
        </form>
      ),
    },
    {
      id: 'pedidos',
      label: 'Pedidos',
      content: (
        <div className="table-wrapper">
          <table className="table">
            <caption className="sr-only">Últimos pedidos</caption>
            <thead>
              <tr><th scope="col">Pedido</th><th scope="col">Data</th><th scope="col">Total</th><th scope="col">Status</th></tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td><td>{order.date}</td><td>{order.total}</td>
                  <td><span className={`tag ${order.status === 'Entregue' ? 'tag--success' : ''}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'config',
      label: 'Configurações',
      content: (
        <div className="stack">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => {
                setNotifications(e.target.checked);
                showToast({ type: 'info', message: e.target.checked ? 'Notificações por e-mail ativadas.' : 'Notificações por e-mail desativadas.' });
              }}
            />
            Receber ofertas por e-mail
          </label>
          <p className="muted">As preferências são salvas automaticamente.</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <header className="page-header">
        <h1>Meu perfil</h1>
        <p className="muted">Olá, {form.nome || 'visitante'}!</p>
      </header>
      <Tabs tabs={tabs} ariaLabel="Seções do perfil" />
    </>
  );
}
