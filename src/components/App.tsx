import { useEffect, useState } from 'react';
import { locales, defaultLocale } from '../lib/i18n';
import type { Locale } from '../lib/i18n';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const LOCALE_STORAGE_KEY = 'toolbox:locale';
const THEME_STORAGE_KEY = 'toolbox:theme';

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

export default function App() {
  // Both default to the server-rendered values so the first client render
  // matches the SSR output exactly; the real preference (storage, browser
  // language, prefers-color-scheme) is applied right after mount instead
  // of during the initial render, which would desync from the server HTML
  // and break hydration.
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const t = locales[locale];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale === 'es' || storedLocale === 'en') {
      setLocale(storedLocale);
    } else if (window.navigator.language.toLowerCase().startsWith('en')) {
      setLocale('en');
    }

    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
          <ThemeToggle
            theme={theme}
            onToggle={() =>
              setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
            }
            t={t}
          />
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          {t.tools.heading}
        </h2>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
          {t.tools.empty}
        </div>
      </section>
    </div>
  );
}
