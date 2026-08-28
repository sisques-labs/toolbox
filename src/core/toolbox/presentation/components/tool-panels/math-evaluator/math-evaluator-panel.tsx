import { useState } from 'react';
import { EvaluateMathExpressionUseCase } from '@/core/toolbox/application/use-cases/evaluate-math-expression/evaluate-math-expression.use-case';
import { TextField } from '@/shared/presentation/components/text-field/text-field';
import { ToolPanelFrame } from '@/core/toolbox/presentation/components/tool-panel-frame/tool-panel-frame';
import { ResultRow } from '@/core/toolbox/presentation/components/result-row/result-row';
import type { ToolboxDict } from '@/core/toolbox/presentation/i18n/en';
import type { WidenStringLiterals } from '@/shared/presentation/i18n/widen-literals';

const useCase = new EvaluateMathExpressionUseCase();

export function MathEvaluatorPanel({
  t,
  onCopy,
}: {
  t: WidenStringLiterals<ToolboxDict>;
  onCopy: (text: string, label: string) => void;
}) {
  const [expression, setExpression] = useState('2 + 3 * 4');
  const result = useCase.execute(expression);

  return (
    <ToolPanelFrame>
      <TextField
        label={t.fields.mathExpression}
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />
      {result.ok ? (
        <ResultRow
          label={t.labels.expression}
          value={String(result.value)}
          copyLabel={t.actions.copy}
          onCopy={() => onCopy(String(result.value), t.labels.expression)}
        />
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t.errors.invalidMathExpression}
        </p>
      )}
    </ToolPanelFrame>
  );
}
