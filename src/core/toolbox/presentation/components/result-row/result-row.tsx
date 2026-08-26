import { Button } from '@/shared/presentation/components/button/button';

export function ResultRow({
  label,
  value,
  onCopy,
  copyLabel,
}: {
  label?: string;
  value: string;
  onCopy?: () => void;
  copyLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
      <div className="min-w-0">
        {label && (
          <div className="mb-0.5 text-[11px] font-semibold text-slate-400 dark:text-slate-400">
            {label}
          </div>
        )}
        <div className="break-all font-mono text-sm text-slate-900 dark:text-slate-100">
          {value}
        </div>
      </div>
      {onCopy && (
        <Button variant="ghost" size="sm" onClick={onCopy}>
          {copyLabel}
        </Button>
      )}
    </div>
  );
}
