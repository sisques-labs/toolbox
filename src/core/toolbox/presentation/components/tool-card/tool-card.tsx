import { ToolId } from '@/core/toolbox/domain/tool.types';
import { ToolIcon } from '@/core/toolbox/presentation/components/tool-icon/tool-icon';

export function ToolCard({
  id,
  label,
  description,
  onSelect,
}: {
  id: ToolId;
  label: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <ToolIcon id={id} className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        {label}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-300">
        {description}
      </p>
    </button>
  );
}
