import { useEffect, useState } from 'react';
import { GenerateBip39MnemonicUseCase } from '@/core/toolbox/application/use-cases/generate-bip39-mnemonic/generate-bip39-mnemonic.use-case';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateBip39MnemonicUseCase();
const STRENGTHS = [128, 160, 192, 224, 256];

export function Bip39Panel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [strength, setStrength] = useState(128);
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    useCase.generateRandomMnemonic(strength).then(setMnemonic);
  }, [strength]);

  const [toValidate, setToValidate] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!toValidate.trim()) {
      setIsValid(null);
      return;
    }
    let cancelled = false;
    useCase.validateMnemonic(toValidate).then((result) => {
      if (!cancelled) setIsValid(result);
    });
    return () => {
      cancelled = true;
    };
  }, [toValidate]);

  return (
    <ToolPanelFrame>
      <SelectField
        label={t.fields.bip39Strength}
        value={String(strength)}
        onChange={(e) => setStrength(Number(e.target.value))}
        options={STRENGTHS.map((s) => ({ value: String(s), label: String(s) }))}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="bip39-mnemonic"
          className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
        >
          {mnemonic}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(mnemonic, t.tools.bip39.label)}
        >
          {t.actions.copy}
        </Button>
      </div>
      <Button
        variant="secondary"
        onClick={() =>
          useCase.generateRandomMnemonic(strength).then(setMnemonic)
        }
      >
        {t.actions.generate}
      </Button>

      <TextareaField
        label={t.fields.bip39MnemonicToValidate}
        value={toValidate}
        onChange={(e) => setToValidate(e.target.value)}
      />
      {isValid !== null && (
        <div>
          <Badge tone={isValid ? 'success' : 'danger'}>
            {isValid ? t.labels.valid : t.labels.invalid}
          </Badge>
        </div>
      )}
    </ToolPanelFrame>
  );
}
