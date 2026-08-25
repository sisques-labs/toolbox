import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/presentation/providers/theme.provider';
import { LocaleProvider } from '@/shared/presentation/providers/locale.provider';
import type { Locale } from '@/shared/presentation/i18n/locale';

export function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
