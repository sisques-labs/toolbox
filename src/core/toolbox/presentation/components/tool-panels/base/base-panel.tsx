import { useState } from 'react';
import { ConvertBaseUseCase } from '@/core/toolbox/application/use-cases/convert-base/convert-base.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertBaseUseCase();

export function BasePanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState('10');
  const result = useCase.execute(input, Number(fromBase));

  return (
    <ToolPanelFrame>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={t.fields.numberInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SelectField
          label={t.fields.fromBase}
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          options={[
            { value: '2', label: t.labels.base2 },
            { value: '8', label: t.labels.base8 },
            { value: '10', label: t.labels.base10 },
            { value: '16', label: t.labels.base16 },
          ]}
        />
      </div>
      {result.ok ? (
        <div className="flex flex-col gap-2">
          <ResultRow
            label={t.labels.decimal}
            value={result.decimal}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.decimal, t.labels.decimal)}
          />
          <ResultRow
            label={t.labels.binary}
            value={result.binary}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.binary, t.labels.binary)}
          />
          <ResultRow
            label={t.labels.octal}
            value={result.octal}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.octal, t.labels.octal)}
          />
          <ResultRow
            label={t.labels.hex}
            value={result.hex}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.hex, t.labels.hex)}
          />
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidBaseNumber}
        </p>
      )}
    </ToolPanelFrame>
  );
}
