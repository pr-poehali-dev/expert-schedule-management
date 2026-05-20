import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { UserRole, ADMIN_EMAIL } from '@/types';

interface Props {
  onLogin: (name: string, email: string, role: UserRole) => Promise<void>;
}

const ROLES: { role: UserRole; label: string; icon: string; desc: string }[] = [
  { role: 'manager', label: 'Менеджер', icon: 'ClipboardList', desc: 'Запись клиентов' },
  { role: 'expert', label: 'Эксперт', icon: 'Target', desc: 'Управление слотами' },
];

export default function AuthPanel({ onLogin }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = email === ADMIN_EMAIL;
  const roles = isAdmin
    ? [...ROLES, { role: 'admin' as UserRole, label: 'Администратор', icon: 'Crown', desc: 'Полный доступ' }]
    : ROLES;

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Введите имя и email');
      return;
    }
    if (selectedRole === 'admin' && email !== ADMIN_EMAIL) {
      setError('Роль Администратора доступна только для studiotsoy@gmail.com');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onLogin(name.trim(), email.trim(), selectedRole);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center">
              <Icon name="CalendarDays" size={24} className="text-slate-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text leading-tight">
            Расписание экспертов
          </h1>
          <p className="text-slate-400 mt-2 text-sm">АСМ — система управления</p>
        </div>

        <div className="glass-card p-6">
          {/* Role selector */}
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">Выберите роль</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === r.role
                    ? 'bg-teal-400/15 border-teal-400/50 text-teal-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/8'
                }`}
              >
                <Icon name={r.icon as 'Home'} size={18} className="mb-1" />
                <div className="font-semibold text-sm">{r.label}</div>
                <div className="text-xs opacity-60">{r.desc}</div>
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-3 mb-5">
            <input
              className="form-input w-full"
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <input
              type="email"
              className="form-input w-full"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {email === ADMIN_EMAIL && (
            <div className="text-xs text-amber-400 mb-3 flex items-center gap-1">
              <Icon name="Crown" size={12} />
              Доступна роль Администратора
            </div>
          )}

          {error && (
            <div className="text-xs text-red-400 mb-3 bg-red-500/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            className="btn-primary w-full py-3 text-base"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Входим...' : 'Зарегистрироваться / Войти'}
          </button>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Разработано{' '}
          <a href="https://t.me/StudioTSV" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-teal-400 transition-colors">
            STUDIO TSOY
          </a>
        </p>
      </div>
    </div>
  );
}
