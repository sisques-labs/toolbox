import { useEffect, useState } from 'react';
import {
  GenerateRsaKeypairUseCase,
  type RsaKeypair,
} from '@/core/toolbox/application/use-cases/generate-rsa-keypair/generate-rsa-keypair.use-case';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateRsaKeypairUseCase();
const MODULUS_LENGTHS: (2048 | 4096)[] = [2048, 4096];

function KeyBlock({
  testId,
  label,
  value,
  copyLabel,
  onCopy,
}: {
  testId: string;
  label: string;
  value: string;
  copyLabel: string;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <Button variant="ghost" size="sm" onClick={onCopy} disabled={!value}>
          {copyLabel}
        </Button>
      </div>
      <pre
        data-testid={testId}
        className="max-h-40 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs whitespace-pre-wrap break-all text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {value}
      </pre>
    </div>
  );
}

export function RsaKeypairPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [modulusLength, setModulusLength] = useState<2048 | 4096>(2048);
  const [keypair, setKeypair] = useState<RsaKeypair | null>(null);

  function regenerate(length: 2048 | 4096) {
    setKeypair(null);
    useCase.execute(length).then(setKeypair);
  }

  useEffect(() => {
    regenerate(modulusLength);
  }, [modulusLength]);

  return (
    <ToolPanelFrame>
      <SelectField
        label={t.fields.modulusLength}
        value={String(modulusLength)}
        onChange={(e) =>
          setModulusLength(Number(e.target.value) as 2048 | 4096)
        }
        options={MODULUS_LENGTHS.map((l) => ({
          value: String(l),
          label: String(l),
        }))}
      />
      <Button variant="secondary" onClick={() => regenerate(modulusLength)}>
        {t.actions.generate}
      </Button>
      <KeyBlock
        testId="rsa-public-key"
        label={t.labels.publicKey}
        value={keypair?.publicKeyPem ?? t.labels.generating}
        copyLabel={t.actions.copy}
        onCopy={() =>
          keypair && onCopy(keypair.publicKeyPem, t.labels.publicKey)
        }
      />
      <KeyBlock
        testId="rsa-private-key"
        label={t.labels.privateKey}
        value={keypair?.privateKeyPem ?? t.labels.generating}
        copyLabel={t.actions.copy}
        onCopy={() =>
          keypair && onCopy(keypair.privateKeyPem, t.labels.privateKey)
        }
      />
    </ToolPanelFrame>
  );
}
