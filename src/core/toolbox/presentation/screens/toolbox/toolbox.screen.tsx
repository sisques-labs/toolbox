import { useRef, useState } from 'react';
import { Providers } from '@/shared/presentation/providers/providers';
import { useLocale } from '@/shared/presentation/providers/locale.provider';
import { useTheme } from '@/shared/presentation/providers/theme.provider';
import enShell, { type ShellDict } from '@/shared/presentation/i18n/shell/en';
import esShell from '@/shared/presentation/i18n/shell/es';
import enToolbox, {
  type ToolboxDict,
} from '@/core/toolbox/presentation/i18n/en';
import esToolbox from '@/core/toolbox/presentation/i18n/es';
import type { Locale } from '@/shared/presentation/i18n/locale';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';
import { ToolId } from '@/core/toolbox/domain/tool.types';
import { Sidebar } from '@/core/toolbox/presentation/components/sidebar/sidebar';
import { ToolHeader } from '@/core/toolbox/presentation/components/tool-header/tool-header';
import { Toast } from '@/core/toolbox/presentation/components/toast/toast';
import { ActiveToolPanel } from '@/core/toolbox/presentation/components/active-tool-panel/active-tool-panel';

const shellDictionaries: Record<Locale, WidenStringLiterals<ShellDict>> = {
  en: enShell,
  es: esShell,
};
const toolboxDictionaries: Record<Locale, WidenStringLiterals<ToolboxDict>> = {
  en: enToolbox,
  es: esToolbox,
};

const TOAST_DURATION_MS = 1500;

function ToolboxScreenContent() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const shellT = shellDictionaries[locale];
  const t = toolboxDictionaries[locale];

  const [activeTool, setActiveTool] = useState<ToolId>(ToolId.Case);
  const [search, setSearch] = useState('');
  const [toastText, setToastText] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setToastText(label + t.copiedSuffix);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastText(''), TOAST_DURATION_MS);
  }

  const activeMeta = t.tools[activeTool];

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-900">
      <Sidebar
        t={t}
        brand={shellT.heading}
        search={search}
        onSearchChange={setSearch}
        activeTool={activeTool}
        onSelectTool={setActiveTool}
      />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <ToolHeader
          title={activeMeta.label}
          description={activeMeta.description}
          locale={locale}
          onLocaleChange={setLocale}
          theme={theme}
          onToggleTheme={toggleTheme}
          themeLabels={shellT.theme}
          languageLabel={shellT.language.switcherLabel}
        />
        <div className="flex-1 overflow-y-auto">
          <ActiveToolPanel activeTool={activeTool} t={t} onCopy={handleCopy} />
        </div>
      </div>
      <Toast text={toastText} />
    </div>
  );
}

export function ToolboxScreen({
  initialLocale,
}: { initialLocale?: Locale } = {}) {
  return (
    <Providers initialLocale={initialLocale}>
      <ToolboxScreenContent />
    </Providers>
  );
}
