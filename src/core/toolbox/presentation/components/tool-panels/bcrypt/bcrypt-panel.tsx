import { useEffect, useState } from 'react';
import { HashBcryptUseCase } from '@/core/toolbox/application/use-cases/hash-bcrypt/hash-bcrypt.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Badge } from '@/shared/presentation/components/badge/badge';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new HashBcryptUseCase();

export function BcryptPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [text, setText] = useState('password123');
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState(() => useCase.hash(text, rounds));

  useEffect(() => {
    setHash(useCase.hash(text, rounds));
  }, [text, rounds]);

  const [hashToVerify, setHashToVerify] = useState('');
  const [textToVerify, setTextToVerify] = useState('');
  const hasVerification = hashToVerify.trim().length > 0;
  const matches =
    hasVerification && useCase.compare(textToVerify, hashToVerify);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.inputText}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextField
        label={t.fields.bcryptRounds}
        type="number"
        value={rounds}
        onChange={(e) => {
          const next = Math.max(4, Math.min(14, Number(e.target.value) || 4));
          setRounds(next);
        }}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="bcrypt-hash"
          className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
        >
          {hash}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(hash, t.tools.bcrypt.label)}
        >
          {t.actions.copy}
        </Button>
      </div>

      <TextField
        label={t.fields.bcryptHash}
        value={hashToVerify}
        onChange={(e) => setHashToVerify(e.target.value)}
      />
      <TextField
        label={t.fields.bcryptPlainText}
        value={textToVerify}
        onChange={(e) => setTextToVerify(e.target.value)}
      />
      {hasVerification && (
        <div>
          <Badge tone={matches ? 'success' : 'danger'}>
            {matches ? t.labels.bcryptMatch : t.labels.bcryptNoMatch}
          </Badge>
        </div>
      )}
    </ToolPanelFrame>
  );
}
