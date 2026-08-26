import { useState } from 'react';
import { ConvertDockerRunUseCase } from '@/core/toolbox/application/use-cases/convert-docker-run/convert-docker-run.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertDockerRunUseCase();
const DEFAULT_INPUT =
  'docker run -d --name web -p 8080:80 -e NODE_ENV=production nginx:latest';

export function DockerComposePanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.dockerRunInput}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <>
          <pre
            data-testid="docker-compose-output"
            className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
          >
            {result.compose}
          </pre>
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onCopy(result.compose!, t.tools['docker-compose'].label)
              }
            >
              {t.actions.copy}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidDockerRun}
        </p>
      )}
    </ToolPanelFrame>
  );
}
