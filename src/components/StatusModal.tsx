import { useState } from 'react';
import { STATUS_LABELS } from '@/types';

interface Props {
  status: string;
  onConfirm: (comment: string) => void;
  onCancel: () => void;
}

export default function StatusModal({ status, onConfirm, onCancel }: Props) {
  const [comment, setComment] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="animate-fade-in bg-slate-800 border border-slate-600 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-1">Комментарий к статусу</h3>
        <p className="text-slate-400 text-sm mb-4">
          Вы меняете статус на:{' '}
          <strong className="text-teal-400">{STATUS_LABELS[status] || status}</strong>
        </p>
        <textarea
          className="form-input w-full resize-y min-h-[80px] mb-4"
          placeholder="Введите комментарий..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex gap-3 justify-end">
          <button className="btn-primary btn-secondary" onClick={onCancel}>Отмена</button>
          <button className="btn-primary btn-success" onClick={() => onConfirm(comment)}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}
