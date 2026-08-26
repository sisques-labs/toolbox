import { useState } from 'react';
import { GenerateQrUseCase } from '@/core/toolbox/application/use-cases/generate-qr/generate-qr.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateQrUseCase();

export function QrPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy?: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('https://example.com');
  const result = useCase.execute(input);

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.qrContent}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {!result.ok ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.emptyQrContent}
        </p>
      ) : (
        <div
          className="mx-auto w-full max-w-xs rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800"
          data-testid="qr-preview"
          // SVG comes from the trusted uqr library for the user-provided text.
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      )}
    </ToolPanelFrame>
  );
}
