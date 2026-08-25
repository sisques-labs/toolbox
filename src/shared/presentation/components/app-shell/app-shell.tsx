import type { ReactNode } from 'react';
import { useLocale } from '@/shared/presentation/providers/locale.provider';
import { useTheme } from '@/shared/presentation/providers/theme.provider';
import { ThemeToggle } from '@/shared/presentation/components/theme-toggle/theme-toggle';
import { LanguageSwitcher } from '@/shared/presentation/components/language-switcher/language-switcher';
import enShell, { type ShellDict } from '@/shared/presentation/i18n/shell/en';
import esShell from '@/shared/presentation/i18n/shell/es';
import type { Locale } from '@/shared/presentation/i18n/locale';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const shellDictionaries: Record<Locale, WidenStringLiterals<ShellDict>> = {
  en: enShell,
  es: esShell,
};

function LogoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a3 3 0 0 0-4.24 4.24L3 18v3h3l7.46-7.46a3 3 0 0 0 4.24-4.24l-2.12 2.12-2-2 2.12-2.12Z" />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const t = shellDictionaries[locale];

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20">
            <LogoIcon />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {t.heading}
            </h1>
            <p className="mt-1 max-w-xl text-slate-600 dark:text-slate-400">
              {t.tagline}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher
            locale={locale}
            onChange={setLocale}
            label={t.language.switcherLabel}
          />
          <ThemeToggle theme={theme} onToggle={toggleTheme} labels={t.theme} />
        </div>
      </header>
      {children}
    </div>
  );
}
