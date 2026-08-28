import { useState } from 'react';
import {
  ConvertJsonCsvUseCase,
  type JsonCsvDirection,
} from '@/core/toolbox/application/use-cases/convert-json-csv/convert-json-csv.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { DownloadButton } from '@/shared/presentation/components/download-button/download-button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertJsonCsvUseCase();
const DEFAULT_INPUT = '[{"name":"Ana","age":30},{"name":"Bob","age":25}]';

export function JsonCsvPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [direction, setDirection] = useState<JsonCsvDirection>('jsonToCsv');
  const result = useCase.execute(input, direction);
  const errorMessage =
    direction === 'jsonToCsv'
      ? t.errors.invalidJsonArrayForCsv
      : t.errors.invalidCsvForJson;

  return (
    <ToolPanelFrame>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={direction === 'jsonToCsv' ? 'primary' : 'secondary'}
          onClick={() => setDirection('jsonToCsv')}
        >
          JSON → CSV
        </Button>
        <Button
          size="sm"
          variant={direction === 'csvToJson' ? 'primary' : 'secondary'}
          onClick={() => setDirection('csvToJson')}
        >
          CSV → JSON
        </Button>
      </div>
      <TextareaField
        label={
          direction === 'jsonToCsv' ? t.fields.jsonInput : t.fields.csvInput
        }
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {result.ok ? (
        <div className="relative">
          <pre className="min-h-[60px] whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100">
            {result.output}
          </pre>
          <div className="absolute right-2.5 top-2.5 flex gap-1.5">
            <DownloadButton
              content={result.output!}
              baseName="data"
              extension={direction === 'jsonToCsv' ? 'csv' : 'json'}
              mimeType={
                direction === 'jsonToCsv' ? 'text/csv' : 'application/json'
              }
              label={t.actions.download}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(result.output!, 'Output')}
            >
              {t.actions.copy}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </ToolPanelFrame>
  );
}
