import { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const ORDERS = [
  { id: '#10482', date: '2026-10-28', total: 249.9, status: 'delivered' },
  { id: '#10397', date: '2026-10-15', total: 89.9, status: 'inTransit' },
  { id: '#10211', date: '2026-10-02', total: 1120, status: 'delivered' },
];

export default function Perfil() {
  const { showToast } = useToast();
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ nome: 'Ana Souza', email: 'ana.souza@exemplo.com', cidade: 'Salvador' });
  const [notifications, setNotifications] = useState(true);

  const filled = Object.values(form).filter((value) => value.trim() !== '').length;
  const completion = (filled / Object.keys(form).length) * 100;

  const formatDate = (iso) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(language);
  const formatMoney = (value) =>
    value.toLocaleString(language, { style: 'currency', currency: 'BRL', currencyDisplay: 'narrowSymbol' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.email.includes('@')) {
      showToast({ type: 'error', message: t('profile.invalidEmail') });
      return;
    }
    showToast({ type: 'success', message: t('profile.saved') });
  }

  const tabs = [
    {
      id: 'dados',
      label: t('profile.tabData'),
      content: (
        <form className="form" onSubmit={handleSubmit}>
          <ProgressBar value={completion} label={t('profile.completion')} status={completion === 100 ? 'success' : 'default'} />
          <div className="form__grid">
            <label>{t('profile.name')}<input name="nome" value={form.nome} onChange={handleChange} /></label>
            <label>{t('profile.email')}<input name="email" type="email" value={form.email} onChange={handleChange} /></label>
            <label>{t('profile.city')}<input name="cidade" value={form.cidade} onChange={handleChange} /></label>
          </div>
          <button type="submit" className="btn btn--primary">{t('profile.save')}</button>
        </form>
      ),
    },
    {
      id: 'pedidos',
      label: t('profile.tabOrders'),
      content: (
        <div className="table-wrapper">
          <table className="table">
            <caption className="sr-only">{t('profile.ordersCaption')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('profile.colOrder')}</th>
                <th scope="col">{t('profile.colDate')}</th>
                <th scope="col">{t('profile.colTotal')}</th>
                <th scope="col">{t('profile.colStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>{formatMoney(order.total)}</td>
                  <td>
                    <span className={`tag ${order.status === 'delivered' ? 'tag--success' : ''}`}>
                      {t(`profile.${order.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'config',
      label: t('profile.tabSettings'),
      content: (
        <div className="stack">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => {
                setNotifications(e.target.checked);
                showToast({ type: 'info', message: e.target.checked ? t('profile.notifOn') : t('profile.notifOff') });
              }}
            />
            {t('profile.newsletter')}
          </label>
          <p className="muted">{t('profile.autoSave')}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <header className="page-header">
        <h1>{t('profile.title')}</h1>
        <p className="muted">{t('profile.hello', { name: form.nome || t('profile.visitor') })}</p>
      </header>
      <Tabs tabs={tabs} ariaLabel={t('profile.tabsLabel')} />
    </>
  );
}
