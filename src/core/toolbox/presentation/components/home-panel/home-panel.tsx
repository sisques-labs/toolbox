import type { ToolId } from '@/core/toolbox/domain/tool.types';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';
import { ToolCard } from '@/core/toolbox/presentation/components/tool-card/tool-card';
import { TOOL_CATALOG } from '@/core/toolbox/presentation/components/sidebar/sidebar.catalog';

export function HomePanel({
  t,
  onSelectTool,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onSelectTool: (id: ToolId) => void;
}) {
  return (
    <div className="flex flex-col gap-8 p-5">
      {TOOL_CATALOG.map(({ category, tools }) => (
        <div key={category} className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            {t.categories[category]}
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((id) => (
              <ToolCard
                key={id}
                id={id}
                label={t.tools[id].label}
                description={t.tools[id].description}
                onSelect={() => onSelectTool(id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
