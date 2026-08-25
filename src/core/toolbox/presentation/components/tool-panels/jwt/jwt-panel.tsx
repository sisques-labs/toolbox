import { useState } from 'react';
import { DecodeJwtUseCase } from '@/core/toolbox/application/use-cases/decode-jwt/decode-jwt.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new DecodeJwtUseCase();
const DEFAULT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export function JwtPanel({ t }: { t: WidenStringLiterals<ToolboxDict> }) {
  const [token, setToken] = useState(DEFAULT_TOKEN);
  const result = useCase.execute(token);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.jwtToken}
        rows={4}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      {result.ok ? (
        <div className="flex flex-col gap-3.5">
          <div>
            <div className="mb-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              {t.labels.header}
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100">
              {result.header}
            </pre>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              {t.labels.payload}
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100">
              {result.payload}
            </pre>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              {t.labels.signature}
            </div>
            <div className="break-all rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              {result.signature}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-red-50 p-3.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {result.error}
        </div>
      )}
    </ToolPanelFrame>
  );
}
