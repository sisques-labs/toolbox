import { useEffect, useState } from 'react';
import {
  GenerateTotpUseCase,
  type TotpResult,
} from '@/core/toolbox/application/use-cases/generate-totp/generate-totp.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateTotpUseCase();

export function TotpPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [secret, setSecret] = useState('JBSWY3DPEHPK3PXP');
  const [result, setResult] = useState<TotpResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const next = await useCase.execute({ secret });
      if (!cancelled) setResult(next);
    };

    void refresh();
    const timer = setInterval(() => {
      void refresh();
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [secret]);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.totpSecret}
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      {!result || !result.ok ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidTotpSecret}
        </p>
      ) : (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center dark:border-slate-800 dark:bg-slate-800/50">
            <p className="font-mono text-4xl tracking-[0.3em] text-slate-900 dark:text-slate-100">
              {result.code}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {t.labels.totpRemaining.replace(
                '{seconds}',
                String(result.remainingSeconds),
              )}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCopy(result.code, 'TOTP')}
          >
            {t.actions.copy}
          </Button>
        </>
      )}
    </ToolPanelFrame>
  );
}
