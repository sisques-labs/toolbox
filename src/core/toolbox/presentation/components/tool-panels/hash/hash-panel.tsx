import { useEffect, useState } from 'react';
import {
  GenerateHashUseCase,
  type HashResult,
} from '@/core/toolbox/application/use-cases/generate-hash/generate-hash.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateHashUseCase();
const EMPTY: HashResult = { md5: '', sha1: '', sha256: '', sha512: '' };

export function HashPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('Toolbox');
  const [hashes, setHashes] = useState<HashResult>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    useCase.execute(input).then((result) => {
      if (!cancelled) setHashes(result);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  const rows: { label: string; value: string }[] = [
    { label: 'MD5', value: hashes.md5 },
    { label: 'SHA-1', value: hashes.sha1 },
    { label: 'SHA-256', value: hashes.sha256 },
    { label: 'SHA-512', value: hashes.sha512 },
  ];

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.inputText}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <ResultRow
            key={row.label}
            label={row.label}
            value={row.value || '…'}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(row.value, row.label)}
          />
        ))}
      </div>
    </ToolPanelFrame>
  );
}
