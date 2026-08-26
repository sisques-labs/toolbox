import { useEffect, useState } from 'react';
import {
  GenerateHmacUseCase,
  type HmacAlgorithm,
} from '@/core/toolbox/application/use-cases/generate-hmac/generate-hmac.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateHmacUseCase();
const ALGORITHMS: HmacAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-512'];

export function HmacPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [message, setMessage] = useState('The quick brown fox');
  const [secret, setSecret] = useState('super-secret-key');
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>('SHA-256');
  const [result, setResult] = useState('');

  useEffect(() => {
    let cancelled = false;
    useCase.execute(message, secret, algorithm).then((mac) => {
      if (!cancelled) setResult(mac);
    });
    return () => {
      cancelled = true;
    };
  }, [message, secret, algorithm]);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.inputText}
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TextField
        label={t.fields.hmacSecret}
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <SelectField
        label={t.fields.algorithm}
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as HmacAlgorithm)}
        options={ALGORITHMS.map((a) => ({ value: a, label: a }))}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="hmac-result"
          className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
        >
          {result}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(result, t.tools.hmac.label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
