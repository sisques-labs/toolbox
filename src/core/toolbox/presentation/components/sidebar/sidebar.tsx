import type { ChangeEvent } from 'react';
import type { ToolId } from '@/core/toolbox/domain/tool.types';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';
import { ToolIcon } from '@/core/toolbox/presentation/components/tool-icon/tool-icon';
import { TOOL_CATALOG } from './sidebar.catalog';

export function Sidebar({
  t,
  brand,
  search,
  onSearchChange,
  activeTool,
  onSelectTool,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  brand: string;
  search: string;
  onSearchChange: (value: string) => void;
  activeTool: ToolId;
  onSelectTool: (id: ToolId) => void;
}) {
  const query = search.trim().toLowerCase();
  const categories = TOOL_CATALOG.map(({ category, tools }) => ({
    category,
    tools: tools.filter((id) =>
      query ? t.tools[id].label.toLowerCase().includes(query) : true,
    ),
  })).filter(({ tools }) => tools.length > 0);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <nav className="flex h-full w-[248px] shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2.5 px-[18px] pb-4 pt-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-base font-extrabold text-white">
          T
        </div>
        <div className="text-base font-bold text-slate-900 dark:text-slate-50">
          {brand}
        </div>
      </div>
      <div className="px-3.5 pb-3.5">
        <input
          value={search}
          onChange={handleSearchChange}
          placeholder={t.search.placeholder}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 font-sans text-[13px] text-slate-900 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-2.5 pb-3">
        {categories.map(({ category, tools }) => (
          <div key={category}>
            <div className="px-2 pb-1 pt-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t.categories[category]}
            </div>
            {tools.map((id) => {
              const active = id === activeTool;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectTool(id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <ToolIcon id={id} />
                  <span>{t.tools[id].label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
