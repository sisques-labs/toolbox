import { ThemeToggle } from '@/shared/presentation/components/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '@/shared/presentation/components/language-switcher/language-switcher';
import type { Locale } from '@/shared/presentation/i18n/locale';

export function ToolHeader({
  title,
  description,
  locale,
  onLocaleChange,
  theme,
  onToggleTheme,
  themeLabels,
  languageLabel,
}: {
  title: string;
  description: string;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  themeLabels: { switchToLight: string; switchToDark: string };
  languageLabel: string;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-5 border-b border-slate-200 bg-white px-8 py-5 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <LanguageSwitcher
          locale={locale}
          onChange={onLocaleChange}
          label={languageLabel}
        />
        <ThemeToggle
          theme={theme}
          onToggle={onToggleTheme}
          labels={themeLabels}
        />
      </div>
    </div>
  );
}
