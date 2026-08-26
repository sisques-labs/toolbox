import { useState } from 'react';
import { GenerateBasicAuthUseCase } from '@/core/toolbox/application/use-cases/generate-basic-auth/generate-basic-auth.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateBasicAuthUseCase();

export function BasicAuthPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [username, setUsername] = useState('Aladdin');
  const [password, setPassword] = useState('open sesame');
  const header = useCase.encode(username, password);

  const [headerToDecode, setHeaderToDecode] = useState('');
  const decoded = headerToDecode.trim() ? useCase.decode(headerToDecode) : null;

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.basicAuthUsername}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label={t.fields.basicAuthPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50">
        <div
          data-testid="basic-auth-header"
          className="break-all font-mono text-sm text-slate-900 dark:text-slate-100"
        >
          {header}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(header, t.tools['basic-auth'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>

      <TextField
        label={t.fields.basicAuthHeader}
        value={headerToDecode}
        onChange={(e) => setHeaderToDecode(e.target.value)}
      />
      {decoded &&
        (decoded.ok ? (
          <div className="flex flex-col gap-2">
            <ResultRow label={t.labels.username} value={decoded.username!} />
            <ResultRow label={t.labels.password} value={decoded.password!} />
          </div>
        ) : (
          <p className="text-sm text-red-600 dark:text-red-400">
            {t.errors.invalidBasicAuth}
          </p>
        ))}
    </ToolPanelFrame>
  );
}
