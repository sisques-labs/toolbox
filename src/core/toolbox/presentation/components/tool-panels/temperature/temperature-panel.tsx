import { useState } from 'react';
import {
  ConvertTemperatureUseCase,
  type TemperatureUnit,
} from '@/core/toolbox/application/use-cases/convert-temperature/convert-temperature.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { SelectField } from '@/shared/presentation/components/select-field/select-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new ConvertTemperatureUseCase();

function round(value: number): string {
  return String(Math.round(value * 100) / 100);
}

export function TemperaturePanel({
  t,
}: {
  t: WidenStringLiterals<ToolboxDict>;
}) {
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const result = useCase.execute(value, unit);

  return (
    <ToolPanelFrame>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={t.fields.temperatureValue}
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <SelectField
          label={t.fields.temperatureUnit}
          value={unit}
          onChange={(e) => setUnit(e.target.value as TemperatureUnit)}
          options={[
            { value: 'celsius', label: t.labels.celsius },
            { value: 'fahrenheit', label: t.labels.fahrenheit },
            { value: 'kelvin', label: t.labels.kelvin },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <ResultRow label={t.labels.celsius} value={round(result.celsius)} />
        <ResultRow
          label={t.labels.fahrenheit}
          value={round(result.fahrenheit)}
        />
        <ResultRow label={t.labels.kelvin} value={round(result.kelvin)} />
      </div>
    </ToolPanelFrame>
  );
}
