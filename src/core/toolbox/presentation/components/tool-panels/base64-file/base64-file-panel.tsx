import { useState, type ChangeEvent } from 'react';
import { ConvertBase64FileUseCase } from '@/core/toolbox/application/use-cases/convert-base64-file/convert-base64-file.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertBase64FileUseCase();

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Base64FilePanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [base64, setBase64] = useState('');
  const [mimeType, setMimeType] = useState('');

  const [payload, setPayload] = useState('');
  const decoded = payload.trim() ? useCase.extractBase64(payload) : null;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = () => {
      const parts = useCase.extractBase64(String(reader.result));
      if (parts.ok) {
        setBase64(parts.base64!);
        setMimeType(parts.mimeType!);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <ToolPanelFrame>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t.fields.base64FileInput}
        </label>
        <input
          data-testid="base64-file-input"
          type="file"
          onChange={handleFileChange}
          className="text-sm text-slate-700 dark:text-slate-300"
        />
      </div>

      {base64 && (
        <>
          <div className="flex flex-col gap-2">
            <ResultRow label={t.labels.fileName} value={fileName} />
            <ResultRow label={t.labels.fileSize} value={formatSize(fileSize)} />
            <ResultRow label={t.labels.mimeType} value={mimeType} />
          </div>
          <div data-testid="base64-file-output">
            <ResultRow
              value={base64}
              copyLabel={t.actions.copy}
              onCopy={() => onCopy(base64, t.tools['base64-file'].label)}
            />
          </div>
        </>
      )}

      <TextareaField
        label={t.fields.base64PayloadInput}
        rows={4}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />
      {decoded && !decoded.ok && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidBase64DataUrl}
        </p>
      )}
      {decoded?.ok && (
        <Button
          variant="secondary"
          onClick={() => {
            const anchor = document.createElement('a');
            anchor.href = payload;
            anchor.download = 'file';
            anchor.click();
          }}
        >
          {t.actions.download}
        </Button>
      )}
    </ToolPanelFrame>
  );
}
