import { useState } from 'react';
import { GenerateSvgPlaceholderUseCase } from '@/core/toolbox/application/use-cases/generate-svg-placeholder/generate-svg-placeholder.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { DownloadButton } from '@/shared/presentation/components/download-button/download-button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateSvgPlaceholderUseCase();

export function SvgPlaceholderPanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [backgroundColor, setBackgroundColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#333333');
  const [text, setText] = useState('');

  const svg = useCase.execute({
    width,
    height,
    backgroundColor,
    textColor,
    text,
  });

  return (
    <ToolPanelFrame>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={t.fields.placeholderWidth}
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value) || 1)}
        />
        <TextField
          label={t.fields.placeholderHeight}
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value) || 1)}
        />
        <TextField
          label={t.fields.placeholderBackground}
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <TextField
          label={t.fields.placeholderTextColor}
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>
      <TextField
        label={t.fields.placeholderText}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div
        data-testid="svg-placeholder-preview"
        className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800"
        // SVG is built from numeric dimensions and XML-escaped text/colors.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <DownloadButton
        content={svg}
        baseName="placeholder"
        extension="svg"
        mimeType="image/svg+xml"
        label={t.actions.download}
      />
    </ToolPanelFrame>
  );
}
