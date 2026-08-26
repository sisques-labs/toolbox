import { useState } from 'react';
import {
  ConvertListUseCase,
  type ListConvertOptions,
} from '@/core/toolbox/application/use-cases/convert-list/convert-list.use-case';
import { TextareaField } from '@/shared/presentation/components/textarea-field/textarea-field';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { Button } from '@/shared/presentation/components/button/button';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertListUseCase();

export function ListConverterPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [input, setInput] = useState('banana\napple\ncherry');
  const [sort, setSort] = useState<ListConvertOptions['sort']>('asc');
  const [unique, setUnique] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');

  const output = useCase.execute(input, {
    sort,
    unique,
    removeEmpty,
    prefix,
    suffix,
  });

  return (
    <ToolPanelFrame>
      <TextareaField
        label={t.fields.listInput}
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <SelectField
          label={t.fields.listSort}
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as ListConvertOptions['sort'])
          }
          options={[
            { value: 'none', label: t.labels.sortNone },
            { value: 'asc', label: t.labels.sortAsc },
            { value: 'desc', label: t.labels.sortDesc },
          ]}
        />
        <TextField
          label={t.fields.listPrefix}
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <TextField
          label={t.fields.listSuffix}
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <CheckboxField
          label={t.fields.listUnique}
          checked={unique}
          onChange={() => setUnique((v) => !v)}
        />
        <CheckboxField
          label={t.fields.listRemoveEmpty}
          checked={removeEmpty}
          onChange={() => setRemoveEmpty((v) => !v)}
        />
      </div>
      <pre
        data-testid="list-output"
        className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3.5 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-100"
      >
        {output}
      </pre>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(output, t.tools['list-converter'].label)}
        >
          {t.actions.copy}
        </Button>
      </div>
    </ToolPanelFrame>
  );
}
