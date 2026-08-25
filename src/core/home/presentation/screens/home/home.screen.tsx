import { Providers } from '@/shared/presentation/providers/providers';
import { AppShell } from '@/shared/presentation/components/app-shell/app-shell';
import { useLocale } from '@/shared/presentation/providers/locale.provider';
import enHome, { type HomeDict } from '@/core/home/presentation/i18n/en';
import esHome from '@/core/home/presentation/i18n/es';
import type { Locale } from '@/shared/presentation/i18n/locale';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const homeDictionaries: Record<Locale, WidenStringLiterals<HomeDict>> = {
  en: enHome,
  es: esHome,
};

function HomeScreenContent() {
  const { locale } = useLocale();
  const t = homeDictionaries[locale];

  return (
    <AppShell>
      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          {t.tools.heading}
        </h2>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
          {t.tools.empty}
        </div>
      </section>
    </AppShell>
  );
}

export function HomeScreen() {
  return (
    <Providers>
      <HomeScreenContent />
    </Providers>
  );
}
