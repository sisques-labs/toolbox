import type { Locale } from '../lib/i18n';

const options: { value: Locale; label: string }[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
];

export default function LanguageSwitcher({
  locale,
  onChange,
  label,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex h-9 shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-white px-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={locale === option.value}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === option.value
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
