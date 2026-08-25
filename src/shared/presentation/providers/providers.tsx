import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/presentation/providers/theme.provider';
import { LocaleProvider } from '@/shared/presentation/providers/locale.provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
