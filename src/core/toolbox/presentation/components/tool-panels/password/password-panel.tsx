import { useEffect, useState } from 'react';
import { GeneratePasswordUseCase } from '@/core/toolbox/application/use-cases/generate-password/generate-password.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { Button } from '@/shared/presentation/components/button/button';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GeneratePasswordUseCase();

const STRENGTH_TONE = {
  weak: 'danger',
  fair: 'warning',
  strong: 'primary',
  veryStrong: 'success',
} as const;

export function PasswordPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const options = { length, uppercase, lowercase, numbers, symbols };
  const [password, setPassword] = useState(() => useCase.execute(options));

  useEffect(() => {
    setPassword(useCase.execute(options));
  }, [length, uppercase, lowercase, numbers, symbols]);

  const strength = useCase.strength(options);

  return (
    <ToolPanelFrame>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="password-value"
          className="break-all font-mono text-lg text-slate-900 dark:text-slate-100"
        >
          {password}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(password, 'Password')}
        >
          {t.actions.copy}
        </Button>
      </div>
      <div>
        <Badge tone={STRENGTH_TONE[strength]}>{t.strength[strength]}</Badge>
      </div>
      <div className="flex items-center gap-3.5">
        <div className="flex-1">
          <TextField
            label={t.fields.length}
            type="number"
            value={length}
            onChange={(e) => {
              const next = Math.max(
                4,
                Math.min(64, Number(e.target.value) || 4),
              );
              setLength(next);
            }}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => setPassword(useCase.execute(options))}
        >
          {t.actions.generate}
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <CheckboxField
          label={t.fields.uppercase}
          checked={uppercase}
          onChange={() => setUppercase((v) => !v)}
        />
        <CheckboxField
          label={t.fields.lowercase}
          checked={lowercase}
          onChange={() => setLowercase((v) => !v)}
        />
        <CheckboxField
          label={t.fields.numbers}
          checked={numbers}
          onChange={() => setNumbers((v) => !v)}
        />
        <CheckboxField
          label={t.fields.symbols}
          checked={symbols}
          onChange={() => setSymbols((v) => !v)}
        />
      </div>
    </ToolPanelFrame>
  );
}
