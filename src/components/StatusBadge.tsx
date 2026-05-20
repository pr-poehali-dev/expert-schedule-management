import { STATUS_LABELS, STATUS_COLORS } from '@/types';

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const label = STATUS_LABELS[status] || status;
  const color = STATUS_COLORS[status] || 'bg-slate-500 text-white';
  return (
    <span className={`status-badge ${color}`}>{label}</span>
  );
}
