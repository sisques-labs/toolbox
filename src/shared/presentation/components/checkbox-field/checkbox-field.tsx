import { useId } from 'react';

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800"
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-sm text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
    </div>
  );
}
