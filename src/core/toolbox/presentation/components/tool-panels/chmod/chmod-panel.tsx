import { useState } from 'react';
import {
  CalculateChmodUseCase,
  type ChmodFlags,
  type PermissionFlags,
} from '@/core/toolbox/application/use-cases/calculate-chmod/calculate-chmod.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { CheckboxField } from '@/shared/presentation/components/checkbox-field/checkbox-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new CalculateChmodUseCase();

const DEFAULT_FLAGS: ChmodFlags = {
  owner: { read: true, write: true, execute: true },
  group: { read: true, write: false, execute: true },
  other: { read: true, write: false, execute: true },
};

function PermissionGroup({
  title,
  flags,
  onToggle,
  labels,
}: {
  title: string;
  flags: PermissionFlags;
  onToggle: (key: keyof PermissionFlags) => void;
  labels: { read: string; write: string; execute: string };
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
      <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        <CheckboxField
          label={labels.read}
          checked={flags.read}
          onChange={() => onToggle('read')}
        />
        <CheckboxField
          label={labels.write}
          checked={flags.write}
          onChange={() => onToggle('write')}
        />
        <CheckboxField
          label={labels.execute}
          checked={flags.execute}
          onChange={() => onToggle('execute')}
        />
      </div>
    </div>
  );
}

export function ChmodPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [flags, setFlags] = useState<ChmodFlags>(DEFAULT_FLAGS);
  const [octalInput, setOctalInput] = useState('755');
  const result = useCase.fromFlags(flags);

  const toggle = (who: keyof ChmodFlags, key: keyof PermissionFlags) => {
    setFlags((prev) => {
      const next = {
        ...prev,
        [who]: { ...prev[who], [key]: !prev[who][key] },
      };
      setOctalInput(useCase.fromFlags(next).octal);
      return next;
    });
  };

  const applyOctal = (value: string) => {
    setOctalInput(value);
    const parsed = useCase.fromOctal(value);
    if (parsed.ok) setFlags(parsed.flags);
  };

  const parsed = useCase.fromOctal(octalInput);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.chmodOctal}
        value={octalInput}
        onChange={(e) => applyOctal(e.target.value)}
      />
      {!parsed.ok && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidChmod}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        <PermissionGroup
          title={t.labels.chmodOwner}
          flags={flags.owner}
          onToggle={(key) => toggle('owner', key)}
          labels={{
            read: t.labels.chmodRead,
            write: t.labels.chmodWrite,
            execute: t.labels.chmodExecute,
          }}
        />
        <PermissionGroup
          title={t.labels.chmodGroup}
          flags={flags.group}
          onToggle={(key) => toggle('group', key)}
          labels={{
            read: t.labels.chmodRead,
            write: t.labels.chmodWrite,
            execute: t.labels.chmodExecute,
          }}
        />
        <PermissionGroup
          title={t.labels.chmodOther}
          flags={flags.other}
          onToggle={(key) => toggle('other', key)}
          labels={{
            read: t.labels.chmodRead,
            write: t.labels.chmodWrite,
            execute: t.labels.chmodExecute,
          }}
        />
      </div>
      <ResultRow
        label={t.labels.octal}
        value={result.octal}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(result.octal, t.labels.octal)}
      />
      <ResultRow
        label={t.labels.symbolic}
        value={result.symbolic}
        copyLabel={t.actions.copy}
        onCopy={() => onCopy(result.symbolic, t.labels.symbolic)}
      />
    </ToolPanelFrame>
  );
}
