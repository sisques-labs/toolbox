import type { ReactNode } from 'react';

type BadgeTone = 'danger' | 'warning' | 'primary' | 'success';

const TONE_CLASSES: Record<BadgeTone, string> = {
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  warning:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  primary: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  success:
    'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
};

export function Badge({
  tone,
  children,
}: {
  tone: BadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
