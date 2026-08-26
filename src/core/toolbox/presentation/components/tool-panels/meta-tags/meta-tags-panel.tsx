import { useState } from 'react';
import { GenerateMetaTagsUseCase } from '@/core/toolbox/application/use-cases/generate-meta-tags/generate-meta-tags.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateMetaTagsUseCase();

export function MetaTagsPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [title, setTitle] = useState('My Page');
  const [description, setDescription] = useState('A short description');
  const [imageUrl, setImageUrl] = useState('https://example.com/og.png');
  const [url, setUrl] = useState('https://example.com');

  const html = useCase.execute({ title, description, imageUrl, url });

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.metaTitle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label={t.fields.metaDescription}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label={t.fields.metaImageUrl}
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <TextField
        label={t.fields.metaPageUrl}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {t.labels.htmlOutput}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(html, t.tools['meta-tags'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
      <pre
        data-testid="meta-tags-output"
        className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs whitespace-pre-wrap text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {html}
      </pre>
    </ToolPanelFrame>
  );
}
