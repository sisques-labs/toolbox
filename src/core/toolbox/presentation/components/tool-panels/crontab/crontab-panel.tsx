import { useState } from 'react';
import {
  GenerateCrontabUseCase,
  type CronFields,
} from '@/core/toolbox/application/use-cases/generate-crontab/generate-crontab.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new GenerateCrontabUseCase();

const PRESETS: { id: string; fields: CronFields }[] = [
  {
    id: 'everyMinute',
    fields: {
      minute: '*',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
    },
  },
  {
    id: 'hourly',
    fields: {
      minute: '0',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
    },
  },
  {
    id: 'daily',
    fields: {
      minute: '0',
      hour: '9',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
    },
  },
  {
    id: 'weekdays',
    fields: {
      minute: '0',
      hour: '9',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '1-5',
    },
  },
];

export function CrontabPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [fields, setFields] = useState<CronFields>(PRESETS[2].fields);
  const result = useCase.build(fields);

  const update = (key: keyof CronFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ToolPanelFrame>
      <SelectField
        label={t.fields.preset}
        value=""
        onChange={(e) => {
          const preset = PRESETS.find((p) => p.id === e.target.value);
          if (preset) setFields(preset.fields);
        }}
        options={[
          { value: '', label: t.labels.choosePreset },
          ...PRESETS.map((p) => ({
            value: p.id,
            label: t.presets[p.id as keyof typeof t.presets],
          })),
        ]}
      />
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        <TextField
          label={t.fields.minute}
          value={fields.minute}
          onChange={(e) => update('minute', e.target.value)}
        />
        <TextField
          label={t.fields.hour}
          value={fields.hour}
          onChange={(e) => update('hour', e.target.value)}
        />
        <TextField
          label={t.fields.dayOfMonth}
          value={fields.dayOfMonth}
          onChange={(e) => update('dayOfMonth', e.target.value)}
        />
        <TextField
          label={t.fields.month}
          value={fields.month}
          onChange={(e) => update('month', e.target.value)}
        />
        <TextField
          label={t.fields.dayOfWeek}
          value={fields.dayOfWeek}
          onChange={(e) => update('dayOfWeek', e.target.value)}
        />
      </div>
      {result.ok ? (
        <>
          <ResultRow
            label={t.labels.expression}
            value={result.expression}
            copyLabel={t.actions.copy}
            onCopy={() => onCopy(result.expression, t.labels.expression)}
          />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {result.description}
          </p>
        </>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidCron}
        </p>
      )}
    </ToolPanelFrame>
  );
}
